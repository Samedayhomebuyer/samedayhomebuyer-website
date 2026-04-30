import { NextResponse, type NextRequest } from "next/server"

import type {
  PostcodeLookupLocation,
  PostcodeLookupSuccessBody,
} from "@/lib/postcode-address"

function validateUkPostcodeNoSpaces(clean: string): boolean {
  return /^[A-Z]{1,2}\d[A-Z\d]?\d[A-Z]{2}$/i.test(clean)
}

function mapPostcodesIoLocation(result: Record<string, unknown>): PostcodeLookupLocation {
  const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : null)

  return {
    adminDistrict: str(result.admin_district),
    region: str(result.region),
    country: str(result.country),
    parliamentaryConstituency: str(result.parliamentary_constituency),
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const postcode = body?.postcode

    if (!postcode || typeof postcode !== "string") {
      return NextResponse.json(
        { success: false, error: "Valid postcode is required" },
        { status: 400 },
      )
    }

    const cleanPostcode = postcode.replace(/\s/g, "").toUpperCase()

    if (!validateUkPostcodeNoSpaces(cleanPostcode)) {
      return NextResponse.json(
        { success: false, error: "Invalid UK postcode format" },
        { status: 400 },
      )
    }

    const spaced = `${cleanPostcode.slice(0, -3)} ${cleanPostcode.slice(-3)}`
    const apiUrl = `https://api.postcodes.io/postcodes/${encodeURIComponent(spaced)}`

    const response = await fetch(apiUrl, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    })

    const payload = (await response.json()) as {
      status?: number
      error?: string
      result?: Record<string, unknown>
    }

    if (response.status === 404 || payload.status === 404) {
      return NextResponse.json(
        { success: false, error: "No match found for this postcode" },
        { status: 404 },
      )
    }

    if (!response.ok || payload.status !== 200 || !payload.result) {
      console.error("Postcodes.io error:", response.status, payload.error)
      return NextResponse.json(
        { success: false, error: "Postcode lookup service temporarily unavailable" },
        { status: 502 },
      )
    }

    const formatted =
      typeof payload.result.postcode === "string"
        ? payload.result.postcode.toUpperCase()
        : spaced.toUpperCase()

    const bodyOut: PostcodeLookupSuccessBody = {
      success: true,
      postcode: formatted,
      location: mapPostcodesIoLocation(payload.result),
    }

    return NextResponse.json(bodyOut)
  } catch (error) {
    console.error("Postcode lookup error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error during postcode lookup",
        details:
          process.env.NODE_ENV === "development" && error instanceof Error
            ? error.message
            : undefined,
      },
      { status: 500 },
    )
  }
}
