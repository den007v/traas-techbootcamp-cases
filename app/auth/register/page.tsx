import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-sm space-y-6 py-8">
      <div className="text-center">
        <h1 className="text-2xl font-semibold" style={{ color: "var(--color-primary)" }}>
          Регистрация
        </h1>
        <p className="mt-1 text-sm text-muted">Создайте аккаунт, чтобы предложить кейс</p>
      </div>
      <div className="surface-card rounded-2xl p-6 shadow-sm">
        <RegisterForm />
      </div>
    </div>
  );
}
