import { CaseCard } from "@/components/cases/case-card";
import type { CaseItem } from "@/types/case";

type CaseListProps = {
  items: CaseItem[];
};

export function CaseList({ items }: CaseListProps) {
  if (items.length === 0) {
    return (
      <div
        className="rounded-[1.25rem] border border-dashed p-10 text-center"
        style={{ borderColor: "var(--color-border)", background: "var(--color-surface-offset)" }}
      >
        <p className="text-sm" style={{ color: "var(--color-muted)" }}>
          По выбранным фильтрам кейсы не найдены.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <CaseCard key={item.id} item={item} />
      ))}
    </div>
  );
}
