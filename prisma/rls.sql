alter table posts enable row level security;
alter table messages enable row level security;

drop policy if exists "publik baca posts terbit" on posts;
create policy "publik baca posts terbit"
  on posts for select
  to anon, authenticated
  using (published = true);

drop policy if exists "authenticated kelola posts" on posts;
create policy "authenticated kelola posts"
  on posts for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "authenticated baca messages" on messages;
create policy "authenticated baca messages"
  on messages for select
  to authenticated
  using (true);

drop policy if exists "publik kirim messages" on messages;
create policy "publik kirim messages"
  on messages for insert
  to anon, authenticated
  with check (true);

drop policy if exists "authenticated hapus messages" on messages;
create policy "authenticated hapus messages"
  on messages for delete
  to authenticated
  using (true);
