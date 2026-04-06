import type { CaseItem } from "@/types/case";

/** Локальная иллюстрация, если в данных нет обложки */
export function resolveCaseCoverUrl(item: Pick<CaseItem, "coverImageUrl" | "slug" | "track">): string {
  if (item.coverImageUrl) return item.coverImageUrl;
  if (item.slug.includes("homelab")) return "/cases/cover-homelab.svg";
  if (item.slug.includes("motivators") || item.slug.includes("moving")) return "/cases/cover-team.svg";
  return item.track === "tech-bootcamp" ? "/cases/cover-homelab.svg" : "/cases/cover-team.svg";
}
