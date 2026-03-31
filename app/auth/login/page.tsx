import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-sm space-y-6 py-8">
      <div className="text-center">
        <h1 className="text-2xl font-semibold" style={{ color: "var(--color-primary)" }}>
          Вход
        </h1>
        <p className="mt-1 text-sm text-muted">Войдите, чтобы управлять кейсами</p>
      </div>
      <div className="surface-card rounded-2xl p-6 shadow-sm">
        <LoginForm />
      </div>
    </div>
  );
}
