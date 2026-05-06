"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Phone, Menu, X } from "lucide-react"

const HOME_SECTION_NAV = [
  { name: "Why Choose Us", hash: "why-us" },
  { name: "How It Works", hash: "how-it-works" },
  { name: "Reviews", hash: "reviews" },
  { name: "FAQ", hash: "faq" },
] as const

function scrollToSectionId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  /** When opening `/` with a hash (e.g. from another page), scroll after the main page mounts. */
  useEffect(() => {
    if (pathname !== "/") return
    const id = window.location.hash.replace(/^#/, "")
    if (!id) return
    const tryScroll = () => scrollToSectionId(id)
    tryScroll()
    const t1 = window.setTimeout(tryScroll, 50)
    const t2 = window.setTimeout(tryScroll, 200)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [pathname])

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
          <Link
            href="/"
            className="group cursor-pointer"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
            }}
          >
            <Image
              src="/logo.png"
              alt="Same Day Home Buyer"
              width={1013}
              height={680}
              priority
              suppressHydrationWarning
              className="h-10 lg:h-12 w-auto transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {HOME_SECTION_NAV.map((item, index) => (
              <Link
                key={item.hash}
                href={`/#${item.hash}`}
                onClick={(e) => {
                  if (pathname === "/") {
                    e.preventDefault()
                    scrollToSectionId(item.hash)
                  }
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.name}
              </Link>
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
            {HOME_SECTION_NAV.map((item, index) => (
              <Link
                key={item.hash}
                href={`/#${item.hash}`}
                onClick={(e) => {
                  if (pathname === "/") {
                    e.preventDefault()
                    setMobileMenuOpen(false)
                    window.setTimeout(() => scrollToSectionId(item.hash), 300)
                    return
                  }
                  setMobileMenuOpen(false)
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:translate-x-2 cursor-pointer"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {item.name}
              </Link>
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
