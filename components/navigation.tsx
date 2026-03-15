"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Atom } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getNavLinkClass = (path: string) => {
    const isActive =
      mounted && (path === "/" ? pathname === "/" : pathname.startsWith(path));
    return `text-sm font-medium transition-colors ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
              <Atom className="size-5 text-primary" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-foreground">
              Rare Earth Database
            </span>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/admin" className={getNavLinkClass("/admin")}>
              Database Manager
            </Link>
            <Link href="/materials" className={getNavLinkClass("/materials")}>
              Material Explorer
            </Link>
            <Link href="/lab" className={getNavLinkClass("/lab")}>
              ML Training Hub
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="#contact"
            className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            Contact
          </Link>
          <Button size="sm" asChild>
            <Link href="/login">Verify Team Access</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
