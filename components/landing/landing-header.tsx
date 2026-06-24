import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";

export function LandingHeader({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  return (
    <header className="sticky top-0 z-10 border-b border-border/60 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
        <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
          Campist
        </Link>

        {isAuthenticated ? (
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-slate-800"
          >
            Go to dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-slate-800"
          >
            <LogIn className="h-4 w-4" />
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}
