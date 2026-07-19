import Link from "next/link";
import { notFound } from "next/navigation";
import { getSection } from "@/lib/cms/registry";
import { listEntries, getSingleton } from "@/lib/cms/store";
import { EntryForm } from "@/components/manager/EntryForm";
import { Breadcrumb, DbNotice } from "@/components/manager/Chrome";

export const dynamic = "force-dynamic";

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section: slug } = await params;
  const section = getSection(slug);
  if (!section) notFound();

  const meta = {
    slug: section.slug,
    kind: section.kind,
    label: section.label,
    singular: section.singular,
    fields: section.fields,
  };

  /* ---- Singleton: edit the single record directly ---- */
  if (section.kind === "singleton") {
    let initial: Record<string, unknown>;
    let dbError = false;
    try {
      const existing = await getSingleton(section);
      initial = existing ? existing.data : (section.defaults as Record<string, unknown>);
    } catch {
      dbError = true;
      initial = section.defaults as Record<string, unknown>;
    }
    return (
      <div>
        <Breadcrumb label={section.label} />
        <h1 className="heading mt-2 text-3xl">{section.label}</h1>
        <p className="mt-2 text-ink/60">{section.description}</p>
        {dbError && <DbNotice className="mt-6" />}
        <div className="mt-6">
          <EntryForm meta={meta} initial={initial} />
        </div>
      </div>
    );
  }

  /* ---- Collection: list of items ---- */
  let items: { id: string; data: Record<string, unknown>; published: boolean }[] = [];
  let dbError = false;
  try {
    items = await listEntries(slug);
  } catch {
    dbError = true;
  }

  return (
    <div>
      <Breadcrumb label={section.label} />
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="heading text-3xl">{section.label}</h1>
          <p className="mt-2 text-ink/60">{section.description}</p>
        </div>
        <Link href={`/manager/${slug}/new`} className="btn-primary">
          + Add {section.singular.toLowerCase()}
        </Link>
      </div>

      {dbError ? (
        <DbNotice className="mt-6" />
      ) : items.length === 0 ? (
        <div className="mt-6 rounded-4xl bg-white p-8 text-center shadow-card ring-1 ring-ink/5">
          <p className="text-ink/60">No items yet.</p>
          <Link href={`/manager/${slug}/new`} className="btn-ghost mt-4 inline-flex">
            Add the first one
          </Link>
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {items.map((item, i) => (
            <li key={item.id}>
              <Link
                href={`/manager/${slug}/${item.id}`}
                className="flex items-center gap-4 rounded-3xl bg-white p-4 shadow-card ring-1 ring-ink/5 transition hover:-translate-y-0.5 hover:shadow-soft"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cream text-sm font-bold text-ink/50">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-ink">
                    {String(item.data[section.titleField] || "(untitled)")}
                  </p>
                </div>
                {!item.published && (
                  <span className="rounded-full bg-ink/5 px-2.5 py-1 text-[11px] font-bold text-ink/50">
                    Hidden
                  </span>
                )}
                <span className="text-ink/30">Edit →</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
