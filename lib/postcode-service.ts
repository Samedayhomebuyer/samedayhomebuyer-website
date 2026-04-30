import type {
  PostcodeLookupLocation,
  PostcodeLookupSuccessBody,
} from "@/lib/postcode-address"

/** UK postcode format (with optional single space before inward code). */
export function isValidUkPostcode(postcode: string | undefined): boolean {
  if (!postcode?.trim()) return false
  const ukPostcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i
  return ukPostcodeRegex.test(postcode.trim())
}

function formatAreaLabel(location: PostcodeLookupLocation): string {
  const parts = [location.adminDistrict, location.region].filter(Boolean) as string[]
  return parts.length > 0 ? parts.join(", ") : location.country || ""
}

export type ResolvedPostcodeLookup = PostcodeLookupSuccessBody & {
  /** Human-readable area line for addresses, e.g. "Westminster, London". */
  areaLabel: string
}

/** Validates the postcode and loads administrative geography via Postcodes.io (server proxy). */
export async function lookupPostcode(postcode: string): Promise<ResolvedPostcodeLookup> {
  const cleanPostcode = postcode.replace(/\s/g, "").toUpperCase()

  const response = await fetch("/api/postcode-lookup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ postcode: cleanPostcode }),
  })

  const data = (await response.json()) as PostcodeLookupSuccessBody & {
    success?: boolean
    error?: string
  }

  if (!response.ok) {
    throw new Error(data.error || `Postcode lookup failed (${response.status})`)
  }

  if (!data.success || !data.location) {
    throw new Error(data.error || "Postcode lookup was unsuccessful")
  }

  return {
    success: true,
    postcode: data.postcode,
    location: data.location,
    areaLabel: formatAreaLabel(data.location),
  }
}
