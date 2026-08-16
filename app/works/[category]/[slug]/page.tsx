import { notFound } from "next/navigation";
import { ImageLightbox } from "@/components/image-lightbox";
import { Reveal } from "@/components/motion";
import { PortfolioImage } from "@/components/portfolio-image";
import { getAllWorkParams, getWork, type WorkCategory } from "@/lib/works";

export function generateStaticParams() {
  return getAllWorkParams();
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  if (category !== "packaging" && category !== "product-design" && category !== "photography") return {};
  const work = getWork(category as WorkCategory, slug);
  return {
    title: work?.title || "Work Detail",
    description: work?.description
  };
}

export default async function WorkDetailPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  if (category !== "packaging" && category !== "product-design" && category !== "photography") notFound();
  const work = getWork(category as WorkCategory, slug);
  if (!work) notFound();

  const galleryImages = work.images.length ? work.images : [work.cover];
  const archiveImages = work.stagedImages.gallery.length ? work.stagedImages.gallery : galleryImages;
  const challenge = getChallengeBody(work.category, work.material);
  const processSteps = getProcessSteps(work.category);

  return (
    <main className="pb-28 pt-24">
      <section className="mx-auto max-w-[1500px] px-5 pt-12 md:px-8 md:pt-20">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.26em] text-muted md:tracking-[0.34em]">{work.projectType}</p>
          <div className="mt-8 grid gap-10 md:grid-cols-[1.25fr_0.75fr] md:items-end">
            <div>
              <h1 className="max-w-5xl text-5xl font-medium leading-[1.02] md:text-7xl lg:text-8xl">
                {work.title}
              </h1>
              <p className="mt-5 text-base uppercase tracking-[0.14em] text-muted md:text-xl md:tracking-[0.18em]">
                {work.englishName}
              </p>
            </div>
            <div className="border-t border-line pt-6 text-sm leading-7 text-ink/62">
              <p>{work.description}</p>
            </div>
          </div>
        </Reveal>
      </section>

      <Reveal className="mx-auto mt-16 max-w-[1800px] px-5 md:px-8">
        <PortfolioImage src={work.cover} alt={work.title} priority aspect="aspect-[4/5] md:aspect-[16/9]" sizes="100vw" />
      </Reveal>

      <section className="mx-auto mt-16 max-w-[1500px] px-5 md:px-8">
        <Reveal>
          <div className="grid gap-x-10 gap-y-8 border-y border-line py-8 text-sm md:grid-cols-5">
            {[
              ["Year", work.year || "-"],
              ["Category", work.projectType],
              ["Software", work.software.join(" / ") || "-"],
              ["Material", work.material || "-"],
              ["Role", work.role || "Structure Design"]
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-xs uppercase tracking-[0.18em] text-muted">{label}</p>
                <p className="mt-3 leading-7 text-ink/76">{value}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <ProjectSection
        number="01"
        eyebrow="Overview"
        title="项目概述"
        body={work.description}
      />

      <ProjectSection
        number="02"
        eyebrow="Challenge"
        title="设计问题"
        body={challenge}
      />

      <ProjectSection
        number="03"
        eyebrow="Process"
        title="设计过程"
        body={work.process}
      >
        <div className="mt-10 grid gap-px bg-line md:grid-cols-3">
          {processSteps.map(([name, description]) => (
            <div key={name} className="bg-paper p-6 md:p-7">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">{name}</p>
              <p className="mt-4 text-sm leading-7 text-ink/68">{description}</p>
            </div>
          ))}
        </div>
      </ProjectSection>

      <section className="mx-auto mt-24 max-w-[1500px] px-5 md:px-8">
        <Reveal>
          <div className="mb-10 grid gap-6 md:grid-cols-[0.75fr_1.25fr] md:items-end">
            <p className="text-xs uppercase tracking-[0.26em] text-muted md:tracking-[0.34em]">04 Gallery</p>
            <h2 className="text-3xl font-medium md:text-5xl">图片展示</h2>
          </div>
        </Reveal>
        <ImageLightbox images={archiveImages} title={work.title} />
      </section>

      <section className="mx-auto mt-24 max-w-[1500px] px-5 md:px-8">
        <Reveal>
          <div className="grid gap-8 border-t border-line pt-10 md:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-muted md:tracking-[0.34em]">Project Information</p>
              <h2 className="mt-4 text-3xl font-medium md:text-4xl">项目数据</h2>
            </div>
            <div className="grid gap-x-10 gap-y-8 text-sm md:grid-cols-2">
              {[
                ["年份", work.year],
                ["类型", work.projectType],
                ["软件", work.software.join(" / ")],
                ["材料", work.material],
                ["我的职责", work.role || "结构方案 / 3D 建模 / 渲染表现 / 版面呈现"],
                ["备注", work.notes]
              ].map(([label, value]) => (
                <div key={label} className="border-b border-line pb-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted md:tracking-[0.24em]">{label}</p>
                  <p className="mt-3 leading-7 text-ink/72">{value || "-"}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

function getChallengeBody(category: WorkCategory, material: string) {
  if (category === "packaging") {
    return `项目重点在于通过包装结构解决运输保护、装配效率、材料成本与展示效果之间的平衡。设计需要根据产品形态建立支撑关系，并结合 ${material || "具体材料"} 的加工特性完成可落地的结构方案。`;
  }

  if (category === "product-design") {
    return "项目重点在于将产品概念、使用场景和品牌视觉转化为清晰的造型语言，并通过建模、渲染和版面表达呈现设计价值。";
  }

  return "项目重点在于通过画面构图、光线控制和场景选择建立视觉叙事，让作品以更直接的方式呈现产品质感和空间氛围。";
}

function getProcessSteps(category: WorkCategory): [string, string][] {
  if (category === "packaging") {
    return [
      ["Requirement", "分析产品尺寸、运输方式、保护等级、装配流程与展示需求。"],
      ["Structure", "建立支撑、限位、缓冲、折叠和成型关系，形成可验证的结构方案。"],
      ["Validation", "通过 CAD、三维模型、打样逻辑和材料判断，控制量产可行性。"]
    ];
  }

  return [
    ["Concept", "明确产品定位、使用场景、视觉关键词和设计方向。"],
    ["Modeling", "通过三维建模推敲比例、结构关系、细节转折和材质表达。"],
    ["Presentation", "以渲染、场景图和版面组织完成最终视觉呈现。"]
  ];
}

function ProjectSection({
  number,
  eyebrow,
  title,
  body,
  children
}: {
  number: string;
  eyebrow: string;
  title: string;
  body: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="mx-auto mt-24 max-w-[1500px] px-5 md:mt-32 md:px-8">
      <Reveal>
        <div className="grid gap-10 md:grid-cols-[0.32fr_1.68fr]">
          <div className="flex items-start gap-4 text-xs uppercase tracking-[0.18em] text-muted md:gap-6 md:tracking-[0.28em]">
            <span>{number}</span>
            <span>{eyebrow}</span>
          </div>
          <div>
            <h2 className="text-3xl font-medium leading-tight md:text-5xl">{title}</h2>
            <p className="mt-7 max-w-3xl text-sm leading-8 text-ink/64 md:text-base">
              {body}
            </p>
            {children}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
