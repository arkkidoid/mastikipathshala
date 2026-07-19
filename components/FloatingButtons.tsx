"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CONTACT, type ContactInfo } from "@/lib/data";
import { Icon } from "./ui/Icon";

export function FloatingButtons({ contact }: { contact?: Partial<ContactInfo> }) {
  const [show, setShow] = useState(false);
  const C = { ...CONTACT, ...(contact || {}) };

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Right-side stack: WhatsApp + back to top */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
        <AnimatePresence>
          {show && (
            <motion.button
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink shadow-soft-lg ring-1 ring-ink/5 transition hover:-translate-y-0.5"
              aria-label="Back to top"
            >
              <Icon name="arrowUp" size={20} />
            </motion.button>
          )}
        </AnimatePresence>

        <motion.a
          href={C.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft-lg"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Chat on WhatsApp"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
          <Icon name="whatsapp" size={30} className="relative" />
          <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-soft transition-opacity duration-200 group-hover:opacity-100">
            Chat with us
          </span>
        </motion.a>
      </div>

      {/* Sticky mobile Book Trial bar */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed inset-x-4 bottom-5 z-30 md:hidden"
          >
            <a
              href="#book"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-sm font-bold text-white shadow-soft-lg"
            >
              <Icon name="sparkle" size={16} className="text-sun" />
              Book Your Free Trial
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
