"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/data";
import { accent } from "@/lib/accents";
import { Icon } from "./ui/Icon";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const reduce = useReducedMotion();
  const count = TESTIMONIALS.length;

  const go = useCallback(
    (d: number) => {
      setDir(d);
      setIndex((i) => (i + d + count) % count);
    },
    [count]
  );

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => go(1), 6000);
    return () => clearInterval(id);
  }, [go, reduce]);

  const t = TESTIMONIALS[index];
  const a = accent(t.accent);

  return (
    <section id="testimonials" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Parent Love"
          title={
            <>
              Trusted by parents, <span className="text-gradient">adored by kids</span>
            </>
          }
          subtitle="Don't just take our word for it — here's what families across the city are saying."
        />

        <div className="mx-auto mt-14 max-w-3xl">
          <div className="relative overflow-hidden rounded-5xl bg-white p-8 shadow-soft ring-1 ring-ink/5 sm:p-12">
            <span className={`absolute -right-4 -top-2 ${a.text} opacity-10`}>
              <Icon name="quote" size={140} />
            </span>

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="flex items-center gap-1 text-sun">
                  {[...Array(t.rating)].map((_, i) => (
                    <Icon key={i} name="star" size={20} />
                  ))}
                </div>
                <p className="mt-5 font-display text-xl font-semibold leading-relaxed text-ink sm:text-2xl">
                  “{t.quote}”
                </p>
                <div className="mt-7 flex items-center gap-4">
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${a.solid} font-display text-lg font-bold text-white shadow-soft`}
                  >
                    {t.initials}
                  </span>
                  <div>
                    <p className="font-bold text-ink">{t.name}</p>
                    <p className="text-sm text-ink/55">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-7 flex items-center justify-center gap-4">
            <button
              onClick={() => go(-1)}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink shadow-card ring-1 ring-ink/5 transition hover:bg-ink hover:text-white"
              aria-label="Previous testimonial"
            >
              <Icon name="chevron" size={22} className="rotate-90" />
            </button>
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDir(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-7 bg-orange" : "w-2.5 bg-ink/15 hover:bg-ink/30"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink shadow-card ring-1 ring-ink/5 transition hover:bg-ink hover:text-white"
              aria-label="Next testimonial"
            >
              <Icon name="chevron" size={22} className="-rotate-90" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
