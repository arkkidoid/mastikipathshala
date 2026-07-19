import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";
import { SECTIONS } from "@/lib/cms/registry";
import { Sidebar, type NavItem } from "@/components/manager/Sidebar";

export const metadata: Metadata = {
  title: "Content Manager · Masti Ki Paathshaala",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = await cookies();
  const session = await verifySession(store.get(SESSION_COOKIE)?.value);
  if (!session) redirect("/manager/login");

  const items: NavItem[] = SECTIONS.map((s) => ({
    slug: s.slug,
    label: s.label,
    icon: s.icon,
    group: s.group,
  }));

  return (
    <div className="flex min-h-screen bg-cream text-ink">
      <Sidebar items={items} email={session.sub} />
      <main className="min-w-0 flex-1">
        <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8">{children}</div>
      </main>
    </div>
  );
}
