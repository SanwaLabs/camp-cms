import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { PageShell } from "@/components/page-shell";

export default function NewStaffPage() {
  return (
    <PageShell
      title="Add staff profile"
      description="Create a facilitator record with role, status, contact details, background check state, and initial notes."
    >
      <Card>
        <CardHeader
          title="Profile details"
          description="This form is ready to connect to Supabase once the manual schema is applied."
        />
        <form className="grid gap-4 md:grid-cols-2">
          {[
            ["Full name", "text"],
            ["Email", "email"],
            ["Phone", "tel"],
            ["Site", "text"],
            ["Role", "text"],
            ["Background check status", "text"],
          ].map(([label, type]) => (
            <label key={label} className="block text-sm font-medium">
              {label}
              <input className="mt-2 w-full rounded-xl border-border" type={type} />
            </label>
          ))}
          <label className="block text-sm font-medium md:col-span-2">
            Notes
            <textarea className="mt-2 w-full rounded-xl border-border" rows={5} />
          </label>
          <div className="md:col-span-2">
            <Button type="button" disabled>
              Save after Supabase table is connected
            </Button>
          </div>
        </form>
      </Card>
    </PageShell>
  );
}
