import Link from "next/link";
import { SECTIONS, SECTION_GROUPS } from "@/lib/cms/registry";
import { sectionCounts } from "@/lib/cms/store";
import { SeedButton } from "@/components/manager/SeedButton";

export const dynamic = "force-dynamic";

export default async function ManagerHome() {
  let counts: Record<string, number> = {};
  let dbError = false;
  try {
    counts = await sectionCounts();
  } catch {
    dbError = true;
  }

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div>
      <header className="mb-8">
        <h1 className="heading text-3xl">Welcome back 👋</h1>
        <p className="mt-2 text-ink/60">
          Manage everything on your website from here. Changes go live within a moment of saving.
        </p>
      </header>

      {dbError ? (
        <DbSetupNotice />
      ) : (
        <>
          {total === 0 && (
            <div className="mb-8 rounded-4xl bg-white p-6 shadow-card ring-1 ring-ink/5 sm:p-8">
              <h2 className="heading text-lg">Get started</h2>
              <p className="mt-2 text-sm text-ink/60">
                Your database is connected but empty. Load your current website content as a
                starting point — then edit anything you like.
              </p>
              <div className="mt-5">
                <SeedButton />
              </div>
            </div>
          )}

          {SECTION_GROUPS.map((group) => (
            <section key={group} className="mb-8">
              <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-ink/40">{group}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {SECTIONS.filter((s) => s.group === group).map((s) => (
                  <Link
                    key={s.slug}
                    href={`/manager/${s.slug}`}
                    className="group flex items-start gap-4 rounded-3xl bg-white p-5 shadow-card ring-1 ring-ink/5 transition hover:-translate-y-0.5 hover:shadow-soft"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cream text-2xl">
                      {s.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="font-display font-bold text-ink">{s.label}</p>
                      <p className="mt-0.5 line-clamp-2 text-xs text-ink/55">{s.description}</p>
                      <p className="mt-2 text-xs font-semibold text-orange">
                        {s.kind === "singleton"
                          ? counts[s.slug]
                            ? "Configured"
                            : "Using defaults"
                          : `${counts[s.slug] || 0} item${(counts[s.slug] || 0) === 1 ? "" : "s"}`}
                        <span className="text-ink/30"> · Edit →</span>
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}

          {total > 0 && (
            <div className="mt-4 rounded-3xl bg-white/60 p-5 ring-1 ring-ink/5">
              <p className="text-sm text-ink/60">
                Need to top up sections that are still empty with default content?
              </p>
              <div className="mt-3">
                <SeedButton subtle />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function DbSetupNotice() {
  return (
    <div className="rounded-4xl bg-white p-6 shadow-card ring-1 ring-rose/20 sm:p-8">
      <h2 className="heading text-lg text-rose">Database not connected</h2>
      <p className="mt-2 text-sm text-ink/65">
        The dashboard works, but it can&apos;t reach MongoDB yet. Add these environment
        variables (locally in <code className="rounded bg-cream px-1">.env.local</code> and in
        Vercel → Settings → Environment Variables), then redeploy:
      </p>
      <pre className="mt-4 overflow-x-auto rounded-2xl bg-ink p-4 text-xs leading-relaxed text-white">
        {`MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net
MONGODB_DB=mkp
ADMIN_EMAIL=you@arkkidoid.in
ADMIN_PASSWORD=your-strong-password
AUTH_SECRET=a-long-random-string`}
      </pre>
      <p className="mt-4 text-xs text-ink/45">
        Until then, the public website keeps showing its current built-in content.
      </p>
    </div>
  );
}
