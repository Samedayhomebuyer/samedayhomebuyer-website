import { Check, X } from "lucide-react"

import { FillImage } from "@/components/fill-image"

/** Residential neighbourhood — readable behind comparison table */
const COMPARISON_BG_IMAGE =
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=85&w=2400&auto=format&fit=crop"

const comparisonData = [
  {
    method: "Same Day Home Buyer",
    best: true,
    time: "2 Hours - 24 Hours",
    fees: "£0",
    guaranteed: true,
    hassle: "None"
  },
  {
    method: "Estate Agents",
    best: false,
    time: "3-6 Months",
    fees: "£3,000-£8,000",
    guaranteed: false,
    hassle: "High"
  },
  {
    method: "Property Auctions",
    best: false,
    time: "4-8 Weeks",
    fees: "£2,000-£5,000",
    guaranteed: false,
    hassle: "Medium"
  },
  {
    method: "Online Portals",
    best: false,
    time: "2-4 Months",
    fees: "£500-£2,000",
    guaranteed: false,
    hassle: "High"
  }
]

export function Comparison() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 scale-105">
          <FillImage
            src={COMPARISON_BG_IMAGE}
            alt=""
            sizes="100vw"
            className="object-cover object-center brightness-[1.07] saturate-[1.08]"
            aria-hidden
          />
        </div>
        {/* Light scrim — keeps photography visible; heavier at bottom for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/48 via-background/28 to-background/58" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl rounded-2xl bg-background/55 px-6 py-6 text-center shadow-sm backdrop-blur-md ring-1 ring-border/40 sm:px-8 lg:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground text-balance">
            Compare Your Options
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            See how we stack up against traditional selling methods. The choice is clear.
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-hidden rounded-xl border border-border bg-card/92 shadow-xl backdrop-blur-xl ring-1 ring-border/50 md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/75 backdrop-blur-sm">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Selling Method</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Time to Complete</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Total Fees</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Guaranteed Sale</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Hassle Level</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row) => (
                <tr 
                  key={row.method} 
                  className={`border-b border-border last:border-0 ${row.best ? "bg-accent/18 backdrop-blur-[2px]" : "bg-card/70 backdrop-blur-sm"}`}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{row.method}</span>
                      {row.best && (
                        <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                          BEST CHOICE
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-foreground">{row.time}</td>
                  <td className="p-4 text-foreground">{row.fees}</td>
                  <td className="p-4">
                    {row.guaranteed ? (
                      <Check className="w-5 h-5 text-accent" />
                    ) : (
                      <X className="w-5 h-5 text-destructive" />
                    )}
                  </td>
                  <td className="p-4 text-foreground">{row.hassle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {comparisonData.map((row) => (
            <div 
              key={row.method}
              className={`rounded-xl border p-4 shadow-lg backdrop-blur-xl ring-1 ${row.best ? "border-accent/55 bg-accent/20 ring-accent/25" : "border-border bg-card/85 ring-border/40"}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="font-medium text-foreground">{row.method}</span>
                {row.best && (
                  <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                    BEST
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Time</p>
                  <p className="text-foreground font-medium">{row.time}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Fees</p>
                  <p className="text-foreground font-medium">{row.fees}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Guaranteed</p>
                  <p className="flex items-center gap-1">
                    {row.guaranteed ? (
                      <Check className="w-4 h-4 text-accent" />
                    ) : (
                      <X className="w-4 h-4 text-destructive" />
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Hassle</p>
                  <p className="text-foreground font-medium">{row.hassle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
