"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useState, type ReactNode, type CSSProperties } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;

/** Prefix for static assets (lets the same build run at a sub-path). */
export const asset = (p: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${p}`;

export function useMediaQuery(q: string) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => setMatch(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, [q]);
  return match;
}

/** Smoothly scroll to a section id, using Lenis when it is running. */
export function scrollToId(id: string, opts: { immediate?: boolean } = {}) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: object) => void } }).__lenis;
  if (lenis) lenis.scrollTo(el, { immediate: opts.immediate, duration: 1.4 });
  else el.scrollIntoView({ behavior: opts.immediate ? "auto" : "smooth" });
  history.replaceState(null, "", `#${id}`);
}

/** Text that rises out of a mask, line by line. */
export function MaskReveal({
  children,
  delay = 0,
  className = "",
  as = "div",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span" | "h2" | "h3" | "p";
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  // The observer sits on the (un-transformed) mask, so the hidden line can still trigger.
  return (
    <motion.span
      className={`block overflow-hidden pb-[0.04em] ${as === "span" ? "inline-block align-bottom" : ""}`}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
    >
      <Tag
        className={`block ${className}`}
        variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
        transition={{ duration: 1.05, ease, delay }}
      >
        {children}
      </Tag>
    </motion.span>
  );
}

const fadeV: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

/** Quiet fade for body copy (used sparingly). */
export function Fade({
  children,
  delay = 0,
  className = "",
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      variants={fadeV}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** A thin rule that draws itself across. */
export function Rule({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`h-px origin-left ${className}`}
      style={{ background: color, opacity: 0.25 }}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1.2, ease }}
    />
  );
}
