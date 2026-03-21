"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Atom,
  ExternalLink,
  Beaker,
  Cpu,
  Sparkles,
  Network,
  ArrowLeft,
  Search,
  Filter
} from "lucide-react";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function ColabIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.941 4.976a7.033 7.033 0 0 0-4.93-2.064 7.033 7.033 0 0 0-4.93 2.064 6.9 6.9 0 0 0-2.057 4.9 6.9 6.9 0 0 0 2.057 4.9l4.93 4.89 4.93-4.89a6.9 6.9 0 0 0 2.057-4.9 6.9 6.9 0 0 0-2.057-4.9zm-4.93 8.038a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4z" />
    </svg>
  );
}

type ModelCard = {
  id: string;
  name: string;
  version: string;
  description: string;
  icon: React.ReactNode;
  colabUrl: string;
  githubUrl: string;
  status: "stable" | "beta" | "experimental";
};

const mlModels: ModelCard[] = [
  {
    id: "cfnn",
    name: "Crystal Field Neural Network",
    version: "v2.4.1",
    description: "Predicts crystal field parameters from structural data using deep learning with attention mechanisms.",
    icon: <Network className="size-5" />,
    colabUrl: "https://colab.research.google.com/",
    githubUrl: "https://github.com/",
    status: "stable",
  },
  {
    id: "mag-predictor",
    name: "Magnetic Property Predictor",
    version: "v1.8.0",
    description: "Estimates magnetic susceptibility and ordering temperatures from composition and structure.",
    icon: <Sparkles className="size-5" />,
    colabUrl: "https://colab.research.google.com/",
    githubUrl: "https://github.com/",
    status: "stable",
  },
  {
    id: "dos-gen",
    name: "DOS Generator",
    version: "v0.9.2",
    description: "Generates approximate density of states from crystal structure using graph neural networks.",
    icon: <Cpu className="size-5" />,
    colabUrl: "https://colab.research.google.com/",
    githubUrl: "https://github.com/",
    status: "beta",
  },
  {
    id: "structure-opt",
    name: "Structure Optimizer",
    version: "v1.2.0",
    description: "Relaxes crystal structures using machine learning potentials trained on DFT data.",
    icon: <Beaker className="size-5" />,
    colabUrl: "https://colab.research.google.com/",
    githubUrl: "https://github.com/",
    status: "stable",
  },
];

export default function LabDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "stable" | "beta" | "experimental">("all");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setAuthError("");
    await new Promise((r) => setTimeout(r, 600));

    if (password.trim()) {
      setIsAuthenticated(true);
    } else {
      setAuthError("Invalid credentials");
    }
    setIsAuthenticating(false);
  };

  const filteredModels = mlModels.filter((model) => {
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || model.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <header className="border-b border-slate-200">
          <div className="mx-auto flex h-12 max-w-5xl items-center px-4">
            <Link href="/" className="flex items-center gap-2 text-slate-900">
              <Atom className="size-4" />
              <span className="text-sm font-medium">Ke Lab</span>
            </Link>
          </div>
        </header>

        <main className="flex flex-1 items-center justify-center p-4">
          <div className="w-full max-w-sm">
            <div className="border border-slate-200 bg-white p-6">
              <div className="mb-5 flex justify-center">
                <div className="flex size-10 items-center justify-center border border-slate-200">
                  <ShieldCheck className="size-4 text-slate-700" />
                </div>
              </div>

              <h1 className="mb-1 text-center text-lg font-medium text-slate-900">
                Ke Lab Research Portal
              </h1>
              <p className="mb-6 text-center text-xs text-slate-500">
                Training & Resource Hub
              </p>

              <form onSubmit={handleAuth} className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-700">
                    Team Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter team password"
                    className="h-9 w-full border border-slate-200 bg-white px-3 font-mono text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
                  />
                  {authError && (
                    <p className="mt-1 text-xs text-red-600">{authError}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="h-9 w-full rounded-none bg-slate-900 text-xs font-medium text-white hover:bg-slate-800"
                  disabled={isAuthenticating}
                >
                  {isAuthenticating ? "Verifying..." : "Verify Team Access"}
                </Button>
              </form>

              <p className="mt-5 text-center text-[10px] leading-relaxed text-slate-400">
                Access restricted to authorized lab personnel.
                <br />
                Contact the PI for credentials.
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700"
              >
                <ArrowLeft className="size-3" />
                Back to Database
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="border-b border-slate-200">
        <div className="mx-auto flex h-12 w-full max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-slate-900">
              <Atom className="size-4" />
              <span className="text-sm font-medium">Ke Lab</span>
            </Link>
            <span className="text-slate-300">|</span>
            <span className="text-xs text-slate-500">Research Portal</span>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-xs text-slate-500 hover:text-slate-700"
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-1 px-6 py-8">
        <aside className="hidden w-64 shrink-0 pr-8 lg:block">
          <div className="sticky top-8 space-y-6">
            <div>
              <div className="mb-3 flex items-center gap-2 text-slate-900">
                <Search className="size-4" />
                <h2 className="text-xs font-semibold uppercase tracking-wider">Search Models</h2>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Crystal Field..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 w-full border border-slate-200 bg-slate-50 px-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2 text-slate-900">
                <Filter className="size-4" />
                <h2 className="text-xs font-semibold uppercase tracking-wider">Status Filter</h2>
              </div>
              <div className="flex flex-col gap-1.5">
                {(["all", "stable", "beta", "experimental"] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`flex items-center justify-between border px-3 py-2 text-left text-xs capitalize transition-colors ${statusFilter === status
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                  >
                    <span>{status}</span>
                    <span className="text-[10px] opacity-60">
                      {status === "all"
                        ? mlModels.length
                        : mlModels.filter(m => m.status === status).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-slate-900">
              ML Models & Training
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Access training notebooks, documentation, and source code for Ke Lab models.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {filteredModels.map((model) => (
              <div
                key={model.id}
                className="flex flex-col border border-slate-200 bg-white p-5 transition-all hover:border-slate-300 hover:shadow-sm"
              >
                <div className="mb-4 flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center bg-slate-50 border border-slate-100 text-slate-700">
                    {model.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      {model.name}
                    </h3>
                    <div className="mt-1.5 flex items-center gap-2.5">
                      <span className="font-mono text-[10px] text-slate-500">
                        {model.version}
                      </span>
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider ${model.status === "stable"
                          ? "text-emerald-600"
                          : model.status === "beta"
                            ? "text-amber-600"
                            : "text-slate-400"
                          }`}
                      >
                        {model.status}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mb-6 flex-1 text-xs leading-relaxed text-slate-600">
                  {model.description}
                </p>

                <div className="mt-auto flex gap-2">
                  <a
                    href={model.colabUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-1.5 border border-slate-200 bg-white py-2.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    <ColabIcon className="size-3.5" />
                    <span>Colab</span>
                  </a>
                  <a
                    href={model.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-1.5 border border-slate-200 bg-slate-900 py-2.5 text-xs font-medium text-white transition-colors hover:bg-slate-800"
                  >
                    <GitHubIcon className="size-3.5" />
                    <span>Source</span>
                  </a>
                </div>
              </div>
            ))}

            {filteredModels.length === 0 && (
              <div className="col-span-full py-12 text-center border border-dashed border-slate-300">
                <p className="text-sm text-slate-500">No models match your search criteria.</p>
                <button
                  onClick={() => { setSearchQuery(""); setStatusFilter("all"); }}
                  className="mt-3 text-xs font-medium text-slate-900 underline underline-offset-2"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

          <div className="mt-12 border-t border-slate-200 pt-8">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-900">
              Lab Resources
            </h2>
            <div className="flex flex-wrap gap-3">
              <a href="#" className="flex items-center gap-2 border border-slate-200 px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50">
                <ExternalLink className="size-3.5 text-slate-400" />
                <span>Documentation Wiki</span>
              </a>
              <a href="#" className="flex items-center gap-2 border border-slate-200 px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50">
                <ExternalLink className="size-3.5 text-slate-400" />
                <span>Training Data</span>
              </a>
              <a href="#" className="flex items-center gap-2 border border-slate-200 px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50">
                <ExternalLink className="size-3.5 text-slate-400" />
                <span>Model Benchmarks</span>
              </a>
            </div>
          </div>
        </main>
      </div>

      <footer className="mt-auto border-t border-slate-200 bg-slate-50/50">
        <div className="mx-auto flex h-12 w-full max-w-7xl items-center justify-between px-6">
          <span className="text-[10px] text-slate-500">Ke Lab Research Portal</span>
          <span className="font-mono text-[10px] text-slate-400">Build 2024.03.14</span>
        </div>
      </footer>
    </div>
  );
}
