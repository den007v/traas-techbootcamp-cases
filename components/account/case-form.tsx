"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type CaseFormProps = {
  action: (formData: FormData) => Promise<{ error?: string }>;
};

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 4 }, (_, i) => String(currentYear - i));

export function CaseForm({ action }: CaseFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await action(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      router.push("/account");
      router.refresh();
    }, 1500);
  }

  if (success) {
    return (
      <div className="rounded-2xl p-6 text-center" style={{ background: "var(--color-tag-bg)" }}>
        <p className="text-lg font-semibold" style={{ color: "var(--color-primary)" }}>
          Кейс отправлен на модерацию
        </p>
        <p className="mt-2 text-sm text-muted">Перенаправляем в личный кабинет...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block space-y-1">
        <span className="text-sm text-muted">Трек</span>
        <select
          name="track"
          required
          className="focusable w-full rounded-xl border px-3 py-2 text-sm"
          style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
        >
          <option value="traas">TraaS</option>
          <option value="tech_bootcamp">Tech Bootcamp</option>
        </select>
      </label>

      <label className="block space-y-1">
        <span className="text-sm text-muted">Название кейса</span>
        <input
          name="title"
          type="text"
          required
          maxLength={200}
          className="focusable w-full rounded-xl border px-3 py-2 text-sm"
          style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
          placeholder="Например: Автоматизация отчётности"
        />
      </label>

      <label className="block space-y-1">
        <span className="text-sm text-muted">Компания</span>
        <input
          name="companyName"
          type="text"
          required
          maxLength={100}
          className="focusable w-full rounded-xl border px-3 py-2 text-sm"
          style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
          placeholder="Название компании"
        />
      </label>

      <label className="block space-y-1">
        <span className="text-sm text-muted">Тема</span>
        <input
          name="topic"
          type="text"
          required
          maxLength={80}
          className="focusable w-full rounded-xl border px-3 py-2 text-sm"
          style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
          placeholder="Например: Аналитика, AI, Операции"
        />
      </label>

      <label className="block space-y-1">
        <span className="text-sm text-muted">Краткое описание</span>
        <textarea
          name="shortDescription"
          required
          maxLength={500}
          rows={3}
          className="focusable w-full rounded-xl border px-3 py-2 text-sm"
          style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
          placeholder="2–3 предложения о сути кейса"
        />
      </label>

      <label className="block space-y-1">
        <span className="text-sm text-muted">Результат</span>
        <input
          name="result"
          type="text"
          required
          maxLength={200}
          className="focusable w-full rounded-xl border px-3 py-2 text-sm"
          style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
          placeholder="Одна фраза с цифрой, например: Снижение оттока на 19%"
        />
      </label>

      <label className="block space-y-1">
        <span className="text-sm text-muted">Год</span>
        <select
          name="year"
          required
          className="focusable w-full rounded-xl border px-3 py-2 text-sm"
          style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
        >
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </label>

      <label className="block space-y-1">
        <span className="text-sm text-muted">Теги (через запятую)</span>
        <input
          name="tagsRaw"
          type="text"
          maxLength={200}
          className="focusable w-full rounded-xl border px-3 py-2 text-sm"
          style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
          placeholder="analytics, process, ml"
        />
      </label>

      {error && (
        <p className="rounded-xl p-3 text-sm" style={{ background: "var(--color-tag-bg)", color: "var(--color-cta)" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-cta focusable w-full rounded-xl px-4 py-2 text-sm font-medium transition disabled:opacity-60"
      >
        {loading ? "Отправляем..." : "Отправить на модерацию"}
      </button>
    </form>
  );
}
