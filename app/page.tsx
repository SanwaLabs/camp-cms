import { LandingPage } from "@/components/landing/landing-page";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  let isAuthenticated = false;

  if (supabase) {
    const { data } = await supabase.auth.getClaims();
    isAuthenticated = Boolean(data?.claims?.sub);
  }

  return <LandingPage isAuthenticated={isAuthenticated} />;
}
