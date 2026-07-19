"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Field } from "@/lib/cms/registry";
import { FieldInput } from "./FieldInput";

export type FormMeta = {
  slug: string;
  kind: "singleton" | "collection";
  label: string;
  singular: string;
  fields: Field[];
};

export function EntryForm({
  meta,
  initial,
  id,
  published: initialPublished = true,
}: {
  meta: FormMeta;
  initial: Record<string, unknown>;
  id?: string;
  published?: boolean;
}) {
  const router = useRouter();
  const isEdit = Boolean(id) || meta.kind === "singleton";
  const [values, setValues] = useState<Record<string, unknown>>(() => {
    const v: Record<string, unknown> = {};
    for (const f of meta.fields) v[f.name] = initial[f.name] ?? (f.type === "boolean" ? false : "");
    return v;
  });
  const [published, setPublished] = useState(initialPublished);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  const backHref = `/manager/${meta.slug}`;

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      let res: Response;
      if (id) {
        res = await fetch(`/api/manager/${meta.slug}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: values, published }),
        });
      } else {
        // create (collection) OR upsert (singleton)
        res = await fetch(`/api/manager/${meta.slug}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
      }
      const data = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !data.ok) throw new Error(data.error || "Save failed.");

      setSavedAt(Date.now());
      router.refresh();
      if (meta.kind === "collection") {
        router.push(backHref);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!id) return;
    if (!confirm("Delete this item permanently?")) return;
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch(`/api/manager/${meta.slug}/${id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !data.ok) throw new Error(data.error || "Delete failed.");
      router.push(backHref);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed.");
      setDeleting(false);
    }
  }

  return (
    <form onSubmit={save} className="rounded-4xl bg-white p-6 shadow-card ring-1 ring-ink/5 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {meta.fields.map((f) => (
          <div key={f.name} className={f.half ? "sm:col-span-1" : "sm:col-span-2"}>
            <FieldInput field={f} value={values[f.name]} onChange={(v) => setValues((s) => ({ ...s, [f.name]: v }))} />
          </div>
        ))}
      </div>

      {meta.kind === "collection" && (
        <label className="mt-6 flex w-fit cursor-pointer items-center gap-3 rounded-2xl bg-cream px-4 py-3">
          <button
            type="button"
            role="switch"
            aria-checked={published}
            onClick={() => setPublished((p) => !p)}
            className={`relative h-6 w-11 rounded-full transition-colors ${published ? "bg-mint" : "bg-ink/15"}`}
          >
            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${published ? "left-[22px]" : "left-0.5"}`} />
          </button>
          <span className="text-sm font-semibold text-ink/70">
            {published ? "Published (visible on site)" : "Hidden (draft)"}
          </span>
        </label>
      )}

      {error && (
        <p role="alert" className="mt-5 rounded-2xl bg-rose-tint px-4 py-3 text-sm font-semibold text-rose">
          {error}
        </p>
      )}

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-70">
          {saving ? "Saving…" : isEdit ? "Save changes" : `Add ${meta.singular.toLowerCase()}`}
        </button>
        <Link href={backHref} className="btn-ghost">Cancel</Link>
        {savedAt && <span className="text-sm font-medium text-mint">Saved ✓</span>}
        {id && (
          <button
            type="button"
            onClick={remove}
            disabled={deleting}
            className="ml-auto rounded-full px-4 py-2 text-sm font-bold text-rose ring-1 ring-rose/20 transition hover:bg-rose hover:text-white disabled:opacity-60"
          >
            {deleting ? "Deleting…" : "Delete"}
          </button>
        )}
      </div>
    </form>
  );
}
