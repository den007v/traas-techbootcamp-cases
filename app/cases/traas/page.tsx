import { CaseCatalog } from "@/components/cases/case-catalog";
import { getCases } from "@/lib/cases/queries";

export default async function TraasCasesPage() {
  const items = await getCases("traas");

  return (
    <section className="space-y-6">
      <div className="rounded-3xl bg-slate-900 px-6 py-8 text-white">
        <p className="text-xs uppercase tracking-[0.15em] text-slate-300">TraaS Track</p>
        <h1 className="mt-2 text-3xl font-semibold">Кейсы TraaS</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-200">
          Практические кейсы по продуктовым и операционным улучшениям с реальными результатами.
        </p>
      </div>
      <CaseCatalog items={items} />
    </section>
  );
}
