"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Search,
  Atom,
  ChevronRight,
  Database,
  FlaskConical,
} from "lucide-react";

// Mock compound data
const compounds = [
  {
    id: "pr2c3",
    name: "Praseodymium Carbide",
    formula: "Pr2C3",
    cfParams: "B₂⁰ = 0.42, B₄⁰ = 0.18, B₄⁴ = 0.09",
  },
  {
    id: "nd2fe14b",
    name: "Neodymium Iron Boron",
    formula: "Nd2Fe14B",
    cfParams: "B₂⁰ = 0.31, B₄⁰ = 0.22, B₆⁰ = 0.05",
  },
  {
    id: "smco5",
    name: "Samarium Cobalt",
    formula: "SmCo5",
    cfParams: "B₂⁰ = 0.55, B₄⁰ = 0.12, B₆⁶ = 0.03",
  },
  {
    id: "dyfe2",
    name: "Dysprosium Iron",
    formula: "DyFe2",
    cfParams: "B₂⁰ = 0.28, B₄⁰ = 0.15, B₄⁴ = 0.07",
  },
  {
    id: "tbni2",
    name: "Terbium Nickel",
    formula: "TbNi2",
    cfParams: "B₂⁰ = 0.38, B₄⁰ = 0.19, B₆⁰ = 0.04",
  },
  {
    id: "hoal2",
    name: "Holmium Aluminum",
    formula: "HoAl2",
    cfParams: "B₂⁰ = 0.45, B₄⁰ = 0.21, B₄⁴ = 0.11",
  },
  {
    id: "eral3",
    name: "Erbium Aluminum",
    formula: "ErAl3",
    cfParams: "B₂⁰ = 0.33, B₄⁰ = 0.16, B₆⁶ = 0.02",
  },
  {
    id: "tmcu",
    name: "Thulium Copper",
    formula: "TmCu",
    cfParams: "B₂⁰ = 0.41, B₄⁰ = 0.14, B₄⁴ = 0.06",
  },
  {
    id: "ybag",
    name: "Ytterbium Silver",
    formula: "YbAg",
    cfParams: "B₂⁰ = 0.29, B₄⁰ = 0.17, B₆⁰ = 0.08",
  },
  {
    id: "luni5",
    name: "Lutetium Nickel",
    formula: "LuNi5",
    cfParams: "B₂⁰ = 0.36, B₄⁰ = 0.20, B₆⁶ = 0.01",
  },
  {
    id: "ceal2",
    name: "Cerium Aluminum",
    formula: "CeAl2",
    cfParams: "B₂⁰ = 0.48, B₄⁰ = 0.13, B₄⁴ = 0.10",
  },
  {
    id: "gd2o3",
    name: "Gadolinium Oxide",
    formula: "Gd2O3",
    cfParams: "B₂⁰ = 0.52, B₄⁰ = 0.24, B₆⁰ = 0.06",
  },
];

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCompounds = useMemo(() => {
    if (!searchQuery.trim()) return compounds;
    const query = searchQuery.toLowerCase();
    return compounds.filter(
      (compound) =>
        compound.name.toLowerCase().includes(query) ||
        compound.formula.toLowerCase().includes(query) ||
        compound.cfParams.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
              <Atom className="size-5 text-primary" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-foreground">
              Rare Earth Database
            </span>
          </Link>

          <nav className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Home
            </Link>
            <Link
              href="/materials"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Materials
            </Link>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Logout</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <Database className="size-5 text-primary" />
              </div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                Materials Database
              </h1>
            </div>
            <p className="text-muted-foreground">
              Search and explore rare-earth compounds with crystal field
              parameters
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search compounds or CF parameters..."
                className="h-12 w-full rounded-xl border border-border bg-card pl-12 pr-4 text-base text-foreground shadow-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {filteredCompounds.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-foreground">
                {compounds.length}
              </span>{" "}
              compounds
            </p>
          </div>

          {/* Data Table */}
          <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 border-b border-border bg-muted/30 px-6 py-4">
              <div className="col-span-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Compound Name
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Formula
                </span>
              </div>
              <div className="col-span-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  CF Parameters
                </span>
              </div>
              <div className="col-span-2 text-right">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Actions
                </span>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-border">
              {filteredCompounds.length > 0 ? (
                filteredCompounds.map((compound) => (
                  <div
                    key={compound.id}
                    className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-muted/20 transition-colors"
                  >
                    <div className="col-span-4 flex items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/5">
                        <FlaskConical className="size-4 text-primary/70" />
                      </div>
                      <span className="font-medium text-foreground">
                        {compound.name}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="inline-flex items-center rounded-md bg-secondary px-2.5 py-1 text-sm font-mono font-medium text-secondary-foreground">
                        {compound.formula}
                      </span>
                    </div>
                    <div className="col-span-4">
                      <span className="text-sm text-muted-foreground font-mono">
                        {compound.cfParams}
                      </span>
                    </div>
                    <div className="col-span-2 flex justify-end">
                      <Button variant="ghost" size="sm" asChild>
                        <Link
                          href={`/materials/${compound.id}`}
                          className="gap-1"
                        >
                          View Details
                          <ChevronRight className="size-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-muted">
                    <Search className="size-5 text-muted-foreground" />
                  </div>
                  <p className="text-lg font-medium text-foreground">
                    No compounds found
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Try adjusting your search query
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Data sourced from Ke Lab research database. Last updated March
              2026.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
