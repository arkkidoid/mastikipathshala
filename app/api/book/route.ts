import { NextRequest, NextResponse } from "next/server";
import { sendSubmission, type Submission } from "@/lib/mail";

// nodemailer needs the Node runtime (not edge).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Best-effort in-memory rate limit. Serverless instances are per-container,
 * so this won't catch a distributed flood — it's here to stop casual spam.
 */
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) hits.clear(); // crude memory guard
  return recent.length > MAX_PER_WINDOW;
}

const str = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { ok: false, error: "Invalid request." },
        { status: 400 }
      );
    }

    // Honeypot: real users never fill this. Pretend success so bots don't retry.
    if (str(body.company, 100)) {
      return NextResponse.json({ ok: true });
    }

    const type = body.type === "enquiry" ? "enquiry" : "trial";
    const name = str(body.name, 100);
    const phone = str(body.phone, 30);
    const email = str(body.email, 150);
    const age = str(body.age, 10);
    const program = str(body.program, 100);
    const message = str(body.message, 1500);

    if (!name || !phone || !program) {
      return NextResponse.json(
        { ok: false, error: "Please fill in your name, phone and program." },
        { status: 400 }
      );
    }
    if (phone.replace(/\D/g, "").length < 7) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid phone number." },
        { status: 400 }
      );
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const submission: Submission = {
      type,
      name,
      phone,
      email: email || undefined,
      age: age || undefined,
      program,
      message: message || undefined,
    };

    await sendSubmission(submission);
    return NextResponse.json({ ok: true });
  } catch (err) {
    // Never leak SMTP details to the client.
    console.error("[/api/book] send failed:", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Sorry, we couldn't send that just now. Please call or WhatsApp us instead.",
      },
      { status: 500 }
    );
  }
}
