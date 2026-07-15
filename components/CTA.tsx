"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PROGRAMS } from "@/lib/data";
import { Icon } from "./ui/Icon";
import { Reveal } from "./ui/Reveal";

export function CTA() {
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
          type: "trial",
          name: fd.get("name"),
          phone: fd.get("phone"),
          program: fd.get("program"),
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
    <section id="book" className="relative py-16 sm:py-24">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-5xl bg-gradient-to-br from-orange via-orange to-rose px-6 py-12 shadow-soft-lg sm:px-12 sm:py-16">
            {/* decorative shapes */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-sun/40 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-white/20 blur-2xl" />
            <div className="pointer-events-none absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_15%_20%,white_2px,transparent_2px),radial-gradient(circle_at_80%_70%,white_2px,transparent_2px)] [background-size:50px_50px]" />

            <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
              <div className="text-center text-white lg:text-left">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white ring-1 ring-white/30 backdrop-blur">
                  <Icon name="sparkle" size={14} /> 100% Free · No Commitment
                </span>
                <h2 className="heading mt-5 text-3xl text-white sm:text-5xl">
                  Book your child's free trial today
                </h2>
                <p className="mx-auto mt-4 max-w-md text-base text-white/85 lg:mx-0 sm:text-lg">
                  One joyful class. Zero pressure. Watch your child light up — then decide.
                </p>
                <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start">
                  {["Meet the mentor", "Try any program", "Instant confirmation"].map((t) => (
                    <span key={t} className="flex items-center gap-2 text-sm font-semibold text-white">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/25">
                        <Icon name="check" size={13} />
                      </span>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-4xl bg-white p-6 shadow-soft-lg sm:p-8"
              >
                {done ? (
                  <div className="flex flex-col items-center py-8 text-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-mint text-white">
                      <Icon name="check" size={34} />
                    </span>
                    <h3 className="heading mt-4 text-xl">You're all set! 🎉</h3>
                    <p className="mt-2 text-sm text-ink/60">
                      Our team will call you within a few hours to confirm your slot.
                    </p>
                    <button onClick={() => setDone(false)} className="btn-ghost mt-5">
                      Book another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-4">
                    <h3 className="heading text-lg">Reserve your spot</h3>

                    {/* honeypot — hidden from humans, catches bots */}
                    <input
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="absolute left-[-9999px] h-0 w-0 opacity-0"
                    />

                    <Field label="Parent's name">
                      <input required name="name" type="text" placeholder="e.g. Priya Sharma" className="input" />
                    </Field>
                    <Field label="Phone number">
                      <input required name="phone" type="tel" placeholder="Your 10-digit mobile number" className="input" />
                    </Field>
                    <Field label="Choose a program">
                      <select required name="program" className="input" defaultValue="">
                        <option value="" disabled>
                          Select a program
                        </option>
                        {PROGRAMS.map((p) => (
                          <option key={p.title}>{p.title}</option>
                        ))}
                      </select>
                    </Field>

                    {error && (
                      <p role="alert" className="rounded-2xl bg-rose-tint px-4 py-3 text-xs font-semibold text-rose">
                        {error}
                      </p>
                    )}

                    <button type="submit" disabled={sending} className="btn-primary w-full disabled:opacity-70">
                      {sending ? "Sending…" : "Book Free Trial"}
                      {!sending && <Icon name="arrow" size={16} />}
                    </button>
                    <p className="text-center text-xs text-ink/45">
                      By booking you agree to be contacted about your trial class.
                    </p>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          border-radius: 1rem;
          background: #fff9f2;
          border: 1px solid rgba(18, 53, 74, 0.1);
          padding: 0.85rem 1rem;
          font-size: 0.95rem;
          color: #12354a;
          transition: all 0.2s;
        }
        :global(.input:focus) {
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
