import { notFound } from "next/navigation";
import { HomeVisualWall } from "@/components/home-visual-wall";
import { Reveal } from "@/components/motion";
import { PortfolioImage } from "@/components/portfolio-image";
import { getWorks, type WorkCategory } from "@/lib/works";

const categoryMeta = {
  packaging: {
    title: "Packaging Structure Design",
    label: "Packaging Design",
    intro: "纸类内缓冲、发泡塑料内缓冲、吸塑包材、集合类包材、礼盒包材与展示架包材。"
  },
  "product-design": {
    title: "Product Design",
    label: "Design",
    intro: "年轮、天浪、猫立方及其他产品渲染作品，呈现产品造型、包装视觉和场景表达。"
  },
  photography: {
    title: "Visual / Rendering",
    label: "Design & Visual",
    intro: "场景渲染、产品置景和视觉表现作品。"
  }
};

export function generateStaticParams() {
  return [{ category: "packaging" }, { category: "product-design" }, { category: "photography" }];
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (category !== "packaging" && category !== "product-design" && category !== "photography") notFound();

  const works = getWorks(category as WorkCategory);
  const meta = categoryMeta[category as WorkCategory];

  return (
    <main className="mx-auto max-w-[1500px] px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.28em] text-muted md:tracking-[0.34em]">{meta.label}</p>
        <h1 className="mt-5 text-4xl font-medium leading-[1.06] md:text-6xl lg:text-7xl">{meta.title}</h1>
        <p className="mt-8 max-w-2xl text-sm leading-8 text-ink/64 md:text-base">{meta.intro}</p>
      </Reveal>

      {category === "photography" ? (
        <div className="image-grid mt-16">
          {works.map((work) => (
            <a key={work.slug} href={`/works/${work.category}/${work.slug}`} className="group mb-4 block break-inside-avoid">
              <PortfolioImage src={work.cover} alt={work.title} aspect="aspect-[4/5]" imageClassName="transition duration-700 group-hover:opacity-80" />
            </a>
          ))}
        </div>
      ) : (
        <div className="-mx-5 mt-16 md:-mx-8">
          <HomeVisualWall works={works} />
        </div>
      )}
    </main>
  );
}
