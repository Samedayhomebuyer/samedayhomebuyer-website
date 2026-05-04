/** UK postcode format (with optional single space before inward code). */
export function isValidUkPostcode(postcode: string | undefined): boolean {
  if (!postcode?.trim()) return false
  const ukPostcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i
  return ukPostcodeRegex.test(postcode.trim())
}

/** Normalise to spaced uppercase, e.g. `sw1a1aa` → `SW1A 1AA`. */
export function formatUkPostcodeDisplay(postcode: string): string {
  const clean = postcode.replace(/\s/g, "").toUpperCase()
  if (clean.length < 5) return postcode.trim().toUpperCase()
  return `${clean.slice(0, -3)} ${clean.slice(-3)}`
}
