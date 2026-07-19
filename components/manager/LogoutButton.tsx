"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <button
      onClick={async () => {
        setLoading(true);
        await fetch("/api/manager/logout", { method: "POST" });
        router.replace("/manager/login");
        router.refresh();
      }}
      className="rounded-full bg-cream px-3 py-1.5 text-xs font-bold text-ink ring-1 ring-ink/10 transition hover:bg-ink hover:text-white"
    >
      {loading ? "…" : "Log out"}
    </button>
  );
}
