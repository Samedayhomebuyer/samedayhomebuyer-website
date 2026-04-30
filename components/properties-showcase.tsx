"use client"

import { FillImage } from "@/components/fill-image"
import { MapPin, Bed, Bath, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useInView } from "@/hooks/use-scroll-animation"

const properties = [
  {
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop",
    location: "Manchester",
    type: "Detached House",
    beds: 4,
    baths: 2,
    status: "Sold in 5 Days"
  },
  {
    image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=2070&auto=format&fit=crop",
    location: "Birmingham",
    type: "Semi-Detached",
    beds: 3,
    baths: 2,
    status: "Sold in 7 Days"
  },
  {
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    location: "London",
    type: "Modern Villa",
    beds: 5,
    baths: 3,
    status: "Sold in 3 Days"
  }
]

export function PropertiesShowcase() {
  const { ref, isInView } = useInView()

  return (
    <section className="py-20 lg:py-28 bg-background overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div>
            <p className="text-accent font-semibold uppercase tracking-wider text-sm">Recent Purchases</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              Properties We&apos;ve Bought
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              We buy all types of properties across the UK, regardless of condition. Here are some recent purchases.
            </p>
          </div>
          <Button variant="outline" className="w-fit border-primary text-primary hover:bg-primary hover:text-primary-foreground group transition-all duration-300 hover:scale-105">
            View All Properties
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property, index) => (
            <div 
              key={index} 
              className={`group bg-card rounded-xl overflow-hidden border border-border hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <FillImage
                  src={property.image}
                  alt={`${property.type} in ${property.location}`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-accent text-accent-foreground text-sm font-semibold rounded-full transition-transform duration-300 group-hover:scale-105">
                    {property.status}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                  <MapPin className="w-4 h-4" />
                  {property.location}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4 transition-colors duration-300 group-hover:text-primary">{property.type}</h3>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Bed className="w-4 h-4" />
                    {property.beds} Beds
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-4 h-4" />
                    {property.baths} Baths
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
