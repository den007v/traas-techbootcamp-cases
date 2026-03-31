"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type DraftCaseRow = {
  id: string;
  title: string;
  track: string;
  author_name: string;
  created_at: string;
};

type ModerationListProps = {
  drafts: DraftCaseRow[];
  publishAction: (caseId: string) => Promise<{ error?: string }>;
};

const trackLabels: Record<string, string> = {
  traas: "TraaS",
  tech_bootcamp: "Tech Bootcamp",
};

export function ModerationList({ drafts, publishAction }: ModerationListProps) {
  const router = useRouter();
  const [publishingId, setPublishingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handlePublish(caseId: string) {
    setError(null);
    setPublishingId(caseId);

    const result = await publishAction(caseId);

    if (result.error) {
      setError(result.error);
      setPublishingId(null);
      return;
    }

    setPublishingId(null);
    router.refresh();
  }

  if (drafts.length === 0) {
    return (
      <p className="text-sm text-muted">Нет кейсов, ожидающих модерации.</p>
    );
  }

  return (
    <div className="space-y-3">
      {error && (
        <p
          className="rounded-xl p-3 text-sm"
          style={{ background: "var(--color-tag-bg)", color: "var(--color-cta)" }}
        >
          {error}
        </p>
      )}

      <ul className="divide-y" style={{ borderColor: "var(--color-border)" }}>
        {drafts.map((item) => (
          <li key={item.id} className="flex items-center justify-between gap-4 py-4">
            <div className="min-w-0 flex-1">
              <p
                className="truncate text-sm font-medium"
                style={{ color: "var(--color-primary)" }}
              >
                {item.title}
              </p>
              <p className="mt-0.5 text-xs text-muted">
                {trackLabels[item.track] ?? item.track} · {item.author_name} ·{" "}
                {new Date(item.created_at).toLocaleDateString("ru-RU")}
              </p>
            </div>
            <button
              onClick={() => handlePublish(item.id)}
              disabled={publishingId === item.id}
              className="btn-cta focusable shrink-0 rounded-xl px-3 py-1.5 text-xs font-medium transition disabled:opacity-60"
            >
              {publishingId === item.id ? "Публикуем..." : "Опубликовать"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
