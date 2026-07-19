"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GALLERY } from "@/lib/data";
import type { IconName } from "./ui/Icon";
import type { Accent } from "@/lib/data";
import { accent } from "@/lib/accents";

type GalleryItem = {
  title: string;
  accent: Accent;
  icon: IconName;
  h: "tall" | "mid" | "short";
  video?: boolean;
};
import { Icon } from "./ui/Icon";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

const heightClass: Record<string, string> = {
  tall: "h-80 sm:h-96",
  mid: "h-64 sm:h-72",
  short: "h-52 sm:h-56",
};

function Tile({
  item,
  onOpen,
}: {
  item: GalleryItem;
  onOpen: () => void;
}) {
  const a = accent(item.accent);
  return (
    <motion.button
      onClick={onOpen}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`group relative block w-full overflow-hidden rounded-4xl ring-1 ring-ink/5 shadow-card ${heightClass[item.h]}`}
      aria-label={`Open ${item.title}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${a.grad}`} />
      <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {/* pattern */}
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_2px,transparent_2px),radial-gradient(circle_at_70%_60%,white_2px,transparent_2px)] [background-size:36px_36px]" />

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/25 text-white ring-1 ring-white/40 backdrop-blur transition-transform duration-300 group-hover:scale-110">
          <Icon name={item.icon} size={40} />
        </span>
      </div>

      {item.video && (
        <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow-soft">
          <Icon name="play" size={16} />
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/60 to-transparent p-5 text-left">
        <p className="text-base font-bold text-white drop-shadow">{item.title}</p>
        <p className="text-xs font-medium text-white/80">
          {item.video ? "Watch the moment" : "View gallery"}
        </p>
      </div>
    </motion.button>
  );
}

export function Gallery({ items = GALLERY }: { items?: GalleryItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  const item = active !== null ? items[active] : null;
  const a = item ? accent(item.accent) : null;

  return (
    <section id="gallery" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Student Gallery"
          title={
            <>
              Real moments of <span className="text-gradient">joy & discovery</span>
            </>
          }
          subtitle="Peek inside our classrooms, stages and labs — where every day is a happy memory in the making."
        />

        <div className="mt-14 masonry columns-1 sm:columns-2 lg:columns-3">
          {items.map((g, i) => (
            <Reveal key={g.title} delay={(i % 3) * 0.08}>
              <Tile item={g} onOpen={() => setActive(i)} />
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {item && a && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/70 p-5 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={item.title}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl overflow-hidden rounded-5xl bg-white shadow-soft-lg"
            >
              <div className={`relative flex h-72 items-center justify-center bg-gradient-to-br ${a.grad} sm:h-96`}>
                <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_2px,transparent_2px),radial-gradient(circle_at_70%_60%,white_2px,transparent_2px)] [background-size:44px_44px]" />
                <span className="flex h-28 w-28 items-center justify-center rounded-[2rem] bg-white/25 text-white ring-1 ring-white/40 backdrop-blur">
                  <Icon name={item.video ? "play" : item.icon} size={54} />
                </span>
                <button
                  onClick={() => setActive(null)}
                  className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ink shadow-soft transition hover:scale-105"
                  aria-label="Close"
                >
                  <Icon name="close" size={20} />
                </button>
              </div>
              <div className="flex items-center justify-between gap-4 p-6">
                <div>
                  <h3 className="heading text-xl">{item.title}</h3>
                  <p className="mt-1 text-sm text-ink/55">
                    {item.video
                      ? "A glimpse from our showcase highlights."
                      : "Captured during a live session at Masti Ki Paathshaala."}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setActive((active! - 1 + items.length) % items.length)
                    }
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-cream text-ink ring-1 ring-ink/5 transition hover:bg-ink hover:text-white"
                    aria-label="Previous"
                  >
                    <Icon name="chevron" size={20} className="rotate-90" />
                  </button>
                  <button
                    onClick={() => setActive((active! + 1) % items.length)}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-cream text-ink ring-1 ring-ink/5 transition hover:bg-ink hover:text-white"
                    aria-label="Next"
                  >
                    <Icon name="chevron" size={20} className="-rotate-90" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
