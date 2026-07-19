"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LogoutButton } from "./LogoutButton";

export type NavItem = { slug: string; label: string; icon: string; group: string };

export function Sidebar({ items, email }: { items: NavItem[]; email: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const groups = Array.from(new Set(items.map((i) => i.group)));

  const nav = (
    <nav className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-5 py-5">
        <Image src="/mkplogo.png" alt="" width={40} height={40} className="h-10 w-10 object-contain" />
        <div className="leading-tight">
          <p className="font-display text-sm font-extrabold text-ink">Content Manager</p>
          <p className="text-[11px] text-ink/45">Masti Ki Paathshaala</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-4">
        <Link
          href="/manager"
          onClick={() => setOpen(false)}
          className={`mb-1 flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition-colors ${
            pathname === "/manager" ? "bg-orange text-white" : "text-ink/70 hover:bg-cream"
          }`}
        >
          <span className="text-base">🏠</span> Overview
        </Link>

        {groups.map((g) => (
          <div key={g} className="mt-4">
            <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-ink/35">{g}</p>
            {items
              .filter((i) => i.group === g)
              .map((i) => {
                const active = pathname === `/manager/${i.slug}` || pathname.startsWith(`/manager/${i.slug}/`);
                return (
                  <Link
                    key={i.slug}
                    href={`/manager/${i.slug}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors ${
                      active ? "bg-ink text-white" : "text-ink/70 hover:bg-cream"
                    }`}
                  >
                    <span className="text-base">{i.icon}</span> {i.label}
                  </Link>
                );
              })}
          </div>
        ))}
      </div>

      <div className="border-t border-ink/5 p-4">
        <a href="/" target="_blank" rel="noreferrer" className="mb-2 flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-semibold text-ink/60 hover:bg-cream">
          ↗ View live site
        </a>
        <div className="flex items-center justify-between gap-2 px-3">
          <span className="truncate text-xs text-ink/45" title={email}>{email}</span>
          <LogoutButton />
        </div>
      </div>
    </nav>
  );

  return (
    <>
      {/* mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-ink/5 bg-cream/90 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center gap-2">
          <Image src="/mkplogo.png" alt="" width={32} height={32} className="h-8 w-8 object-contain" />
          <span className="font-display text-sm font-extrabold text-ink">Content Manager</span>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-ink shadow-card ring-1 ring-ink/5"
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-ink/5 bg-white lg:block">
        {nav}
      </aside>

      {/* mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/30" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 bg-white shadow-soft-lg">{nav}</div>
        </div>
      )}
    </>
  );
}
