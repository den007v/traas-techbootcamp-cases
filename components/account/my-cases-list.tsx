import Link from "next/link";
import type { ModerationStatus } from "@/types/case";

type MyCaseRow = {
  id: string;
  title: string;
  track: string;
  is_published: boolean;
  created_at: string;
  moderation_status?: ModerationStatus | null;
  moderation_comment?: string | null;
};

type MyCasesListProps = {
  cases: MyCaseRow[];
};

const trackLabels: Record<string, string> = {
  traas: "TraaS",
  tech_bootcamp: "Tech Bootcamp"
};

const statusConfig: Record<ModerationStatus, { label: string; bg: string; color: string }> = {
  pending_review: { label: "На модерации",         bg: "var(--color-tag-bg)",  color: "var(--color-cta)" },
  needs_changes:  { label: "Нужны правки",          bg: "#fef3c7",              color: "#92400e" },
  published:      { label: "Опубликован",           bg: "#dcfce7",              color: "#166534" },
  unpublished:    { label: "Снят с публикации",     bg: "var(--color-tag-bg)",  color: "var(--color-muted)" },
};

function resolveStatus(row: MyCaseRow): ModerationStatus {
  if (row.moderation_status) return row.moderation_status;
  return row.is_published ? "published" : "pending_review";
}

export function MyCasesList({ cases }: MyCasesListProps) {
  if (cases.length === 0) {
    return <p className="text-sm text-muted">Вы пока не добавили ни одного кейса.</p>;
  }

  return (
    <ul className="divide-y" style={{ borderColor: "var(--color-border)" }}>
      {cases.map((item) => {
        const status = resolveStatus(item);
        const { label, bg, color } = statusConfig[status];
        const showComment = status === "needs_changes" && item.moderation_comment;

        return (
          <li key={item.id} className="py-3 space-y-1.5">
            <div className="flex items-center justify-between gap-3">
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
                  style={{ background: bg, color }}
                >
                  {label}
                </span>
              </div>
            </div>

            {showComment && (
              <p className="text-xs" style={{ color: "#92400e" }}>
                <span className="font-medium">Комментарий модератора:</span>{" "}
                {item.moderation_comment}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
