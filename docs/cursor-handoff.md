### 1. Проект и стек

Сайт-каталог кейсов для двух треков: TraaS и Tech Bootcamp. Визуальный референс: `techbootcamp-alumni.netlify.app` (скриншоты в `public/references/`).

Стек: Next.js (App Router), Tailwind CSS, Supabase (DB/Auth/Storage), деплой на Vercel.

Рабочая директория: `/Users/denismakarov/Documents/Cursor`

### 2. Что реализовано по этапам

Этап 1 — Каркас: Next.js + Tailwind инициализированы, базовые страницы, layout, header/footer, навигация, mock-данные, типы.

Этап 2 — UI и фильтры: Визуальная система в стиле референса (красный акцент + нейтральная база). Токены цветов в `globals.css`. Рабочие клиентские фильтры (тема/компания/год/тег) через `CaseCatalog` -> `CaseFilters`. Карточки кейсов, пустое состояние, адаптив.

Этап 3 — Supabase (DB + data-layer): Миграции `001_schema.sql` (таблицы), `002_rls_policies.sql` (RLS), `003_seed_from_mocks.sql` (6 seed-кейсов). Data-layer `lib/cases/queries.ts` (`getCases`, `getCaseBySlug`, `getFilterOptions`) с fallback на моки. Публичные страницы читают из Supabase.

Этап 4 — Auth + ЛК: `@supabase/ssr` cookie-based auth. Middleware защищает `/account/*` и редиректит `/auth/*`. Страницы `/auth/login`, `/auth/register`, `/auth/callback`. ЛК `/account` с профилем, ролью, кнопкой выхода. Header показывает "Войти" / "Кабинет" в зависимости от auth.

Этап 5 — Форма кейса + модерация:

- `lib/utils/slug.ts` — генерация slug из кириллицы.
- `lib/cases/mutations.ts` — `createCase`, `publishCase`, `ensureCompany`, `linkTags`.
- `app/account/cases/new/page.tsx` + `components/account/case-form.tsx` — форма добавления кейса через Server Action. Кейс всегда создается с `is_published = false`.
- `components/account/my-cases-list.tsx` — список кейсов пользователя со статусами.
- `app/account/page.tsx` — обновлен: "Мои кейсы" + кнопка "Добавить кейс" + ссылка "Модерация" (для admin/editor).
- `app/account/moderation/page.tsx` — страница модерации. Доступ только для admin/editor (иначе redirect на `/account`). Загружает все черновики (`is_published = false`), сортировка по дате (новые сверху). Server Action `handlePublish` вызывает `publishCase`.
- `components/account/moderation-list.tsx` — клиентский компонент: список черновиков с кнопкой "Опубликовать". После публикации `router.refresh()` обновляет список, опубликованный кейс исчезает из очереди и появляется в публичном каталоге.

### 3. Auth / роли / RLS

Роли (хранятся в `profiles.role`): `admin`, `editor`, `participant`.

RLS-политики (`002_rls_policies.sql`):

- `cases SELECT`: `is_published = true` для всех; черновики видны владельцу + admin/editor.
- `cases INSERT`: только authenticated, `created_by = auth.uid()`.
- `cases UPDATE`: владелец или admin/editor.
- `cases DELETE`: только admin.
- `companies`, `case_tags` SELECT: всем. INSERT/UPDATE: editor/admin.
- `profiles`: self или admin.
- Helper: `public.current_user_role()` — читает роль из `profiles`.

Middleware (`middleware.ts`): срабатывает на `/account/:path*` и `/auth/:path*`. Неавторизованных с `/account` -> `/auth/login`. Авторизованных с `/auth` -> `/account`.

### 4. Полная структура проекта

app/

account/page.tsx, cases/new/page.tsx, moderation/page.tsx

auth/login/page.tsx, register/page.tsx, callback/route.ts

cases/traas/page.tsx, tech-bootcamp/page.tsx, [slug]/page.tsx

layout.tsx, page.tsx, globals.css

components/

account/case-form.tsx, logout-button.tsx, moderation-list.tsx, my-cases-list.tsx

auth/login-form.tsx, register-form.tsx

cases/case-card.tsx, case-catalog.tsx, case-filters.tsx, case-list.tsx

layout/main-nav.tsx, site-footer.tsx, site-header.tsx

lib/

cases/filters.ts, mutations.ts, queries.ts

constants/navigation.ts

mock/cases.ts

supabase/client.ts, middleware.ts, server.ts

utils/slug.ts

types/case.ts, filters.ts

supabase/migrations/001_schema.sql, 002_rls_policies.sql, 003_seed_from_mocks.sql

middleware.ts

.cursor/rules/01-project-standards.mdc, 02-code-style.mdc, 03-supabase-guardrails.mdc

### 5. Следующий шаг

Этап 5 завершён. Возможные следующие шаги:

- Роли и права: UI для назначения ролей (admin panel) или ручное управление через Supabase Dashboard.
- AI-ассистент: placeholder-страница/компонент для будущей AI-функциональности.
- Редактирование кейса: форма редактирования для автора и admin/editor.
- QA и полировка: сквозное тестирование всех сценариев (создание, модерация, публикация, фильтры).
- Деплой: подготовка к Vercel (env vars, build check).

### 6. Ограничения (не ломать)

- Публичные страницы (`/cases/*`) показывают только `is_published = true`.
- `createCase` всегда ставит `is_published = false`.
- `publishCase` проверяет роль на application level + RLS.
- Моки (`lib/mock/cases.ts`) сохранены как fallback.
- Миграции уже применены в Supabase (001, 002, 003).
- Не удалять файлы/таблицы/политики без явного подтверждения.
- Правила проекта зафиксированы в `.cursor/rules/`
