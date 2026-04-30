"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { AlertCircle, CheckCircle2, Loader2, MapPin } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import type { PostcodeLookupLocation } from "@/lib/postcode-address"
import { isValidUkPostcode, lookupPostcode } from "@/lib/postcode-service"

type Props = {
  postcode: string
  onSelectionChange: (payload: { doorNumber: string; fullAddress: string }) => void
  disabled?: boolean
}

function buildFullAddress(
  door: string,
  street: string,
  areaLabel: string,
  formattedPostcode: string,
): string {
  const line1 = [door.trim(), street.trim()].filter(Boolean).join(" ").trim()
  const tail = [areaLabel.trim(), formattedPostcode.trim()].filter(Boolean).join(", ")
  return tail ? `${line1}, ${tail}` : line1
}

export function AddressLookup({
  postcode,
  onSelectionChange,
  disabled,
}: Props) {
  const [resolvedPostcode, setResolvedPostcode] = useState<string | null>(null)
  const [location, setLocation] = useState<PostcodeLookupLocation | null>(null)
  const [areaLabel, setAreaLabel] = useState("")
  const [doorNumber, setDoorNumber] = useState("")
  const [street, setStreet] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSelectionChangeRef = useRef(onSelectionChange)
  onSelectionChangeRef.current = onSelectionChange

  const pushFormValues = useCallback(
    (
      door: string,
      streetLine: string,
      area: string,
      formattedPc: string | null,
    ) => {
      if (!formattedPc || door.trim().length === 0 || streetLine.trim().length < 2) {
        onSelectionChangeRef.current({ doorNumber: "", fullAddress: "" })
        return
      }
      onSelectionChangeRef.current({
        doorNumber: door.trim(),
        fullAddress: buildFullAddress(door, streetLine, area, formattedPc),
      })
    },
    [],
  )

  useEffect(() => {
    if (!postcode || !isValidUkPostcode(postcode)) {
      setLoading(false)
      setResolvedPostcode(null)
      setLocation(null)
      setAreaLabel("")
      setError(null)
      setDoorNumber("")
      setStreet("")
      onSelectionChangeRef.current({ doorNumber: "", fullAddress: "" })
      return
    }

    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      setResolvedPostcode(null)
      setLocation(null)
      setAreaLabel("")
      setDoorNumber("")
      setStreet("")
      onSelectionChangeRef.current({ doorNumber: "", fullAddress: "" })

      try {
        const result = await lookupPostcode(postcode)
        if (cancelled) return

        setResolvedPostcode(result.postcode)
        setLocation(result.location)
        setAreaLabel(result.areaLabel)
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Could not verify postcode.")
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [postcode])

  useEffect(() => {
    pushFormValues(doorNumber, street, areaLabel, resolvedPostcode)
  }, [doorNumber, street, areaLabel, resolvedPostcode, pushFormValues])

  const areaSummary =
    location &&
    [location.adminDistrict, location.region, location.country].filter(Boolean).join(" · ")

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="address-lookup-postcode">Postcode *</Label>
        <Input
          id="address-lookup-postcode"
          readOnly
          disabled={disabled}
          value={resolvedPostcode ?? postcode}
          className="h-11 bg-muted/80 font-medium uppercase tracking-wide"
          aria-readonly="true"
        />
      </div>

      {loading && (
        <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin shrink-0" aria-hidden />
          Verifying postcode…
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!loading && resolvedPostcode && location && (
        <>
          <div className="rounded-lg border border-emerald-500/35 bg-emerald-500/10 px-4 py-3">
            <div className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
              <div className="min-w-0 space-y-1">
                <p className="text-sm font-semibold text-foreground">Postcode recognised</p>
                <p className="flex items-start gap-2 text-sm text-foreground/85">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                  <span>{areaSummary || "UK"}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="address-door">Building number or name *</Label>
              <Input
                id="address-door"
                placeholder="e.g. 12 or Flat 3"
                disabled={disabled}
                value={doorNumber}
                onChange={(e) => setDoorNumber(e.target.value)}
                className={cn("h-11", disabled && "opacity-60")}
                autoComplete="address-line1"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="address-street">Street *</Label>
              <Input
                id="address-street"
                placeholder="e.g. High Street"
                disabled={disabled}
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className={cn("h-11", disabled && "opacity-60")}
                autoComplete="address-line2"
              />
            </div>
          </div>

          {doorNumber.trim() && street.trim().length >= 2 && (
            <div className="rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Preview: </span>
              {buildFullAddress(doorNumber, street, areaLabel, resolvedPostcode)}
            </div>
          )}
        </>
      )}
    </div>
  )
}
