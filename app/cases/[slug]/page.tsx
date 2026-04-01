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
              className="flex min-w-[180px] max-w-sm flex-col justify-center gap-1 rounded-[1rem] p-4"
              style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
            >
              <span
                className="font-black leading-tight"
                style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--color-primary)" }}
              >
                ↗
              </span>
              <span className="text-xs font-medium" style={{ color: "var(--color-muted)", maxWidth: "28ch" }}>
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
            style={{ gridTemplateColumns: "minmax(0,1fr) 300px", alignItems: "start" }}
          >
            {/* ── Main content ── */}
            <main className="flex flex-col gap-10">

              {item.challenge && (
                <CaseBlock title="Проблема">
                  <p style={{ color: "var(--color-text)", lineHeight: 1.75, maxWidth: "70ch" }}>{item.challenge}</p>
                </CaseBlock>
              )}

              {item.solution && (
                <CaseBlock title="Решение">
                  <p style={{ color: "var(--color-text)", lineHeight: 1.75, maxWidth: "70ch" }}>{item.solution}</p>
                </CaseBlock>
              )}

              {item.fullStory && (
                <MarkdownContent content={item.fullStory} />
              )}

              {!item.challenge && !item.solution && !item.fullStory && (
                <CaseBlock title="О кейсе">
                  <p style={{ color: "var(--color-text)", lineHeight: 1.75, maxWidth: "70ch" }}>{item.shortDescription}</p>
                </CaseBlock>
              )}
            </main>

            {/* ── Sidebar ── */}
            <aside style={{ position: "sticky", top: "80px", display: "flex", flexDirection: "column", gap: "1rem" }}>

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
                className="flex flex-col gap-3 rounded-[1.25rem] p-5"
                style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
              >
                <h3 className="text-sm font-extrabold" style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}>
                  Результат
                </h3>
                <div className="result-highlight">
                  <span style={{ color: "var(--color-primary)", flexShrink: 0 }}>↗</span>
                  <span>{item.result}</span>
                </div>
              </div>

              {/* Tags */}
              {item.tags.length > 0 && (
                <div
                  className="flex flex-col gap-3 rounded-[1.25rem] p-5"
                  style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
                >
                  <h3 className="text-sm font-extrabold" style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}>
                    Теги
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="chip-base rounded-full px-3 py-1 text-xs font-semibold">{tag}</span>
                    ))}
                  </div>
                </div>
              )}

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
    </>
  );
}

/* ── Shared section block ── */
function CaseBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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
function MarkdownContent({ content }: { content: string }) {
  const textStyle: React.CSSProperties = { color: "var(--color-text)", lineHeight: 1.75, maxWidth: "70ch" };
  const mutedStyle: React.CSSProperties = { color: "var(--color-muted)", lineHeight: 1.75, maxWidth: "70ch" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
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
                    borderBottom: "2px solid var(--color-primary)",
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
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem", listStyle: "none", padding: 0 }}>
                {children}
              </ul>
            );
          },
          ol({ children }) {
            return (
              <ol style={{ display: "flex", flexDirection: "column", gap: "0.5rem", listStyle: "none", padding: 0, counterReset: "case-counter" }}>
                {children}
              </ol>
            );
          },
          li({ children, node, ...props }) {
            const isOrdered = (node?.parent as { tagName?: string })?.tagName === "ol";
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
                  {isOrdered ? "→" : "—"}
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
