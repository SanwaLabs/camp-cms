import { LandingPage } from "@/components/landing/landing-page";
import { getYouTubeWalkthroughId } from "@/lib/youtube-walkthrough";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const supabase = await createClient();
  let isAuthenticated = false;

  if (supabase) {
    const { data } = await supabase.auth.getClaims();
    isAuthenticated = Boolean(data?.claims?.sub);
  }

  return (
    <LandingPage
      isAuthenticated={isAuthenticated}
      walkthroughVideoId={getYouTubeWalkthroughId()}
    />
  );
}
