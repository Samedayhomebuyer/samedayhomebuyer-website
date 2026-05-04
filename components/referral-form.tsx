"use client"

import { FormEvent, useState } from "react"

type ReferralFormState = {
  yourName: string
  yourPhone: string
  yourEmail: string
  propertyDetails: string
}

const initialState: ReferralFormState = {
  yourName: "",
  yourPhone: "",
  yourEmail: "",
  propertyDetails: "",
}

export function ReferralForm() {
  const [formState, setFormState] = useState<ReferralFormState>(initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/forms/referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      })

      if (!response.ok) {
        setSubmitError("We could not send your referral. Please try again.")
        return
      }

      setIsSubmitted(true)
      setFormState(initialState)
    } catch {
      setSubmitError("Network error while submitting. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
      <input
        name="your_name"
        type="text"
        required
        placeholder="Your full name"
        value={formState.yourName}
        onChange={(event) =>
          setFormState((prev) => ({ ...prev, yourName: event.target.value }))
        }
        className="w-full h-11 rounded-md border border-border bg-background px-3 text-sm"
      />
      <input
        name="your_phone"
        type="tel"
        required
        placeholder="Your phone number"
        value={formState.yourPhone}
        onChange={(event) =>
          setFormState((prev) => ({ ...prev, yourPhone: event.target.value }))
        }
        className="w-full h-11 rounded-md border border-border bg-background px-3 text-sm"
      />
      <input
        name="your_email"
        type="email"
        required
        placeholder="Your email address"
        value={formState.yourEmail}
        onChange={(event) =>
          setFormState((prev) => ({ ...prev, yourEmail: event.target.value }))
        }
        className="w-full h-11 rounded-md border border-border bg-background px-3 text-sm"
      />
      <textarea
        name="property_details"
        required
        rows={5}
        placeholder="Property address, owner situation (e.g. probate/urgent sale), and any other useful details"
        value={formState.propertyDetails}
        onChange={(event) =>
          setFormState((prev) => ({ ...prev, propertyDetails: event.target.value }))
        }
        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent/90 transition-colors disabled:opacity-70"
      >
        {isSubmitting ? "Submitting..." : "Submit Referral"}
      </button>
      {isSubmitted ? (
        <p className="text-sm text-green-700">
          Referral submitted successfully. Our team will contact you shortly.
        </p>
      ) : null}
      {submitError ? (
        <p className="text-sm text-destructive" role="alert">
          {submitError}
        </p>
      ) : null}
    </form>
  )
}
