import Link from "next/link";

type MyCaseRow = {
  id: string;
  title: string;
  track: string;
  is_published: boolean;
  created_at: string;
};

type MyCasesListProps = {
  cases: MyCaseRow[];
};

const trackLabels: Record<string, string> = {
  traas: "TraaS",
  tech_bootcamp: "Tech Bootcamp"
};

export function MyCasesList({ cases }: MyCasesListProps) {
  if (cases.length === 0) {
    return <p className="text-sm text-muted">Вы пока не добавили ни одного кейса.</p>;
  }

  return (
    <ul className="divide-y" style={{ borderColor: "var(--color-border)" }}>
      {cases.map((item) => (
        <li key={item.id} className="flex items-center justify-between gap-3 py-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium" style={{ color: "var(--color-primary)" }}>
              {item.title}
            </p>
            <p className="mt-0.5 text-xs text-muted">
              {trackLabels[item.track] ?? item.track} · {new Date(item.created_at).toLocaleDateString("ru-RU")}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Link
              href={`/account/cases/${item.id}/edit`}
              className="focusable text-xs text-muted underline decoration-dotted underline-offset-4 transition hover:opacity-70"
            >
              Редактировать
            </Link>
            <span
              className="rounded-full px-2 py-1 text-xs font-medium"
              style={
                item.is_published
                  ? { background: "#dcfce7", color: "#166534" }
                  : { background: "var(--color-tag-bg)", color: "var(--color-cta)" }
              }
            >
              {item.is_published ? "Опубликован" : "На модерации"}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
