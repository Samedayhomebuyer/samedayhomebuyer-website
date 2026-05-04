import { NextResponse } from "next/server"
import { z } from "zod"
import { escapeHtmlForEmail, hasResendConfig, sendInboxEmail } from "@/lib/resend"

const referralSubmissionSchema = z.object({
  yourName: z.string().min(2),
  yourPhone: z.string().min(10),
  yourEmail: z.string().email(),
  propertyDetails: z.string().min(10),
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

    const html = `<!DOCTYPE html>
<html>
<body style="font-family: system-ui, sans-serif; line-height: 1.5; color: #111;">
<h1 style="font-size: 1.25rem;">New property referral</h1>
<table style="border-collapse: collapse; max-width: 36rem;">
  <tr><td style="padding: 0.25rem 1rem 0.25rem 0; vertical-align: top; font-weight: 600;">Referrer</td><td style="padding: 0.25rem 0;">${h(data.yourName)}</td></tr>
  <tr><td style="padding: 0.25rem 1rem 0.25rem 0; vertical-align: top; font-weight: 600;">Email</td><td style="padding: 0.25rem 0;"><a href="mailto:${encodeURIComponent(data.yourEmail)}">${h(data.yourEmail)}</a></td></tr>
  <tr><td style="padding: 0.25rem 1rem 0.25rem 0; vertical-align: top; font-weight: 600;">Phone</td><td style="padding: 0.25rem 0;">${h(data.yourPhone)}</td></tr>
</table>
<h2 style="font-size: 1rem; margin-top: 1.5rem;">Property details</h2>
<div style="white-space: pre-wrap; border: 1px solid #e5e5e5; border-radius: 6px; padding: 1rem; background: #fafafa;">${h(data.propertyDetails)}</div>
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
      return NextResponse.json({ error: "Unable to send submission email." }, { status })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid form submission." }, { status: 400 })
    }

    return NextResponse.json({ error: "Unable to send submission email." }, { status: 500 })
  }
}
