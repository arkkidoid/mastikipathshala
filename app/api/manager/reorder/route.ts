import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getSection } from "@/lib/cms/registry";
import { reorderEntries } from "@/lib/cms/store";
import { CMS_TAG } from "@/lib/cms/content";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const section = typeof body?.section === "string" ? body.section : "";
  const ids = Array.isArray(body?.ids) ? body.ids.map(String) : [];
  if (!getSection(section) || !ids.length) {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }
  try {
    await reorderEntries(section, ids);
    revalidateTag(CMS_TAG);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[manager reorder]", e);
    return NextResponse.json({ ok: false, error: "Database error." }, { status: 500 });
  }
}
