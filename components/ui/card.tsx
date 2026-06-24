import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "w-full max-w-full min-w-0 overflow-x-hidden rounded-2xl border border-border bg-card p-4 shadow-soft sm:p-6",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-5 flex min-w-0 flex-col gap-3 md:flex-row md:items-start md:justify-between">
      <div className="min-w-0">
        <h2 className="text-lg font-semibold break-words text-foreground">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm break-words text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
