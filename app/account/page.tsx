import Link from "next/link";
import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/account/logout-button";
import { MyCasesList } from "@/components/account/my-cases-list";

export default async function AccountPage() {
  const supabase = await getSupabaseServerClient();
  if (!supabase) redirect("/auth/login");

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .maybeSingle();

  const displayName = profile?.full_name || user.user_metadata?.full_name || "Участник";
  const role = profile?.role ?? "participant";

  const roleLabels: Record<string, string> = {
    admin: "Администратор",
    editor: "Редактор",
    participant: "Участник"
  };

  const { data: myCases } = await supabase
    .from("cases")
    .select("id, title, track, is_published, created_at")
    .eq("created_by", user.id)
    .order("created_at", { ascending: false });

  const isModeratorOrAdmin = role === "admin" || role === "editor";

  return (
    <section className="mx-auto max-w-xl space-y-6 py-4">
      <h1 className="text-2xl font-semibold" style={{ color: "var(--color-primary)" }}>
        Личный кабинет
      </h1>

      <div className="surface-card rounded-2xl p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-lg font-semibold" style={{ color: "var(--color-primary)" }}>
              {displayName}
            </p>
            <p className="mt-1 text-sm text-muted">{user.email}</p>
            <span className="chip-base mt-2 inline-flex rounded-full px-2 py-1 text-xs">
              {roleLabels[role] ?? role}
            </span>
          </div>
          <LogoutButton />
        </div>
      </div>

      <div className="surface-card rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold" style={{ color: "var(--color-primary)" }}>
            Мои кейсы
          </h2>
          <Link
            href="/account/cases/new"
            className="btn-cta focusable rounded-xl px-3 py-1.5 text-sm font-medium transition"
          >
            Добавить кейс
          </Link>
        </div>
        <div className="mt-4">
          <MyCasesList cases={myCases ?? []} />
        </div>
      </div>

      {isModeratorOrAdmin && (
        <div className="surface-card rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold" style={{ color: "var(--color-primary)" }}>
                Модерация
              </h2>
              <p className="mt-1 text-sm text-muted">Просмотр и публикация кейсов участников</p>
            </div>
            <Link
              href="/account/moderation"
              className="btn-ghost focusable rounded-xl px-3 py-1.5 text-sm transition"
            >
              Открыть
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
