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
        <li key={item.id} className="flex items-center justify-between py-3">
          <div>
            <p className="text-sm font-medium" style={{ color: "var(--color-primary)" }}>
              {item.title}
            </p>
            <p className="mt-0.5 text-xs text-muted">
              {trackLabels[item.track] ?? item.track} · {new Date(item.created_at).toLocaleDateString("ru-RU")}
            </p>
          </div>
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
        </li>
      ))}
    </ul>
  );
}
