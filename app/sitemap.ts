import type { MetadataRoute } from "next"
import { REGIONS } from "@/lib/regions"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://samedayhomebuyer.co.uk"
  const now = new Date()

  const corePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/refer`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]

  const regionPages: MetadataRoute.Sitemap = REGIONS.map((region) => ({
    url: `${baseUrl}/${region.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }))

  return [...corePages, ...regionPages]
}
