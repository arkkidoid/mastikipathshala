import { notFound } from "next/navigation";
import { getSection } from "@/lib/cms/registry";
import { EntryForm } from "@/components/manager/EntryForm";
import { Breadcrumb } from "@/components/manager/Chrome";

export const dynamic = "force-dynamic";

export default async function NewEntryPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section: slug } = await params;
  const section = getSection(slug);
  if (!section || section.kind !== "collection") notFound();

  const meta = {
    slug: section.slug,
    kind: section.kind,
    label: section.label,
    singular: section.singular,
    fields: section.fields,
  };
  const initial: Record<string, unknown> = {};
  for (const f of section.fields) initial[f.name] = f.type === "boolean" ? false : "";

  return (
    <div>
      <Breadcrumb label={section.label} item={`New ${section.singular.toLowerCase()}`} />
      <h1 className="heading mt-2 text-3xl">Add {section.singular.toLowerCase()}</h1>
      <div className="mt-6">
        <EntryForm meta={meta} initial={initial} />
      </div>
    </div>
  );
}
