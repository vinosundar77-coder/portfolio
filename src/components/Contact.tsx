"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Fade, MaskReveal, asset, scrollToId } from "@/lib/ui";
import { person } from "@/content/portfolio";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const rot = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -25, 0]);

  return (
    <section
      id="contact"
      ref={ref}
      data-chapter="Contact"
      data-nav="contact"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-cream px-4 pt-28 sm:px-8 sm:pt-40"
    >
      <motion.img
        src={asset("/media/brush.webp")}
        alt=""
        aria-hidden
        loading="lazy"
        style={{ rotate: rot }}
        className="pointer-events-none absolute -right-[20%] top-[8%] w-[90vw] max-w-none opacity-25 sm:-right-[5%] sm:w-[48vw]"
      />

      <div className="relative">
        <p className="eyebrow text-burgundy">Contact</p>
        <h2 className="font-display mt-6 text-[22vw] uppercase leading-[0.8] text-burgundy sm:text-[15vw]">
          <MaskReveal>Let&rsquo;s</MaskReveal>
          <MaskReveal delay={0.08}>
            <em className="normal-case">connect</em>
          </MaskReveal>
        </h2>
        <Fade className="mt-10 max-w-md text-lg leading-relaxed text-ink/80 sm:text-xl">
          I&rsquo;m always open to conversations around fashion, branding, marketing and creative opportunities.
        </Fade>

        <div className="mt-14 flex flex-col gap-6 sm:mt-20">
          <a
            href={`mailto:${person.email}`}
            className="font-display group relative w-fit break-all text-[8.6vw] leading-none sm:text-6xl"
          >
            {person.email}
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-ink/30 transition-transform duration-500 group-hover:scale-x-0" />
          </a>
          <a href={person.phoneHref} className="font-display w-fit text-3xl text-ink/80 transition-colors hover:text-burgundy sm:text-4xl">
            {person.phone}
          </a>
        </div>
      </div>

      <footer className="relative mt-auto flex flex-col gap-4 border-t border-ink/15 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-xl italic">Thank you for exploring my work.</p>
        <div className="flex items-center gap-8">
          <span className="eyebrow text-muted">{person.name} · 2026</span>
          <button onClick={() => scrollToId("top")} className="eyebrow text-burgundy hover:opacity-60">
            Back to top ↑
          </button>
        </div>
      </footer>
    </section>
  );
}
