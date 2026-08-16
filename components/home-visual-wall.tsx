import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MotionArticle, Reveal } from "@/components/motion";
import { PortfolioImage } from "@/components/portfolio-image";
import type { WorkItem } from "@/lib/works";

const layout = [
  "md:col-span-7",
  "md:col-span-5 md:translate-y-24",
  "md:col-span-6",
  "md:col-span-6 md:translate-y-16",
  "md:col-span-8"
];

export function HomeVisualWall({
  works,
  eyebrow = "Selected Works",
  title = "Packaging structures presented as objects, systems and experiences."
}: {
  works: WorkItem[];
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section className="border-t border-line bg-[#f9f8f5] py-24 md:py-36">
      <div className="mx-auto max-w-[1500px] px-5 md:px-8">
        <Reveal>
          <div className="mb-16 grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <p className="text-xs uppercase tracking-[0.24em] text-muted md:tracking-[0.34em]">{eyebrow}</p>
            <h2 className="max-w-4xl text-3xl font-medium leading-[1.14] md:text-5xl lg:text-6xl">
              {title}
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-x-8 gap-y-20 md:grid-cols-12 md:gap-y-28">
          {works.map((work, index) => (
            <MotionArticle
              key={work.slug}
              initial={{ opacity: 0, y: 34, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={layout[index % layout.length]}
            >
              <Link href={`/works/${work.category}/${work.slug}`} className="group block">
                <div className="relative overflow-hidden bg-neutral-200">
                  <PortfolioImage
                    src={work.cover}
                    alt={work.title}
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    aspect="aspect-[5/4] md:aspect-[4/3]"
                    imageClassName="transition duration-[1200ms] ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0 opacity-70 transition group-hover:opacity-90" />
                  <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-4 p-5 text-paper sm:flex-row sm:items-end sm:justify-between md:p-7">
                    <div>
                      <p className="text-2xl font-medium leading-tight md:text-4xl">{work.title}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/72 md:text-sm md:tracking-[0.2em]">{work.englishName}</p>
                    </div>
                    <ArrowUpRight className="mb-1 shrink-0 opacity-70 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                  </div>
                </div>
                <div className="mt-5 flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                  <p className="max-w-xl text-sm leading-7 text-ink/62">{work.description}</p>
                  <div className="shrink-0 text-xs uppercase tracking-[0.16em] text-muted sm:text-right sm:tracking-[0.2em]">
                    <p>{work.year}</p>
                    <p className="mt-2">{work.projectType}</p>
                  </div>
                </div>
              </Link>
            </MotionArticle>
          ))}
        </div>
      </div>
    </section>
  );
}
