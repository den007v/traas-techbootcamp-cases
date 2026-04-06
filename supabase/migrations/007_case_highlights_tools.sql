-- Метрики для витрины кейса, инструменты, обложка (cover_image_url уже в 001)

alter table public.cases
  add column if not exists highlight_metrics jsonb not null default '[]'::jsonb;

alter table public.cases
  add column if not exists tools_used text[] not null default '{}'::text[];

comment on column public.cases.highlight_metrics is 'JSON-массив объектов { "label": string, "value": string }';
comment on column public.cases.tools_used is 'Список инструментов и технологий, использованных в кейсе';

-- Редакционные кейсы Tech Bootcamp: метрики и инструменты из публикаций
update public.cases
set
  highlight_metrics = '[
    {"label":"Сервисов в HomeLab","value":"28"},
    {"label":"Время до заметки (30 мин встречи)","value":"2–3 мин"},
    {"label":"Встреч через конвейер","value":"100%"}
  ]'::jsonb,
  tools_used = array[
    'Docker','n8n','WhisperX','Ollama','OpenWebUI','Syncthing','Tailscale',
    'Home Assistant','Jellyfin','Portainer','Arr-стек (Sonarr/Radarr/Prowlarr)'
  ]::text[]
where slug = 'bootcamp-homelab-ai-secretary';

update public.cases
set
  highlight_metrics = '[
    {"label":"Индивидуальных встреч","value":"7"},
    {"label":"Подготовка к сессиям","value":"< 1 ч"},
    {"label":"Формат для команды","value":"до 8–10 чел."}
  ]'::jsonb,
  tools_used = array[
    'Moving Motivators','Management 3.0'
  ]::text[]
where slug = 'bootcamp-moving-motivators';

update public.cases
set cover_image_url = '/cases/cover-homelab.svg'
where slug = 'bootcamp-homelab-ai-secretary';

update public.cases
set cover_image_url = '/cases/cover-team.svg'
where slug = 'bootcamp-moving-motivators';

-- Тег automation используется в связях кейса Пахомова; при отсутствии строки — создаём
insert into public.case_tags (name, slug)
values ('Автоматизация', 'automation')
on conflict (slug) do update set name = excluded.name;

-- Человекочитаемые названия тегов на витрине
update public.case_tags set name = 'HomeLab' where slug = 'homelab';
update public.case_tags set name = 'Автоматизация' where slug = 'automation';
update public.case_tags set name = 'ИИ' where slug = 'ai';
update public.case_tags set name = 'LLM' where slug = 'llm';
update public.case_tags set name = 'Инфраструктура' where slug = 'infrastructure';
update public.case_tags set name = 'Управление командой' where slug = 'management';
update public.case_tags set name = 'Инструменты' where slug = 'tools';
