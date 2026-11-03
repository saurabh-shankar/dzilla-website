import { NextResponse } from "next/server";
import { site } from "@/content/site";
import { enquiryBody, enquirySubject, validateEnquiry } from "@/lib/contact";

/**
 * Contact form delivery. Sends via Resend when RESEND_API_KEY and
 * CONTACT_FROM_EMAIL are configured; otherwise answers 501 and the form
 * falls back to composing the email in the visitor's mail app.
 */
export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 501 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Honeypot — real visitors never fill this hidden field.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const { data, errors } = validateEnquiry(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, error: "invalid", fields: errors }, { status: 422 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [process.env.CONTACT_TO_EMAIL || site.contact.email],
      reply_to: data.email,
      subject: enquirySubject(data),
      text: enquiryBody(data),
    }),
  });

  if (!res.ok) {
    console.error("Contact form: Resend responded", res.status, await res.text().catch(() => ""));
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
