import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MotionArticle } from "@/components/motion";
import { PortfolioImage } from "@/components/portfolio-image";
import type { WorkItem } from "@/lib/works";

export function WorkCard({ work }: { work: WorkItem }) {
  return (
    <MotionArticle
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link href={`/works/${work.category}/${work.slug}`} className="block">
        <div className="relative overflow-hidden bg-neutral-200">
          <PortfolioImage
            src={work.cover}
            alt={work.title}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            aspect="aspect-[4/3]"
            imageClassName="transition duration-700 group-hover:scale-[1.035]"
          />
          <div className="absolute right-4 top-4 grid size-10 place-items-center border border-white/40 bg-white/70 text-ink opacity-0 backdrop-blur-md transition group-hover:opacity-100">
            <ArrowUpRight size={18} />
          </div>
        </div>
        <div className="flex items-start justify-between gap-5 border-b border-line py-5">
          <div>
            <p className="text-lg font-medium">{work.title}</p>
            <p className="mt-1 text-sm uppercase tracking-[0.18em] text-muted">
              {work.englishName}
            </p>
          </div>
          <p className="shrink-0 text-sm text-muted">{work.year}</p>
        </div>
        <p className="mt-4 line-clamp-2 text-sm leading-7 text-ink/62">{work.description}</p>
      </Link>
    </MotionArticle>
  );
}
