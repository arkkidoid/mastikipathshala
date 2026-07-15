import nodemailer from "nodemailer";

/**
 * SMTP config comes from env. Only SMTP_PASS is strictly required —
 * the rest default to the Hostinger mailbox for this site.
 */
const SMTP_HOST = process.env.SMTP_HOST || "smtp.hostinger.com";
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_USER = process.env.SMTP_USER || "hello@mastikipaathshaala.org";
const SMTP_PASS = process.env.SMTP_PASS;
const MAIL_TO = process.env.MAIL_TO || SMTP_USER;
const MAIL_FROM_NAME = "Masti Ki Paathshaala Website";

export type Submission = {
  type: "trial" | "enquiry";
  name: string;
  phone: string;
  email?: string;
  age?: string;
  program: string;
  message?: string;
};

let cached: nodemailer.Transporter | null = null;

export function getTransporter() {
  if (!SMTP_PASS) {
    throw new Error("SMTP_PASS is not set");
  }
  if (!cached) {
    cached = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465, // SSL on 465, STARTTLS otherwise
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
  }
  return cached;
}

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value?: string) {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #eee;color:#6b7c88;font-size:13px;width:150px;vertical-align:top;">${esc(
        label
      )}</td>
      <td style="padding:10px 0;border-bottom:1px solid #eee;color:#12354a;font-size:14px;font-weight:600;">${esc(
        value
      )}</td>
    </tr>`;
}

export function buildEmail(s: Submission) {
  const isTrial = s.type === "trial";
  const heading = isTrial ? "New Free Trial Booking" : "New Admission Enquiry";
  const accent = isTrial ? "#FF7A3D" : "#42B6E8";
  const when = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const subject = `${heading} — ${s.name} (${s.program})`;

  const html = `<!doctype html>
<html><body style="margin:0;background:#FFF9F2;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:24px;">
    <div style="background:${accent};border-radius:20px 20px 0 0;padding:24px;">
      <p style="margin:0;color:rgba(255,255,255,.85);font-size:12px;letter-spacing:.08em;text-transform:uppercase;font-weight:700;">
        Masti Ki Paathshaala
      </p>
      <h1 style="margin:6px 0 0;color:#fff;font-size:22px;">${heading}</h1>
    </div>
    <div style="background:#fff;border-radius:0 0 20px 20px;padding:24px;">
      <table style="width:100%;border-collapse:collapse;">
        ${row("Name", s.name)}
        ${row("Phone", s.phone)}
        ${row("Email", s.email)}
        ${row("Child's age", s.age)}
        ${row("Program", s.program)}
        ${row("Message", s.message)}
        ${row("Received", when)}
      </table>

      <div style="margin-top:20px;">
        <a href="https://wa.me/${s.phone.replace(/\D/g, "").replace(/^0+/, "")}"
           style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;padding:11px 18px;border-radius:999px;font-size:13px;font-weight:700;">
          WhatsApp ${esc(s.name)}
        </a>
        <a href="tel:${esc(s.phone)}"
           style="display:inline-block;background:#12354a;color:#fff;text-decoration:none;padding:11px 18px;border-radius:999px;font-size:13px;font-weight:700;margin-left:6px;">
          Call
        </a>
      </div>

      <p style="margin:20px 0 0;color:#8a97a1;font-size:12px;line-height:1.5;">
        Sent automatically from the mastikipaathshaala.org website.
        ${s.email ? "Reply to this email to respond directly." : ""}
      </p>
    </div>
  </div>
</body></html>`;

  const text = [
    heading,
    "",
    `Name: ${s.name}`,
    `Phone: ${s.phone}`,
    s.email ? `Email: ${s.email}` : "",
    s.age ? `Child's age: ${s.age}` : "",
    `Program: ${s.program}`,
    s.message ? `Message: ${s.message}` : "",
    `Received: ${when}`,
  ]
    .filter(Boolean)
    .join("\n");

  return { subject, html, text };
}

export async function sendSubmission(s: Submission) {
  const { subject, html, text } = buildEmail(s);
  const transporter = getTransporter();

  await transporter.sendMail({
    // From must be our own mailbox — sending "from" the visitor fails SPF/DMARC.
    from: `"${MAIL_FROM_NAME}" <${SMTP_USER}>`,
    to: MAIL_TO,
    replyTo: s.email ? `"${s.name}" <${s.email}>` : undefined,
    subject,
    text,
    html,
  });
}
