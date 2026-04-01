"use client";

import type { CaseFilterOptions, CaseFiltersState } from "@/types/filters";

type CaseFiltersProps = {
  options: CaseFilterOptions;
  value: CaseFiltersState;
  onChange: (next: CaseFiltersState) => void;
  onReset: () => void;
};

export function CaseFilters({ options, value, onChange, onReset }: CaseFiltersProps) {
  const allTags = options.tags;

  function setTag(tag: string) {
    const next = value.tag === tag ? "" : tag;
    onChange({ ...value, tag: next });
  }

  return (
    <div
      className="border-b"
      style={{ paddingBottom: "1.5rem", borderColor: "var(--color-border)" }}
    >
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={`filter-pill focusable${!value.tag ? " active" : ""}`}
          onClick={onReset}
        >
          Все кейсы
        </button>

        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            className={`filter-pill focusable${value.tag === tag ? " active" : ""}`}
            onClick={() => setTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
