import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { PageShell } from "@/components/page-shell";
import { getStaffProfiles } from "@/lib/data/staff";

export default async function NewIncidentPage() {
  const staffProfiles = await getStaffProfiles();
  return (
    <PageShell
      title="Log incident"
      description="Fast incident intake for site leads and managers, designed to capture required follow-up in under three minutes."
    >
      <Card>
        <CardHeader
          title="Incident details"
          description="Submissions will write to Supabase after the manually managed tables and RLS policies are available."
        />
        <form className="grid gap-4 lg:grid-cols-2">
          <label className="block text-sm font-medium">
            Title
            <input className="mt-2 w-full rounded-xl border-border" />
          </label>
          <label className="block text-sm font-medium">
            Site
            <input className="mt-2 w-full rounded-xl border-border" />
          </label>
          <label className="block text-sm font-medium">
            Severity
            <select className="mt-2 w-full rounded-xl border-border">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </label>
          <label className="block text-sm font-medium">
            Occurred at
            <input
              className="mt-2 w-full rounded-xl border-border"
              type="datetime-local"
            />
          </label>
          <label className="block text-sm font-medium lg:col-span-2">
            Involved staff
            <select className="mt-2 w-full rounded-xl border-border" multiple>
              {staffProfiles.map((staff) => (
                <option key={staff.id}>{staff.fullName}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium lg:col-span-2">
            Description
            <textarea className="mt-2 w-full rounded-xl border-border" rows={5} />
          </label>
          <label className="block text-sm font-medium">
            Follow-up owner
            <input className="mt-2 w-full rounded-xl border-border" />
          </label>
          <label className="block text-sm font-medium">
            Follow-up due
            <input className="mt-2 w-full rounded-xl border-border" type="date" />
          </label>
          <label className="block text-sm font-medium lg:col-span-2">
            Internal notes
            <textarea className="mt-2 w-full rounded-xl border-border" rows={4} />
          </label>
          <label className="block text-sm font-medium lg:col-span-2">
            Attachments
            <input className="mt-2 w-full rounded-xl border-border" type="file" multiple />
          </label>
          <div className="lg:col-span-2">
            <Button type="button" disabled>
              Save after Supabase table is connected
            </Button>
          </div>
        </form>
      </Card>
    </PageShell>
  );
}
