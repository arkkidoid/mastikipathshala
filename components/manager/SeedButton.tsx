"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SeedButton({ subtle = false }: { subtle?: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        onClick={async () => {
          setLoading(true);
          setMsg(null);
          try {
            const res = await fetch("/api/manager/seed", { method: "POST" });
            const data = await res.json();
            if (!res.ok || !data.ok) throw new Error(data.error || "Failed");
            setMsg(
              data.seeded?.length
                ? `Loaded starter content for ${data.seeded.length} section(s).`
                : "All sections already have content."
            );
            router.refresh();
          } catch (e) {
            setMsg(e instanceof Error ? e.message : "Failed");
          } finally {
            setLoading(false);
          }
        }}
        disabled={loading}
        className={
          subtle
            ? "rounded-full bg-white px-4 py-2 text-sm font-bold text-ink ring-1 ring-ink/10 transition hover:bg-ink hover:text-white disabled:opacity-60"
            : "btn-primary disabled:opacity-70"
        }
      >
        {loading ? "Loading…" : "Load starter content"}
      </button>
      {msg && <span className="text-sm font-medium text-ink/60">{msg}</span>}
    </div>
  );
}
