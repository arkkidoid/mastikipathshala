"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FEATURES } from "@/lib/data";
import type { IconName } from "./ui/Icon";
import type { Accent } from "@/lib/data";
import { accent } from "@/lib/accents";
import { Icon } from "./ui/Icon";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

type Feature = { title: string; icon: IconName; accent: Accent; desc: string };

export function WhyChooseUs({ features = FEATURES }: { features?: Feature[] }) {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="container-x">
        {/* About intro */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal direction="right">
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute inset-0 rotate-6 rounded-5xl bg-gradient-to-br from-sky-tint to-mint-tint" />
              <div className="relative rounded-5xl bg-white p-8 shadow-soft ring-1 ring-ink/5">
                <Image
                  src="/mkplogo.png"
                  alt="Masti Ki Paathshaala mascots"
                  width={320}
                  height={320}
                  className="mx-auto w-2/3 object-contain"
                />
                <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                  {[
                    { k: "9", v: "Courses" },
                    { k: "250+", v: "Learners" },
                    { k: "12+", v: "Mentors" },
                  ].map((s) => (
                    <div key={s.v} className="rounded-2xl bg-cream py-3">
                      <p className="font-display text-xl font-extrabold text-ink">{s.k}</p>
                      <p className="text-xs text-ink/55">{s.v}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-5 -right-3 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-soft-lg ring-1 ring-ink/5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-tint text-orange">
                  <Icon name="heart" size={18} />
                </span>
                <span className="text-sm font-bold text-ink">Made with love</span>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              align="left"
              eyebrow="About Us"
              title={
                <>
                  A joyful home for <span className="text-gradient">big little dreams</span>
                </>
              }
              subtitle="Masti Ki Paathshaala began with one simple belief — that children learn best when they're having fun. Today we're a premium academy where play and purpose meet, helping kids and adults discover their talents and lead with confidence."
            />
            <Reveal delay={0.15}>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Curriculum built by educators",
                  "Warm, safe & inclusive spaces",
                  "Progress updates for parents",
                  "Showcases every term",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mint text-white">
                      <Icon name="check" size={14} />
                    </span>
                    <span className="text-sm font-medium text-ink/75">{t}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Why choose us */}
        <div className="mt-24">
          <SectionHeading
            eyebrow="Why Choose Us"
            title={
              <>
                Premium care in every <span className="text-gradient">little detail</span>
              </>
            }
            subtitle="We obsess over the small things that make a big difference to your child's growth."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => {
              const a = accent(f.accent);
              return (
                <Reveal key={f.title} delay={(i % 3) * 0.08}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="card h-full hover:shadow-soft-lg"
                  >
                    <span
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl ${a.tint} ${a.text}`}
                    >
                      <Icon name={f.icon} size={28} />
                    </span>
                    <h3 className="heading mt-5 text-lg">{f.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-ink/60">{f.desc}</p>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
