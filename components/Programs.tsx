"use client";

import { motion } from "framer-motion";
import { PROGRAMS } from "@/lib/data";
import { accent } from "@/lib/accents";
import { Icon } from "./ui/Icon";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

export function Programs() {
  return (
    <section id="programs" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Our Programs"
          title={
            <>
              Nine ways for your child <span className="text-gradient">to shine</span>
            </>
          }
          subtitle="From robots to recitals, every program blends serious skill-building with genuine, giggly fun."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((p, i) => {
            const a = accent(p.accent);
            return (
              <Reveal key={p.title} delay={(i % 3) * 0.08}>
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="card group relative h-full overflow-hidden hover:shadow-soft-lg"
                >
                  <div
                    className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full ${a.tint} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <span
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${a.tint} ${a.text} transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}
                      >
                        <Icon name={p.icon} size={28} />
                      </span>
                      <span
                        className={`rounded-full ${a.tint} ${a.text} px-3 py-1 text-xs font-bold`}
                      >
                        {p.age}
                      </span>
                    </div>

                    <h3 className="heading mt-5 text-xl">{p.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-ink/60">{p.desc}</p>

                    <div className="mt-5 flex items-center justify-between border-t border-ink/5 pt-4">
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-ink/50">
                        <Icon name="clock" size={15} />
                        {p.duration}
                      </span>
                      <a
                        href="#book"
                        className={`inline-flex items-center gap-1 text-sm font-bold ${a.text} transition-all group-hover:gap-2`}
                      >
                        Learn More
                        <Icon name="arrow" size={15} />
                      </a>
                    </div>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 rounded-4xl bg-ink px-8 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h3 className="font-display text-xl font-bold text-white">
                Not sure which program fits your child?
              </h3>
              <p className="mt-1 text-sm text-white/70">
                Book a free trial and our mentors will guide you — no commitment needed.
              </p>
            </div>
            <a
              href="#book"
              className="btn bg-orange text-white shadow-glow hover:-translate-y-0.5"
            >
              Book Free Trial
              <Icon name="arrow" size={16} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
