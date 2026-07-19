"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { accent } from "@/lib/accents";
import { CONTACT, REELS, type Reel } from "@/lib/data";
import { Icon } from "./ui/Icon";
import { Reveal } from "./ui/Reveal";

/* ---------- small inline volume icons (not in the shared set) ---------- */
function VolumeIcon({ muted }: { muted: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9H4z" />
      {muted ? (
        <path d="M17 9l4 6M21 9l-4 6" />
      ) : (
        <>
          <path d="M17 8.5a5 5 0 010 7" />
          <path d="M19.5 6a8 8 0 010 12" />
        </>
      )}
    </svg>
  );
}

/* ---------- one reel card (video if src exists, else branded placeholder) ---------- */
function ReelCard({
  reel,
  active,
  muted,
  onToggleMute,
  registerVideo,
}: {
  reel: Reel;
  active: boolean;
  muted: boolean;
  onToggleMute: () => void;
  registerVideo: (el: HTMLVideoElement | null) => void;
}) {
  const a = accent(reel.accent);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] bg-ink ring-1 ring-ink/10">
      {reel.src ? (
        <video
          ref={registerVideo}
          className="h-full w-full object-cover"
          src={reel.src}
          poster={reel.poster}
          muted={muted}
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        /* graceful placeholder — never breaks the layout */
        <div className={`relative flex h-full w-full items-center justify-center bg-gradient-to-br ${a.grad}`}>
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_28%_22%,white_2.5px,transparent_2.5px)] [background-size:34px_34px]" />
          <motion.span
            animate={active ? { scale: [1, 1.08, 1] } : { scale: 1 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-white/25 text-white ring-1 ring-white/40 backdrop-blur"
          >
            <Icon name={reel.icon} size={40} />
          </motion.span>
        </div>
      )}

      {/* top row: Reels pill */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-3">
        <span className="flex items-center gap-1.5 rounded-full bg-black/25 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
          <Icon name="play" size={11} /> Reel
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-sm">
          <Icon name="instagram" size={15} />
        </span>
      </div>

      {/* bottom caption */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent p-4 pt-10">
        <p className="text-[11px] font-semibold text-white/80">{CONTACT.instagramHandle}</p>
        <p className="mt-0.5 text-sm font-bold leading-snug text-white drop-shadow">{reel.caption}</p>
      </div>

      {/* mute toggle — only on the active card with a real video */}
      {active && reel.src && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleMute();
          }}
          className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
          aria-label={muted ? "Unmute reel" : "Mute reel"}
        >
          <VolumeIcon muted={muted} />
        </button>
      )}
    </div>
  );
}

export function Instagram() {
  const reduce = useReducedMotion();
  const reels = REELS;
  const n = reels.length;

  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const [dims, setDims] = useState({ cardW: 250, spacing: 190, height: 444 });

  const stageRef = useRef<HTMLDivElement>(null);
  const pauseUntil = useRef(0);
  const prevOffset = useRef<Record<string, number>>({});
  const videoEls = useRef<Record<string, HTMLVideoElement | null>>({});
  const pointer = useRef<{ x: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);

  /* responsive sizing */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const W = el.clientWidth || 320;
      const small = W < 560;
      const cardW = Math.round(Math.min(300, Math.max(196, W * (small ? 0.66 : 0.28))));
      const height = Math.round((cardW * 16) / 9);
      const spacing = Math.round(cardW * (small ? 0.6 : 0.74));
      setDims({ cardW, spacing, height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const bump = () => {
    pauseUntil.current = Date.now() + 7000;
  };

  const go = useCallback(
    (dir: number) => setActive((prev) => (prev + dir + n) % n),
    [n]
  );

  /* auto-advance */
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      if (Date.now() < pauseUntil.current) return;
      if (typeof document !== "undefined" && document.hidden) return;
      setActive((prev) => (prev + 1) % n);
    }, 4200);
    return () => clearInterval(id);
  }, [reduce, n]);

  /* play the centered video, pause the rest */
  useEffect(() => {
    Object.entries(videoEls.current).forEach(([id, el]) => {
      if (!el) return;
      if (id === reels[active].id && !reduce) {
        el.muted = muted;
        el.play().catch(() => {});
      } else {
        el.pause();
      }
    });
  }, [active, muted, reels, reduce]);

  /* keyboard arrows when focused */
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      go(-1);
      bump();
    } else if (e.key === "ArrowRight") {
      go(1);
      bump();
    }
  };

  /* swipe */
  const onPointerDown = (e: React.PointerEvent) => {
    pointer.current = { x: e.clientX, moved: false };
    bump();
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (pointer.current && Math.abs(e.clientX - pointer.current.x) > 8) {
      pointer.current.moved = true;
    }
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!pointer.current) return;
    const dx = e.clientX - pointer.current.x;
    if (Math.abs(dx) > 44) {
      go(dx < 0 ? 1 : -1);
      suppressClick.current = true;
      bump();
    }
    pointer.current = null;
  };

  const rel = (i: number) => {
    let o = ((i - active) % n + n) % n;
    if (o > n / 2) o -= n;
    return o;
  };

  return (
    <section id="instagram" className="relative overflow-hidden py-16 sm:py-20">
      <div className="container-x">
        {/* heading (kept) */}
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose via-orange to-sun text-white shadow-soft">
                <Icon name="instagram" size={26} />
              </span>
              <div>
                <p className="font-display text-lg font-extrabold text-ink">
                  {CONTACT.instagramHandle}
                </p>
                <p className="text-sm text-ink/55">Watch the daily joy on Instagram</p>
              </div>
            </div>
            <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="btn-ghost">
              <Icon name="instagram" size={16} /> Follow us
            </a>
          </div>
        </Reveal>

        {/* carousel */}
        <div className="relative mt-10">
          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-30 w-16 bg-gradient-to-r from-cream to-transparent sm:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-30 w-16 bg-gradient-to-l from-cream to-transparent sm:w-28" />

          <div
            ref={stageRef}
            className="relative mx-auto flex touch-pan-y items-center justify-center select-none"
            style={{ height: dims.height + 8 }}
            role="group"
            aria-roledescription="carousel"
            aria-label="Instagram reels"
            tabIndex={0}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={() => (pointer.current = null)}
          >
            {reels.map((reel, i) => {
              const o = rel(i);
              const k = Math.abs(o);
              if (k > 3) return null;

              const isActive = o === 0;
              const scale = k === 0 ? 1 : k === 1 ? 0.84 : 0.7;
              const opacity = k === 0 ? 1 : k === 1 ? 0.92 : k === 2 ? 0.45 : 0;
              const blur = k === 0 ? 0 : k === 1 ? 1.2 : 3;
              const x = o * dims.spacing - dims.cardW / 2;

              const prev = prevOffset.current[reel.id];
              const jumped = prev !== undefined && Math.abs(o - prev) > 2;
              prevOffset.current[reel.id] = o;

              return (
                <motion.div
                  key={reel.id}
                  className="absolute left-1/2 top-1/2 cursor-pointer"
                  style={{
                    width: dims.cardW,
                    height: dims.height,
                    zIndex: 30 - k * 10,
                    pointerEvents: k > 2 ? "none" : "auto",
                  }}
                  initial={false}
                  animate={{
                    x,
                    y: "-50%",
                    scale,
                    opacity,
                    filter: `blur(${blur}px)`,
                  }}
                  transition={
                    jumped
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 220, damping: 28, mass: 0.9, opacity: { duration: 0.4 } }
                  }
                  onClick={() => {
                    if (suppressClick.current) {
                      suppressClick.current = false;
                      return;
                    }
                    if (!isActive) {
                      setActive(i);
                      bump();
                    } else {
                      window.open(CONTACT.instagram, "_blank", "noopener");
                    }
                  }}
                  aria-label={reel.caption}
                  aria-hidden={k > 2}
                >
                  {/* active gets the IG gradient ring + stronger shadow */}
                  <div
                    className={`h-full w-full rounded-[1.9rem] p-[3px] transition-shadow ${
                      isActive
                        ? "bg-gradient-to-br from-rose via-orange to-sun shadow-soft-lg"
                        : "bg-ink/10 shadow-card"
                    }`}
                  >
                    <ReelCard
                      reel={reel}
                      active={isActive}
                      muted={muted}
                      onToggleMute={() => {
                        setMuted((m) => !m);
                        bump();
                      }}
                      registerVideo={(el) => {
                        videoEls.current[reel.id] = el;
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* controls */}
          <div className="relative z-40 mt-7 flex items-center justify-center gap-4">
            <button
              onClick={() => {
                go(-1);
                bump();
              }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink shadow-card ring-1 ring-ink/5 transition hover:bg-ink hover:text-white"
              aria-label="Previous reel"
            >
              <Icon name="chevron" size={22} className="rotate-90" />
            </button>

            <div className="flex items-center gap-2">
              {reels.map((r, i) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setActive(i);
                    bump();
                  }}
                  aria-label={`Go to reel ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === active ? "w-7 bg-orange" : "w-2.5 bg-ink/15 hover:bg-ink/30"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => {
                go(1);
                bump();
              }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink shadow-card ring-1 ring-ink/5 transition hover:bg-ink hover:text-white"
              aria-label="Next reel"
            >
              <Icon name="chevron" size={22} className="-rotate-90" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
