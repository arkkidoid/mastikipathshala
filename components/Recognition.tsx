"use client";

import { motion } from "framer-motion";
import { Icon, IconName } from "./ui/Icon";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const AWARDS: { icon: IconName; title: string; sub: string; accent: string }[] = [
  { icon: "trophy", title: "Best Kids Academy 2025", sub: "City Education Awards", accent: "text-sun" },
  { icon: "shield", title: "Child-Safe Certified", sub: "Safeguarding Council", accent: "text-mint" },
  { icon: "star", title: "4.9★ Google Rating", sub: "600+ verified reviews", accent: "text-orange" },
  { icon: "check", title: "ISO Quality Assured", sub: "Curriculum standards", accent: "text-sky" },
];

const PARTNERS = [
  "Sunrise Public School",
  "Little Scholars",
  "Green Valley Academy",
  "Bright Minds International",
  "St. Xavier's Prep",
];

export function Recognition() {
  return (
    <section className="relative py-16">
      <div className="container-x">
        <SectionHeading
          eyebrow="Trust & Recognition"
          title={
            <>
              Awards, certifications & <span className="text-gradient">proud partners</span>
            </>
          }
          subtitle="Recognised for quality and safety, and trusted by leading schools across the city."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {AWARDS.map((aw, i) => (
            <Reveal key={aw.title} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -5 }}
                className="card flex h-full items-center gap-4 hover:shadow-soft-lg"
              >
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cream ${aw.accent}`}>
                  <Icon name={aw.icon} size={26} />
                </span>
                <div>
                  <p className="text-sm font-extrabold leading-tight text-ink">{aw.title}</p>
                  <p className="text-xs text-ink/55">{aw.sub}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Partner schools */}
        <Reveal delay={0.1}>
          <div className="mt-8 rounded-4xl bg-white p-6 shadow-card ring-1 ring-ink/5">
            <p className="text-center text-xs font-bold uppercase tracking-widest text-ink/40">
              Partner schools who trust us
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {PARTNERS.map((p) => (
                <span key={p} className="flex items-center gap-2 text-sm font-bold text-ink/45">
                  <Icon name="flag" size={16} className="text-orange" />
                  {p}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Brochure download */}
        <Reveal delay={0.15}>
          <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-4xl bg-gradient-to-r from-sky-tint to-mint-tint p-6 sm:flex-row sm:p-8">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <span className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-white text-sky shadow-soft sm:flex">
                <Icon name="download" size={26} />
              </span>
              <div>
                <p className="font-display text-lg font-bold text-ink">
                  Get the full programs brochure
                </p>
                <p className="text-sm text-ink/60">
                  Fees, schedules & curriculum — everything in one handy PDF.
                </p>
              </div>
            </div>
            <a href="#book" className="btn-ink shrink-0">
              <Icon name="download" size={16} /> Download Brochure
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
