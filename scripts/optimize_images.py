#!/usr/bin/env python3
"""Build responsive portfolio image assets from project JSON files.

The script is intentionally conservative:
- it never deletes source images
- it copies every referenced project image into public/images/projects/<slug>/original
- it writes optimized WebP variants for desktop, mobile and thumbnails
- it rewrites content/projects/*.json to point at the desktop optimized image
- it writes content/image-manifest.json for dimensions, blur placeholders and variants
"""

from __future__ import annotations

import base64
import io
import json
import shutil
from pathlib import Path
from typing import Any

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
PROJECTS = ROOT / "content" / "projects"
MANIFEST = ROOT / "content" / "image-manifest.json"
OUTPUT_ROOT = PUBLIC / "images" / "projects"

DESKTOP_WIDTH = 1920
MOBILE_WIDTH = 1080
THUMB_WIDTH = 600
BLUR_WIDTH = 28
WEBP_QUALITY = 82
THUMB_QUALITY = 76

IMAGE_STAGES = ["cover", "overview", "process", "structure", "render", "gallery"]
SOURCE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff", ".bmp"}


def slugify_stage(stage: str, index: int | None = None) -> str:
    if index is None:
        return stage
    return f"{stage}-{index + 1:02d}"


def parse_stage_label(stem: str) -> tuple[str, int | None]:
    normalized = stem.lower().replace("_", "-")
    for stage in IMAGE_STAGES:
        if normalized == stage:
            return stage, None
        prefix = f"{stage}-"
        if normalized.startswith(prefix):
            suffix = normalized.removeprefix(prefix)
            if suffix.isdigit():
                return stage, max(int(suffix) - 1, 0)
    return "gallery", None


def public_to_file(url: str) -> Path:
    if not url:
        raise ValueError("empty url")
    if not url.startswith("/"):
        raise ValueError(f"Expected public URL beginning with '/': {url}")
    return PUBLIC / url.lstrip("/")


def source_for_url(project_slug: str, stage: str, index: int | None, url: str) -> Path:
    label = slugify_stage(stage, index)
    if url.startswith(f"/images/projects/{project_slug}/optimized/"):
        original_dir = OUTPUT_ROOT / project_slug / "original"
        matches = sorted(original_dir.glob(f"{label}.*"))
        if matches:
            return matches[0]
    return public_to_file(url)


def fit_width(image: Image.Image, width: int) -> Image.Image:
    if image.width <= width:
        return image.copy()
    ratio = width / image.width
    height = round(image.height * ratio)
    return image.resize((width, height), Image.Resampling.LANCZOS)


def webp_bytes(image: Image.Image, width: int, quality: int) -> tuple[bytes, int, int]:
    converted = ImageOps.exif_transpose(image)
    if converted.mode not in ("RGB", "RGBA"):
        converted = converted.convert("RGBA" if "A" in converted.getbands() else "RGB")
    resized = fit_width(converted, width)
    buffer = io.BytesIO()
    resized.save(buffer, format="WEBP", quality=quality, method=6)
    return buffer.getvalue(), resized.width, resized.height


def write_variant(image: Image.Image, path: Path, width: int, quality: int) -> tuple[int, int, int]:
    data, actual_width, actual_height = webp_bytes(image, width, quality)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)
    return actual_width, actual_height, len(data)


def blur_data_url(image: Image.Image) -> str:
    data, _, _ = webp_bytes(image, BLUR_WIDTH, 46)
    encoded = base64.b64encode(data).decode("ascii")
    return f"data:image/webp;base64,{encoded}"


def collect_images(project: dict[str, Any]) -> list[tuple[str, int | None, str]]:
    images = project.get("images") or {}
    collected: list[tuple[str, int | None, str]] = []
    for stage in IMAGE_STAGES:
        value = images.get(stage)
        if isinstance(value, str) and value:
            collected.append((stage, None, value))
        elif isinstance(value, list):
            for index, url in enumerate(value):
                if isinstance(url, str) and url:
                    collected.append((stage, index, url))
    return collected


def set_project_image(project: dict[str, Any], stage: str, index: int | None, url: str) -> None:
    images = project.setdefault("images", {})
    if index is None:
        images[stage] = url
        return
    values = images.setdefault(stage, [])
    while len(values) <= index:
        values.append("")
    values[index] = url


def represented_labels(project: dict[str, Any]) -> set[str]:
    return {slugify_stage(stage, index) for stage, index, _ in collect_images(project)}


def ingest_original_folder(project: dict[str, Any]) -> None:
    slug = project["slug"]
    images = project.setdefault("images", {})
    labels = represented_labels(project)
    original_dir = OUTPUT_ROOT / slug / "original"

    candidate_dirs = [
        ROOT / "material" / slug / "original",
        ROOT / "material" / slug,
        original_dir,
    ]

    for source_dir in candidate_dirs:
        if not source_dir.exists() or not source_dir.is_dir():
            continue
        for source_path in sorted(source_dir.iterdir()):
            if not source_path.is_file() or source_path.suffix.lower() not in SOURCE_EXTENSIONS:
                continue
            stage, index = parse_stage_label(source_path.stem)
            label = slugify_stage(stage, index)
            if label in labels:
                continue
            original_dir.mkdir(parents=True, exist_ok=True)
            target_path = original_dir / source_path.name
            if source_path.resolve() != target_path.resolve():
                shutil.copy2(source_path, target_path)
            public_url = "/" + target_path.relative_to(PUBLIC).as_posix()
            if stage in ("cover", "overview"):
                set_project_image(project, stage, None, public_url)
            else:
                values = images.setdefault(stage, [])
                values.append(public_url)
            labels.add(label)


def optimize_project(json_path: Path, manifest: dict[str, Any]) -> dict[str, int]:
    project = json.loads(json_path.read_text(encoding="utf-8"))
    ingest_original_folder(project)
    slug = project["slug"]
    counts = {"sources": 0, "written": 0}
    seen_labels: dict[str, int] = {}

    for stage, index, source_url in collect_images(project):
        source_path = source_for_url(slug, stage, index, source_url)
        if not source_path.exists():
            print(f"warning: missing source for {json_path.name}: {source_url}")
            continue

        base_label = slugify_stage(stage, index)
        label_count = seen_labels.get(base_label, 0)
        seen_labels[base_label] = label_count + 1
        label = base_label if label_count == 0 else f"{base_label}-{label_count + 1}"

        ext = source_path.suffix.lower() or ".jpg"
        original_path = OUTPUT_ROOT / slug / "original" / f"{label}{ext}"
        desktop_path = OUTPUT_ROOT / slug / "optimized" / f"{label}-1920.webp"
        mobile_path = OUTPUT_ROOT / slug / "optimized" / f"{label}-1080.webp"
        thumb_path = OUTPUT_ROOT / slug / "thumbnail" / f"{label}-600.webp"

        original_path.parent.mkdir(parents=True, exist_ok=True)
        if source_path.resolve() != original_path.resolve():
            shutil.copy2(source_path, original_path)

        with Image.open(source_path) as image:
            desktop_w, desktop_h, desktop_size = write_variant(image, desktop_path, DESKTOP_WIDTH, WEBP_QUALITY)
            mobile_w, mobile_h, mobile_size = write_variant(image, mobile_path, MOBILE_WIDTH, WEBP_QUALITY)
            thumb_w, thumb_h, thumb_size = write_variant(image, thumb_path, THUMB_WIDTH, THUMB_QUALITY)
            blur = blur_data_url(image)

        desktop_url = "/" + desktop_path.relative_to(PUBLIC).as_posix()
        mobile_url = "/" + mobile_path.relative_to(PUBLIC).as_posix()
        thumb_url = "/" + thumb_path.relative_to(PUBLIC).as_posix()
        original_url = "/" + original_path.relative_to(PUBLIC).as_posix()

        manifest[desktop_url] = {
            "src": desktop_url,
            "mobile": mobile_url,
            "thumbnail": thumb_url,
            "original": original_url,
            "width": desktop_w,
            "height": desktop_h,
            "mobileWidth": mobile_w,
            "mobileHeight": mobile_h,
            "thumbnailWidth": thumb_w,
            "thumbnailHeight": thumb_h,
            "bytes": desktop_size,
            "mobileBytes": mobile_size,
            "thumbnailBytes": thumb_size,
            "blurDataURL": blur,
        }

        set_project_image(project, stage, index, desktop_url)
        counts["sources"] += 1
        counts["written"] += 3

    json_path.write_text(json.dumps(project, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return counts


def main() -> None:
    manifest: dict[str, Any] = {}
    total_sources = 0
    total_written = 0

    for json_path in sorted(PROJECTS.glob("*.json")):
        counts = optimize_project(json_path, manifest)
        total_sources += counts["sources"]
        total_written += counts["written"]

    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"optimized {total_sources} source references into {total_written} WebP files")
    print(f"manifest: {MANIFEST.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
