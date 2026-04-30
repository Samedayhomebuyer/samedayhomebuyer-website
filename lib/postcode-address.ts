/** Geographic context returned by `/api/postcode-lookup` (Postcodes.io). */
export type PostcodeLookupLocation = {
  adminDistrict: string | null
  region: string | null
  country: string | null
  parliamentaryConstituency: string | null
}

/** Successful postcode validation + metadata from Postcodes.io. */
export type PostcodeLookupSuccessBody = {
  success: true
  postcode: string
  location: PostcodeLookupLocation
}

/** @deprecated Postcoder-era shape; Postcodes.io does not return per-door addresses. */
export type UkLookupAddress = {
  id: string
  street: string
  number: string
  organisation: string
  addressLine1: string
  addressLine2: string
  postTown: string
  county: string
  postcode: string
  fullAddress: string
}
