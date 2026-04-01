import Link from "next/link";

const stats = [
  { num: "7+", label: "кейсов в каталоге" },
  { num: "Alumni", label: "TechBootcamp" },
  { num: "TraaS", label: "кейсы проектов" },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="border-b"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div
          className="mx-auto max-w-[1120px] px-6"
          style={{ paddingTop: "clamp(4rem, 8vw, 6rem)", paddingBottom: "clamp(3rem, 5vw, 5rem)" }}
        >
          <span
            className="mb-5 inline-block text-xs font-bold uppercase tracking-[0.1em]"
            style={{ color: "var(--color-primary)" }}
          >
            Банк кейсов
          </span>

          <h1
            className="mb-6 font-black leading-[1.05] tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 1rem + 4vw, 5rem)",
              color: "var(--color-text)",
              maxWidth: "14ch",
            }}
          >
            Как Alumni применяют технологии{" "}
            <span style={{ color: "var(--color-primary)" }}>в реальной работе</span>
          </h1>

          <p
            className="mb-8 leading-relaxed"
            style={{
              fontSize: "clamp(1.125rem, 1rem + 0.75vw, 1.5rem)",
              color: "var(--color-muted)",
              maxWidth: "52ch",
            }}
          >
            Живые истории участников TechBootcamp и TraaS — о том, что пробовали, что получилось и что можно повторить у себя.
          </p>

          <div className="mb-10 flex flex-wrap gap-3">
            <Link
              href="/cases/tech-bootcamp"
              className="btn-cta focusable rounded-[0.625rem] px-6 py-3 text-sm transition"
            >
              Смотреть кейсы
            </Link>
            <Link
              href="/account"
              className="btn-ghost focusable rounded-[0.625rem] px-6 py-3 text-sm transition"
            >
              Предложить кейс
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-6">
            {stats.map((s, i) => (
              <div key={s.num} className="flex items-center gap-6">
                <div className="flex flex-col gap-1">
                  <span
                    className="font-black leading-none tracking-tight"
                    style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 1.2rem + 1.25vw, 2.25rem)", color: "var(--color-text)" }}
                  >
                    {s.num}
                  </span>
                  <span className="text-xs font-medium" style={{ color: "var(--color-muted)" }}>
                    {s.label}
                  </span>
                </div>
                {i < stats.length - 1 && (
                  <div className="h-10 w-px shrink-0" style={{ background: "var(--color-border)" }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tracks ── */}
      <section className="mx-auto max-w-[1120px] px-6" style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>
        <div className="grid gap-5 md:grid-cols-2">

          <article
            className="surface-card rounded-[1.25rem] p-6 shadow-sm transition"
            style={{ transition: "box-shadow var(--transition-ui), transform var(--transition-ui)" }}
          >
            <span
              className="chip-bootcamp mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold"
            >
              Tech Bootcamp
            </span>
            <h2
              className="mb-2 text-xl font-extrabold tracking-tight"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
            >
              Tech Bootcamp
            </h2>
            <p className="mb-5 text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
              Кейсы о технических запусках: аналитика, автоматизация, AI и продуктовые решения участников программы.
            </p>
            <Link
              href="/cases/tech-bootcamp"
              className="focusable text-sm font-semibold"
              style={{ color: "var(--color-primary)" }}
            >
              Смотреть кейсы →
            </Link>
          </article>

          <article
            className="surface-card rounded-[1.25rem] p-6 shadow-sm transition"
          >
            <span className="chip-traas mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold">
              TraaS
            </span>
            <h2
              className="mb-2 text-xl font-extrabold tracking-tight"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
            >
              TraaS
            </h2>
            <p className="mb-5 text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
              Кейсы по улучшению процессов, контента и операционной эффективности внутри компаний.
            </p>
            <Link
              href="/cases/traas"
              className="focusable text-sm font-semibold"
              style={{ color: "var(--color-primary)" }}
            >
              Смотреть кейсы →
            </Link>
          </article>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "var(--color-primary)", padding: "clamp(3rem, 6vw, 5rem) 0" }}>
        <div className="mx-auto max-w-[1120px] px-6">
          <div className="grid gap-12 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2
                className="mb-4 font-black leading-tight tracking-tight"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 1.2rem + 2.5vw, 3.5rem)", color: "#fff" }}
              >
                Хотите, чтобы ваш кейс был здесь?
              </h2>
              <p className="mb-5 leading-relaxed" style={{ color: "rgba(255,255,255,0.82)", maxWidth: "54ch" }}>
                Расскажите о своём опыте — что пробовали, что получилось, какой инструмент или подход помог. Кейс не обязательно должен быть «успешным» — честная история важнее красивой.
              </p>
              <ul className="flex flex-col gap-2 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                <li className="relative pl-5 before:absolute before:left-0 before:content-['→'] before:opacity-50">Любой формат: текст, презентация, ссылка</li>
                <li className="relative pl-5 before:absolute before:left-0 before:content-['→'] before:opacity-50">Оформим и опубликуем вместе с вами</li>
                <li className="relative pl-5 before:absolute before:left-0 before:content-['→'] before:opacity-50">Шаблон кейса вышлем по запросу</li>
              </ul>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-center md:text-center">
              <Link
                href="/account"
                className="focusable inline-flex rounded-[0.625rem] bg-white px-8 py-4 text-base font-bold transition hover:opacity-90"
                style={{ color: "var(--color-primary)", fontFamily: "var(--font-display)" }}
              >
                Предложить кейс
              </Link>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                или напишите координатору программы
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
