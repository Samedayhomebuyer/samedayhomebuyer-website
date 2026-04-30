"use client"

import Link from "next/link"
import { ArrowLeft, Award, Landmark, Shield, Zap } from "lucide-react"

import { FillImage } from "@/components/fill-image"
import { ValuationForm } from "@/components/valuation-form"
import { cn } from "@/lib/utils"

/** UK residential architecture — complements homepage hero imagery */
const VALUATION_HERO_IMAGE =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=85&w=2400&auto=format&fit=crop"

const sidebarBenefits = [
  {
    icon: Award,
    title: "Award winning",
    description:
      "Recognised industry leader with awards for customer service excellence.",
  },
  {
    icon: Zap,
    title: "Lightning fast",
    description:
      "2-hour decision guarantee with fast completion available nationwide.",
  },
  {
    icon: Shield,
    title: "Fully regulated",
    description: "Fully insured and compliant with industry standards.",
  },
  {
    icon: Landmark,
    title: "£500M+ invested",
    description: "Substantial funds ready to complete on your property.",
  },
] as const

type Props = {
  postcode: string
}

export function ValuationPageContent({ postcode }: Props) {
  return (
    <section className="relative overflow-hidden pb-20 pt-28 lg:pb-24 lg:pt-32">
      {/* Background image + overlays */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 origin-center animate-valuation-kenburns scale-[1.12]">
            <FillImage
              src={VALUATION_HERO_IMAGE}
              alt=""
              sizes="100vw"
              className="object-cover opacity-95"
              priority
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/96 via-primary/88 to-primary/65" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-accent/18 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 sm:gap-6">
          <Link
            href="/"
            className={cn(
              "group inline-flex w-fit items-center gap-2 rounded-lg border border-primary-foreground/25 px-4 py-2.5 text-sm font-medium text-primary-foreground/90",
              "transition-all duration-300 hover:border-primary-foreground/50 hover:bg-primary-foreground/8 hover:shadow-md",
              "animate-fade-in-up",
            )}
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden />
            Return to search
          </Link>

          <p
            className={cn(
              "inline-flex w-fit items-center gap-2 rounded-full bg-accent/25 px-4 py-2 text-sm font-semibold text-accent backdrop-blur-[2px]",
              "animate-fade-in-up delay-100 shadow-sm",
            )}
          >
            <span aria-hidden>★</span>
            Trusted by 15,000+ property owners
          </p>
        </div>

        <h1
          className={cn(
            "font-serif text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl",
            "animate-fade-in-up delay-200",
          )}
        >
          Exclusive cash offer for {postcode}
        </h1>
        <p
          className={cn(
            "mt-4 max-w-3xl text-lg text-primary-foreground/88 text-pretty",
            "animate-fade-in-up delay-300",
          )}
        >
          Our expert valuation system will analyse your property using market factors to deliver a
          guaranteed cash offer within 2 hours.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          <div className="animate-fade-in-up delay-[380ms]">
            <ValuationForm postcode={postcode} />
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28">
            <div
              className={cn(
                "rounded-xl border border-primary-foreground/15 bg-primary-foreground/[0.07] p-6 shadow-lg backdrop-blur-md",
                "transition-all duration-500 hover:border-primary-foreground/25 hover:bg-primary-foreground/[0.09]",
                "animate-fade-in-right delay-400 motion-reduce:animate-none motion-reduce:opacity-100",
              )}
            >
              <h2 className="font-serif text-lg font-semibold text-primary-foreground">
                Your guaranteed benefits
              </h2>
              <ul className="mt-4 space-y-5">
                {sidebarBenefits.map(({ icon: Icon, title, description }) => (
                  <li key={title} className="flex gap-3">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                    <div>
                      <p className="font-semibold text-primary-foreground">{title}</p>
                      <p className="mt-1 text-sm text-primary-foreground/78">{description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={cn(
                "rounded-xl border border-accent/45 bg-accent/18 p-6 shadow-lg backdrop-blur-sm",
                "transition-transform duration-500 hover:-translate-y-0.5 hover:shadow-xl",
                "animate-fade-in-right delay-600 motion-reduce:animate-none motion-reduce:opacity-100",
              )}
            >
              <p className="font-serif text-lg font-semibold text-primary-foreground">
                Your exclusive cash offer promise
              </p>
              <p className="mt-2 text-sm text-primary-foreground/88">
                Join thousands of satisfied property owners who chose our premium cash buying
                service — fair offers with no estate agent fees.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
