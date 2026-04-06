import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
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
  const hasStory = Boolean(item.fullStory);
  const hasNarrative = Boolean(item.challenge || item.solution || item.fullStory);
  const metrics = item.highlightMetrics ?? [];
  const hasMetrics = metrics.length > 0;

  return (
    <>
      {/* ── Case Hero: метрики вверху ── */}
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

          <div className="mb-5 flex flex-wrap gap-2">
            <span className="chip-base rounded-full px-3 py-1 text-xs font-semibold">{trackLabel}</span>
            <span className="chip-base rounded-full px-3 py-1 text-xs font-semibold">{item.topic}</span>
          </div>

          <h1
            className="mb-5 font-semibold leading-tight tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 1rem + 3vw, 2.75rem)",
              color: "var(--color-text)",
              maxWidth: "32ch",
            }}
          >
            {item.title}
          </h1>

          <p className="mb-8 max-w-3xl text-base leading-relaxed" style={{ color: "var(--color-muted)" }}>
            {item.shortDescription}
          </p>

          {hasMetrics ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
              {metrics.map((m) => (
                <div
                  key={`${m.label}-${m.value}`}
                  className="accent-card rounded-[1rem] px-4 py-5"
                  style={{ border: "1px solid rgba(232, 50, 42, 0.18)" }}
                >
                  <p
                    className="font-semibold leading-none tracking-tight"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.75rem, 1.25rem + 2vw, 2.75rem)",
                      color: "var(--color-primary)",
                    }}
                  >
                    {m.value}
                  </p>
                  <p className="mt-3 text-xs font-medium leading-snug" style={{ color: "var(--color-muted)" }}>
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="max-w-2xl rounded-[1rem] p-5"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderLeft: "3px solid var(--color-primary)",
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-primary)" }}>
                Ключевой результат
              </p>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-text)" }}>
                {item.result}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Case Body ── */}
      <div style={{ padding: "clamp(2.5rem, 5vw, 4rem) 0 clamp(3rem, 6vw, 5rem)" }}>
        <div className="mx-auto max-w-[1120px] px-6">
          <div className="grid gap-10 md:gap-14 lg:grid-cols-[minmax(0,1fr)_280px]" style={{ alignItems: "start" }}>
            {/* ── Main content ── */}
            <main className="flex flex-col gap-10">
              {hasNarrative && (
                <nav
                  className="surface-card rounded-[1rem] p-4"
                  style={{ borderColor: "var(--color-border)" }}
                  aria-label="Оглавление кейса"
                >
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-muted)" }}>
                    Оглавление
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.challenge && (
                      <a href="#problem" className="chip-base focusable rounded-full px-3 py-1 text-xs font-semibold">
                        Проблема
                      </a>
                    )}
                    {item.solution && (
                      <a href="#solution" className="chip-base focusable rounded-full px-3 py-1 text-xs font-semibold">
                        Решение
                      </a>
                    )}
                    {hasStory && (
                      <a href="#details" className="chip-base focusable rounded-full px-3 py-1 text-xs font-semibold">
                        Подробно
                      </a>
                    )}
                  </div>
                </nav>
              )}

              {item.challenge && (
                <CaseBlock id="problem" title="Проблема">
                  <p style={{ color: "var(--color-text)", lineHeight: 1.75, maxWidth: "70ch" }}>{item.challenge}</p>
                </CaseBlock>
              )}

              {item.solution && (
                <CaseBlock id="solution" title="Решение">
                  <p style={{ color: "var(--color-text)", lineHeight: 1.75, maxWidth: "70ch" }}>{item.solution}</p>
                </CaseBlock>
              )}

              {item.fullStory && (
                <MarkdownContent id="details" content={item.fullStory} />
              )}

              {!item.challenge && !item.solution && !item.fullStory && (
                <CaseBlock title="О кейсе">
                  <p style={{ color: "var(--color-text)", lineHeight: 1.75, maxWidth: "70ch" }}>{item.shortDescription}</p>
                </CaseBlock>
              )}
            </main>

            {/* ── Sidebar: инструменты, автор, теги ── */}
            <aside style={{ position: "sticky", top: "80px", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {item.toolsUsed && item.toolsUsed.length > 0 && (
                <div
                  className="flex flex-col gap-3 rounded-[1.25rem] p-5"
                  style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
                >
                  <h3 className="text-sm font-semibold" style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}>
                    Инструменты
                  </h3>
                  <ul className="flex flex-col gap-2.5" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {item.toolsUsed.map((tool) => (
                      <li
                        key={tool}
                        className="text-sm leading-snug pl-3"
                        style={{ borderLeft: "2px solid var(--color-primary)", color: "var(--color-muted)" }}
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div
                className="flex flex-col gap-4 rounded-[1.25rem] p-5"
                style={{ background: "var(--color-primary-bg)", border: "1px solid rgba(232, 50, 42, 0.15)" }}
              >
                <h3 className="text-sm font-semibold" style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}>
                  Автор
                </h3>
                <div className="flex items-center gap-3">
                  <div
                    className="flex shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
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

              {item.tags.length > 0 && (
                <div
                  className="flex flex-col gap-3 rounded-[1.25rem] p-5"
                  style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
                >
                  <h3 className="text-sm font-semibold" style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}>
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

              <Link
                href={backHref}
                className="focusable text-center text-sm font-medium underline underline-offset-4 transition hover:opacity-70"
                style={{ color: "var(--color-muted)" }}
              >
                ← Все кейсы
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Shared section block ── */
function CaseBlock({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ display: "flex", flexDirection: "column", gap: "1rem", scrollMarginTop: "88px" }}>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.125rem, 1rem + 0.75vw, 1.5rem)",
          fontWeight: 800,
          color: "var(--color-text)",
          letterSpacing: "-0.02em",
          borderBottom: "2px solid var(--color-primary)",
          paddingBottom: "0.75rem",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

/* ── Markdown renderer ── */
function MarkdownContent({ id, content }: { id?: string; content: string }) {
  const textStyle: React.CSSProperties = { color: "var(--color-text)", lineHeight: 1.75, maxWidth: "70ch" };
  const mutedStyle: React.CSSProperties = { color: "var(--color-muted)", lineHeight: 1.75, maxWidth: "70ch" };

  return (
    <div id={id} style={{ display: "flex", flexDirection: "column", gap: "2.5rem", scrollMarginTop: "88px" }}>
      <ReactMarkdown
        components={{
          h2({ children }) {
            return (
              <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.125rem, 1rem + 0.75vw, 1.5rem)",
                    fontWeight: 800,
                    color: "var(--color-text)",
                    letterSpacing: "-0.02em",
                    borderBottom: "1px solid color-mix(in srgb, var(--color-primary) 45%, transparent)",
                    paddingBottom: "0.75rem",
                    marginBottom: "0.25rem",
                  }}
                >
                  {children}
                </h2>
              </section>
            );
          },
          h3({ children }) {
            return (
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "var(--color-text)",
                  marginTop: "0.25rem",
                }}
              >
                {children}
              </h3>
            );
          },
          p({ children }) {
            return <p style={textStyle}>{children}</p>;
          },
          ul({ children }) {
            return (
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.4rem", listStyle: "none", padding: 0 }}>
                {children}
              </ul>
            );
          },
          ol({ children }) {
            return (
              <ol style={{ display: "flex", flexDirection: "column", gap: "0.4rem", listStyle: "none", padding: 0, counterReset: "case-counter" }}>
                {children}
              </ol>
            );
          },
          li({ children }) {
            return (
              <li
                style={{
                  ...mutedStyle,
                  maxWidth: "70ch",
                  paddingLeft: "1.5rem",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    color: "var(--color-primary)",
                    fontWeight: 700,
                  }}
                >
                  —
                </span>
                {children}
              </li>
            );
          },
          blockquote({ children }) {
            return (
              <blockquote
                style={{
                  borderLeft: "3px solid var(--color-primary)",
                  paddingLeft: "1.5rem",
                  paddingTop: "1rem",
                  paddingBottom: "1rem",
                  background: "var(--color-surface)",
                  borderRadius: "0 0.625rem 0.625rem 0",
                  fontStyle: "italic",
                  color: "var(--color-text)",
                  lineHeight: 1.6,
                  maxWidth: "60ch",
                }}
              >
                {children}
              </blockquote>
            );
          },
          strong({ children }) {
            return <strong style={{ color: "var(--color-text)", fontWeight: 700 }}>{children}</strong>;
          },
          hr() {
            return null;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
