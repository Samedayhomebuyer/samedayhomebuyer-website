"use client"

import { FillImage } from "@/components/fill-image"
import processImage from "@/app/assets/ben-elliott-xofT9R1QkPk-unsplash.jpg"
import { useInView, useParallax } from "@/hooks/use-scroll-animation"

const steps = [
  {
    number: "1",
    title: "Initial Enquiry & Valuation",
    description: "We gather essential details about your property to provide a swift, no-obligation cash valuation tailored to your specific circumstances."
  },
  {
    number: "2",
    title: "Rapid Offer Presentation",
    description: "Within two hours, we present a competitive cash offer, reflecting our commitment to speed and efficiency in property transactions."
  },
  {
    number: "3",
    title: "Immediate Exchange & Fee Coverage",
    description: "Upon your acceptance, we proceed with immediate exchange of contracts and cover all associated legal fees for seamless completion."
  },
  {
    number: "4",
    title: "Flexible Completion",
    description: "We finalize the sale at a time that perfectly suits your schedule, providing ultimate convenience and control throughout the process."
  }
]

export function Process() {
  const { ref, isInView } = useInView()
  const { ref: imageRef, offset } = useParallax(0.15)

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-card overflow-hidden scroll-mt-20">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-3xl mx-auto mb-12 lg:mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground text-balance">
            Our Streamlined Process
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Experience a hassle-free journey from enquiry to completion with our transparent 4-step process.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image Side */}
          <div 
            ref={imageRef}
            className={`relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden order-2 lg:order-1 transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
          >
            <div 
              className="absolute inset-0 transition-transform duration-100" 
              style={{ transform: `translateY(${offset * 0.5}px) scale(1.1)` }}
            >
              <FillImage
                src={processImage}
                alt="Aerial view of red-brick terraced homes and rooftops in a UK city"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 transition-all duration-500 hover:translate-y-[-5px]">
              <p className="text-primary-foreground font-medium text-lg">Trusted by 2,800+ homeowners</p>
              <p className="text-primary-foreground/80 text-sm mt-1">Join thousands who have sold their homes stress-free</p>
            </div>
          </div>

          {/* Steps Side */}
          <div className="space-y-4 order-1 lg:order-2">
            {steps.map((step, index) => (
              <div 
                key={step.number} 
                className={`relative bg-background rounded-xl p-5 border border-border transition-all duration-500 hover:border-accent hover:shadow-lg hover:-translate-y-1 group cursor-default ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-primary flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-accent">
                    <span className="text-lg font-serif font-semibold text-primary-foreground">{step.number}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1 transition-colors duration-300 group-hover:text-primary">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
