import Image from "next/image";
import { Reveal } from "@/components/motion";
import { assetUrl, hasExternalAssetBase } from "@/lib/assets";

const skills = ["AutoCAD", "ArtiosCAD", "Rhino", "Blender", "KeyShot", "Photoshop", "Illustrator", "VS Code"];
const experiences = [
  ["2021.09-2025.06", "西安理工大学印包学院包 212 班班长"],
  ["2023.07-2023.08", "“三下乡”社会实践负责人，完成企业参访调研与调研报告组织"],
  ["2023.06-2024.05", "省级大学生创新创业训练计划项目负责人，参与产品研发、调研与结题总结"],
  ["2023", "“东峰杯”项目经历，围绕护肤品包装与用户情绪体验展开调研与方案整合"]
];
const awards = [
  "中国包装创意设计大赛三等奖",
  "中国包装创意设计大赛优秀奖多次",
  "2024 年度济丰杯潜力奖",
  "工程制图大赛校级三等奖"
];

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
              我专注于包装结构设计、产品设计与视觉表达，关注结构、材料、运输保护、
              产品体验和最终呈现之间的关系。
            </p>
            <p>
              作品覆盖纸类包装、发泡缓冲、吸塑托盘、集合类包装、礼盒、展示架、
              酒品设计、模块化猫家具和产品渲染等方向。
            </p>
          </div>

          <div className="grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted md:text-sm md:tracking-[0.22em]">Education</p>
              <p className="leading-7 text-ink/72">西安理工大学 包装工程 本科</p>
              <p className="mt-2 text-sm leading-7 text-ink/58">2021.09-2025.06</p>
            </div>
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted md:text-sm md:tracking-[0.22em]">Direction</p>
              <p className="leading-7 text-ink/72">包装结构设计 / 产品设计 / 工业设计 / 视觉呈现</p>
            </div>
          </div>

          <div className="grid gap-10 border-t border-line pt-8 md:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted md:text-sm md:tracking-[0.22em]">Experience</p>
            </div>
            <div className="space-y-5">
              {experiences.map(([time, text]) => (
                <div key={`${time}-${text}`} className="grid gap-2 border-b border-line pb-5 text-sm sm:grid-cols-[130px_1fr]">
                  <p className="text-muted">{time}</p>
                  <p className="leading-7 text-ink/72">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-10 border-t border-line pt-8 md:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted md:text-sm md:tracking-[0.22em]">Awards</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {awards.map((award) => (
                <p key={award} className="border border-line px-4 py-3 text-sm leading-7 text-ink/72">
                  {award}
                </p>
              ))}
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
