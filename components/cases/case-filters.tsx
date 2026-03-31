import type { CaseFilterOptions, CaseFiltersState } from "@/types/filters";

type CaseFiltersProps = {
  options: CaseFilterOptions;
  value: CaseFiltersState;
  onChange: (next: CaseFiltersState) => void;
  onReset: () => void;
};

export function CaseFilters({ options, value, onChange, onReset }: CaseFiltersProps) {
  const setField = (field: keyof CaseFiltersState, nextValue: string) => {
    onChange({ ...value, [field]: nextValue });
  };

  return (
    <section className="filter-surface rounded-2xl p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
          Фильтры
        </p>
        <button
          type="button"
          className="focusable text-xs underline decoration-dotted underline-offset-4"
          style={{ color: "var(--color-cta)" }}
          onClick={onReset}
        >
          Сбросить
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <label className="space-y-1">
          <span className="text-xs text-muted">Тема</span>
          <select
            className="focusable w-full rounded-xl border px-3 py-2 text-sm"
            style={{ borderColor: "var(--color-border)", background: "var(--color-filter-bg)", color: "var(--color-text)" }}
            value={value.topic}
            onChange={(event) => setField("topic", event.target.value)}
          >
            <option value="">Все темы</option>
            {options.topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1">
          <span className="text-xs text-muted">Компания</span>
          <select
            className="focusable w-full rounded-xl border px-3 py-2 text-sm"
            style={{ borderColor: "var(--color-border)", background: "var(--color-filter-bg)", color: "var(--color-text)" }}
            value={value.company}
            onChange={(event) => setField("company", event.target.value)}
          >
            <option value="">Все компании</option>
            {options.companies.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1">
          <span className="text-xs text-muted">Год</span>
          <select
            className="focusable w-full rounded-xl border px-3 py-2 text-sm"
            style={{ borderColor: "var(--color-border)", background: "var(--color-filter-bg)", color: "var(--color-text)" }}
            value={value.year}
            onChange={(event) => setField("year", event.target.value)}
          >
            <option value="">Все годы</option>
            {options.years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1">
          <span className="text-xs text-muted">Тег</span>
          <select
            className="focusable w-full rounded-xl border px-3 py-2 text-sm"
            style={{ borderColor: "var(--color-border)", background: "var(--color-filter-bg)", color: "var(--color-text)" }}
            value={value.tag}
            onChange={(event) => setField("tag", event.target.value)}
          >
            <option value="">Все теги</option>
            {options.tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}
