"use client";

import { motion } from "framer-motion";
import { EVENTS, type EventItem } from "@/lib/data";
import { accent } from "@/lib/accents";
import { Icon } from "./ui/Icon";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

export function Events({ items = EVENTS }: { items?: EventItem[] }) {
  return (
    <section id="events" className="relative py-20 sm:py-28">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="What's On"
            title={
              <>
                Upcoming events & <span className="text-gradient">adventures</span>
              </>
            }
            subtitle="Workshops, camps and competitions that turn learning into an event to look forward to."
          />
          <Reveal delay={0.1}>
            <a href="#book" className="btn-ghost shrink-0">
              View full calendar
              <Icon name="calendar" size={16} />
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {items.map((e, i) => {
            const a = accent(e.accent);
            return (
              <Reveal key={e.title} delay={(i % 2) * 0.08}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="card group flex h-full items-start gap-5 hover:shadow-soft-lg"
                >
                  <span
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br ${a.grad} text-white shadow-soft transition-transform duration-300 group-hover:scale-105`}
                  >
                    <Icon name={e.icon} size={30} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full ${a.tint} ${a.text} px-3 py-1 text-xs font-bold`}>
                        {e.tag}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-ink/50">
                        <Icon name="calendar" size={14} />
                        {e.date}
                      </span>
                    </div>
                    <h3 className="heading mt-3 text-lg">{e.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/60">{e.desc}</p>
                    <a
                      href="#book"
                      className={`mt-4 inline-flex items-center gap-1 text-sm font-bold ${a.text} transition-all group-hover:gap-2`}
                    >
                      Register interest
                      <Icon name="arrow" size={15} />
                    </a>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
