import Link from "next/link";
import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { publishCase, returnCaseForChanges, unpublishCase } from "@/lib/cases/mutations";
import { ModerationList } from "@/components/account/moderation-list";
import type { ModerationStatus } from "@/types/case";

async function handlePublish(caseId: string): Promise<{ error?: string }> {
  "use server";
  try {
    await publishCase(caseId);
    return {};
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Не удалось опубликовать кейс." };
  }
}

async function handleReturnForChanges(caseId: string, comment: string): Promise<{ error?: string }> {
  "use server";
  try {
    await returnCaseForChanges(caseId, comment);
    return {};
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Не удалось вернуть кейс на доработку." };
  }
}

async function handleUnpublish(caseId: string): Promise<{ error?: string }> {
  "use server";
  try {
    await unpublishCase(caseId);
    return {};
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Не удалось снять кейс с публикации." };
  }
}

export default async function ModerationPage() {
  const supabase = await getSupabaseServerClient();
  if (!supabase) redirect("/auth/login");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  const role = profile?.role ?? "participant";
  if (role !== "admin" && role !== "editor") redirect("/account");

  const { data: cases } = await supabase
    .from("cases")
    .select("id, title, track, author_name, created_at, moderation_status, moderation_comment")
    .in("moderation_status", ["pending_review", "needs_changes", "published", "unpublished"])
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-xl space-y-6 py-4">
      <div>
        <Link href="/account" className="text-sm text-muted underline">
          ← Назад в кабинет
        </Link>
        <h1
          className="mt-3 text-2xl font-semibold"
          style={{ color: "var(--color-primary)" }}
        >
          Модерация кейсов
        </h1>
        <p className="mt-1 text-sm text-muted">
          Все кейсы по статусу модерации.
        </p>
      </div>

      <div className="surface-card rounded-2xl p-6 shadow-sm">
        <ModerationList
          cases={(cases ?? []) as Array<{
            id: string;
            title: string;
            track: string;
            author_name: string;
            created_at: string;
            moderation_status: ModerationStatus;
            moderation_comment: string | null;
          }>}
          publishAction={handlePublish}
          returnForChangesAction={handleReturnForChanges}
          unpublishAction={handleUnpublish}
        />
      </div>
    </div>
  );
}
