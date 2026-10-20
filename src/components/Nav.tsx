"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ease, scrollToId } from "@/lib/ui";

const links = [
  { id: "top", label: "Index" },
  { id: "profile", label: "Profile" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [chapter, setChapter] = useState<string | null>(null);
  const [active, setActive] = useState("top");

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          setChapter(el.dataset.chapter || null);
          setActive(el.dataset.nav || "work");
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference text-[#f3ede2]">
        <nav className="flex items-center justify-between px-4 py-4 sm:px-8 sm:py-5" aria-label="Main">
          <a href="#top" onClick={go("top")} className="eyebrow !tracking-[0.18em]">
            VS / 2026
          </a>
          <ul className="flex gap-4 sm:gap-8">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={go(l.id)}
                  className="eyebrow relative inline-block py-1 transition-opacity hover:opacity-60"
                  aria-current={active === l.id ? "true" : undefined}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-current transition-transform duration-500 ${
                      active === l.id ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Current chapter indicator */}
      <div className="pointer-events-none fixed bottom-4 left-4 z-50 mix-blend-difference text-[#f3ede2] sm:bottom-6 sm:left-8">
        <AnimatePresence mode="wait">
          {chapter && (
            <motion.div
              key={chapter}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              className="eyebrow flex items-center gap-3"
            >
              <span className="inline-block h-px w-6 bg-current" />
              {chapter}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
