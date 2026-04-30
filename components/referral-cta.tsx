import Link from "next/link"
import { ArrowRight, Gift } from "lucide-react"

export function ReferralCTA() {
  return (
    <section className="py-16 lg:py-20 bg-linear-to-r from-accent to-accent/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-card/10 border border-white/25 p-8 lg:p-12 text-center backdrop-blur-sm">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white">
            <Gift className="w-4 h-4" />
            Referral Program
          </div>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-bold text-white">
            Know Someone Selling a Property?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-white/90">
            Refer a qualifying property and earn a 500 GBP Amazon voucher when we complete the purchase.
          </p>
          <Link
            href="/refer"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-accent transition-colors hover:bg-white/90"
          >
            Refer a Property
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
