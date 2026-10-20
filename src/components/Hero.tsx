"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { asset, ease, scrollToId } from "@/lib/ui";
import { person } from "@/content/portfolio";

const NAME = "VINOTHINI";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Scroll-linked layers
  const nameX = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-18%"]);
  const avatarY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "22%"]);
  const spiralRot = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Pointer parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const avX = useTransform(sx, (v) => v * 14);
  const avRY = useTransform(sy, (v) => v * 8);
  const spX = useTransform(sx, (v) => v * -26);
  const spY = useTransform(sy, (v) => v * -18);

  useEffect(() => {
    if (reduce) return;
    const on = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", on, { passive: true });
    return () => window.removeEventListener("pointermove", on);
  }, [mx, my, reduce]);

  const letters = NAME.split("");

  const Name = ({ outline = false }: { outline?: boolean }) => (
    <motion.h1
      aria-hidden={outline}
      style={{ x: nameX }}
      className={`font-display pointer-events-none absolute bottom-[-0.14em] left-[-0.04em] whitespace-nowrap leading-[0.8] text-[33vw] sm:text-[27vw] ${
        outline ? "z-30 text-transparent" : "z-10 text-burgundy"
      }`}
    >
      <span style={outline ? { WebkitTextStroke: "1.5px rgba(92,15,27,0.75)" } : undefined} className="inline-flex">
        {letters.map((l, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.02em]">
            <motion.span
              className="inline-block"
              initial={reduce ? false : { y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.2, ease, delay: 0.25 + i * 0.05 }}
            >
              {l}
            </motion.span>
          </span>
        ))}
        <span className="inline-block overflow-hidden">
          <motion.span
            className="ml-[0.18em] inline-block italic"
            initial={reduce ? false : { y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.2, ease, delay: 0.25 + letters.length * 0.05 }}
          >
            S
          </motion.span>
        </span>
      </span>
      {!outline && <span className="sr-only">{person.name} — Fashion, Branding, Marketing portfolio</span>}
    </motion.h1>
  );

  return (
    <section
      id="top"
      ref={ref}
      data-chapter=""
      data-nav="top"
      className="relative h-[100svh] min-h-[600px] overflow-hidden bg-cream"
    >
      {/* Spiral rings */}
      <motion.img
        src={asset("/media/spiral.webp")}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[34%] z-0 w-[150vw] max-w-none -translate-x-1/2 opacity-60 sm:left-[58%] sm:top-[-6%] sm:w-[62vw]"
        style={{ rotate: spiralRot, x: spX, y: spY }}
        initial={reduce ? false : { opacity: 0, scale: 0.85 }}
        animate={{ opacity: 0.55, scale: 1 }}
        transition={{ duration: 2, ease }}
      />

      {/* Meta row */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute inset-x-0 top-[4.5rem] z-40 flex items-start justify-between px-4 sm:top-24 sm:px-8"
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.9 }}
        >
          <p className="eyebrow text-burgundy">Portfolio</p>
          <p className="font-display mt-1 text-2xl italic text-ink sm:text-4xl">{person.edition}</p>
        </motion.div>
        <motion.ul
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 1.05 }}
          className="eyebrow text-right leading-[2] text-ink"
        >
          {person.positioning.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Name behind avatar */}
      <Name />

      {/* Avatar — stands inside the typography */}
      <motion.div
        style={{ y: avatarY }}
        className="absolute bottom-0 left-1/2 z-20 h-[60svh] -translate-x-1/2 sm:left-[57%] sm:h-[88svh]"
      >
        <motion.img
          src={asset("/media/avatar.webp")}
          alt="Illustrated character of Vinothini in a burgundy knit and cream trousers"
          width={261}
          height={787}
          fetchPriority="high"
          className="h-full w-auto drop-shadow-[0_30px_40px_rgba(92,15,27,0.18)]"
          style={{ x: avX, rotateY: avRY }}
          initial={reduce ? false : { opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease, delay: 0.55 }}
        />
      </motion.div>

      {/* Outline copy of the name passes over her */}
      <Name outline />

      {/* Intro + scroll cue */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute left-4 top-[10.5rem] z-40 max-w-[15rem] sm:left-8 sm:top-[42%] sm:max-w-[19rem]"
      >
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.3 }}
          className="text-[0.9rem] leading-snug text-ink/80 sm:text-base"
        >
          Fashion business student turning creative ideas into brand, retail and campaign thinking.
        </motion.p>
        <motion.button
          onClick={() => scrollToId("work")}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.5 }}
          className="eyebrow group mt-5 inline-flex items-center gap-3 text-burgundy"
        >
          <span className="relative inline-block h-px w-10 overflow-hidden bg-burgundy/30">
            <span className="absolute inset-0 origin-left scale-x-0 bg-burgundy transition-transform duration-500 group-hover:scale-x-100" />
          </span>
          Explore the work
        </motion.button>
      </motion.div>
    </section>
  );
}
