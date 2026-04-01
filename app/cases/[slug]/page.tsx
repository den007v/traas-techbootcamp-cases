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

function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const item = await getCaseBySlug(slug);

  if (!item) notFound();

  const backHref = item.track === "traas" ? "/cases/traas" : "/cases/tech-bootcamp";
  const trackLabel = trackLabels[item.track] ?? item.track;
  const authorDisplay = item.authorName ?? item.company;

  return (
    <>
      {/* ── Case Hero ── */}
      <section
        className="border-b"
        style={{ borderColor: "var(--color-border)", padding: "clamp(2.5rem, 5vw, 4rem) 0 clamp(2rem, 4vw, 3rem)" }}
      >
        <div className="mx-auto max-w-[1120px] px-6">
          <Link
            href={backHref}
            className="focusable mb-6 inline-block text-sm font-semibold transition hover:opacity-70"
            style={{ color: "var(--color-muted)" }}
          >
            ← Все кейсы {trackLabel}
          </Link>

          {/* Tags */}
          <div className="mb-5 flex flex-wrap gap-2">
            <span className="chip-base rounded-full px-3 py-1 text-xs font-semibold">{trackLabel}</span>
            <span className="chip-base rounded-full px-3 py-1 text-xs font-semibold">{item.topic}</span>
            {item.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="chip-base rounded-full px-3 py-1 text-xs font-semibold">{tag}</span>
            ))}
          </div>

          {/* Title */}
          <h1
            className="mb-6 font-black leading-tight tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 1rem + 3vw, 3rem)",
              color: "var(--color-text)",
              maxWidth: "22ch",
            }}
          >
            {item.title}
          </h1>

          {/* Author meta */}
          <div className="mb-8 flex items-center gap-3">
            <div
              className="flex shrink-0 items-center justify-center rounded-full text-xs font-extrabold text-white"
              style={{ width: "36px", height: "36px", background: "var(--color-primary)", fontFamily: "var(--font-display)" }}
              aria-hidden="true"
            >
              {initials(authorDisplay)}
            </div>
            <div>
              {item.authorName && (
                <span className="block text-sm font-semibold" style={{ color: "var(--color-text)" }}>
                  {item.authorName}
                </span>
              )}
              <span className="block text-xs" style={{ color: "var(--color-muted)" }}>
                {item.company}{item.authorRole ? ` · ${item.authorRole}` : ""}
              </span>
            </div>
          </div>

          {/* Result chips */}
          <div className="flex flex-wrap gap-3">
            <div
              className="flex min-w-[120px] flex-col gap-1 rounded-[1rem] p-4"
              style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
            >
              <span
                className="font-black leading-none tracking-tight"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 1.2rem + 1.25vw, 2.25rem)", color: "var(--color-primary)" }}
              >
                {item.year}
              </span>
              <span className="text-xs font-medium" style={{ color: "var(--color-muted)" }}>год</span>
            </div>
            <div
              className="flex min-w-[180px] max-w-xs flex-col justify-center gap-1 rounded-[1rem] p-4"
              style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
            >
              <span
                className="font-black leading-tight tracking-tight"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.25rem, 1rem + 1vw, 1.75rem)", color: "var(--color-primary)" }}
              >
                ↗
              </span>
              <span className="text-xs font-medium" style={{ color: "var(--color-muted)", maxWidth: "22ch" }}>
                {item.result}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Case Body ── */}
      <div style={{ padding: "clamp(2.5rem, 5vw, 4rem) 0 clamp(3rem, 6vw, 5rem)" }}>
        <div className="mx-auto max-w-[1120px] px-6">
          <div
            className="grid gap-10 md:gap-14"
            style={{ gridTemplateColumns: "1fr", alignItems: "start" }}
          >
            <div className="grid gap-10 md:gap-14" style={{ gridTemplateColumns: "minmax(0,1fr) 320px" }}>

              {/* ── Main content ── */}
              <main className="flex flex-col gap-10">

                {item.challenge && (
                  <section className="flex flex-col gap-4">
                    <h2
                      className="font-extrabold tracking-tight"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.125rem, 1rem + 0.75vw, 1.5rem)",
                        color: "var(--color-text)",
                        borderBottom: "2px solid var(--color-primary)",
                        paddingBottom: "0.75rem",
                      }}
                    >
                      Проблема
                    </h2>
                    <p className="leading-[1.75]" style={{ color: "var(--color-text)", maxWidth: "70ch" }}>
                      {item.challenge}
                    </p>
                  </section>
                )}

                {item.solution && (
                  <section className="flex flex-col gap-4">
                    <h2
                      className="font-extrabold tracking-tight"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.125rem, 1rem + 0.75vw, 1.5rem)",
                        color: "var(--color-text)",
                        borderBottom: "2px solid var(--color-primary)",
                        paddingBottom: "0.75rem",
                      }}
                    >
                      Решение
                    </h2>
                    <p className="leading-[1.75]" style={{ color: "var(--color-text)", maxWidth: "70ch" }}>
                      {item.solution}
                    </p>
                  </section>
                )}

                {item.fullStory && (
                  <section className="flex flex-col gap-4">
                    <h2
                      className="font-extrabold tracking-tight"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.125rem, 1rem + 0.75vw, 1.5rem)",
                        color: "var(--color-text)",
                        borderBottom: "2px solid var(--color-primary)",
                        paddingBottom: "0.75rem",
                      }}
                    >
                      Подробнее
                    </h2>
                    <div
                      className="leading-[1.75] whitespace-pre-wrap"
                      style={{ color: "var(--color-text)", maxWidth: "70ch" }}
                    >
                      {item.fullStory}
                    </div>
                  </section>
                )}

                {!item.challenge && !item.solution && !item.fullStory && (
                  <section className="flex flex-col gap-4">
                    <h2
                      className="font-extrabold tracking-tight"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.125rem, 1rem + 0.75vw, 1.5rem)",
                        color: "var(--color-text)",
                        borderBottom: "2px solid var(--color-primary)",
                        paddingBottom: "0.75rem",
                      }}
                    >
                      О кейсе
                    </h2>
                    <p className="leading-[1.75]" style={{ color: "var(--color-text)", maxWidth: "70ch" }}>
                      {item.shortDescription}
                    </p>
                  </section>
                )}
              </main>

              {/* ── Sidebar ── */}
              <aside className="flex flex-col gap-4" style={{ position: "sticky", top: "80px", alignSelf: "start" }}>

                {/* Author card */}
                <div
                  className="flex flex-col gap-4 rounded-[1.25rem] p-5"
                  style={{ background: "var(--color-primary-bg)", border: "1px solid transparent" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex shrink-0 items-center justify-center rounded-full text-sm font-extrabold text-white"
                      style={{ width: "48px", height: "48px", background: "var(--color-primary)", fontFamily: "var(--font-display)" }}
                      aria-hidden="true"
                    >
                      {initials(authorDisplay)}
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
                  {item.authorRole && (
                    <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>
                      {item.authorRole}
                    </p>
                  )}
                </div>

                {/* Result card */}
                <div
                  className="flex flex-col gap-4 rounded-[1.25rem] p-5"
                  style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
                >
                  <h3
                    className="text-sm font-extrabold tracking-tight"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
                  >
                    Результат
                  </h3>
                  <div className="result-highlight">
                    <span style={{ color: "var(--color-primary)", flexShrink: 0 }}>↗</span>
                    <span>{item.result}</span>
                  </div>
                </div>

                {/* Tags card */}
                {item.tags.length > 0 && (
                  <div
                    className="flex flex-col gap-3 rounded-[1.25rem] p-5"
                    style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
                  >
                    <h3
                      className="text-sm font-extrabold tracking-tight"
                      style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
                    >
                      Теги
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="chip-base rounded-full px-3 py-1 text-xs font-semibold">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Back link */}
                <Link
                  href={backHref}
                  className="btn-ghost focusable rounded-[0.625rem] px-4 py-2.5 text-center text-sm transition"
                >
                  ← Все кейсы
                </Link>
              </aside>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
