-- Prospecting: public posts where someone asks for a developer (Reddit, X,
-- LinkedIn, Hacker News, plus anything the sales team adds by hand).
-- A prospect becomes a row in `leads` once the person replies.
-- RLS is on with no policies: only server code (service role) touches these.

create table if not exists public.prospects (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  platform       text not null
                 check (platform in ('reddit', 'x', 'linkedin', 'hn', 'craigslist', 'facebook', 'discord', 'slack', 'nextdoor', 'indiehackers', 'other')),
  origin         text not null default 'auto' check (origin in ('auto', 'manual')),
  url            text not null,
  external_id    text,
  author         text,
  author_url     text,
  title          text,
  body           text,
  posted_at      timestamptz,
  community      text,
  status         text not null default 'pending_ai'
                 check (status in ('pending_ai', 'filtered', 'new', 'sent', 'replied', 'skipped', 'lost', 'expired')),
  score          smallint,
  ai             jsonb not null default '{}'::jsonb,
  draft          text,
  ai_attempts    smallint not null default 0,
  sent_at        timestamptz,
  sent_by        text,
  follow_up_at   date,
  followed_up_at timestamptz,
  replied_at     timestamptz,
  lead_id        uuid references public.leads (id) on delete set null,
  notes          text
);

create unique index if not exists prospects_url_key on public.prospects (url);
create index if not exists prospects_status_idx on public.prospects (status, created_at desc);
create index if not exists prospects_follow_up_idx on public.prospects (follow_up_at) where status = 'sent';

alter table public.prospects enable row level security;

drop trigger if exists prospects_touch_updated_at on public.prospects;
create trigger prospects_touch_updated_at
  before update on public.prospects
  for each row execute function public.leads_touch_updated_at();

-- One row per fetch. Apify runs start as 'running' and are collected on a later tick.
create table if not exists public.prospect_runs (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  source      text not null check (source in ('reddit', 'hn', 'x', 'linkedin')),
  status      text not null default 'done' check (status in ('running', 'done', 'failed')),
  apify_run_id text,
  found       integer not null default 0,
  kept        integer not null default 0,
  cost_usd    numeric(10, 4) not null default 0,
  error       text
);

create index if not exists prospect_runs_source_idx on public.prospect_runs (source, created_at desc);
create index if not exists prospect_runs_running_idx on public.prospect_runs (status) where status = 'running';

alter table public.prospect_runs enable row level security;

-- Single-row settings (keywords, subreddits, schedules, budget, caps).
create table if not exists public.prospect_settings (
  id         smallint primary key default 1 check (id = 1),
  updated_at timestamptz not null default now(),
  data       jsonb not null default '{}'::jsonb
);

alter table public.prospect_settings enable row level security;

-- Leads promoted from a prospect use source 'social'. The leads.source column
-- has no check constraint, so nothing to change there.
