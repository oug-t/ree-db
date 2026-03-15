"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Database,
  CloudUpload,
  ShieldCheck,
  Atom,
  FileJson,
  FileSpreadsheet,
  X,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Trash2,
  Download,
  Server,
  Clock,
  Activity,
  Moon,
  Sun,
  ArrowLeft,
} from "lucide-react";

type LogEntry = {
  id: number;
  timestamp: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
};

type FileValidation = {
  name: string;
  size: string;
  type: "json" | "csv";
  status: "pending" | "validating" | "valid" | "invalid";
  records?: number;
  errors?: string[];
};

export default function AdminDashboard() {
  const [isDark, setIsDark] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // File upload state
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<FileValidation | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Database stats
  const [dbStats] = useState({
    totalCompounds: 1247,
    lastUpdated: "2024-03-14 09:32:15 UTC",
    serverHealth: "healthy" as "healthy" | "degraded" | "offline",
  });

  // Toggle dark mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Auto-scroll logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const addLog = useCallback(
    (message: string, type: LogEntry["type"] = "info") => {
      const timestamp = new Date().toLocaleTimeString("en-US", {
        hour12: false,
      });
      setLogs((prev) => [
        ...prev,
        {
          id: Date.now(),
          timestamp,
          message,
          type,
        },
      ]);
    },
    [],
  );

  // Auth handler
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setAuthError("");

    await new Promise((r) => setTimeout(r, 600));

    if (password.trim()) {
      setIsAuthenticated(true);
      addLog("Administrator authenticated successfully", "success");
      addLog("Database connection established", "info");
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

  const processFile = useCallback(
    (file: File) => {
      const ext = file.name.split(".").pop()?.toLowerCase();
      if (ext !== "json" && ext !== "csv") {
        addLog(`Rejected ${file.name}: Invalid file type`, "error");
        return;
      }

      const fileData: FileValidation = {
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        type: ext as "json" | "csv",
        status: "pending",
      };

      setUploadedFile(fileData);
      addLog(`File staged: ${file.name} (${fileData.size})`, "info");
    },
    [addLog],
  );

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
    addLog(`Validating ${uploadedFile.name}...`, "info");

    await new Promise((r) => setTimeout(r, 1200));

    // Simulate validation
    const isValid = Math.random() > 0.2;
    const records = Math.floor(Math.random() * 800) + 200;

    if (isValid) {
      setUploadedFile((prev) =>
        prev
          ? {
              ...prev,
              status: "valid",
              records,
            }
          : null,
      );
      addLog(`Validation passed: ${records} records found`, "success");
    } else {
      setUploadedFile((prev) =>
        prev
          ? {
              ...prev,
              status: "invalid",
              errors: [
                "Missing required field: space_group",
                "Invalid CF parameter format in row 45",
              ],
            }
          : null,
      );
      addLog("Validation failed: Schema errors detected", "error");
    }
  }, [uploadedFile, addLog]);

  const clearStagingArea = useCallback(() => {
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    addLog("Staging area cleared", "info");
  }, [addLog]);

  const runSync = useCallback(async () => {
    if (!uploadedFile || uploadedFile.status !== "valid") return;

    setIsSyncing(true);
    setSyncProgress(0);

    const totalRecords = uploadedFile.records || 500;
    const compounds = ["PrAgAs", "TbAgV0", "NdCu2Si2", "CeRhIn5", "YbRh2Si2"];

    addLog("Starting database sync...", "info");
    addLog(`Target: ${totalRecords} records`, "info");

    for (let i = 0; i <= 100; i += 5) {
      await new Promise((r) => setTimeout(r, 150));
      setSyncProgress(i);

      if (i % 20 === 0 && i > 0) {
        const compound =
          compounds[Math.floor(Math.random() * compounds.length)];
        const inserted = Math.floor((i / 100) * totalRecords);
        addLog(
          `Parsing ${compound}... Inserted ${inserted}/${totalRecords} records`,
          "info",
        );
      }
    }

    addLog("Database sync completed successfully", "success");
    addLog(`Indexed ${totalRecords} compounds`, "success");
    setIsSyncing(false);
    setUploadedFile(null);
  }, [uploadedFile, addLog]);

  const fullRebuild = useCallback(async () => {
    setIsSyncing(true);
    setSyncProgress(0);
    addLog("Initiating full database rebuild...", "warning");
    addLog("Dropping existing tables...", "info");

    for (let i = 0; i <= 100; i += 2) {
      await new Promise((r) => setTimeout(r, 80));
      setSyncProgress(i);

      if (i === 25) addLog("Creating schema...", "info");
      if (i === 50) addLog("Rebuilding indexes...", "info");
      if (i === 75) addLog("Restoring constraints...", "info");
    }

    addLog("Full rebuild completed", "success");
    setIsSyncing(false);
  }, [addLog]);

  const backupData = useCallback(() => {
    addLog("Creating SQL backup...", "info");
    setTimeout(() => {
      addLog("Backup created: rare_earth_db_backup_20240314.sql", "success");
    }, 800);
  }, [addLog]);

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className={`flex min-h-screen flex-col ${isDark ? "dark" : ""}`}>
        <div className="flex min-h-screen flex-col bg-background">
          <header className="border-b border-border/40 bg-card/50 backdrop-blur">
            <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                  <Atom className="size-4 text-primary" />
                </div>
                <span className="font-semibold text-foreground">
                  Rare Earth Database
                </span>
              </Link>
              <button
                onClick={() => setIsDark(!isDark)}
                className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                {isDark ? (
                  <Sun className="size-4" />
                ) : (
                  <Moon className="size-4" />
                )}
              </button>
            </div>
          </header>

          <main className="flex flex-1 items-center justify-center p-4">
            <div className="w-full max-w-sm">
              <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
                <div className="mb-6 flex flex-col items-center">
                  <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10">
                    <ShieldCheck className="size-5 text-primary" />
                  </div>
                  <h1 className="text-xl font-semibold text-foreground">
                    Admin Access
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Database Management Console
                  </p>
                </div>

                <form onSubmit={handleAuth} className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Admin Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter admin password"
                      className="h-10 w-full rounded-lg border border-input bg-background px-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    {authError && (
                      <p className="mt-1.5 text-sm text-destructive">
                        {authError}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="h-10 w-full"
                    disabled={isAuthenticating}
                  >
                    {isAuthenticating ? "Authenticating..." : "Access Console"}
                  </Button>
                </form>

                <div className="mt-4 text-center">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="size-3" />
                    Back to Homepage
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Main dashboard
  return (
    <div className={`flex min-h-screen flex-col ${isDark ? "dark" : ""}`}>
      <div className="flex min-h-screen flex-col bg-background">
        {/* Header */}
        <header className="border-b border-border/40 bg-card/50 backdrop-blur">
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                  <Database className="size-4 text-primary" />
                </div>
                <span className="font-semibold text-foreground">DB Admin</span>
              </Link>
              <span className="hidden text-xs text-muted-foreground sm:inline">
                Database Management Console
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDark(!isDark)}
                className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                {isDark ? (
                  <Sun className="size-4" />
                ) : (
                  <Moon className="size-4" />
                )}
              </button>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl flex-1 p-4 lg:p-6">
          <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
            {/* Left Column - Upload & Controls */}
            <div className="space-y-4 lg:col-span-2 lg:space-y-6">
              {/* Database Stats */}
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Database className="size-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Total Compounds
                    </p>
                    <p className="font-mono text-lg font-semibold text-foreground">
                      {dbStats.totalCompounds.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-accent/10">
                    <Clock className="size-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Last Updated
                    </p>
                    <p className="font-mono text-xs font-medium text-foreground">
                      {dbStats.lastUpdated}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
                  <div
                    className={`flex size-10 items-center justify-center rounded-lg ${
                      dbStats.serverHealth === "healthy"
                        ? "bg-green-500/10"
                        : dbStats.serverHealth === "degraded"
                          ? "bg-yellow-500/10"
                          : "bg-red-500/10"
                    }`}
                  >
                    <Server
                      className={`size-5 ${
                        dbStats.serverHealth === "healthy"
                          ? "text-green-500"
                          : dbStats.serverHealth === "degraded"
                            ? "text-yellow-500"
                            : "text-red-500"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Server Status
                    </p>
                    <p
                      className={`text-sm font-medium capitalize ${
                        dbStats.serverHealth === "healthy"
                          ? "text-green-500"
                          : dbStats.serverHealth === "degraded"
                            ? "text-yellow-500"
                            : "text-red-500"
                      }`}
                    >
                      {dbStats.serverHealth}
                    </p>
                  </div>
                </div>
              </div>

              {/* Upload Zone */}
              <div className="rounded-xl border border-border bg-card">
                <div className="border-b border-border px-4 py-3">
                  <div className="flex items-center gap-2">
                    <CloudUpload className="size-4 text-primary" />
                    <h2 className="font-medium text-foreground">Data Upload</h2>
                  </div>
                </div>

                <div className="p-4">
                  {!uploadedFile ? (
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
                        isDragging
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-muted-foreground"
                      }`}
                    >
                      <div className="mb-3 flex gap-2">
                        <FileJson className="size-8 text-muted-foreground" />
                        <FileSpreadsheet className="size-8 text-muted-foreground" />
                      </div>
                      <p className="mb-1 text-sm font-medium text-foreground">
                        Drop files here or click to browse
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Accepts .json and .csv files
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".json,.csv"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between rounded-lg border border-border bg-muted/50 p-3">
                        <div className="flex items-center gap-3">
                          {uploadedFile.type === "json" ? (
                            <FileJson className="size-8 text-primary" />
                          ) : (
                            <FileSpreadsheet className="size-8 text-accent" />
                          )}
                          <div>
                            <p className="font-mono text-sm font-medium text-foreground">
                              {uploadedFile.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {uploadedFile.size} •{" "}
                              {uploadedFile.type.toUpperCase()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {uploadedFile.status === "valid" && (
                            <CheckCircle2 className="size-5 text-green-500" />
                          )}
                          {uploadedFile.status === "invalid" && (
                            <AlertCircle className="size-5 text-destructive" />
                          )}
                          {uploadedFile.status === "validating" && (
                            <RefreshCw className="size-5 animate-spin text-primary" />
                          )}
                          <button
                            onClick={clearStagingArea}
                            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                          >
                            <X className="size-4" />
                          </button>
                        </div>
                      </div>

                      {uploadedFile.status === "valid" &&
                        uploadedFile.records && (
                          <p className="text-sm text-green-500">
                            Ready to sync: {uploadedFile.records} valid records
                            detected
                          </p>
                        )}

                      {uploadedFile.status === "invalid" &&
                        uploadedFile.errors && (
                          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3">
                            <p className="mb-2 text-sm font-medium text-destructive">
                              Validation Errors:
                            </p>
                            <ul className="space-y-1">
                              {uploadedFile.errors.map((err, i) => (
                                <li
                                  key={i}
                                  className="font-mono text-xs text-destructive/80"
                                >
                                  {err}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                      <div className="flex gap-2">
                        {uploadedFile.status === "pending" && (
                          <Button onClick={validateFile} className="flex-1">
                            <ShieldCheck className="mr-2 size-4" />
                            Validate File
                          </Button>
                        )}
                        {uploadedFile.status === "valid" && (
                          <Button
                            onClick={runSync}
                            disabled={isSyncing}
                            className="flex-1"
                          >
                            <Database className="mr-2 size-4" />
                            Sync to Database
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sync Progress */}
              {isSyncing && (
                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      Sync Progress
                    </span>
                    <span className="font-mono text-sm text-primary">
                      {syncProgress}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-primary transition-all duration-150"
                      style={{ width: `${syncProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Workflow Controls */}
              <div className="rounded-xl border border-border bg-card">
                <div className="border-b border-border px-4 py-3">
                  <h2 className="font-medium text-foreground">
                    Workflow Controls
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2 p-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearStagingArea}
                    disabled={isSyncing}
                  >
                    <Trash2 className="mr-2 size-4" />
                    Clear Staging
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fullRebuild}
                    disabled={isSyncing}
                  >
                    <RefreshCw className="mr-2 size-4" />
                    Full Rebuild
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={backupData}
                    disabled={isSyncing}
                  >
                    <Download className="mr-2 size-4" />
                    Backup SQL
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column - Console Logs */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 rounded-xl border border-border bg-card">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Activity className="size-4 text-primary" />
                    <h2 className="font-medium text-foreground">Console Log</h2>
                  </div>
                  <button
                    onClick={() => setLogs([])}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    Clear
                  </button>
                </div>
                <div className="h-[400px] overflow-y-auto p-3 lg:h-[500px]">
                  {logs.length === 0 ? (
                    <p className="py-8 text-center font-mono text-xs text-muted-foreground">
                      No logs yet...
                    </p>
                  ) : (
                    <div className="space-y-1">
                      {logs.map((log) => (
                        <div
                          key={log.id}
                          className="flex gap-2 font-mono text-xs"
                        >
                          <span className="shrink-0 text-muted-foreground">
                            [{log.timestamp}]
                          </span>
                          <span
                            className={
                              log.type === "success"
                                ? "text-green-500"
                                : log.type === "error"
                                  ? "text-destructive"
                                  : log.type === "warning"
                                    ? "text-yellow-500"
                                    : "text-foreground"
                            }
                          >
                            {log.message}
                          </span>
                        </div>
                      ))}
                      <div ref={logsEndRef} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
