-- Bluesky and remote job boards (RemoteOK, Remotive, We Work Remotely).
alter table public.prospects drop constraint if exists prospects_platform_check;
alter table public.prospects add constraint prospects_platform_check
  check (platform in ('reddit', 'x', 'linkedin', 'hn', 'bluesky', 'jobboard', 'craigslist', 'facebook', 'discord', 'slack', 'nextdoor', 'indiehackers', 'other'));

alter table public.prospect_runs drop constraint if exists prospect_runs_source_check;
alter table public.prospect_runs add constraint prospect_runs_source_check
  check (source in ('reddit', 'hn', 'bluesky', 'jobs', 'x', 'linkedin'));
