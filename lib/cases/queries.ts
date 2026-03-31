import { getFilterOptions as buildFilterOptions } from "@/lib/cases/filters";
import { mockCases } from "@/lib/mock/cases";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { CaseItem, CaseTrack } from "@/types/case";
import type { CaseFilterOptions } from "@/types/filters";

type CaseRow = {
  id: string;
  track: "traas" | "tech_bootcamp";
  slug: string;
  title: string;
  topic: string;
  short_description: string;
  result: string;
  year: number;
  company_id: string;
  companies: { name: string } | { name: string }[] | null;
};

type CaseTagLinkRow = {
  case_id: string;
  case_tags: { name: string } | { name: string }[] | null;
};

function normalizeTrack(track: "traas" | "tech_bootcamp"): CaseTrack {
  return track === "tech_bootcamp" ? "tech-bootcamp" : "traas";
}

function extractCompanyName(companies: CaseRow["companies"]): string {
  if (!companies) return "Unknown company";
  if (Array.isArray(companies)) return companies[0]?.name ?? "Unknown company";
  return companies.name ?? "Unknown company";
}

function extractTagName(caseTags: CaseTagLinkRow["case_tags"]): string | null {
  if (!caseTags) return null;
  if (Array.isArray(caseTags)) return caseTags[0]?.name ?? null;
  return caseTags.name ?? null;
}

async function loadCasesFromSupabase(track?: CaseTrack): Promise<CaseItem[] | null> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return null;

  const dbTrack = track === "tech-bootcamp" ? "tech_bootcamp" : track;

  let query = supabase
    .from("cases")
    .select("id,track,slug,title,topic,short_description,result,year,company_id,companies(name)")
    .eq("is_published", true)
    .order("year", { ascending: false })
    .order("created_at", { ascending: false });

  if (dbTrack) {
    query = query.eq("track", dbTrack);
  }

  const { data: caseRows, error: casesError } = await query;
  if (casesError || !caseRows) return null;

  const ids = caseRows.map((row) => row.id);
  const tagMap = new Map<string, string[]>();

  if (ids.length > 0) {
    const { data: tagRows, error: tagError } = await supabase
      .from("case_tag_links")
      .select("case_id,case_tags(name)")
      .in("case_id", ids);

    if (!tagError && tagRows) {
      for (const row of tagRows as CaseTagLinkRow[]) {
        const tagName = extractTagName(row.case_tags);
        if (!tagName) continue;
        const current = tagMap.get(row.case_id) ?? [];
        current.push(tagName);
        tagMap.set(row.case_id, current);
      }
    }
  }

  return (caseRows as CaseRow[]).map((row) => ({
    id: row.id,
    track: normalizeTrack(row.track),
    slug: row.slug,
    title: row.title,
    company: extractCompanyName(row.companies),
    topic: row.topic,
    shortDescription: row.short_description,
    tags: [...new Set(tagMap.get(row.id) ?? [])],
    year: row.year,
    result: row.result
  }));
}

function loadCasesFromMocks(track?: CaseTrack): CaseItem[] {
  if (!track) return mockCases;
  return mockCases.filter((item) => item.track === track);
}

export async function getCases(track?: CaseTrack): Promise<CaseItem[]> {
  const supabaseCases = await loadCasesFromSupabase(track);
  if (supabaseCases && supabaseCases.length > 0) {
    return supabaseCases;
  }
  return loadCasesFromMocks(track);
}

export async function getCaseBySlug(slug: string): Promise<CaseItem | null> {
  const supabase = await getSupabaseServerClient();

  if (supabase) {
    const { data: row, error } = await supabase
      .from("cases")
      .select("id,track,slug,title,topic,short_description,result,year,company_id,companies(name)")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    if (!error && row) {
      const { data: tagRows } = await supabase
        .from("case_tag_links")
        .select("case_id,case_tags(name)")
        .eq("case_id", row.id);

      const tags =
        tagRows
          ?.map((tagRow) => extractTagName((tagRow as CaseTagLinkRow).case_tags))
          .filter((tag): tag is string => Boolean(tag)) ?? [];

      return {
        id: row.id,
        track: normalizeTrack(row.track),
        slug: row.slug,
        title: row.title,
        company: extractCompanyName(row.companies as CaseRow["companies"]),
        topic: row.topic,
        shortDescription: row.short_description,
        tags: [...new Set(tags)],
        year: row.year,
        result: row.result
      };
    }
  }

  return mockCases.find((item) => item.slug === slug) ?? null;
}

export async function getFilterOptions(track?: CaseTrack): Promise<CaseFilterOptions> {
  const items = await getCases(track);
  return buildFilterOptions(items);
}
