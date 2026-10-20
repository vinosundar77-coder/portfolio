"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { MaskReveal, asset, ease, scrollToId, useMediaQuery } from "@/lib/ui";
import { projects } from "@/content/portfolio";

export default function WorkIndex() {
  const [hover, setHover] = useState<number | null>(null);
  const [curtain, setCurtain] = useState<{ label: string } | null>(null);
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 140, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 140, damping: 22, mass: 0.6 });

  const move = (e: React.PointerEvent) => {
    const r = wrap.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  const open = (id: string, label: string) => {
    if (reduce) return scrollToId(id, { immediate: true });
    setCurtain({ label });
    setTimeout(() => scrollToId(id, { immediate: true }), 750);
    setTimeout(() => setCurtain(null), 900);
  };

  return (
    <section id="work" data-chapter="Selected Work" data-nav="work" className="relative bg-ink px-4 py-28 text-cream sm:px-8 sm:py-40">
      <div className="flex items-end justify-between gap-6">
        <h2 className="font-display text-[19vw] leading-[0.8] sm:text-[13vw]">
          <MaskReveal>Selected</MaskReveal>
          <MaskReveal delay={0.08}>
            <em className="text-blush">Work</em>
          </MaskReveal>
        </h2>
        <p className="mono mb-3 text-cream/50">(05 projects)</p>
      </div>

      <div ref={wrap} onPointerMove={move} onPointerLeave={() => setHover(null)} className="relative mt-16 sm:mt-24">
        <ul>
          {projects.map((p, i) => (
            <li key={p.id} className="border-t border-cream/15 last:border-b">
              <a
                href={`#${p.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  open(p.id, `${p.num} — ${p.name}`);
                }}
                onPointerEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                className="group grid grid-cols-12 items-baseline gap-x-4 py-6 sm:py-8"
              >
                <span className="mono col-span-2 text-cream/50 sm:col-span-1">{p.num}</span>
                <span
                  className={`font-display col-span-10 text-[11vw] leading-[0.95] transition-all duration-500 sm:col-span-7 sm:text-[7vw] ${
                    hover !== null && hover !== i ? "opacity-30" : "opacity-100"
                  } ${hover === i ? "translate-x-4 italic text-blush" : ""}`}
                >
                  {p.name}
                </span>
                <span className="col-span-10 col-start-3 mt-2 text-sm leading-snug text-cream/60 sm:col-span-4 sm:col-start-auto sm:mt-0 sm:text-right">
                  {p.tags}
                </span>
              </a>
            </li>
          ))}
        </ul>

        {fine && (
          <motion.div aria-hidden className="pointer-events-none absolute left-0 top-0 z-20" style={{ x: sx, y: sy }}>
            <AnimatePresence mode="popLayout">
              {hover !== null && (
                <motion.div
                  key={projects[hover].id}
                  initial={{ clipPath: "inset(50% 50% 50% 50%)", scale: 1.1 }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
                  exit={{ clipPath: "inset(50% 50% 50% 50%)", opacity: 0 }}
                  transition={{ duration: 0.6, ease }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                >
                  <img
                    src={asset(projects[hover].preview)}
                    alt=""
                    className="h-[340px] w-[270px] object-cover"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Page-turn curtain */}
      <AnimatePresence>
        {curtain && (
          <motion.div
            key="curtain"
            className="fixed inset-0 z-[70] flex items-center justify-center bg-burgundy text-cream"
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="font-display text-5xl italic sm:text-7xl">{curtain.label}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
