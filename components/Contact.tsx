"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CONTACT, PROGRAMS, type ContactInfo, type Program } from "@/lib/data";
import { Icon, IconName } from "./ui/Icon";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

export function Contact({
  contact,
  programs = PROGRAMS,
}: {
  contact?: Partial<ContactInfo>;
  programs?: Program[];
}) {
  const C = { ...CONTACT, ...(contact || {}) };
  const CHANNELS: {
    icon: IconName;
    label: string;
    value: string;
    href: string;
    tint: string;
    text: string;
  }[] = [
    { icon: "phone", label: "Call us", value: C.phone, href: C.phoneHref, tint: "bg-orange-tint", text: "text-orange" },
    { icon: "whatsapp", label: "WhatsApp", value: "Chat with our team", href: C.whatsapp, tint: "bg-mint-tint", text: "text-mint" },
    { icon: "mail", label: "Email", value: C.email, href: `mailto:${C.email}`, tint: "bg-sky-tint", text: "text-sky" },
  ];
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSending(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "enquiry",
          name: fd.get("name"),
          phone: fd.get("phone"),
          email: fd.get("email"),
          age: fd.get("age"),
          program: fd.get("program"),
          message: fd.get("message"),
          company: fd.get("company"), // honeypot
        }),
      });
      const data = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong.");
      }
      setDone(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Get in Touch"
          title={
            <>
              Let's start your <span className="text-gradient">happy journey</span>
            </>
          }
          subtitle="Have a question or ready to enrol? Reach out — we'd love to meet your family."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Left: channels + map */}
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              {CHANNELS.map((c, i) => (
                <Reveal key={c.label} delay={i * 0.06}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="card group flex h-full flex-col items-start gap-3 hover:shadow-soft-lg"
                  >
                    <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${c.tint} ${c.text} transition-transform group-hover:scale-110`}>
                      <Icon name={c.icon} size={24} />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-ink/45">
                        {c.label}
                      </p>
                      <p className="mt-0.5 text-sm font-bold text-ink">{c.value}</p>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-4xl bg-white shadow-card ring-1 ring-ink/5">
                <div className="flex items-start gap-3 p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-grape-tint text-grape">
                    <Icon name="map" size={20} />
                  </span>
                  <div>
                    <p className="font-bold text-ink">Visit a branch near you</p>
                    <p className="text-sm text-ink/60">{C.address}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-ink/45">
                      <Icon name="clock" size={13} /> {C.hours}
                    </p>
                  </div>
                </div>

                {/* Decorative map panel + directions */}
                <div className="relative flex h-64 items-center justify-center overflow-hidden bg-gradient-to-br from-sky-tint via-mint-tint to-grape-tint">
                  <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(#12354a_1px,transparent_1px),linear-gradient(90deg,#12354a_1px,transparent_1px)] [background-size:34px_34px]" />
                  <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 400 260" aria-hidden="true">
                    <path d="M-10 70 C 90 40, 130 150, 240 120 S 400 60, 430 110" fill="none" stroke="#42B6E8" strokeWidth="6" strokeLinecap="round" opacity="0.5" />
                    <path d="M40 -10 C 70 90, 190 110, 210 200 S 300 270, 330 300" fill="none" stroke="#3FC79A" strokeWidth="6" strokeLinecap="round" opacity="0.45" />
                  </svg>
                  <div className="relative flex flex-col items-center text-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-orange shadow-soft">
                      <Icon name="map" size={28} />
                    </span>
                    <p className="mt-3 max-w-[15rem] text-sm font-semibold text-ink/70">
                      {C.addressShort} — we'll help you find the nearest one.
                    </p>
                    <a
                      href={C.mapsSearch}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-ink mt-4 !py-2.5 text-xs"
                    >
                      <Icon name="compass" size={15} /> Get Directions
                    </a>
                  </div>
                </div>

                {/* Instagram row */}
                <a
                  href={C.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 border-t border-ink/5 p-4 transition hover:bg-cream"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose via-orange to-sun text-white">
                    <Icon name="instagram" size={18} />
                  </span>
                  <span className="text-sm font-bold text-ink">{C.instagramHandle}</span>
                  <span className="ml-auto text-xs font-semibold text-ink/45">Follow us →</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right: enquiry form */}
          <Reveal direction="left" delay={0.1}>
            <div className="rounded-4xl bg-white p-7 shadow-soft ring-1 ring-ink/5 sm:p-9">
              {done ? (
                <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-mint text-white">
                    <Icon name="check" size={34} />
                  </span>
                  <h3 className="heading mt-4 text-xl">Enquiry received! 🎉</h3>
                  <p className="mt-2 max-w-xs text-sm text-ink/60">
                    Thank you! Our admissions team will reach out to you very soon.
                  </p>
                  <button onClick={() => setDone(false)} className="btn-ghost mt-5">
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <h3 className="heading text-xl">Admission enquiry</h3>
                  <p className="-mt-2 text-sm text-ink/55">
                    Fill this in and we'll craft the perfect plan for your child.
                  </p>

                  {/* honeypot — hidden from humans, catches bots */}
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute left-[-9999px] h-0 w-0 opacity-0"
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Parent's name">
                      <input required name="name" type="text" placeholder="Full name" className="cinput" />
                    </Field>
                    <Field label="Phone">
                      <input required name="phone" type="tel" placeholder="Mobile number" className="cinput" />
                    </Field>
                  </div>
                  <Field label="Email">
                    <input name="email" type="email" placeholder="you@email.com" className="cinput" />
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Learner's age">
                      <input required name="age" type="number" min={3} max={99} placeholder="Age" className="cinput" />
                    </Field>
                    <Field label="Program of interest">
                      <select required name="program" className="cinput" defaultValue="">
                        <option value="" disabled>
                          Select
                        </option>
                        {programs.map((p) => (
                          <option key={p.title}>{p.title}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <Field label="Message (optional)">
                    <textarea name="message" rows={3} placeholder="Tell us about your child…" className="cinput resize-none" />
                  </Field>

                  {error && (
                    <p role="alert" className="rounded-2xl bg-rose-tint px-4 py-3 text-xs font-semibold text-rose">
                      {error}
                    </p>
                  )}

                  <button type="submit" disabled={sending} className="btn-primary w-full disabled:opacity-70">
                    {sending ? "Sending…" : "Send enquiry"}
                    {!sending && <Icon name="arrow" size={16} />}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      <style jsx>{`
        :global(.cinput) {
          width: 100%;
          border-radius: 1rem;
          background: #fff9f2;
          border: 1px solid rgba(18, 53, 74, 0.1);
          padding: 0.8rem 1rem;
          font-size: 0.95rem;
          color: #12354a;
          transition: all 0.2s;
        }
        :global(.cinput:focus) {
          outline: none;
          border-color: #ff7a3d;
          box-shadow: 0 0 0 3px rgba(255, 122, 61, 0.15);
          background: #fff;
        }
      `}</style>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink/70">{label}</span>
      {children}
    </label>
  );
}
