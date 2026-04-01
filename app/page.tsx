import Link from "next/link";

const stats = [
  { num: "7+", label: "кейсов в каталоге" },
  { num: "Alumni", label: "TechBootcamp" },
  { num: "TraaS", label: "кейсы проектов" },
];

const productMetrics = [
  { num: "600+", label: "Образовательных решений" },
  { num: "550+", label: "Преподавателей и спикеров" },
  { num: "40 000+", label: "Слушателей ежегодно" },
  { num: "6 600+", label: "Компаний-клиентов" },
];

const traasServices = [
  { title: "Диагностика текущих процессов", description: "Описание услуги добавим позже. Здесь будет детализация по формату диагностики и ожидаемому результату." },
  { title: "Проектирование траектории развития", description: "Описание услуги добавим позже. Здесь будет показано, как строится маршрут обучения и внедрения практик." },
  { title: "Сопровождение внедрения изменений", description: "Описание услуги добавим позже. Здесь будет план поддержки команды на этапе внедрения и закрепления результата." },
  { title: "Оценка эффекта и масштабирование", description: "Описание услуги добавим позже. Здесь опишем метрики успеха и подход к масштабированию." },
];

const pastEvents = [
  { date: "Март 2026", title: "AI в управленческих решениях", description: "Короткое описание события добавим позже.", href: "#" },
  { date: "Февраль 2026", title: "Практикум по цифровым инструментам команд", description: "Короткое описание события добавим позже.", href: "#" },
  { date: "Январь 2026", title: "Интенсив по траекториям развития лидеров", description: "Короткое описание события добавим позже.", href: "#" },
  { date: "Декабрь 2025", title: "Открытая встреча выпускников Tech Bootcamp", description: "Короткое описание события добавим позже.", href: "#" },
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

      {/* ── Products ── */}
      <section className="mx-auto max-w-[1120px] px-6" style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>
        <header className="mb-8">
          <h2
            className="mb-4 text-3xl font-light tracking-tight md:text-5xl"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
          >
            Продукты TraaS и Tech Bootcamp
          </h2>
          <p className="max-w-3xl text-base leading-relaxed" style={{ color: "var(--color-muted)" }}>
            Описание продуктов добавим позже. Этот блок подготовлен как основа под контент и структуру в стиле референса.
          </p>
        </header>
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

      {/* ── About + Metrics ── */}
      <section className="mx-auto max-w-[1120px] px-6" style={{ paddingBottom: "4rem" }}>
        <div className="surface-card rounded-3xl p-6 md:p-10">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2
                className="mb-4 text-3xl font-light leading-tight tracking-tight md:text-5xl"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
              >
                О TraaS и Tech Bootcamp
              </h2>
              <p className="leading-relaxed" style={{ color: "var(--color-muted)", maxWidth: "56ch" }}>
                Текст описания программ будет добавлен позже. Блок сделан с акцентом на крупную типографику и метрики, чтобы визуально повторить структуру референса.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {productMetrics.map((metric) => (
                <article key={metric.label} className="rounded-2xl p-4" style={{ background: "var(--color-surface-offset)" }}>
                  <p className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}>
                    {metric.num}
                  </p>
                  <p className="mt-1 text-sm" style={{ color: "var(--color-muted)" }}>
                    {metric.label}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TraaS Services ── */}
      <section className="mx-auto max-w-[1120px] px-6" style={{ paddingBottom: "4rem" }}>
        <header className="mb-8">
          <h2
            className="mb-4 text-3xl font-light tracking-tight md:text-5xl"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
          >
            Услуги TraaS
          </h2>
          <p className="max-w-3xl text-base leading-relaxed" style={{ color: "var(--color-muted)" }}>
            Нажмите на карточку, чтобы открыть описание направления.
          </p>
        </header>
        <div className="grid gap-3 md:grid-cols-2">
          {traasServices.map((service) => (
            <details key={service.title} className="surface-card rounded-2xl p-5 open:shadow-sm">
              <summary
                className="cursor-pointer list-none text-lg font-semibold"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
              >
                {service.title}
              </summary>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                {service.description}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ── Events ── */}
      <section className="mx-auto max-w-[1120px] px-6" style={{ paddingBottom: "5rem" }}>
        <header className="mb-8">
          <h2
            className="mb-4 text-3xl font-light tracking-tight md:text-5xl"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
          >
            Прошедшие события кемпа
          </h2>
          <p className="max-w-3xl text-base leading-relaxed" style={{ color: "var(--color-muted)" }}>
            Блок сделан по структуре референса СберУниверситета. Контент карточек можно легко заменить на фактический.
          </p>
        </header>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {pastEvents.map((event) => (
            <article key={event.title} className="surface-card flex flex-col rounded-2xl p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-primary)" }}>
                {event.date}
              </p>
              <h3 className="text-base font-semibold leading-snug" style={{ color: "var(--color-text)" }}>
                {event.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                {event.description}
              </p>
              <Link href={event.href} className="mt-4 text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
                Подробнее →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
