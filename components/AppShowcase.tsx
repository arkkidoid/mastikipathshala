"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { APP, type AppInfo } from "@/lib/data";
import { Icon, IconName } from "./ui/Icon";
import { Reveal } from "./ui/Reveal";

/* ---------------- Store badges ---------------- */

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" fill="currentColor" aria-hidden="true">
      <path d="M16.37 1.43c0 1.14-.5 2.27-1.18 3.08-.75.9-1.99 1.57-2.99 1.49-.12-1.03.42-2.14 1.03-2.85.7-.82 1.99-1.44 3.14-1.72zM20.9 17.09c-.55 1.26-.81 1.82-1.51 2.93-.98 1.55-2.36 3.48-4.07 3.49-1.52.01-1.91-.99-3.97-.98-2.06.01-2.49 1-4.01.99-1.71-.01-3.02-1.75-4-3.3-2.74-4.32-3.03-9.39-1.34-12.09 1.2-1.92 3.1-3.05 4.88-3.05 1.82 0 2.96 1 4.46 1 1.46 0 2.35-1 4.45-1 1.59 0 3.28.87 4.48 2.37-3.94 2.16-3.3 7.78.63 9.64z" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" aria-hidden="true">
      <path d="M3.6 2.4a1.7 1.7 0 00-.5 1.3v16.6c0 .5.2 1 .5 1.3l.1.1 9.3-9.3v-.2L3.6 2.4z" fill="#00D0FF" />
      <path d="M16.2 15.7l-3.2-3.2v-.2l3.2-3.2.1.1 3.8 2.1c1.1.6 1.1 1.6 0 2.2l-3.9 2.2z" fill="#FFCE00" />
      <path d="M16.3 15.6L13 12.4l-9.4 9.4c.4.4 1 .4 1.6.1l11.1-6.3" fill="#FF3A44" />
      <path d="M16.3 9.2L5.2 2.9c-.6-.3-1.2-.3-1.6.1l9.4 9.4 3.3-3.2z" fill="#00F076" />
    </svg>
  );
}

function StoreBadge({
  href,
  glyph,
  top,
  bottom,
}: {
  href: string;
  glyph: React.ReactNode;
  top: string;
  bottom: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 320, damping: 20 }}
      className="flex items-center gap-3 rounded-2xl bg-ink px-5 py-3 text-white shadow-soft ring-1 ring-ink/10 transition-shadow hover:shadow-soft-lg"
      aria-label={`${top} ${bottom}`}
    >
      {glyph}
      <span className="text-left leading-none">
        <span className="block text-[10px] font-medium uppercase tracking-wide text-white/70">
          {top}
        </span>
        <span className="mt-1 block font-display text-base font-bold">{bottom}</span>
      </span>
    </motion.a>
  );
}

/* ---------------- Phone screens ---------------- */

function Row({
  icon,
  tint,
  text,
  title,
  meta,
}: {
  icon: IconName;
  tint: string;
  text: string;
  title: string;
  meta: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white p-2.5 shadow-[0_2px_10px_-4px_rgba(18,53,74,0.15)]">
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${tint} ${text}`}>
        <Icon name={icon} size={16} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[11px] font-bold text-ink">{title}</p>
        <p className="truncate text-[9px] text-ink/50">{meta}</p>
      </div>
    </div>
  );
}

function ParentScreen() {
  return (
    <div className="flex h-full flex-col">
      <div className="mx-4 rounded-3xl bg-gradient-to-br from-orange to-rose p-4 text-white shadow-glow">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/25 text-xs font-bold backdrop-blur">
            AS
          </span>
          <div className="min-w-0">
            <p className="text-sm font-extrabold leading-tight">Aanya</p>
            <p className="text-[9px] text-white/80">Robotics · Batch A</p>
          </div>
          <span className="ml-auto flex items-center gap-1 rounded-full bg-white/25 px-2 py-1 text-[9px] font-bold backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-white" /> Present
          </span>
        </div>
        <div className="mt-3.5 grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-white/15 p-2.5 backdrop-blur">
            <p className="font-display text-lg font-extrabold leading-none">92%</p>
            <p className="mt-1 text-[9px] text-white/75">Attendance</p>
          </div>
          <div className="rounded-2xl bg-white/15 p-2.5 backdrop-blur">
            <p className="font-display text-lg font-extrabold leading-none">24</p>
            <p className="mt-1 text-[9px] text-white/75">Classes done</p>
          </div>
        </div>
      </div>

      <p className="px-5 pb-2 pt-4 text-[9px] font-bold uppercase tracking-[0.12em] text-ink/40">
        Today&apos;s activity
      </p>
      <div className="space-y-2 px-4">
        <Row icon="check" tint="bg-mint-tint" text="text-mint" title="Marked present" meta="9:15 AM · by Ananya R." />
        <Row icon="robot" tint="bg-sky-tint" text="text-sky" title="Built line-follower bot" meta="Project completed" />
        <Row icon="star" tint="bg-sun-tint" text="text-[#E0A400]" title="Earned 3 stars" meta="Great teamwork!" />
        <Row icon="calendar" tint="bg-grape-tint" text="text-grape" title="Next class" meta="Sat · 10:00 AM" />
      </div>
    </div>
  );
}

function TeacherScreen() {
  return (
    <div className="flex h-full flex-col">
      <div className="mx-4 rounded-3xl bg-gradient-to-br from-sky to-mint p-4 text-white shadow-soft">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-white/80">
          Today&apos;s schedule
        </p>
        <p className="mt-1 font-display text-lg font-extrabold leading-tight">3 classes</p>
        <div className="mt-3 space-y-1.5">
          <div className="flex items-center gap-2 rounded-xl bg-white/15 px-2.5 py-2 backdrop-blur">
            <Icon name="clock" size={13} />
            <span className="text-[10px] font-bold">10:00 AM · Robotics</span>
            <span className="ml-auto text-[9px] text-white/75">Batch A</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-white/15 px-2.5 py-2 backdrop-blur">
            <Icon name="clock" size={13} />
            <span className="text-[10px] font-bold">12:00 PM · Chess</span>
            <span className="ml-auto text-[9px] text-white/75">Batch C</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-5 pb-2 pt-4">
        <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/40">
          Mark attendance
        </p>
        <span className="rounded-full bg-mint-tint px-2 py-0.5 text-[9px] font-bold text-mint">
          6 / 8 present
        </span>
      </div>
      <div className="space-y-2 px-4">
        {[
          { n: "Aanya S.", p: true },
          { n: "Vivaan M.", p: true },
          { n: "Kabir K.", p: true },
          { n: "Zoya K.", p: false },
        ].map((s) => (
          <div
            key={s.n}
            className="flex items-center gap-3 rounded-2xl bg-white p-2.5 shadow-[0_2px_10px_-4px_rgba(18,53,74,0.15)]"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-ink/5 text-[9px] font-bold text-ink">
              {s.n.slice(0, 2)}
            </span>
            <p className="flex-1 truncate text-[11px] font-bold text-ink">{s.n}</p>
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full ${
                s.p ? "bg-mint text-white" : "bg-ink/5 text-ink/25"
              }`}
            >
              <Icon name="check" size={13} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Section ---------------- */

const TABS = [
  { key: "parents", label: "For Parents" },
  { key: "teachers", label: "For Teachers" },
] as const;

export function AppShowcase({ app }: { app?: Partial<AppInfo> }) {
  const [tab, setTab] = useState<"parents" | "teachers">("parents");
  const reduce = useReducedMotion();
  const APPX = { ...APP, ...(app || {}) };

  return (
    <section id="app" className="relative py-16 sm:py-24">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-5xl bg-gradient-to-br from-sky-tint via-cream to-grape-tint p-7 shadow-card ring-1 ring-ink/5 sm:p-12">
            <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-orange/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-mint/10 blur-3xl" />

            <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
              {/* Copy */}
              <div className="text-center lg:text-left">
                <span className="eyebrow">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange" />
                  {APPX.name} · Mobile App
                </span>

                <h2 className="heading mt-5 text-3xl sm:text-4xl md:text-[2.75rem]">
                  Your child&apos;s progress,{" "}
                  <span className="text-gradient">in your pocket</span>
                </h2>

                <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-ink/65 lg:mx-0">
                  {APPX.name} keeps our whole community connected — parents stay in the
                  loop, and mentors stay organised. Free for every enrolled family.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white/80 p-5 text-left shadow-card ring-1 ring-ink/5 backdrop-blur">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-tint text-orange">
                      <Icon name="heart" size={20} />
                    </span>
                    <p className="mt-3 font-display text-sm font-bold text-ink">For Parents</p>
                    <p className="mt-1 text-xs leading-relaxed text-ink/60">
                      Track your child&apos;s activities, attendance and progress — updated
                      after every class.
                    </p>
                  </div>
                  <div className="rounded-3xl bg-white/80 p-5 text-left shadow-card ring-1 ring-ink/5 backdrop-blur">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-tint text-sky">
                      <Icon name="mentor" size={20} />
                    </span>
                    <p className="mt-3 font-display text-sm font-bold text-ink">For Teachers</p>
                    <p className="mt-1 text-xs leading-relaxed text-ink/60">
                      Mark attendance in a tap and view your schedule and batches at a
                      glance.
                    </p>
                  </div>
                </div>

                {/* Store badges */}
                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                  <StoreBadge
                    href={APPX.playStore}
                    glyph={<PlayGlyph />}
                    top="Get it on"
                    bottom="Google Play"
                  />
                  <StoreBadge
                    href={APPX.appStore}
                    glyph={<AppleGlyph />}
                    top="Download on the"
                    bottom="App Store"
                  />
                </div>

                <p className="mt-4 flex items-center justify-center gap-1.5 text-xs font-medium text-ink/45 lg:justify-start">
                  <Icon name="shield" size={14} className="text-mint" />
                  Private &amp; secure —{" "}
                  <a href="/privacy-policy" className="underline underline-offset-2 hover:text-ink">
                    read our privacy policy
                  </a>
                </p>
              </div>

              {/* Phone mockup */}
              <div className="relative mx-auto">
                {/* Role toggle */}
                <div className="mx-auto mb-6 flex w-fit rounded-full bg-white/80 p-1.5 shadow-card ring-1 ring-ink/5 backdrop-blur">
                  {TABS.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setTab(t.key)}
                      aria-pressed={tab === t.key}
                      className={`relative rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                        tab === t.key ? "text-white" : "text-ink/60 hover:text-ink"
                      }`}
                    >
                      {tab === t.key && (
                        <motion.span
                          layoutId="app-tab"
                          className="absolute inset-0 rounded-full bg-ink"
                          transition={{ type: "spring", stiffness: 320, damping: 28 }}
                        />
                      )}
                      <span className="relative">{t.label}</span>
                    </button>
                  ))}
                </div>

                <motion.div
                  animate={reduce ? {} : { y: [0, -12, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  {/* glow under phone */}
                  <div className="pointer-events-none absolute inset-x-6 bottom-2 h-10 rounded-full bg-ink/20 blur-2xl" />

                  <div className="relative w-[272px] rounded-[2.75rem] bg-ink p-2.5 shadow-soft-lg ring-1 ring-ink/20">
                    {/* side buttons */}
                    <span className="absolute -left-1 top-28 h-12 w-1 rounded-l bg-ink/70" />
                    <span className="absolute -right-1 top-32 h-16 w-1 rounded-r bg-ink/70" />

                    <div className="relative h-[540px] overflow-hidden rounded-[2.25rem] bg-cream">
                      {/* dynamic island */}
                      <div className="absolute left-1/2 top-2.5 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-ink" />

                      {/* status bar */}
                      <div className="flex items-center justify-between px-6 pb-1 pt-3.5 text-[9px] font-bold text-ink/70">
                        <span>9:41</span>
                        <span className="flex items-center gap-1">
                          <span className="h-2 w-3.5 rounded-[2px] border border-ink/50" />
                          <span className="h-2 w-2 rounded-full border border-ink/50" />
                        </span>
                      </div>

                      {/* app bar */}
                      <div className="flex items-center gap-2.5 px-5 pb-3 pt-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white p-1 shadow-card">
                          <Image
                            src="/mkplogo.png"
                            alt=""
                            width={28}
                            height={28}
                            className="object-contain"
                          />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[9px] leading-none text-ink/45">Welcome back</p>
                          <p className="mt-0.5 font-display text-xs font-extrabold leading-none text-ink">
                            {APPX.name}
                          </p>
                        </div>
                        <span className="ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-white text-ink/60 shadow-card">
                          <Icon name="sparkle" size={13} />
                        </span>
                      </div>

                      {/* screen content */}
                      <div className="relative h-[400px]">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={tab}
                            initial={{ opacity: 0, x: tab === "parents" ? -24 : 24 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: tab === "parents" ? 24 : -24 }}
                            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0"
                          >
                            {tab === "parents" ? <ParentScreen /> : <TeacherScreen />}
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {/* bottom nav */}
                      <div className="absolute inset-x-3 bottom-3 flex items-center justify-around rounded-3xl bg-white/90 py-2.5 shadow-soft ring-1 ring-ink/5 backdrop-blur">
                        {(["activity", "calendar", "users", "heart"] as IconName[]).map(
                          (n, i) => (
                            <span
                              key={n}
                              className={i === 0 ? "text-orange" : "text-ink/30"}
                            >
                              <Icon name={n} size={17} />
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
