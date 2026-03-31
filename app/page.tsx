import Link from "next/link";

export default function HomePage() {
  return (
    <section className="space-y-12">
      <div className="surface-card rounded-3xl px-6 py-12 md:px-10">
        <p className="text-xs uppercase tracking-[0.18em]" style={{ color: "var(--color-cta)" }}>
          Community Cases Platform
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight md:text-5xl" style={{ color: "var(--color-primary)" }}>
          Кейсы TraaS и Tech Bootcamp
        </h1>
        <p className="mt-4 max-w-2xl text-sm md:text-base" style={{ color: "var(--color-muted)" }}>
          Единое пространство с практическими историями выпускников: проблема, решение и измеримый результат.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link className="btn-cta focusable rounded-xl px-4 py-2 text-sm font-medium transition" href="/cases/traas">
            Смотреть TraaS
          </Link>
          <Link className="btn-ghost focusable rounded-xl px-4 py-2 text-sm font-medium transition" href="/cases/tech-bootcamp">
            Смотреть Tech Bootcamp
          </Link>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <article className="surface-card rounded-2xl p-6 shadow-sm">
          <div className="chip-traas mb-3 inline-flex rounded-full px-2 py-1 text-xs font-medium">TraaS</div>
          <h2 className="text-xl font-semibold" style={{ color: "var(--color-primary)" }}>TraaS</h2>
          <p className="mt-2 text-sm text-muted">
            Кейсы по улучшению процессов, контента и операционной эффективности.
          </p>
          <Link className="mt-4 inline-flex text-sm font-medium underline" style={{ color: "var(--color-traas-accent)" }} href="/cases/traas">
            Перейти к кейсам TraaS
          </Link>
        </article>

        <article className="surface-card rounded-2xl p-6 shadow-sm">
          <div className="chip-bootcamp mb-3 inline-flex rounded-full px-2 py-1 text-xs font-medium">Tech Bootcamp</div>
          <h2 className="text-xl font-semibold" style={{ color: "var(--color-primary)" }}>Tech Bootcamp</h2>
          <p className="mt-2 text-sm text-muted">
            Кейсы о технических запусках: аналитика, автоматизация, AI и продуктовые решения.
          </p>
          <Link
            className="mt-4 inline-flex text-sm font-medium underline"
            style={{ color: "var(--color-bootcamp-accent)" }}
            href="/cases/tech-bootcamp"
          >
            Перейти к кейсам Tech Bootcamp
          </Link>
        </article>
      </div>

      <div className="surface-card rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold" style={{ color: "var(--color-primary)" }}>Что внутри кейса</h2>
        <div className="mt-4 grid gap-3 text-sm md:grid-cols-3">
          <p className="chip-base rounded-xl p-3">Проблема и контекст задачи</p>
          <p className="chip-base rounded-xl p-3">Что именно было сделано</p>
          <p className="chip-base rounded-xl p-3">Результат с измеримым эффектом</p>
        </div>
      </div>

      <div className="rounded-3xl px-6 py-10 text-white md:px-10" style={{ background: "var(--color-cta)" }}>
        <h2 className="max-w-2xl text-3xl font-semibold leading-tight">Хотите, чтобы ваш кейс тоже был опубликован?</h2>
        <p className="mt-3 max-w-2xl text-sm text-rose-50 md:text-base">
          Расскажите о вашем опыте: контекст задачи, подход и результат. Мы подготовим кейс в формате сайта.
        </p>
        <div className="mt-6">
          <Link
            className="focusable inline-flex rounded-xl bg-white px-4 py-2 text-sm font-medium"
            style={{ color: "var(--color-cta)" }}
            href="/account"
          >
            Предложить кейс
          </Link>
        </div>
      </div>
    </section>
  );
}
