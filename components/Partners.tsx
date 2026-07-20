"use client";

import { useReducedMotion } from "framer-motion";
import { PARTNERS, type Partner } from "@/lib/data";
import { accent } from "@/lib/accents";
import { Icon } from "./ui/Icon";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

function monogram(name: string) {
  const w = name.trim().split(/\s+/).filter(Boolean);
  return (w.length >= 2 ? w[0][0] + w[1][0] : name.slice(0, 2)).toUpperCase();
}

function PartnerCard({ p }: { p: Partner }) {
  const a = accent(p.accent);
  const hasImage = Boolean(p.image && p.image.trim());
  const hasUrl = Boolean(p.url && p.url.trim());
  const Tag = hasUrl ? "a" : "div";

  return (
    <Tag
      {...(hasUrl ? { href: p.url, target: "_blank", rel: "noreferrer" } : {})}
      className="group relative block h-[420px] w-[300px] shrink-0 overflow-hidden rounded-[2rem] shadow-card ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg sm:w-[340px]"
    >
      {hasImage ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
        </>
      ) : (
        <>
          <div className={`absolute inset-0 bg-gradient-to-br ${a.grad}`} />
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_25%_20%,white_2.5px,transparent_2.5px)] [background-size:38px_38px]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-24 w-24 items-center justify-center rounded-[1.75rem] bg-white/25 font-display text-3xl font-extrabold text-white ring-1 ring-white/40 backdrop-blur">
              {monogram(p.name)}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
        </>
      )}

      {/* category chip */}
      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-ink shadow-soft backdrop-blur">
        {p.category}
      </span>

      {/* bottom content */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-display text-xl font-extrabold leading-tight text-white drop-shadow">
          {p.name}
        </h3>
        {hasUrl && (
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-ink opacity-0 transition-all duration-300 group-hover:opacity-100">
            Visit website <Icon name="arrow" size={13} />
          </span>
        )}
      </div>
    </Tag>
  );
}

export function Partners({ items = PARTNERS }: { items?: Partner[] }) {
  const reduce = useReducedMotion();
  if (!items.length) return null;

  // duplicate the set so the marquee can loop seamlessly
  const loop = [...items, ...items];
  const duration = Math.max(18, items.length * 5); // seconds — slower with more cards

  return (
    <section id="partners" className="relative overflow-hidden py-20 sm:py-28">
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
      </div>

      <Reveal delay={0.1}>
        <div className="group relative mt-14">
          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-cream to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-cream to-transparent sm:w-24" />

          {reduce ? (
            // accessible fallback: manual horizontal scroll, no animation
            <div className="no-scrollbar flex gap-6 overflow-x-auto px-5 pb-2 sm:px-8">
              {items.map((p, i) => (
                <PartnerCard key={i} p={p} />
              ))}
            </div>
          ) : (
            <div
              className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
              style={{ animationDuration: `${duration}s` }}
            >
              {loop.map((p, i) => (
                <div key={i} className="mr-6 shrink-0" aria-hidden={i >= items.length}>
                  <PartnerCard p={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </Reveal>

      <div className="container-x">
        <Reveal delay={0.15}>
          <p className="mt-12 text-center text-sm text-ink/55">
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
