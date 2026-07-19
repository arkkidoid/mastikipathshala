import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getSection } from "@/lib/cms/registry";
import { listEntries, createEntry, upsertSingleton } from "@/lib/cms/store";
import { CMS_TAG } from "@/lib/cms/content";

export const runtime = "nodejs";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  const { section: slug } = await params;
  const section = getSection(slug);
  if (!section) return NextResponse.json({ ok: false, error: "Unknown section" }, { status: 404 });
  try {
    const items = await listEntries(slug);
    return NextResponse.json({ ok: true, items });
  } catch (e) {
    return dbError(e);
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  const { section: slug } = await params;
  const section = getSection(slug);
  if (!section) return NextResponse.json({ ok: false, error: "Unknown section" }, { status: 404 });

  const body = await req.json().catch(() => ({}));
  const missing = section.fields
    .filter((f) => f.required && !String(body?.[f.name] ?? "").trim())
    .map((f) => f.label);
  if (missing.length) {
    return NextResponse.json(
      { ok: false, error: `Please fill in: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  try {
    const item =
      section.kind === "singleton"
        ? await upsertSingleton(section, body)
        : await createEntry(section, body);
    revalidateTag(CMS_TAG);
    return NextResponse.json({ ok: true, item });
  } catch (e) {
    return dbError(e);
  }
}

function dbError(e: unknown) {
  console.error("[manager api]", e);
  return NextResponse.json(
    { ok: false, error: "Database error. Is MONGODB_URI configured?" },
    { status: 500 }
  );
}
