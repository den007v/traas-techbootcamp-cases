import type { CaseItem } from "@/types/case";

export const mockCases: CaseItem[] = [
  {
    id: "1",
    track: "traas",
    slug: "traas-analytics-optimization",
    title: "Оптимизация аналитики продаж",
    company: "TechNova",
    topic: "Аналитика",
    shortDescription: "Сократили время отчетности и повысили точность данных.",
    tags: ["analytics", "process"],
    year: 2025,
    result: "Снижение времени подготовки отчетов на 40%"
  },
  {
    id: "2",
    track: "tech-bootcamp",
    slug: "bootcamp-ml-support-assistant",
    title: "ML-ассистент для поддержки",
    company: "HelpDesk Pro",
    topic: "AI",
    shortDescription: "Автоматизировали ответы первой линии поддержки.",
    tags: ["ml", "support"],
    year: 2024,
    result: "Ускорение обработки запросов на 28%"
  },
  {
    id: "3",
    track: "traas",
    slug: "traas-onboarding-revamp",
    title: "Перезапуск onboarding-процесса",
    company: "FlowOps",
    topic: "Операции",
    shortDescription: "Упростили онбординг новых участников и сократили churn.",
    tags: ["ops", "retention"],
    year: 2024,
    result: "Снижение оттока на 19%"
  },
  {
    id: "4",
    track: "tech-bootcamp",
    slug: "bootcamp-product-analytics-layer",
    title: "Слой продуктовой аналитики",
    company: "DataLane",
    topic: "Аналитика",
    shortDescription: "Собрали дашборды по ключевым метрикам продуктовых команд.",
    tags: ["analytics", "dashboards"],
    year: 2025,
    result: "Ускорение принятия решений в продукте на 30%"
  },
  {
    id: "5",
    track: "traas",
    slug: "traas-content-automation",
    title: "Автоматизация контент-пайплайна",
    company: "Creator Hub",
    topic: "Контент",
    shortDescription: "Внедрили поток подготовки и публикации кейсов без ручных шагов.",
    tags: ["automation", "content"],
    year: 2023,
    result: "Рост скорости публикации в 2 раза"
  },
  {
    id: "6",
    track: "tech-bootcamp",
    slug: "bootcamp-community-growth",
    title: "Рост вовлеченности alumni-сообщества",
    company: "Community First",
    topic: "Сообщество",
    shortDescription: "Пересобрали механику мероприятий и регулярных активностей.",
    tags: ["community", "engagement"],
    year: 2023,
    result: "Рост MAU сообщества на 35%"
  }
];
