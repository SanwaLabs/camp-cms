"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  ChevronDown,
  ClipboardCheck,
  FileBarChart,
  Home,
  LifeBuoy,
  Menu,
  PieChart,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/staff", label: "Staff", icon: Users },
  { href: "/programs", label: "Programs", icon: CalendarDays },
  { href: "/incidents", label: "Incidents", icon: LifeBuoy },
  { href: "/evaluations", label: "Evaluations", icon: ClipboardCheck },
  { href: "/surveys", label: "Surveys", icon: FileBarChart },
  { href: "/ai", label: "AI Assistant", icon: Sparkles },
  { href: "/reports", label: "Reports", icon: PieChart },
  { href: "/settings", label: "Controls", icon: ShieldCheck },
];

export function MobileAppMenu() {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (
        detailsRef.current &&
        !detailsRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-white/90 px-4 py-4 backdrop-blur-sm lg:hidden">
      <div className="flex items-center justify-between gap-4">
        <Link href="/dashboard" className="min-w-0" onClick={closeMenu}>
          <h1 className="truncate text-lg font-bold text-foreground">Campist</h1>
        </Link>

        <details ref={detailsRef} open={open} className="group relative">
          <summary
            className="flex cursor-pointer list-none items-center gap-2 rounded-xl border border-border bg-white px-3 py-2 text-sm font-semibold shadow-sm [&::-webkit-details-marker]:hidden"
            onClick={(event) => {
              event.preventDefault();
              setOpen((current) => !current);
            }}
          >
            <Menu className="h-4 w-4" />
            Menu
            <ChevronDown className="h-4 w-4 text-muted-foreground transition group-open:rotate-180" />
          </summary>

          <div className="absolute right-0 z-50 mt-2 w-72 rounded-2xl border border-border bg-white p-3 shadow-soft">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={false}
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-slate-100 hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
