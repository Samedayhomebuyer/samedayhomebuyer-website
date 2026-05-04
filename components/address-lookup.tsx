"use client"

import { useEffect, useState, useCallback, useRef, useMemo } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { formatUkPostcodeDisplay, isValidUkPostcode } from "@/lib/postcode-service"

type Props = {
  postcode: string
  onSelectionChange: (payload: { doorNumber: string; fullAddress: string }) => void
  disabled?: boolean
}

function buildFullAddress(
  door: string,
  street: string,
  formattedPostcode: string,
): string {
  const line1 = [door.trim(), street.trim()].filter(Boolean).join(" ").trim()
  const pc = formattedPostcode.trim()
  return pc ? `${line1}, ${pc}` : line1
}

export function AddressLookup({
  postcode,
  onSelectionChange,
  disabled,
}: Props) {
  const formattedPostcode = useMemo(() => {
    if (!postcode?.trim() || !isValidUkPostcode(postcode)) return null
    return formatUkPostcodeDisplay(postcode)
  }, [postcode])

  const [doorNumber, setDoorNumber] = useState("")
  const [street, setStreet] = useState("")

  const onSelectionChangeRef = useRef(onSelectionChange)
  onSelectionChangeRef.current = onSelectionChange

  const pushFormValues = useCallback(
    (door: string, streetLine: string, displayPc: string | null) => {
      if (!displayPc || door.trim().length === 0 || streetLine.trim().length < 2) {
        onSelectionChangeRef.current({ doorNumber: "", fullAddress: "" })
        return
      }
      onSelectionChangeRef.current({
        doorNumber: door.trim(),
        fullAddress: buildFullAddress(door, streetLine, displayPc),
      })
    },
    [],
  )

  useEffect(() => {
      setDoorNumber("")
      setStreet("")
      onSelectionChangeRef.current({ doorNumber: "", fullAddress: "" })
  }, [formattedPostcode])

  useEffect(() => {
    pushFormValues(doorNumber, street, formattedPostcode)
  }, [doorNumber, street, formattedPostcode, pushFormValues])

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="address-lookup-postcode">Postcode *</Label>
        <Input
          id="address-lookup-postcode"
          readOnly
          disabled={disabled}
          value={formattedPostcode ?? postcode.trim()}
          className="h-11 bg-muted/80 font-medium uppercase tracking-wide"
          aria-readonly="true"
        />
      </div>

      {formattedPostcode && (
        <>
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
              {buildFullAddress(doorNumber, street, formattedPostcode)}
            </div>
          )}
        </>
      )}
    </div>
  )
}
