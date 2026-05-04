import { NextResponse } from "next/server"
import { z } from "zod"
import { escapeHtmlForEmail, hasResendConfig, sendInboxEmail } from "@/lib/resend"

const referralSubmissionSchema = z.object({
  yourName: z.string().trim().min(2, "Please enter your name."),
  yourPhone: z
    .string()
    .trim()
    .min(10, "Please enter a valid phone number (at least 10 digits)."),
  yourEmail: z.string().trim().email("Please enter a valid email address."),
  propertyDetails: z
    .string()
    .trim()
    .min(10, "Please describe the property with at least 10 characters."),
})

export async function POST(request: Request) {
  if (!hasResendConfig) {
    return NextResponse.json(
      { error: "Email provider is not configured on this environment." },
      { status: 500 },
    )
  }

  try {
    const rawData = await request.json()
    const data = referralSubmissionSchema.parse(rawData)

    const subject = `New property referral — ${data.yourName}`

    const text = [
      "New referral submission received.",
      "",
      `Referrer name: ${data.yourName}`,
      `Referrer email: ${data.yourEmail}`,
      `Referrer phone: ${data.yourPhone}`,
      "",
      "Property details:",
      data.propertyDetails,
    ].join("\n")

    const h = (s: string) => escapeHtmlForEmail(s)
    const row = (label: string, value: string, last = false) => {
      const b = last ? "none" : "1px solid #e2e8f0"
      return `<tr>
  <td style="padding:14px 16px 14px 20px;border-bottom:${b};font-size:13px;font-weight:600;color:#475569;width:38%;vertical-align:top;">${label}</td>
  <td style="padding:14px 20px 14px 0;border-bottom:${b};font-size:14px;color:#0f172a;line-height:1.5;vertical-align:top;">${value}</td>
</tr>`
    }

    const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f1f5f9;padding:28px 16px;">
  <tr><td align="center">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background-color:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
      <tr><td style="height:4px;background-color:#ea580c;line-height:4px;font-size:0;">&nbsp;</td></tr>
      <tr><td style="padding:28px 28px 8px;">
        <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#64748b;">Same Day Home Buyer</p>
        <h1 style="margin:10px 0 0;font-size:22px;font-weight:700;color:#0f172a;line-height:1.25;">New property referral</h1>
        <p style="margin:12px 0 0;font-size:14px;color:#64748b;line-height:1.55;">A referrer shared property details via your website. Reply to reach them directly.</p>
      </td></tr>
      <tr><td style="padding:8px 28px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background-color:#f8fafc;border-radius:10px;border:1px solid #e2e8f0;">
          ${row("Referrer", h(data.yourName))}
          ${row("Email", `<a href="mailto:${encodeURIComponent(data.yourEmail)}" style="color:#c2410c;font-weight:600;text-decoration:none;">${h(data.yourEmail)}</a>`)}
          ${row("Phone", `<a href="tel:${encodeURIComponent(data.yourPhone.replace(/\s+/g, ""))}" style="color:#0f172a;text-decoration:none;">${h(data.yourPhone)}</a>`, true)}
        </table>
      </td></tr>
      <tr><td style="padding:0 28px 28px;">
        <p style="margin:0 0 10px;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#64748b;">Property details</p>
        <div style="white-space:pre-wrap;margin:0;padding:18px 20px;border:1px solid #e2e8f0;border-radius:10px;background-color:#fffbeb;color:#422006;font-size:14px;line-height:1.6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">${h(data.propertyDetails)}</div>
      </td></tr>
      <tr><td style="padding:0 28px 24px;font-size:12px;color:#94a3b8;line-height:1.5;border-top:1px solid #f1f5f9;">
        <p style="margin:16px 0 0;">This message was generated automatically from your referral form.</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`

    const result = await sendInboxEmail({
      subject,
      replyTo: data.yourEmail,
      text,
      html,
    })

    if (!result.ok) {
      const status = result.error === "not_configured" ? 500 : 502
      const body: { error: string; details?: string; code?: string } = {
        error: "Unable to send submission email.",
      }
      if (
        process.env.NODE_ENV === "development" &&
        result.error === "send_failed"
      ) {
        body.details = result.message
        body.code = result.code
      }
      return NextResponse.json(body, { status })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid form submission.",
          fieldErrors: error.flatten().fieldErrors,
        },
        { status: 400 },
      )
    }

    return NextResponse.json({ error: "Unable to send submission email." }, { status: 500 })
  }
}
