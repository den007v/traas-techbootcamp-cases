import Link from "next/link";
import { resolveCaseCoverUrl } from "@/lib/cases/cover-fallback";
import type { CaseItem } from "@/types/case";

type CaseCardProps = {
  item: CaseItem;
};

function teamLine(item: CaseItem): string {
  const name = item.authorName?.trim();
  const company = item.company?.trim();
  if (name && company) return `${name} · ${company}`;
  if (name) return name;
  return company || "Команда проекта";
}

export function CaseCard({ item }: CaseCardProps) {
  const coverSrc = resolveCaseCoverUrl(item);

  return (
    <article
      className="surface-card hover-lift flex h-full flex-col overflow-hidden rounded-[1.35rem]"
      style={{
        transition:
          "box-shadow var(--transition-ui), border-color var(--transition-ui), transform var(--transition-ui)",
      }}
    >
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-[var(--color-surface-offset)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={coverSrc} alt="" className="h-full w-full object-cover" loading="lazy" />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="chip-base rounded-full px-3 py-1 text-xs font-semibold">
                {tag}
              </span>
            ))}
          </div>
        )}

        <h3
          className="text-xl font-semibold leading-snug md:text-2xl"
          style={{
            color: "var(--color-text)",
          }}
        >
          {item.title}
        </h3>

        <p className="text-sm leading-relaxed line-clamp-3" style={{ color: "var(--color-muted)", flex: 1 }}>
          {item.shortDescription}
        </p>

        <div className="result-highlight" style={{ borderLeft: "2px solid var(--color-primary)" }}>
          <span>{item.result}</span>
        </div>

        <div
          className="flex flex-wrap items-end justify-between gap-4 pt-2"
          style={{ borderTop: "1px solid var(--color-divider)", marginTop: "auto" }}
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--color-faint)" }}>
              Команда
            </p>
            <p className="mt-1 text-sm font-medium" style={{ color: "var(--color-text)" }}>
              {teamLine(item)}
            </p>
          </div>

          <Link
            href={`/cases/${item.slug}`}
            className="focusable shrink-0 text-sm font-semibold transition hover:opacity-70"
            style={{ color: "var(--color-primary)" }}
          >
            Смотреть кейс
          </Link>
        </div>
      </div>
    </article>
  );
}
