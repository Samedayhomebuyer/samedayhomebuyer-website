import type { Metadata } from "next"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export const metadata: Metadata = {
  title: "Privacy Policy | Same Day Home Buyer",
  description:
    "Learn how Same Day Home Buyer collects, uses, stores, and protects your personal information.",
}

const sections = [
  {
    title: "1. Information We Collect",
    points: [
      "Name and contact details (email address, phone number).",
      "Property address and related property details.",
      "Financial information relevant to property transactions.",
      "Identification documents required for legal compliance.",
      "Automatically collected usage information such as IP address, browser type, pages visited, and referral source.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    points: [
      "To process your property sale enquiry and provide valuations.",
      "To communicate with you about your sale and related updates.",
      "To complete legal and financial steps in property transactions.",
      "To comply with legal and regulatory obligations.",
      "To improve our services and website performance.",
      "To send relevant updates where consent is required and provided.",
    ],
  },
  {
    title: "3. Data Security",
    points: [
      "SSL encryption for data transmitted via our website.",
      "Secure systems with controlled access to personal data.",
      "Regular security updates and internal protection measures.",
      "Staff awareness of data protection responsibilities.",
    ],
  },
  {
    title: "4. Data Sharing",
    points: [
      "We may share information with solicitors, conveyancers, and financial institutions involved in your transaction.",
      "We may disclose data to government or regulatory authorities when required by law.",
      "We may use trusted service providers bound by confidentiality obligations.",
      "We do not sell your personal data.",
      "We do not use your data for third-party marketing without consent.",
    ],
  },
  {
    title: "5. Your Rights",
    points: [
      "Access the personal data we hold about you.",
      "Request correction of inaccurate information.",
      "Request deletion of your personal data where applicable.",
      "Object to or restrict certain processing.",
      "Request portability of your personal data.",
      "Withdraw consent at any time where processing relies on consent.",
    ],
  },
  {
    title: "6. Data Retention",
    points: [
      "Active transactions: usually for the transaction period plus up to 6 years.",
      "General enquiries: typically up to 12 months where no transaction proceeds.",
      "Legal and regulatory records: retained as required by law.",
      "Marketing preferences: retained until you unsubscribe or withdraw consent.",
    ],
  },
  {
    title: "7. Cookies and Tracking",
    points: [
      "Essential cookies required for basic website functionality.",
      "Analytics cookies to understand site usage and improve performance.",
      "Marketing cookies only where consent is provided.",
      "You can manage cookies through your browser settings.",
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-14 bg-linear-to-r from-primary to-primary/90 text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-balance">Privacy Policy</h1>
          <p className="mt-4 text-primary-foreground/85 max-w-3xl">
            Your privacy matters to us. This page explains how Same Day Home Buyer collects, uses, and protects your personal information.
          </p>
          <p className="mt-3 text-sm text-primary-foreground/75">Last updated: January 2025</p>
        </div>
      </section>

      <section className="py-14 lg:py-18">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 rounded-2xl border border-border bg-card p-6 lg:p-8 shadow-sm">
            <p className="text-muted-foreground">
              Same Day Home Buyer ("we", "our", or "us") is committed to handling personal data safely and responsibly in line with UK GDPR and the Data Protection Act 2018.
            </p>
            <p className="text-muted-foreground">
              Company details and contact information are listed below. If you have questions about this policy or your data rights, please contact us directly.
            </p>
          </div>

          <div className="mt-8 space-y-6">
            {sections.map((section) => (
              <article key={section.title} className="rounded-2xl border border-border bg-card p-6 lg:p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-foreground">{section.title}</h2>
                <ul className="mt-4 space-y-2 text-muted-foreground list-disc pl-5">
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <article className="mt-8 rounded-2xl border border-border bg-card p-6 lg:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground">Contact Our Data Protection Team</h2>
            <div className="mt-4 space-y-2 text-muted-foreground">
              <p>Email: privacy@samedayhomebuyer.co.uk</p>
              <p>Phone: 0330 043 7570</p>
              <p>Address: Same Day Home Buyer, London, United Kingdom</p>
            </div>
            <p className="mt-4 text-muted-foreground">
              You have the right to lodge a complaint with the UK Information Commissioner's Office (ICO) if you believe your personal data has not been handled appropriately. See ico.org.uk for more details.
            </p>
            <p className="mt-4 text-muted-foreground">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
            </p>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  )
}
