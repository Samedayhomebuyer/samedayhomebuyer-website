import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight, Phone } from "lucide-react"
import { REGIONS, REGION_SLUGS } from "@/lib/regions"
import { FillImage } from "@/components/fill-image"
import { RegionalHeroPostcodeForm } from "@/components/regional-hero-postcode-form"

type RouteParams = {
  region: string
}

export function generateStaticParams() {
  return REGIONS.map((region) => ({ region: region.slug }))
}

export async function generateMetadata({ params }: { params: Promise<RouteParams> }): Promise<Metadata> {
  const { region: regionSlug } = await params
  const region = REGIONS.find((item) => item.slug === regionSlug)

  if (!region) {
    return {
      title: "Page Not Found",
    }
  }

  return {
    title: `Sell Your House Fast for Cash in ${region.name} | Same Day Home Buyer`,
    description: `Need to sell your house fast in ${region.name}? Same Day Home Buyer offers no-fee cash purchases with a quick completion timeline across the UK.`,
    keywords: `sell house fast ${region.name}, cash house buyer ${region.name}, we buy any house ${region.name}`,
  }
}

export default async function RegionPage({ params }: { params: Promise<RouteParams> }) {
  const { region: regionSlug } = await params

  if (!REGION_SLUGS.has(regionSlug)) {
    notFound()
  }

  const region = REGIONS.find((item) => item.slug === regionSlug)
  if (!region) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header />
      <section className="relative min-h-[78vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <FillImage
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
            alt={`Houses in ${region.name}`}
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/45" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl text-primary-foreground">
            <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-semibold mb-6">
              Local Cash Buyers in {region.name}
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Sell Your House Fast for Cash in {region.name}
            </h1>
            <p className="mt-6 text-xl text-primary-foreground/90 max-w-2xl">
              We buy properties throughout {region.name} and {region.county}. Cash offers within 2 hours,
              no fees, and a fast, chain-free completion.
            </p>
            <RegionalHeroPostcodeForm regionName={region.name} />
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-primary-foreground/90">
              <span>Free {region.name} property valuation</span>
              <span className="hidden sm:inline">•</span>
              <span>No obligation</span>
              <span className="hidden sm:inline">•</span>
              <span>2-hour response</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground border-y border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-sm font-medium">
            <p>2-hour response</p>
            <p>No fees or charges</p>
            <p>Any condition accepted</p>
          </div>
        </div>
      </section>

      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
            {region.coverageTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {region.areaGroups.map((group) => (
              <div key={group} className="rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium">
                {group}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="why-us" className="bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-10">
            Why homeowners in {region.name} choose us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Cash offer in 2 hours",
                description:
                  "Get a rapid, data-backed valuation so you can make a confident decision without delays.",
              },
              {
                title: `Local ${region.name} market experts`,
                description:
                  "Our team understands local demand, buyer behavior, and postcode-level pricing across your area.",
              },
              {
                title: "No fees or hidden charges",
                description:
                  "No estate agent costs, no surprise deductions, and no pressure. What we offer is what you get.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl bg-card border border-border p-6 shadow-sm">
                <CheckCircle className="w-6 h-6 text-accent mb-3" />
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-10">
            How to sell quickly in {region.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              "Submit your postcode",
              "Receive a rapid valuation",
              "Get your guaranteed cash offer",
              "Complete on your timeline",
            ].map((step, idx) => (
              <div key={step} className="rounded-xl border border-border bg-card p-6">
                <p className="text-sm font-semibold text-accent mb-2">Step {idx + 1}</p>
                <h3 className="text-base font-semibold text-foreground">{step}</h3>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
              <Link href="/#get-offer">
                Start Your {region.name} Valuation
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
            Ready to sell your {region.name} property?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
            Join homeowners across {region.name} who sold quickly with no hassle, no fees, and no property chain.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
              <Link href="/#get-offer">
                Get Free {region.name} Valuation
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-semibold">
              <a href="tel:03300437570">
                <Phone className="mr-2 w-4 h-4" />
                Call 0330 043 7570
              </a>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span>2-hour response</span>
            <span className="hidden sm:inline">•</span>
            <span>No obligation</span>
            <span className="hidden sm:inline">•</span>
            <span>Free service</span>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
