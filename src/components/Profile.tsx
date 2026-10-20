"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { Fade, MaskReveal, Rule, asset, ease, scrollToId, useMediaQuery } from "@/lib/ui";
import { education, experience, person, skillEvidence, skillList, tools } from "@/content/portfolio";

export default function Profile() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const brushRot = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -14, reduce ? 0 : 18]);
  const brushScale = useTransform(scrollYProgress, [0, 0.4], [reduce ? 1 : 0.8, 1]);
  const portraitY = useTransform(scrollYProgress, [0, 1], ["8%", reduce ? "8%" : "-8%"]);

  return (
    <section id="profile" ref={ref} data-chapter="Profile" data-nav="profile" className="relative bg-cream px-4 pb-24 pt-28 sm:px-8 sm:pb-40 sm:pt-40">
      {/* Opening composition */}
      <div className="relative grid grid-cols-12 gap-x-4 gap-y-12">
        <div className="relative col-span-12 md:col-span-5">
          <div className="relative mx-auto aspect-[4/5] w-[78%] max-w-[440px] md:w-full">
            <motion.img
              src={asset("/media/brush.webp")}
              alt=""
              aria-hidden
              loading="lazy"
              style={{ rotate: brushRot, scale: brushScale }}
              className="absolute -left-[18%] -top-[12%] w-[130%] max-w-none opacity-80"
            />
            <motion.img
              src={asset("/media/portrait.webp")}
              alt="Portrait of Vinothini S"
              width={448}
              height={541}
              loading="lazy"
              style={{ y: portraitY }}
              className="relative z-10 h-full w-full object-contain object-bottom [mask-image:linear-gradient(to_bottom,#000_78%,transparent)]"
            />
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 md:col-start-7 md:pt-10">
          <p className="eyebrow text-burgundy">Profile — About</p>
          <h2 className="font-display mt-6 text-[17vw] leading-[0.85] text-ink sm:text-[12vw] md:text-[8.4vw]">
            <MaskReveal>Hello,</MaskReveal>
            <MaskReveal delay={0.08}>
              I&rsquo;m <em className="text-burgundy">{person.first}.</em>
            </MaskReveal>
          </h2>
          <Fade delay={0.2} className="mt-10 max-w-xl text-lg leading-relaxed text-ink/80 sm:text-xl">
            {person.about}
          </Fade>
        </div>
      </div>

      {/* Experience & education */}
      <div className="mt-28 grid grid-cols-12 gap-x-4 gap-y-16 sm:mt-40">
        <div className="col-span-12 lg:col-span-7">
          <div className="flex items-baseline justify-between">
            <h3 className="font-display text-5xl sm:text-6xl">Experience</h3>
            <span className="mono text-muted">03 roles</span>
          </div>
          <ul className="mt-8">
            {experience.map((x, i) => (
              <li key={x.org}>
                <Rule />
                <Fade delay={i * 0.08} className="grid grid-cols-12 items-baseline gap-2 py-6">
                  <span className="mono col-span-12 text-muted sm:col-span-3">{x.when}</span>
                  <span className="font-display col-span-12 text-3xl sm:col-span-5 sm:text-4xl">{x.org}</span>
                  <span className="col-span-12 text-sm text-ink/70 sm:col-span-4 sm:text-right">{x.role}</span>
                </Fade>
              </li>
            ))}
          </ul>
          <Rule />
        </div>

        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <h3 className="font-display text-5xl sm:text-6xl">Education</h3>
          <ul className="mt-8 space-y-10">
            {education.map((e, i) => (
              <li key={e.course}>
                <Fade delay={i * 0.1}>
                  <span className="mono text-muted">{e.when}</span>
                  <p className="mt-2 text-lg font-medium leading-snug">{e.course}</p>
                  <p className="mt-1 text-ink/70">
                    {e.school}
                    {e.note && <span className="ml-2 text-burgundy">· {e.note}</span>}
                  </p>
                </Fade>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Skills */}
      <SkillWall />

      <div className="mt-16 grid grid-cols-12 gap-x-4 gap-y-8 sm:mt-24">
        <div className="col-span-12 md:col-span-8">
          <p className="eyebrow text-muted">Full skill set</p>
          <p className="mt-4 text-base leading-relaxed text-ink/80 sm:text-lg">{skillList.join("  ·  ")}</p>
        </div>
        <div className="col-span-12 md:col-span-3 md:col-start-10">
          <p className="eyebrow text-muted">Tools</p>
          <p className="font-display mt-3 text-3xl leading-tight">{tools.join(" · ")}</p>
        </div>
      </div>
    </section>
  );
}

function SkillWall() {
  const [hover, setHover] = useState<number | null>(null);
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const wrap = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26 });
  const sy = useSpring(y, { stiffness: 220, damping: 26 });

  const move = (e: React.PointerEvent) => {
    const r = wrap.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  const current = hover !== null ? skillEvidence[hover] : null;

  return (
    <div className="mt-28 sm:mt-40">
      <div className="flex items-baseline justify-between">
        <p className="eyebrow text-burgundy">Creative practice</p>
        <p className="mono hidden text-muted sm:block">Hover a skill to see where it shows up →</p>
      </div>
      <div
        ref={wrap}
        onPointerMove={move}
        onPointerLeave={() => setHover(null)}
        className="relative mt-8"
      >
        <ul>
          {skillEvidence.map((s, i) => (
            <li key={s.skill} className="border-t border-ink/15 last:border-b">
              <button
                onPointerEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                onClick={() => scrollToId(s.target)}
                className="group flex w-full flex-col items-start gap-1 py-4 text-left sm:flex-row sm:items-baseline sm:justify-between sm:py-5"
              >
                <span
                  className={`font-display text-[9.5vw] uppercase leading-[0.95] transition-[color,opacity,transform] duration-500 sm:text-[6.4vw] lg:text-[5.4vw] ${
                    hover !== null && hover !== i ? "opacity-25" : "opacity-100"
                  } ${hover === i ? "translate-x-3 text-burgundy" : "text-ink"}`}
                >
                  {s.skill}
                </span>
                <span
                  className={`eyebrow flex items-center gap-2 text-burgundy transition-all duration-500 sm:translate-x-0 ${
                    fine ? (hover === i ? "opacity-100" : "opacity-0 sm:-translate-x-3") : "opacity-80"
                  }`}
                >
                  <span aria-hidden>→</span> {s.evidence}
                </span>
              </button>
            </li>
          ))}
        </ul>

        {fine && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 z-20"
            style={{ x: sx, y: sy }}
          >
            <AnimatePresence>
              {current?.image && (
                <motion.img
                  key={current.image}
                  src={asset(current.image)}
                  alt=""
                  initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                  animate={{ opacity: 1, scale: 1, rotate: -2 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.45, ease }}
                  className="absolute -translate-y-1/2 translate-x-8 w-44 object-cover shadow-[0_20px_50px_rgba(21,17,17,0.25)]"
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
