import Link from "next/link";
import type { CaseItem } from "@/types/case";

type CaseCardProps = {
  item: CaseItem;
};

const trackLabels: Record<string, string> = {
  traas: "TraaS",
  "tech-bootcamp": "Tech Bootcamp",
};

export function CaseCard({ item }: CaseCardProps) {
  const trackChipClass = item.track === "traas" ? "chip-traas" : "chip-bootcamp";

  return (
    <article className="surface-card group flex flex-col rounded-2xl p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className={`${trackChipClass} rounded-full px-2 py-1 text-xs font-medium`}>
          {trackLabels[item.track] ?? item.track}
        </span>
        <span className="chip-base rounded-full px-2 py-1 text-xs">{item.topic}</span>
        <span className="chip-base rounded-full px-2 py-1 text-xs">{item.year}</span>
      </div>

      <h3 className="text-base font-semibold leading-snug" style={{ color: "var(--color-primary)" }}>
        {item.title}
      </h3>

      <p className="mt-1 text-xs text-muted">
        {item.company}
        {item.authorName && (
          <>
            {" · "}
            {item.authorName}
            {item.authorRole && (
              <span className="opacity-70">, {item.authorRole}</span>
            )}
          </>
        )}
      </p>

      <p className="mt-3 text-sm text-muted line-clamp-3">{item.shortDescription}</p>

      <div className="result-highlight mt-4">↗ {item.result}</div>

      {item.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="chip-base rounded-full px-2 py-1 text-xs">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex-1 flex items-end">
        <Link
          href={`/cases/${item.slug}`}
          className="focusable text-xs font-medium underline decoration-dotted underline-offset-4 transition hover:opacity-80"
          style={{ color: "var(--color-cta)" }}
        >
          Подробнее →
        </Link>
      </div>
    </article>
  );
}
