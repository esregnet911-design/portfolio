"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { PortfolioImage } from "@/components/portfolio-image";

export function ImageLightbox({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((active + 1) % images.length);
      if (event.key === "ArrowLeft") setActive((active - 1 + images.length) % images.length);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, images.length]);

  if (!images.length) return null;

  const go = (direction: number) => {
    if (active === null) return;
    setActive((active + direction + images.length) % images.length);
  };

  return (
    <>
      <div className="magazine-grid">
        {images.map((image, index) => (
          <motion.button
            key={image}
            type="button"
            initial={{ opacity: 0, y: 28, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, delay: (index % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setActive(index)}
            className={`group block w-full overflow-hidden bg-neutral-200 text-left ${index % 5 === 0 ? "md:col-span-7" : ""} ${index % 5 === 1 ? "md:col-span-5 md:mt-20" : ""} ${index % 5 === 2 ? "md:col-span-4" : ""} ${index % 5 === 3 ? "md:col-span-8" : ""} ${index % 5 === 4 ? "md:col-span-6 md:ml-auto" : ""}`}
          >
            <PortfolioImage
              src={image}
              alt={`${title} image ${index + 1}`}
              aspect="h-full min-h-[260px]"
              sizes="(min-width: 1024px) 58vw, 100vw"
              imageClassName="transition duration-[1100ms] ease-out group-hover:scale-[1.03] group-hover:opacity-90"
            />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/94 text-white"
          >
            <button
              type="button"
              aria-label="Close image viewer"
              onClick={() => setActive(null)}
              className="absolute right-5 top-5 z-10 grid size-11 place-items-center border border-white/18 bg-white/8 backdrop-blur-md transition hover:bg-white hover:text-black"
            >
              <X size={20} />
            </button>

            <button
              type="button"
              aria-label="Previous image"
              onClick={() => go(-1)}
              className="absolute left-4 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center border border-white/18 bg-white/8 backdrop-blur-md transition hover:bg-white hover:text-black"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              type="button"
              aria-label="Next image"
              onClick={() => go(1)}
              className="absolute right-4 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center border border-white/18 bg-white/8 backdrop-blur-md transition hover:bg-white hover:text-black"
            >
              <ChevronRight size={22} />
            </button>

            <div className="flex h-full items-center justify-center p-5 md:p-10">
              <AnimatePresence mode="wait">
                <motion.img
                  key={images[active]}
                  src={images[active]}
                  alt={`${title} fullscreen ${active + 1}`}
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.35 }}
                  className="max-h-full max-w-full object-contain"
                />
              </AnimatePresence>
            </div>

            <div className="absolute bottom-5 left-5 text-xs uppercase tracking-[0.22em] text-white/58">
              {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
