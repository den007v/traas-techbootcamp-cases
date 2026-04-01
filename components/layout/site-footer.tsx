export function SiteFooter() {
  return (
    <footer
      className="border-t"
      style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
    >
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-4 px-6 py-8">
        <div className="flex flex-col gap-1">
          <span
            className="text-sm font-bold"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
          >
            TechBootcamp Alumni
          </span>
          <span className="text-xs" style={{ color: "var(--color-faint)" }}>
            Банк кейсов участников программы. Кейсы отражают личный опыт авторов.
          </span>
        </div>
        <span className="text-xs" style={{ color: "var(--color-faint)" }}>
          © {new Date().getFullYear()} TraaS × Tech Bootcamp
        </span>
      </div>
    </footer>
  );
}
