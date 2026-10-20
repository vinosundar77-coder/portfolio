"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Fade, MaskReveal, asset, ease, useMediaQuery } from "@/lib/ui";
import { skillkart } from "@/content/portfolio";

const violet = "#a66bff";

export default function SkillKart() {
  return (
    <section id="skillkart" data-chapter="05 — SkillKart" data-nav="work" className="blueprint relative text-[#ece8f3]">
      <Intro />
      <Insights />
      <Solution />
      <Phones />
      <Features />
      <Transformation />
    </section>
  );
}

function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.4"] });
  return (
    <ol ref={ref} className="mono flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.7rem] uppercase sm:text-xs">
      {skillkart.process.map((p, i) => (
        <Step key={p} label={p} i={i} n={skillkart.process.length} progress={scrollYProgress} />
      ))}
    </ol>
  );
}

function Step({ label, i, n, progress }: { label: string; i: number; n: number; progress: MotionValue<number> }) {
  const c = useTransform(progress, [i / n, (i + 1) / n], ["rgba(236,232,243,0.35)", violet]);
  return (
    <li className="flex items-center gap-3">
      <motion.span style={{ color: c }}>{label}</motion.span>
      {i < n - 1 && <span className="text-white/25">→</span>}
    </li>
  );
}

function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", reduce ? "-10%" : "10%"]);
  return (
    <div ref={ref} className="px-4 pb-20 pt-28 sm:px-8 sm:pt-40">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <p className="mono uppercase text-white/50">Project 05 · Design Thinking · User Research · Product Concept</p>
        <p className="mono uppercase" style={{ color: violet }}>{skillkart.credit}</p>
      </div>
      <h2 className="mt-8 text-[20vw] font-semibold leading-[0.8] tracking-[-0.05em] sm:text-[15vw]">
        <MaskReveal>
          Skill<span style={{ color: violet }}>Kart</span>
        </MaskReveal>
      </h2>
      <p className="font-display mt-4 text-3xl italic sm:text-5xl">Earn · Learn · Grow</p>

      <div className="mt-14">
        <Process />
      </div>

      <div className="mt-20 grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 md:col-span-7">
          <p className="mono uppercase" style={{ color: violet }}>[ The Problem ]</p>
          <Fade>
            <p className="mt-5 text-2xl leading-snug sm:text-[2.1rem]">{skillkart.problem}</p>
          </Fade>
          <Fade delay={0.1} className="mt-12 max-w-lg">
            <p className="mono uppercase text-white/50">[ The Research ]</p>
            <p className="mt-3 leading-relaxed text-white/70">{skillkart.research}</p>
          </Fade>
        </div>
        <div className="col-span-12 overflow-hidden md:col-span-4 md:col-start-9">
          <motion.img
            src={asset("/media/sk-crowd.webp")}
            alt="Research visual: a lone student standing still in a blurred, rushing crowd"
            loading="lazy"
            style={{ y: imgY }}
            className="w-full scale-110 object-cover grayscale"
          />
        </div>
      </div>
    </div>
  );
}

function Insights() {
  return (
    <div className="px-4 py-20 sm:px-8">
      <p className="mono uppercase" style={{ color: violet }}>[ Key Insights ]</p>
      <div className="mt-8 grid border-l border-t border-white/10 sm:grid-cols-2">
        {skillkart.insights.map((x, i) => (
          <Fade key={x.t} delay={(i % 2) * 0.1} className="border-b border-r border-white/10 p-6 sm:p-10">
            <span className="mono" style={{ color: violet }}>0{i + 1}</span>
            <h3 className="mt-6 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">{x.t}</h3>
            <p className="mt-3 text-white/65">{x.d}</p>
          </Fade>
        ))}
      </div>
    </div>
  );
}

function Solution() {
  return (
    <div className="px-4 py-20 sm:px-8 sm:py-28">
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 md:col-span-5">
          <p className="mono uppercase" style={{ color: violet }}>[ The Solution ]</p>
          <Fade>
            <p className="mt-5 text-xl leading-relaxed text-white/85">{skillkart.solution}</p>
          </Fade>
          <div className="mt-10 flex gap-3">
            {["/media/sk-sketch-1.webp", "/media/sk-sketch-2.webp", "/media/sk-sketch-3.webp"].map((s, i) => (
              <motion.img
                key={s}
                src={asset(s)}
                alt="Early hand-drawn sketch of a SkillKart app screen"
                loading="lazy"
                initial={{ rotate: 0, y: 20, opacity: 0 }}
                whileInView={{ rotate: (i - 1) * 4, y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease, delay: i * 0.1 }}
                className="w-1/3 max-w-[140px] bg-white p-1"
              />
            ))}
          </div>
          <p className="mono mt-4 text-white/40">From paper sketches →</p>
        </div>

        <div className="col-span-12 md:col-span-6 md:col-start-7">
          <h3 className="text-4xl font-semibold uppercase leading-[0.95] tracking-tight sm:text-6xl">
            One platform. <br />
            <span style={{ color: violet }}>Two journeys.</span>
          </h3>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {[
              { t: "Offer my skills", steps: skillkart.journeys.offer },
              { t: "Find a service", steps: skillkart.journeys.find },
            ].map((j, k) => (
              <Fade key={j.t} delay={k * 0.12}>
                <p className="mono uppercase" style={{ color: violet }}>Journey {String.fromCharCode(65 + k)}</p>
                <p className="mt-2 text-2xl font-semibold">{j.t}</p>
                <ol className="relative mt-5 space-y-3 border-l border-white/20 pl-5">
                  {j.steps.map((s) => (
                    <li key={s} className="relative text-white/75">
                      <span className="absolute -left-[1.42rem] top-[0.55em] h-1.5 w-1.5 rounded-full" style={{ background: violet }} />
                      {s}
                    </li>
                  ))}
                </ol>
              </Fade>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Phone({ src, label, i }: { src: string; label: string; i: number }) {
  return (
    <figure className="shrink-0" style={{ transform: `translateY(${[0, 40, -20, 60][i % 4]}px) rotate(${[-3, 2, -1, 3][i % 4]}deg)` }}>
      <div className="w-[190px] rounded-[30px] border border-white/15 bg-[#1b1622] p-[7px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] sm:w-[230px]">
        <div className="aspect-[9/19.5] overflow-hidden rounded-[24px] bg-white">
          <img src={asset(src)} alt={`SkillKart prototype screen: ${label}`} loading="lazy" className="h-full w-full object-cover object-top" />
        </div>
      </div>
      <figcaption className="mono mt-4 text-white/55">
        <span style={{ color: violet }}>{String(i + 1).padStart(2, "0")}</span> {label}
      </figcaption>
    </figure>
  );
}

function PhonesHeader() {
  return (
    <div className="px-4 sm:px-8">
      <p className="mono uppercase" style={{ color: violet }}>[ The Prototype ]</p>
      <h3 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">First look at SkillKart</h3>
    </div>
  );
}

function Phones() {
  const wide = useMediaQuery("(min-width: 900px)");
  const reduce = useReducedMotion();
  if (wide && !reduce) return <PhoneTrack />;
  return (
    <div className="py-16">
      <PhonesHeader />
      <div className="hide-scrollbar mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-16 pt-6 sm:px-8">
        {skillkart.screens.map((s, i) => (
          <div key={s.src} className="snap-center">
            <Phone src={s.src} label={s.label} i={i} />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Desktop: the prototype screens slide past horizontally as you scroll. */
function PhoneTrack() {
  const ref = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  useEffect(() => {
    const measure = () => {
      if (track.current) setDist(Math.max(0, track.current.scrollWidth - window.innerWidth + 96));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -dist]);
  return (
    <div ref={ref} className="relative h-[340vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <PhonesHeader />
        <div className="mt-10 pl-8">
          <motion.div ref={track} style={{ x }} className="flex w-max">
            {skillkart.screens.map((s, i) => (
              <div key={s.src} className="-mr-6" style={{ zIndex: skillkart.screens.length - i }}>
                <Phone src={s.src} label={s.label} i={i} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Features() {
  return (
    <div className="px-4 py-20 sm:px-8">
      <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {skillkart.features.map((f, i) => (
          <Fade key={f.t} delay={i * 0.08} className="bg-[#0f0b14] p-6 sm:p-8">
            <span className="mono" style={{ color: violet }}>0{i + 1}</span>
            <h4 className="mt-10 text-xl font-semibold leading-tight">{f.t}</h4>
            <p className="mt-2 text-sm leading-relaxed text-white/60">{f.d}</p>
          </Fade>
        ))}
      </div>
    </div>
  );
}

function Transformation() {
  const reduce = useReducedMotion();
  return (
    <div className="px-4 pb-28 pt-20 text-center sm:px-8 sm:pb-40">
      <p className="mono uppercase text-white/45">Before</p>
      <ul className="mx-auto mt-4 flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-2 text-lg text-white/45 sm:text-2xl">
        {skillkart.before.map((b, i) => (
          <li key={b} className="relative">
            {b}
            <motion.span
              aria-hidden
              className="absolute left-0 top-1/2 h-px w-full origin-left bg-white/60"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 1 }}
              transition={{ duration: 0.6, ease, delay: 0.3 + i * 0.12 }}
            />
          </li>
        ))}
      </ul>
      <p className="my-8 text-2xl text-white/40">↓</p>
      <p className="text-6xl font-semibold tracking-[-0.05em] sm:text-8xl">
        Skill<span style={{ color: violet }}>Kart</span>
      </p>
      <p className="my-8 text-2xl text-white/40">↓</p>
      <p className="mono uppercase" style={{ color: violet }}>After</p>
      <ul className="mx-auto mt-4 flex max-w-3xl flex-wrap justify-center gap-3">
        {skillkart.after.map((a, i) => (
          <motion.li
            key={a}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: i * 0.08 }}
            className="rounded-full border px-4 py-2 text-base sm:text-lg"
            style={{ borderColor: violet, color: "#f1e9ff", boxShadow: `0 0 24px -8px ${violet}` }}
          >
            {a}
          </motion.li>
        ))}
      </ul>

      <blockquote className="font-display mx-auto mt-28 max-w-4xl text-4xl leading-[1.1] sm:text-6xl">
        <MaskReveal>&ldquo;Every student carries a skill.</MaskReveal>
        <MaskReveal delay={0.1}>
          All they need is <em style={{ color: violet }}>a place to use it.&rdquo;</em>
        </MaskReveal>
      </blockquote>
    </div>
  );
}
