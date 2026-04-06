import { HomeServicesPanel } from "@/components/home/home-services-panel";

const productMetrics = [
  { num: "End-to-end", label: "От диагностики до запуска" },
  { num: "Бизнес + ИТ", label: "Единая программа изменений" },
  { num: "Quick wins / Long-term", label: "Баланс быстрых и долгих эффектов" },
  { num: "Capability-aligned", label: "Фокус на ключевых возможностях" },
];

/** Достижения после программы (не отзывы «понравилось») */
const participantOutcomes = [
  {
    title: "PoC генеративного AI",
    detail: "Команда запустила пилот в смежном юните за 6 недель — с понятными критериями готовности к промышленному использованию.",
  },
  {
    title: "Согласования и изменения",
    detail: "После пересборки процесса сократили цикл согласований на 40% при том же составе участников.",
  },
  {
    title: "Данные для решений",
    detail: "Вынесли ключевые метрики в единый дашборд: руководство видит эффект еженедельно, а не раз в квартал.",
  },
  {
    title: "Масштабирование практик",
    detail: "Удачный формат воркшопов перенесли на два следующих направления без увеличения штата трансформации.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── TraaS: коротко + визуал ── */}
      <section className="mx-auto max-w-[1120px] px-6" style={{ paddingTop: "3rem", paddingBottom: "3.5rem" }}>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_min(100%,300px)]">
          <header>
            <h2 className="landing-section-title mb-5">TraaS</h2>
            <p className="landing-lead max-w-3xl">
              <strong>TraaS</strong> — программа цифровой трансформации: за несколько месяцев помогаем ускорить вывод изменений, навести порядок в процессах и ИТ и опереться на{" "}
              <strong>данные и AI</strong> в повседневной работе. Диагностика, бэклог инициатив и сопровождение внедрения — с форматами{" "}
              <strong>light / medium / full</strong> под масштаб задачи.
            </p>
          </header>
          <div className="landing-visual-blob hidden lg:block" aria-hidden="true" />
        </div>
        <div className="landing-visual-blob mt-8 lg:hidden" aria-hidden="true" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {productMetrics.map((metric) => (
            <article key={metric.label} className="surface-card accent-card hover-lift rounded-2xl p-4">
              <p className="landing-metric-num">{metric.num}</p>
              <p className="mt-1 text-sm" style={{ color: "var(--color-muted)" }}>
                {metric.label}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Услуги: список слева, описание справа ── */}
      <section className="mx-auto max-w-[1120px] px-6" style={{ paddingBottom: "4rem" }}>
        <header className="mb-8">
          <h2 className="landing-section-title">Услуги TraaS и Tech Bootcamp</h2>
          <p className="landing-lead mt-3 max-w-2xl">
            Выберите направление слева — справа кратко, что вы получите на выходе.
          </p>
        </header>
        <HomeServicesPanel />
      </section>

      {/* ── Результаты участников ── */}
      <section className="mx-auto max-w-[1120px] px-6" style={{ paddingBottom: "5rem" }}>
        <header className="mb-8">
          <h2 className="landing-section-title">Результаты участников</h2>
          <p className="landing-lead mt-3 max-w-2xl">
            Примеры того, что команды сделали после программ — в измеримых формулировках, без «мне понравилось».
          </p>
        </header>
        <div className="grid gap-4 md:grid-cols-2">
          {participantOutcomes.map((item) => (
            <article key={item.title} className="surface-card hover-lift rounded-2xl p-5">
              <h3 className="text-base font-semibold leading-snug" style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}>
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                {item.detail}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
