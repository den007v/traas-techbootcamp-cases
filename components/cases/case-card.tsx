import Link from "next/link";
import type { CaseItem } from "@/types/case";

type CaseCardProps = {
  item: CaseItem;
};

export function CaseCard({ item }: CaseCardProps) {
  const trackChipClass = item.track === "traas" ? "chip-traas" : "chip-bootcamp";

  return (
    <article className="surface-card group rounded-2xl p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className={`${trackChipClass} rounded-full px-2 py-1 text-xs`}>{item.topic}</span>
        <span className="chip-base rounded-full px-2 py-1 text-xs">{item.year}</span>
      </div>
      <h3 className="text-lg font-semibold" style={{ color: "var(--color-primary)" }}>{item.title}</h3>
      <p className="mt-1 text-sm text-muted">{item.company}</p>
      <p className="mt-3 text-sm text-muted">{item.shortDescription}</p>
      <p className="chip-base mt-4 rounded-xl p-3 text-sm font-medium">{item.result}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {item.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="chip-base rounded-full px-2 py-1 text-xs">
            #{tag}
          </span>
        ))}
      </div>
      <Link
        className="btn-ghost focusable mt-4 inline-flex rounded-xl px-3 py-2 text-sm transition"
        href={`/cases/${item.slug}`}
      >
        Открыть кейс
      </Link>
    </article>
  );
}
