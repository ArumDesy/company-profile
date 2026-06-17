-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "posts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "posts_slug_key" ON "posts"("slug");


-- Row Level Security
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
