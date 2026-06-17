create schema if not exists extensions;
create extension if not exists pg_trgm with schema extensions;

create index if not exists posts_title_trgm on posts using gin (title extensions.gin_trgm_ops);
create index if not exists posts_excerpt_trgm on posts using gin (excerpt extensions.gin_trgm_ops);
create index if not exists messages_name_trgm on messages using gin (name extensions.gin_trgm_ops);
create index if not exists messages_content_trgm on messages using gin (content extensions.gin_trgm_ops);

create or replace function search_posts(
  search text,
  lim int,
  off int,
  only_published boolean
)
returns table (
  id uuid,
  title text,
  slug text,
  excerpt text,
  content text,
  published boolean,
  created_at timestamptz,
  total_count bigint
)
language sql
stable
set search_path = public, extensions
as $$
  with q as (select nullif(trim(search), '') as term)
  select
    p.id, p.title, p.slug, p.excerpt, p.content, p.published, p.created_at,
    count(*) over() as total_count
  from posts p, q
  where (not only_published or p.published)
    and (
      q.term is null
      or p.title ilike '%' || q.term || '%'
      or p.excerpt ilike '%' || q.term || '%'
      or word_similarity(q.term, p.title) > 0.3
      or word_similarity(q.term, p.excerpt) > 0.3
    )
  order by
    case
      when q.term is null then 0
      else greatest(word_similarity(q.term, p.title), word_similarity(q.term, p.excerpt))
    end desc,
    p.created_at desc
  limit lim offset off;
$$;

create or replace function search_messages(
  search text,
  lim int,
  off int
)
returns table (
  id uuid,
  name text,
  email text,
  content text,
  created_at timestamptz,
  total_count bigint
)
language sql
stable
set search_path = public, extensions
as $$
  with q as (select nullif(trim(search), '') as term)
  select
    m.id, m.name, m.email, m.content, m.created_at,
    count(*) over() as total_count
  from messages m, q
  where
    q.term is null
    or m.name ilike '%' || q.term || '%'
    or m.email ilike '%' || q.term || '%'
    or m.content ilike '%' || q.term || '%'
    or word_similarity(q.term, m.name) > 0.3
    or word_similarity(q.term, m.content) > 0.3
  order by
    case
      when q.term is null then 0
      else greatest(word_similarity(q.term, m.name), word_similarity(q.term, m.content))
    end desc,
    m.created_at desc
  limit lim offset off;
$$;

grant execute on function search_posts(text, int, int, boolean) to anon, authenticated;
grant execute on function search_messages(text, int, int) to authenticated;

alter table _prisma_migrations enable row level security;
