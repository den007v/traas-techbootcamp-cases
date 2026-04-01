"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export type CaseFormEditDefaultValues = {
  track: "traas" | "tech_bootcamp";
  title: string;
  company: string;
  topic: string;
  shortDescription: string;
  result: string;
  year: number;
  tagsRaw: string;
  challenge: string;
  solution: string;
  fullStory: string;
};

type CaseFormEditProps = {
  defaultValues: CaseFormEditDefaultValues;
  action: (formData: FormData) => Promise<{ error?: string }>;
};

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 4 }, (_, i) => String(currentYear - i));

const trackLabels: Record<string, string> = {
  traas: "TraaS",
  tech_bootcamp: "Tech Bootcamp",
};

const inputClass =
  "focusable w-full rounded-xl border px-3 py-2 text-sm";
const inputStyle = {
  borderColor: "var(--color-border)",
  background: "var(--color-surface)",
};

export function CaseFormEdit({ defaultValues, action }: CaseFormEditProps) {
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
    }, 1200);
  }

  if (success) {
    return (
      <div className="rounded-2xl p-6 text-center" style={{ background: "var(--color-tag-bg)" }}>
        <p className="text-lg font-semibold" style={{ color: "var(--color-primary)" }}>
          Изменения сохранены
        </p>
        <p className="mt-2 text-sm text-muted">Перенаправляем в личный кабинет...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <span className="text-sm text-muted">Трек</span>
        <div className="mt-1">
          <span className={`${defaultValues.track === "traas" ? "chip-traas" : "chip-bootcamp"} rounded-full px-3 py-1 text-xs font-medium`}>
            {trackLabels[defaultValues.track] ?? defaultValues.track}
          </span>
          <p className="mt-1 text-xs text-muted">Трек нельзя изменить после создания кейса.</p>
        </div>
      </div>

      <label className="block space-y-1">
        <span className="text-sm text-muted">Название кейса</span>
        <input
          name="title"
          type="text"
          required
          maxLength={200}
          defaultValue={defaultValues.title}
          className={inputClass}
          style={inputStyle}
        />
      </label>

      <label className="block space-y-1">
        <span className="text-sm text-muted">Компания</span>
        <input
          name="companyName"
          type="text"
          required
          maxLength={100}
          defaultValue={defaultValues.company}
          className={inputClass}
          style={inputStyle}
        />
      </label>

      <label className="block space-y-1">
        <span className="text-sm text-muted">Тема</span>
        <input
          name="topic"
          type="text"
          required
          maxLength={80}
          defaultValue={defaultValues.topic}
          className={inputClass}
          style={inputStyle}
        />
      </label>

      <label className="block space-y-1">
        <span className="text-sm text-muted">Краткое описание</span>
        <textarea
          name="shortDescription"
          required
          maxLength={500}
          rows={3}
          defaultValue={defaultValues.shortDescription}
          className={inputClass}
          style={inputStyle}
        />
      </label>

      <label className="block space-y-1">
        <span className="text-sm text-muted">Результат</span>
        <input
          name="result"
          type="text"
          required
          maxLength={200}
          defaultValue={defaultValues.result}
          className={inputClass}
          style={inputStyle}
        />
      </label>

      <label className="block space-y-1">
        <span className="text-sm text-muted">Год</span>
        <select
          name="year"
          required
          defaultValue={String(defaultValues.year)}
          className={inputClass}
          style={inputStyle}
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
          defaultValue={defaultValues.tagsRaw}
          className={inputClass}
          style={inputStyle}
          placeholder="analytics, process, ml"
        />
      </label>

      <label className="block space-y-1">
        <span className="text-sm text-muted">Проблема</span>
        <textarea
          name="challenge"
          maxLength={1000}
          rows={3}
          defaultValue={defaultValues.challenge}
          className={inputClass}
          style={inputStyle}
          placeholder="Какую задачу или проблему предстояло решить"
        />
      </label>

      <label className="block space-y-1">
        <span className="text-sm text-muted">Решение</span>
        <textarea
          name="solution"
          maxLength={1000}
          rows={3}
          defaultValue={defaultValues.solution}
          className={inputClass}
          style={inputStyle}
          placeholder="Что именно было сделано"
        />
      </label>

      <label className="block space-y-1">
        <span className="text-sm text-muted">Подробнее</span>
        <textarea
          name="fullStory"
          maxLength={3000}
          rows={5}
          defaultValue={defaultValues.fullStory}
          className={inputClass}
          style={inputStyle}
          placeholder="Расширенное описание кейса (необязательно)"
        />
      </label>

      {error && (
        <p
          className="rounded-xl p-3 text-sm"
          style={{ background: "var(--color-tag-bg)", color: "var(--color-cta)" }}
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-cta focusable w-full rounded-xl px-4 py-2 text-sm font-medium transition disabled:opacity-60"
      >
        {loading ? "Сохраняем..." : "Сохранить изменения"}
      </button>
    </form>
  );
}
