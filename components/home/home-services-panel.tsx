"use client";

import Link from "next/link";
import { useState } from "react";

export type HomeService = {
  id: string;
  title: string;
  description: string;
  kind: "traas" | "bootcamp";
};

const defaultServices: HomeService[] = [
  {
    id: "visibility",
    kind: "traas",
    title: "Поможем увидеть, какие у вас процессы сейчас",
    description:
      "Собираем картину AS-IS по ключевым процессам, данным и ИТ: где теряется время, где дубли и ручной труд — чтобы дальше решать не «всё сразу», а приоритеты.",
  },
  {
    id: "trajectory",
    kind: "traas",
    title: "Поможем спланировать траекторию развития",
    description:
      "Из диагностики — в TO-BE, дерево целей и бэклог инициатив с понятным роадмэпом: что даст эффект быстро, что — фундамент на годы.",
  },
  {
    id: "journey",
    kind: "traas",
    title: "Поможем пройти путь изменений проще и быстрее",
    description:
      "Держим ритм внедрения: синхронизация бизнеса и ИТ, запуск PoC/MVP и поддержка команд, пока новые практики не станут привычкой.",
  },
  {
    id: "scale",
    kind: "traas",
    title: "Поможем измерить эффект и масштабировать удачные решения",
    description:
      "Согласуем метрики, фиксируем достигнутый эффект и переносим то, что сработало, на соседние направления — без раздувания штата проекта.",
  },
  {
    id: "bootcamp",
    kind: "bootcamp",
    title: "Tech Bootcamp — практика внедрения для команд",
    description:
      "Формат для тех, кто переводит идеи в работающие решения: технологии, разбор кейсов и инструменты, которые можно применить у себя. Истории участников — в разделе кейсов.",
  },
];

type HomeServicesPanelProps = {
  services?: HomeService[];
};

export function HomeServicesPanel({ services = defaultServices }: HomeServicesPanelProps) {
  const [activeId, setActiveId] = useState(services[0]?.id ?? "");
  const active = services.find((s) => s.id === activeId) ?? services[0];

  if (!active) return null;

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
      <nav className="flex shrink-0 flex-col gap-1 lg:w-[min(100%,320px)]" aria-label="Услуги TraaS и Tech Bootcamp">
        {services.map((s) => {
          const isActive = s.id === active.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveId(s.id)}
              className="focusable rounded-xl px-4 py-3 text-left text-sm leading-snug transition"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: isActive ? 600 : 500,
                color: isActive ? "var(--color-text)" : "var(--color-muted)",
                background: isActive ? "var(--color-primary-bg)" : "transparent",
                border: isActive ? "1px solid rgba(232, 50, 42, 0.25)" : "1px solid transparent",
              }}
              aria-current={isActive ? "true" : undefined}
            >
              {s.title}
            </button>
          );
        })}
      </nav>

      <div
        className="surface-card min-h-[200px] flex-1 rounded-2xl p-6 md:p-8"
        style={{ borderColor: "var(--color-border)" }}
        role="region"
        aria-live="polite"
        aria-label={active.title}
      >
        <h3
          className="text-lg font-semibold leading-snug md:text-xl"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
        >
          {active.title}
        </h3>
        <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--color-muted)" }}>
          {active.description}
        </p>
        {active.kind === "bootcamp" && (
          <div className="mt-6">
            <Link href="/cases/tech-bootcamp" className="btn-cta focusable inline-flex rounded-[0.625rem] px-5 py-2.5 text-sm font-medium">
              Кейсы Tech Bootcamp
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
