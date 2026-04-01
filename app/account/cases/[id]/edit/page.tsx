import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getCaseForEdit } from "@/lib/cases/queries";
import { updateCase, type UpdateCaseInput } from "@/lib/cases/mutations";
import { CaseFormEdit } from "@/components/account/case-form-edit";

type EditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditCasePage({ params }: EditPageProps) {
  const { id } = await params;

  const supabase = await getSupabaseServerClient();
  if (!supabase) redirect("/auth/login");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const caseData = await getCaseForEdit(id);
  if (!caseData) notFound();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  const role = profile?.role ?? "participant";
  const isOwner = caseData.createdBy === user.id;
  const isPrivileged = role === "admin" || role === "editor";

  if (!isOwner && !isPrivileged) redirect("/account");

  async function handleUpdate(formData: FormData): Promise<{ error?: string }> {
    "use server";

    const title = formData.get("title") as string;
    const companyName = formData.get("companyName") as string;
    const topic = formData.get("topic") as string;
    const shortDescription = formData.get("shortDescription") as string;
    const result = formData.get("result") as string;
    const year = Number(formData.get("year"));
    const tagsRaw = (formData.get("tagsRaw") as string) ?? "";
    const challenge = (formData.get("challenge") as string) ?? "";
    const solution = (formData.get("solution") as string) ?? "";
    const fullStory = (formData.get("fullStory") as string) ?? "";

    if (!title || !companyName || !topic || !shortDescription || !result || !year) {
      return { error: "Пожалуйста, заполните все обязательные поля." };
    }

    try {
      const input: UpdateCaseInput = {
        title,
        companyName,
        topic,
        shortDescription,
        result,
        year,
        tagsRaw,
        challenge,
        solution,
        fullStory,
      };
      await updateCase(id, input);
      return {};
    } catch (err) {
      const message = err instanceof Error ? err.message : "Не удалось сохранить изменения.";
      return { error: message };
    }
  }

  const defaultValues = {
    track: caseData.track,
    title: caseData.title,
    company: caseData.company,
    topic: caseData.topic,
    shortDescription: caseData.shortDescription,
    result: caseData.result,
    year: caseData.year,
    tagsRaw: caseData.tags.join(", "),
    challenge: caseData.challenge,
    solution: caseData.solution,
    fullStory: caseData.fullStory,
  };

  return (
    <div className="mx-auto max-w-lg space-y-6 py-4">
      <div>
        <Link href="/account" className="text-sm text-muted underline">
          ← Назад в кабинет
        </Link>
        <h1 className="mt-3 text-2xl font-semibold" style={{ color: "var(--color-primary)" }}>
          Редактирование кейса
        </h1>
        <p className="mt-1 text-sm text-muted">
          Изменения не влияют на статус публикации кейса.
        </p>
      </div>
      <div className="surface-card rounded-2xl p-6 shadow-sm">
        <CaseFormEdit defaultValues={defaultValues} action={handleUpdate} />
      </div>
    </div>
  );
}
