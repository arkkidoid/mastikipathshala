"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PARTNERS, type Partner } from "@/lib/data";
import { accent } from "@/lib/accents";
import { Icon } from "./ui/Icon";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

function monogram(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const letters = words.length >= 2 ? words[0][0] + words[1][0] : name.slice(0, 2);
  return letters.toUpperCase();
}

function PartnerCard({ p }: { p: Partner }) {
  const a = accent(p.accent);
  const hasLogo = Boolean(p.logo && p.logo.trim());
  const hasUrl = Boolean(p.url && p.url.trim());
  const Tag = hasUrl ? motion.a : motion.div;

  return (
    <Tag
      {...(hasUrl ? { href: p.url, target: "_blank", rel: "noreferrer" } : {})}
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col items-center gap-3 rounded-3xl bg-white p-5 text-center shadow-card ring-1 ring-ink/5 transition-shadow hover:shadow-soft-lg"
    >
      {/* logo / monogram */}
      <div className="flex h-16 w-full items-center justify-center">
        {hasLogo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.logo}
            alt={p.name}
            className="max-h-16 max-w-[80%] object-contain opacity-80 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
          />
        ) : (
          <span
            className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${a.grad} font-display text-lg font-extrabold text-white shadow-soft transition-transform duration-300 group-hover:scale-110`}
          >
            {monogram(p.name)}
          </span>
        )}
      </div>

      <div>
        <p className="text-sm font-bold leading-tight text-ink">{p.name}</p>
        <p className="mt-0.5 text-xs font-semibold text-ink/45">{p.category}</p>
      </div>

      {hasUrl && (
        <span className={`mt-1 inline-flex items-center gap-1 text-xs font-bold ${a.text} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}>
          Visit <Icon name="arrow" size={13} />
        </span>
      )}
    </Tag>
  );
}

export function Partners({ items = PARTNERS }: { items?: Partner[] }) {
  const categories = useMemo(() => {
    const set = Array.from(new Set(items.map((p) => p.category).filter(Boolean)));
    return ["All", ...set];
  }, [items]);

  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? items : items.filter((p) => p.category === filter);

  if (!items.length) return null;

  return (
    <section id="partners" className="relative py-20 sm:py-28">
      {/* soft backdrop */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 mx-auto h-72 max-w-5xl -translate-y-1/2 rounded-full bg-sky/5 blur-3xl" />

      <div className="container-x">
        <SectionHeading
          eyebrow="Our Partners"
          title={
            <>
              Trusted by leading <span className="text-gradient">schools & institutions</span>
            </>
          }
          subtitle="We're proud to collaborate with wonderful schools, institutions and organisations who share our love for joyful learning."
        />

        {/* filter chips */}
        {categories.length > 2 && (
          <Reveal delay={0.05}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${
                    filter === c
                      ? "bg-ink text-white shadow-soft"
                      : "bg-white text-ink/60 shadow-card ring-1 ring-ink/5 hover:text-ink"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>
        )}

        {/* grid */}
        <Reveal delay={0.1}>
          <motion.div
            layout
            className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          >
            <AnimatePresence mode="popLayout">
              {shown.map((p, i) => (
                <PartnerCard key={`${p.name}-${i}`} p={p} />
              ))}
            </AnimatePresence>
          </motion.div>
        </Reveal>

        {/* footnote CTA */}
        <Reveal delay={0.15}>
          <p className="mt-10 text-center text-sm text-ink/55">
            Want to partner with us?{" "}
            <a href="#contact" className="font-bold text-orange underline-offset-2 hover:underline">
              Get in touch →
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
