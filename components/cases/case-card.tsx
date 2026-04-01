import Link from "next/link";
import type { CaseItem } from "@/types/case";

type CaseCardProps = {
  item: CaseItem;
};

function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function CaseCard({ item }: CaseCardProps) {
  return (
    <article
      className="surface-card hover-lift flex h-full flex-col gap-4 rounded-[1.25rem] p-6"
      style={{
        transition: "box-shadow var(--transition-ui), border-color var(--transition-ui), transform var(--transition-ui)",
      }}
    >
      {/* Tags */}
      {item.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {item.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="chip-base rounded-full px-3 py-1 text-xs font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h3
        className="text-xl font-semibold leading-snug md:text-2xl"
        style={{
          color: "var(--color-text)",
        }}
      >
        {item.title}
      </h3>

      {/* Result block */}
      <div className="result-highlight" style={{ borderLeft: "2px solid var(--color-primary)" }}>
        <span>{item.result}</span>
      </div>

      {/* Short description */}
      <p className="text-sm leading-relaxed line-clamp-3" style={{ color: "var(--color-muted)", flex: 1 }}>
        {item.shortDescription}
      </p>

      {/* Footer */}
      <div
        className="flex items-center justify-between gap-4 flex-wrap"
        style={{ borderTop: "1px solid var(--color-divider)", paddingTop: "1rem", marginTop: "auto" }}
      >
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className="flex shrink-0 items-center justify-center rounded-full text-xs font-extrabold text-white"
            style={{
              width: "36px",
              height: "36px",
              background: "var(--color-primary)",
              fontFamily: "var(--font-display)",
            }}
            aria-hidden="true"
          >
            {item.authorName ? initials(item.authorName) : initials(item.company)}
          </div>
          <div>
            {item.authorName && (
              <span className="block text-sm font-semibold" style={{ color: "var(--color-text)" }}>
                {item.authorName}
              </span>
            )}
            <span className="block text-xs" style={{ color: "var(--color-muted)" }}>
              {item.company}
            </span>
          </div>
        </div>

        <Link
          href={`/cases/${item.slug}`}
          className="focusable shrink-0 text-sm font-semibold transition hover:opacity-70"
          style={{ color: "var(--color-primary)" }}
        >
          Смотреть кейс
        </Link>
      </div>
    </article>
  );
}
