"use client"

import { FillImage } from "@/components/fill-image"
import whyChooseUsBg from "@/app/assets/why-choose-us-bg.jpg"
import { Zap, Banknote, ShieldCheck, Clock, Home, FileCheck } from "lucide-react"
import { useInView, useParallax } from "@/hooks/use-scroll-animation"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get your cash offer within 2 hours and complete in as little as 7 days."
  },
  {
    icon: Banknote,
    title: "Cash Guarantee",
    description: "We buy with our own funds. No chain, no mortgage delays, no fall-throughs."
  },
  {
    icon: ShieldCheck,
    title: "Zero Fees",
    description: "We pay all legal fees and costs. No hidden charges whatsoever."
  },
  {
    icon: Clock,
    title: "Flexible Timeline",
    description: "Choose your completion date. Move when it suits you, not us."
  },
  {
    icon: Home,
    title: "Any Condition",
    description: "We buy properties in any condition. No repairs or cleaning needed."
  },
  {
    icon: FileCheck,
    title: "Simple Process",
    description: "No viewings, no negotiations, no stress. Just a straightforward sale."
  }
]

export function WhyChooseUs() {
  const { ref: sectionRef, isInView } = useInView()
  const { ref: imageRef, offset } = useParallax(0.2)

  return (
    <section id="why-us" className="py-20 lg:py-28 bg-card overflow-hidden scroll-mt-20">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div ref={imageRef} className="relative">
            <div 
              className={`relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
            >
              <div style={{ transform: `translateY(${offset * 0.5}px)` }} className="absolute inset-0 transition-transform duration-100">
                <FillImage
                  src={whyChooseUsBg}
                  alt="Traditional red-brick terraced homes with greenery"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover scale-110"
                />
              </div>
            </div>
            {/* Floating Card */}
            <div 
              className={`absolute -bottom-6 -right-6 lg:right-8 bg-primary text-primary-foreground p-6 rounded-xl shadow-xl max-w-[200px] transition-all duration-700 delay-300 hover:scale-105 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <p className="text-4xl font-bold">98%</p>
              <p className="text-sm text-primary-foreground/80 mt-1">Customer satisfaction rate</p>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <p 
              className={`text-accent font-semibold uppercase tracking-wider text-sm transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            >
              Why Choose Us
            </p>
            <h2 
              className={`mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance transition-all duration-500 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            >
              The Smarter Way to Sell Your Home
            </h2>
            <p 
              className={`mt-4 text-lg text-muted-foreground text-pretty transition-all duration-500 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            >
              {"We've helped thousands of homeowners sell their properties quickly and stress-free. Here's why they chose us."}
            </p>

            <div className="mt-10 grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={feature.title} 
                  className={`flex gap-4 group cursor-default transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                    <feature.icon className="w-5 h-5 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
