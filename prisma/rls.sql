alter table posts enable row level security;
alter table messages enable row level security;

create schema if not exists private;

create table if not exists private.admin_emails (email text primary key);

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = private, public
as $$
  select exists (
    select 1 from private.admin_emails
    where lower(email) = lower(coalesce((auth.jwt() ->> 'email'), ''))
  );
$$;

grant usage on schema private to anon, authenticated;
grant execute on function private.is_admin() to anon, authenticated;

drop policy if exists "publik baca posts terbit" on posts;
drop policy if exists "authenticated kelola posts" on posts;
drop policy if exists "baca posts" on posts;
drop policy if exists "admin tulis posts" on posts;
drop policy if exists "admin ubah posts" on posts;
drop policy if exists "admin hapus posts" on posts;

create policy "baca posts"
  on posts for select
  to anon, authenticated
  using (published or private.is_admin());

create policy "admin tulis posts"
  on posts for insert
  to authenticated
  with check (private.is_admin());

create policy "admin ubah posts"
  on posts for update
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create policy "admin hapus posts"
  on posts for delete
  to authenticated
  using (private.is_admin());

drop policy if exists "authenticated baca messages" on messages;
drop policy if exists "authenticated hapus messages" on messages;
drop policy if exists "publik kirim messages" on messages;
drop policy if exists "admin baca messages" on messages;
drop policy if exists "admin hapus messages" on messages;

create policy "admin baca messages"
  on messages for select
  to authenticated
  using (private.is_admin());

create policy "admin hapus messages"
  on messages for delete
  to authenticated
  using (private.is_admin());

create policy "publik kirim messages"
  on messages for insert
  to anon, authenticated
  with check (
    char_length(coalesce(name, '')) between 1 and 200
    and char_length(coalesce(email, '')) between 3 and 320
    and char_length(coalesce(content, '')) between 1 and 5000
  );
