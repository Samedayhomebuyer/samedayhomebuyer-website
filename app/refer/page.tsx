import type { Metadata } from "next"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { ReferralForm } from "@/components/referral-form"
import { CheckCircle, Gift, Clock, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Refer a Property | Same Day Home Buyer",
  description:
    "Refer a qualifying property lead and earn a 500 GBP Amazon voucher when we complete the purchase.",
}

export default function ReferPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-32 pb-16 bg-linear-to-r from-primary to-primary/90 text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-balance">
            Refer a Property and Earn a 500 GBP Amazon Voucher
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/85 max-w-3xl">
            If you know someone needing a quick, certain property sale, send us the details. For qualifying referrals that complete, we reward you.
          </p>
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            {[
              { icon: FileText, text: "Submit the referral details" },
              { icon: Clock, text: "We review it quickly" },
              { icon: Gift, text: "Receive your reward after completion" },
            ].map((item) => (
              <div key={item.text} className="rounded-lg border border-white/20 bg-white/10 p-4">
                <item.icon className="w-5 h-5 mb-2 text-accent" />
                <p className="text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-card p-6 lg:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground">Submit Referral</h2>
            <p className="mt-2 text-muted-foreground">
              Email us your referral details and our team will respond promptly.
            </p>

            <ReferralForm />
          </div>

          <div className="mt-8 rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground">Program Notes</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {[
                "Referral must be genuine and include accurate contact details.",
                "Reward is issued for successful completed purchases only.",
                "One reward per unique property transaction.",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-accent" />
                  <span>{item}</span>
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
