"use client";

import { motion } from "framer-motion";
import { MENTORS, type Mentor } from "@/lib/data";
import { accent } from "@/lib/accents";
import { Icon } from "./ui/Icon";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

export function Mentors({ items = MENTORS }: { items?: Mentor[] }) {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Meet the Mentors"
          title={
            <>
              The caring humans behind <span className="text-gradient">every smile</span>
            </>
          }
          subtitle="Certified, background-verified and genuinely fun — our mentors make hard things feel easy."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((m, i) => {
            const a = accent(m.accent);
            return (
              <Reveal key={m.name} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="card group h-full text-center hover:shadow-soft-lg"
                >
                  <div className="relative mx-auto h-24 w-24">
                    <div className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${a.grad} opacity-90`} />
                    <div className="absolute inset-[3px] flex items-center justify-center rounded-[1.8rem] bg-white">
                      <span className={`font-display text-2xl font-extrabold ${a.text}`}>
                        {m.initials}
                      </span>
                    </div>
                    <span className={`absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full ${a.solid} text-white ring-4 ring-white`}>
                      <Icon name="check" size={16} />
                    </span>
                  </div>
                  <h3 className="heading mt-5 text-lg">{m.name}</h3>
                  <p className={`mt-1 text-sm font-bold ${a.text}`}>{m.subject}</p>
                  <p className="mt-1 text-xs text-ink/55">{m.exp}</p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
