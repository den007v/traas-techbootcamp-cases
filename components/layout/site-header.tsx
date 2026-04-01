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
    <header
      className="sticky top-0 z-30 border-b backdrop-blur-md"
      style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
    >
      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-6 px-6 py-0" style={{ height: "64px" }}>
        <Link href="/" className="flex items-center gap-3" aria-label="Банк кейсов TechBootcamp">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="shrink-0">
            <rect width="14" height="14" rx="3" fill="var(--color-primary)" />
            <rect x="18" width="14" height="14" rx="3" fill="var(--color-primary)" opacity="0.4" />
            <rect y="18" width="14" height="14" rx="3" fill="var(--color-primary)" opacity="0.4" />
            <rect x="18" y="18" width="14" height="14" rx="3" fill="var(--color-primary)" />
          </svg>
          <span
            className="text-sm font-extrabold tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
          >
            TechBootcamp<span style={{ color: "var(--color-muted)", fontWeight: 500 }}> Alumni</span>
          </span>
        </Link>

        <MainNav isLoggedIn={isLoggedIn} />
      </div>
    </header>
  );
}
