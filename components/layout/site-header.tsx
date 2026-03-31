import Link from "next/link";
import { MainNav } from "@/components/layout/main-nav";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function SiteHeader() {
  let isLoggedIn = false;

  const supabase = await getSupabaseServerClient();
  if (supabase) {
    const { data: { user } } = await supabase.auth.getUser();
    isLoggedIn = !!user;
  }

  return (
    <header className="sticky top-0 z-30 border-b bg-white/90 backdrop-blur" style={{ borderColor: "var(--color-border)" }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-sm font-semibold tracking-wide" style={{ color: "var(--color-primary)" }}>
          TraaS x Tech Bootcamp Cases
        </Link>
        <MainNav isLoggedIn={isLoggedIn} />
      </div>
    </header>
  );
}
