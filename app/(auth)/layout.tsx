import type { ReactNode } from "react";
import { AuroraBackground } from "@/components/backgrounds/aurora-background";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <AuroraBackground />
      <div className="relative">{children}</div>
    </div>
  );
}
