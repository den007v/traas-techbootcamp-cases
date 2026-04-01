import { getSupabaseServerClient } from "@/lib/supabase/server";
import { generateSlug } from "@/lib/utils/slug";

export type CreateCaseInput = {
  track: "traas" | "tech_bootcamp";
  title: string;
  companyName: string;
  topic: string;
  shortDescription: string;
  result: string;
  year: number;
  tagsRaw: string;
};

export async function ensureCompany(companyName: string): Promise<string> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) throw new Error("Supabase unavailable");

  const trimmed = companyName.trim();
  const slug = trimmed
    .toLowerCase()
    .replace(/[^a-zа-яё0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const { data: existing } = await supabase
    .from("companies")
    .select("id")
    .eq("name", trimmed)
    .maybeSingle();

  if (existing) return existing.id;

  const { data: created, error } = await supabase
    .from("companies")
    .insert({ name: trimmed, slug })
    .select("id")
    .single();

  if (error) throw new Error("Failed to create company: " + error.message);
  return created.id;
}

export async function linkTags(caseId: string, tagsRaw: string): Promise<void> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return;

  const tagNames = tagsRaw
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);

  if (tagNames.length === 0) return;

  for (const name of tagNames) {
    const slug = name.replace(/[^a-zа-яё0-9]+/g, "-").replace(/^-+|-+$/g, "");

    const { data: existing } = await supabase
      .from("case_tags")
      .select("id")
      .eq("name", name)
      .maybeSingle();

    let tagId: string;

    if (existing) {
      tagId = existing.id;
    } else {
      const { data: created, error } = await supabase
        .from("case_tags")
        .insert({ name, slug })
        .select("id")
        .single();

      if (error) continue;
      tagId = created.id;
    }

    await supabase
      .from("case_tag_links")
      .upsert({ case_id: caseId, tag_id: tagId }, { onConflict: "case_id,tag_id" });
  }
}

export async function createCase(input: CreateCaseInput): Promise<{ id: string; slug: string }> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) throw new Error("Supabase unavailable");

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .maybeSingle();

  const authorName = profile?.full_name || user.user_metadata?.full_name || "Участник";
  const companyId = await ensureCompany(input.companyName);
  const slug = generateSlug(input.track, input.title);

  const { data: created, error } = await supabase
    .from("cases")
    .insert({
      track: input.track,
      title: input.title.trim(),
      slug,
      company_id: companyId,
      author_name: authorName,
      topic: input.topic.trim(),
      short_description: input.shortDescription.trim(),
      result: input.result.trim(),
      year: input.year,
      is_published: false,
      created_by: user.id
    })
    .select("id, slug")
    .single();

  if (error) throw new Error("Failed to create case: " + error.message);

  await linkTags(created.id, input.tagsRaw);

  return { id: created.id, slug: created.slug };
}

export type UpdateCaseInput = {
  title: string;
  companyName: string;
  topic: string;
  shortDescription: string;
  result: string;
  year: number;
  tagsRaw: string;
  challenge?: string;
  solution?: string;
  fullStory?: string;
};

export async function replaceTagLinks(caseId: string, tagsRaw: string): Promise<void> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return;

  await supabase
    .from("case_tag_links")
    .delete()
    .eq("case_id", caseId);

  await linkTags(caseId, tagsRaw);
}

export async function updateCase(caseId: string, input: UpdateCaseInput): Promise<void> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) throw new Error("Supabase unavailable");

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  const role = profile?.role ?? "participant";

  const { data: existing } = await supabase
    .from("cases")
    .select("id, created_by")
    .eq("id", caseId)
    .maybeSingle();

  if (!existing) throw new Error("Case not found");

  const isOwner = existing.created_by === user.id;
  const isPrivileged = role === "admin" || role === "editor";

  if (!isOwner && !isPrivileged) {
    throw new Error("Not allowed to edit this case");
  }

  const companyId = await ensureCompany(input.companyName);

  const { error } = await supabase
    .from("cases")
    .update({
      title: input.title.trim(),
      company_id: companyId,
      topic: input.topic.trim(),
      short_description: input.shortDescription.trim(),
      result: input.result.trim(),
      year: input.year,
      challenge: input.challenge?.trim() || null,
      solution: input.solution?.trim() || null,
      full_story: input.fullStory?.trim() || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", caseId);

  if (error) throw new Error("Failed to update case: " + error.message);

  await replaceTagLinks(caseId, input.tagsRaw);
}

export async function publishCase(caseId: string): Promise<void> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) throw new Error("Supabase unavailable");

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  const role = profile?.role ?? "participant";
  if (role !== "admin" && role !== "editor") {
    throw new Error("Only admin or editor can publish cases");
  }

  const { error } = await supabase
    .from("cases")
    .update({ is_published: true, updated_at: new Date().toISOString() })
    .eq("id", caseId);

  if (error) throw new Error("Failed to publish case: " + error.message);
}
