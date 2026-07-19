import { unstable_cache } from "next/cache";
import { hasDb } from "@/lib/db";
import { SECTIONS, type Section } from "./registry";

export const CMS_TAG = "cms";

export type ContentMap = Record<string, any>;

function defaultsFor(section: Section) {
  return Array.isArray(section.defaults)
    ? section.defaults.map((d) => ({ id: `default-${section.slug}`, ...d }))
    : { ...section.defaults };
}

/**
 * Raw load: pull every published entry from Mongo, grouped by section, merged
 * over the code defaults. Any failure (no DB configured, connection error,
 * empty section) falls back to defaults so the public site never breaks.
 */
async function rawLoad(): Promise<ContentMap> {
  const map: ContentMap = {};

  if (!hasDb()) {
    for (const s of SECTIONS) map[s.slug] = defaultsFor(s);
    return map;
  }

  try {
    // imported lazily so the public bundle / build without env never eagerly connects
    const { listEntries } = await import("./store");
    for (const s of SECTIONS) {
      try {
        const entries = (await listEntries(s.slug)).filter((e) => e.published);
        if (s.kind === "singleton") {
          map[s.slug] = entries.length
            ? { id: entries[0].id, ...entries[0].data }
            : defaultsFor(s);
        } else {
          map[s.slug] = entries.length
            ? entries.map((e) => ({ id: e.id, ...e.data }))
            : defaultsFor(s);
        }
      } catch {
        map[s.slug] = defaultsFor(s);
      }
    }
  } catch {
    for (const s of SECTIONS) map[s.slug] = defaultsFor(s);
  }

  return map;
}

/**
 * Cached, tag-revalidated content for the public site.
 * Call revalidateTag(CMS_TAG) after any dashboard mutation to refresh instantly.
 */
export const getSiteContent = unstable_cache(rawLoad, ["site-content"], {
  tags: [CMS_TAG],
  revalidate: 300,
});
