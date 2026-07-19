import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import { SECTIONS, getSection, coerce, type Section } from "./registry";

const COLLECTION = "entries";

export type EntryDoc = {
  _id: ObjectId;
  section: string;
  data: Record<string, unknown>;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type EntryDTO = {
  id: string;
  section: string;
  data: Record<string, unknown>;
  order: number;
  published: boolean;
};

function toDTO(doc: EntryDoc): EntryDTO {
  return {
    id: doc._id.toString(),
    section: doc.section,
    data: doc.data,
    order: doc.order,
    published: doc.published,
  };
}

async function col() {
  const db = await getDb();
  return db.collection<EntryDoc>(COLLECTION);
}

export async function listEntries(section: string): Promise<EntryDTO[]> {
  const c = await col();
  const docs = await c.find({ section }).sort({ order: 1, createdAt: 1 }).toArray();
  return docs.map(toDTO);
}

export async function getEntry(id: string): Promise<EntryDTO | null> {
  if (!ObjectId.isValid(id)) return null;
  const c = await col();
  const doc = await c.findOne({ _id: new ObjectId(id) });
  return doc ? toDTO(doc) : null;
}

export async function createEntry(
  section: Section,
  input: Record<string, unknown>,
  published = true
): Promise<EntryDTO> {
  const c = await col();
  const last = await c.find({ section: section.slug }).sort({ order: -1 }).limit(1).toArray();
  const order = last.length ? last[0].order + 1 : 0;
  const now = new Date();
  const doc = {
    section: section.slug,
    data: coerce(section, input),
    order,
    published,
    createdAt: now,
    updatedAt: now,
  };
  const res = await c.insertOne(doc as EntryDoc);
  return toDTO({ ...(doc as EntryDoc), _id: res.insertedId });
}

export async function updateEntry(
  id: string,
  section: Section,
  input: Record<string, unknown>,
  published?: boolean
): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const c = await col();
  const set: Record<string, unknown> = {
    data: coerce(section, input),
    updatedAt: new Date(),
  };
  if (typeof published === "boolean") set.published = published;
  const res = await c.updateOne({ _id: new ObjectId(id) }, { $set: set });
  return res.matchedCount > 0;
}

export async function deleteEntry(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const c = await col();
  const res = await c.deleteOne({ _id: new ObjectId(id) });
  return res.deletedCount > 0;
}

export async function reorderEntries(section: string, ids: string[]): Promise<void> {
  const c = await col();
  await Promise.all(
    ids
      .filter((id) => ObjectId.isValid(id))
      .map((id, i) =>
        c.updateOne({ _id: new ObjectId(id), section }, { $set: { order: i, updatedAt: new Date() } })
      )
  );
}

/** Singleton helpers — one entry per section. */
export async function getSingleton(section: Section): Promise<EntryDTO | null> {
  const list = await listEntries(section.slug);
  return list[0] ?? null;
}

export async function upsertSingleton(
  section: Section,
  input: Record<string, unknown>
): Promise<EntryDTO> {
  const existing = await getSingleton(section);
  if (existing) {
    await updateEntry(existing.id, section, input, true);
    return { ...existing, data: coerce(section, input) };
  }
  return createEntry(section, input, true);
}

/** How many entries exist per section — used by the dashboard overview + seed check. */
export async function sectionCounts(): Promise<Record<string, number>> {
  const c = await col();
  const rows = await c
    .aggregate<{ _id: string; n: number }>([{ $group: { _id: "$section", n: { $sum: 1 } } }])
    .toArray();
  const out: Record<string, number> = {};
  for (const r of rows) out[r._id] = r.n;
  return out;
}

/** Seed the DB from the code defaults. Only fills sections that are empty. */
export async function seedDefaults(): Promise<{ seeded: string[]; skipped: string[] }> {
  const counts = await sectionCounts();
  const seeded: string[] = [];
  const skipped: string[] = [];
  for (const section of SECTIONS) {
    if ((counts[section.slug] || 0) > 0) {
      skipped.push(section.slug);
      continue;
    }
    const items = Array.isArray(section.defaults)
      ? section.defaults
      : [section.defaults];
    for (const item of items) {
      await createEntry(section, item as Record<string, unknown>, true);
    }
    seeded.push(section.slug);
  }
  return { seeded, skipped };
}

export { getSection };
