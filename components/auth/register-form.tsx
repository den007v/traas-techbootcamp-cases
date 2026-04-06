"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export function RegisterForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!acceptedPrivacy) {
      setError("Нужно принять политику конфиденциальности и согласие на обработку данных.");
      return;
    }
    setLoading(true);

    const supabase = getSupabaseBrowserClient();

    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } }
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").upsert({
        id: data.user.id,
        full_name: fullName,
        role: "participant"
      });

      if (profileError) {
        setError("Аккаунт создан, но профиль не удалось сохранить: " + profileError.message);
        setLoading(false);
        return;
      }
    }

    router.push("/account");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block space-y-1">
        <span className="text-sm text-muted">Имя</span>
        <input
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="focusable w-full rounded-xl border px-3 py-2 text-sm"
          style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
          placeholder="Иван Иванов"
        />
      </label>

      <label className="block space-y-1">
        <span className="text-sm text-muted">Email</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="focusable w-full rounded-xl border px-3 py-2 text-sm"
          style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
          placeholder="you@example.com"
        />
      </label>

      <label className="block space-y-1">
        <span className="text-sm text-muted">Пароль</span>
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="focusable w-full rounded-xl border px-3 py-2 text-sm"
          style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
          placeholder="Минимум 6 символов"
        />
      </label>

      <label className="flex cursor-pointer items-start gap-3 text-sm">
        <input
          type="checkbox"
          checked={acceptedPrivacy}
          onChange={(e) => setAcceptedPrivacy(e.target.checked)}
          className="focusable mt-1 h-4 w-4 shrink-0 rounded border"
          style={{ borderColor: "var(--color-border)", accentColor: "var(--color-primary)" }}
        />
        <span className="text-muted leading-snug">
          Я принимаю политику конфиденциальности и даю согласие на обработку персональных данных.{" "}
          <span className="text-xs opacity-90">(текст документа будет размещён по ссылке позже)</span>
        </span>
      </label>

      {error && (
        <p className="rounded-xl p-3 text-sm" style={{ background: "var(--color-tag-bg)", color: "var(--color-cta)" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-cta focusable w-full rounded-xl px-4 py-2 text-sm font-medium transition disabled:opacity-60"
      >
        {loading ? "Создаём аккаунт..." : "Зарегистрироваться"}
      </button>

      <p className="text-center text-sm text-muted">
        Уже есть аккаунт?{" "}
        <Link href="/auth/login" className="underline" style={{ color: "var(--color-cta)" }}>
          Войти
        </Link>
      </p>
    </form>
  );
}
