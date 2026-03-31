import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseBySlug } from "@/lib/cases/queries";

type CasePageProps = {
  params: Promise<{ slug: string }>;
};

const trackLabels: Record<string, string> = {
  traas: "TraaS",
  "tech-bootcamp": "Tech Bootcamp",
};

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const item = await getCaseBySlug(slug);

  if (!item) notFound();

  const trackChipClass = item.track === "traas" ? "chip-traas" : "chip-bootcamp";
  const backHref = item.track === "traas" ? "/cases/traas" : "/cases/tech-bootcamp";
  const hasNarrative = item.challenge || item.solution || item.fullStory;

  return (
    <article className="space-y-6">
      <Link
        href={backHref}
        className="btn-ghost focusable inline-flex rounded-full px-3 py-1 text-sm"
      >
        ← {trackLabels[item.track] ?? item.track}
      </Link>

      <header className="surface-card rounded-3xl p-6 shadow-sm">
        <div className="mb-3 flex flex-wrap gap-2">
          <span className={`${trackChipClass} rounded-full px-2 py-1 text-xs font-medium`}>
            {trackLabels[item.track] ?? item.track}
          </span>
          <span className="chip-base rounded-full px-2 py-1 text-xs">{item.topic}</span>
          <span className="chip-base rounded-full px-2 py-1 text-xs">{item.year}</span>
        </div>

        <h1 className="text-2xl font-semibold leading-snug" style={{ color: "var(--color-primary)" }}>
          {item.title}
        </h1>

        <p className="mt-2 text-sm text-muted">
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

        <p className="mt-4 text-base leading-relaxed text-muted">{item.shortDescription}</p>
      </header>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="space-y-5 md:col-span-2">
          {hasNarrative ? (
            <>
              {item.challenge && (
                <section className="surface-card rounded-2xl p-5 shadow-sm">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
                    Проблема
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--color-text)" }}>
                    {item.challenge}
                  </p>
                </section>
              )}
              {item.solution && (
                <section className="surface-card rounded-2xl p-5 shadow-sm">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
                    Решение
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--color-text)" }}>
                    {item.solution}
                  </p>
                </section>
              )}
              {item.fullStory && (
                <section className="surface-card rounded-2xl p-5 shadow-sm">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
                    Подробнее
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--color-text)" }}>
                    {item.fullStory}
                  </p>
                </section>
              )}
            </>
          ) : (
            <section className="surface-card rounded-2xl p-5 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
                О кейсе
              </h2>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--color-text)" }}>
                {item.shortDescription}
              </p>
            </section>
          )}
        </div>

        <aside className="surface-card self-start rounded-2xl p-5 shadow-sm">
          <div className="space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Результат</p>
              <div className="result-highlight mt-2">↗ {item.result}</div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Компания</p>
              <p className="mt-1 text-sm" style={{ color: "var(--color-primary)" }}>{item.company}</p>
            </div>

            {item.authorName && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">Автор</p>
                <p className="mt-1 text-sm" style={{ color: "var(--color-primary)" }}>
                  {item.authorName}
                  {item.authorRole && (
                    <span className="block text-xs text-muted">{item.authorRole}</span>
                  )}
                </p>
              </div>
            )}

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Год</p>
              <p className="mt-1 text-sm" style={{ color: "var(--color-primary)" }}>{item.year}</p>
            </div>

            {item.tags.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">Теги</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span key={tag} className="chip-base rounded-full px-2 py-1 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </article>
  );
}
