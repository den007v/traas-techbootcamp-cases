"use client";

import type { CaseFilterOptions, CaseFiltersState } from "@/types/filters";

type CaseFiltersProps = {
  options: CaseFilterOptions;
  value: CaseFiltersState;
  onChange: (next: CaseFiltersState) => void;
  onReset: () => void;
};

const pillBase: React.CSSProperties = {
  padding: "0.375rem 1rem",
  borderRadius: "9999px",
  fontSize: "0.875rem",
  fontWeight: 500,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
  color: "var(--color-muted)",
  cursor: "pointer",
  whiteSpace: "nowrap",
  transition: "all 180ms cubic-bezier(0.16, 1, 0.3, 1)",
  lineHeight: 1.5,
};

const pillActive: React.CSSProperties = {
  ...pillBase,
  background: "var(--color-primary)",
  color: "#fff",
  border: "1px solid var(--color-primary)",
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
          style={!value.tag ? pillActive : pillBase}
          onClick={onReset}
        >
          Все кейсы
        </button>

        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            style={value.tag === tag ? pillActive : pillBase}
            onClick={() => setTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
