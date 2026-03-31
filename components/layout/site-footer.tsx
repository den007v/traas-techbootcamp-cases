export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} TraaS x Tech Bootcamp</p>
        <p className="text-xs text-slate-500">Built with Next.js, Tailwind, Supabase-ready architecture</p>
      </div>
    </footer>
  );
}
