-- Leads pipeline: every inbound form submission plus leads added by hand.
-- RLS is on with no policies, so only the service role (server code) can read
-- or write. The dashboard checks DEVELOPER_EMAIL before using it.

create table if not exists public.leads (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  source         text not null,
  status         text not null default 'new'
                 check (status in ('new', 'contacted', 'replied', 'call', 'quoted', 'won', 'lost')),
  name           text,
  email          text,
  phone          text,
  company        text,
  website        text,
  service        text,
  budget         text,
  message        text,
  quote_amount   numeric(10, 2),
  next_follow_up date,
  notes          text,
  meta           jsonb not null default '{}'::jsonb
);

create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx on public.leads (lower(email));

alter table public.leads enable row level security;

create or replace function public.leads_touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists leads_touch_updated_at on public.leads;
create trigger leads_touch_updated_at
  before update on public.leads
  for each row execute function public.leads_touch_updated_at();
