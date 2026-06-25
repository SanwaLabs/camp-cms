import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ProgramTimeTab } from "@/lib/types";

export function ProgramsTabNav({ activeTab }: { activeTab: ProgramTimeTab }) {
  const tabs: { id: ProgramTimeTab; label: string }[] = [
    { id: "past", label: "Past" },
    { id: "present", label: "Present" },
    { id: "future", label: "Future" },
  ];

  return (
    <nav
      aria-label="Program time views"
      className="mb-6 inline-flex rounded-xl border border-border bg-slate-50 p-1"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <Link
            key={tab.id}
            href={`/programs?tab=${tab.id}`}
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
