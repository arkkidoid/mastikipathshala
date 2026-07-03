"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { METRICS } from "@/lib/data";
import { Reveal } from "./ui/Reveal";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <span ref={ref}>
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export function Metrics() {
  return (
    <section className="relative py-8">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-5xl bg-ink px-6 py-14 shadow-soft-lg sm:px-12">
            {/* decorative glows */}
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-orange/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-sky/25 blur-3xl" />

            <div className="relative text-center">
              <span className="eyebrow bg-white/10 text-white/80 ring-white/10">
                <span className="h-1.5 w-1.5 rounded-full bg-sun" />
                By the numbers
              </span>
              <h2 className="heading mx-auto mt-5 max-w-2xl text-3xl text-white sm:text-4xl">
                A growing family of curious, confident kids
              </h2>
            </div>

            <div className="relative mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
              {METRICS.map((m, i) => (
                <Reveal key={m.label} delay={i * 0.08}>
                  <div className="text-center">
                    <p className="font-display text-4xl font-extrabold text-white sm:text-5xl">
                      <span className="text-gradient">
                        <Counter value={m.value} suffix={m.suffix} />
                      </span>
                    </p>
                    <p className="mt-2 text-sm font-medium text-white/60">{m.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
