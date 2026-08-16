import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation";

export const metadata: Metadata = {
  title: {
    default: "王志华 | Personal Portfolio",
    template: "%s | 王志华 Portfolio"
  },
  description:
    "Packaging structure designer and industrial designer portfolio, featuring packaging structures, product design, rendering and photography.",
  keywords: [
    "Packaging Design",
    "Structure Design",
    "Industrial Design",
    "Portfolio",
    "王志华",
    "包装结构设计"
  ],
  openGraph: {
    title: "王志华 | Packaging Designer / Industrial Designer",
    description: "Personal portfolio for packaging structure, product design and visual works.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <Navigation />
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
