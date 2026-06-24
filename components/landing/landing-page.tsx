import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Eye,
  LogIn,
  PieChart,
  Users,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHeader } from "@/components/landing/landing-header";
import { VideoWalkthrough } from "@/components/landing/video-walkthrough";

const features = [
  {
    icon: PieChart,
    title: "Managers & facilitators",
    description:
      "Real-time reporting on open incidents, pending evaluations, and staff status — so facilitators can act fast and managers can follow through.",
  },
  {
    icon: Eye,
    title: "Bird's-eye allocation",
    description:
      "See groups, instructors, and staffing gaps at a glance. Allocate support where it's needed before small disconnects become bigger problems.",
  },
  {
    icon: Building2,
    title: "One connected platform",
    description:
      "HR, maintenance, food services, and housing share the same operational picture — no more siloed spreadsheets when the day gets busy.",
  },
  {
    icon: Users,
    title: "Built for camp leadership",
    description:
      "Campist closes the gap between frontline facilitators and higher management, keeping everyone aligned when schedules shift and priorities change.",
  },
];

export function LandingPage({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader isAuthenticated={isAuthenticated} />

      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              For facilitators &amp; managers
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl sm:leading-tight">
              Keep your camp connected when the day gets busy
            </h1>
            <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg">
              Campist is a reporting and operations platform that gives
              leadership a bird&apos;s-eye view of groups and instructors — so
              you can allocate support, spot gaps early, and keep every team
              connected in one place.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-slate-800 sm:w-auto"
                >
                  Go to dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-slate-800 sm:w-auto"
                  >
                    <LogIn className="h-4 w-4" />
                    Sign in
                  </Link>
                  <a
                    href="#walkthrough"
                    className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-white px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-slate-50 sm:w-auto"
                  >
                    Watch walkthrough
                  </a>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-8 sm:pb-24">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Why Campist
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
              Reporting that keeps every team in sync
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              When a camp day moves fast, information gets lost between
              facilitators, site leads, and support staff. Campist brings it
              back together.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <Card key={feature.title}>
                  <div className="mb-4 inline-flex rounded-xl bg-muted p-3">
                    <Icon className="h-5 w-5 text-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-8 sm:pb-24">
          <VideoWalkthrough />
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
