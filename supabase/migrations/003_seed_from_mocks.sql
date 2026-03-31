-- 003_seed_from_mocks.sql
-- Seed baseline data from current mock cases.
-- Safe to run multiple times (upsert-based).

do $$
declare
  v_seed_user_id uuid;
begin
  select id into v_seed_user_id from auth.users order by created_at asc limit 1;

  if v_seed_user_id is null then
    raise exception 'Seed requires at least one user in auth.users. Create a user first, then rerun 003_seed_from_mocks.sql';
  end if;

  -- companies
  insert into public.companies (name, slug)
  values
    ('TechNova', 'technova'),
    ('HelpDesk Pro', 'helpdesk-pro'),
    ('FlowOps', 'flowops'),
    ('DataLane', 'datalane'),
    ('Creator Hub', 'creator-hub'),
    ('Community First', 'community-first')
  on conflict (slug) do update set name = excluded.name;

  -- tags
  insert into public.case_tags (name, slug)
  values
    ('analytics', 'analytics'),
    ('process', 'process'),
    ('ml', 'ml'),
    ('support', 'support'),
    ('ops', 'ops'),
    ('retention', 'retention'),
    ('dashboards', 'dashboards'),
    ('automation', 'automation'),
    ('content', 'content'),
    ('community', 'community'),
    ('engagement', 'engagement')
  on conflict (slug) do update set name = excluded.name;

  -- cases
  insert into public.cases (
    track,
    title,
    slug,
    company_id,
    author_name,
    author_role,
    topic,
    short_description,
    full_story,
    challenge,
    solution,
    result,
    result_type,
    year,
    cover_image_url,
    is_published,
    created_by
  )
  values
    (
      'traas',
      'Оптимизация аналитики продаж',
      'traas-analytics-optimization',
      (select id from public.companies where slug = 'technova'),
      'Команда TraaS',
      'Program participant',
      'Аналитика',
      'Сократили время отчетности и повысили точность данных.',
      null,
      null,
      null,
      'Снижение времени подготовки отчетов на 40%',
      'efficiency',
      2025,
      null,
      true,
      v_seed_user_id
    ),
    (
      'tech_bootcamp',
      'ML-ассистент для поддержки',
      'bootcamp-ml-support-assistant',
      (select id from public.companies where slug = 'helpdesk-pro'),
      'Команда Tech Bootcamp',
      'Program participant',
      'AI',
      'Автоматизировали ответы первой линии поддержки.',
      null,
      null,
      null,
      'Ускорение обработки запросов на 28%',
      'automation',
      2024,
      null,
      true,
      v_seed_user_id
    ),
    (
      'traas',
      'Перезапуск onboarding-процесса',
      'traas-onboarding-revamp',
      (select id from public.companies where slug = 'flowops'),
      'Команда TraaS',
      'Program participant',
      'Операции',
      'Упростили онбординг новых участников и сократили churn.',
      null,
      null,
      null,
      'Снижение оттока на 19%',
      'retention',
      2024,
      null,
      true,
      v_seed_user_id
    ),
    (
      'tech_bootcamp',
      'Слой продуктовой аналитики',
      'bootcamp-product-analytics-layer',
      (select id from public.companies where slug = 'datalane'),
      'Команда Tech Bootcamp',
      'Program participant',
      'Аналитика',
      'Собрали дашборды по ключевым метрикам продуктовых команд.',
      null,
      null,
      null,
      'Ускорение принятия решений в продукте на 30%',
      'efficiency',
      2025,
      null,
      true,
      v_seed_user_id
    ),
    (
      'traas',
      'Автоматизация контент-пайплайна',
      'traas-content-automation',
      (select id from public.companies where slug = 'creator-hub'),
      'Команда TraaS',
      'Program participant',
      'Контент',
      'Внедрили поток подготовки и публикации кейсов без ручных шагов.',
      null,
      null,
      null,
      'Рост скорости публикации в 2 раза',
      'automation',
      2023,
      null,
      true,
      v_seed_user_id
    ),
    (
      'tech_bootcamp',
      'Рост вовлеченности alumni-сообщества',
      'bootcamp-community-growth',
      (select id from public.companies where slug = 'community-first'),
      'Команда Tech Bootcamp',
      'Program participant',
      'Сообщество',
      'Пересобрали механику мероприятий и регулярных активностей.',
      null,
      null,
      null,
      'Рост MAU сообщества на 35%',
      'engagement',
      2023,
      null,
      true,
      v_seed_user_id
    )
  on conflict (slug) do update set
    title = excluded.title,
    company_id = excluded.company_id,
    author_name = excluded.author_name,
    author_role = excluded.author_role,
    topic = excluded.topic,
    short_description = excluded.short_description,
    result = excluded.result,
    result_type = excluded.result_type,
    year = excluded.year,
    is_published = excluded.is_published;

  -- links case <-> tags
  insert into public.case_tag_links (case_id, tag_id)
  values
    ((select id from public.cases where slug = 'traas-analytics-optimization'), (select id from public.case_tags where slug = 'analytics')),
    ((select id from public.cases where slug = 'traas-analytics-optimization'), (select id from public.case_tags where slug = 'process')),
    ((select id from public.cases where slug = 'bootcamp-ml-support-assistant'), (select id from public.case_tags where slug = 'ml')),
    ((select id from public.cases where slug = 'bootcamp-ml-support-assistant'), (select id from public.case_tags where slug = 'support')),
    ((select id from public.cases where slug = 'traas-onboarding-revamp'), (select id from public.case_tags where slug = 'ops')),
    ((select id from public.cases where slug = 'traas-onboarding-revamp'), (select id from public.case_tags where slug = 'retention')),
    ((select id from public.cases where slug = 'bootcamp-product-analytics-layer'), (select id from public.case_tags where slug = 'analytics')),
    ((select id from public.cases where slug = 'bootcamp-product-analytics-layer'), (select id from public.case_tags where slug = 'dashboards')),
    ((select id from public.cases where slug = 'traas-content-automation'), (select id from public.case_tags where slug = 'automation')),
    ((select id from public.cases where slug = 'traas-content-automation'), (select id from public.case_tags where slug = 'content')),
    ((select id from public.cases where slug = 'bootcamp-community-growth'), (select id from public.case_tags where slug = 'community')),
    ((select id from public.cases where slug = 'bootcamp-community-growth'), (select id from public.case_tags where slug = 'engagement'))
  on conflict (case_id, tag_id) do nothing;
end $$;
