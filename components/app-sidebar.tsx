import Link from "next/link";
import {
  Building2,
  ChevronDown,
  ClipboardCheck,
  FileBarChart,
  Home,
  LifeBuoy,
  LogOut,
  PieChart,
  ShieldCheck,
  Sparkles,
  UserCircle,
  Users,
} from "lucide-react";
import { MobileAppMenu } from "@/components/mobile-app-menu";
import { createClient } from "@/lib/supabase/server";

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

type AccountSummary = {
  email: string;
  fullName: string | null;
  organizationName: string;
  isAuthenticated: boolean;
};

async function getAccountSummary(): Promise<AccountSummary> {
  const supabase = await createClient();

  if (!supabase) {
    return {
      email: "Demo mode",
      fullName: null,
      organizationName: "Demo organization",
      isAuthenticated: false,
    };
  }

  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (!claims?.sub) {
    return {
      email: "Not signed in",
      fullName: null,
      organizationName: "No organization",
      isAuthenticated: false,
    };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, organization_id")
    .eq("id", claims.sub)
    .maybeSingle();

  let organizationName = "No organization assigned";

  if (profile?.organization_id) {
    const { data: organization } = await supabase
      .from("organizations")
      .select("name")
      .eq("id", profile.organization_id)
      .maybeSingle();

    organizationName = organization?.name ?? organizationName;
  }

  return {
    email: claims.email ?? "Signed-in user",
    fullName: profile?.full_name ?? null,
    organizationName,
    isAuthenticated: true,
  };
}

export async function AppSidebar() {
  const account = await getAccountSummary();

  return (
    <>
      <MobileAppMenu account={account} />

      <aside className="hidden min-h-screen w-72 shrink-0 flex-col border-r border-border bg-white/80 p-6 lg:flex">
        <div>
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
                  prefetch={false}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-slate-100 hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <details className="group mt-auto rounded-2xl border border-border bg-white p-3 shadow-sm">
          <summary className="flex cursor-pointer list-none items-center gap-3 [&::-webkit-details-marker]:hidden">
            <div className="rounded-xl bg-slate-100 p-2 text-muted-foreground">
              <UserCircle className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">
                {account.fullName ?? account.email}
              </p>
              <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-muted-foreground">
                <Building2 className="h-3 w-3 shrink-0" />
                {account.organizationName}
              </p>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground transition group-open:rotate-180" />
          </summary>

          <div className="mt-3 border-t border-border pt-3">
            {account.fullName ? (
              <p className="mb-3 truncate text-xs text-muted-foreground">
                {account.email}
              </p>
            ) : null}
            {account.isAuthenticated ? (
              <Link
                href="/logout"
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-foreground transition hover:bg-slate-100"
              >
                <LogOut className="h-4 w-4" />
                Sign in
              </Link>
            )}
          </div>
        </details>
      </aside>
    </>
  );
}
