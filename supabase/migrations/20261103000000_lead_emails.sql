-- Emails sent to leads from the dashboard (Leads -> Email), and addresses that
-- asked not to be emailed. Run once in the Supabase SQL editor. RLS on with no
-- policies: only server code (service role, after the developer check) can use them.

create table if not exists public.lead_emails (
  id              uuid primary key default gen_random_uuid(),
  lead_id         uuid references public.leads (id) on delete set null,
  to_email        text not null,
  subject         text not null,
  body            text not null,
  template        text not null default 'custom',
  zoho_message_id text,
  created_at      timestamptz not null default now()
);

create index if not exists lead_emails_created_idx on public.lead_emails (created_at desc, id);
create index if not exists lead_emails_lead_idx on public.lead_emails (lead_id, created_at desc);
create index if not exists lead_emails_to_idx on public.lead_emails (lower(to_email));

create table if not exists public.email_unsubscribes (
  email      text primary key,
  source     text not null default 'admin',
  created_at timestamptz not null default now()
);

alter table public.lead_emails enable row level security;
alter table public.email_unsubscribes enable row level security;
