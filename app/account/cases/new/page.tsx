import Link from "next/link";
import { CaseForm } from "@/components/account/case-form";
import { createCase, type CreateCaseInput } from "@/lib/cases/mutations";

async function submitCase(formData: FormData): Promise<{ error?: string }> {
  "use server";

  const track = formData.get("track") as string;
  const title = formData.get("title") as string;
  const companyName = formData.get("companyName") as string;
  const topic = formData.get("topic") as string;
  const shortDescription = formData.get("shortDescription") as string;
  const result = formData.get("result") as string;
  const year = Number(formData.get("year"));
  const tagsRaw = (formData.get("tagsRaw") as string) ?? "";

  if (!track || !title || !companyName || !topic || !shortDescription || !result || !year) {
    return { error: "Пожалуйста, заполните все обязательные поля." };
  }

  if (track !== "traas" && track !== "tech_bootcamp") {
    return { error: "Неверный трек." };
  }

  try {
    const input: CreateCaseInput = {
      track: track as "traas" | "tech_bootcamp",
      title,
      companyName,
      topic,
      shortDescription,
      result,
      year,
      tagsRaw
    };

    await createCase(input);
    return {};
  } catch (err) {
    const message = err instanceof Error ? err.message : "Не удалось создать кейс.";
    return { error: message };
  }
}

export default function NewCasePage() {
  return (
    <div className="mx-auto max-w-lg space-y-6 py-4">
      <div>
        <Link href="/account" className="text-sm text-muted underline">
          ← Назад в кабинет
        </Link>
        <h1 className="mt-3 text-2xl font-semibold" style={{ color: "var(--color-primary)" }}>
          Новый кейс
        </h1>
        <p className="mt-1 text-sm text-muted">
          Заполните основную информацию. Кейс отправится на модерацию и появится в каталоге после проверки.
        </p>
      </div>
      <div className="surface-card rounded-2xl p-6 shadow-sm">
        <CaseForm action={submitCase} />
      </div>
    </div>
  );
}
