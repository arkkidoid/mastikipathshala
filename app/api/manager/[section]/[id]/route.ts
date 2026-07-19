import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getSection } from "@/lib/cms/registry";
import { updateEntry, deleteEntry } from "@/lib/cms/store";
import { CMS_TAG } from "@/lib/cms/content";

export const runtime = "nodejs";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ section: string; id: string }> }
) {
  const { section: slug, id } = await params;
  const section = getSection(slug);
  if (!section) return NextResponse.json({ ok: false, error: "Unknown section" }, { status: 404 });

  const body = await req.json().catch(() => ({}));
  const data = body?.data ?? body;
  const published = typeof body?.published === "boolean" ? body.published : undefined;

  const missing = section.fields
    .filter((f) => f.required && !String(data?.[f.name] ?? "").trim())
    .map((f) => f.label);
  if (missing.length) {
    return NextResponse.json(
      { ok: false, error: `Please fill in: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  try {
    const ok = await updateEntry(id, section, data, published);
    if (!ok) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    revalidateTag(CMS_TAG);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[manager api]", e);
    return NextResponse.json({ ok: false, error: "Database error." }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ section: string; id: string }> }
) {
  const { id } = await params;
  try {
    const ok = await deleteEntry(id);
    if (!ok) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    revalidateTag(CMS_TAG);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[manager api]", e);
    return NextResponse.json({ ok: false, error: "Database error." }, { status: 500 });
  }
}
