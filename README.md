# 王志华 Personal Portfolio

Next.js + TypeScript + Tailwind CSS + Framer Motion personal portfolio for packaging structure design, product design and photography.

## Development

```bash
npm install
npm run dev
```

## Content Structure

Each work is driven by a JSON file under `content/projects`.

```text
content/projects/project-name.json
public/images/projects/project-name/original/
public/images/projects/project-name/optimized/
public/images/projects/project-name/thumbnail/
```

## Image Pipeline

Do not use original high-resolution images directly on the website.

1. Add or reference source images in a project JSON file, or place files in `public/images/projects/<project>/original/`.
2. Run:

```bash
python3 scripts/optimize_images.py
```

The optimizer will:

- copy sources into `public/images/projects/<project>/original/`
- generate desktop WebP images at max 1920px width
- generate mobile WebP images at max 1080px width
- generate thumbnails at max 600px width
- update the project JSON paths to optimized WebP files
- update `content/image-manifest.json` for responsive loading and blur placeholders

The `PortfolioImage` component automatically selects mobile or desktop variants and fades from a blur placeholder into the final image.

Recommended names for files placed directly in `original/`:

```text
cover.jpg
overview.jpg
process-01.jpg
structure-01.jpg
render-01.jpg
gallery-01.jpg
```

You can also stage new project images under `material/<project-slug>/original/`; the optimizer copies them into the public project image tree and leaves the source material untouched.

## Deploy

The project is ready for Vercel. Use the default Next.js build command:

```bash
npm run build
```
