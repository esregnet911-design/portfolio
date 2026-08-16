import fs from "fs";
import path from "path";

export type WorkCategory = "packaging" | "product-design" | "photography";

export type ProjectImages = {
  cover?: string;
  overview?: string;
  process?: string[];
  structure?: string[];
  render?: string[];
  gallery?: string[];
};

export type WorkItem = {
  slug: string;
  category: WorkCategory;
  order: number;
  title: string;
  englishName: string;
  year: string;
  projectType: string;
  description: string;
  process: string;
  software: string[];
  material: string;
  role: string;
  notes: string;
  cover: string;
  images: string[];
  stagedImages: Required<ProjectImages>;
};

type ProjectJson = {
  slug: string;
  category: WorkCategory;
  order?: number;
  name: string;
  name_en?: string;
  type?: string;
  year?: string;
  description?: string;
  process?: string;
  software?: string[];
  material?: string;
  role?: string;
  notes?: string;
  images?: ProjectImages;
};

const projectRoot = path.join(process.cwd(), "content", "projects");
const fallbackCover = "/images/works/packaging/electronic-whiteboard/cover.svg";

function normalizeImages(images: ProjectImages | undefined): Required<ProjectImages> {
  return {
    cover: images?.cover || "",
    overview: images?.overview || "",
    process: images?.process || [],
    structure: images?.structure || [],
    render: images?.render || [],
    gallery: images?.gallery || []
  };
}

function flattenImages(staged: Required<ProjectImages>) {
  return [
    staged.cover,
    staged.overview,
    ...staged.process,
    ...staged.structure,
    ...staged.render,
    ...staged.gallery
  ].filter(Boolean);
}

export function getWorks(category?: WorkCategory): WorkItem[] {
  if (!fs.existsSync(projectRoot)) return [];

  return fs
    .readdirSync(projectRoot)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(projectRoot, file), "utf8");
      const project = JSON.parse(raw) as ProjectJson;
      const stagedImages = normalizeImages(project.images);
      const images = flattenImages(stagedImages);

      return {
        slug: project.slug,
        category: project.category,
        order: project.order || 999,
        title: project.name,
        englishName: project.name_en || project.slug.replaceAll("-", " "),
        year: project.year || "",
        projectType: project.type || project.category,
        description: project.description || "",
        process: project.process || "",
        software: project.software || [],
        material: project.material || "",
        role: project.role || "",
        notes: project.notes || "",
        cover: stagedImages.cover || images[0] || fallbackCover,
        images,
        stagedImages
      };
    })
    .filter((work) => (category ? work.category === category : true))
    .sort((a, b) => a.order - b.order);
}

export function getWork(category: WorkCategory, slug: string) {
  return getWorks(category).find((work) => work.slug === slug);
}

export function getAllWorkParams() {
  return getWorks().map((work) => ({
    category: work.category,
    slug: work.slug
  }));
}
