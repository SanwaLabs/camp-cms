import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageShell({
  title,
  description,
  actions,
  children,
  className,
}: {
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <main
      className={cn(
        "min-h-screen w-full max-w-full min-w-0 flex-1 px-4 py-6 sm:px-8 lg:px-10",
        className,
      )}
    >
      <div className="mx-auto min-w-0 max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Campist
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
              {title}
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          </div>
          {actions}
        </header>
        {children}
      </div>
    </main>
  );
}
