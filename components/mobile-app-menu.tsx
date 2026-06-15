"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  Building2,
  ChevronDown,
  ClipboardCheck,
  FileBarChart,
  Home,
  LifeBuoy,
  LogOut,
  Menu,
  PieChart,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

type AccountSummary = {
  email: string;
  fullName: string | null;
  organizationName: string;
  isAuthenticated: boolean;
};

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/staff", label: "Staff", icon: Users },
  { href: "/incidents", label: "Incidents", icon: LifeBuoy },
  { href: "/evaluations", label: "Evaluations", icon: ClipboardCheck },
  { href: "/surveys", label: "Surveys", icon: FileBarChart },
  { href: "/ai", label: "AI Assistant", icon: Sparkles },
  { href: "/reports", label: "Reports", icon: PieChart },
  { href: "/settings", label: "Controls", icon: ShieldCheck },
];

export function MobileAppMenu({ account }: { account: AccountSummary }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  function closeMenu() {
    detailsRef.current?.removeAttribute("open");
  }

  return (
    <header className="border-b border-border bg-white/90 px-4 py-4 lg:hidden">
      <div className="flex items-center justify-between gap-4">
        <Link href="/dashboard" className="min-w-0" onClick={closeMenu}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            SanwaLabs
          </p>
          <h1 className="truncate text-lg font-bold text-foreground">
            Youth Ops Platform
          </h1>
        </Link>

        <details ref={detailsRef} className="group relative">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-xl border border-border bg-white px-3 py-2 text-sm font-semibold shadow-sm [&::-webkit-details-marker]:hidden">
            <Menu className="h-4 w-4" />
            Menu
            <ChevronDown className="h-4 w-4 text-muted-foreground transition group-open:rotate-180" />
          </summary>

          <div className="absolute right-0 z-10 mt-2 w-72 rounded-2xl border border-border bg-white p-3 shadow-soft">
            <div className="mb-3 rounded-xl bg-slate-50 p-3">
              <p className="truncate text-sm font-semibold text-foreground">
                {account.fullName ?? account.email}
              </p>
              <p className="mt-1 flex items-center gap-1 truncate text-xs text-muted-foreground">
                <Building2 className="h-3 w-3 shrink-0" />
                {account.organizationName}
              </p>
            </div>

            <nav className="space-y-1 border-t border-border pt-3">
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

            <div className="mt-3 border-t border-border pt-3">
              {account.isAuthenticated ? (
                <Link
                  href="/logout"
                  onClick={closeMenu}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-foreground transition hover:bg-slate-100"
                >
                  <LogOut className="h-4 w-4" />
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
