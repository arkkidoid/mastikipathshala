"use client";

import { motion } from "framer-motion";
import { JOURNEY } from "@/lib/data";
import type { IconName } from "./ui/Icon";
import type { Accent } from "@/lib/data";
import { accent } from "@/lib/accents";
import { Icon } from "./ui/Icon";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

type Step = { step: string; icon: IconName; accent: Accent; desc: string };

export function LearningJourney({ items = JOURNEY }: { items?: Step[] }) {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="The Learning Journey"
          title={
            <>
              Five joyful steps from <span className="text-gradient">curious to confident</span>
            </>
          }
          subtitle="Every child follows a gentle, proven path — designed to build real skills and lasting self-belief."
        />

        <div className="relative mt-16">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-9 hidden h-0.5 bg-gradient-to-r from-sky via-mint to-orange lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {items.map((j, i) => {
              const a = accent(j.accent);
              return (
                <Reveal key={j.step} delay={i * 0.1}>
                  <div className="relative flex flex-col items-center text-center">
                    <motion.div
                      whileHover={{ scale: 1.08, rotate: -4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className={`relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-3xl bg-white shadow-soft ring-1 ring-ink/5`}
                    >
                      <span className={`flex h-full w-full items-center justify-center rounded-3xl ${a.tint} ${a.text}`}>
                        <Icon name={j.icon} size={32} />
                      </span>
                      <span className={`absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full ${a.solid} text-xs font-bold text-white ring-2 ring-cream`}>
                        {i + 1}
                      </span>
                    </motion.div>
                    <h3 className="heading mt-5 text-lg">{j.step}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/60">{j.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
