"use client";

import { useMemo, useState } from "react";
import { CaseFilters } from "@/components/cases/case-filters";
import { CaseList } from "@/components/cases/case-list";
import { applyFilters, defaultFilters, getFilterOptions } from "@/lib/cases/filters";
import type { CaseItem } from "@/types/case";
import type { CaseFiltersState } from "@/types/filters";

type CaseCatalogProps = {
  items: CaseItem[];
};

export function CaseCatalog({ items }: CaseCatalogProps) {
  const [filters, setFilters] = useState<CaseFiltersState>(defaultFilters);
  const options = useMemo(() => getFilterOptions(items), [items]);
  const filteredItems = useMemo(() => applyFilters(items, filters), [items, filters]);

  return (
    <div className="space-y-6">
      <CaseFilters
        options={options}
        value={filters}
        onChange={setFilters}
        onReset={() => setFilters(defaultFilters)}
      />
      <CaseList items={filteredItems} />
    </div>
  );
}
