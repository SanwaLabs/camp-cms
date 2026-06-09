import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { PageShell } from "@/components/page-shell";
import { staffProfiles } from "@/lib/mock-data";

export default function StaffPage() {
  return (
    <PageShell
      title="Staff profiles"
      description="Centralized facilitator records with status, certifications, background checks, sick leave, documents, and notes."
      actions={
        <Link
          href="/staff/new"
          className="inline-flex rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          Add staff
        </Link>
      }
    >
      <Card className="mb-6">
        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <label className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              className="w-full rounded-xl border-border pl-9"
              placeholder="Search by name, site, role, or certification"
            />
          </label>
          <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
        </div>
      </Card>

      <Card>
        <CardHeader
          title="Directory"
          description="MVP list view for active, inactive, seasonal, and alumni staff."
        />
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Site</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Background</th>
                <th className="px-4 py-3">Certification risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-white">
              {staffProfiles.map((staff) => {
                const atRiskCerts = staff.certifications.filter(
                  (cert) => cert.status !== "current",
                );

                return (
                  <tr key={staff.id} className="hover:bg-slate-50">
                    <td className="px-4 py-4">
                      <Link
                        href={`/staff/${staff.id}`}
                        className="font-semibold text-foreground hover:underline"
                      >
                        {staff.fullName}
                      </Link>
                      <p className="text-muted-foreground">{staff.email}</p>
                    </td>
                    <td className="px-4 py-4">{staff.role}</td>
                    <td className="px-4 py-4">{staff.site}</td>
                    <td className="px-4 py-4">
                      <Badge
                        variant={
                          staff.status === "active" ? "success" : "neutral"
                        }
                      >
                        {staff.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <Badge
                        variant={
                          staff.backgroundCheck === "clear"
                            ? "success"
                            : "warning"
                        }
                      >
                        {staff.backgroundCheck}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      {atRiskCerts.length ? (
                        <Badge variant="warning">
                          {atRiskCerts.length} expiring
                        </Badge>
                      ) : (
                        <Badge variant="success">Current</Badge>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </PageShell>
  );
}
