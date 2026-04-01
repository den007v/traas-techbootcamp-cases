"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ModerationStatus } from "@/types/case";

type ModerationCaseRow = {
  id: string;
  title: string;
  track: string;
  author_name: string;
  created_at: string;
  moderation_status: ModerationStatus;
  moderation_comment: string | null;
};

type ModerationListProps = {
  cases: ModerationCaseRow[];
  publishAction: (caseId: string) => Promise<{ error?: string }>;
  returnForChangesAction: (caseId: string, comment: string) => Promise<{ error?: string }>;
  unpublishAction: (caseId: string) => Promise<{ error?: string }>;
};

const trackLabels: Record<string, string> = {
  traas: "TraaS",
  tech_bootcamp: "Tech Bootcamp",
};

const statusLabels: Record<ModerationStatus, string> = {
  pending_review: "На модерации",
  needs_changes: "Нужны правки",
  published: "Опубликован",
  unpublished: "Снят с публикации",
};

const statusColors: Record<ModerationStatus, string> = {
  pending_review: "var(--color-muted)",
  needs_changes: "var(--color-cta)",
  published: "var(--color-accent)",
  unpublished: "var(--color-muted)",
};

export function ModerationList({
  cases,
  publishAction,
  returnForChangesAction,
  unpublishAction,
}: ModerationListProps) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [commentOpen, setCommentOpen] = useState<string | null>(null);
  const [commentText, setCommentText] = useState<Record<string, string>>({});

  async function runAction(fn: () => Promise<{ error?: string }>) {
    setGlobalError(null);
    const result = await fn();
    if (result.error) {
      setGlobalError(result.error);
    } else {
      router.refresh();
    }
    setPendingId(null);
  }

  async function handlePublish(id: string) {
    setPendingId(id);
    await runAction(() => publishAction(id));
  }

  async function handleUnpublish(id: string) {
    setPendingId(id);
    await runAction(() => unpublishAction(id));
  }

  async function handleReturnForChanges(id: string) {
    setPendingId(id);
    const comment = commentText[id] ?? "";
    await runAction(() => returnForChangesAction(id, comment));
    setCommentOpen(null);
    setCommentText((prev) => ({ ...prev, [id]: "" }));
  }

  if (cases.length === 0) {
    return <p className="text-sm text-muted">Нет кейсов.</p>;
  }

  return (
    <div className="space-y-3">
      {globalError && (
        <p
          className="rounded-xl p-3 text-sm"
          style={{ background: "var(--color-tag-bg)", color: "var(--color-cta)" }}
        >
          {globalError}
        </p>
      )}

      <ul className="divide-y" style={{ borderColor: "var(--color-border)" }}>
        {cases.map((item) => {
          const isReturning = commentOpen === item.id;
          const isBusy = pendingId === item.id;
          const canPublish =
            item.moderation_status === "pending_review" ||
            item.moderation_status === "needs_changes" ||
            item.moderation_status === "unpublished";
          const canReturn =
            item.moderation_status === "pending_review" ||
            item.moderation_status === "needs_changes";
          const canUnpublish = item.moderation_status === "published";

          return (
            <li key={item.id} className="py-4 space-y-2">
              <div className="flex items-start justify-between gap-4">
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
                  <p className="mt-1 text-xs font-medium" style={{ color: statusColors[item.moderation_status] }}>
                    {statusLabels[item.moderation_status]}
                  </p>
                  {item.moderation_comment && (
                    <p className="mt-1 text-xs text-muted italic">
                      Комментарий: {item.moderation_comment}
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 flex-col gap-1.5 items-end">
                  {canPublish && (
                    <button
                      onClick={() => handlePublish(item.id)}
                      disabled={isBusy}
                      className="btn-cta focusable rounded-xl px-3 py-1.5 text-xs font-medium transition disabled:opacity-60"
                    >
                      {isBusy && pendingId === item.id ? "..." : "Опубликовать"}
                    </button>
                  )}
                  {canReturn && (
                    <button
                      onClick={() =>
                        setCommentOpen(isReturning ? null : item.id)
                      }
                      disabled={isBusy}
                      className="focusable rounded-xl border px-3 py-1.5 text-xs font-medium transition disabled:opacity-60"
                      style={{
                        borderColor: "var(--color-border)",
                        color: "var(--color-primary)",
                      }}
                    >
                      Вернуть на доработку
                    </button>
                  )}
                  {canUnpublish && (
                    <button
                      onClick={() => handleUnpublish(item.id)}
                      disabled={isBusy}
                      className="focusable rounded-xl border px-3 py-1.5 text-xs font-medium transition disabled:opacity-60"
                      style={{
                        borderColor: "var(--color-border)",
                        color: "var(--color-primary)",
                      }}
                    >
                      {isBusy ? "..." : "Снять с публикации"}
                    </button>
                  )}
                </div>
              </div>

              {isReturning && (
                <div className="flex gap-2 items-end">
                  <textarea
                    rows={2}
                    placeholder="Комментарий для автора (необязательно)"
                    value={commentText[item.id] ?? ""}
                    onChange={(e) =>
                      setCommentText((prev) => ({ ...prev, [item.id]: e.target.value }))
                    }
                    className="w-full rounded-xl border px-3 py-2 text-xs resize-none focus:outline-none"
                    style={{
                      borderColor: "var(--color-border)",
                      background: "var(--color-surface)",
                      color: "var(--color-primary)",
                    }}
                  />
                  <button
                    onClick={() => handleReturnForChanges(item.id)}
                    disabled={isBusy}
                    className="btn-cta focusable shrink-0 rounded-xl px-3 py-1.5 text-xs font-medium transition disabled:opacity-60"
                  >
                    {isBusy ? "..." : "Отправить"}
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
