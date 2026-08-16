import Link from "next/link";
import { HomeVisualWall } from "@/components/home-visual-wall";
import { Reveal } from "@/components/motion";
import { PortfolioImage } from "@/components/portfolio-image";
import { getWorks } from "@/lib/works";

export const metadata = {
  title: "Works"
};

export default function WorksPage() {
  const packaging = getWorks("packaging");
  const productDesign = getWorks("product-design");
  const visualRendering = getWorks("photography");
  const packagingDirections = [
    ["Structure Design", "包装结构设计", "纸卡、纸塑、吸塑、礼盒与展示架结构方案。"],
    ["Transport Packaging", "运输包装", "围绕支撑、缓冲、跌落保护和装配效率建立包装系统。"],
    ["Material Application", "材料应用", "纸板、EPP / EPE、吸塑与复合材料的结构表达。"]
  ];

  return (
    <main className="pb-24 pt-32 md:pt-40">
      <section className="mx-auto max-w-[1500px] px-5 md:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.28em] text-muted md:tracking-[0.34em]">Works</p>
          <h1 className="mt-5 max-w-6xl text-4xl font-medium leading-[1.06] md:text-6xl lg:text-7xl">
            Packaging structure, product design and visual presentation.
          </h1>
        </Reveal>

        <div className="mt-14 grid border-y border-line md:grid-cols-3">
          {packagingDirections.map(([nameEn, name, description]) => (
            <Link
              key={nameEn}
              href="/works/packaging"
              className="group border-line py-7 transition hover:bg-white/60 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-muted">{nameEn}</p>
              <p className="mt-4 text-2xl font-medium">{name}</p>
              <p className="mt-4 max-w-sm text-sm leading-7 text-ink/58">{description}</p>
            </Link>
          ))}
        </div>
      </section>

      <HomeVisualWall
        works={packaging}
        eyebrow="Packaging Design"
        title="以结构分析、材料选择和运输保护为核心的包装结构设计。"
      />

      <section className="mx-auto mt-24 max-w-[1500px] px-5 md:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-muted md:tracking-[0.3em]">Product Design</p>
            <h2 className="mt-3 text-3xl font-medium md:text-5xl lg:text-6xl">Design Works</h2>
          </div>
          <Link href="/works/product-design" className="text-xs uppercase tracking-[0.2em] text-muted">
            View All
          </Link>
        </div>
      </section>
      <HomeVisualWall
        works={productDesign}
        eyebrow="Product Design"
        title="产品造型、品牌包装与场景渲染，展示设计概念到视觉表达。"
      />

      <section className="mx-auto mt-24 max-w-[1500px] px-5 md:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-muted md:tracking-[0.3em]">Visual / Rendering</p>
            <h2 className="mt-3 text-3xl font-medium md:text-5xl lg:text-6xl">视觉表现</h2>
          </div>
          <Link href="/works/photography" className="text-xs uppercase tracking-[0.2em] text-muted">
            View All
          </Link>
        </div>
        <div className="image-grid">
          {visualRendering.map((work) => (
            <Link key={work.slug} href={`/works/${work.category}/${work.slug}`} className="group mb-4 block break-inside-avoid">
              <PortfolioImage src={work.cover} alt={work.title} aspect="aspect-[4/5]" imageClassName="transition duration-700 group-hover:opacity-80" />
              <p className="mt-3 text-sm uppercase tracking-[0.18em] text-muted">{work.englishName}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
