"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MotionDiv } from "@/components/motion";
import { PortfolioImage } from "@/components/portfolio-image";
import type { WorkItem } from "@/lib/works";

type HeroShowcaseProps = {
  works: WorkItem[];
};

export function HeroShowcase({ works }: HeroShowcaseProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  if (!isDesktop || works.length === 0) {
    return null;
  }

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-3xl justify-self-end pb-16"
    >
      <div className="relative ml-auto h-[52vh] min-h-[430px] max-h-[620px]">
        {works.map((work, index) => {
          const positions = [
            "right-0 top-0 w-[70%]",
            "left-0 bottom-10 w-[46%]",
            "right-[16%] bottom-0 w-[38%]"
          ];
          const aspects = ["aspect-[16/10]", "aspect-[4/5]", "aspect-[5/4]"];
          const delays = [0.25, 0.38, 0.5];

          return (
            <MotionDiv
              key={work.slug}
              initial={{ opacity: 0, y: 26, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: delays[index], ease: [0.22, 1, 0.36, 1] }}
              className={`absolute ${positions[index]} group`}
            >
              <MotionDiv
                animate={{ y: [0, index % 2 === 0 ? -8 : 8, 0] }}
                transition={{ duration: 10 + index * 2, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <Link href={`/works/${work.category}/${work.slug}`} className="block">
                  <PortfolioImage
                    src={work.cover}
                    alt={work.title}
                    priority={index === 0}
                    sizes="44vw"
                    aspect={aspects[index]}
                    className="border border-white/14 bg-black shadow-[0_28px_90px_rgba(0,0,0,0.34)]"
                    imageClassName="opacity-95 transition duration-1000 group-hover:scale-[1.03] group-hover:opacity-100"
                    placeholder="none"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-black/10 transition group-hover:bg-black/0" />
                  <div className="absolute left-4 top-4 text-left">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/58">{work.projectType}</p>
                    <p className="mt-2 text-lg font-medium text-white">{work.title}</p>
                  </div>
                </Link>
              </MotionDiv>
            </MotionDiv>
          );
        })}
      </div>
    </MotionDiv>
  );
}
