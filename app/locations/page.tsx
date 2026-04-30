import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { REGIONS } from "@/lib/regions"

export const metadata: Metadata = {
  title: "All Locations | Same Day Home Buyer",
  description: "Browse all UK regions covered by Same Day Home Buyer.",
}

export default function LocationsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-14 bg-linear-to-r from-primary to-primary/90 text-primary-foreground">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-balance">All Locations We Cover</h1>
          <p className="mt-4 text-primary-foreground/85 max-w-3xl">
            Explore all regions where we buy property quickly and with certainty.
          </p>
        </div>
      </section>

      <section className="py-14 lg:py-18">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-card p-6 lg:p-8 shadow-sm">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
              {REGIONS.map((region) => (
                <li key={region.slug}>
                  <Link
                    href={`/${region.slug}`}
                    className="inline-flex w-full rounded-md border border-border px-3 py-2 text-foreground hover:bg-muted transition-colors"
                  >
                    {region.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
