"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { FillImage } from "@/components/fill-image"
import heroBg from "@/app/assets/hero-bg.jpg"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect"
import { CheckCircle, ArrowRight, Phone } from "lucide-react"
import { useParallax, useCountUp } from "@/hooks/use-scroll-animation"

export function Hero() {
  const router = useRouter()
  const [postcode, setPostcode] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const { ref: parallaxRef, offset } = useParallax(0.3)
  const { count: propertiesCount, ref: propertiesRef } = useCountUp(2800, 2000)
  const { count: ratingCount, ref: ratingRef } = useCountUp(49, 1500)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const heroWordsFirstLine = [
    { text: "Sell", className: "text-primary-foreground" },
    { text: "Your", className: "text-primary-foreground" },
    { text: "House", className: "text-primary-foreground" },
  ]

  const heroWordsSecondLine = [
    { text: "Fast", className: "text-accent" },
    { text: "for", className: "text-accent" },
    { text: "Cash", className: "text-accent" },
  ]

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!sessionStorage.getItem("sdbh_scrollToOffer")) return
    sessionStorage.removeItem("sdbh_scrollToOffer")
    requestAnimationFrame(() => {
      document.getElementById("get-offer")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
      document.getElementById("get-offer-postcode")?.focus()
    })
  }, [])

  return (
    <section ref={parallaxRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Full Background Image with Parallax */}
      <div 
        className="absolute inset-0 z-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${offset}px) scale(1.1)` }}
      >
        <FillImage
          src={heroBg}
          alt="Row of modern brick homes under a blue sky"
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/40" />
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-2xl">
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-semibold mb-6 transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <span className="w-2 h-2 rounded-full bg-accent-foreground animate-pulse" />
            {"UK's #1 Cash House Buyer"}
          </div>
          
          <div
            className={`transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="flex flex-col items-start leading-tight">
              <TypewriterEffectSmooth
                words={heroWordsFirstLine}
                className="my-0 justify-start"
                startDelay={0}
                duration={1.6}
                showCursor={false}
              />
              <TypewriterEffectSmooth
                words={heroWordsSecondLine}
                className="-mt-2 my-0 justify-start"
                startDelay={2}
                duration={1.4}
                cursorClassName="bg-accent h-8 sm:h-10 lg:h-14"
              />
            </div>
          </div>
          
          <p 
            className={`mt-6 text-xl text-primary-foreground/90 max-w-xl text-pretty transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            We buy any property in any condition across the UK. No fees, no hassle, cash offer in 2 hours, completion in 7 days.
          </p>

          {/* Form — id used by header “Get Cash Offer” + /#get-offer deep links */}
          <div 
            id="get-offer"
            className={`mt-8 scroll-mt-28 p-6 bg-card rounded-xl shadow-2xl max-w-lg transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <p className="text-foreground font-semibold mb-4">Get Your Free Cash Offer Today</p>
            <form
              className="flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault()
                const trimmed = postcode.trim()
                if (!trimmed) {
                  document.getElementById("get-offer-postcode")?.focus()
                  return
                }
                router.push(`/valuation/${encodeURIComponent(trimmed)}`)
              }}
            >
              <Input
                id="get-offer-postcode"
                type="text"
                name="postcode"
                placeholder="Enter your postcode"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                autoComplete="postal-code"
                className="h-12 bg-background border-border text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:scale-[1.02]"
              />
              <Button
                type="submit"
                size="lg"
                className="h-12 px-6 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold group transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Get Cash Offer
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </form>
            <div className="mt-4 flex items-center gap-4">
              <a 
                href="tel:03300437570" 
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium">0330 043 7570</span>
              </a>
              <span className="text-muted-foreground">|</span>
              <span className="text-sm text-muted-foreground">Free - No Obligation</span>
            </div>
          </div>

          {/* Trust Badges */}
          <div 
            className={`mt-8 flex flex-wrap gap-6 transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            {[
              "No Estate Agent Fees",
              "We Pay Legal Fees",
              "No Chain"
            ].map((badge) => (
              <div 
                key={badge}
                className="flex items-center gap-2 text-sm text-primary-foreground/90 transition-transform duration-300 hover:scale-105"
              >
                <CheckCircle className="w-5 h-5 text-accent" />
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div 
        className={`absolute bottom-0 left-0 right-0 z-10 bg-card/95 backdrop-blur-sm border-t border-border transition-all duration-700 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: '700ms' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
            <div ref={propertiesRef} className="py-6 px-4 text-center group cursor-default">
              <p className="text-3xl lg:text-4xl font-bold text-primary transition-transform duration-300 group-hover:scale-110">
                {propertiesCount.toLocaleString()}+
              </p>
              <p className="text-sm text-muted-foreground mt-1">Properties Bought</p>
            </div>
            <div className="py-6 px-4 text-center group cursor-default">
              <p className="text-3xl lg:text-4xl font-bold text-primary transition-transform duration-300 group-hover:scale-110">7 Days</p>
              <p className="text-sm text-muted-foreground mt-1">Average Completion</p>
            </div>
            <div ref={ratingRef} className="py-6 px-4 text-center group cursor-default">
              <p className="text-3xl lg:text-4xl font-bold text-primary transition-transform duration-300 group-hover:scale-110">
                {(ratingCount / 10).toFixed(1)}/5
              </p>
              <p className="text-sm text-muted-foreground mt-1">Customer Rating</p>
            </div>
            <div className="py-6 px-4 text-center group cursor-default">
              <p className="text-3xl lg:text-4xl font-bold text-accent transition-transform duration-300 group-hover:scale-110">2 Hours</p>
              <p className="text-sm text-muted-foreground mt-1">Cash Offer Guaranteed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
