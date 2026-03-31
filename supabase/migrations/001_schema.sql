-- 001_schema.sql
-- Base schema for cases platform (companies, profiles, cases, tags, links)

create extension if not exists pgcrypto;

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  website text,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'participant',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_role_check check (role in ('admin', 'editor', 'participant'))
);

create table if not exists public.cases (
  id uuid primary key default gen_random_uuid(),
  track text not null,
  title text not null,
  slug text not null unique,
  company_id uuid not null references public.companies(id) on delete restrict,
  author_name text not null,
  author_role text,
  topic text not null,
  short_description text not null,
  full_story text,
  challenge text,
  solution text,
  result text not null,
  result_type text,
  year int not null,
  cover_image_url text,
  is_published boolean not null default false,
  created_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint cases_track_check check (track in ('traas', 'tech_bootcamp'))
);

create table if not exists public.case_tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.case_tag_links (
  case_id uuid not null references public.cases(id) on delete cascade,
  tag_id uuid not null references public.case_tags(id) on delete cascade,
  primary key (case_id, tag_id)
);

create index if not exists idx_profiles_role on public.profiles(role);
create index if not exists idx_cases_track_published on public.cases(track, is_published);
create index if not exists idx_cases_year on public.cases(year);
create index if not exists idx_cases_company on public.cases(company_id);
create index if not exists idx_cases_topic on public.cases(topic);
create index if not exists idx_case_tag_links_tag on public.case_tag_links(tag_id);
create index if not exists idx_case_tag_links_case on public.case_tag_links(case_id);

alter table public.companies enable row level security;
alter table public.profiles enable row level security;
alter table public.cases enable row level security;
alter table public.case_tags enable row level security;
alter table public.case_tag_links enable row level security;
