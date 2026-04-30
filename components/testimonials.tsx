"use client"

import { FillImage } from "@/components/fill-image"
import { Star } from "lucide-react"
import { useInView } from "@/hooks/use-scroll-animation"

const testimonials = [
  {
    quote: "Absolutely fantastic service. They delivered exactly what they promised - cash offer in 2 hours and completion in just 3 days. Couldn't be happier with the process!",
    author: "Sarah M.",
    location: "London",
    verified: true,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "After months of trying to sell through traditional estate agents, Same Day Home Buyer sorted everything in just one week. Incredibly professional and completely stress-free experience.",
    author: "James T.",
    location: "Manchester",
    verified: true,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "Needed to sell quickly due to unexpected financial difficulties. They were incredibly understanding, completely fair with pricing, and amazingly fast with the entire process. Highly recommended!",
    author: "Emma R.",
    location: "Birmingham",
    verified: true,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop"
  }
]

export function Testimonials() {
  const { ref, isInView } = useInView()

  return (
    <section id="reviews" className="py-16 lg:py-24 overflow-hidden scroll-mt-20">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-3xl mx-auto mb-12 lg:mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground text-balance">
            What Our Customers Say
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className="w-5 h-5 fill-amber-400 text-amber-400 transition-transform duration-300 hover:scale-125" 
                  style={{ transitionDelay: `${i * 50}ms` }}
                />
              ))}
            </div>
            <span className="text-lg text-muted-foreground">4.9/5 from 2,847 reviews</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.author}
              className={`bg-card rounded-xl p-6 lg:p-8 border border-border transition-all duration-500 hover:shadow-xl hover:-translate-y-2 group ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-4 h-4 fill-amber-400 text-amber-400 transition-transform duration-300 group-hover:scale-110" 
                    style={{ transitionDelay: `${i * 30}ms` }}
                  />
                ))}
              </div>
              <blockquote className="text-foreground mb-6 text-pretty transition-colors duration-300">
                {`"${testimonial.quote}"`}
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-110">
                  <FillImage
                    src={testimonial.image}
                    alt={testimonial.author}
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.location} {testimonial.verified && '- Verified Purchase'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
