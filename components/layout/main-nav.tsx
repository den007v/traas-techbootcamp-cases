import Link from "next/link";
import { navigation } from "@/lib/constants/navigation";

type MainNavProps = {
  isLoggedIn: boolean;
};

export function MainNav({ isLoggedIn }: MainNavProps) {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm">
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="nav-link focusable rounded-full px-3 py-1.5 transition"
        >
          {item.label}
        </Link>
      ))}
      {isLoggedIn ? (
        <Link
          href="/account"
          className="btn-cta focusable rounded-full px-3 py-1.5 text-sm transition"
        >
          Кабинет
        </Link>
      ) : (
        <Link
          href="/auth/login"
          className="btn-ghost focusable rounded-full px-3 py-1.5 transition"
        >
          Войти
        </Link>
      )}
    </nav>
  );
}
