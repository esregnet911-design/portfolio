"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import imageManifest from "@/content/image-manifest.json";
import { assetUrl } from "@/lib/assets";

type ImageMeta = {
  mobile?: string;
  thumbnail?: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
};

type PortfolioImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  aspect?: string;
  placeholder?: "blur" | "none";
};

const manifest = imageManifest as Record<string, ImageMeta>;

function variantsFor(src: string) {
  const meta = manifest[src] || {};
  const mobile =
    meta.mobile || (src.endsWith("-1920.webp") ? src.replace("-1920.webp", "-1080.webp") : src);
  const thumbnail =
    meta.thumbnail || (src.endsWith("-1920.webp") ? src.replace("-1920.webp", "-600.webp") : src);

  return {
    desktop: assetUrl(src),
    mobile: assetUrl(mobile),
    thumbnail: assetUrl(thumbnail),
    width: meta.width,
    height: meta.height,
    blurDataURL: meta.blurDataURL
  };
}

export function PortfolioImage({
  src,
  alt,
  className = "",
  imageClassName = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  aspect = "aspect-[4/3]",
  placeholder = "blur"
}: PortfolioImageProps) {
  const [loaded, setLoaded] = useState(false);
  const image = useMemo(() => variantsFor(src), [src]);
  const usePlaceholder = placeholder === "blur";

  return (
    <div
      className={`relative overflow-hidden bg-neutral-200 ${aspect} ${className}`}
      style={{
        backgroundImage: usePlaceholder && image.blurDataURL ? `url(${image.blurDataURL})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <picture>
        <source media="(max-width: 640px)" srcSet={image.mobile} sizes={sizes} />
        <source media="(max-width: 1024px)" srcSet={image.mobile} sizes={sizes} />
        <img
          src={image.desktop}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          width={image.width}
          height={image.height}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          className={`h-full w-full object-cover transition duration-[900ms] ease-out ${loaded || !usePlaceholder ? "opacity-100" : "opacity-0"} ${imageClassName}`}
        />
      </picture>
      {usePlaceholder ? (
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{ opacity: loaded ? 0 : 1 }}
          transition={{ duration: 0.45 }}
          className="absolute inset-0 bg-neutral-300/25"
        />
      ) : null}
    </div>
  );
}
