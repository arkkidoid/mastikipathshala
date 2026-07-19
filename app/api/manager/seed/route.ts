import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { seedDefaults } from "@/lib/cms/store";
import { CMS_TAG } from "@/lib/cms/content";

export const runtime = "nodejs";

export async function POST() {
  try {
    const result = await seedDefaults();
    revalidateTag(CMS_TAG);
    return NextResponse.json({ ok: true, ...result });
  } catch (e) {
    console.error("[manager seed]", e);
    return NextResponse.json(
      { ok: false, error: "Database error. Is MONGODB_URI configured?" },
      { status: 500 }
    );
  }
}
