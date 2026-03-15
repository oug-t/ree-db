"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Lock, BarChart3, Layers3, Waves, Activity } from "lucide-react"

const visualizationFeatures = [
  {
    icon: Layers3,
    title: "Crystal Structures",
    description: "Interactive 3D molecular visualizations with JSmol integration",
  },
  {
    icon: Waves,
    title: "Band Structures",
    description: "Electronic band diagrams along high-symmetry k-paths",
  },
  {
    icon: Activity,
    title: "Density of States",
    description: "Total and projected DOS with orbital decomposition",
  },
  {
    icon: BarChart3,
    title: "Mechanical Properties",
    description: "Elastic constants, bulk modulus, and hardness data",
  },
]

function MockScreenshot({ type }: { type: "crystal" | "band" | "dos" | "elastic" }) {
  const colors = {
    crystal: "bg-primary/10",
    band: "bg-accent/10",
    dos: "bg-chart-3/10",
    elastic: "bg-chart-4/10",
  }
  
  return (
    <div className={`aspect-[4/3] w-full rounded-lg ${colors[type]} p-4`}>
      {type === "crystal" && (
        <svg viewBox="0 0 120 90" className="size-full">
          <rect x="10" y="10" width="100" height="70" rx="4" className="fill-card stroke-border" strokeWidth="1" />
          <circle cx="40" cy="30" r="8" className="fill-primary/60" />
          <circle cx="80" cy="30" r="8" className="fill-primary/60" />
          <circle cx="60" cy="55" r="8" className="fill-accent/60" />
          <circle cx="40" cy="70" r="6" className="fill-primary/40" />
          <circle cx="80" cy="70" r="6" className="fill-primary/40" />
          <line x1="40" y1="30" x2="80" y2="30" className="stroke-muted-foreground/40" strokeWidth="1" />
          <line x1="40" y1="30" x2="60" y2="55" className="stroke-muted-foreground/40" strokeWidth="1" />
          <line x1="80" y1="30" x2="60" y2="55" className="stroke-muted-foreground/40" strokeWidth="1" />
        </svg>
      )}
      {type === "band" && (
        <svg viewBox="0 0 120 90" className="size-full">
          <rect x="10" y="10" width="100" height="70" rx="4" className="fill-card stroke-border" strokeWidth="1" />
          <line x1="20" y1="45" x2="100" y2="45" className="stroke-muted-foreground/20" strokeWidth="1" strokeDasharray="2 2" />
          <path d="M20 60 Q35 55, 45 50 T60 35 T75 45 T100 30" fill="none" className="stroke-primary" strokeWidth="2" />
          <path d="M20 70 Q35 65, 45 60 T60 55 T75 60 T100 50" fill="none" className="stroke-accent" strokeWidth="2" />
          <path d="M20 50 Q35 45, 45 35 T60 25 T75 30 T100 20" fill="none" className="stroke-chart-3" strokeWidth="2" />
          <text x="25" y="82" className="fill-muted-foreground text-[6px]">Γ</text>
          <text x="58" y="82" className="fill-muted-foreground text-[6px]">X</text>
          <text x="95" y="82" className="fill-muted-foreground text-[6px]">M</text>
        </svg>
      )}
      {type === "dos" && (
        <svg viewBox="0 0 120 90" className="size-full">
          <rect x="10" y="10" width="100" height="70" rx="4" className="fill-card stroke-border" strokeWidth="1" />
          <line x1="60" y1="15" x2="60" y2="75" className="stroke-muted-foreground/20" strokeWidth="1" strokeDasharray="2 2" />
          <path d="M60 70 Q55 65, 50 60 Q40 50, 45 40 Q50 30, 40 25 Q30 20, 35 15" fill="none" className="stroke-primary" strokeWidth="2" />
          <path d="M60 70 Q65 65, 70 55 Q80 45, 75 35 Q70 25, 80 20 Q90 15, 85 12" fill="none" className="stroke-accent" strokeWidth="2" />
          <text x="15" y="45" className="fill-muted-foreground text-[6px]">DOS</text>
          <text x="55" y="82" className="fill-muted-foreground text-[6px]">E</text>
        </svg>
      )}
      {type === "elastic" && (
        <svg viewBox="0 0 120 90" className="size-full">
          <rect x="10" y="10" width="100" height="70" rx="4" className="fill-card stroke-border" strokeWidth="1" />
          <rect x="20" y="55" width="12" height="18" rx="2" className="fill-primary/60" />
          <rect x="38" y="40" width="12" height="33" rx="2" className="fill-accent/60" />
          <rect x="56" y="30" width="12" height="43" rx="2" className="fill-chart-3/60" />
          <rect x="74" y="45" width="12" height="28" rx="2" className="fill-chart-4/60" />
          <rect x="92" y="35" width="12" height="38" rx="2" className="fill-chart-5/60" />
          <text x="22" y="80" className="fill-muted-foreground text-[5px]">C₁₁</text>
          <text x="40" y="80" className="fill-muted-foreground text-[5px]">C₁₂</text>
          <text x="58" y="80" className="fill-muted-foreground text-[5px]">C₄₄</text>
          <text x="76" y="80" className="fill-muted-foreground text-[5px]">B</text>
          <text x="94" y="80" className="fill-muted-foreground text-[5px]">G</text>
        </svg>
      )}
    </div>
  )
}

export function FeaturesSection() {
  return (
    <section className="bg-background px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Advanced Materials Property Visualization
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Analyze crystal structures, band structures, density of states, and key mechanical 
            properties directly on each material&apos;s page.
          </p>
        </div>
        
        {/* Feature Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visualizationFeatures.map((feature, index) => (
            <Card key={index} className="border-border/50 bg-card/50">
              <CardContent className="pt-6">
                <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="size-5 text-primary" />
                </div>
                <h3 className="font-medium text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Mock Screenshots Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <MockScreenshot type="crystal" />
          <MockScreenshot type="band" />
          <MockScreenshot type="dos" />
          <MockScreenshot type="elastic" />
        </div>
        
        {/* Access Notice */}
        <div className="mx-auto mt-16 max-w-2xl">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="flex flex-col items-center gap-4 py-8 text-center sm:flex-row sm:text-left">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Lock className="size-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground">Full Access Required</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Access our curated detailed visualization tools for each material, sourced from 
                  peer-reviewed scientific publications. Create an account to unlock all features.
                </p>
              </div>
              <Button className="shrink-0 gap-2">
                <Lock className="size-4" />
                View Locked Pages
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
