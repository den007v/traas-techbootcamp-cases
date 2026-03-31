-- 002_rls_policies.sql
-- RLS policies for roles: admin, editor, participant and anon read-only access

create or replace function public.current_user_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select p.role from public.profiles p where p.id = auth.uid()), 'participant');
$$;

grant execute on function public.current_user_role() to anon, authenticated;

-- companies policies
create policy "companies_select_all"
on public.companies
for select
to anon, authenticated
using (true);

create policy "companies_insert_editor_admin"
on public.companies
for insert
to authenticated
with check (public.current_user_role() in ('admin', 'editor'));

create policy "companies_update_editor_admin"
on public.companies
for update
to authenticated
using (public.current_user_role() in ('admin', 'editor'))
with check (public.current_user_role() in ('admin', 'editor'));

-- case_tags policies
create policy "case_tags_select_all"
on public.case_tags
for select
to anon, authenticated
using (true);

create policy "case_tags_insert_editor_admin"
on public.case_tags
for insert
to authenticated
with check (public.current_user_role() in ('admin', 'editor'));

create policy "case_tags_update_editor_admin"
on public.case_tags
for update
to authenticated
using (public.current_user_role() in ('admin', 'editor'))
with check (public.current_user_role() in ('admin', 'editor'));

-- cases policies
create policy "cases_select_published_or_privileged"
on public.cases
for select
to anon, authenticated
using (
  is_published = true
  or (
    auth.role() = 'authenticated'
    and (
      created_by = auth.uid()
      or public.current_user_role() in ('admin', 'editor')
    )
  )
);

create policy "cases_insert_owner_authenticated"
on public.cases
for insert
to authenticated
with check (created_by = auth.uid());

create policy "cases_update_owner_or_editor_admin"
on public.cases
for update
to authenticated
using (
  created_by = auth.uid()
  or public.current_user_role() in ('admin', 'editor')
)
with check (
  created_by = auth.uid()
  or public.current_user_role() in ('admin', 'editor')
);

create policy "cases_delete_admin_only"
on public.cases
for delete
to authenticated
using (public.current_user_role() = 'admin');

-- case_tag_links policies
create policy "case_tag_links_select_published_or_privileged"
on public.case_tag_links
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.cases c
    where c.id = case_tag_links.case_id
      and (
        c.is_published = true
        or (
          auth.role() = 'authenticated'
          and (
            c.created_by = auth.uid()
            or public.current_user_role() in ('admin', 'editor')
          )
        )
      )
  )
);

create policy "case_tag_links_insert_owner_or_editor_admin"
on public.case_tag_links
for insert
to authenticated
with check (
  exists (
    select 1
    from public.cases c
    where c.id = case_tag_links.case_id
      and (
        c.created_by = auth.uid()
        or public.current_user_role() in ('admin', 'editor')
      )
  )
);

create policy "case_tag_links_delete_owner_or_editor_admin"
on public.case_tag_links
for delete
to authenticated
using (
  exists (
    select 1
    from public.cases c
    where c.id = case_tag_links.case_id
      and (
        c.created_by = auth.uid()
        or public.current_user_role() in ('admin', 'editor')
      )
  )
);

-- profiles policies
create policy "profiles_select_self_or_admin"
on public.profiles
for select
to authenticated
using (id = auth.uid() or public.current_user_role() = 'admin');

create policy "profiles_insert_self_or_admin"
on public.profiles
for insert
to authenticated
with check (id = auth.uid() or public.current_user_role() = 'admin');

create policy "profiles_update_self_or_admin"
on public.profiles
for update
to authenticated
using (id = auth.uid() or public.current_user_role() = 'admin')
with check (id = auth.uid() or public.current_user_role() = 'admin');
