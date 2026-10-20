"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Fade, MaskReveal, asset, ease, useMediaQuery } from "@/lib/ui";
import { koskii } from "@/content/portfolio";

export default function Koskii() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const filiY = useTransform(scrollYProgress, [0, 1], ["-10%", reduce ? "-10%" : "30%"]);

  return (
    <section id="koskii" ref={ref} data-chapter="01 — Koskii × Bridgerton" data-nav="work" className="relative overflow-x-clip bg-regency text-ink">
      {/* Filigree ornaments */}
      <motion.img
        src={asset("/media/filigree.webp")}
        alt=""
        aria-hidden
        loading="lazy"
        style={{ y: filiY }}
        className="pointer-events-none absolute -right-10 top-10 w-40 opacity-70 sm:w-64"
      />
      <motion.img
        src={asset("/media/filigree.webp")}
        alt=""
        aria-hidden
        loading="lazy"
        style={{ y: filiY }}
        className="pointer-events-none absolute -left-12 top-[38%] hidden w-56 -scale-x-100 opacity-50 md:block"
      />

      <div className="relative px-4 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-40">
        {/* Lace-like double border frame */}
        <div className="relative border border-ink/20 p-2">
          <div className="border border-dashed border-ink/20 px-5 py-14 text-center sm:px-10 sm:py-24">
            <p className="eyebrow text-wine">Project 01 · {koskii.season}</p>
            <h2 className="font-display mt-6 text-[15vw] leading-[0.85] sm:text-[11vw]">
              <MaskReveal>Koskii</MaskReveal>
              <MaskReveal delay={0.08}>
                <em className="text-wine">×</em> Bridgerton
              </MaskReveal>
            </h2>
            <p className="font-display mx-auto mt-8 max-w-xl text-xl italic text-ink/70 sm:text-2xl">
              Regency romance, reimagined through Indian occasion wear.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-20 grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
          <Fade>
            <p className="eyebrow text-wine">The Brief</p>
            <p className="mt-4 text-lg leading-relaxed sm:text-xl">{koskii.brief}</p>
          </Fade>
          <Fade delay={0.12}>
            <p className="eyebrow text-wine">The Consumer</p>
            <p className="mt-4 text-lg leading-relaxed sm:text-xl">{koskii.consumer}</p>
          </Fade>
        </div>

        <Collections />
      </div>

      <WindowDisplay />
    </section>
  );
}

function Collections() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const wide = useMediaQuery("(min-width: 768px)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  // Envelopes start stacked and fan open as you arrive
  const spread = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0, 1]);
  const xs = [-1, 0, 1].map((d) => useTransform(spread, (s) => `${d * s * (wide ? 78 : 34)}%`));
  const rs = [-1, 0, 1].map((d) => useTransform(spread, (s) => d * s * 7));

  // Display order: Veiled, Wild, Woven
  const order = koskii.collections;

  return (
    <div ref={ref} className="mt-28 sm:mt-40">
      <div className="text-center">
        <p className="eyebrow text-wine">Three collection stories</p>
      </div>

      <div className="relative mx-auto mt-10 flex h-[420px] max-w-5xl items-center justify-center sm:h-[560px]">
        {order.map((c, i) => (
          <motion.button
            key={c.name}
            onPointerEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            aria-label={c.name}
            style={{ x: xs[i], rotate: rs[i], zIndex: active === i ? 30 : 10 + (i === 1 ? 5 : 0) }}
            animate={{ y: active === i ? -18 : 0, scale: active === i ? 1.04 : 0.96 }}
            transition={{ duration: 0.6, ease }}
            className="absolute w-[46%] max-w-[300px] sm:w-[30%]"
          >
            <img
              src={asset(c.image)}
              alt={`${c.name} collection moodboard presented in a lace envelope`}
              loading="lazy"
              width={369}
              height={582}
              className={`w-full drop-shadow-[0_24px_30px_rgba(21,17,17,0.18)] transition-[filter] duration-500 ${
                active === i ? "" : "saturate-[0.7]"
              }`}
            />
          </motion.button>
        ))}
      </div>

      <div className="mx-auto mt-6 min-h-[170px] max-w-xl text-center">
        <div className="mb-5 flex justify-center gap-3">
          {order.map((c, i) => (
            <button
              key={c.name}
              onClick={() => setActive(i)}
              className={`eyebrow border-b pb-1 transition-colors ${active === i ? "border-wine text-wine" : "border-transparent text-ink/50"}`}
            >
              {c.name}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease }}
          >
            <h3 className="font-display text-4xl italic sm:text-5xl">{order[active].name}</h3>
            <p className="mt-3 leading-relaxed text-ink/75">{order[active].text}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function WindowDisplay() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Envelope-shaped window opens into a full-bleed photograph
  const clip = useTransform(scrollYProgress, [0, 0.35], reduce
    ? ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
    : ["inset(16% 22% 16% 22%)", "inset(0% 0% 0% 0%)"]);
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 1.18, 1]);
  const titleY = useTransform(scrollYProgress, [0.15, 0.45], ["40%", "0%"]);
  const titleO = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);
  const scrim = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  return (
    <div ref={ref} className="relative h-[260vh] bg-ink" aria-label="Physical window display execution">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div style={{ clipPath: clip }} className="absolute inset-0">
          <motion.img
            src={asset("/media/window-display.webp")}
            alt="The physical Koskii × Bridgerton window display: the final pastel gown on a dress form, framed by draped curtains, florals and props"
            loading="lazy"
            width={896}
            height={672}
            style={{ scale }}
            className="h-full w-full object-cover"
          />
          <motion.div
            style={{ opacity: scrim }}
            className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent md:bg-gradient-to-r md:from-ink/80 md:via-ink/25"
          />
        </motion.div>

        <motion.div
          style={{ y: titleY, opacity: titleO }}
          className="absolute inset-x-4 bottom-8 text-cream sm:inset-x-8 sm:bottom-12 md:bottom-auto md:top-1/2 md:max-w-[46%] md:-translate-y-1/2"
        >
          <p className="font-display text-xl italic text-blush sm:text-2xl">Physical Window Display Execution</p>
          <h3 className="font-display mt-3 text-[13vw] uppercase leading-[0.85] md:text-[6.4vw]">
            From concept <br />
            <em className="normal-case">to retail</em>
          </h3>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 md:mt-12">
            {koskii.execution.map((e, i) => (
              <Detail key={e.k} k={e.k} v={e.v} i={i} progress={scrollYProgress} />
            ))}
          </dl>
          <Note progress={scrollYProgress} />
        </motion.div>
      </div>
    </div>
  );
}

function Note({ progress }: { progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const o = useTransform(progress, [0.8, 0.9], [0, 1]);
  return (
    <motion.p style={{ opacity: o }} className="mt-6 hidden max-w-md text-sm leading-relaxed text-cream/75 md:block">
      {koskii.executionNote}
    </motion.p>
  );
}

function Detail({
  k,
  v,
  i,
  progress,
}: {
  k: string;
  v: string;
  i: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = 0.45 + i * 0.08;
  const o = useTransform(progress, [start, start + 0.08], [0, 1]);
  const x = useTransform(progress, [start, start + 0.08], [-16, 0]);
  return (
    <motion.div style={{ opacity: o, x }} className="border-t border-cream/30 pt-3">
      <dt className="eyebrow text-blush">{k}</dt>
      <dd className="mt-1 text-sm leading-snug text-cream/90 sm:text-base">{v}</dd>
    </motion.div>
  );
}
