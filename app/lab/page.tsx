"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Database,
  CloudUpload,
  ShieldCheck,
  Atom,
  FileJson,
  X,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  Beaker,
  Cpu,
  Sparkles,
  Network,
  ArrowLeft,
} from "lucide-react";

// Custom icons for external services
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

type FileValidation = {
  name: string;
  size: string;
  status: "pending" | "validating" | "valid" | "invalid";
  records?: number;
};

const mlModels: ModelCard[] = [
  {
    id: "cfnn",
    name: "Crystal Field Neural Network",
    version: "v2.4.1",
    description:
      "Predicts crystal field parameters from structural data using deep learning with attention mechanisms.",
    icon: <Network className="size-5" />,
    colabUrl: "https://colab.research.google.com/",
    githubUrl: "https://github.com/",
    status: "stable",
  },
  {
    id: "mag-predictor",
    name: "Magnetic Property Predictor",
    version: "v1.8.0",
    description:
      "Estimates magnetic susceptibility and ordering temperatures from composition and structure.",
    icon: <Sparkles className="size-5" />,
    colabUrl: "https://colab.research.google.com/",
    githubUrl: "https://github.com/",
    status: "stable",
  },
  {
    id: "dos-gen",
    name: "DOS Generator",
    version: "v0.9.2",
    description:
      "Generates approximate density of states from crystal structure using graph neural networks.",
    icon: <Cpu className="size-5" />,
    colabUrl: "https://colab.research.google.com/",
    githubUrl: "https://github.com/",
    status: "beta",
  },
  {
    id: "structure-opt",
    name: "Structure Optimizer",
    version: "v1.2.0",
    description:
      "Relaxes crystal structures using machine learning potentials trained on DFT data.",
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

  // File upload state
  const [uploadedFile, setUploadedFile] = useState<FileValidation | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auth handler
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

  // File handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = useCallback((file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (ext !== "json") return;

    setUploadedFile({
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      status: "pending",
    });
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile],
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile],
  );

  const validateFile = useCallback(async () => {
    if (!uploadedFile) return;

    setUploadedFile((prev) =>
      prev ? { ...prev, status: "validating" } : null,
    );
    await new Promise((r) => setTimeout(r, 1200));

    const records = Math.floor(Math.random() * 500) + 100;
    setUploadedFile((prev) =>
      prev ? { ...prev, status: "valid", records } : null,
    );
  }, [uploadedFile]);

  const clearFile = useCallback(() => {
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  // Authentication Gate
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        {/* Minimal Header */}
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
              {/* Lock Icon */}
              <div className="mb-5 flex justify-center">
                <div className="flex size-10 items-center justify-center border border-slate-200">
                  <ShieldCheck className="size-4 text-slate-700" />
                </div>
              </div>

              {/* Title */}
              <h1 className="mb-1 text-center text-lg font-medium text-slate-900">
                Ke Lab Research Portal
              </h1>
              <p className="mb-6 text-center text-xs text-slate-500">
                Training & Resource Hub
              </p>

              {/* Login Form */}
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

              {/* Footer Note */}
              <p className="mt-5 text-center text-[10px] leading-relaxed text-slate-400">
                Access restricted to authorized lab personnel.
                <br />
                Contact the PI for credentials.
              </p>
            </div>

            {/* Back Link */}
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

  // Main Dashboard
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="border-b border-slate-200">
        <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4">
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

      <div className="flex flex-1">
        {/* Sidebar - Database Management */}
        <aside className="hidden w-64 border-r border-slate-200 bg-slate-50/50 lg:block">
          <div className="p-4">
            <div className="mb-4 flex items-center gap-2">
              <Database className="size-4 text-slate-600" />
              <h2 className="text-xs font-medium uppercase tracking-wider text-slate-600">
                Database Management
              </h2>
            </div>

            {/* Data Upload Zone */}
            <div className="border border-slate-200 bg-white p-3">
              <div className="mb-3 flex items-center gap-2">
                <CloudUpload className="size-3.5 text-slate-500" />
                <span className="text-xs font-medium text-slate-700">
                  Data Upload
                </span>
              </div>

              {!uploadedFile ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex cursor-pointer flex-col items-center justify-center border border-dashed p-4 transition-colors ${
                    isDragging
                      ? "border-slate-400 bg-slate-50"
                      : "border-slate-300 hover:border-slate-400"
                  }`}
                >
                  <FileJson className="mb-2 size-6 text-slate-400" />
                  <p className="text-[10px] text-slate-500">
                    Drop .json file here
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between border border-slate-200 bg-slate-50 p-2">
                    <div className="flex items-center gap-2">
                      <FileJson className="size-4 text-slate-600" />
                      <div>
                        <p className="font-mono text-[10px] font-medium text-slate-700">
                          {uploadedFile.name}
                        </p>
                        <p className="font-mono text-[9px] text-slate-400">
                          {uploadedFile.size}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={clearFile}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>

                  {uploadedFile.status === "valid" && (
                    <div className="flex items-center gap-1.5 text-[10px] text-green-600">
                      <CheckCircle2 className="size-3" />
                      <span>{uploadedFile.records} records validated</span>
                    </div>
                  )}

                  {uploadedFile.status === "pending" && (
                    <button
                      onClick={validateFile}
                      className="h-7 w-full border border-slate-200 bg-white text-[10px] font-medium text-slate-600 hover:bg-slate-50"
                    >
                      Validate File
                    </button>
                  )}

                  {uploadedFile.status === "validating" && (
                    <div className="flex h-7 items-center justify-center gap-1.5 text-[10px] text-slate-500">
                      <RefreshCw className="size-3 animate-spin" />
                      <span>Validating...</span>
                    </div>
                  )}

                  {uploadedFile.status === "valid" && (
                    <button className="h-7 w-full bg-slate-900 text-[10px] font-medium text-white hover:bg-slate-800">
                      Commit to Database
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-100 py-2">
                <span className="text-[10px] text-slate-500">
                  Total Compounds
                </span>
                <span className="font-mono text-xs font-medium text-slate-700">
                  1,247
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 py-2">
                <span className="text-[10px] text-slate-500">Last Updated</span>
                <span className="font-mono text-[10px] text-slate-600">
                  2024-03-14
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[10px] text-slate-500">
                  Server Status
                </span>
                <span className="flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-green-500" />
                  <span className="text-[10px] text-green-600">Online</span>
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content - Model Cards */}
        <main className="flex-1 p-6">
          <div className="mx-auto max-w-4xl">
            {/* Section Header */}
            <div className="mb-6">
              <h1 className="text-lg font-medium text-slate-900">
                ML Models & Training Resources
              </h1>
              <p className="mt-1 text-xs text-slate-500">
                Access training notebooks and source code for Ke Lab machine
                learning models
              </p>
            </div>

            {/* Model Cards Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {mlModels.map((model) => (
                <div
                  key={model.id}
                  className="border border-slate-200 bg-white p-4 transition-colors hover:border-slate-300"
                >
                  {/* Card Header */}
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-8 items-center justify-center border border-slate-200 text-slate-600">
                        {model.icon}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-slate-900">
                          {model.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-slate-500">
                            {model.version}
                          </span>
                          <span
                            className={`text-[9px] font-medium uppercase tracking-wider ${
                              model.status === "stable"
                                ? "text-green-600"
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
                  </div>

                  {/* Description */}
                  <p className="mb-4 text-xs leading-relaxed text-slate-600">
                    {model.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <a
                      href={model.colabUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-1.5 border border-slate-200 bg-white py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      <ColabIcon className="size-3.5" />
                      <span>Launch in Colab</span>
                      <ExternalLink className="size-2.5 text-slate-400" />
                    </a>
                    <a
                      href={model.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-1.5 border border-slate-200 bg-white py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      <GitHubIcon className="size-3.5" />
                      <span>Source Code</span>
                      <ExternalLink className="size-2.5 text-slate-400" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Resources */}
            <div className="mt-8 border-t border-slate-200 pt-6">
              <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-500">
                Additional Resources
              </h2>
              <div className="grid gap-3 sm:grid-cols-3">
                <a
                  href="#"
                  className="flex items-center gap-2 border border-slate-200 p-3 text-xs text-slate-600 hover:border-slate-300"
                >
                  <ExternalLink className="size-3.5 text-slate-400" />
                  <span>Documentation Wiki</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 border border-slate-200 p-3 text-xs text-slate-600 hover:border-slate-300"
                >
                  <ExternalLink className="size-3.5 text-slate-400" />
                  <span>Training Data Repository</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 border border-slate-200 p-3 text-xs text-slate-600 hover:border-slate-300"
                >
                  <ExternalLink className="size-3.5 text-slate-400" />
                  <span>Model Benchmarks</span>
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50/50">
        <div className="mx-auto flex h-10 max-w-6xl items-center justify-between px-4">
          <span className="text-[10px] text-slate-400">
            Ke Lab Research Portal
          </span>
          <span className="font-mono text-[10px] text-slate-400">
            Build 2024.03.14
          </span>
        </div>
      </footer>
    </div>
  );
}
