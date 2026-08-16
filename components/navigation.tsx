"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/works", label: "Works" },
  { href: "/contact", label: "Contact" }
];

export function Navigation() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <motion.header
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed left-0 right-0 top-0 z-30 border-b backdrop-blur-xl ${
        isHome ? "border-white/10 bg-black/18 text-white" : "border-black/10 bg-paper/78 text-ink"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="text-xs font-medium uppercase tracking-[0.16em] md:text-sm md:tracking-[0.22em]">
          WZH
        </Link>
        <div className="flex items-center gap-0 md:gap-1">
          {links.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-1.5 py-2 text-[11px] uppercase tracking-[0.08em] transition sm:px-3 sm:text-xs sm:tracking-[0.16em] md:text-sm ${
                  isHome ? "text-white/68 hover:text-white" : "text-ink/62 hover:text-ink"
                }`}
              >
                {link.label}
                {active ? (
                  <motion.span
                    layoutId="nav-indicator"
                    className={`absolute inset-x-3 bottom-1 h-px ${isHome ? "bg-white" : "bg-ink"}`}
                    transition={{ duration: 0.35 }}
                  />
                ) : null}
              </Link>
            );
          })}
        </div>
      </nav>
    </motion.header>
  );
}
