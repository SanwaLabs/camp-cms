import { Play } from "lucide-react";
import { Card } from "@/components/ui/card";

export function VideoWalkthrough({ videoId }: { videoId?: string }) {
  return (
    <section id="walkthrough" className="scroll-mt-24">
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Product walkthrough
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
          See Campist in action
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          A quick tour of how facilitators and managers stay aligned across
          groups, instructors, and support teams throughout a busy camp day.
        </p>
      </div>

      {videoId ? (
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          <div className="relative aspect-video w-full">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Campist product walkthrough"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      ) : (
        <Card className="flex aspect-video flex-col items-center justify-center border-dashed bg-white/60 text-center">
          <div className="rounded-full bg-muted p-5">
            <Play className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="mt-5 text-lg font-semibold text-foreground">
            Walkthrough coming soon
          </p>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            A video tour of Campist will appear here once it&apos;s ready.
          </p>
        </Card>
      )}
    </section>
  );
}
