"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/manager";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/manager/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: fd.get("email"), password: fd.get("password") }),
      });
      const data = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !data.ok) throw new Error(data.error || "Login failed.");
      router.replace(next.startsWith("/manager") ? next : "/manager");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-col items-center text-center">
        <Image src="/mkplogo.png" alt="Masti Ki Paathshaala" width={64} height={64} className="h-16 w-16 object-contain" />
        <h1 className="heading mt-4 text-2xl">Manager Login</h1>
        <p className="mt-1 text-sm text-ink/55">Sign in to manage your website content.</p>
      </div>

      <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-4xl bg-white p-7 shadow-soft ring-1 ring-ink/5">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink/70">Email</span>
          <input required name="email" type="email" autoComplete="username" placeholder="you@arkkidoid.in" className="minput" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink/70">Password</span>
          <input required name="password" type="password" autoComplete="current-password" placeholder="••••••••" className="minput" />
        </label>

        {error && (
          <p role="alert" className="rounded-2xl bg-rose-tint px-4 py-3 text-xs font-semibold text-rose">
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-70">
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-ink/40">Masti Ki Paathshaala · Content Manager</p>

      <style jsx>{`
        :global(.minput) {
          width: 100%;
          border-radius: 1rem;
          background: #fff9f2;
          border: 1px solid rgba(18, 53, 74, 0.1);
          padding: 0.8rem 1rem;
          font-size: 0.95rem;
          color: #12354a;
          transition: all 0.2s;
        }
        :global(.minput:focus) {
          outline: none;
          border-color: #ff7a3d;
          box-shadow: 0 0 0 3px rgba(255, 122, 61, 0.15);
          background: #fff;
        }
      `}</style>
    </div>
  );
}

export default function ManagerLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-hero-mesh px-5 py-16">
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
