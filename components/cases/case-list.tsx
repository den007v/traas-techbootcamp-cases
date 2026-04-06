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

  const gridClass =
    items.length === 1
      ? "grid max-w-3xl gap-8"
      : "grid gap-8 md:grid-cols-2";

  return (
    <div className={gridClass}>
      {items.map((item) => (
        <CaseCard key={item.id} item={item} />
      ))}
    </div>
  );
}
