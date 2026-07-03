"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/data";
import { Icon } from "./ui/Icon";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.nav
        initial={false}
        animate={{
          backgroundColor: scrolled ? "rgba(255,249,242,0.85)" : "rgba(255,249,242,0)",
          boxShadow: scrolled
            ? "0 10px 40px -18px rgba(18,53,74,0.28)"
            : "0 0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.35 }}
        className={`backdrop-blur-xl ${scrolled ? "ring-1 ring-ink/5" : ""}`}
      >
        <div className="container-x flex h-[72px] items-center justify-between">
          <a href="#home" className="flex items-center gap-3" aria-label="Masti Ki Paathshaala home">
            <Image
              src="/mkplogo.png"
              alt="Masti Ki Paathshaala"
              width={48}
              height={48}
              priority
              className="h-11 w-11 object-contain"
            />
            <span className="hidden text-lg font-extrabold leading-none tracking-tight text-ink sm:block font-display">
              Masti Ki<br />
              <span className="text-orange">Paathshaala</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 rounded-full bg-white/60 p-1.5 shadow-card ring-1 ring-ink/5 backdrop-blur lg:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-ink/70 transition-colors hover:bg-white hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="#book" className="btn-primary hidden md:inline-flex">
              Book Free Trial
              <Icon name="arrow" size={16} />
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-card ring-1 ring-ink/5 lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <Icon name={open ? "close" : "menu"} size={22} />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="container-x fixed inset-x-0 top-[80px] z-50 lg:hidden"
            >
              <div className="rounded-4xl bg-white p-4 shadow-soft-lg ring-1 ring-ink/5">
                <div className="grid gap-1">
                  {NAV_LINKS.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="rounded-2xl px-4 py-3 text-base font-semibold text-ink/80 transition-colors hover:bg-cream"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
                <a
                  href="#book"
                  onClick={() => setOpen(false)}
                  className="btn-primary mt-3 w-full"
                >
                  Book Free Trial
                  <Icon name="arrow" size={16} />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
