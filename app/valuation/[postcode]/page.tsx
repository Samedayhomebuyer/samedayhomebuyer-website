import type { Metadata } from "next"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { ValuationPageContent } from "@/components/valuation-page-content"

function formatPostcodeFromParam(param: string): string {
  try {
    return decodeURIComponent(param.replace(/\+/g, " ")).trim()
  } catch {
    return param.trim()
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ postcode: string }>
}): Promise<Metadata> {
  const { postcode: raw } = await params
  const postcode = formatPostcodeFromParam(raw)
  return {
    title: `Exclusive Cash Offer — ${postcode} | Same Day Home Buyer`,
    description: `Complete our valuation form for ${postcode}. Get a guaranteed cash offer within 2 hours.`,
  }
}

export default async function ValuationPage({
  params,
}: {
  params: Promise<{ postcode: string }>
}) {
  const { postcode: raw } = await params
  const postcode = formatPostcodeFromParam(raw)

  return (
    <main className="min-h-screen">
      <Header />
      <ValuationPageContent postcode={postcode} />
      <Footer />
    </main>
  )
}
