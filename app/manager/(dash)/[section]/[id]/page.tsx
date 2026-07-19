import { notFound } from "next/navigation";
import { getSection } from "@/lib/cms/registry";
import { getEntry } from "@/lib/cms/store";
import { EntryForm } from "@/components/manager/EntryForm";
import { Breadcrumb, DbNotice } from "@/components/manager/Chrome";

export const dynamic = "force-dynamic";

export default async function EditEntryPage({
  params,
}: {
  params: Promise<{ section: string; id: string }>;
}) {
  const { section: slug, id } = await params;
  const section = getSection(slug);
  if (!section || section.kind !== "collection") notFound();

  const meta = {
    slug: section.slug,
    kind: section.kind,
    label: section.label,
    singular: section.singular,
    fields: section.fields,
  };

  let entry: Awaited<ReturnType<typeof getEntry>> = null;
  let dbError = false;
  try {
    entry = await getEntry(id);
  } catch {
    dbError = true;
  }

  if (dbError) {
    return (
      <div>
        <Breadcrumb label={section.label} item="Edit" />
        <DbNotice className="mt-6" />
      </div>
    );
  }
  if (!entry) notFound();

  const title = String(entry.data[section.titleField] || section.singular);

  return (
    <div>
      <Breadcrumb label={section.label} item={title} />
      <h1 className="heading mt-2 text-3xl">Edit {section.singular.toLowerCase()}</h1>
      <div className="mt-6">
        <EntryForm meta={meta} initial={entry.data} id={entry.id} published={entry.published} />
      </div>
    </div>
  );
}
