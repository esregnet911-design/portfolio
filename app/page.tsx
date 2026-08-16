import Link from "next/link";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { HomeVisualWall } from "@/components/home-visual-wall";
import { MotionDiv, MotionSection, Reveal } from "@/components/motion";
import { PortfolioImage } from "@/components/portfolio-image";
import { getWork, getWorks } from "@/lib/works";

export default function HomePage() {
  const packaging = getWorks("packaging");
  const tianlang = getWork("product-design", "tianlang");
  const hero = tianlang ?? packaging[0];
  const featured = [hero, ...packaging.filter((work) => work.slug !== hero.slug)].slice(0, 5);
  const capabilities = ["Structure Design", "Transport Packaging", "Material Application"];

  return (
    <main>
      <section className="relative min-h-screen overflow-hidden bg-[#0d0d0c] text-paper">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,13,12,0.98)_0%,rgba(13,13,12,0.9)_34%,rgba(13,13,12,0.52)_58%,rgba(13,13,12,0.12)_100%)]" />
        <MotionDiv
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-0 right-0 w-full md:w-[68%]"
        >
          <MotionDiv
            animate={{ y: [0, -18, 0], scale: [1, 1.018, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-full w-full"
          >
            <PortfolioImage
              src={hero.cover}
              alt={hero.title}
              priority
              sizes="100vw"
              aspect="h-full"
              className="h-full"
              imageClassName="opacity-72 md:opacity-92"
            />
          </MotionDiv>
        </MotionDiv>

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.28))]" />
        <div className="relative mx-auto grid min-h-screen max-w-[1500px] items-end gap-12 px-5 pb-10 pt-28 md:grid-cols-[0.82fr_1.18fr] md:px-8 md:pb-14">
          <MotionDiv
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl pb-14 md:pb-20"
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

          <MotionDiv
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="hidden justify-self-end pb-20 text-right md:block"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-white/50">Featured Project</p>
            <p className="mt-3 text-2xl font-medium">{hero.title}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/58">{hero.englishName}</p>
          </MotionDiv>
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
