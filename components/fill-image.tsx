import Image, { type ImageProps } from "next/image"

export type FillImageProps = Omit<ImageProps, "fill"> & {
  sizes: string
}

/**
 * Wraps next/image `fill` with explicit `sizes` and `suppressHydrationWarning`
 * to avoid hydration noise from next/image inline styles vs DOM normalization
 * and from browser extensions mutating `<img>` before hydrate.
 */
export function FillImage({ sizes, ...rest }: FillImageProps) {
  return <Image fill sizes={sizes} suppressHydrationWarning {...rest} />
}
