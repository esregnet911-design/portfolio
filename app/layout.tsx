import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation";

export const metadata: Metadata = {
  title: {
    default: "Eren Portfolio | Packaging Structure Designer",
    template: "%s | Eren Portfolio"
  },
  description:
    "Eren Portfolio presents packaging structure design, industrial design, product rendering and visual works.",
  keywords: [
    "Packaging Design",
    "Structure Design",
    "Industrial Design",
    "Portfolio",
    "王志华",
    "包装结构设计"
  ],
  openGraph: {
    title: "Eren Portfolio | Packaging Structure Designer",
    description: "Packaging structure design, product design and visual presentation portfolio.",
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
