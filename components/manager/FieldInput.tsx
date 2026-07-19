"use client";

import type { Field } from "@/lib/cms/registry";

export function FieldInput({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const base =
    "w-full rounded-2xl border border-ink/10 bg-cream px-4 py-2.5 text-sm text-ink transition focus:border-orange focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange/10";

  const label = (
    <span className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-ink/70">
      {field.label}
      {field.required && <span className="text-rose">*</span>}
    </span>
  );

  if (field.type === "boolean") {
    const on = value === true || value === "true";
    return (
      <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-ink/10 bg-cream px-4 py-3">
        <span className="text-sm font-semibold text-ink/70">{field.label}</span>
        <button
          type="button"
          role="switch"
          aria-checked={on}
          onClick={() => onChange(!on)}
          className={`relative h-6 w-11 rounded-full transition-colors ${on ? "bg-mint" : "bg-ink/15"}`}
        >
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? "left-[22px]" : "left-0.5"}`} />
        </button>
      </label>
    );
  }

  return (
    <label className="block">
      {label}
      {field.type === "textarea" ? (
        <textarea
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          placeholder={field.placeholder}
          className={`${base} resize-y`}
        />
      ) : field.type === "select" ? (
        <select value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} className={base}>
          <option value="">— select —</option>
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : field.type === "number" ? (
        <input
          type="number"
          value={value === undefined || value === null ? "" : Number(value)}
          onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
          placeholder={field.placeholder}
          className={base}
        />
      ) : (
        <input
          type={field.type === "url" || field.type === "image" ? "url" : "text"}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={base}
        />
      )}

      {field.type === "image" && String(value ?? "").trim() && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={String(value)} alt="" className="mt-2 h-20 w-20 rounded-xl object-cover ring-1 ring-ink/10" />
      )}
      {field.help && <span className="mt-1 block text-xs text-ink/45">{field.help}</span>}
    </label>
  );
}
