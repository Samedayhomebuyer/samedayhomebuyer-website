"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type RegionalHeroPostcodeFormProps = {
  regionName: string
}

export function RegionalHeroPostcodeForm({ regionName }: RegionalHeroPostcodeFormProps) {
  const router = useRouter()
  const [postcode, setPostcode] = useState("")

  return (
    <form
      className="mt-8 max-w-lg"
      onSubmit={(e) => {
        e.preventDefault()
        const trimmed = postcode.trim()
        if (!trimmed) {
          return
        }
        router.push(`/valuation/${encodeURIComponent(trimmed)}`)
      }}
    >
      <p className="text-primary-foreground/90 text-sm mb-3">Get your free {regionName} cash offer</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="text"
          name="postcode"
          placeholder="Enter your postcode"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          autoComplete="postal-code"
          className="h-12 bg-background border-border text-foreground placeholder:text-muted-foreground"
        />
        <Button
          type="submit"
          size="lg"
          className="h-12 px-6 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold group"
        >
          Get Cash Offer
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </form>
  )
}
