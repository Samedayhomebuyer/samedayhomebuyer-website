"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

import { AddressLookup } from "@/components/address-lookup"

const PROPERTY_TYPES = [
  { value: "detached", label: "Detached" },
  { value: "semi-detached", label: "Semi-detached" },
  { value: "terraced", label: "Terraced" },
  { value: "flat-apartment", label: "Flat / Apartment" },
  { value: "bungalow", label: "Bungalow" },
  { value: "other", label: "Other" },
] as const

const BEDROOM_OPTIONS = [
  { value: "studio", label: "Studio" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6+", label: "6+" },
] as const

const CONDITION_OPTIONS = [
  { value: "excellent", label: "Excellent" },
  { value: "good", label: "Good" },
  { value: "average", label: "Average" },
  { value: "needs-renovation", label: "Needs renovation" },
] as const

const valuationSchema = z.object({
  doorNumber: z.string().min(1, "Enter building number or name"),
  fullAddress: z
    .string()
    .min(12, "Enter building number and street"),
  propertyType: z.string().min(1, "Select property type"),
  bedrooms: z.string().min(1, "Select bedrooms"),
  condition: z.string().min(1, "Select condition"),
  fullName: z.string().min(2, "Enter your full legal name"),
  email: z.string().email("Enter a valid email address"),
  phone: z
    .string()
    .min(10, "Enter a valid UK phone number")
    .regex(/^[\d+\s()-]+$/, "Enter a valid UK phone number"),
  consent: z.boolean().refine((v) => v === true, {
    message: "Required to submit your enquiry",
  }),
})

export type ValuationFormValues = z.infer<typeof valuationSchema>

type Props = {
  postcode: string
}

export function ValuationForm({ postcode }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<ValuationFormValues>({
    resolver: zodResolver(valuationSchema),
    mode: "onChange",
    defaultValues: {
      doorNumber: "",
      fullAddress: "",
      propertyType: "",
      bedrooms: "",
      condition: "",
      fullName: "",
      email: "",
      phone: "",
      consent: false,
    },
  })

  async function onSubmit(values: ValuationFormValues) {
    setSubmitError(null)
    try {
      const response = await fetch("/api/forms/valuation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postcode,
          ...values,
        }),
      })

      if (!response.ok) {
        setSubmitError("We could not submit your details. Please try again.")
        return
      }

      setSubmitted(true)
    } catch {
      setSubmitError("We could not submit your details. Please try again.")
    }
  }

  if (submitted) {
    return (
      <Card className="animate-scale-in border-accent/30 shadow-lg transition-all duration-500 hover:shadow-xl">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-accent/15">
            <CheckCircle2 className="h-8 w-8 text-accent" aria-hidden />
          </div>
          <CardTitle className="font-serif text-2xl">
            Thank you — we have your details
          </CardTitle>
          <CardDescription className="text-base">
            Our valuation team will analyse your property using market comparables and
            aim to deliver your guaranteed cash offer within 2 hours.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-center text-sm text-muted-foreground">
          <p>
            We may contact you on{" "}
            <span className="font-medium text-foreground">{form.getValues("phone")}</span>{" "}
            or{" "}
            <span className="font-medium text-foreground">{form.getValues("email")}</span>.
          </p>
          <Button variant="outline" className="mt-4" asChild>
            <a href="/">Return to home</a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="shadow-lg transition-all duration-300 hover:border-accent/25 hover:shadow-xl">
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="font-serif text-xl">Property information</CardTitle>
            <CardDescription>
              Provide accurate details for the most precise valuation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 pt-6">
            <FormField
              control={form.control}
              name="fullAddress"
              render={({ field }) => (
                <FormItem>
                  <AddressLookup
                    postcode={postcode}
                    disabled={form.formState.isSubmitting}
                    onSelectionChange={(payload) => {
                      form.setValue("doorNumber", payload.doorNumber)
                      field.onChange(payload.fullAddress)
                      void form.trigger(["doorNumber", "fullAddress"])
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="propertyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property type *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-11 w-full">
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PROPERTY_TYPES.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bedrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of bedrooms *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-11 w-full">
                        <SelectValue placeholder="Select bedrooms" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {BEDROOM_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property condition *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-11 w-full">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CONDITION_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="shadow-lg transition-all duration-300 hover:border-accent/25 hover:shadow-xl">
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="font-serif text-xl">Contact information</CardTitle>
            <CardDescription>
              Secure details for your guaranteed offer delivery.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 pt-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your full legal name"
                      autoComplete="name"
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your.name@email.com"
                      autoComplete="email"
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number *</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="07xxx xxx xxx"
                      autoComplete="tel"
                      inputMode="tel"
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="consent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start gap-3 space-y-0 rounded-lg border border-border bg-muted/30 p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-0.5"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-normal text-sm leading-snug">
                      I authorize Same Day Home Buyer to contact me regarding this property
                      enquiry *
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              size="lg"
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              className="h-12 w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold disabled:opacity-60"
            >
              {form.formState.isSubmitting ? "Sending…" : "Submit details"}
            </Button>
            {submitError ? (
              <p className="text-sm text-destructive" role="alert">
                {submitError}
              </p>
            ) : null}
          </CardContent>
        </Card>
      </form>
    </Form>
  )
}
