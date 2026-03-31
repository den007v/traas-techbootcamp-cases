import { CaseCard } from "@/components/cases/case-card";
import type { CaseItem } from "@/types/case";

type CaseListProps = {
  items: CaseItem[];
};

export function CaseList({ items }: CaseListProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
        <p className="text-sm text-slate-700">По выбранным фильтрам кейсы не найдены.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <CaseCard key={item.id} item={item} />
      ))}
    </div>
  );
}
