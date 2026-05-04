import { NextResponse } from "next/server"
import { z } from "zod"
import { escapeHtmlForEmail, hasResendConfig, sendInboxEmail } from "@/lib/resend"

const valuationSubmissionSchema = z.object({
  postcode: z.string().min(3),
  doorNumber: z.string().min(1),
  fullAddress: z.string().min(12),
  propertyType: z.string().min(1),
  bedrooms: z.string().min(1),
  condition: z.string().min(1),
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  consent: z.literal(true),
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
    const data = valuationSubmissionSchema.parse(rawData)

    const subject = `New valuation enquiry — ${data.postcode}`

    const text = [
      "New valuation enquiry received.",
      "",
      `Name: ${data.fullName}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Postcode: ${data.postcode}`,
      `Address: ${data.fullAddress}`,
      `Door number/building: ${data.doorNumber}`,
      `Property type: ${data.propertyType}`,
      `Bedrooms: ${data.bedrooms}`,
      `Condition: ${data.condition}`,
      `Consent: Yes`,
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
        <h1 style="margin:10px 0 0;font-size:22px;font-weight:700;color:#0f172a;line-height:1.25;">New valuation enquiry</h1>
        <p style="margin:12px 0 0;font-size:14px;color:#64748b;line-height:1.55;">Someone submitted the valuation form on your website. Reply to this email to respond directly.</p>
      </td></tr>
      <tr><td style="padding:8px 28px 28px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background-color:#f8fafc;border-radius:10px;border:1px solid #e2e8f0;">
          ${row("Name", h(data.fullName))}
          ${row("Email", `<a href="mailto:${encodeURIComponent(data.email)}" style="color:#c2410c;font-weight:600;text-decoration:none;">${h(data.email)}</a>`)}
          ${row("Phone", `<a href="tel:${encodeURIComponent(data.phone.replace(/\s+/g, ""))}" style="color:#0f172a;text-decoration:none;">${h(data.phone)}</a>`)}
          ${row("Postcode", `<span style="display:inline-block;background-color:#fff7ed;color:#9a3412;font-weight:600;font-size:13px;padding:4px 10px;border-radius:6px;border:1px solid #fed7aa;">${h(data.postcode)}</span>`)}
          ${row("Address", h(data.fullAddress))}
          ${row("Door / building", h(data.doorNumber))}
          ${row("Property type", h(data.propertyType))}
          ${row("Bedrooms", h(data.bedrooms))}
          ${row("Condition", h(data.condition))}
          ${row("Marketing consent", `<span style="color:#15803d;font-weight:600;">✓ Confirmed</span>`, true)}
        </table>
      </td></tr>
      <tr><td style="padding:0 28px 24px;font-size:12px;color:#94a3b8;line-height:1.5;border-top:1px solid #f1f5f9;">
        <p style="margin:16px 0 0;">This message was generated automatically from your website contact flow.</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`

    const result = await sendInboxEmail({
      subject,
      replyTo: data.email,
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
      return NextResponse.json({ error: "Invalid form submission." }, { status: 400 })
    }

    return NextResponse.json({ error: "Unable to send submission email." }, { status: 500 })
  }
}
