"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Phone, Menu, X } from "lucide-react"

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  function handleGetOfferClick() {
    setMobileMenuOpen(false)
    if (pathname === "/") {
      document.getElementById("get-offer")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
      window.setTimeout(() => {
        document.getElementById("get-offer-postcode")?.focus()
      }, 350)
      return
    }
    sessionStorage.setItem("sdbh_scrollToOffer", "1")
    router.push("/")
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-card/98 backdrop-blur-md border-b border-border shadow-md' 
          : 'bg-card/95 backdrop-blur-sm border-b border-border shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-14 lg:h-16' : 'h-16 lg:h-20'}`}>
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <span className="text-primary-foreground font-bold text-sm">SD</span>
            </div>
            <span className="font-serif text-lg lg:text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
              Same Day Home Buyer
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {[
              { name: "How It Works", href: "#how-it-works" },
              { name: "Why Choose Us", href: "#why-us" },
              { name: "Reviews", href: "#reviews" },
              { name: "FAQ", href: "#faq" }
            ].map((item, index) => (
              <a 
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  const target = document.querySelector(item.href)
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="tel:03300437570" 
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
            >
              <Phone className="w-4 h-4" />
              0330 043 7570
            </a>
            <Link
              href="/refer"
              className="p-[3px] relative rounded-lg transition-transform duration-200 hover:scale-105 group"
            >
              <span className="absolute inset-0 bg-linear-to-r from-primary to-accent rounded-lg animate-pulse" />
              <span className="pointer-events-none absolute -top-1 -right-1 w-2 h-2 rounded-full bg-accent animate-ping" />
              <span className="pointer-events-none absolute top-1 left-2 w-1.5 h-1.5 rounded-full bg-primary/80 animate-pulse" />
              <span className="px-4 py-1.5 bg-card rounded-[6px] relative transition duration-200 text-foreground hover:bg-transparent hover:text-primary-foreground font-semibold text-sm inline-flex overflow-hidden">
                <span className="absolute inset-y-0 -left-10 w-6 bg-white/30 blur-sm rotate-12 transition-all duration-700 group-hover:left-[120%]" />
                Earn £500
              </span>
            </Link>
            <Button 
              type="button"
              size="sm" 
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={handleGetOfferClick}
            >
              Get Cash Offer
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 transition-transform duration-300 hover:scale-110"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <Menu className={`w-6 h-6 absolute transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
              <X className={`w-6 h-6 absolute transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col gap-4 py-4 border-t border-border">
            {[
              { name: "How It Works", href: "#how-it-works" },
              { name: "Why Choose Us", href: "#why-us" },
              { name: "Reviews", href: "#reviews" },
              { name: "FAQ", href: "#faq" }
            ].map((item, index) => (
              <a 
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  setMobileMenuOpen(false)
                  setTimeout(() => {
                    const target = document.querySelector(item.href)
                    if (target) {
                      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                  }, 300)
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:translate-x-2 cursor-pointer"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {item.name}
              </a>
            ))}
            <a 
              href="tel:03300437570" 
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:translate-x-2"
            >
              <Phone className="w-4 h-4" />
              0330 043 7570
            </a>
            <Link
              href="/refer"
              onClick={() => setMobileMenuOpen(false)}
              className="p-[3px] relative rounded-lg w-fit transition-transform duration-200 hover:scale-105 group"
            >
              <span className="absolute inset-0 bg-linear-to-r from-primary to-accent rounded-lg animate-pulse" />
              <span className="pointer-events-none absolute -top-1 -right-1 w-2 h-2 rounded-full bg-accent animate-ping" />
              <span className="pointer-events-none absolute top-1 left-2 w-1.5 h-1.5 rounded-full bg-primary/80 animate-pulse" />
              <span className="px-4 py-1.5 bg-card rounded-[6px] relative transition duration-200 text-foreground hover:bg-transparent hover:text-primary-foreground font-semibold text-sm inline-flex overflow-hidden">
                <span className="absolute inset-y-0 -left-10 w-6 bg-white/30 blur-sm rotate-12 transition-all duration-700 group-hover:left-[120%]" />
                Earn £500
              </span>
            </Link>
            <Button 
              type="button"
              size="sm" 
              className="w-fit bg-accent text-accent-foreground hover:bg-accent/90 font-semibold transition-all duration-300 hover:scale-105"
              onClick={handleGetOfferClick}
            >
              Get Cash Offer
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
