import Image from "next/image";
import { Reveal } from "@/components/motion";
import { assetUrl, hasExternalAssetBase } from "@/lib/assets";

const skills = ["AutoCAD", "ArtiosCAD", "Creo","VS code","Rhino", "Blender", "KeyShot", "Photoshop", "Illustrator"];

export const metadata = {
  title: "About"
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.26em] text-muted md:tracking-[0.3em]">About</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-medium leading-tight md:text-6xl lg:text-7xl">
          包装设计工程师
        </h1>
      </Reveal>

      <section className="mt-16 grid gap-12 md:grid-cols-[0.95fr_1.05fr] md:gap-20">
        <Reveal className="space-y-10">
          <div className="project-prose text-base md:text-lg">
            <p>
              我专注于包装结构设计、产品结构表达与视觉呈现，长期关注材料、运输保护、
              用户开箱体验和量产可行性之间的平衡。
            </p>
            <p>
              作品覆盖纸类包装、发泡缓冲、吸塑托盘、集合类包装、礼盒与展示架等方向，
              并结合 CAD 结构图、三维模型、爆炸图和渲染图完整呈现设计过程。
            </p>
          </div>

          <div className="grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted md:text-sm md:tracking-[0.22em]">Education</p>
              <p className="leading-7 text-ink/72">西安理工大学 包装工程专业 </p>
            </div>
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted md:text-sm md:tracking-[0.22em]">Philosophy</p>
              <p className="leading-7 text-ink/72">通过结构、材料和视觉表达，探索包装设计与产品体验之间的关系。</p>
            </div>
          </div>

          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.18em] text-muted md:text-sm md:tracking-[0.22em]">Skills</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="border border-line px-4 py-2 text-sm text-ink/72">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="relative aspect-[4/5] overflow-hidden bg-neutral-200">
            <Image
              src={assetUrl("/images/avatar/profile.jpg")}
              alt="王志华个人照片"
              fill
              priority
              unoptimized={hasExternalAssetBase()}
              sizes="(min-width: 768px) 48vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>
    </main>
  );
}
