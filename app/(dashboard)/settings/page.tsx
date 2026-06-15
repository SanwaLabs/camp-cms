import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { PageShell } from "@/components/page-shell";
import { roleLabels, rolePermissions } from "@/lib/auth/roles";
import type { UserRole } from "@/lib/types";
import { createClient } from "@/lib/supabase/server";

const roles = Object.keys(roleLabels) as UserRole[];

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data } = supabase ? await supabase.auth.getClaims() : { data: null };
  const claims = data?.claims;

  return (
    <PageShell
      title="Access controls"
      description="Role definitions, session state, audit expectations, and privacy controls for the operations platform."
      actions={
        claims ? (
          <Link
            href="/logout"
            className="inline-flex rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold"
          >
            Sign out
          </Link>
        ) : (
          <Link
            href="/login"
            className="inline-flex rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            Sign in
          </Link>
        )
      }
    >
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <CardHeader
            title="Account state"
            description="Supabase Auth backs production sessions. Demo mode stays open until env vars are configured."
          />
          <div className="space-y-3 text-sm">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="font-medium">Signed-in user</p>
              <p className="mt-1 text-muted-foreground">
                {claims?.email ?? "Demo mode / no Supabase session"}
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="font-medium">Session source</p>
              <p className="mt-1 text-muted-foreground">
                {supabase
                  ? "Supabase Auth is configured"
                  : "Missing Supabase env vars"}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Role matrix"
            description="Product-facing permissions that should be mirrored by Supabase RLS policies."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {roles.map((role) => (
              <div key={role} className="rounded-2xl border border-border p-4">
                <Badge variant={role === "admin" ? "danger" : "info"}>
                  {roleLabels[role]}
                </Badge>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {rolePermissions[role].map((permission) => (
                    <li key={permission}>• {permission}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader
          title="Security defaults"
          description="Operational controls included in the app plan and expected in the manual Supabase setup."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            "RLS on every exposed table",
            "Audit trail for mutations and exports",
            "Restricted background check visibility",
            "Server-only service role operations",
            "Editable review before saving AI output",
            "Storage policies for documents and attachments",
          ].map((item) => (
            <div key={item} className="rounded-xl bg-slate-50 p-4 text-sm">
              {item}
            </div>
          ))}
        </div>
      </Card>
    </PageShell>
  );
}
