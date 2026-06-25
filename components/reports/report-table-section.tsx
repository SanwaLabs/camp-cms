import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";

export function ReportTableSection({
  title,
  description,
  rowCount,
  children,
}: {
  title: string;
  description: string;
  rowCount: number;
  children: ReactNode;
}) {
  return (
    <Card>
      <CardHeader
        title={title}
        description={description}
        action={
          <Badge variant="neutral">
            {rowCount} {rowCount === 1 ? "row" : "rows"}
          </Badge>
        }
      />
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[760px] text-left text-sm">{children}</table>
      </div>
    </Card>
  );
}
