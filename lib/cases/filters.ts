import type { CaseItem } from "@/types/case";
import type { CaseFilterOptions, CaseFiltersState } from "@/types/filters";

export const defaultFilters: CaseFiltersState = {
  topic: "",
  company: "",
  year: "",
  tag: ""
};

export function getFilterOptions(items: CaseItem[]): CaseFilterOptions {
  const topics = new Set<string>();
  const companies = new Set<string>();
  const years = new Set<string>();
  const tags = new Set<string>();

  items.forEach((item) => {
    topics.add(item.topic);
    companies.add(item.company);
    years.add(String(item.year));
    item.tags.forEach((tag) => tags.add(tag));
  });

  return {
    topics: [...topics].sort(),
    companies: [...companies].sort(),
    years: [...years].sort((a, b) => Number(b) - Number(a)),
    tags: [...tags].sort()
  };
}

export function applyFilters(items: CaseItem[], filters: CaseFiltersState): CaseItem[] {
  return items.filter((item) => {
    const byTopic = !filters.topic || item.topic === filters.topic;
    const byCompany = !filters.company || item.company === filters.company;
    const byYear = !filters.year || String(item.year) === filters.year;
    const byTag = !filters.tag || item.tags.includes(filters.tag);
    return byTopic && byCompany && byYear && byTag;
  });
}
