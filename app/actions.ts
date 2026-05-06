"use server";

import { site } from "@/lib/site";

export type QuoteState =
  | { ok: false; errors: Record<string, string>; values?: Record<string, string> }
  | { ok: true; message: string };

const required = (v: FormDataEntryValue | null) =>
  typeof v === "string" && v.trim().length > 0;

const isEmail = (v: FormDataEntryValue | null) =>
  typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export async function submitQuote(
  _prev: QuoteState | undefined,
  formData: FormData
): Promise<QuoteState> {
  const name = (formData.get("name") || "").toString().trim();
  const email = (formData.get("email") || "").toString().trim();
  const phone = (formData.get("phone") || "").toString().trim();
  const address = (formData.get("address") || "").toString().trim();
  const projectType = (formData.get("projectType") || "").toString().trim();
  const sqft = (formData.get("sqft") || "").toString().trim();
  const timeline = (formData.get("timeline") || "").toString().trim();
  const message = (formData.get("message") || "").toString().trim();

  // Honeypot — should be empty
  const honeypot = (formData.get("company") || "").toString().trim();
  if (honeypot) {
    return { ok: true, message: "Thanks — we'll be in touch soon." };
  }

  const errors: Record<string, string> = {};
  if (!required(name)) errors.name = "Please tell us your name.";
  if (!isEmail(email)) errors.email = "We need a valid email to reply.";
  if (!required(phone)) errors.phone = "Best phone number to reach you?";

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      errors,
      values: { name, email, phone, address, projectType, sqft, timeline, message },
    };
  }

  // Forwarding hook — wire to Resend / SendGrid / a webhook later.
  // For now: log on the server and return success.
  // eslint-disable-next-line no-console
  console.log("[quote-request]", {
    receivedAt: new Date().toISOString(),
    name,
    email,
    phone,
    address,
    projectType,
    sqft,
    timeline,
    message,
    sentTo: site.email,
  });

  return {
    ok: true,
    message:
      "Thanks — we got it. Chris will reach out within one business day to set up a free in-home estimate.",
  };
}
