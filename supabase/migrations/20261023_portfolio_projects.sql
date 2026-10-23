-- Portfolio admin: projects table + public image bucket.
-- Run once in the Supabase SQL editor (or `supabase db push`).

create table if not exists public.portfolio_projects (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title         text not null,
  category      text not null,
  tags          text[] not null default '{}',
  short_desc    text not null,
  description   text not null,
  problem       text not null default '',
  solution      text not null default '',
  results       text[] not null default '{}',
  technologies  text[] not null default '{}',
  live_url      text,
  images        jsonb not null default '[]'::jsonb,   -- [{ src, alt, caption }]
  cover_index   int not null default 0,
  gradient_from text not null default '#0f172a',
  gradient_to   text not null default '#1e293b',
  published     boolean not null default true,
  sort_order    int not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists portfolio_projects_order_idx
  on public.portfolio_projects (sort_order, created_at desc);

-- Public site may read published rows only. There are no write policies:
-- all writes go through the server with the service role key, after an admin check.
alter table public.portfolio_projects enable row level security;

drop policy if exists "Published projects are public" on public.portfolio_projects;
create policy "Published projects are public"
  on public.portfolio_projects for select
  to anon, authenticated
  using (published = true);

-- Image bucket: public read, 8 MB cap, images only. Uploads use signed URLs
-- issued by the server, so no insert policy is needed for anon users.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('portfolio', 'portfolio', true, 8388608,
        array['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;
