import Link from "next/link";
import { cn } from "@/lib/utils";

export type ReportsTab = "tables" | "ai";

export function ReportsTabNav({ activeTab }: { activeTab: ReportsTab }) {
  const tabs: { id: ReportsTab; label: string }[] = [
    { id: "tables", label: "Data tables" },
    { id: "ai", label: "AI advisor" },
  ];

  return (
    <nav
      aria-label="Reports views"
      className="mb-6 inline-flex rounded-xl border border-border bg-slate-50 p-1"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <Link
            key={tab.id}
            href={`/reports?tab=${tab.id}`}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "rounded-lg px-4 py-2 text-sm transition",
              isActive
                ? "bg-white font-semibold text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
