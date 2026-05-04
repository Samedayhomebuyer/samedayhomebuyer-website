import { Resend } from "resend"

const resendApiKey = process.env.RESEND_API_KEY

export const hasResendConfig = Boolean(resendApiKey)

export const resend = resendApiKey ? new Resend(resendApiKey) : null

/** Verified sender in Resend (must match a domain you have verified). */
export const resendFromEmail =
  process.env.RESEND_FROM_EMAIL ?? "Same Day Home Buyer <onboarding@resend.dev>"

/** Where lead emails are delivered. */
export const leadInboxEmail = process.env.LEAD_INBOX_EMAIL ?? "info@samedayhomebuyer.co.uk"

export function escapeHtmlForEmail(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export type SendInboxEmailParams = {
  subject: string
  replyTo: string
  text: string
  html: string
}

/** Sends one notification to the lead inbox. Call only from server code. */
export async function sendInboxEmail(
  params: SendInboxEmailParams,
): Promise<{ ok: true } | { ok: false; error: "not_configured" | "send_failed" }> {
  if (!resend) {
    return { ok: false, error: "not_configured" }
  }

  const { error } = await resend.emails.send({
    from: resendFromEmail,
    to: [leadInboxEmail],
    replyTo: params.replyTo,
    subject: params.subject,
    text: params.text,
    html: params.html,
  })

  if (error) {
    console.error("Resend send failed:", error)
    return { ok: false, error: "send_failed" }
  }

  return { ok: true }
}
