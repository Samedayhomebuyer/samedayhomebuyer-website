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

    const html = `<!DOCTYPE html>
<html>
<body style="font-family: system-ui, sans-serif; line-height: 1.5; color: #111;">
<h1 style="font-size: 1.25rem;">New valuation enquiry</h1>
<table style="border-collapse: collapse; max-width: 36rem;">
  <tr><td style="padding: 0.25rem 1rem 0.25rem 0; vertical-align: top; font-weight: 600;">Name</td><td style="padding: 0.25rem 0;">${h(data.fullName)}</td></tr>
  <tr><td style="padding: 0.25rem 1rem 0.25rem 0; vertical-align: top; font-weight: 600;">Email</td><td style="padding: 0.25rem 0;"><a href="mailto:${encodeURIComponent(data.email)}">${h(data.email)}</a></td></tr>
  <tr><td style="padding: 0.25rem 1rem 0.25rem 0; vertical-align: top; font-weight: 600;">Phone</td><td style="padding: 0.25rem 0;">${h(data.phone)}</td></tr>
  <tr><td style="padding: 0.25rem 1rem 0.25rem 0; vertical-align: top; font-weight: 600;">Postcode</td><td style="padding: 0.25rem 0;">${h(data.postcode)}</td></tr>
  <tr><td style="padding: 0.25rem 1rem 0.25rem 0; vertical-align: top; font-weight: 600;">Address</td><td style="padding: 0.25rem 0;">${h(data.fullAddress)}</td></tr>
  <tr><td style="padding: 0.25rem 1rem 0.25rem 0; vertical-align: top; font-weight: 600;">Door / building</td><td style="padding: 0.25rem 0;">${h(data.doorNumber)}</td></tr>
  <tr><td style="padding: 0.25rem 1rem 0.25rem 0; vertical-align: top; font-weight: 600;">Property type</td><td style="padding: 0.25rem 0;">${h(data.propertyType)}</td></tr>
  <tr><td style="padding: 0.25rem 1rem 0.25rem 0; vertical-align: top; font-weight: 600;">Bedrooms</td><td style="padding: 0.25rem 0;">${h(data.bedrooms)}</td></tr>
  <tr><td style="padding: 0.25rem 1rem 0.25rem 0; vertical-align: top; font-weight: 600;">Condition</td><td style="padding: 0.25rem 0;">${h(data.condition)}</td></tr>
  <tr><td style="padding: 0.25rem 1rem 0.25rem 0; vertical-align: top; font-weight: 600;">Consent</td><td style="padding: 0.25rem 0;">Yes</td></tr>
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
