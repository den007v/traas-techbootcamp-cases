import Link from "next/link";

const productMetrics = [
  { num: "End-to-end", label: "От диагностики до запуска" },
  { num: "Бизнес + ИТ", label: "Единая программа изменений" },
  { num: "Quick wins / Long-term", label: "Баланс быстрых и долгих эффектов" },
  { num: "Capability-aligned", label: "Фокус на ключевых возможностях" },
];

const traasServices = [
  {
    title: "Диагностика текущих процессов",
    description:
      "Проводим анализ ключевых процессов, ИТ-ландшафта и данных (VSM, CJM, Gemba), фиксируем узкие места и формируем AS-IS картину для дальнейших решений.",
  },
  {
    title: "Проектирование траектории развития",
    description:
      "На основе диагностики строим TO-BE модель, дерево целей и приоритизированный бэклог инициатив (quick wins, runway, long-term) с понятным роадмэпом для C-level.",
  },
  {
    title: "Сопровождение внедрения изменений",
    description:
      "Организуем TraaS-офис, регулярные синки, поддерживаем команды в запуске PoC/MVP и реализации инициатив, помогая встроить Agile- и data-driven-подход в операционку.",
  },
  {
    title: "Оценка эффекта и масштабирование",
    description:
      "Отслеживаем бизнес- и ИТ-метрики (lead time, T2M, MTTR и др.), фиксируем достигнутый эффект и помогаем масштабировать успешные практики и решения на другие направления.",
  },
];

const pastEvents = [
  {
    date: "Март 2026",
    title: "AI в управленческих решениях",
    description: "Короткое описание события добавим позже.",
    href: "#",
    metrics: ["120+ участников", "4 спикера", "1 день"],
  },
  {
    date: "Февраль 2026",
    title: "Практикум по цифровым инструментам команд",
    description: "Короткое описание события добавим позже.",
    href: "#",
    metrics: ["90+ участников", "6 кейсов", "2 потока"],
  },
  {
    date: "Январь 2026",
    title: "Интенсив по траекториям развития лидеров",
    description: "Короткое описание события добавим позже.",
    href: "#",
    metrics: ["75+ участников", "3 трека", "8 часов"],
  },
  {
    date: "Декабрь 2025",
    title: "Открытая встреча выпускников Tech Bootcamp",
    description: "Короткое описание события добавим позже.",
    href: "#",
    metrics: ["150+ выпускников", "12 докладов", "1 сообщество"],
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Product: TraaS ── */}
      <section className="mx-auto max-w-[1120px] px-6" style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>
        <header className="mb-8">
          <h2
            className="mb-4 text-3xl font-light tracking-tight md:text-5xl"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
          >
            TraaS
          </h2>
          <p className="max-w-4xl text-base leading-relaxed" style={{ color: "var(--color-muted)" }}>
            <strong style={{ color: "var(--color-text)" }}>TraaS</strong> — это управляемая программа цифровой трансформации, которая{" "}
            <strong style={{ color: "var(--color-text)" }}>за 3-6 месяцев</strong> помогает компаниям ускорить вывод продуктов на рынок,
            навести порядок в процессах и ИТ и внедрить <strong style={{ color: "var(--color-text)" }}>AI- и data-driven-подход</strong> в операционку.
          </p>
          <p className="mt-3 max-w-4xl text-base leading-relaxed" style={{ color: "var(--color-muted)" }}>
            Вместе с вашей командой мы проводим быструю диагностику, собираем приоритизированный бэклог инициатив и запускаем{" "}
            <strong style={{ color: "var(--color-text)" }}>PoC/MVP до работающих решений</strong>, опираясь на проверенную методологию,
            Tech Bootcamp и команду экспертов (<strong style={{ color: "var(--color-text)" }}>форматы light/medium/full</strong>) с уже
            подтвержденным эффектом по <strong style={{ color: "var(--color-text)" }}>NPS и росту компетенций</strong>.
          </p>
        </header>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {productMetrics.map((metric) => (
            <article key={metric.label} className="surface-card rounded-2xl p-4">
              <p
                className="text-lg font-bold tracking-tight md:text-xl"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
              >
                {metric.num}
              </p>
              <p className="mt-1 text-sm" style={{ color: "var(--color-muted)" }}>
                {metric.label}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ── TraaS Services (static) ── */}
      <section className="mx-auto max-w-[1120px] px-6" style={{ paddingBottom: "4rem" }}>
        <header className="mb-8">
          <h2
            className="mb-4 text-3xl font-light tracking-tight md:text-5xl"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
          >
            Услуги TraaS
          </h2>
        </header>
        <div className="grid gap-3 md:grid-cols-2">
          {traasServices.map((service) => (
            <article key={service.title} className="surface-card rounded-2xl p-5">
              <h3
                className="text-lg font-semibold"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
              >
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Product: Tech Bootcamp ── */}
      <section className="mx-auto max-w-[1120px] px-6" style={{ paddingBottom: "4rem" }}>
        <div className="surface-card rounded-3xl p-6 md:p-10">
          <h2
            className="mb-4 text-3xl font-light leading-tight tracking-tight md:text-5xl"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
          >
            Tech Bootcamp
          </h2>
          <p className="max-w-3xl text-base leading-relaxed" style={{ color: "var(--color-muted)" }}>
            Описание продукта Tech Bootcamp добавим позже. Блок подготовлен под итоговый контент и визуально повторяет структуру референса.
          </p>
          <div className="mt-6">
            <Link href="/cases/tech-bootcamp" className="btn-cta focusable rounded-[0.625rem] px-5 py-2.5 text-sm">
              Смотреть кейсы Tech Bootcamp
            </Link>
          </div>
        </div>
      </section>

      {/* ── Past Launches ── */}
      <section className="mx-auto max-w-[1120px] px-6" style={{ paddingBottom: "5rem" }}>
        <header className="mb-8">
          <h2
            className="mb-4 text-3xl font-light tracking-tight md:text-5xl"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
          >
            Прошедшие запуски
          </h2>
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
              <div className="mt-3 flex flex-wrap gap-2">
                {event.metrics.map((metric) => (
                  <span
                    key={metric}
                    className="rounded-full px-2.5 py-1 text-xs"
                    style={{ background: "var(--color-surface-offset)", color: "var(--color-text)" }}
                  >
                    {metric}
                  </span>
                ))}
              </div>
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
