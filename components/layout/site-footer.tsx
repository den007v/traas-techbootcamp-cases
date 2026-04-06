import { CONTACT_EMAIL } from "@/lib/constants/contact";

export function SiteFooter() {
  return (
    <footer
      className="border-t"
      style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
    >
      <div className="mx-auto max-w-[1120px] px-6 py-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex max-w-md flex-col gap-2">
            <span
              className="text-sm font-semibold"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
            >
              TechBootcamp Alumni
            </span>
            <span className="text-xs leading-relaxed" style={{ color: "var(--color-faint)" }}>
              TraaS × Tech Bootcamp — пространство программ трансформации и практических кейсов.
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-muted)" }}>
              Контакты
            </span>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="focusable text-sm font-medium underline-offset-4 hover:underline"
              style={{ color: "var(--color-primary)" }}
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
        <div className="mt-8 border-t pt-6" style={{ borderColor: "var(--color-divider)" }}>
          <span className="text-xs" style={{ color: "var(--color-faint)" }}>
            © {new Date().getFullYear()} TraaS × Tech Bootcamp
          </span>
        </div>
      </div>
    </footer>
  );
}
