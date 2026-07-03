"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FAQS } from "@/lib/data";
import { Icon } from "./ui/Icon";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-20 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Good to Know"
            title={
              <>
                Questions? <span className="text-gradient">We've got answers</span>
              </>
            }
            subtitle="Everything parents usually ask before booking a first class."
          />
          <Reveal delay={0.15}>
            <div className="mt-8 rounded-4xl bg-ink p-6 text-white">
              <p className="font-display text-lg font-bold">Still curious?</p>
              <p className="mt-1 text-sm text-white/70">
                Our team replies within a few hours — every day.
              </p>
              <a href="#contact" className="btn bg-orange mt-4 text-white shadow-glow hover:-translate-y-0.5">
                Ask us anything
                <Icon name="arrow" size={16} />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="space-y-4">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.05}>
                <div
                  className={`overflow-hidden rounded-3xl bg-white ring-1 transition-all duration-300 ${
                    isOpen ? "shadow-soft ring-orange/20" : "shadow-card ring-ink/5"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-base font-bold text-ink sm:text-lg">
                      {f.q}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen ? "rotate-45 bg-orange text-white" : "bg-cream text-ink"
                      }`}
                    >
                      <Icon name="plus" size={18} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-6 pb-6 text-sm leading-relaxed text-ink/65 sm:text-base">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
