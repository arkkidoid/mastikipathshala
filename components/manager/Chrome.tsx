import Link from "next/link";

export function Breadcrumb({ label, item }: { label: string; item?: string }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-ink/45">
      <Link href="/manager" className="hover:text-ink">Manager</Link>
      <span>/</span>
      {item ? (
        <>
          <span className="hover:text-ink">{label}</span>
          <span>/</span>
          <span className="font-semibold text-ink/70">{item}</span>
        </>
      ) : (
        <span className="font-semibold text-ink/70">{label}</span>
      )}
    </nav>
  );
}

export function DbNotice({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-3xl bg-white p-5 shadow-card ring-1 ring-rose/20 ${className}`}>
      <p className="text-sm font-bold text-rose">Database not connected</p>
      <p className="mt-1 text-sm text-ink/60">
        Set <code className="rounded bg-cream px-1">MONGODB_URI</code> (and{" "}
        <code className="rounded bg-cream px-1">MONGODB_DB</code>) in your environment, then
        reload. The public site keeps showing built-in defaults until then.
      </p>
    </div>
  );
}
