"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Icon, IconName } from "./ui/Icon";
import { accent } from "@/lib/accents";

const FLOATERS: {
  label: string;
  icon: IconName;
  accent: string;
  className: string;
  delay: number;
}[] = [
  { label: "Robotics", icon: "robot", accent: "sky", className: "left-[-6%] top-[14%]", delay: 0 },
  { label: "Chess", icon: "chess", accent: "grape", className: "right-[-4%] top-[8%]", delay: 0.4 },
  { label: "Coding", icon: "code", accent: "mint", className: "left-[-9%] bottom-[26%]", delay: 0.8 },
  { label: "Music", icon: "music", accent: "orange", className: "right-[-8%] top-[42%]", delay: 1.2 },
  { label: "Dance", icon: "dance", accent: "rose", className: "left-[6%] bottom-[-4%]", delay: 1.6 },
  { label: "Painting", icon: "art", accent: "sun", className: "right-[2%] bottom-[-3%]", delay: 2 },
  { label: "Storytelling", icon: "story", accent: "sky", className: "right-[-10%] bottom-[16%]", delay: 2.4 },
];

function Floater({ f, reduce }: { f: (typeof FLOATERS)[number]; reduce: boolean | null }) {
  const a = accent(f.accent);
  return (
    <motion.div
      className={`absolute ${f.className} z-20`}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6 + f.delay * 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={reduce ? {} : { y: [0, -12, 0] }}
        transition={{ duration: 5 + f.delay, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-2 rounded-2xl bg-white/90 px-3.5 py-2.5 shadow-soft ring-1 ring-ink/5 backdrop-blur"
      >
        <span className={`flex h-8 w-8 items-center justify-center rounded-xl ${a.tint} ${a.text}`}>
          <Icon name={f.icon} size={18} />
        </span>
        <span className="pr-1 text-sm font-bold text-ink">{f.label}</span>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="home" className="relative overflow-hidden pt-28 sm:pt-32">
      {/* soft mesh backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-hero-mesh" />
      <div className="pointer-events-none absolute -left-24 top-32 -z-10 h-72 w-72 rounded-full bg-orange/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-10 -z-10 h-80 w-80 rounded-full bg-sky/10 blur-3xl" />

      <div className="container-x grid items-center gap-12 pb-16 lg:grid-cols-[1.05fr_1fr] lg:pb-24">
        {/* Copy */}
        <div className="relative z-10 text-center lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow"
          >
            <span className="flex -space-x-1.5">
              {["bg-orange", "bg-sky", "bg-mint"].map((c) => (
                <span key={c} className={`h-4 w-4 rounded-full ${c} ring-2 ring-white`} />
              ))}
            </span>
            Trusted by 2,500+ happy families
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="heading mt-6 text-4xl sm:text-6xl lg:text-[4.25rem]"
          >
            Where every child
            <br />
            learns to{" "}
            <span className="relative whitespace-nowrap text-gradient">
              lead
              <svg
                className="absolute -bottom-3 left-0 w-full"
                viewBox="0 0 200 20"
                fill="none"
                aria-hidden="true"
              >
                <motion.path
                  d="M4 14 C 50 4, 150 4, 196 12"
                  stroke="#FF7A3D"
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.7 }}
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-ink/65 lg:mx-0"
          >
            A premium learning academy for curious kids aged 3–16. Robotics, coding,
            chess, music, dance & more — taught with joy, in small caring batches.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
          >
            <a href="#book" className="btn-primary w-full sm:w-auto">
              Book Free Trial
              <Icon name="arrow" size={16} />
            </a>
            <a href="#programs" className="btn-ghost w-full sm:w-auto">
              Explore Programs
              <Icon name="compass" size={16} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-9 flex items-center justify-center gap-4 lg:justify-start"
          >
            <div className="flex items-center gap-1 text-sun">
              {[...Array(5)].map((_, i) => (
                <Icon key={i} name="star" size={18} />
              ))}
            </div>
            <p className="text-sm font-medium text-ink/60">
              <span className="font-bold text-ink">4.9/5</span> from 600+ parent reviews
            </p>
          </motion.div>
        </div>

        {/* Visual */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto aspect-square w-[78%] sm:w-[70%] lg:w-[86%]"
          >
            {/* gradient blob frame */}
            <div className="absolute inset-0 rounded-[42%_58%_58%_42%/48%_42%_58%_52%] bg-gradient-to-br from-sun via-orange to-rose opacity-90 animate-float-slow" />
            <div className="absolute inset-3 rounded-[46%_54%_54%_46%/50%_46%_54%_50%] bg-cream" />
            <div className="absolute inset-6 flex items-center justify-center rounded-[46%_54%_54%_46%/50%_46%_54%_50%] bg-white/70 ring-1 ring-white/60 backdrop-blur">
              <Image
                src="/mkplogo.png"
                alt="Happy children learning at Masti Ki Paathshaala"
                width={420}
                height={420}
                priority
                className="w-[82%] object-contain drop-shadow-sm"
              />
            </div>

            {/* orbiting dots */}
            <motion.span
              className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 rounded-full bg-sky"
              animate={reduce ? {} : { y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {FLOATERS.map((f) => (
              <Floater key={f.label} f={f} reduce={reduce} />
            ))}
          </motion.div>

          {/* trust card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="absolute -bottom-2 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 rounded-2xl bg-white/90 px-4 py-3 shadow-soft-lg ring-1 ring-ink/5 backdrop-blur"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint-tint text-mint">
              <Icon name="shield" size={20} />
            </span>
            <div className="text-left">
              <p className="text-sm font-extrabold leading-tight text-ink">100% Safe Space</p>
              <p className="text-xs text-ink/55">Verified & caring mentors</p>
            </div>
          </motion.div>
        </div>
      </div>

      <TrustMarquee />
    </section>
  );
}

function TrustMarquee() {
  const items = [
    "Small Batches",
    "Certified Mentors",
    "Hands-on Projects",
    "Safe & Playful",
    "Free Trial Class",
    "Real Stage Time",
    "Ages 3–16",
    "Flexible Schedules",
  ];
  const row = [...items, ...items];
  return (
    <div className="relative border-y border-ink/5 bg-white/50 py-4 backdrop-blur">
      <div className="flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8">
          {row.map((t, i) => (
            <div key={i} className="flex items-center gap-8">
              <span className="text-sm font-bold uppercase tracking-wider text-ink/40">
                {t}
              </span>
              <span className="text-orange">✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
