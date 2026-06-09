import Link from "next/link";
import {
  ClipboardCheck,
  FileBarChart,
  Home,
  LifeBuoy,
  PieChart,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

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

export function AppSidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-border bg-white/80 p-6 lg:block">
      <Link href="/dashboard" className="block">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          SanwaLabs
        </p>
        <h1 className="mt-2 text-2xl font-bold text-foreground">
          Youth Ops Platform
        </h1>
      </Link>

      <nav className="mt-10 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-slate-100 hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
