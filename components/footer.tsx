import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"
import { REGIONS } from "@/lib/regions"

export function Footer() {
  const featuredRegions = REGIONS.slice(0, 5)

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-foreground rounded-sm flex items-center justify-center">
                <span className="text-primary font-bold text-sm">SD</span>
              </div>
              <span className="font-serif text-lg font-semibold">
                Same Day Home Buyer
              </span>
            </Link>
            <p className="text-primary-foreground/70 text-sm">
              {"The UK's fastest and most trusted cash house buyer. Sell your property in as little as 24 hours."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#why-us" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#reviews" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Regions */}
          <div>
            <h3 className="font-semibold mb-4">Regions We Cover</h3>
            <ul className="space-y-2 text-sm">
              {featuredRegions.map((region) => (
                <li key={region.slug}>
                  <Link href={`/${region.slug}`} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {region.name}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link href="/locations" className="text-primary-foreground hover:text-primary-foreground/80 transition-colors font-medium">
                  View all locations
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:03300437570" className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  <Phone className="w-4 h-4" />
                  0330 043 7570
                </a>
              </li>
              <li>
                <a href="mailto:info@samedayhomebuyer.co.uk" className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  <Mail className="w-4 h-4" />
                  info@samedayhomebuyer.co.uk
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2 text-primary-foreground/70">
                  <MapPin className="w-4 h-4 mt-0.5" />
                  Nationwide, United Kingdom
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/60">
              © {new Date().getFullYear()}{" "}
              <a
                href="https://www.breezeflowai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-foreground transition-colors"
              >
                BreezeflowAI
              </a>
              . All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy-policy" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
