# PPT Import Report

## Summary

- Source decks:
  - `作品集.pptx`: 17 slides, 51 embedded media files.
  - `王志华-个人简历答辩.pptx`: 17 slides, 36 embedded media files.
- Extracted raw PPT media for local analysis only; raw extracted files are not kept in the public web build.
- Generated 31 project-ready image entries from PPT sources.
- Detected 9 exact duplicate image hash groups and did not add duplicate resume-deck copies where the same image already existed in `作品集.pptx`.
- Build status: `npm run build` passed.

## Updated Projects

- `tianlang`: refreshed images from `作品集.pptx` Page 7; skipped duplicate resume images.
- `yinggelou-cigarette-package`: renamed display content to `黄鹤楼烟包设计系列` per confirmation; refreshed images from `作品集.pptx` Page 8.
- `cat-cube`: refreshed images from `作品集.pptx` Page 9.
- `other-product-design`: added YSL/product-rendering imagery from `作品集.pptx` Pages 10-11 and selected non-duplicate product images from resume Page 13.
- `scene-rendering`: refreshed scene-rendering cover from `作品集.pptx` Page 13.
- `sta-oldorder-shoe-box`: refreshed the project with the full board image from `作品集.pptx` Page 16.
- `visual-presentation`: added as an independent Visual / Rendering project from `作品集.pptx` Page 15.

## Not Changed

- `nianlun`: kept existing website content because the two PPTX files only show the word `年轮`; no independent Nianlun source images were found.
- Packaging structure projects: kept current website content because these two PPTX files did not contain clear independent source material for those packaging structure case studies.
- Contact details: did not publish phone number, birthday, full birthplace, or email on About.

## About Updates

- Added education: 西安理工大学 / 包装工程 / 本科.
- Added design direction: 包装结构设计 / 产品设计 / 工业设计 / 视觉呈现.
- Added selected experience and awards from the resume deck.
- Added confirmed software skills from the PPTX content.

## Image Quality Fixes

- Reworked `PortfolioImage` to use `next/image`.
- Project images now use `quality={90}` by default; priority hero/cover images use higher quality.
- PPT-derived images include:
  - optimized desktop WebP
  - mobile WebP
  - thumbnail WebP
  - blur placeholder
  - source deck, slide, project, role, hash and dimensions in `content/image-manifest.json`
- Public assets keep only website-ready optimized WebP and thumbnail WebP files.
- Raw PPT-extracted files and project-level imported originals were removed from the commit to avoid publishing private or unnecessary source material.
- Lightbox now receives all project images, not only the `gallery` field, so cover/render images are available for fullscreen viewing.

## Blur Issue Cause

- The old `PortfolioImage` used a custom `<picture>/<img>` flow and a blurred background placeholder.
- If the main image path failed, was too small, or loaded slowly, the page could appear stuck in a low-resolution placeholder state.
- Some project visuals used `object-cover`, which can crop CAD, boards, and product renders. The next pass can further tune `object-contain` per image role if needed.

## Files Changed

- `.gitignore`
- `app/about/page.tsx`
- `app/works/[category]/[slug]/page.tsx`
- `components/portfolio-image.tsx`
- `next.config.ts`
- `content/image-manifest.json`
- `content/ppt-image-sources.json`
- `content/projects/*.json`
- `public/images/projects/*/optimized/ppt-*.webp`
- `public/images/projects/*/thumbnail/ppt-*.webp`

## Verification

- `npm run build`: passed.
- Checked local routes with HTTP 200:
  - `/`
  - `/about`
  - `/works`
  - `/works/product-design/yinggelou-cigarette-package`
  - `/works/photography/visual-presentation`
- Checked representative WebP assets with HTTP 200:
  - `/images/projects/visual-presentation/optimized/ppt-cover-1920.webp`
  - `/images/projects/tianlang/optimized/ppt-cover-1920.webp`
