"use client";

import { useEffect, useRef, useState } from "react";
import { Fade, MaskReveal, asset } from "@/lib/ui";
import { snitch } from "@/content/portfolio";

export default function Snitch() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  // Only play while on screen (saves battery and bandwidth)
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !userPaused && !reduce) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [userPaused]);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      setUserPaused(false);
      v.play().catch(() => {});
    } else {
      setUserPaused(true);
      v.pause();
    }
  };

  return (
    <section id="snitch" data-chapter="04 — SNITCH" data-nav="work" className="relative bg-[#0d0d0d] px-4 py-28 text-[#f2f0eb] sm:px-8 sm:py-40">
      <div className="grid grid-cols-12 gap-x-6 gap-y-14">
        <div className="col-span-12 lg:col-span-6">
          <p className="eyebrow text-white/50">Project 04 · Digital Product Launch Campaign</p>
          <h2 className="mt-6 text-[22vw] font-semibold uppercase leading-[0.82] tracking-[-0.04em] lg:text-[10.5vw]">
            <MaskReveal>Snitch</MaskReveal>
          </h2>
          <p className="font-display mt-4 text-4xl italic sm:text-5xl">5 Days to Launch</p>

          <Fade className="mt-10 max-w-lg">
            <p className="eyebrow text-white/50">Objective</p>
            <p className="mt-3 text-xl leading-relaxed">{snitch.objective}</p>
          </Fade>

          <ol className="mt-14 max-w-xl">
            {snitch.days.map((d, i) => (
              <li key={d.n} className="border-t border-white/15 last:border-b">
                <Fade delay={i * 0.06} className="grid grid-cols-12 items-baseline gap-2 py-5">
                  <span className="mono col-span-2 text-white/40">Day {d.n}</span>
                  <span className="col-span-10 text-lg font-semibold uppercase tracking-wide sm:col-span-4">{d.t}</span>
                  <span className="col-span-10 col-start-3 text-white/65 sm:col-span-6 sm:col-start-auto">{d.d}</span>
                </Fade>
              </li>
            ))}
          </ol>
        </div>

        <div className="col-span-12 lg:col-span-5 lg:col-start-8">
          <div className="lg:sticky lg:top-24">
            <div className="relative mx-auto w-full max-w-[440px]">
              <video
                ref={video}
                className="aspect-[9/16] w-full bg-black object-contain"
                src={asset("/media/snitch-5-day-launch.mp4")}
                poster={asset("/media/snitch-poster.jpg")}
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                aria-label="SNITCH 5 Days to Launch campaign video"
              />
              <button
                onClick={toggle}
                className="eyebrow absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black/55 px-4 py-2 text-white backdrop-blur transition-colors hover:bg-black/80"
                aria-label={playing ? "Pause video" : "Play video"}
              >
                <span aria-hidden className="inline-flex h-2.5 w-2.5 items-center justify-center">
                  {playing ? (
                    <span className="flex gap-[2px]">
                      <span className="h-2.5 w-[3px] bg-white" />
                      <span className="h-2.5 w-[3px] bg-white" />
                    </span>
                  ) : (
                    <span className="h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-white" />
                  )}
                </span>
                {playing ? "Pause" : "Play"}
              </button>
            </div>
            <p className="mono mx-auto mt-4 max-w-[440px] text-white/40">Campaign film · 0:10</p>
          </div>
        </div>
      </div>
    </section>
  );
}
