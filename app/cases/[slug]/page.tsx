import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseBySlug } from "@/lib/cases/queries";

type CasePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const item = await getCaseBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <article className="space-y-6">
      <Link
        className="btn-ghost focusable inline-flex rounded-full px-3 py-1 text-sm"
        href={item.track === "traas" ? "/cases/traas" : "/cases/tech-bootcamp"}
      >
        Назад к списку
      </Link>
      <header className="surface-card rounded-3xl p-6 shadow-sm">
        <div className="mb-3 flex flex-wrap gap-2">
          <span className={`${item.track === "traas" ? "chip-traas" : "chip-bootcamp"} rounded-full px-2 py-1 text-xs`}>
            {item.topic}
          </span>
          <span className="chip-base rounded-full px-2 py-1 text-xs">{item.year}</span>
          <span className="chip-base rounded-full px-2 py-1 text-xs">{item.company}</span>
        </div>
        <h1 className="text-3xl font-semibold" style={{ color: "var(--color-primary)" }}>
          {item.title}
        </h1>
        <p className="mt-3 text-muted">{item.shortDescription}</p>
      </header>

      <section className="grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:col-span-2">
          <h2 className="text-lg font-semibold text-slate-900">Что сделали</h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            На этом этапе используется шаблонная структура страницы кейса. На следующих шагах сюда добавятся блоки
            "Проблема", "Решение", "Результат" и полный narrative из базы данных.
          </p>
        </div>
        <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Результат</h3>
          <p className="mt-3 text-sm font-medium text-slate-900">{item.result}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-slate-200 px-2 py-1 text-xs text-slate-600">
                #{tag}
              </span>
            ))}
          </div>
        </aside>
      </section>
    </article>
  );
}
