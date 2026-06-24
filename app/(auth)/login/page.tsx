import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getSupabaseBrowserEnv } from "@/lib/supabase/env";
import { signIn } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; redirectTo?: string }>;
}) {
  const params = await searchParams;
  const hasSupabaseEnv = Boolean(getSupabaseBrowserEnv());

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-2xl bg-primary p-3 text-primary-foreground">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Campist
            </p>
            <h1 className="text-2xl font-bold">Sign in to your workspace</h1>
          </div>
        </div>

        {params.error ? (
          <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
            {params.error}
          </div>
        ) : null}

        {!hasSupabaseEnv ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            Supabase environment variables are not configured yet. Continue to
            the product demo while you set up the project keys.
            <Link
              href="/dashboard"
              className="mt-4 inline-flex font-semibold text-amber-900 underline"
            >
              Open demo dashboard
            </Link>
          </div>
        ) : (
          <form action={signIn} className="space-y-4">
            <input
              type="hidden"
              name="redirectTo"
              value={params.redirectTo ?? "/dashboard"}
            />
            <label className="block text-sm font-medium">
              Email
              <input
                required
                name="email"
                type="email"
                className="mt-2 w-full rounded-xl border-border"
                placeholder="manager@example.org"
              />
            </label>
            <label className="block text-sm font-medium">
              Password
              <input
                required
                name="password"
                type="password"
                className="mt-2 w-full rounded-xl border-border"
              />
            </label>
            <Button className="w-full" type="submit">
              Sign in
            </Button>
          </form>
        )}
      </Card>
    </main>
  );
}
