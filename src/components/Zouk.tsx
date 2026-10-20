"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { Fade, MaskReveal, asset, ease, useMediaQuery } from "@/lib/ui";
import { zouk } from "@/content/portfolio";

const STRIPS = 7;

/** Image revealed in vertical bands, like fabric panels sliding into a fixture. */
function StripReveal({ src, alt, w, h, className = "" }: { src: string; alt: string; w: number; h: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: `${w} / ${h}` }}>
      <img src={asset(src)} alt={alt} width={w} height={h} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      {!reduce &&
        Array.from({ length: STRIPS }).map((_, i) => (
          <motion.span
            key={i}
            aria-hidden
            className="absolute top-0 h-full bg-zouk"
            style={{ left: `${(i / STRIPS) * 100}%`, width: `${100 / STRIPS + 0.3}%`, originY: i % 2 ? 0 : 1 }}
            initial={{ scaleY: 1 }}
            whileInView={{ scaleY: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.1, ease, delay: 0.08 * i }}
          />
        ))}
    </div>
  );
}

export default function Zouk() {
  return (
    <section id="zouk" data-chapter="02 — Zouk" data-nav="work" className="block-print relative text-cream">
      <div className="px-4 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-40">
        <div className="grid grid-cols-12 gap-x-4 gap-y-12">
          <div className="col-span-12 md:col-span-5">
            <StripReveal
              src="/media/zouk-hero.webp"
              alt="Zouk campaign image: a woman seated on leather cinema seats beside a block-printed Zouk trolley bag"
              w={922}
              h={1383}
            />
          </div>
          <div className="col-span-12 flex flex-col md:col-span-6 md:col-start-7">
            <p className="eyebrow text-mustard">Project 02 · Retail Strategy · Omnichannel · Customer Experience</p>
            <h2 className="font-display mt-6 text-[26vw] leading-[0.78] text-mustard md:text-[15vw]">
              <MaskReveal>Zouk</MaskReveal>
            </h2>
            <p className="font-display mt-4 text-3xl italic sm:text-4xl">The Retail Challenge</p>

            <Fade className="mt-12 max-w-lg">
              <p className="eyebrow text-mustard/80">The Context</p>
              <p className="mt-3 text-lg leading-relaxed text-cream/85">{zouk.context}</p>
            </Fade>

            <Fade delay={0.1} className="mt-auto pt-14">
              <p className="eyebrow text-mustard/80">The Opportunity</p>
              <blockquote className="font-display mt-4 border-l border-mustard/60 pl-5 text-3xl leading-[1.1] sm:text-[2.6rem]">
                {zouk.opportunity}
              </blockquote>
            </Fade>
          </div>
        </div>
      </div>

      <Recommendations />
    </section>
  );
}

function Recommendations() {
  const wide = useMediaQuery("(min-width: 900px)");
  const reduce = useReducedMotion();
  const horizontal = wide && !reduce;
  return (
    <div className="relative">
      <div className="px-4 sm:px-8">
        <div className="flex items-baseline justify-between border-t border-mustard/30 pt-6">
          <p className="eyebrow text-mustard">Strategic Recommendations</p>
          <p className="mono text-cream/50">{horizontal ? "scroll →" : "04"}</p>
        </div>
      </div>
      {horizontal ? <HorizontalTrack /> : <StackedList />}
    </div>
  );
}

function HorizontalTrack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  return (
    <div ref={ref} className="relative h-[420vh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <motion.div style={{ x }} className="flex w-[400vw]">
          {zouk.recommendations.map((r, i) => (
            <Panel key={r.num} r={r} i={i} progress={scrollYProgress} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function Panel({
  r,
  i,
  progress,
}: {
  r: (typeof zouk.recommendations)[number];
  i: number;
  progress: MotionValue<number>;
}) {
  const center = i / 3;
  // Keep every input range inside 0–1 (scroll timelines reject offsets outside it)
  const lo = Math.max(0, center - 0.2);
  const hi = Math.min(1, center + 0.2);
  const imgX = useTransform(progress, [Math.max(0, center - 0.33), Math.min(1, center + 0.33)], [
    center === 0 ? "0%" : "14%",
    center === 1 ? "0%" : "-14%",
  ]);
  const numO = useTransform(
    progress,
    center === 0 ? [0, hi] : center === 1 ? [lo, 1] : [lo, center, hi],
    center === 0 ? [1, 0.15] : center === 1 ? [0.15, 1] : [0.15, 1, 0.15]
  );
  const flip = i % 2 === 1;
  return (
    <article className="grid h-[100svh] w-screen grid-cols-12 items-center gap-x-10 px-8 lg:px-16">
      <div className={`col-span-6 overflow-hidden ${flip ? "order-2" : ""}`}>
        <motion.img
          src={asset(r.image)}
          alt={r.title}
          loading="lazy"
          style={{ x: imgX, scale: 1.25 }}
          className="h-[64vh] w-full object-cover"
        />
      </div>
      <div className={`col-span-5 ${flip ? "order-1 col-start-2" : ""}`}>
        <motion.span style={{ opacity: numO }} className="font-display block text-[9vw] leading-none text-mustard">
          {r.num}
        </motion.span>
        <h3 className="font-display mt-6 text-[3.2vw] leading-[1.02]">{r.title}</h3>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/80">{r.text}</p>
      </div>
    </article>
  );
}

function StackedList() {
  return (
    <div className="space-y-20 px-4 pb-28 pt-12 sm:px-8">
      {zouk.recommendations.map((r) => (
        <article key={r.num}>
          <div className="flex items-baseline gap-4">
            <span className="font-display text-6xl text-mustard">{r.num}</span>
            <h3 className="font-display text-3xl leading-tight sm:text-4xl">{r.title}</h3>
          </div>
          <StripReveal src={r.image} alt={r.title} w={768} h={512} className="mt-6" />
          <Fade>
            <p className="mt-5 text-lg leading-relaxed text-cream/80">{r.text}</p>
          </Fade>
        </article>
      ))}
    </div>
  );
}
