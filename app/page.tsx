import Link from "next/link";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { HeroShowcase } from "@/components/hero-showcase";
import { HomeVisualWall } from "@/components/home-visual-wall";
import { MotionDiv, MotionSection, Reveal } from "@/components/motion";
import { PortfolioImage } from "@/components/portfolio-image";
import { getWork, getWorks, type WorkItem } from "@/lib/works";

export default function HomePage() {
  const packaging = getWorks("packaging");
  const tianlang = getWork("product-design", "tianlang");
  const catCube = getWork("product-design", "cat-cube");
  const paperCushion = getWork("packaging", "packaging-paper-cushion");
  const hero = tianlang ?? packaging[0];
  const featured = [hero, ...packaging.filter((work) => work.slug !== hero.slug)].slice(0, 5);
  const capabilities = ["Structure Design", "Transport Packaging", "Material Application"];
  const heroBackground = hero.stagedImages.render[0] || hero.cover;
  const heroShowcase = [hero, catCube, paperCushion].filter((work): work is WorkItem => Boolean(work));

  return (
    <main>
      <section className="relative min-h-screen overflow-hidden bg-[#0d0d0c] text-paper">
        <MotionDiv
          initial={{ opacity: 0, scale: 1.015 }}
          animate={{ opacity: 1, scale: 1.03, x: [0, -10, 0] }}
          transition={{
            opacity: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 16, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
            x: { duration: 18, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute inset-0"
        >
          <PortfolioImage
            src={heroBackground}
            alt={hero.title}
            priority
            sizes="100vw"
            aspect="h-full"
            className="h-full bg-[#0d0d0c]"
            imageClassName="object-cover object-center opacity-100"
            placeholder="none"
          />
        </MotionDiv>

        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.42)_0%,rgba(8,8,8,0.28)_42%,rgba(8,8,8,0.12)_70%,rgba(8,8,8,0.06)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,rgba(8,8,8,0)_0%,rgba(8,8,8,0.28)_100%)]" />

        <div className="relative mx-auto grid min-h-screen max-w-[1500px] items-end gap-12 px-5 pb-10 pt-28 md:px-8 md:pb-14 lg:grid-cols-[0.76fr_1.24fr]">
          <MotionDiv
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl pb-14 [text-shadow:0_18px_60px_rgba(0,0,0,0.72)] md:pb-20"
          >
            <p className="text-5xl font-medium leading-[0.98] text-white/92 md:text-7xl lg:text-8xl">
              Personal Portfolio
            </p>
            <h1 className="mt-7 text-4xl font-medium leading-none text-white/78 md:text-6xl lg:text-7xl">
              Eren
            </h1>
            <div className="mt-10 max-w-xl border-t border-white/18 pt-7">
              <p className="max-w-lg text-2xl font-medium leading-[1.08] text-white/88 md:text-3xl lg:text-[2.65rem]">
                Packaging Structure Designer
              </p>
              <p className="mt-4 text-sm uppercase tracking-[0.22em] text-white/56 md:text-base md:tracking-[0.28em]">
                Industrial Designer
              </p>
              <p className="mt-8 max-w-md text-sm font-normal leading-8 text-white/62 md:text-[15px]">
                专注于包装结构设计、产品设计与视觉表达，建立从结构方案、材料选择到最终呈现的完整设计过程。
              </p>
              <div className="mt-7 flex max-w-md flex-wrap gap-x-5 gap-y-3 border-t border-white/12 pt-5">
                {capabilities.map((capability) => (
                  <span key={capability} className="text-[11px] uppercase tracking-[0.16em] text-white/52 md:text-xs">
                    {capability}
                  </span>
                ))}
              </div>
              <Link
                href="/works"
                className="mt-8 inline-flex w-fit items-center gap-3 border border-white/24 px-5 py-3 text-xs uppercase tracking-[0.18em] transition hover:border-white hover:bg-white hover:text-ink"
              >
                View Works <ArrowRight size={16} />
              </Link>
            </div>
          </MotionDiv>

          <HeroShowcase works={heroShowcase} />
        </div>
        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-xs uppercase tracking-[0.24em] text-white/48 md:flex">
          Scroll <ArrowDownRight size={16} />
        </div>
      </section>

      <MotionSection className="mx-auto max-w-[1500px] px-5 py-24 md:px-8 md:py-36">
        <Reveal>
          <div className="grid gap-10 md:grid-cols-[0.65fr_1.35fr]">
            <p className="text-xs uppercase tracking-[0.32em] text-muted">Design Direction</p>
            <h2 className="max-w-5xl text-3xl font-medium leading-[1.18] md:text-5xl lg:text-6xl">
              通过结构、材料和视觉表达，探索包装设计与产品体验之间的关系。
            </h2>
          </div>
        </Reveal>
      </MotionSection>

      <HomeVisualWall
        works={featured}
        eyebrow="Representative Works"
        title="结构、材料、产品造型与视觉表现共同构成完整作品集。"
      />
    </main>
  );
}
