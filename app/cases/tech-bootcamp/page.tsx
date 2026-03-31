import { CaseCatalog } from "@/components/cases/case-catalog";
import { getCases } from "@/lib/cases/queries";

export default async function TechBootcampCasesPage() {
  const items = await getCases("tech-bootcamp");

  return (
    <section className="space-y-6">
      <div className="rounded-3xl bg-indigo-950 px-6 py-8 text-white">
        <p className="text-xs uppercase tracking-[0.15em] text-indigo-200">Tech Bootcamp Track</p>
        <h1 className="mt-2 text-3xl font-semibold">Кейсы Tech Bootcamp</h1>
        <p className="mt-3 max-w-3xl text-sm text-indigo-100">
          Истории о запуске технических решений: от аналитики до AI-инструментов и продуктовых процессов.
        </p>
      </div>
      <CaseCatalog items={items} />
    </section>
  );
}
