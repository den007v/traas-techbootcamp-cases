import Link from "next/link";
import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { publishCase } from "@/lib/cases/mutations";
import { ModerationList } from "@/components/account/moderation-list";

async function handlePublish(caseId: string): Promise<{ error?: string }> {
  "use server";

  try {
    await publishCase(caseId);
    return {};
  } catch (err) {
    const message = err instanceof Error ? err.message : "Не удалось опубликовать кейс.";
    return { error: message };
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

  if (role !== "admin" && role !== "editor") {
    redirect("/account");
  }

  const { data: drafts } = await supabase
    .from("cases")
    .select("id, title, track, author_name, created_at")
    .eq("is_published", false)
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
          Кейсы, ожидающие проверки. После публикации кейс появится в каталоге.
        </p>
      </div>

      <div className="surface-card rounded-2xl p-6 shadow-sm">
        <ModerationList drafts={drafts ?? []} publishAction={handlePublish} />
      </div>
    </div>
  );
}
