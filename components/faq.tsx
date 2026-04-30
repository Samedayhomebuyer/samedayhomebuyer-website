"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How quickly can you complete?",
    answer: "We can provide a cash offer within 2 hours and complete the purchase in as little as 24 hours. Most transactions complete within 2-3 weeks, depending on your preferred timeline."
  },
  {
    question: "Do you charge any fees?",
    answer: "Absolutely not. We don't charge any fees whatsoever. We also cover all legal fees, survey costs, and any other expenses. The price we offer is exactly what you'll receive."
  },
  {
    question: "What types of properties do you buy?",
    answer: "We buy all types of properties regardless of condition, location, or tenure. This includes houses, flats, bungalows, commercial properties, and land. Properties with structural issues, short leases, or problematic tenants are all welcome."
  },
  {
    question: "How do you calculate your offers?",
    answer: "Our offers are based on current market values, recent comparable sales in your area, and the condition of your property. While we typically offer below full market value to account for the speed and certainty we provide, our prices are always fair and competitive."
  },
  {
    question: "Is there any obligation?",
    answer: "None at all. Our valuations and offers are completely free with no strings attached. You're under no obligation to accept our offer, and you can walk away at any point in the process."
  }
]

export function FAQ() {
  return (
    <section id="faq" className="py-16 lg:py-24 bg-card scroll-mt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <span className="text-sm font-medium text-accent uppercase tracking-wider">FAQ</span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground text-balance">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Everything you need to know about selling your house to us
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-border">
              <AccordionTrigger className="text-left text-foreground hover:text-foreground hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
