"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Fade, MaskReveal, Rule, asset, ease } from "@/lib/ui";
import { nirvaa } from "@/content/portfolio";

const BLOB = "58% 42% 46% 54% / 48% 56% 44% 52%";

export default function Nirvaa() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const loungeY = useTransform(scrollYProgress, [0, 1], ["10%", reduce ? "10%" : "-25%"]);
  const letterSpacing = useTransform(scrollYProgress, [0, 0.12], [reduce ? "0.08em" : "0.45em", "0.08em"]);

  return (
    <section id="nirvaa" ref={ref} data-chapter="03 — NIRVAA" data-nav="work" className="relative bg-[#f6f0e6] text-cocoa">
      <div className="px-4 pb-16 pt-28 sm:px-8 sm:pt-40">
        <p className="eyebrow text-center text-terracotta">Project 03 · Brand Extension · Product Innovation · Marketing Strategy</p>
        <motion.h2
          style={{ letterSpacing }}
          className="font-display mt-8 text-center text-[20vw] leading-[0.85] text-cocoa sm:text-[15vw]"
        >
          NIRVAA
        </motion.h2>
        <p className="font-display mt-4 text-center text-xl italic text-terracotta sm:text-2xl">A part of the Kama Ayurveda family</p>

        {/* Kama Ayurveda → Opportunity → NIRVAA */}
        <ol className="mx-auto mt-24 grid max-w-6xl gap-12 md:grid-cols-3 md:gap-10">
          {nirvaa.story.map((s, i) => (
            <li key={s.k} className="relative">
              <Fade delay={i * 0.15}>
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-sage" />
                  <span className="eyebrow text-terracotta">{s.k}</span>
                  {i < 2 && <span className="hidden flex-1 border-t border-dashed border-cocoa/25 md:block" />}
                </div>
                <p className="mt-4 text-lg leading-relaxed text-cocoa/85">{s.v}</p>
              </Fade>
            </li>
          ))}
        </ol>
      </div>

      {/* Concept */}
      <div className="relative grid grid-cols-12 items-center gap-x-4 gap-y-12 px-4 py-20 sm:px-8 sm:py-32">
        <div className="col-span-12 md:col-span-5">
          <motion.div
            className="relative mx-auto aspect-square w-[86%] overflow-hidden shadow-[0_40px_80px_-30px_rgba(74,42,29,0.45)]"
            style={{ borderRadius: BLOB }}
            animate={
              reduce
                ? undefined
                : { borderRadius: [BLOB, "44% 56% 52% 48% / 56% 44% 56% 44%", BLOB] }
            }
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.img
              src={asset("/media/nirvaa-box.webp")}
              alt="NIRVAA packaging with herbal ingredients and essential-oil bottles"
              loading="lazy"
              width={622}
              height={620}
              initial={reduce ? false : { scale: 1.25, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.8, ease }}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
        <div className="col-span-12 md:col-span-6 md:col-start-7">
          <p className="eyebrow text-terracotta">The concept</p>
          <h3 className="font-display mt-5 text-[13vw] leading-[0.9] md:text-[6.2vw]">
            <MaskReveal>Luxury Through</MaskReveal>
            <MaskReveal delay={0.1}>
              <em className="text-terracotta">Mindfulness</em>
            </MaskReveal>
          </h3>
          <dl className="mt-12 space-y-8">
            {[
              { k: "The Product", v: nirvaa.product },
              { k: "Target Market", v: nirvaa.target },
              { k: "Value Proposition", v: nirvaa.value },
            ].map((d, i) => (
              <Fade key={d.k} delay={i * 0.1}>
                <dt className="eyebrow text-sage">{d.k}</dt>
                <dd className="mt-2 max-w-lg leading-relaxed text-cocoa/85">{d.v}</dd>
              </Fade>
            ))}
          </dl>
        </div>

        <motion.img
          src={asset("/media/nirvaa-lounge.webp")}
          alt=""
          aria-hidden
          loading="lazy"
          style={{ y: loungeY }}
          className="pointer-events-none absolute -right-8 bottom-[-12%] hidden w-[17vw] rotate-3 opacity-90 drop-shadow-[0_30px_40px_rgba(74,42,29,0.25)] lg:block"
        />
      </div>

      <Aromatherapy />
      <Growth />
    </section>
  );
}

function Aromatherapy() {
  const ref = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const tones = nirvaa.aromas.map((a) => a.tone);
  const bg = useTransform(scrollYProgress, [0, 0.33, 0.5, 0.66, 0.83, 1], [tones[0], tones[0], tones[1], tones[1], tones[2], tones[2]]);
  const ink = nirvaa.aromas[idx].ink;
  useMotionValueEvent(scrollYProgress, "change", (v) => setIdx(Math.min(2, Math.floor(v * 3))));
  const a = nirvaa.aromas[idx];

  return (
    <motion.div ref={ref} style={{ backgroundColor: bg }} className="relative h-[330vh]" aria-label="Aromatherapy experience">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden px-4 sm:px-8">
        <div className="flex items-baseline justify-between">
          <p className="eyebrow" style={{ color: ink }}>The Aromatherapy Experience</p>
          <p className="mono" style={{ color: ink }}>0{idx + 1} / 03</p>
        </div>

        <div className="mt-8 grid grid-cols-12 items-center gap-x-4 gap-y-8">
          <div className="relative col-span-12 h-[40svh] md:col-span-5 md:h-[64svh]">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={a.image}
                initial={{ opacity: 0, scale: 1.08, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
                transition={{ duration: 1.1, ease }}
                className="arch-mask absolute inset-y-0 left-1/2 aspect-[2/3] h-full -translate-x-1/2 overflow-hidden md:left-0 md:translate-x-0"
              >
                <img src={asset(a.image)} alt={a.blend} className="h-full w-full object-cover" />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="col-span-12 md:col-span-7" style={{ color: ink }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={a.mood}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.7, ease }}
              >
                <p className="font-display text-[22vw] italic leading-[0.8] md:text-[12vw]">{a.mood}</p>
                <p className="font-display mt-4 text-3xl sm:text-5xl">{a.blend}</p>
                <p className="eyebrow mt-4 opacity-70">{a.benefit}</p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-10 flex gap-2">
              {nirvaa.aromas.map((x, i) => (
                <span key={x.mood} className="h-px flex-1 transition-opacity duration-500" style={{ background: ink, opacity: i === idx ? 0.9 : 0.2 }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Growth() {
  return (
    <div className="grid grid-cols-12 gap-x-4 gap-y-16 px-4 py-24 sm:px-8 sm:py-36">
      <div className="col-span-12 md:col-span-4">
        <p className="eyebrow text-terracotta">Growing NIRVAA</p>
        <h3 className="font-display mt-4 text-5xl leading-none sm:text-6xl">Strategy</h3>
        <ol className="mt-10">
          {nirvaa.strategy.map((s, i) => (
            <li key={s}>
              <Rule />
              <Fade delay={i * 0.08} className="flex items-baseline gap-4 py-4">
                <span className="mono text-sage">0{i + 1}</span>
                <span className="text-lg">{s}</span>
              </Fade>
            </li>
          ))}
        </ol>
      </div>

      <div className="col-span-12 md:col-span-7 md:col-start-6">
        <p className="eyebrow text-terracotta">Marketing Mix</p>
        <h3 className="font-display mt-4 text-5xl leading-none sm:text-6xl">
          The <em className="text-terracotta">7Ps</em>
        </h3>
        <dl className="mt-10 grid gap-x-10 sm:grid-cols-2">
          {nirvaa.sevenPs.map((p, i) => (
            <Fade key={p.p} delay={(i % 2) * 0.08} className="border-t border-cocoa/15 py-4">
              <dt className="font-display text-2xl">{p.p}</dt>
              <dd className="mt-1 text-cocoa/75">{p.v}</dd>
            </Fade>
          ))}
        </dl>
      </div>
    </div>
  );
}
