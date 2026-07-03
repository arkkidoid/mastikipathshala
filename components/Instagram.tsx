"use client";

import { motion } from "framer-motion";
import { accent } from "@/lib/accents";
import { Icon, IconName } from "./ui/Icon";
import { Reveal } from "./ui/Reveal";

const FEED: { icon: IconName; accent: string }[] = [
  { icon: "robot", accent: "sky" },
  { icon: "dance", accent: "rose" },
  { icon: "art", accent: "sun" },
  { icon: "chess", accent: "grape" },
  { icon: "music", accent: "orange" },
  { icon: "mic", accent: "mint" },
];

export function Instagram() {
  return (
    <section className="relative py-16">
      <div className="container-x">
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose via-orange to-sun text-white shadow-soft">
                <Icon name="instagram" size={26} />
              </span>
              <div>
                <p className="font-display text-lg font-extrabold text-ink">@mastikipaathshaala</p>
                <p className="text-sm text-ink/55">Follow the daily joy on Instagram</p>
              </div>
            </div>
            <a href="#" className="btn-ghost">
              <Icon name="instagram" size={16} /> Follow us
            </a>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {FEED.map((f, i) => {
            const a = accent(f.accent);
            return (
              <Reveal key={i} delay={i * 0.05}>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.04 }}
                  className={`group relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br ${a.grad} ring-1 ring-ink/5`}
                >
                  <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_30%_30%,white_2px,transparent_2px)] [background-size:26px_26px]" />
                  <Icon name={f.icon} size={34} className="text-white/90" />
                  <span className="absolute inset-0 flex items-center justify-center bg-ink/40 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                    <Icon name="instagram" size={26} className="text-white" />
                  </span>
                </motion.a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
