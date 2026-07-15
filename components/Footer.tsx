"use client";

import { useState } from "react";
import Image from "next/image";
import { NAV_LINKS, PROGRAMS, CONTACT } from "@/lib/data";
import { Icon, IconName } from "./ui/Icon";

const SOCIALS: { icon: IconName; href: string; label: string }[] = [
  { icon: "instagram", href: CONTACT.instagram, label: "Instagram" },
  { icon: "facebook", href: "#", label: "Facebook" },
  { icon: "youtube", href: "#", label: "YouTube" },
  { icon: "whatsapp", href: CONTACT.whatsapp, label: "WhatsApp" },
];

export function Footer() {
  const [sent, setSent] = useState(false);

  return (
    <footer className="relative mt-10 overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-orange/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-sky/15 blur-3xl" />

      <div className="container-x relative">
        {/* Newsletter */}
        <div className="grid gap-8 border-b border-white/10 py-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <h3 className="heading text-2xl text-white sm:text-3xl">
              Join the Masti family newsletter
            </h3>
            <p className="mt-2 max-w-md text-sm text-white/60">
              Monthly tips, event invites and early-bird batch openings — straight to your inbox.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <input
              required
              type="email"
              placeholder="Your email address"
              className="w-full rounded-full border border-white/15 bg-white/10 px-5 py-3.5 text-sm text-white placeholder:text-white/40 focus:border-orange focus:outline-none"
            />
            <button type="submit" className="btn bg-orange text-white shadow-glow hover:-translate-y-0.5">
              {sent ? "Subscribed ✓" : "Subscribe"}
              {!sent && <Icon name="arrow" size={16} />}
            </button>
          </form>
        </div>

        {/* Links */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white p-1.5">
                <Image src="/mkplogo.png" alt="Masti Ki Paathshaala" width={40} height={40} className="object-contain" />
              </span>
              <span className="font-display text-lg font-extrabold leading-tight">
                Masti Ki<br />Paathshaala
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              A premium learning academy where kids and adults learn with joy and grow into confident leaders.
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:-translate-y-0.5 hover:bg-orange"
                >
                  <Icon name={s.icon} size={19} />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Quick Links">
            {NAV_LINKS.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Programs">
            {PROGRAMS.slice(0, 7).map((p) => (
              <FooterLink key={p.title} href="/#programs">
                {p.title}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Get in Touch">
            <li>
              <a href={CONTACT.phoneHref} className="flex items-center gap-2 text-sm text-white/60 transition hover:text-white">
                <Icon name="phone" size={15} /> {CONTACT.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 text-sm text-white/60 transition hover:text-white">
                <Icon name="mail" size={15} /> {CONTACT.email}
              </a>
            </li>
            <li className="flex items-start gap-2 text-sm text-white/60">
              <Icon name="map" size={15} className="mt-0.5 shrink-0" /> {CONTACT.address}
            </li>
            <li>
              <a href="/#book" className="btn bg-white text-ink mt-2 hover:-translate-y-0.5">
                Book Free Trial <Icon name="arrow" size={15} />
              </a>
            </li>
          </FooterCol>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-7 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Masti Ki Paathshaala. Learn &amp; Lead. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/50">
            <a href="/privacy-policy" className="transition hover:text-white">Privacy</a>
            <a href="#" className="transition hover:text-white">Terms</a>
            <a href="#" className="transition hover:text-white">Safeguarding</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white/80">
        {title}
      </h4>
      <ul className="mt-4 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a href={href} className="text-sm text-white/60 transition hover:text-white hover:pl-1">
        {children}
      </a>
    </li>
  );
}
