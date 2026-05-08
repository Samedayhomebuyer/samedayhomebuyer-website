"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FillImage } from "@/components/fill-image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Clock, CheckCircle, Phone } from "lucide-react"
import { useInView, useParallax } from "@/hooks/use-scroll-animation"

export function CTA() {
  const router = useRouter()
  const [postcode, setPostcode] = useState("")
  const { ref, isInView } = useInView()
  const { ref: parallaxRef, offset } = useParallax(0.2)

  return (
    <section className="py-20 lg:py-28 overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={parallaxRef}
          className={`relative overflow-hidden rounded-2xl transition-all duration-700 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        >
          {/* Background Image with Parallax */}
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 transition-transform duration-100"
              style={{ transform: `translateY(${offset * 0.3}px) scale(1.1)` }}
            >
              <FillImage
                src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070&auto=format&fit=crop"
                alt="Beautiful suburban house"
                sizes="(max-width: 1280px) 100vw, 1248px"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-primary/90" />
          </div>

          <div className="relative z-10 p-8 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className={`transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground text-balance">
                  Ready to Sell Your House Fast?
                </h2>
                <p className="mt-4 text-lg text-primary-foreground/80 text-pretty">
                  Join over 2,800 homeowners who have sold their properties quickly and stress-free with Same Day Home Buyer.
                </p>

                {/* Trust Badges */}
                <div className="mt-8 flex flex-wrap gap-6">
                  {[
                    { icon: Clock, text: "2-hour response" },
                    { icon: CheckCircle, text: "No obligation" },
                    { icon: CheckCircle, text: "100% free" }
                  ].map((badge, index) => (
                    <div 
                      key={badge.text}
                      className="flex items-center gap-2 text-sm text-primary-foreground transition-transform duration-300 hover:scale-105"
                      style={{ transitionDelay: `${400 + index * 100}ms` }}
                    >
                      <badge.icon className="w-5 h-5 text-accent" />
                      {badge.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div className={`bg-card rounded-xl p-6 lg:p-8 shadow-2xl transition-all duration-700 delay-300 hover:shadow-3xl ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h3 className="text-xl font-semibold text-foreground mb-2">Get Your Free Cash Offer</h3>
                <p className="text-muted-foreground mb-6">Enter your postcode to get started</p>

                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault()
                    const trimmed = postcode.trim()
                    if (!trimmed) {
                      document.getElementById("cta-postcode")?.focus()
                      return
                    }
                    router.push(`/valuation/${encodeURIComponent(trimmed)}`)
                  }}
                >
                  <Input
                    id="cta-postcode"
                    type="text"
                    name="postcode"
                    placeholder="Enter your postcode"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    autoComplete="postal-code"
                    className="h-12 bg-background border-border text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:scale-[1.02] focus:shadow-md"
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-12 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                  >
                    Get Free Cash Offer
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </form>

                {/* Phone */}
                <div className="mt-6 pt-6 border-t border-border text-center">
                  <p className="text-sm text-muted-foreground mb-2">Or call us directly</p>
                  <a 
                    href="tel:02033715544" 
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-all duration-300 hover:scale-105"
                  >
                    <Phone className="w-5 h-5" />
                    <span className="text-xl font-bold">020 3371 5544</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
