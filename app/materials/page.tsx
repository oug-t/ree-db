"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Search, ChevronDown, Database, Clock, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock material data
const materialsData = [
  {
    id: "pr2c3",
    formula: "Pr2C3",
    pcdCode: "PCD-1847",
    spaceGroup: "I-43d",
    element: "Pr",
    symmetry: "Cubic",
    energyRange: "0-5 eV",
  },
  {
    id: "nd2fe14b",
    formula: "Nd2Fe14B",
    pcdCode: "PCD-2103",
    spaceGroup: "P42/mnm",
    element: "Nd",
    symmetry: "Tetragonal",
    energyRange: "0-10 eV",
  },
  {
    id: "sm2co17",
    formula: "Sm2Co17",
    pcdCode: "PCD-1592",
    spaceGroup: "R-3m",
    element: "Sm",
    symmetry: "Rhombohedral",
    energyRange: "0-8 eV",
  },
  {
    id: "eragv",
    formula: "ErAgV",
    pcdCode: "PCD-3021",
    spaceGroup: "Fm-3m",
    element: "Er",
    symmetry: "Cubic",
    energyRange: "0-6 eV",
  },
  {
    id: "tbfe2",
    formula: "TbFe2",
    pcdCode: "PCD-1456",
    spaceGroup: "Fd-3m",
    element: "Tb",
    symmetry: "Cubic",
    energyRange: "0-12 eV",
  },
  {
    id: "dyni5",
    formula: "DyNi5",
    pcdCode: "PCD-2847",
    spaceGroup: "P6/mmm",
    element: "Dy",
    symmetry: "Hexagonal",
    energyRange: "0-7 eV",
  },
  {
    id: "ho2o3",
    formula: "Ho2O3",
    pcdCode: "PCD-1123",
    spaceGroup: "Ia-3",
    element: "Ho",
    symmetry: "Cubic",
    energyRange: "0-4 eV",
  },
  {
    id: "gd5si4",
    formula: "Gd5Si4",
    pcdCode: "PCD-3456",
    spaceGroup: "Pnma",
    element: "Gd",
    symmetry: "Orthorhombic",
    energyRange: "0-9 eV",
  },
  {
    id: "cecu2si2",
    formula: "CeCu2Si2",
    pcdCode: "PCD-2234",
    spaceGroup: "I4/mmm",
    element: "Ce",
    symmetry: "Tetragonal",
    energyRange: "0-5 eV",
  },
  {
    id: "lani5",
    formula: "LaNi5",
    pcdCode: "PCD-1789",
    spaceGroup: "P6/mmm",
    element: "La",
    symmetry: "Hexagonal",
    energyRange: "0-6 eV",
  },
  {
    id: "yba2cu3o7",
    formula: "YBa2Cu3O7",
    pcdCode: "PCD-4012",
    spaceGroup: "Pmmm",
    element: "Y",
    symmetry: "Orthorhombic",
    energyRange: "0-15 eV",
  },
  {
    id: "eu2o3",
    formula: "Eu2O3",
    pcdCode: "PCD-1567",
    spaceGroup: "C2/m",
    element: "Eu",
    symmetry: "Monoclinic",
    energyRange: "0-5 eV",
  },
];

const rareEarthElements = [
  "All",
  "Ce",
  "Pr",
  "Nd",
  "Sm",
  "Eu",
  "Gd",
  "Tb",
  "Dy",
  "Ho",
  "Er",
  "Tm",
  "Yb",
  "Lu",
  "La",
  "Y",
];
const symmetryGroups = [
  "All",
  "Cubic",
  "Tetragonal",
  "Hexagonal",
  "Orthorhombic",
  "Rhombohedral",
  "Monoclinic",
];
const energyRanges = [
  "All",
  "0-5 eV",
  "0-6 eV",
  "0-7 eV",
  "0-8 eV",
  "0-9 eV",
  "0-10 eV",
  "0-12 eV",
  "0-15 eV",
];

// Mini DOS plot SVG component
function MiniDOSPlot() {
  // Generate a simple random-ish but deterministic plot
  const points =
    "0,24 8,20 16,22 24,14 32,18 40,8 48,12 56,6 64,10 72,4 80,8 88,14 96,10";

  return (
    <svg
      viewBox="0 0 96 28"
      className="h-7 w-full"
      aria-label="Density of States preview"
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-slate-400"
      />
    </svg>
  );
}

// Dropdown component
function FilterDropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
      >
        <span className="text-slate-500">{label}:</span>
        <span>{value}</span>
        <ChevronDown
          className={`size-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 top-full z-20 mt-1 min-w-[160px] rounded-md border border-slate-200 bg-white py-1 shadow-lg">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`block w-full px-3 py-2 text-left text-sm transition-colors hover:bg-slate-50 ${
                  value === option
                    ? "bg-slate-100 font-medium text-primary"
                    : "text-slate-700"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Material Card component
function MaterialCard({ material }: { material: (typeof materialsData)[0] }) {
  return (
    <Link
      href={`/materials/${material.id}`}
      className="group block rounded-lg border border-slate-200 bg-white p-5 transition-all hover:border-slate-300 hover:bg-slate-50/50"
    >
      {/* Formula Header */}
      <h3 className="font-mono text-lg font-bold tracking-tight text-slate-900">
        {material.formula}
      </h3>

      {/* Metadata Grid */}
      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
        <div>
          <span className="text-xs text-slate-400">PCD Code</span>
          <p className="font-mono text-sm text-slate-600">{material.pcdCode}</p>
        </div>
        <div>
          <span className="text-xs text-slate-400">Space Group</span>
          <p className="font-mono text-sm text-slate-600">
            {material.spaceGroup}
          </p>
        </div>
      </div>

      {/* Mini DOS Plot */}
      <div className="mt-4 rounded border border-slate-100 bg-slate-50/50 px-2 py-2">
        <MiniDOSPlot />
      </div>

      {/* View indicator */}
      <div className="mt-3 flex items-center justify-end">
        <span className="text-xs font-medium text-slate-400 transition-colors group-hover:text-primary">
          View Details →
        </span>
      </div>
    </Link>
  );
}

export default function MaterialExplorerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [elementFilter, setElementFilter] = useState("All");
  const [symmetryFilter, setSymmetryFilter] = useState("All");
  const [energyFilter, setEnergyFilter] = useState("All");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredMaterials = useMemo(() => {
    return materialsData.filter((material) => {
      const matchesSearch =
        searchQuery === "" ||
        material.formula.toLowerCase().includes(searchQuery.toLowerCase()) ||
        material.pcdCode.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesElement =
        elementFilter === "All" || material.element === elementFilter;
      const matchesSymmetry =
        symmetryFilter === "All" || material.symmetry === symmetryFilter;
      const matchesEnergy =
        energyFilter === "All" || material.energyRange === energyFilter;

      return (
        matchesSearch && matchesElement && matchesSymmetry && matchesEnergy
      );
    });
  }, [searchQuery, elementFilter, symmetryFilter, energyFilter]);

  const activeFiltersCount = [
    elementFilter,
    symmetryFilter,
    energyFilter,
  ].filter((f) => f !== "All").length;

  const clearAllFilters = () => {
    setElementFilter("All");
    setSymmetryFilter("All");
    setEnergyFilter("All");
    setSearchQuery("");
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50/50">
      <Navigation />

      <main className="flex-1">
        {/* Search Section */}
        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            {/* Search Input */}
            <div className="relative mx-auto max-w-2xl">
              <Search className="absolute left-0 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by formula (e.g., ErAgV)..."
                className="w-full border-0 border-b-2 border-slate-200 bg-transparent py-3 pl-8 pr-4 text-lg text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-0"
              />
            </div>

            {/* Filter Ribbon - Desktop */}
            <div className="mt-8 hidden items-center justify-center gap-3 md:flex">
              <FilterDropdown
                label="Rare Earth"
                options={rareEarthElements}
                value={elementFilter}
                onChange={setElementFilter}
              />
              <FilterDropdown
                label="Symmetry"
                options={symmetryGroups}
                value={symmetryFilter}
                onChange={setSymmetryFilter}
              />
              <FilterDropdown
                label="Energy Range"
                options={energyRanges}
                value={energyFilter}
                onChange={setEnergyFilter}
              />

              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                >
                  <X className="size-4" />
                  Clear filters
                </button>
              )}
            </div>

            {/* Filter Button - Mobile */}
            <div className="mt-6 flex justify-center md:hidden">
              <Button
                variant="outline"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="gap-2"
              >
                <Filter className="size-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="flex size-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </div>

            {/* Mobile Filters Panel */}
            {showMobileFilters && (
              <div className="mt-4 flex flex-wrap justify-center gap-2 md:hidden">
                <FilterDropdown
                  label="Rare Earth"
                  options={rareEarthElements}
                  value={elementFilter}
                  onChange={setElementFilter}
                />
                <FilterDropdown
                  label="Symmetry"
                  options={symmetryGroups}
                  value={symmetryFilter}
                  onChange={setSymmetryFilter}
                />
                <FilterDropdown
                  label="Energy Range"
                  options={energyRanges}
                  value={energyFilter}
                  onChange={setEnergyFilter}
                />
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Results Count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-medium text-slate-700">
                {filteredMaterials.length}
              </span>{" "}
              materials
            </p>
          </div>

          {/* Materials Grid */}
          {filteredMaterials.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredMaterials.map((material) => (
                <MaterialCard key={material.id} material={material} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white py-16">
              <Database className="size-10 text-slate-300" />
              <h3 className="mt-4 text-lg font-medium text-slate-900">
                No materials found
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Try adjusting your search or filter criteria
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                className="mt-4"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Status Bar */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Database className="size-3.5" />
              <span>Database Status:</span>
              <span className="font-medium text-slate-700">
                1,240 Materials Indexed
              </span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Clock className="size-3.5" />
            <span>Query Time:</span>
            <span className="font-medium text-slate-700">12ms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
