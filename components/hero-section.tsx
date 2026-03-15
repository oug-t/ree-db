"use client";

import { useState } from "react";
import { Search, Atom, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const mockMaterials = [
  {
    id: 1,
    name: "Pr2C3",
    formula: "Pr₂C₃",
    type: "Carbide",
    thumbnail: "crystal",
  },
  {
    id: 2,
    name: "CeO2",
    formula: "CeO₂",
    type: "Oxide",
    thumbnail: "band",
  },
  {
    id: 3,
    name: "NdFeB",
    formula: "Nd₂Fe₁₄B",
    type: "Intermetallic",
    thumbnail: "dos",
  },
  {
    id: 4,
    name: "LaB6",
    formula: "LaB₆",
    type: "Boride",
    thumbnail: "crystal",
  },
  {
    id: 5,
    name: "Sm2Co17",
    formula: "Sm₂Co₁₇",
    type: "Intermetallic",
    thumbnail: "band",
  },
  {
    id: 6,
    name: "Y2O3",
    formula: "Y₂O₃",
    type: "Oxide",
    thumbnail: "dos",
  },
];

function GraphThumbnail({ type }: { type: string }) {
  if (type === "crystal") {
    return (
      <svg viewBox="0 0 80 80" className="size-full">
        <circle cx="40" cy="20" r="6" className="fill-primary/60" />
        <circle cx="20" cy="50" r="6" className="fill-accent/60" />
        <circle cx="60" cy="50" r="6" className="fill-accent/60" />
        <circle cx="40" cy="65" r="6" className="fill-primary/60" />
        <line
          x1="40"
          y1="20"
          x2="20"
          y2="50"
          className="stroke-muted-foreground/40"
          strokeWidth="1.5"
        />
        <line
          x1="40"
          y1="20"
          x2="60"
          y2="50"
          className="stroke-muted-foreground/40"
          strokeWidth="1.5"
        />
        <line
          x1="20"
          y1="50"
          x2="60"
          y2="50"
          className="stroke-muted-foreground/40"
          strokeWidth="1.5"
        />
        <line
          x1="40"
          y1="65"
          x2="20"
          y2="50"
          className="stroke-muted-foreground/40"
          strokeWidth="1.5"
        />
        <line
          x1="40"
          y1="65"
          x2="60"
          y2="50"
          className="stroke-muted-foreground/40"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (type === "band") {
    return (
      <svg viewBox="0 0 80 80" className="size-full">
        <path
          d="M10 60 Q25 55, 40 40 T70 25"
          fill="none"
          className="stroke-primary"
          strokeWidth="2"
        />
        <path
          d="M10 50 Q25 45, 40 50 T70 45"
          fill="none"
          className="stroke-accent"
          strokeWidth="2"
        />
        <path
          d="M10 70 Q25 65, 40 60 T70 55"
          fill="none"
          className="stroke-chart-3"
          strokeWidth="2"
        />
        <line
          x1="40"
          y1="15"
          x2="40"
          y2="75"
          className="stroke-muted-foreground/30"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
      </svg>
    );
  }

  // DOS
  return (
    <svg viewBox="0 0 80 80" className="size-full">
      <path
        d="M15 70 L15 50 Q20 45, 25 50 L25 55 Q30 60, 35 50 L35 35 Q40 20, 45 35 L45 55 Q50 65, 55 50 L55 45 Q60 40, 65 50 L65 70"
        fill="none"
        className="stroke-primary"
        strokeWidth="2"
      />
      <line
        x1="10"
        y1="40"
        x2="75"
        y2="40"
        className="stroke-muted-foreground/30"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
    </svg>
  );
}

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/30 px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:px-8">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-20 size-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -left-40 bottom-20 size-80 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
              <Atom className="size-7 text-primary" />
            </div>
          </div>

          <h1 className="text-balance font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Explore Rare Earth Element Properties with{" "}
            <span className="text-primary">Data-Driven Clarity</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Access comprehensive crystallographic data, electronic structures,
            and material properties from peer-reviewed scientific sources.
            Discover the building blocks of modern technology.
          </p>

          {/* Search Bar */}
          <div className="mx-auto mt-10 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search materials by element name, formula, or specific property..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 rounded-xl border-border/60 bg-card pl-12 pr-4 text-base shadow-lg transition-shadow focus:shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Material Cards Grid */}
        <div className="mx-auto mt-16 max-w-5xl">
          <h2 className="mb-6 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Featured Materials
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {mockMaterials.map((material) => (
              <Card
                key={material.id}
                className="group cursor-pointer border-border/50 bg-card/80 py-0 transition-all hover:border-primary/30 hover:shadow-md"
              >
                <CardContent className="p-4">
                  <div className="mb-3 flex aspect-square items-center justify-center rounded-lg bg-secondary/50 p-2">
                    <GraphThumbnail type={material.thumbnail} />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-foreground">
                      {material.formula}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {material.type}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button variant="outline" size="lg" className="gap-2">
              Browse All Materials
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
