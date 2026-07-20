"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GALLERY, type GalleryImage } from "@/lib/data";
import { Icon } from "./ui/Icon";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

const heightClass: Record<string, string> = {
  tall: "h-80 sm:h-96",
  mid: "h-64 sm:h-72",
  short: "h-52 sm:h-56",
};

// subtle, non-editable placeholder tints (only shown when no image URL is set)
const PLACEHOLDERS = [
  "from-sky-tint to-mint-tint",
  "from-orange-tint to-sun-tint",
  "from-grape-tint to-sky-tint",
  "from-rose-tint to-orange-tint",
  "from-mint-tint to-sky-tint",
];

function Placeholder({ index }: { index: number }) {
  return (
    <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${PLACEHOLDERS[index % PLACEHOLDERS.length]}`}>
      <svg viewBox="0 0 24 24" width={44} height={44} fill="none" stroke="#12354a" strokeOpacity="0.35" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <circle cx="8.5" cy="9.5" r="1.5" />
        <path d="M4 17l4.5-4.5 3.5 3.5 3-3 5 5" />
      </svg>
    </div>
  );
}

function Tile({ item, index, onOpen }: { item: GalleryImage; index: number; onOpen: () => void }) {
  const hasImage = Boolean(item.image && item.image.trim());
  return (
    <motion.button
      onClick={onOpen}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`group relative block w-full overflow-hidden rounded-4xl bg-cream ring-1 ring-ink/5 shadow-card ${heightClass[item.h] || heightClass.mid}`}
      aria-label={item.title ? `Open ${item.title}` : "Open image"}
    >
      {hasImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.image}
          alt={item.title || "Gallery image"}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <Placeholder index={index} />
      )}

      {/* hover darken */}
      <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/10" />

      {/* zoom hint */}
      <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-ink opacity-0 shadow-soft backdrop-blur transition-all duration-300 group-hover:opacity-100">
        <Icon name="plus" size={18} />
      </span>

      {item.title && (
        <div className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/70 to-transparent p-5 text-left opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-base font-bold text-white drop-shadow">{item.title}</p>
        </div>
      )}
    </motion.button>
  );
}

export function Gallery({ items = GALLERY }: { items?: GalleryImage[] }) {
  const [active, setActive] = useState<number | null>(null);
  const item = active !== null ? items[active] : null;

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
            <Reveal key={i} delay={(i % 3) * 0.08}>
              <Tile item={g} index={i} onOpen={() => setActive(i)} />
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {item && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-md sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={item.title || "Gallery image"}
          >
            {/* close */}
            <button
              onClick={() => setActive(null)}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ink shadow-soft transition hover:scale-105"
              aria-label="Close"
            >
              <Icon name="close" size={20} />
            </button>

            {/* prev / next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActive((active! - 1 + items.length) % items.length);
              }}
              className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-soft transition hover:scale-105 sm:left-6"
              aria-label="Previous"
            >
              <Icon name="chevron" size={22} className="rotate-90" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActive((active! + 1) % items.length);
              }}
              className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-soft transition hover:scale-105 sm:right-6"
              aria-label="Next"
            >
              <Icon name="chevron" size={22} className="-rotate-90" />
            </button>

            <motion.figure
              key={active}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-full max-w-4xl flex-col items-center"
            >
              {item.image && item.image.trim() ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.image}
                  alt={item.title || "Gallery image"}
                  className="max-h-[80vh] w-auto rounded-3xl object-contain shadow-soft-lg"
                />
              ) : (
                <div className="h-[60vh] w-[80vw] max-w-2xl overflow-hidden rounded-3xl">
                  <Placeholder index={active ?? 0} />
                </div>
              )}
              {item.title && (
                <figcaption className="mt-4 rounded-full bg-white/90 px-5 py-2 text-sm font-bold text-ink shadow-soft backdrop-blur">
                  {item.title}
                </figcaption>
              )}
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
