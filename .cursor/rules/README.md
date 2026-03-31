# Обзор правил Cursor

## Что здесь находится
В этой папке лежат правила проекта для Cursor AI.  
Правила бывают глобальные (`alwaysApply: true`) и scoped (`globs` + `alwaysApply: false`).

## Список rule-файлов
- `01-project-standards.mdc`
  - **За что отвечает:** Общий процесс работы и порядок этапов для сайта TraaS + Tech Bootcamp.
  - **Режим:** `always apply`
  - **Когда применяется:** Во всех задачах проекта.

- `02-code-style.mdc`
  - **За что отвечает:** Стиль кода и архитектурные соглашения для исходников.
  - **Режим:** `scoped`
  - **Когда применяется:** Для `**/*.{ts,tsx,js,jsx}` и задач по коду.

- `03-supabase-guardrails.mdc`
  - **За что отвечает:** Правила безопасности для Supabase/database layer: schema, migrations, roles, RLS, SQL.
  - **Режим:** `scoped`
  - **Когда применяется:** Для `supabase/**/*.sql`, migration SQL и задач по schema/policies.

## Когда какое правило срабатывает
- Используй `01-project-standards.mdc` для планирования, этапности и безопасного процесса изменений.
- Используй `02-code-style.mdc` при создании/изменении frontend и backend файлов приложения.
- Используй `03-supabase-guardrails.mdc` для любых изменений БД: schema, migrations, grants/roles и RLS policies.

## Always apply и scoped
- **Always apply:** `01-project-standards.mdc`
- **Scoped:** `02-code-style.mdc`, `03-supabase-guardrails.mdc`

## Как добавлять новые rule-файлы (кратко)
1. Определи одну четкую цель для нового правила (одна тема на файл).
2. Выбери область действия: глобально (`alwaysApply: true`) или по файлам (`globs` + `alwaysApply: false`).
3. Создай новый `.mdc` с frontmatter и короткими прикладными правилами.
4. Добавь новый файл в раздел "Список rule-файлов" в этом README.
5. Проверь, чтобы не было дублирования и противоречий с текущими правилами.
