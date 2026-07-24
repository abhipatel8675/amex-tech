export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  readTime: string;
  publishedAt: string;
  gradientFrom: string;
  gradientTo: string;
  featured: boolean;
  image?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  author?: { name: string; url?: string };
  updatedAt?: string;
  faq?: { question: string; answer: string }[];
  imagePosition?: string;
};

export const blogPosts: BlogPost[] = [

{
    slug: "fix-supabase-invalid-api-key",
    title: "Fix: Invalid API Key Error in Supabase",
    excerpt:
      "Seeing 'Invalid API key' from Supabase? Here's exactly why it happens and how to get your keys and env vars right.",
    content: `
## The Problem

The "Invalid API key" error means Supabase rejected the \`apikey\` header on your request because it doesn't match a valid key for your project. This is a client-side configuration issue, not a Supabase outage: the wrong key, a key from another project, or a malformed environment variable are the usual suspects.

## Why It Happens

Every Supabase project has two public-facing keys: the \`anon\` key and the \`service_role\` key. The error shows up when your app sends a key that Supabase can't validate against the project it's pointed at.

Common causes:

- **Wrong key type** - using the \`service_role\` key where an \`anon\` key is expected, or vice versa.
- **Key from a different project** - copy-pasted from an old project or a teammate's \`.env\` file.
- **Env var not loaded or typo'd** - the variable name is misspelled, or the file isn't picked up by your build tool.
- **Using the JWT secret instead of the anon key** - the JWT secret is a signing secret, not an API key, and Supabase will reject it outright.
- **Extra whitespace or a trailing newline** - pasting a key from a password manager or terminal often adds an invisible character that breaks the string.

## The Fix

### 1. Get the correct keys from Project Settings

In the Supabase dashboard, go to **Project Settings > API**. You'll see the **Project URL**, the **anon public** key, and the **service_role** key. Copy the \`anon\` key for anything that runs in the browser.

### 2. Set your environment variables correctly

In a Next.js project, set both values in \`.env.local\`:

\`\`\`bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
\`\`\`

Make sure there are no quotes, no trailing spaces, and no line breaks inside the key value. Then initialize the client with those variables:

\`\`\`ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
\`\`\`

### 3. Restart the dev server

Next.js only reads \`.env.local\` on startup. If you edited the file while the server was running, stop it and run \`npm run dev\` again - a hot reload is not enough.

### 4. Never mix up anon and service_role

The \`anon\` key is safe to expose in the browser and respects Row Level Security. The \`service_role\` key bypasses RLS entirely and must only be used in server-side code (API routes, Edge Functions, cron jobs) - never in client components, and never prefixed with \`NEXT_PUBLIC_\`.

### 5. Check for hidden whitespace

If you copied the key from a terminal or a shared doc, log its length to check for stray characters:

\`\`\`ts
console.log(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length);
\`\`\`

A Supabase anon key is a JWT and should be a single continuous string with no line breaks.

## How to Prevent It

- Keep a single source of truth for keys in your team's password manager, tagged by project name.
- Add a startup check that throws a clear error if required env vars are missing.
- Never commit \`.env.local\` - use \`.env.example\` with placeholder values instead.
- Re-copy keys directly from the dashboard rather than reusing ones from memory or old notes.

## Frequently Asked Questions

**Why does my key work locally but not in production?**
Your production environment (Vercel, Netlify, etc.) has its own environment variable settings that are separate from your local \`.env.local\` file - double-check they're set there too.

**Is it safe to expose the anon key in my frontend code?**
Yes, the anon key is designed to be public and is protected by Row Level Security policies on your tables; the service_role key is the one that must stay secret.

**Can rotating my Supabase keys fix this error?**
Rotating keys in Project Settings > API generates new values, which helps if a key was leaked or corrupted, but you must update every place that key is used or the error will return.

**Does an expired session cause 'Invalid API key' too?**
No - an expired session produces a "JWT expired" error, not "Invalid API key"; the two errors point to different problems.

## Need Help With Supabase?

If your Supabase setup keeps throwing configuration errors, we can help you get authentication and environment variables set up correctly the first time. Explore our [development services](/services) or [get in touch](/contact). If you're wiring Supabase into a new app, see our guide on [connecting Next.js and React with Supabase](/blog/connect-nextjs-react-with-supabase).
    `,
    category: "Engineering",
    tags: ["Supabase", "API Keys", "Environment Variables", "Troubleshooting"],
    readTime: "6 min read",
    publishedAt: "2026-07-08",
    gradientFrom: "#ef4444",
    gradientTo: "#f97316",
    featured: false,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=3840&q=95&auto=format&fit=crop",
    author: { name: "Amex Technology Team", url: "https://amextechnology.com/about" },
    updatedAt: "2026-07-08",
    keywords: ["supabase invalid api key", "invalid api key supabase", "supabase anon key error"],
    metaTitle: "Fix: Invalid API Key Error in Supabase",
    metaDescription: "Fix the Supabase 'Invalid API key' error by identifying the wrong key, bad env vars, or anon vs service_role mix-ups.",
    faq: [
      {
        question: "Why does my key work locally but not in production?",
        answer: "Your production environment (Vercel, Netlify, etc.) has its own environment variable settings that are separate from your local .env.local file - double-check they're set there too.",
      },
      {
        question: "Is it safe to expose the anon key in my frontend code?",
        answer: "Yes, the anon key is designed to be public and is protected by Row Level Security policies on your tables; the service_role key is the one that must stay secret.",
      },
      {
        question: "Can rotating my Supabase keys fix this error?",
        answer: "Rotating keys in Project Settings > API generates new values, which helps if a key was leaked or corrupted, but you must update every place that key is used or the error will return.",
      },
      {
        question: "Does an expired session cause 'Invalid API key' too?",
        answer: "No - an expired session produces a 'JWT expired' error, not 'Invalid API key'; the two errors point to different problems.",
      },
    ],
  },
  {
    slug: "fix-supabase-jwt-expired",
    title: "Fix: JWT Expired Error in Supabase Auth",
    excerpt:
      "Getting a 'JWT expired' error from Supabase Auth? Here's why sessions expire and how to make refresh actually work.",
    content: `
## The Problem

"JWT expired" means the access token your app sent with a request has passed its expiry time and Supabase rejected it. It's not a bug in your database or RLS policies - it's a session management issue, and it's almost always fixable by making sure tokens get refreshed correctly.

## Why It Happens

Supabase access tokens are short-lived JWTs (by default valid for one hour) paired with a longer-lived refresh token. The client library is supposed to refresh the access token automatically before it expires, but that only works under the right conditions.

Common causes:

- **Session not auto-refreshed** - the Supabase client was created without \`autoRefreshToken\` enabled, or the tab was inactive long enough that the refresh timer never fired.
- **Using a stale token server-side** - a token was captured once and reused in later server requests instead of being re-read from the current session.
- **Clock skew** - the server or client's system clock is off, so a still-valid token looks expired (or vice versa).
- **Not using the SSR client for cookie-based sessions** - in Next.js, using the browser-only \`supabase-js\` client for server-rendered pages means cookies never get refreshed by the server.

## The Fix

### 1. Let supabase-js handle auto refresh

By default, \`createClient\` from \`@supabase/supabase-js\` refreshes tokens automatically as long as the client stays alive. Make sure you haven't disabled it:

\`\`\`ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
});
\`\`\`

### 2. Use @supabase/ssr in Next.js

For server components, route handlers, and middleware, use \`@supabase/ssr\` so the session lives in cookies and gets refreshed on the server, not just in the browser:

\`\`\`ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );
}
\`\`\`

Pair this with middleware that calls \`supabase.auth.getUser()\` on every request so expired cookies get refreshed before they reach your pages.

### 3. Call getSession or refreshSession explicitly

If you're managing a long-running server process (a cron job, a worker) rather than a request/response cycle, refresh the session manually before using it:

\`\`\`ts
const { data, error } = await supabase.auth.refreshSession();
\`\`\`

### 4. Handle a 401 by refreshing and retrying once

For any code path that calls the Supabase REST or Storage API directly (not through supabase-js), catch a 401 with a "JWT expired" message, refresh the session, and retry the request a single time before failing.

## How to Prevent It

- Always create the Supabase client through \`@supabase/ssr\` in server contexts, not the plain browser client.
- Keep the Supabase auth middleware running on every route so tokens refresh proactively.
- Sync system clocks (NTP) on any custom server infrastructure to avoid false expirations.
- Avoid caching a token value outside of the Supabase client's own session storage.

## Frequently Asked Questions

**How long does a Supabase access token last by default?**
One hour by default, though this is configurable in Project Settings > Auth; the refresh token lasts much longer and is used to silently obtain new access tokens.

**Why does the error appear after the browser tab was idle for a while?**
Inactive tabs can miss the refresh timer, so the token expires before the app requests a new one; calling \`getSession()\` on page focus forces a check and refresh if needed.

**Does logging the user out and back in fix it permanently?**
It fixes the immediate error, but if auto-refresh isn't configured correctly the same expiration will recur - fix the client setup rather than relying on re-logins.

**Is 'JWT expired' the same as 'Invalid API key'?**
No - "Invalid API key" is about the project's apikey header being wrong, while "JWT expired" is about a valid but time-expired user session token.

## Need Help With Supabase?

If session expiration keeps breaking your app's auth flow, we can help you set up a reliable Supabase Auth architecture in Next.js. Explore our [development services](/services) or [get in touch](/contact). For the full setup, see our guide on [connecting Next.js and React with Supabase](/blog/connect-nextjs-react-with-supabase).
    `,
    category: "Engineering",
    tags: ["Supabase", "Auth", "JWT", "Troubleshooting"],
    readTime: "6 min read",
    publishedAt: "2026-07-09",
    gradientFrom: "#f59e0b",
    gradientTo: "#ef4444",
    featured: false,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=3840&q=95&auto=format&fit=crop",
    author: { name: "Amex Technology Team", url: "https://amextechnology.com/about" },
    updatedAt: "2026-07-09",
    keywords: ["supabase jwt expired", "jwt expired supabase", "supabase auth session refresh"],
    metaTitle: "Fix: JWT Expired Error in Supabase Auth",
    metaDescription: "Fix the Supabase 'JWT expired' error with proper session auto-refresh and the @supabase/ssr client for Next.js.",
    faq: [
      {
        question: "How long does a Supabase access token last by default?",
        answer: "One hour by default, though this is configurable in Project Settings > Auth; the refresh token lasts much longer and is used to silently obtain new access tokens.",
      },
      {
        question: "Why does the error appear after the browser tab was idle for a while?",
        answer: "Inactive tabs can miss the refresh timer, so the token expires before the app requests a new one; calling getSession() on page focus forces a check and refresh if needed.",
      },
      {
        question: "Does logging the user out and back in fix it permanently?",
        answer: "It fixes the immediate error, but if auto-refresh isn't configured correctly the same expiration will recur - fix the client setup rather than relying on re-logins.",
      },
      {
        question: "Is 'JWT expired' the same as 'Invalid API key'?",
        answer: "No - 'Invalid API key' is about the project's apikey header being wrong, while 'JWT expired' is about a valid but time-expired user session token.",
      },
    ],
  },
  {
    slug: "fix-supabase-relation-does-not-exist",
    title: "Fix: relation does not exist in Supabase",
    excerpt:
      "Supabase or Postgres saying a table's relation does not exist? Here's how to find the real cause and fix it fast.",
    content: `
## The Problem

The error \`relation "table_name" does not exist\` is a Postgres error meaning the query referenced a table (or view) that Postgres can't find in the schema it's looking in. In Supabase this almost always comes down to a missing migration, a typo, or the table sitting in a schema that isn't exposed to the API.

## Why It Happens

Postgres resolves table names against a specific schema search path, and Supabase's API only exposes schemas you've explicitly allowed. The error surfaces for a few distinct reasons that look identical on the surface.

Common causes:

- **Migration not run** - the table was defined in a migration file that was never applied to this database (common when working against a fresh branch or a different environment).
- **Typo in the table name** - a simple mismatch between the name in your query and the actual table name.
- **Table in a different schema** - the table exists, but in a schema other than \`public\`, and that schema hasn't been exposed through Supabase's API settings.
- **Case-sensitivity with quoted identifiers** - Postgres lowercases unquoted identifiers automatically; if the table was created with quotes and mixed case (e.g. \`"Users"\`), you must query it with the exact same quoting and case.
- **Querying before the table is created** - a race condition where application code runs against a database that hasn't finished migrating.

## The Fix

### 1. Confirm the migration actually ran

Check your migration history against the target database:

\`\`\`bash
supabase migration list
\`\`\`

If the table's migration isn't listed as applied, push it:

\`\`\`bash
supabase db push
\`\`\`

### 2. Check the table name and schema in the Table Editor

Open the Supabase dashboard's **Table Editor** and confirm the table exists, its exact spelling, and which schema it lives in. If you expected \`public.orders\` but see it under a custom schema like \`app\`, that's your answer.

### 3. Expose the schema in API settings

By default, Supabase's REST and client libraries only expose the \`public\` schema. If your table lives elsewhere, go to **Project Settings > API > Exposed schemas** and add the schema name, then query it explicitly:

\`\`\`ts
const { data, error } = await supabase
  .schema('app')
  .from('orders')
  .select('*');
\`\`\`

### 4. Match case and quoting exactly

If a table was created with a quoted, mixed-case name, reference it the same way in raw SQL:

\`\`\`sql
SELECT * FROM "Orders";
\`\`\`

In general, prefer creating tables with lowercase, unquoted names to avoid this entirely.

### 5. Verify from the SQL editor directly

Run a quick check to see what actually exists before debugging application code further:

\`\`\`sql
SELECT table_schema, table_name
FROM information_schema.tables
WHERE table_name = 'orders';
\`\`\`

This tells you definitively whether the table exists and in which schema, removing the guesswork.

## How to Prevent It

- Keep migrations under version control and run them as part of your deploy pipeline, not manually.
- Stick to lowercase, unquoted table names to avoid case-sensitivity surprises.
- Default new tables to the \`public\` schema unless you have a clear reason to isolate them, and document any schema you do expose.
- Add a startup or CI check that confirms expected tables exist before deploying application code that depends on them.

## Frequently Asked Questions

**Why does the table show up in the Table Editor but not in my API query?**
It's likely in a schema that isn't exposed to the API - check Project Settings > API > Exposed schemas and add it, or explicitly call \`.schema('your_schema')\` from the client.

**Why does this happen only in production and not locally?**
Your local database usually has migrations auto-applied, while production requires an explicit \`supabase db push\` or deploy step - confirm the migration actually ran against the production project.

**Does restarting Supabase or my app fix this error?**
No - this is a schema state issue, not a caching issue, so restarting won't help until the table is actually created or exposed correctly.

**Is this the same as a 'permission denied for table' error?**
No - "relation does not exist" means Postgres can't find the table at all, while "permission denied" means the table exists but your role or Row Level Security policy is blocking access.

## Need Help With Supabase?

If migrations and schema exposure keep tripping up your Supabase project, we can help you set up a clean, reliable database workflow. Explore our [development services](/services) or [get in touch](/contact). If you're just getting Supabase connected to your app, check out our guide on [connecting Next.js and React with Supabase](/blog/connect-nextjs-react-with-supabase).
    `,
    category: "Engineering",
    tags: ["Supabase", "Postgres", "Database", "Troubleshooting"],
    readTime: "6 min read",
    publishedAt: "2026-07-10",
    gradientFrom: "#0ea5e9",
    gradientTo: "#6366f1",
    featured: false,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=3840&q=95&auto=format&fit=crop",
    author: { name: "Amex Technology Team", url: "https://amextechnology.com/about" },
    updatedAt: "2026-07-10",
    keywords: ["supabase relation does not exist", "relation does not exist postgres", "postgres table not found"],
    metaTitle: "Fix: relation does not exist in Supabase",
    metaDescription: "Fix Postgres 'relation does not exist' in Supabase by checking migrations, table names, and exposed schemas.",
    faq: [
      {
        question: "Why does the table show up in the Table Editor but not in my API query?",
        answer: "It's likely in a schema that isn't exposed to the API - check Project Settings > API > Exposed schemas and add it, or explicitly call .schema('your_schema') from the client.",
      },
      {
        question: "Why does this happen only in production and not locally?",
        answer: "Your local database usually has migrations auto-applied, while production requires an explicit supabase db push or deploy step - confirm the migration actually ran against the production project.",
      },
      {
        question: "Does restarting Supabase or my app fix this error?",
        answer: "No - this is a schema state issue, not a caching issue, so restarting won't help until the table is actually created or exposed correctly.",
      },
      {
        question: "Is this the same as a 'permission denied for table' error?",
        answer: "No - 'relation does not exist' means Postgres can't find the table at all, while 'permission denied' means the table exists but your role or Row Level Security policy is blocking access.",
      },
    ],
  },
{
    slug: "fix-supabase-failed-to-fetch",
    title: "Fix: Supabase 'Failed to fetch' Error",
    excerpt:
      "Seeing 'Failed to fetch' when your app calls Supabase? Here's how to diagnose the real cause and fix it fast.",
    content: `
## The Problem

If your app throws \`TypeError: Failed to fetch\` (or a plain 'Failed to fetch' error) when calling Supabase, the request is failing before it ever reaches Supabase's servers. This is a browser-level network error, not an error returned by Supabase itself, so the fix almost always lives in your environment, not your query logic.

## Why It Happens

The 'Failed to fetch' error in Supabase shows up for a handful of predictable reasons:

- **Wrong or missing Supabase URL** - a typo, trailing slash, or unset \`NEXT_PUBLIC_SUPABASE_URL\` environment variable.
- **Missing \`https://\`** - the fetch API silently fails on malformed URLs.
- **Project is paused** - free-tier Supabase projects auto-pause after a period of inactivity.
- **Network or DNS issues** - a flaky connection, VPN, or corporate firewall blocking the Supabase domain.
- **CORS misconfiguration** - especially common if you're calling Supabase from a custom domain.
- **Ad blockers or browser extensions** - some ad blockers flag \`supabase.co\` requests as trackers.

## The Fix

### 1. Verify your Supabase URL and anon key

Open your Supabase dashboard, go to Project Settings > API, and copy the exact Project URL and anon key. Compare them character-for-character against your environment variables.

\`\`\`ts
// .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
\`\`\`

Then confirm the client is reading them correctly:

\`\`\`ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
\`\`\`

Adding that guard clause turns a silent 'Failed to fetch' into a clear, actionable error message during development.

### 2. Check if your project is paused

Free-tier Supabase projects pause automatically after roughly a week of no activity. A paused project will not respond to any request, which surfaces as 'Failed to fetch' in the browser. Log into the dashboard - if you see a "Restore project" button, that's your problem. Click it and wait a couple of minutes for the database to come back online.

### 3. Inspect the Network tab

Open your browser's DevTools, go to the Network tab, and re-trigger the request. Look at the failed request:

- **Status shows "(failed) net::ERR_NAME_NOT_RESOLVED"** - your URL is wrong or DNS can't resolve it.
- **Status shows "(blocked:other")** - an extension or ad blocker is intercepting the request.
- **No request appears at all** - the code is throwing before \`fetch\` is even called, so check for a bad import or thrown error earlier in the stack.

### 4. Rule out ad blockers and browser extensions

Open your app in an incognito/private window with extensions disabled, or test in a different browser entirely. If the request succeeds there, an extension is the cause. Ad blockers such as uBlock Origin sometimes include filter lists that flag \`*.supabase.co\` as an analytics endpoint.

### 5. Fix CORS on a custom domain

If you're proxying Supabase behind a custom domain or calling it from a different origin, confirm your Supabase project's CORS/Auth settings allow that origin, and that any reverse proxy forwards headers correctly. If you're building on Next.js, see our guide on how to [connect Next.js and React with Supabase](/blog/connect-nextjs-react-with-supabase) for a clean setup that avoids this entirely.

## How to Prevent It

- Always validate required Supabase environment variables at startup instead of letting them fail silently.
- Add a simple uptime check or cron ping if you're on the free tier, so your project never auto-pauses in production.
- Wrap Supabase calls in a try/catch and log the underlying error to distinguish network failures from Supabase API errors.
- Test in an incognito window whenever you see unexplained network failures, to quickly rule out extensions.

## Frequently Asked Questions

**What does 'Failed to fetch' actually mean in Supabase?**
It means the browser's \`fetch\` call never received a response - the request failed at the network layer before reaching Supabase's API, usually due to a bad URL, a paused project, or a blocked request.

**Is 'Failed to fetch' a bug in Supabase?**
No. It's a generic browser error thrown by the \`fetch\` API itself, not an error code returned by Supabase. The cause is almost always in your app's environment or network path.

**Why does my Supabase project keep pausing?**
Free-tier projects pause automatically after about a week without any database activity. Upgrading to a paid plan or scheduling a periodic request prevents this.

**How do I know if it's a CORS issue versus a network issue?**
Check the Network tab in DevTools. A CORS error usually shows a response with a CORS-related message in the console, while a pure network failure shows no response at all or a DNS resolution error.

## Need Help?

If you're still stuck after checking your environment variables, project status, and network tab, our team can help you debug it. Explore our [development services](/services) or [get in touch](/contact).
    `,
    category: "Engineering",
    tags: ["Supabase", "Next.js", "Troubleshooting"],
    readTime: "6 min read",
    publishedAt: "2026-07-11",
    gradientFrom: "#06b6d4",
    gradientTo: "#3b82f6",
    featured: false,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=3840&q=95&auto=format&fit=crop",
    author: { name: "Amex Technology Team", url: "https://amextechnology.com/about" },
    updatedAt: "2026-07-11",
    keywords: ["supabase failed to fetch", "failed to fetch supabase"],
    metaTitle: "Fix: Supabase 'Failed to fetch' Error",
    metaDescription: "Learn why Supabase throws a Failed to fetch error and the exact steps to diagnose and resolve it in minutes.",
    faq: [
      { question: "What does 'Failed to fetch' actually mean in Supabase?", answer: "It means the browser's fetch call never received a response - the request failed at the network layer before reaching Supabase's API, usually due to a bad URL, a paused project, or a blocked request." },
      { question: "Is 'Failed to fetch' a bug in Supabase?", answer: "No. It's a generic browser error thrown by the fetch API itself, not an error code returned by Supabase. The cause is almost always in your app's environment or network path." },
      { question: "Why does my Supabase project keep pausing?", answer: "Free-tier projects pause automatically after about a week without any database activity. Upgrading to a paid plan or scheduling a periodic request prevents this." },
      { question: "How do I know if it's a CORS issue versus a network issue?", answer: "Check the Network tab in DevTools. A CORS error usually shows a response with a CORS-related message in the console, while a pure network failure shows no response at all or a DNS resolution error." },
    ],
  },
  {
    slug: "fix-supabase-session-missing-after-refresh",
    title: "Fix: Supabase Session Missing After Page Refresh",
    excerpt:
      "Users getting logged out every time they refresh the page? Here's why Supabase session state disappears and how to fix it in Next.js.",
    content: `
## The Problem

If a Supabase session goes missing after a page refresh - the user appears logged out even though they just signed in - the root cause is almost always a mismatch between where the session is stored and where it's being read from. This is especially common in Next.js apps that mix client-side and server-side rendering.

## Why It Happens

- **Session stored only in \`localStorage\`** - the default Supabase JS client keeps the session in the browser's local storage, which server components and middleware can't read.
- **Not using \`@supabase/ssr\`** - the older \`@supabase/auth-helpers-nextjs\` or a manually configured client often fails to sync cookies between server and client in the App Router.
- **No middleware refreshing the session** - without middleware, expired access tokens never get refreshed, so the session silently disappears.
- **\`persistSession\` disabled** - if this option is turned off, the session is never saved between page loads.
- **Cookies not being set or read correctly** - misconfigured cookie options (domain, path, \`sameSite\`) can prevent the session cookie from surviving a refresh.

## The Fix

### 1. Use \`@supabase/ssr\` instead of \`localStorage\`-only clients

The \`@supabase/ssr\` package stores the session in cookies, so both the browser and the server can read it. Install it alongside \`@supabase/supabase-js\`:

\`\`\`bash
npm install @supabase/ssr @supabase/supabase-js
\`\`\`

Create a browser client for Client Components:

\`\`\`ts
// utils/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
\`\`\`

And a server client for Server Components and Route Handlers:

\`\`\`ts
// utils/supabase/server.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );
}
\`\`\`

### 2. Add middleware to refresh the session

Without middleware, an expired access token is never refreshed, so the session appears missing after a refresh once the token expires. Add a \`middleware.ts\` file at your project root:

\`\`\`ts
// middleware.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
\`\`\`

This runs on every request, checks the session cookie, and refreshes it automatically before it expires.

### 3. Confirm \`persistSession\` is enabled

If you're configuring the client manually, make sure session persistence is not disabled:

\`\`\`ts
const supabase = createBrowserClient(url, anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
\`\`\`

### 4. Always call \`getUser()\`, not \`getSession()\`, on the server

On the server, \`getSession()\` reads the cookie without validating it, which can return a stale or tampered session. Use \`getUser()\` in Server Components and middleware - it revalidates the token against Supabase's Auth server on every call.

Pairing this with our guide on how to [connect Next.js and React with Supabase](/blog/connect-nextjs-react-with-supabase) will give you a full, correctly wired auth setup from the start.

## How to Prevent It

- Standardize on \`@supabase/ssr\` for any Next.js project using the App Router - never mix it with a plain \`localStorage\`-based client.
- Always add the middleware step, even if your app feels "simple" today.
- Use \`getUser()\` server-side and \`getSession()\` only for quick client-side checks.
- Double-check cookie settings if you're deploying behind a custom domain or subdomain.

## Frequently Asked Questions

**Why does my Supabase session disappear only after a refresh, not on the initial load?**
On the initial load, the client that logged the user in still has the session in memory. On refresh, that memory is cleared, and if the session was only stored in \`localStorage\` (not cookies), server-rendered pages can't see it, which looks like a missing session.

**Do I need middleware if I'm only using Client Components?**
It's still strongly recommended. Without it, expired tokens won't refresh automatically, and users will eventually get logged out mid-session even in a client-only app.

**What's the difference between \`getSession()\` and \`getUser()\`?**
\`getSession()\` reads the session from cookies without verifying it against Supabase, which is fast but not fully trustworthy on the server. \`getUser()\` makes a network call to validate the token, making it safe for authorization checks.

**Is \`@supabase/auth-helpers-nextjs\` deprecated?**
Yes, it has been superseded by \`@supabase/ssr\`, which is the officially recommended package for Next.js and other SSR frameworks going forward.

## Need Help?

Auth and session handling is one of the most common places Next.js and Supabase projects go wrong. Explore our [development services](/services) or [get in touch](/contact) if you'd like a second pair of eyes on your setup.
    `,
    category: "Engineering",
    tags: ["Supabase", "Next.js", "Auth", "Troubleshooting"],
    readTime: "7 min read",
    publishedAt: "2026-07-12",
    gradientFrom: "#8b5cf6",
    gradientTo: "#6366f1",
    featured: false,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=3840&q=95&auto=format&fit=crop",
    author: { name: "Amex Technology Team", url: "https://amextechnology.com/about" },
    updatedAt: "2026-07-12",
    keywords: ["supabase session missing", "supabase logged out on refresh"],
    metaTitle: "Fix: Supabase Session Missing on Refresh",
    metaDescription: "Fix Supabase session missing after page refresh in Next.js using @supabase/ssr, middleware, and correct cookie setup.",
    faq: [
      { question: "Why does my Supabase session disappear only after a refresh, not on the initial load?", answer: "On the initial load, the client that logged the user in still has the session in memory. On refresh, that memory is cleared, and if the session was only stored in localStorage (not cookies), server-rendered pages can't see it, which looks like a missing session." },
      { question: "Do I need middleware if I'm only using Client Components?", answer: "It's still strongly recommended. Without it, expired tokens won't refresh automatically, and users will eventually get logged out mid-session even in a client-only app." },
      { question: "What's the difference between getSession() and getUser()?", answer: "getSession() reads the session from cookies without verifying it against Supabase, which is fast but not fully trustworthy on the server. getUser() makes a network call to validate the token, making it safe for authorization checks." },
      { question: "Is @supabase/auth-helpers-nextjs deprecated?", answer: "Yes, it has been superseded by @supabase/ssr, which is the officially recommended package for Next.js and other SSR frameworks going forward." },
    ],
  },
  {
    slug: "fix-supabase-email-rate-limit-exceeded",
    title: "Fix: Supabase 'Email Rate Limit Exceeded'",
    excerpt:
      "Signups or password resets failing with 'email rate limit exceeded'? Here's why Supabase's default email service is capped and how to fix it.",
    content: `
## The Problem

The 'email rate limit exceeded' error appears when Supabase's built-in email service hits its sending cap, blocking signup confirmations, password resets, and magic links. It's not a bug - it's a hard limit on the default email provider, and the fix is to configure a custom SMTP provider.

## Why It Happens

- **Supabase's default email service has very low limits** - it's meant for development and testing, not production traffic, typically capping out at a small number of emails per hour.
- **Repeated test signups** - creating and deleting test accounts during development burns through the limit quickly.
- **No custom SMTP configured** - if you haven't connected your own provider, every auth email goes through Supabase's shared, rate-limited sender.
- **Shared IP reputation** - because the default sender is shared across many Supabase projects, limits exist to prevent abuse and protect deliverability for everyone.

## The Fix

### 1. Understand the default limits

Supabase's built-in email service is explicitly documented as unsuitable for production. It exists so you can test auth flows without setup, but it is rate-limited aggressively and emails may be delayed or land in spam. Once you see 'email rate limit exceeded', that's your signal to move to a real provider.

### 2. Set up a custom SMTP provider

Go to your Supabase dashboard, then Authentication > Emails > SMTP Settings, and enable custom SMTP. Providers like Resend, SendGrid, or Postmark all work well. At minimum you'll need:

\`\`\`text
Host: smtp.resend.com
Port: 465 (or 587)
Username: resend
Password: your-api-key
Sender email: no-reply@yourdomain.com
Sender name: Your App Name
\`\`\`

If you're using Resend specifically, our step-by-step walkthrough on how to [set up Resend email](/blog/how-to-setup-resend-email) covers domain verification and SMTP credentials in detail.

### 3. Verify your sending domain

Most providers require you to verify domain ownership via DNS records (SPF, DKIM, and sometimes DMARC) before they'll relay email reliably. Skipping this step often results in emails being marked as spam even after SMTP is configured correctly.

### 4. Throttle test signups during development

While developing locally, avoid creating dozens of test accounts in quick succession against your production project. Instead:

- Use a separate Supabase project for local development and testing.
- Reuse the same test account and simply resend the confirmation link rather than signing up repeatedly.
- Check the Auth logs in your dashboard to see how close you are to the current limit.

### 5. Confirm the change took effect

After saving custom SMTP settings, send a test signup or password reset and check the email headers - it should now show your SMTP provider (for example, Resend or SendGrid) instead of Supabase's default sender.

\`\`\`ts
const { error } = await supabase.auth.signUp({
  email: 'test@yourdomain.com',
  password: 'a-strong-password',
});

if (error) {
  console.error('Signup error:', error.message);
}
\`\`\`

If the 'email rate limit exceeded' error persists after configuring SMTP, double-check that the SMTP toggle is actually enabled and saved, since a misconfigured provider silently falls back to the default limited sender in some setups.

## How to Prevent It

- Never rely on Supabase's default email service past initial development.
- Set up custom SMTP before you launch, not after you hit the limit in front of real users.
- Keep separate Supabase projects for development, staging, and production to avoid burning through limits during testing.
- Monitor your email provider's dashboard for bounce and complaint rates, which affect deliverability over time.

## Frequently Asked Questions

**What triggers the 'email rate limit exceeded' error in Supabase?**
It's triggered when the number of auth emails sent through Supabase's default email service exceeds its built-in cap, which is intentionally low because that service isn't meant for production use.

**Does upgrading my Supabase plan increase the email limit?**
Plan upgrades increase some platform limits, but the recommended and most reliable fix is still connecting your own SMTP provider, since the default sender is shared infrastructure regardless of plan.

**Which SMTP provider should I use with Supabase?**
Resend, SendGrid, and Postmark are all commonly used and well-documented with Supabase. Choose based on your existing stack and pricing needs; all three support the custom SMTP settings Supabase requires.

**Will switching to custom SMTP fix delayed or spam-filtered emails too?**
Yes, in most cases. The default email service is both rate-limited and more likely to be flagged as spam. A verified custom domain with proper SPF/DKIM records generally resolves both issues at once.

## Need Help?

Setting up transactional email correctly the first time saves hours of debugging later. Explore our [development services](/services) or [get in touch](/contact) if you'd like help configuring SMTP and auth flows for your project.
    `,
    category: "Engineering",
    tags: ["Supabase", "Auth", "Email", "Troubleshooting"],
    readTime: "6 min read",
    publishedAt: "2026-07-13",
    gradientFrom: "#f59e0b",
    gradientTo: "#ef4444",
    featured: false,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=3840&q=95&auto=format&fit=crop",
    author: { name: "Amex Technology Team", url: "https://amextechnology.com/about" },
    updatedAt: "2026-07-13",
    keywords: ["supabase email rate limit exceeded", "supabase email rate limit"],
    metaTitle: "Fix: Supabase Email Rate Limit Exceeded",
    metaDescription: "Fix Supabase's 'email rate limit exceeded' error by setting up custom SMTP with Resend, SendGrid, or Postmark.",
    faq: [
      { question: "What triggers the 'email rate limit exceeded' error in Supabase?", answer: "It's triggered when the number of auth emails sent through Supabase's default email service exceeds its built-in cap, which is intentionally low because that service isn't meant for production use." },
      { question: "Does upgrading my Supabase plan increase the email limit?", answer: "Plan upgrades increase some platform limits, but the recommended and most reliable fix is still connecting your own SMTP provider, since the default sender is shared infrastructure regardless of plan." },
      { question: "Which SMTP provider should I use with Supabase?", answer: "Resend, SendGrid, and Postmark are all commonly used and well-documented with Supabase. Choose based on your existing stack and pricing needs; all three support the custom SMTP settings Supabase requires." },
      { question: "Will switching to custom SMTP fix delayed or spam-filtered emails too?", answer: "Yes, in most cases. The default email service is both rate-limited and more likely to be flagged as spam. A verified custom domain with proper SPF/DKIM records generally resolves both issues at once." },
    ],
  },
{
    slug: "fix-firestore-missing-or-insufficient-permissions",
    title: "Fix: Firestore 'Missing or Insufficient Permissions'",
    excerpt:
      "Getting Missing or insufficient permissions in Firestore? Here's exactly why it happens and how to fix your security rules.",
    content: `
## The Problem

If Firestore throws **Missing or insufficient permissions**, your security rules are blocking the read or write your app just tried to make. This is not a bug in Firestore — it is Firestore doing its job and rejecting a request that does not satisfy your rules. The fix is almost always to update your \`firestore.rules\` file or the authentication state of the request.

## Why It Happens

There are four common causes behind the missing or insufficient permissions error:

**Default locked rules.** New Firestore databases start in "locked mode," where every read and write is denied by default until you explicitly allow it.

**\`request.auth\` is null.** If the user is not signed in when the request fires, \`request.auth\` is \`null\`, so any rule that checks \`request.auth != null\` or \`request.auth.uid\` will fail.

**Rules don't match the path.** A rule written for \`/users/{userId}\` will not apply to \`/users/{userId}/orders/{orderId}\` unless you explicitly nest a matching rule.

**Test mode expired.** Firestore's "test mode" rules only allow open access for 30 days, then automatically flip to deny-all.

## The Fix

### 1. Check your current security rules

Open the Firebase console under Firestore Database > Rules, or your local \`firestore.rules\` file. A locked default looks like this:

\`\`\`js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
\`\`\`

That \`if false\` blocks everything, which is exactly what produces missing or insufficient permissions on every request.

### 2. Write rules scoped to authenticated users

Replace the blanket deny with rules that check \`request.auth\` and match your actual data model:

\`\`\`js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
\`\`\`

This allows a signed-in user to read and write only their own \`/users/{userId}\` document, using \`request.auth.uid\` to compare against the document ID.

### 3. Confirm the user is actually signed in

If \`request.auth\` is null in your rules, the client is querying before authentication resolves. Guard your query with an auth state check:

\`\`\`js
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

onAuthStateChanged(auth, async (user) => {
  if (!user) return; // avoid querying while unauthenticated
  const snap = await getDoc(doc(db, 'users', user.uid));
  console.log(snap.data());
});
\`\`\`

### 4. Match rules to nested collection paths

Rules do not cascade automatically. If your data lives in a subcollection, add a nested match:

\`\`\`js
match /users/{userId} {
  allow read, write: if request.auth.uid == userId;

  match /orders/{orderId} {
    allow read, write: if request.auth.uid == userId;
  }
}
\`\`\`

### 5. Watch for expired test mode

If your rules still say \`allow read, write: if request.time < timestamp.date(2026, 1, 1);\`, the date has likely passed. Replace it with production rules like the ones above instead of extending the deadline.

## How to Prevent It

- Never ship to production with test-mode rules
- Always scope rules with \`request.auth.uid\` instead of leaving collections open
- Use the Firestore Rules Playground in the console to simulate requests before deploying
- Write nested \`match\` blocks for every subcollection you query
- Add rules unit tests with the Firebase Emulator Suite so permission changes are caught in CI

## Frequently Asked Questions

**Why does Firestore say missing or insufficient permissions even though I'm logged in?**
Your rules may not reference \`request.auth\` correctly, or the path in your query doesn't match a rule you've defined. Log \`request.auth\` in the Rules Playground to confirm it isn't null.

**Does test mode expire automatically?**
Yes. Firestore test mode rules include a hardcoded expiration date and switch to deny-all 30 days after the database is created.

**Can I allow read access to everyone but restrict writes?**
Yes, split the conditions: \`allow read: if true; allow write: if request.auth != null;\` — though open reads are rarely appropriate for production data.

**How do I debug which rule is blocking a specific request?**
Use the Firestore Rules Playground in the Firebase console, or enable debug logging in the Firebase Emulator Suite to see exactly which rule evaluated to false.

## Need Help?

If your security rules keep breaking as your data model grows, our team can audit and rebuild them properly. Explore our [development services](/services) or [get in touch](/contact).
    `,
    category: "Engineering",
    tags: ["Firebase", "Firestore", "Troubleshooting"],
    readTime: "6 min read",
    publishedAt: "2026-07-15",
    gradientFrom: "#f59e0b",
    gradientTo: "#f97316",
    featured: false,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=3840&q=95&auto=format&fit=crop",
    author: { name: "Amex Technology Team", url: "https://amextechnology.com/about" },
    updatedAt: "2026-07-15",
    keywords: ["firestore missing or insufficient permissions", "firebase permission denied"],
    metaTitle: "Fix: Firestore Missing Permissions Error",
    metaDescription: "Firestore Missing or insufficient permissions error explained, with working security rules examples to fix it fast.",
    faq: [
      { question: "Why does Firestore say missing or insufficient permissions even though I'm logged in?", answer: "Your rules may not reference request.auth correctly, or the path in your query doesn't match a rule you've defined. Log request.auth in the Rules Playground to confirm it isn't null." },
      { question: "Does test mode expire automatically?", answer: "Yes. Firestore test mode rules include a hardcoded expiration date and switch to deny-all 30 days after the database is created." },
      { question: "Can I allow read access to everyone but restrict writes?", answer: "Yes, split the conditions: allow read: if true; allow write: if request.auth != null; though open reads are rarely appropriate for production data." },
      { question: "How do I debug which rule is blocking a specific request?", answer: "Use the Firestore Rules Playground in the Firebase console, or enable debug logging in the Firebase Emulator Suite to see exactly which rule evaluated to false." },
    ],
  },
  {
    slug: "fix-firestore-query-requires-an-index",
    title: "Fix: Firestore 'The Query Requires an Index'",
    excerpt:
      "Firestore says the query requires an index? Learn why composite queries need one and how to create it in minutes.",
    content: `
## The Problem

**The query requires an index** is Firestore telling you that a composite query — one combining a filter with an \`orderBy\`, or multiple range filters — needs a composite index that doesn't exist yet. Firestore can only run these queries efficiently against a pre-built index, so it refuses the request instead of scanning every document.

## Why It Happens

Firestore automatically indexes every field individually, but it does not automatically build indexes for combinations of fields. The query requires an index error shows up when you:

- Filter on one field and \`orderBy\` a different field
- Use \`where()\` on two or more fields with range operators (\`<\`, \`<=\`, \`>\`, \`>=\`)
- Combine \`array-contains\` or \`in\` with another filter and an \`orderBy\`

Any of these shapes needs a composite index defined ahead of time.

## The Fix

### 1. Use the link in the error message

The fastest fix: Firestore's error message includes a direct console link that pre-fills the exact composite index your query needs.

\`\`\`text
FirebaseError: The query requires an index. You can create it here:
https://console.firebase.google.com/project/YOUR_PROJECT/firestore/indexes?create_composite=...
\`\`\`

Click the link, confirm the fields, and hit **Create Index**.

### 2. Define indexes in \`firestore.indexes.json\`

For reproducible deploys, define the same index in your indexes file instead of relying on console clicks:

\`\`\`js
{
  "indexes": [
    {
      "collectionGroup": "orders",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    }
  ]
}
\`\`\`

Deploy it with the Firebase CLI:

\`\`\`js
firebase deploy --only firestore:indexes
\`\`\`

### 3. Wait for the index to finish building

New indexes take time to build over existing data — anywhere from seconds to several minutes depending on collection size. Check status under Firestore Database > Indexes in the console before retrying the query; a status of "Building" means it isn't ready yet.

### 4. Simplify the query if you don't actually need a composite index

Sometimes the query requires an index error is a sign the query itself is doing too much. Consider:

\`\`\`js
// Instead of filtering and ordering on different fields:
query(collection(db, 'orders'), where('status', '==', 'paid'), orderBy('createdAt', 'desc'));

// Split into a client-side sort if the result set is small:
const snap = await getDocs(query(collection(db, 'orders'), where('status', '==', 'paid')));
const sorted = snap.docs.map((d) => d.data()).sort((a, b) => b.createdAt - a.createdAt);
\`\`\`

## How to Prevent It

- Check \`firestore.indexes.json\` into version control so indexes ship with every deploy
- Run \`firebase deploy --only firestore:indexes\` as part of CI/CD, not just locally
- Avoid unnecessary composite queries — denormalize data if you find yourself combining many filters
- Review the Indexes tab periodically and delete unused indexes to keep write costs down

## Frequently Asked Questions

**Why doesn't Firestore build composite indexes automatically like single-field ones?**
Composite indexes multiply storage and write costs, so Firestore requires you to opt in explicitly rather than building every possible combination automatically.

**How long does it take for a new index to become active?**
It depends on the size of the collection — small collections index in seconds, while large ones can take minutes. The console shows a live "Building" status.

**Can I create the index without clicking the link in the error?**
Yes, add the field combination to \`firestore.indexes.json\` and run \`firebase deploy --only firestore:indexes\`.

**Will an index fix a query with more than one \`array-contains\` filter?**
No. Firestore only allows one \`array-contains\` or \`array-contains-any\` clause per query regardless of indexing — you'll need to restructure the query.

## Need Help?

If your app's queries keep hitting index errors as your data grows, we can help you design a schema and index strategy that scales. Explore our [development services](/services) or [get in touch](/contact).
    `,
    category: "Engineering",
    tags: ["Firebase", "Firestore", "Troubleshooting"],
    readTime: "5 min read",
    publishedAt: "2026-07-16",
    gradientFrom: "#fbbf24",
    gradientTo: "#f59e0b",
    featured: false,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=3840&q=95&auto=format&fit=crop",
    author: { name: "Amex Technology Team", url: "https://amextechnology.com/about" },
    updatedAt: "2026-07-16",
    keywords: ["firestore query requires an index", "the query requires an index"],
    metaTitle: "Fix: Firestore Query Requires an Index",
    metaDescription: "Firestore The query requires an index error explained, with the fastest fix and a firestore.indexes.json example.",
    faq: [
      { question: "Why doesn't Firestore build composite indexes automatically like single-field ones?", answer: "Composite indexes multiply storage and write costs, so Firestore requires you to opt in explicitly rather than building every possible combination automatically." },
      { question: "How long does it take for a new index to become active?", answer: "It depends on the size of the collection — small collections index in seconds, while large ones can take minutes. The console shows a live Building status." },
      { question: "Can I create the index without clicking the link in the error?", answer: "Yes, add the field combination to firestore.indexes.json and run firebase deploy --only firestore:indexes." },
      { question: "Will an index fix a query with more than one array-contains filter?", answer: "No. Firestore only allows one array-contains or array-contains-any clause per query regardless of indexing, so you'll need to restructure the query." },
    ],
  },
  {
    slug: "fix-firebase-default-app-already-exists",
    title: "Fix: Firebase '[DEFAULT] Already Exists' Error",
    excerpt:
      "Seeing Firebase App named DEFAULT already exists? Here's the exact guard clause that stops it for good.",
    content: `
## The Problem

**Firebase: Firebase App named '[DEFAULT]' already exists (app/duplicate-app)** happens when \`initializeApp()\` runs more than once for the same app instance. It is extremely common in Next.js because hot module reloading and repeated module imports can re-execute your Firebase setup file multiple times during development.

## Why It Happens

Firebase only allows one app registered under the name \`[DEFAULT]\` at a time. The error fires when:

- \`initializeApp()\` is called in a module that gets re-imported or re-evaluated, such as during Next.js Fast Refresh
- Firebase setup code runs in both a client component and a server component, initializing twice
- A shared config file is imported from multiple places without memoizing the app instance

## The Fix

### 1. Guard initialization with \`getApps()\`

Check whether an app already exists before calling \`initializeApp()\` again:

\`\`\`js
import { initializeApp, getApps, getApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export { app };
\`\`\`

\`getApps()\` returns every initialized app; if the array is empty, it's safe to initialize, otherwise reuse the existing one with \`getApp()\`.

### 2. Export a single shared instance

Put this in one file, such as \`lib/firebase.ts\`, and import the exported instances everywhere instead of calling \`initializeApp()\` again:

\`\`\`js
// lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
\`\`\`

### 3. Import from the shared file everywhere

\`\`\`js
import { db, auth } from '@/lib/firebase';
\`\`\`

Never call \`initializeApp()\` a second time in a component, API route, or server action — always import the shared \`app\`, \`db\`, and \`auth\` exports.

### 4. Check for duplicate setup across client and server

If you have separate Firebase setup for server components (e.g. Firebase Admin SDK) and client components (Firebase JS SDK), make sure they use different app names or are kept in fully separate modules — the admin SDK's \`initializeApp\` and the client SDK's \`initializeApp\` do not share the same app registry, but each can still throw this error internally if called twice within its own SDK.

## How to Prevent It

- Centralize Firebase initialization in a single module and import from it everywhere
- Always guard with \`getApps().length\` before calling \`initializeApp()\`
- Never call \`initializeApp()\` inside a component body or a function that runs on every render
- For the Admin SDK, apply the same guard using \`admin.apps.length\` before \`admin.initializeApp()\`

## Frequently Asked Questions

**Why does this error only show up in development, not production?**
Next.js Fast Refresh re-executes modules on file changes during development, which is what triggers repeated \`initializeApp()\` calls. Production builds don't hot-reload, so the duplicate call rarely happens there.

**Does this fix work for the Firebase Admin SDK too?**
Yes, use the equivalent guard: \`const app = admin.apps.length ? admin.app() : admin.initializeApp(config);\`

**Can I name a second app instead of reusing the default one?**
Yes, pass a second argument to \`initializeApp(config, 'secondaryApp')\` to register additional named apps, then retrieve them with \`getApp('secondaryApp')\`.

**Is it safe to call \`getApps()\` on every import?**
Yes, \`getApps()\` is a cheap synchronous lookup against Firebase's internal registry and is the recommended pattern for this exact scenario.

## Need Help?

If Firebase setup issues keep slowing down your Next.js builds, we can restructure your project's initialization so it just works. Explore our [development services](/services) or [get in touch](/contact).
    `,
    category: "Engineering",
    tags: ["Firebase", "Next.js", "Troubleshooting"],
    readTime: "5 min read",
    publishedAt: "2026-07-17",
    gradientFrom: "#f97316",
    gradientTo: "#ef4444",
    featured: false,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=3840&q=95&auto=format&fit=crop",
    author: { name: "Amex Technology Team", url: "https://amextechnology.com/about" },
    updatedAt: "2026-07-17",
    keywords: ["firebase default app already exists", "firebase app already exists"],
    metaTitle: "Fix: Firebase [DEFAULT] Already Exists",
    metaDescription: "Firebase App named DEFAULT already exists error explained, with a getApps() guard clause that fixes it in Next.js.",
    faq: [
      { question: "Why does this error only show up in development, not production?", answer: "Next.js Fast Refresh re-executes modules on file changes during development, which is what triggers repeated initializeApp() calls. Production builds don't hot-reload, so the duplicate call rarely happens there." },
      { question: "Does this fix work for the Firebase Admin SDK too?", answer: "Yes, use the equivalent guard: const app = admin.apps.length ? admin.app() : admin.initializeApp(config);" },
      { question: "Can I name a second app instead of reusing the default one?", answer: "Yes, pass a second argument to initializeApp(config, 'secondaryApp') to register additional named apps, then retrieve them with getApp('secondaryApp')." },
      { question: "Is it safe to call getApps() on every import?", answer: "Yes, getApps() is a cheap synchronous lookup against Firebase's internal registry and is the recommended pattern for this exact scenario." },
    ],
  },
{
    slug: "fix-firebase-auth-invalid-api-key",
    title: "Fix: Firebase auth/invalid-api-key Error",
    excerpt:
      "Seeing auth/invalid-api-key in Firebase? Here's why it happens and the exact fix.",
    content: `
## The Problem

If you're seeing \`Firebase: Error (auth/invalid-api-key)\` when your app tries to initialize Firebase Authentication, it means the \`apiKey\` value in your \`firebaseConfig\` object is missing, undefined, or doesn't match a real Firebase project. The fix almost always comes down to how your environment variables are named and loaded.

## Why It Happens

The \`auth/invalid-api-key\` error is thrown by the Firebase SDK when it can't validate the \`apiKey\` field passed into \`initializeApp()\`. A handful of root causes account for nearly every case:

- The \`apiKey\` was copied from the wrong Firebase project, or was truncated when pasted.
- Environment variables aren't loaded because they're missing the \`NEXT_PUBLIC_\` prefix required by Next.js for client-side code.
- The dev server wasn't restarted after adding or changing \`.env.local\`, so old (empty) values are still cached.
- The \`firebaseConfig\` object references a variable that resolves to \`undefined\` at build time, so Firebase receives an empty string instead of a real key.

Because Firebase Authentication runs in the browser, any config value it needs must be exposed to client-side JavaScript. In Next.js, that only happens for variables prefixed with \`NEXT_PUBLIC_\`.

## The Fix

### 1. Copy the correct config from the Firebase console

Go to **Project settings** in the Firebase console, scroll to **Your apps**, and copy the config snippet for your web app. Double-check you're in the correct project if you manage multiple environments.

\`\`\`js
const firebaseConfig = {
  apiKey: 'AIzaSyD-your-real-key-here',
  authDomain: 'your-project.firebaseapp.com',
  projectId: 'your-project',
  storageBucket: 'your-project.appspot.com',
  messagingSenderId: '1234567890',
  appId: '1:1234567890:web:abcdef123456',
};
\`\`\`

### 2. Set environment variables with the NEXT_PUBLIC_ prefix

In Next.js, only variables starting with \`NEXT_PUBLIC_\` are bundled into client-side code. Add them to \`.env.local\`:

\`\`\`bash
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD-your-real-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abcdef123456
\`\`\`

Then reference them in your config file:

\`\`\`js
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
\`\`\`

### 3. Restart the dev server

Next.js only reads \`.env.local\` on startup. After adding or editing environment variables, stop and restart:

\`\`\`bash
npm run dev
\`\`\`

Saving the file alone is not enough, the running process still holds the old (or missing) values in memory.

### 4. Verify the config object at runtime

Add a temporary log right before \`initializeApp(firebaseConfig)\` to confirm every value is defined, not \`undefined\`:

\`\`\`js
console.log('Firebase config check:', firebaseConfig);
\`\`\`

If any field prints as \`undefined\`, the corresponding environment variable is either misspelled or missing the \`NEXT_PUBLIC_\` prefix.

## How to Prevent It

- Store separate \`.env.local\` files (or Vercel environment variable groups) for each Firebase project you use.
- Always prefix client-exposed Firebase variables with \`NEXT_PUBLIC_\`.
- Add a startup check that throws a clear error if any Firebase config value is \`undefined\`.
- Never commit real API keys, use \`.env.example\` with placeholder values for onboarding.

## Frequently Asked Questions

**What causes the Firebase auth/invalid-api-key error?**
It's almost always a missing, mistyped, or undefined \`apiKey\` value in your \`firebaseConfig\` object, usually because the environment variable feeding it wasn't loaded.

**Why does this happen only in production or after deployment?**
If environment variables are set locally but not in your hosting provider's dashboard, the build won't have access to them, so \`apiKey\` resolves to \`undefined\` in production even though it works locally.

**Do I need the NEXT_PUBLIC_ prefix for Firebase env variables in Next.js?**
Yes. Firebase Authentication runs in the browser, so any config value it needs must be exposed to client-side code, and Next.js only does that for variables prefixed with \`NEXT_PUBLIC_\`.

**How do I verify my Firebase config values are loading correctly?**
Temporarily log the \`firebaseConfig\` object right before calling \`initializeApp()\` and confirm none of the fields print as \`undefined\` or an empty string.

## Need Help?

Debugging Firebase configuration issues across environments can eat up hours. Explore our [development services](/services) or [get in touch](/contact) if you'd like a second pair of eyes on your setup.
    `,
    category: "Engineering",
    tags: ["Firebase", "Next.js", "Troubleshooting"],
    readTime: "5 min read",
    publishedAt: "2026-07-18",
    gradientFrom: "#f59e0b",
    gradientTo: "#ef4444",
    featured: false,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=3840&q=95&auto=format&fit=crop",
    author: { name: "Amex Technology Team", url: "https://amextechnology.com/about" },
    updatedAt: "2026-07-18",
    keywords: ["firebase auth/invalid-api-key", "firebase invalid api key"],
    metaTitle: "Fix: Firebase auth/invalid-api-key Error",
    metaDescription: "Fix Firebase auth/invalid-api-key fast: correct config, NEXT_PUBLIC_ env vars, and a restart checklist for Next.js apps.",
    faq: [
      { question: "What causes the Firebase auth/invalid-api-key error?", answer: "It's almost always a missing, mistyped, or undefined apiKey value in your firebaseConfig object, usually because the environment variable feeding it wasn't loaded." },
      { question: "Why does this happen only in production or after deployment?", answer: "If environment variables are set locally but not in your hosting provider's dashboard, the build won't have access to them, so apiKey resolves to undefined in production even though it works locally." },
      { question: "Do I need the NEXT_PUBLIC_ prefix for Firebase env variables in Next.js?", answer: "Yes. Firebase Authentication runs in the browser, so any config value it needs must be exposed to client-side code, and Next.js only does that for variables prefixed with NEXT_PUBLIC_." },
      { question: "How do I verify my Firebase config values are loading correctly?", answer: "Temporarily log the firebaseConfig object right before calling initializeApp() and confirm none of the fields print as undefined or an empty string." },
    ],
  },
  {
    slug: "fix-nextjs-image-hostname-not-configured",
    title: "Fix: Next.js Image 'hostname not configured' Error",
    excerpt:
      "Getting hostname is not configured under images in next.config.js? Here's the fix.",
    content: `
## The Problem

If Next.js throws \`Invalid src prop on next/image, hostname "X" is not configured under images in your next.config.js\`, it means you're loading an external image whose domain hasn't been allowlisted. Add that hostname to \`images.remotePatterns\` in \`next.config.js\` and the error goes away.

## Why It Happens

The \`next/image\` component optimizes and serves images through a built-in loader for performance and security. To prevent arbitrary external URLs from being proxied through your server, Next.js requires you to explicitly allowlist every hostname you load images from outside your own domain.

This error commonly shows up when:

- You add a new image source (CDN, CMS, Unsplash, S3 bucket, etc.) without updating \`next.config.js\`.
- You migrated from the older \`domains\` array to \`remotePatterns\` and missed a host.
- The hostname in your code doesn't exactly match what's configured (subdomain mismatch, \`http\` vs \`https\`).
- You edited \`next.config.js\` but never restarted the dev server.

## The Fix

### 1. Add the hostname to images.remotePatterns

\`remotePatterns\` is the modern, more precise way to allowlist external image sources, since it lets you control protocol, hostname, port, and path.

\`\`\`js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};
\`\`\`

Update \`hostname\` to match the exact domain shown in your error message.

### 2. Or use the simpler domains array (legacy)

For quick fixes, the older \`domains\` array still works but offers less control:

\`\`\`js
module.exports = {
  images: {
    domains: ['images.unsplash.com'],
  },
};
\`\`\`

Prefer \`remotePatterns\` for new projects, it's the approach Next.js recommends going forward.

### 3. Restart and redeploy

\`next.config.js\` changes are only picked up on server start:

\`\`\`bash
npm run dev
\`\`\`

If the error only appears in production, push your change and trigger a fresh deploy so the updated config is built into the deployment.

## How to Prevent It

- Keep a running list of every external image domain your app uses and check it into \`next.config.js\` as you add new ones.
- Prefer \`remotePatterns\` over \`domains\` for tighter, more explicit control.
- Add a code review checklist item: "new image source added? update next.config.js."
- Test image-heavy pages against a fresh \`next build\` before merging, not just \`next dev\`.

## Frequently Asked Questions

**What does "hostname is not configured" mean in Next.js?**
It means the external domain you're loading an image from with \`next/image\` isn't listed in \`images.remotePatterns\` (or \`images.domains\`) in your \`next.config.js\`.

**What's the difference between domains and remotePatterns?**
\`domains\` only lets you allowlist a hostname. \`remotePatterns\` lets you also control protocol, port, and path, giving you more precise and secure control over which images can be optimized.

**Do I need to redeploy after changing next.config.js?**
Yes. Config changes are baked in at build time, so you need to restart your dev server locally and redeploy to production for the fix to take effect.

**Can I allow all external image hostnames?**
Technically yes with a wildcard pattern, but it's discouraged since it defeats the security purpose of the allowlist. Explicitly listing known hostnames is safer.

## Need Help?

Image configuration errors are quick to fix once you know where to look. Explore our [development services](/services) or [get in touch](/contact) if you want help auditing your Next.js image pipeline.
    `,
    category: "DevOps",
    tags: ["Next.js", "Vercel", "Troubleshooting"],
    readTime: "4 min read",
    publishedAt: "2026-07-19",
    gradientFrom: "#0ea5e9",
    gradientTo: "#6366f1",
    featured: false,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=3840&q=95&auto=format&fit=crop",
    author: { name: "Amex Technology Team", url: "https://amextechnology.com/about" },
    updatedAt: "2026-07-19",
    keywords: ["nextjs image hostname not configured", "next image hostname is not configured"],
    metaTitle: "Fix: Next.js Image Hostname Not Configured",
    metaDescription: "Fix the Next.js image hostname not configured error with images.remotePatterns, a config example, and a redeploy checklist.",
    faq: [
      { question: "What does 'hostname is not configured' mean in Next.js?", answer: "It means the external domain you're loading an image from with next/image isn't listed in images.remotePatterns (or images.domains) in your next.config.js." },
      { question: "What's the difference between domains and remotePatterns?", answer: "domains only lets you allowlist a hostname. remotePatterns lets you also control protocol, port, and path, giving you more precise and secure control over which images can be optimized." },
      { question: "Do I need to redeploy after changing next.config.js?", answer: "Yes. Config changes are baked in at build time, so you need to restart your dev server locally and redeploy to production for the fix to take effect." },
      { question: "Can I allow all external image hostnames?", answer: "Technically yes with a wildcard pattern, but it's discouraged since it defeats the security purpose of the allowlist. Explicitly listing known hostnames is safer." },
    ],
  },
  {
    slug: "fix-vercel-404-not-found-after-deploy",
    title: "Fix: Vercel 404 NOT_FOUND After Deploy",
    excerpt:
      "Deployed to Vercel and getting 404: NOT_FOUND? Here's why, and how to fix it.",
    content: `
## The Problem

If you deploy to Vercel and get \`404: NOT_FOUND\` (sometimes shown as \`DEPLOYMENT_NOT_FOUND\`), it usually means Vercel can't find the build output or routes it expects, not that your app crashed. Most cases trace back to an incorrect framework preset, output directory, or a missing rewrite rule for client-side routing.

## Why It Happens

A \`404: NOT_FOUND\` on Vercel almost always comes down to one of these:

- **Wrong output directory or framework preset**: Vercel looks in a specific folder based on the detected framework. If it's misdetected, it won't find your built pages.
- **Missing routes for client-side routing**: Single-page apps that handle routing entirely in the browser need an explicit rewrite rule, otherwise Vercel returns 404 for any path that isn't a real file.
- **Case-sensitive file paths**: Vercel's file system is case-sensitive even if your local OS isn't, so \`About.tsx\` and \`about.tsx\` are treated as different files in production.
- **Wrong root directory in a monorepo**: If your project lives in a subfolder (like \`apps/web\`), Vercel needs to be told that's the root, or it will try to build from the repo root and fail to find your app.
- **Missing index route**: If there's no page at the root path, hitting your domain directly returns 404 even though other routes work.

## The Fix

### 1. Confirm the framework preset and output directory

In your Vercel project settings, go to **Settings > General** and check that **Framework Preset** matches your actual framework (Next.js, Vite, Create React App, etc.). Vercel usually auto-detects this correctly, but a custom build setup can throw it off.

### 2. Add rewrites for client-side routing

For SPAs that aren't using a framework with built-in routing (like plain React with \`react-router\`), add a catch-all rewrite in \`vercel.json\` so every path serves your \`index.html\`:

\`\`\`json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
\`\`\`

Without this, refreshing any route other than the homepage returns 404.

### 3. Check file casing

Search your project for filename casing mismatches between imports and actual files:

\`\`\`bash
find . -iname '*about*'
\`\`\`

Rename files so the casing on disk exactly matches every import and route reference.

### 4. Set the correct root directory in a monorepo

In **Settings > General > Root Directory**, point Vercel at the subfolder containing your app, for example \`apps/web\`. This tells Vercel where to run the build and find the output.

### 5. Redeploy

After any of the above changes, trigger a fresh deployment rather than relying on a cached build:

\`\`\`bash
vercel --prod
\`\`\`

## How to Prevent It

- Keep framework preset and root directory settings documented for every project, especially in monorepos.
- Use consistent, lowercase file and folder naming to avoid case-sensitivity surprises between local and production environments.
- Add a \`vercel.json\` rewrite rule up front for any SPA that handles its own client-side routing.
- Test a production build locally before deploying, so missing routes surface before they hit Vercel.

## Frequently Asked Questions

**What does Vercel 404 NOT_FOUND mean?**
It means Vercel couldn't match the requested path to a built page, static file, or route, usually because of an incorrect output directory, framework preset, or missing rewrite rule.

**Why do I get 404 only on some routes, not the homepage?**
This is the classic sign of a missing SPA rewrite rule. Client-side routes that only exist in the browser's JavaScript router need a catch-all rewrite to \`index.html\`, otherwise direct visits or refreshes 404.

**Why does my monorepo project 404 after deploying?**
Vercel builds from the repo root by default. If your app actually lives in a subfolder, you need to set the correct **Root Directory** in project settings so Vercel builds and serves the right output.

**Do I need a vercel.json rewrite for a single-page app?**
Yes, if your app relies on client-side routing without server-rendered routes for each path. Without a catch-all rewrite, any URL that isn't the exact entry file returns 404.

## Need Help?

Deployment issues are frustrating because everything looks fine locally. Explore our [development services](/services) or [get in touch](/contact) if you need help diagnosing a stubborn Vercel deployment.
    `,
    category: "DevOps",
    tags: ["Vercel", "Next.js", "Troubleshooting"],
    readTime: "6 min read",
    publishedAt: "2026-07-20",
    gradientFrom: "#64748b",
    gradientTo: "#0ea5e9",
    featured: false,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=3840&q=95&auto=format&fit=crop",
    author: { name: "Amex Technology Team", url: "https://amextechnology.com/about" },
    updatedAt: "2026-07-20",
    keywords: ["vercel 404 not found", "vercel deployment not found"],
    metaTitle: "Fix: Vercel 404 NOT_FOUND After Deploy",
    metaDescription: "Fix Vercel 404 NOT_FOUND after deploy: check framework preset, add SPA rewrites, fix file casing, and set the right root directory.",
    faq: [
      { question: "What does Vercel 404 NOT_FOUND mean?", answer: "It means Vercel couldn't match the requested path to a built page, static file, or route, usually because of an incorrect output directory, framework preset, or missing rewrite rule." },
      { question: "Why do I get 404 only on some routes, not the homepage?", answer: "This is the classic sign of a missing SPA rewrite rule. Client-side routes that only exist in the browser's JavaScript router need a catch-all rewrite to index.html, otherwise direct visits or refreshes 404." },
      { question: "Why does my monorepo project 404 after deploying?", answer: "Vercel builds from the repo root by default. If your app actually lives in a subfolder, you need to set the correct Root Directory in project settings so Vercel builds and serves the right output." },
      { question: "Do I need a vercel.json rewrite for a single-page app?", answer: "Yes, if your app relies on client-side routing without server-rendered routes for each path. Without a catch-all rewrite, any URL that isn't the exact entry file returns 404." },
    ],
  },


  {
    slug: "fix-new-row-violates-row-level-security-policy-supabase",
    title: "Fix: \"new row violates row-level security policy\" in Supabase",
    excerpt:
      "The Supabase \"new row violates row-level security policy\" error means RLS blocked your insert. Here's exactly why it happens and how to fix it, with SQL examples.",
    content: `
## What This Error Means

The Supabase error \`new row violates row-level security policy\` means your INSERT (or UPDATE) was blocked because no Row-Level Security policy allowed it. RLS is enabled on the table, but no policy's \`WITH CHECK\` condition passes for the row you're trying to write.

In short: RLS defaults to deny. Enable it without a matching INSERT policy and every write fails with this exact message.

## The Most Common Causes

1. **RLS is on, but there's no INSERT policy.** Enabling RLS blocks everything until you add explicit policies.
2. **The \`WITH CHECK\` condition fails.** A policy exists, but the row's values don't satisfy it — usually \`user_id\` not matching \`auth.uid()\`.
3. **\`auth.uid()\` is null.** The request isn't authenticated, so any policy comparing to \`auth.uid()\` fails.
4. **You're inserting a \`user_id\` that isn't the current user.** The policy correctly rejects it.

## How to Fix It

### 1. Add an INSERT policy

Most tables holding per-user data need a policy like this:

\`\`\`sql
alter table posts enable row level security;

create policy "Users can insert their own posts"
on posts for insert
to authenticated
with check (auth.uid() = user_id);
\`\`\`

The \`with check\` clause is what INSERT and UPDATE validate against. If it evaluates to false, you get the error.

### 2. Set user_id on insert

Because the policy checks \`auth.uid() = user_id\`, the row must include the current user's id:

\`\`\`ts
const { data: { user } } = await supabase.auth.getUser();

await supabase.from('posts').insert({
  title: 'Hello',
  user_id: user.id, // must match auth.uid()
});
\`\`\`

Better yet, set it at the database level with a column default of \`auth.uid()\` so the client can't get it wrong.

### 3. Confirm the request is authenticated

If \`auth.uid()\` is null, you're calling Supabase without a valid session. Make sure the user is logged in and you're using the authenticated client — see our guide on [connecting Supabase to Next.js](/blog/connect-nextjs-react-with-supabase).

### 4. Don't test only in the SQL editor

The Supabase SQL editor runs as a superuser and bypasses RLS, so your insert "works" there while real users still fail. Always test as an authenticated user through your app.

## How to Prevent It

- Add policies in the same migration where you enable RLS.
- Default \`user_id\` to \`auth.uid()\` at the database level.
- Write separate, explicit policies for SELECT, INSERT, UPDATE, and DELETE.

## Frequently Asked Questions

**Why does the insert work in the SQL editor but fail from my app?**
The SQL editor runs as the postgres superuser and bypasses RLS. Your app uses the anon or authenticated role, which RLS actually enforces.

**Do I need a SELECT policy too?**
If you return the inserted row with \`.select()\`, yes — a SELECT policy must allow reading it back, or the call still errors.

**What's the difference between USING and WITH CHECK?**
USING filters which existing rows a query can see or affect; WITH CHECK validates the values of new or updated rows.

**Can I temporarily disable RLS to debug?**
Yes, \`alter table posts disable row level security;\` — but only in development. Never ship a production table with RLS off.

## Need Supabase Set Up Properly?

RLS bugs are usually a sign the auth and data layer needs a careful once-over. At **Amex Technology**, we design secure Supabase schemas, policies, and auth flows that just work. Explore our [development services](/services) or [get in touch](/contact).
    `,
    category: "Engineering",
    tags: ["Supabase", "Row-Level Security", "Postgres", "Troubleshooting"],
    readTime: "6 min read",
    publishedAt: "2026-07-21",
    gradientFrom: "#ef4444",
    gradientTo: "#f97316",
    featured: false,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=3840&q=95&auto=format&fit=crop",
    author: { name: "Amex Technology Team", url: "https://amextechnology.com/about" },
    updatedAt: "2026-07-21",
    keywords: ["new row violates row-level security policy", "Supabase RLS error", "Supabase row level security", "Supabase insert blocked", "Supabase WITH CHECK", "fix Supabase RLS"],
    metaTitle: "Fix: New Row Violates RLS Policy (Supabase)",
    metaDescription: "The Supabase \"new row violates row-level security policy\" error explained — why RLS blocks your insert and how to fix it fast with SQL policy examples.",
    faq: [
      {
        question: "Why does the insert work in the SQL editor but fail from my app?",
        answer: "The SQL editor runs as the postgres superuser and bypasses RLS. Your app uses the anon or authenticated role, which RLS actually enforces, so a policy that's missing or failing blocks the write.",
      },
      {
        question: "Do I need a SELECT policy as well as an INSERT policy?",
        answer: "If you return the inserted row with .select(), yes. A SELECT policy must allow reading the row back, otherwise the call still errors even after the insert succeeds.",
      },
      {
        question: "What is the difference between USING and WITH CHECK?",
        answer: "USING filters which existing rows a query can see or affect. WITH CHECK validates the values of new or updated rows. INSERT uses WITH CHECK; UPDATE uses both.",
      },
      {
        question: "Can I disable RLS to fix this quickly?",
        answer: "You can run ALTER TABLE table_name DISABLE ROW LEVEL SECURITY for local debugging, but never in production — it makes every row publicly accessible through the API.",
      },
    ],
  },
  {
    slug: "fix-cors-error-supabase-edge-functions",
    title: "How to Fix CORS Errors in Supabase Edge Functions (2026)",
    excerpt:
      "Getting a CORS error calling a Supabase Edge Function from the browser? Here's why it happens and the exact code to handle the preflight request and fix it.",
    content: `
## The Problem

If your browser console shows \`Access to fetch ... has been blocked by CORS policy\` when calling a Supabase Edge Function, the function isn't returning the right CORS headers. The function often runs fine — the browser just refuses to let your page read the response.

## Why It Happens

Before the real request, the browser sends a **preflight \`OPTIONS\` request** to any cross-origin function. If the function doesn't answer \`OPTIONS\` with the correct \`Access-Control-Allow-*\` headers, the browser blocks the actual call. Supabase Edge Functions do not add these headers for you.

## The Fix

### 1. Define CORS headers and handle the OPTIONS request

\`\`\`ts
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
};

Deno.serve(async (req) => {
  // Answer the preflight request first
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const data = { message: 'Hello from the edge' };
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
\`\`\`

### 2. Add the headers to every response — including errors

A common mistake is returning error responses without CORS headers. Spread \`corsHeaders\` into every \`Response\` you return, success or failure, or errors will surface as confusing CORS failures.

### 3. Lock the origin down in production

\`'*'\` is fine while testing, but in production set \`Access-Control-Allow-Origin\` to your real domain, for example \`https://amextechnology.com\`, so only your site can call the function.

## Frequently Asked Questions

**Does my function still run if I see a CORS error?**
Usually yes. The function executes and may even succeed — the browser simply blocks your page from reading the response because the headers are missing.

**Why does it work in Postman or curl but not the browser?**
CORS is a browser-only security mechanism. Non-browser clients like curl and Postman ignore it entirely.

**Do I need CORS headers for same-origin calls?**
No. CORS only applies to cross-origin requests. If your frontend and function share an origin, you don't need it.

**Can I configure CORS in the Supabase dashboard instead of code?**
No. For Edge Functions you handle CORS in the function code itself, as shown above.

## Want Your Supabase Backend Done Right?

Edge Functions, auth, and APIs have sharp edges like this. **Amex Technology** builds production-grade Supabase backends that handle CORS, security, and errors properly from day one. See our [services](/services) or [get in touch](/contact).
    `,
    category: "Engineering",
    tags: ["Supabase", "Edge Functions", "CORS", "Troubleshooting"],
    readTime: "5 min read",
    publishedAt: "2026-07-21",
    gradientFrom: "#8b5cf6",
    gradientTo: "#6366f1",
    featured: false,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=3840&q=95&auto=format&fit=crop",
    author: { name: "Amex Technology Team", url: "https://amextechnology.com/about" },
    updatedAt: "2026-07-21",
    keywords: ["Supabase Edge Function CORS", "CORS error Supabase", "fix CORS Supabase", "Supabase Edge Function preflight", "Access-Control-Allow-Origin Supabase"],
    metaTitle: "Fix CORS Errors in Supabase Edge Functions",
    metaDescription: "Fix the CORS error when calling Supabase Edge Functions from the browser. Learn why the preflight fails and the exact code to add the right headers.",
    faq: [
      {
        question: "Does my Edge Function still run if I see a CORS error?",
        answer: "Usually yes. The function executes and may succeed, but the browser blocks your page from reading the response because the required CORS headers are missing.",
      },
      {
        question: "Why does it work in Postman or curl but not in the browser?",
        answer: "CORS is a browser-only security feature. Non-browser clients like curl and Postman don't enforce it, so the same request succeeds there.",
      },
      {
        question: "Do I need CORS headers for same-origin requests?",
        answer: "No. CORS only applies to cross-origin requests. If your frontend and Edge Function share the same origin, you don't need the headers.",
      },
      {
        question: "Can I set CORS in the Supabase dashboard?",
        answer: "No. For Edge Functions you must set the CORS headers in the function code and handle the OPTIONS preflight request yourself.",
      },
    ],
  },
  {
    slug: "fix-vercel-build-fails-supabase-env-variables",
    title: "Fix: Vercel Build Fails After Adding Supabase Env Variables",
    excerpt:
      "Your app builds locally but Vercel fails after adding Supabase? It's almost always environment variables. Here's how to fix it in a few minutes.",
    content: `
## What's Happening

Your app builds locally but the **Vercel build fails after you add Supabase**, often with \`supabaseUrl is required\` or \`Missing environment variable\`. The cause is almost always environment variables that exist on your machine but were never added to Vercel.

## Common Causes and Fixes

### 1. The env vars aren't set in Vercel

Your \`.env.local\` file is not deployed — it stays on your machine. Add the variables in **Vercel → Project → Settings → Environment Variables**:

- \`NEXT_PUBLIC_SUPABASE_URL\`
- \`NEXT_PUBLIC_SUPABASE_ANON_KEY\`

Set them for **Production, Preview, and Development**, then redeploy.

### 2. Missing NEXT_PUBLIC_ prefix

Any variable used in client-side code **must** start with \`NEXT_PUBLIC_\`. Without the prefix, the value is \`undefined\` in the browser bundle and the Supabase client throws during build or render.

### 3. You didn't redeploy

Vercel only picks up new environment variables on the **next** build. Adding them does not retro-apply to the current deployment — trigger a fresh redeploy after saving.

### 4. The client is created at build time

If you initialize the Supabase client at the top level of a module, it can run during prerendering. Guard against missing values, or create the client lazily inside a function/component so it runs at request time.

### 5. Wrong environment scope

If you added the variable only to "Production" but the failing build is a Preview (pull-request) deploy, that build won't have it. Tick all three environments.

## How to Prevent It

- Keep a committed \`.env.example\` listing every required key (no real values).
- Match variable names exactly — they are case-sensitive.
- Store secrets like the service-role key **without** the \`NEXT_PUBLIC_\` prefix so they stay server-side.

If you're also wiring up the domain, our [GoDaddy-to-Vercel guide](/blog/connect-vercel-app-godaddy-domain) covers that next step.

## Frequently Asked Questions

**Why does it build locally but not on Vercel?**
Locally, Next.js reads \`.env.local\`. Vercel doesn't have that file — you must add the same variables in the Vercel dashboard and redeploy.

**What's the difference between NEXT_PUBLIC and server-only variables?**
\`NEXT_PUBLIC_\` variables are exposed to the browser. Keep secrets such as the Supabase service-role key without the prefix so they stay on the server only.

**Do I need to redeploy after changing an environment variable?**
Yes. Env var changes only take effect on the next build, so trigger a redeploy every time you add or change one.

**Where do I find my Supabase URL and keys?**
In the Supabase dashboard under Project Settings → API.

## Deploying Something Important?

We ship production apps on Next.js, Supabase, and Vercel every week. If you want your deploy pipeline set up cleanly — env management, previews, and all — **Amex Technology** can help. See our [services](/services) or [get in touch](/contact).
    `,
    category: "DevOps",
    tags: ["Vercel", "Supabase", "Next.js", "Environment Variables"],
    readTime: "6 min read",
    publishedAt: "2026-07-21",
    gradientFrom: "#22c55e",
    gradientTo: "#0ea5e9",
    featured: false,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=3840&q=95&auto=format&fit=crop",
    author: { name: "Amex Technology Team", url: "https://amextechnology.com/about" },
    updatedAt: "2026-07-21",
    keywords: ["Vercel build fails Supabase", "supabaseUrl is required", "Vercel environment variables Supabase", "NEXT_PUBLIC_SUPABASE_URL undefined", "fix Vercel Supabase env"],
    metaTitle: "Fix: Vercel Build Fails on Supabase Env Vars",
    metaDescription: "Vercel build failing after adding Supabase? It's your environment variables. Fix NEXT_PUBLIC prefixes, scopes, and redeploys in a few minutes.",
    faq: [
      {
        question: "Why does my app build locally but fail on Vercel?",
        answer: "Locally Next.js reads your .env.local file. Vercel doesn't have it, so you must add the same variables in Vercel's dashboard and redeploy for the build to find them.",
      },
      {
        question: "What is the difference between NEXT_PUBLIC and server-only variables?",
        answer: "NEXT_PUBLIC_ variables are bundled into the browser. Keep secrets like the Supabase service-role key without the prefix so they remain server-side only.",
      },
      {
        question: "Do I have to redeploy after adding an environment variable?",
        answer: "Yes. Vercel only applies environment variables on the next build, so trigger a redeploy every time you add or change one.",
      },
      {
        question: "Where do I get my Supabase URL and anon key?",
        answer: "In the Supabase dashboard under Project Settings → API. Copy the Project URL and the anon public key.",
      },
    ],
  },
  {
    slug: "fix-lovable-white-screen-build-failed-after-publish",
    title: "Fix: Lovable White Screen or Build Failed After Publish",
    excerpt:
      "Published a Lovable app and got a blank white screen or build error? Here's how to find the real cause in 30 seconds and the most common fixes.",
    content: `
## The Symptom

You hit **Publish** in Lovable and the live site shows a **blank white screen** or a "build failed" message — even though the preview looked perfect. This almost always comes down to a build error, a missing environment variable, or a runtime JavaScript error that only appears in production.

## Diagnose It in 30 Seconds

Open the published site, then open your browser's **DevTools → Console** (right-click anywhere → Inspect → Console). The red error message there tells you which of the causes below you're hitting. Don't skip this step — it turns guessing into a two-minute fix.

## Common Causes and Fixes

### 1. Missing environment variables

The preview can use values that were never set for the published build. Add your keys — Supabase URL and key, API keys, and so on — in Lovable's project/environment settings, then republish.

### 2. A case-sensitive import

Production servers are case-sensitive. \`import Button from './components/button'\` fails if the file is actually \`Button.tsx\`. Match the file name's case exactly.

### 3. A runtime error on load

Calling something on \`undefined\` crashes the render and leaves a white screen. The console points to the exact line — add optional chaining or a guard, for example \`user?.name\` instead of \`user.name\`.

### 4. Using browser APIs too early

Referencing \`window\` or \`localStorage\` during the initial render can break the published build. Access them inside an effect or event handler instead.

### 5. A stale cache

If you already fixed the issue but still see white, hard-refresh with Cmd/Ctrl + Shift + R, or open the site in an incognito window.

## Still Stuck? Debug Locally

If Lovable's editor hides the real error, [export your code from Lovable](/blog/how-to-export-code-from-lovable), run it locally with \`npm run dev\`, and your terminal and console will show the exact stack trace. Nine times out of ten, the fix is obvious once you can see the real error.

## Frequently Asked Questions

**Why does the preview work but the published site doesn't?**
Preview and production are built differently — production applies optimizations, is case-sensitive, and needs its own environment variables. A value that exists in preview may be missing in production.

**Where do I actually see the error?**
Open the published URL, then your browser's DevTools Console. The red error message names the file and line causing the white screen.

**Could a custom domain be the cause?**
If the site only breaks on your domain, it's likely DNS or HTTPS, not the code. See our guide on [connecting a custom domain to Lovable](/blog/how-to-connect-custom-domain-with-lovable).

**Will I lose my work if I republish?**
No. Republishing redeploys the same project. Your code and data are not affected.

## Outgrowing Lovable?

A white screen after publish is often the moment a no-code project needs real engineering. **Amex Technology** takes Lovable apps to stable, production-ready code — from debugging to full rebuilds. Explore our [services](/services) or [get in touch](/contact).
    `,
    category: "Tutorial",
    tags: ["Lovable", "Troubleshooting", "Deployment", "Debugging"],
    readTime: "5 min read",
    publishedAt: "2026-07-21",
    gradientFrom: "#ec4899",
    gradientTo: "#8b5cf6",
    featured: false,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=3840&q=95&auto=format&fit=crop",
    author: { name: "Amex Technology Team", url: "https://amextechnology.com/about" },
    updatedAt: "2026-07-21",
    keywords: ["Lovable white screen", "Lovable build failed", "Lovable blank page after publish", "Lovable published site not working", "fix Lovable publish error"],
    metaTitle: "Fix: Lovable White Screen After Publish",
    metaDescription: "Lovable app showing a white screen or build failed after publish? Find the real cause in the console and fix the most common issues in minutes.",
    faq: [
      {
        question: "Why does the Lovable preview work but the published site is blank?",
        answer: "Preview and production build differently. Production is case-sensitive, applies optimizations, and needs its own environment variables, so a value present in preview may be missing when published.",
      },
      {
        question: "Where do I see the actual error causing the white screen?",
        answer: "Open the published URL and your browser's DevTools Console. The red error message names the exact file and line responsible for the blank screen.",
      },
      {
        question: "Could my custom domain be causing the white screen?",
        answer: "If the site only fails on your domain but works on the .lovable.app URL, the issue is usually DNS or HTTPS, not your code.",
      },
      {
        question: "Will I lose my work if I republish?",
        answer: "No. Republishing simply redeploys the same project. Your code and data are not affected.",
      },
    ],
  },
  {
    slug: "bolt-new-review",
    title: "Bolt.new Review 2026: Can It Really Ship Production-Ready Apps?",
    excerpt:
      "An honest, developer-led Bolt.new review — how StackBlitz's AI app builder works, its pricing and token model, what it nails, and where you still need a real developer.",
    content: `
## What Is Bolt.new?

Bolt.new is an AI app builder from StackBlitz that turns a plain-English prompt into a working web app right in your browser. You describe what you want, and Bolt writes the code and shows a live preview in seconds — no local setup, no servers.

Under the hood it runs on StackBlitz's WebContainer technology: a full Node.js environment that executes entirely in the browser. The result is real, standard code you can read, edit, export, and own — not a locked-in no-code black box.

## How Bolt.new Works

The workflow is refreshingly simple:

1. Write a prompt — for example, *"Build a booking dashboard for a dental clinic with a calendar and patient list."*
2. Bolt scaffolds the project and streams a live preview as it builds.
3. Refine it in chat ("add dark mode", "make the sidebar collapsible") and Bolt edits the code in place.
4. Open the file tree, edit directly, connect a backend, and deploy.

A basic React dashboard with routing and placeholder data renders in about 30–60 seconds. A more complex multi-page app with forms usually appears in 2–5 minutes.

## What's New in Bolt.new for 2026

Bolt has shipped fast over the past year. The biggest additions:

- **Bolt Cloud** — built-in database, hosting, authentication, analytics, and file storage, so you can go from prompt to deployed full-stack app without leaving the platform.
- **Figma import** — turn a Figma design into working code.
- **Expo integration** — generate native mobile apps, not just web.
- **Broad framework support** — React, Vue, Svelte, Angular, Next.js, Astro, and Remix, the widest range of any major AI builder.

Bolt's codebase is also open-source, so teams can self-host to avoid token costs or run custom deployments.

## Bolt.new Pricing and the Token Model

Bolt runs on tokens. Every generation and edit spends them, so heavy iteration burns your allowance faster than you'd expect. This is the part most new users misjudge.

The 2026 tiers:

- **Free** — $0, roughly 1M tokens/month. Fine for trying it and small experiments.
- **Pro** — around $25/month, 10M+ tokens with rollover. The realistic tier for regular building.
- **Teams** — around $30/member/month with admin controls.
- **Enterprise** — custom pricing.

The honest takeaway: the price looks low, but vague prompts that force constant regeneration are what quietly run up your bill. Write specific prompts and you'll stretch tokens much further.

## What Bolt.new Does Really Well

- **Speed to a working prototype.** Nothing gets you to a clickable demo faster.
- **MVPs and internal tools.** Dashboards, admin panels, landing pages, and simple CRUD apps are squarely in its wheelhouse.
- **Real, exportable code.** Because it writes standard code, you're never trapped — much like how you can [export a project out of Lovable](/blog/how-to-export-code-from-lovable) and keep building elsewhere.
- **Design-to-code starts.** Figma import meaningfully shortens the first mile of a build.

## Where Bolt.new Falls Short

This is where real client work informs the review. The demo ends; the product begins.

- **Production hardening.** Security, input validation, proper auth, and edge cases are where generated code gets thin. A charming prototype is not the same as an app that safely holds customer data.
- **Complex business logic.** Payments, permissions, and multi-step workflows quickly exceed what prompt-driven generation handles cleanly.
- **Scale and performance.** Generated code is rarely optimized for load. Database design, indexing, and caching need deliberate engineering.
- **Maintainability.** As a project grows, AI-generated code drifts. Without a clear architecture, iteration slows to a crawl.

None of this makes Bolt bad. It makes it a starting point, not a finish line.

## Bolt.new vs Lovable vs v0 vs Windsurf

The vibe-coding space is crowded in 2026. The short version:

- **Bolt.new** — best for full-stack prototypes across many frameworks, with real code you own.
- **Lovable** — polished and beginner-friendly for building complete apps from chat. (See our guides on [connecting Lovable to GitHub](/blog/how-to-connect-github-with-lovable) and [adding a custom domain to Lovable](/blog/how-to-connect-custom-domain-with-lovable).)
- **v0 by Vercel** — strongest for clean, production-leaning React UI components.
- **Windsurf** — an agentic AI IDE for developers who want AI inside their existing workflow.

For non-developers who want a working full-stack app fast, Bolt and Lovable lead. For developers, v0 and Windsurf slot into an existing stack.

## Is Bolt.new Worth It? Our Verdict

Yes — for the right job. For prototypes, MVPs, and internal tools, Bolt.new is one of the most useful tools available in 2026, and we happily use it to move fast.

But the last 20% of a project — security, scale, integrations, maintainability — is 80% of the value, and that's exactly where AI builders hand off to real engineering. Use Bolt to move fast, then bring in a developer to ship something solid.

## Frequently Asked Questions

**Is Bolt.new free?**
Yes, there's a free tier with about 1M tokens per month — enough to build and test small projects. Regular use fits the Pro tier at around $25/month.

**Is Bolt.new good for production apps?**
It's excellent for prototypes and MVPs. For a real production app with sensitive data, payments, or complex logic, have an experienced developer harden and extend the generated code before launch.

**Can Bolt.new build full-stack apps with a database?**
Yes. With Bolt Cloud you get a built-in database, authentication, hosting, and storage, so you can build and deploy full-stack apps in one place.

**Bolt.new vs Lovable — which is better?**
Both are strong. Bolt supports more frameworks and gives you more direct control over real code; Lovable is more opinionated and beginner-friendly. Choose based on how much control versus hand-holding you want.

**Do I own the code Bolt.new generates?**
Yes. Bolt produces standard code you can edit and export, and its platform is open-source, so you're not locked in.

## From Prototype to Production With Amex Technology

Built something promising in Bolt.new and hit a wall? That's exactly what we do. At **Amex Technology**, we take AI-generated prototypes and turn them into secure, scalable, production-ready web and mobile apps — clean architecture, real integrations, and code you can grow on.

Explore our [software development services](/services), see our [Portfolio](/portfolio), or [get in touch](/contact) to talk through your project.
    `,
    category: "Engineering",
    tags: ["Bolt.new", "AI App Builder", "Vibe Coding", "StackBlitz"],
    readTime: "9 min read",
    publishedAt: "2026-07-21",
    gradientFrom: "#f59e0b",
    gradientTo: "#f97316",
    featured: false,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=3840&q=95&auto=format&fit=crop",
    author: { name: "Amex Technology Team", url: "https://amextechnology.com/about" },
    updatedAt: "2026-07-21",
    keywords: ["Bolt.new", "Bolt.new review", "Bolt.new pricing", "is Bolt.new good", "Bolt.new vs Lovable", "vibe coding", "AI app builder"],
    metaTitle: "Bolt.new Review 2026: Is It Ready for Real Apps?",
    metaDescription: "An honest Bolt.new review for 2026 — how StackBlitz's AI app builder works, pricing and tokens, what it nails, and where you still need a developer.",
    faq: [
      {
        question: "Is Bolt.new free?",
        answer: "Yes, there's a free tier with about 1M tokens per month — enough to build and test small projects. Regular use fits the Pro tier at around $25/month.",
      },
      {
        question: "Is Bolt.new good for production apps?",
        answer: "It's excellent for prototypes and MVPs. For a real production app with sensitive data, payments, or complex logic, have an experienced developer harden and extend the generated code before launch.",
      },
      {
        question: "Can Bolt.new build full-stack apps with a database?",
        answer: "Yes. With Bolt Cloud you get a built-in database, authentication, hosting, and storage, so you can build and deploy full-stack apps in one place.",
      },
      {
        question: "Bolt.new vs Lovable — which is better?",
        answer: "Both are strong. Bolt supports more frameworks and gives you more direct control over real code, while Lovable is more opinionated and beginner-friendly. Choose based on how much control versus hand-holding you want.",
      },
      {
        question: "Do I own the code Bolt.new generates?",
        answer: "Yes. Bolt produces standard code you can edit and export, and its platform is open-source, so you're not locked in.",
      },
    ],
  },
  {
    slug: "how-to-download-zip-file-from-replit",
    title: "How to Download a ZIP File From Replit (3 Methods, 2026 Guide)",
    excerpt:
      "Step-by-step guide to downloading your project as a ZIP file from Replit — covering the UI method, Git method, and how to handle common errors.",
    content: `
## Why You'd Want to Export From Replit

Replit is one of the most popular browser-based IDEs available today. It lets you spin up a project in seconds, collaborate with teammates in real time, and deploy without touching a terminal. But at some point, most developers need to get their code out.

Maybe you're moving a project to a dedicated VPS. Maybe you want to work offline on a long flight. Maybe you need to run the project inside a company environment that doesn't allow external cloud IDEs. Or maybe you just want a local backup.

Whatever the reason, exporting from Replit is straightforward — once you know where to look. This guide covers two reliable methods: the built-in ZIP download and the GitHub push-and-clone approach. It also covers what's actually inside the exported files and how to get everything running locally.

## Method 1: Download ZIP via the UI

This is the fastest route. Replit has a built-in export option hidden inside the three-dot menu.

### Step 1: Open Your Repl

Log into your Replit account and navigate to the Repl you want to export. Make sure you're on the editor view — you should see your file tree on the left and the code editor in the center.

### Step 2: Find the Three-Dot Menu

In the top-left corner of the editor, you'll see the name of your Repl next to a small icon. Click the three horizontal dots (⋯) next to the Repl name. This opens a dropdown menu with project options.

If you're on a newer version of the Replit UI, the menu may be accessible via a hamburger or kebab icon in the top toolbar. The label may appear as **More** or show three vertical dots depending on your screen size.

### Step 3: Select "Download as zip"

From the dropdown, click **Download as zip**. Replit will package your entire project directory into a \`.zip\` archive and your browser will begin downloading it immediately.

The file will be named after your Repl (e.g., \`my-project.zip\`). Depending on project size, 

![Replit three-dot menu showing the 'Download as ZIP' export option](/images/blog/how-to-download-zip-file-from-replit/2.png)


If the option is missing, check:
- You are the owner of the Repl (not just a collaborator with view access)
- You're logged in (the option is not available to anonymous visitors)
- You're in the editor view, not the cover page


![Replit IDE with project files open — ready for ZIP export or GitHub push](/images/blog/how-to-download-zip-file-from-replit/3.png)

## Method 2: Push to GitHub, Then Clone Locally

If your project is large, has many binary assets, or you want a proper version-controlled workflow going forward, pushing to GitHub and cloning is the better long-term approach.

### Step 1: Connect Your Repl to GitHub

Inside the Replit editor, click the **Git** icon in the left sidebar (it looks like a branching diagram). If you haven't connected GitHub before, Replit will prompt you to authorize it via OAuth. Grant the permissions and return to the editor.

### Step 2: Create a Repository and Push

Once connected, you'll see options to initialize a Git repository and push to GitHub. Click **Connect to GitHub**, give your repository a name, choose public or private, and click **Create repository**. Replit will push all your files to a new GitHub repo under your account.

You can verify this by visiting \`github.com/your-username\` — the new repository should appear immediately.

### Step 3: Clone the Repository Locally

Open your terminal and run:

\`\`\`bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
\`\`\`

This gives you a full local copy with complete Git history — far more useful than a ZIP for ongoing development.

## What's Included in the ZIP

When you download the ZIP from Replit's UI, the archive contains everything in your Repl's file system at the time of export:

- All source files (\`.js\`, \`.ts\`, \`.py\`, \`.html\`, \`.css\`, etc.)
- Configuration files (\`package.json\`, \`.replit\`, \`replit.nix\`, \`.env.example\` if present)
- Any uploaded assets or static files in your project directory

**What is NOT included:**

- \`node_modules/\` — this directory is excluded automatically (it would make the ZIP enormous and is unnecessary since it's fully reproducible from \`package.json\`)
- Your actual \`.env\` secrets — Replit stores these separately as environment variables and does not bundle them into exports for security reasons
- Replit-internal build caches

The \`.replit\` and \`replit.nix\` files in the ZIP are Replit-specific configuration files that tell Replit how to run your project. You don't need them locally, but they don't cause any harm either.

## Running Your Project Locally After Downloading

### Step 1: Extract the ZIP

![Extracting a Replit ZIP archive — project files unzipped and opened in VS Code locally](/images/blog/how-to-download-zip-file-from-replit/4.png)

On Mac or Windows, double-click the \`.zip\` file to extract it. On Linux or in a terminal:

\`\`\`bash
unzip my-project.zip -d my-project
cd my-project
\`\`\`

### Step 2: Install Dependencies

If your project uses Node.js, run:

\`\`\`bash
npm install
\`\`\`

Or if the project uses Yarn or pnpm:

\`\`\`bash
yarn install
# or
pnpm install
\`\`\`

This recreates the \`node_modules/\` directory from \`package.json\`. For Python projects, use \`pip install -r requirements.txt\`.

### Step 3: Set Up Environment Variables

Your \`.env\` file was not included in the ZIP. You'll need to recreate it. If you're the project owner, you can find your secrets in Replit under **Tools → Secrets**. Create a \`.env\` file in your project root:

\`\`\`bash
touch .env
\`\`\`

Then add each variable in \`KEY=VALUE\` format:

\`\`\`
DATABASE_URL=your_database_url_here
API_KEY=your_api_key_here
\`\`\`

Never commit this file to version control. Add \`.env\` to your \`.gitignore\` if it isn't already there.

### Step 4: Start the Development Server

For a Next.js project:

\`\`\`bash
npm run dev
\`\`\`

For a plain Node.js/Express app:

\`\`\`bash
node index.js
\`\`\`

For a Python Flask app:

\`\`\`bash
python main.py
\`\`\`

Open your browser to \`http://localhost:3000\` (or whichever port your project uses) and verify everything is working.

## Common Errors and Fixes

### Mac Extracts ZIP as .zip.cpgz Instead of a Folder

This happens when Archive Utility on macOS encounters a ZIP it can't parse, and it re-archives the file instead of extracting it. The result is a \`.zip.cpgz\` file that loops endlessly.

**Fix:** Use a different extraction tool. The easiest option is The Unarchiver (free on the Mac App Store). Alternatively, use the terminal:

\`\`\`bash
unzip ~/Downloads/my-project.zip -d ~/Downloads/my-project
\`\`\`

This bypasses Archive Utility entirely and extracts cleanly.

### Download Times Out or Fails on Large Projects

Replit's ZIP export has a size limit and can time out for very large projects (especially those with large binary files or many assets).

**Fix:** Use Method 2 (GitHub push and clone) instead. Git is much better at handling large repositories incrementally. Alternatively, delete unnecessary files in Replit before exporting — check for large assets or test data you don't need locally.

### \`npm install\` Fails With Node Version Errors

Replit may have been running a different version of Node.js than what you have locally.

**Fix:** Check the Node version Replit used by looking at your \`.replit\` or \`replit.nix\` file. Then switch your local Node version to match using \`nvm\`:

\`\`\`bash
nvm install 20
nvm use 20
npm install
\`\`\`

### Missing Environment Variables Cause Runtime Errors

If the app crashes with errors like \`Cannot read properties of undefined\` or \`Missing required environment variable\`, your \`.env\` file is incomplete.

**Fix:** Cross-reference your Replit Secrets panel with your local \`.env\` file and make sure every key is accounted for.

## Frequently Asked Questions

**Can I download a Repl I don't own?**
No. The download ZIP option is only available to the Repl's owner. If you're a collaborator, ask the owner to export and share the archive with you.

**Does the ZIP include my Git history?**
No. The ZIP is a snapshot of the current file state, not a Git repository. If you want Git history, use Method 2 (push to GitHub and clone).

**Will the downloaded project work exactly the same as on Replit?**
Mostly, but not always. Replit may have configured specific environment variables, custom Nix packages, or system-level dependencies that aren't part of the ZIP. Check the \`.replit\` and \`replit.nix\` files to understand what the Replit environment was providing.

**How do I keep the local copy in sync with Replit going forward?**
Use GitHub as the source of truth. Push from Replit to GitHub, then pull from GitHub to your local machine. This gives you a proper workflow instead of downloading ZIPs repeatedly.

**What happens to my Replit Deployments when I move locally?**
Nothing — they keep running. Exporting a ZIP doesn't affect your live Replit Deployments. You'd need to manually take them down from the Replit dashboard if you want to shut them off.

## Take Your Projects Further With Amex Technology

Exporting from Replit is just the first step. Once you have your project running locally, you can integrate it into a professional development workflow — with proper CI/CD pipelines, staging environments, and production deployments that scale.

At **Amex Technology**, we work with developers and businesses to take projects from prototype to production. Whether you're migrating an existing Replit project or starting fresh, our team can help you architect a setup that grows with you.

Explore our [web development services](/services#web-development), browse our [Portfolio](/portfolio), or reach out via the [Contact](/contact) page.
    `,
    category: "Tutorial",
    tags: ["Replit", "Developer Tools", "Workflow"],
    readTime: "6 min read",
    publishedAt: "2026-07-12",
    gradientFrom: "#f97316",
    gradientTo: "#ec4899",
    featured: false,
    image: "/images/blog/how-to-download-zip-file-from-replit/1.webp",
    author: { name: "Amex Technology Team", url: "https://amextechnology.com/about" },
    updatedAt: "2026-07-15",
    keywords: ["Replit", "Developer Tools", "Workflow", "download ZIP from Replit", "export Replit project"],
    metaTitle: "How to Download a ZIP From Replit (3 Methods, 2026)",
    metaDescription: "Export your Replit project as a ZIP using the UI or Git. Step-by-step methods, what's inside the download, and how to fix common errors.",
    faq: [
      {
        question: "Can I download a Repl I don't own?",
        answer: "No. The download ZIP option is only available to the Repl's owner. If you're a collaborator, ask the owner to export and share the archive with you.",
      },
      {
        question: "Does the ZIP include my Git history?",
        answer: "No. The ZIP is a snapshot of the current file state, not a Git repository. If you want Git history, use Method 2 (push to GitHub and clone).",
      },
      {
        question: "Will the downloaded project work exactly the same as on Replit?",
        answer: "Mostly, but not always. Replit may have configured specific environment variables, custom Nix packages, or system-level dependencies that aren't part of the ZIP. Check the .replit and replit.nix files to understand what the Replit environment was providing.",
      },
      {
        question: "How do I keep the local copy in sync with Replit going forward?",
        answer: "Use GitHub as the source of truth. Push from Replit to GitHub, then pull from GitHub to your local machine. This gives you a proper workflow instead of downloading ZIPs repeatedly.",
      },
      {
        question: "What happens to my Replit Deployments when I move locally?",
        answer: "Nothing — they keep running. Exporting a ZIP doesn't affect your live Replit Deployments. You'd need to manually take them down from the Replit dashboard if you want to shut them off.",
      },
    ],
  },
  {
    slug: "connect-vercel-app-godaddy-domain",
    title: "How to Connect a GoDaddy Domain to Vercel (2026 Step-by-Step Guide)",
    excerpt:
      "Step-by-step guide to pointing your GoDaddy domain to a Vercel deployment — including DNS records, SSL, and fixing propagation issues.",
    content: `
## Prerequisites

Before you start, make sure you have the following in place:

- A **Vercel account** with your project already deployed (you should have a live \`.vercel.app\` URL)
- A **GoDaddy account** that owns the domain you want to connect
- Access to your GoDaddy **DNS Manager** (not just the domain dashboard — the DNS manager is where you'll make the actual record changes)
- About 5–10 minutes for the setup, plus up to 48 hours for DNS propagation (though in practice it usually takes under 30 minutes)

You do not need to transfer your domain away from GoDaddy. Vercel works perfectly with domains registered at any registrar — you just point the DNS records at Vercel's infrastructure.

## Step 1: Add Your Domain in the Vercel Dashboard

### Navigate to Project Settings

Log into [vercel.com](https://vercel.com) and open the project you want to connect to your custom domain. Click on the **Settings** tab in the top navigation bar, then select **Domains** from the left sidebar.

### Add the Domain

Click **Add Domain** and type in your domain name. Enter just the root domain — for example, \`yourdomain.com\` — without any \`http://\` or \`www\` prefix.

Vercel will then ask you how you want to handle the \`www\` subdomain:

- **Redirect \`www\` to root** — \`www.yourdomain.com\` redirects to \`yourdomain.com\` (most common choice)
- **Redirect root to \`www\`** — \`yourdomain.com\` redirects to \`www.yourdomain.com\`
- **No redirect** — both work independently

For most projects, choosing **"Redirect www to root"** is the cleanest setup. Users who type \`www\` will land on the canonical version of your site.

After selecting your preference, click **Add**. Vercel will now show you the exact DNS records you need to configure.

## Step 2: The DNS Records Vercel Requires

![Complete step-by-step infographic for connecting a GoDaddy domain to Vercel with DNS records and SSL](/images/blog/connect-vercel-app-godaddy-domain/2.png)

Vercel will show you two records (sometimes three, depending on your setup). The standard records for a root + www configuration are:

### A Record (for the root domain)

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 76.76.21.21 |

The \`@\` symbol represents your root domain (\`yourdomain.com\`). This A record tells DNS resolvers to send traffic for your bare domain to Vercel's anycast IP address \`76.76.21.21\`.

### CNAME Record (for the www subdomain)

| Type | Name | Value |
| --- | --- | --- |
| CNAME | www | cname.vercel-dns.com |

The CNAME for \`www\` points to \`cname.vercel-dns.com\`, which Vercel uses to route \`www\` traffic and handle SSL provisioning for the subdomain.

**Important:** Do not point the CNAME at your \`.vercel.app\` deployment URL. Always use \`cname.vercel-dns.com\` — this is the stable, load-balanced endpoint Vercel maintains for custom domains.

## Step 3: Update DNS Records in GoDaddy

### Open the DNS Manager

Log into your GoDaddy account. From the top navigation, go to **My Products** and find your domain. Click **DNS** (or **Manage DNS**) next to the domain you want to configure.

This opens the GoDaddy DNS Manager — a table listing all your current DNS records.

### Update or Add the A Record

Look for an existing A record with the **Name** set to \`@\`. GoDaddy typically adds a default A record pointing to a GoDaddy parking page. You need to change its value.

1. Click the **pencil/edit icon** on the existing \`@\` A record
2. Change the **Value** field to \`76.76.21.21\`
3. Set the **TTL** to **1 Hour** (or the minimum available — lower TTL means faster propagation)
4. Click **Save**

If no \`@\` A record exists, click **Add** → select type **A** → set Name to \`@\` → set Value to \`76.76.21.21\`.

### Add or Update the CNAME Record

Now look for a CNAME record with the **Name** \`www\`.

If one already exists (GoDaddy often creates one):
1. Click the **edit icon** on the \`www\` CNAME record
2. Change the **Value** to \`cname.vercel-dns.com\`
3. Click **Save**

If no \`www\` CNAME exists:
1. Click **Add**
2. Select type **CNAME**
3. Set **Name** to \`www\`
4. Set **Value** to \`cname.vercel-dns.com\`
5. Set **TTL** to **1 Hour**
6. Click **Save**

### Save Your Changes

GoDaddy will show a confirmation dialog asking you to review the changes. Confirm and save. The DNS Manager will now display your updated records.

## Step 4: Wait for DNS Propagation

![DNS propagation world map — changes spreading from your registrar to global DNS servers](/images/blog/connect-vercel-app-godaddy-domain/4.png)

DNS changes do not apply instantly — they propagate across global DNS servers over time. The propagation window is technically up to **48 hours**, but in practice most DNS resolvers pick up changes within **15–60 minutes**.

During propagation, different users around the world may see different results depending on which DNS server their ISP is using. This is normal.

### Check Propagation Status

Use [whatsmydns.net](https://www.whatsmydns.net) to monitor how your DNS records are spreading:

1. Go to **whatsmydns.net**
2. Enter your domain (e.g., \`yourdomain.com\`)
3. Select record type **A**
4. Click **Search**

You'll see a world map showing which DNS servers have updated to show \`76.76.21.21\` and which are still serving the old value. Once the majority of locations show Vercel's IP, your domain is live.

You can also run a quick check from your terminal:

\`\`\`bash
dig yourdomain.com A +short
\`\`\`

When this returns \`76.76.21.21\`, your A record has propagated to your local DNS resolver.

## Step 5: SSL Certificate — Automatic via Let's Encrypt

![Vercel Domains dashboard showing SSL certificate automatically provisioned via Let's Encrypt](/images/blog/connect-vercel-app-godaddy-domain/5.png)

One of Vercel's best features is **automatic SSL provisioning**. You do not need to buy or configure a certificate separately.

Once Vercel detects that your DNS records are pointing correctly, it automatically issues a TLS certificate from **Let's Encrypt** and provisions it for both your root domain and \`www\` subdomain. This usually happens within a few minutes of successful DNS propagation.

In the Vercel Domains dashboard, you'll see the domain status change from **"Invalid Configuration"** (orange) to a green checkmark once SSL is active.

Your site will then be accessible over \`https://yourdomain.com\` with a valid SSL certificate, and HTTP traffic will automatically redirect to HTTPS.

## Troubleshooting Common Issues

### "Invalid Configuration" Error in Vercel

This is the most common issue after adding a domain. It means Vercel can see that your DNS records haven't yet been updated to point at its infrastructure.

**What to do:**
- Wait 15–30 minutes and refresh the Vercel Domains page
- Double-check the GoDaddy DNS Manager to confirm you saved the correct values — copy-paste \`76.76.21.21\` and \`cname.vercel-dns.com\` directly rather than typing them
- Use whatsmydns.net to confirm propagation has happened before concluding something is misconfigured

If the error persists after 2+ hours: re-check your records. A common mistake is editing the wrong record (e.g., updating a subdomain record instead of the root \`@\` record).

### www Works But Root Domain Doesn't (or Vice Versa)

This usually means one of the two records is missing or incorrect:

- **Root doesn't work, www does** → The A record for \`@\` is missing or has the wrong value
- **www doesn't work, root does** → The CNAME for \`www\` is missing or points to the wrong value

Go back to GoDaddy DNS Manager and verify both records exist and have exactly the values Vercel specifies.

### GoDaddy Forwards vs. CNAME — Don't Mix Them

GoDaddy's domain dashboard has a **Forwarding** section that is separate from DNS records. If you previously set up a forwarding rule, it can interfere with your CNAME configuration.

Go to the DNS Manager → scroll to the **Forwarding** section at the bottom → remove any existing forwarding rules before relying on CNAME records.

### "This site can't be reached" After Propagation

If DNS has propagated (whatsmydns shows \`76.76.21.21\`) but the browser still shows an error, check:

1. **Is the domain added in Vercel?** Confirm it appears under Settings → Domains with a green status
2. **Is your Vercel project deployed?** Go to the Deployments tab and confirm there's a successful deployment
3. **Browser cache** — try opening the domain in an incognito window or a different device

## Your GoDaddy Email MX Records Are Not Affected

A common concern when editing DNS records is: *"Will this break my email?"*

The answer is **no** — as long as you only edit the A and CNAME records Vercel requires. GoDaddy's email service (Workspace Email or Microsoft 365) relies on **MX records**, which are completely separate from A and CNAME records.

Vercel does not ask you to modify MX records. Your existing email setup will continue working without interruption. To verify this, look at your MX records in GoDaddy DNS Manager before and after making your changes — they should be identical.

If you use **Google Workspace** or another third-party email provider with your GoDaddy domain, the same applies. MX records are untouched.

## Frequently Asked Questions

**How long does DNS propagation really take with GoDaddy?**
In most cases, 15–60 minutes. GoDaddy's default TTL is 1 hour, so once your changes are saved, it takes at most one TTL cycle for most resolvers to pick up the change. Setting TTL to the minimum (600 seconds / 10 minutes) before making changes can speed this up.

**Do I need to transfer my domain from GoDaddy to Vercel?**
No. Vercel does not require you to transfer your domain. You keep your domain registered at GoDaddy and simply point the DNS records at Vercel's infrastructure. Transfers are optional and generally not worth the hassle unless you want everything in one place.

**Can I connect multiple domains to the same Vercel project?**
Yes. You can add as many custom domains as you like under Settings → Domains in your Vercel project. All of them will serve the same deployment, and each gets its own SSL certificate.

**What if I'm on Vercel's free (Hobby) plan?**
Custom domains are fully supported on Vercel's free Hobby plan. You can connect one custom domain per project with automatic SSL at no cost. Vercel's paid plans add features like more team members and analytics, but custom domains are not behind a paywall.

**What happens to my Vercel \`.vercel.app\` URL after I add a custom domain?**
It keeps working. Adding a custom domain does not remove your \`.vercel.app\` URL — both will serve your project. This is useful for testing during propagation. If you want to disable the \`.vercel.app\` URL for security reasons (to prevent direct access), you can do so from the Vercel project settings.

## Take Your Deployment Further With Amex Technology

Connecting a custom domain is a foundational step — but a production-grade deployment involves much more: environment-specific configurations, preview deployments for every PR, proper redirects, cache headers, and a monitoring setup that catches issues before users do.

At **Amex Technology**, we help teams build the full deployment pipeline — from domain configuration to CI/CD automation to performance observability. If you're looking to harden your Vercel setup or take a project from proof-of-concept to production-ready, we'd be glad to help.

Explore our [software development services](/services), see our [Portfolio](/portfolio), or [get in touch](/contact) to talk through your project.
    `,
    category: "DevOps",
    tags: ["Vercel", "GoDaddy", "DNS", "Deployment", "Domain Setup"],
    readTime: "7 min read",
    publishedAt: "2025-02-10",
    gradientFrom: "#0ea5e9",
    gradientTo: "#6366f1",
    featured: false,
    image: "/images/blog/connect-vercel-app-godaddy-domain/heroimage.webp",
    imagePosition: "object-top",
    author: { name: "Amex Technology Team", url: "https://amextechnology.com/about" },
    updatedAt: "2026-07-15",
    keywords: ["Vercel", "GoDaddy", "DNS", "Deployment", "connect GoDaddy domain to Vercel", "custom domain"],
    metaTitle: "How to Connect GoDaddy Domain to Vercel (2026 Guide)",
    metaDescription: "Point your GoDaddy domain to a Vercel app: exact DNS records, SSL setup, and how to fix propagation issues. A clear 5-minute walkthrough.",
    faq: [
      {
        question: "How long does DNS propagation really take with GoDaddy?",
        answer: "In most cases, 15–60 minutes. GoDaddy's default TTL is 1 hour, so once your changes are saved, it takes at most one TTL cycle for most resolvers to pick up the change. Setting TTL to the minimum (600 seconds / 10 minutes) before making changes can speed this up.",
      },
      {
        question: "Do I need to transfer my domain from GoDaddy to Vercel?",
        answer: "No. Vercel does not require you to transfer your domain. You keep your domain registered at GoDaddy and simply point the DNS records at Vercel's infrastructure. Transfers are optional and generally not worth the hassle unless you want everything in one place.",
      },
      {
        question: "Can I connect multiple domains to the same Vercel project?",
        answer: "Yes. You can add as many custom domains as you like under Settings → Domains in your Vercel project. All of them will serve the same deployment, and each gets its own SSL certificate.",
      },
      {
        question: "What if I'm on Vercel's free (Hobby) plan?",
        answer: "Custom domains are fully supported on Vercel's free Hobby plan. You can connect one custom domain per project with automatic SSL at no cost. Vercel's paid plans add features like more team members and analytics, but custom domains are not behind a paywall.",
      },
      {
        question: "What happens to my Vercel .vercel.app URL after I add a custom domain?",
        answer: "It keeps working. Adding a custom domain does not remove your .vercel.app URL — both will serve your project. This is useful for testing during propagation. If you want to disable the .vercel.app URL for security reasons (to prevent direct access), you can do so from the Vercel project settings.",
      },
    ],
  },
  {
    slug: "how-to-setup-cloudflare-dns",
    title: "How to Set Up Cloudflare DNS: Complete Step-by-Step Guide (2026)",
    excerpt:
      "Learn how to set up Cloudflare DNS — from adding your site and updating nameservers, to configuring SSL, security, and performance settings.",
    content: `
## What Cloudflare Actually Does

Before touching a single DNS record, it helps to understand what you're signing up for. Cloudflare is not just a DNS registrar — it's a global network that sits between your visitors and your origin server, providing three major layers of value.

**CDN (Content Delivery Network):** Cloudflare operates data centers in over 300 cities worldwide. When a visitor requests your site, the response is served from the nearest Cloudflare location, reducing latency significantly compared to serving everything from a single origin.

**DDoS Protection:** Cloudflare automatically absorbs volumetric attacks at the network edge. Even on the free plan, you get protection against large-scale distributed denial-of-service attacks that would take down an unprotected server.

**Free SSL/TLS:** Every domain behind Cloudflare gets a free SSL certificate issued automatically. Visitors see the padlock; your origin server gets HTTPS without you paying a certificate authority. (There are nuances here — covered in the SSL section below.)

All of this is available on Cloudflare's free plan, which is why it's become a default infrastructure choice for teams at every scale.

## Proxy Mode vs DNS-Only: The Orange Cloud Explained

This is the concept most beginners miss, and it determines whether you're actually using Cloudflare's network or just its DNS.

When you set a DNS record in Cloudflare, each record has a **proxy status** toggle:

- **Orange cloud (Proxied):** Traffic routes through Cloudflare's network. Cloudflare terminates the connection, applies your security and performance settings, then forwards clean requests to your origin. Your real server IP is hidden.
- **Grey cloud (DNS Only):** Cloudflare acts as a regular DNS resolver. It returns your actual origin IP in DNS queries. No CDN, no DDoS protection, no SSL from Cloudflare.

For most web traffic (A records, CNAME records for your site), you want the **orange cloud**. For records that should bypass Cloudflare — like MX records for email, or certain third-party verification records — you leave them grey.

The orange/grey distinction is the most common source of confusion for new Cloudflare users. If your security or performance settings aren't applying, the first thing to check is whether the relevant record is actually proxied.

## Step 1: Create a Cloudflare Account and Add Your Site

![Cloudflare Add a Site dashboard — Step 1 of 4: Enter your root domain to get started](/images/blog/how-to-setup-cloudflare-dns/1.png)

### Create the Account

Go to [cloudflare.com](https://cloudflare.com) and sign up for a free account. The free plan covers everything you need to get started, including the CDN, DDoS protection, SSL, and basic security rules.

### Add Your Domain

After logging in, click **Add a Site** from your dashboard. Enter your root domain (e.g., \`yourdomain.com\`) without any subdomain or protocol prefix. Click **Add Site**.

### Select a Plan

Cloudflare will prompt you to choose a plan. Select **Free** unless you have a specific reason to upgrade. The free plan covers the features in this guide. Click **Continue**.

## Step 2: Review Your Imported DNS Records

![Cloudflare DNS Manager showing imported A, CNAME, MX and TXT records with proxy status](/images/blog/how-to-setup-cloudflare-dns/2.png)

Cloudflare performs an automatic scan of your domain's existing DNS records. This is one of its most useful features — it gives you a pre-populated record set to review rather than requiring you to enter everything from scratch.

### What to Look For

Cloudflare imports records based on public DNS data. In the review screen, verify:

- **A records** are correct for your root domain and any subdomains
- **CNAME records** for subdomains like \`www\`, \`api\`, \`mail\` are present
- **MX records** for your email are intact — these are critical. If they're missing, your email will break after you switch nameservers
- **TXT records** for domain verification (Google Search Console, email authentication like SPF, DKIM)

**Important:** If any records are missing, add them now before continuing. You can always add or edit records after switching, but it's cleaner to resolve gaps at this stage.

### Proxy Status on Each Record

By default, Cloudflare may set some records as DNS-only. Go through each A and CNAME record that serves web traffic and ensure the orange cloud (Proxied) is enabled. Leave MX records and any email-related records as DNS-only.

Once you've reviewed and corrected the records, click **Continue**.

## Step 3: Update Your Nameservers at Your Registrar

![Diagram showing how to replace registrar nameservers with Cloudflare nameservers (abby.ns and ben.ns)](/images/blog/how-to-setup-cloudflare-dns/3.png)

Cloudflare will give you two custom nameserver addresses — something like:

\`\`\`
asha.ns.cloudflare.com
pablo.ns.cloudflare.com
\`\`\`

These are unique to your account. You need to log into wherever you registered your domain and replace the existing nameservers with these two.

### How to Update Nameservers

The process varies by registrar, but the general steps are:

1. Log into your domain registrar (GoDaddy, Namecheap, Google Domains, etc.)
2. Find the domain management or DNS settings for your domain
3. Look for a **Nameservers** section — it may be labeled "Custom DNS", "Change Nameservers", or similar
4. Delete the existing nameservers (usually 2–4 entries from your registrar)
5. Add Cloudflare's two nameservers exactly as shown in your dashboard
6. Save the changes

### How Long Does It Take?

Nameserver propagation can take anywhere from a few minutes to 48 hours, though most registrars complete it within 1–2 hours. Cloudflare will send you an email when it detects the switch and activates your site.

You can check propagation status by running:

\`\`\`bash
dig yourdomain.com NS +short
\`\`\`

When this returns Cloudflare's nameservers, the switch is complete.

## Step 4: Configure SSL/TLS Mode

Once your domain is active in Cloudflare, go to **SSL/TLS** in the left sidebar. The encryption mode you choose here determines how Cloudflare communicates with your origin server.

### Flexible SSL

Cloudflare encrypts the connection between your visitor and Cloudflare (HTTPS), but sends traffic to your origin over plain HTTP. This works even if your origin has no SSL certificate at all.

**The problem:** Flexible SSL is only appropriate for legacy setups where you cannot install a certificate on your origin. If your origin already has SSL (and it should), Flexible can cause \`ERR_TOO_MANY_REDIRECTS\` — more on that in the errors section.

### Full SSL

Cloudflare encrypts both the visitor-to-Cloudflare connection and the Cloudflare-to-origin connection. Your origin needs an SSL certificate, but it doesn't need to be from a trusted certificate authority — a self-signed certificate is accepted.

This is better than Flexible and works for most setups.

### Full (Strict) SSL — Recommended

The strongest option. Cloudflare requires your origin to have a valid, trusted SSL certificate (not self-signed). Both connections are fully encrypted and verified.

**For production sites, use Full (Strict).** If you're hosting on Vercel, Netlify, Railway, or any modern platform that auto-provisions Let's Encrypt certificates, your origin already has a valid cert and Full Strict will work immediately.

## Step 5: Key Security Settings

### HSTS (HTTP Strict Transport Security)

Under **SSL/TLS → Edge Certificates**, you'll find the HSTS option. Enabling HSTS tells browsers to always use HTTPS for your domain, even if a user types \`http://\` manually.

Configuration recommendations:
- **Max Age:** 6 months (15768000 seconds) to start; increase to 1 year once you're confident HTTPS is stable
- **Include Subdomains:** Enable only if all subdomains serve HTTPS
- **Preload:** Leave off initially — preloading submits your domain to browser preload lists and is difficult to reverse

**Caution:** HSTS is a one-way commitment for the duration of max-age. Don't enable it if there's any chance you'll need to serve HTTP from this domain during that window.

### Bot Fight Mode

Under **Security → Bots**, enable **Bot Fight Mode**. This automatically challenges traffic from known bot networks, scrapers, and automated tools. For the vast majority of sites, this reduces unwanted bot traffic without affecting legitimate visitors.

If you have specific integrations that use automated HTTP requests (monitoring tools, search engine bots you want to allow, webhook senders), review the allow-list options before enabling. Google, Bing, and other major search engine crawlers are already excluded from Bot Fight Mode by default.

## Step 6: Performance Settings

### Brotli Compression

Under **Speed → Optimization**, enable **Brotli**. Brotli is a modern compression algorithm that typically achieves 15–25% better compression ratios than Gzip for text-based assets (HTML, CSS, JavaScript). Supported by all modern browsers, it reduces page weight with zero configuration required.

### Auto Minify

Also under **Speed → Optimization**, enable minification for JavaScript, CSS, and HTML. Cloudflare strips whitespace, comments, and unnecessary characters from these files before serving them to visitors. This is a zero-risk performance win for most sites.

**Note:** If you're already minifying at build time (which Next.js, Vite, and most modern frameworks do automatically), enabling Cloudflare's minification on top has minimal additional benefit. But it doesn't hurt.

## Cloudflare + Vercel: Setting SSL to Full

If you're deploying on Vercel and routing traffic through Cloudflare, there's one critical configuration step that trips up many developers.

Vercel automatically provisions Let's Encrypt SSL certificates for all deployments — including your custom domain. This means your origin always has a valid, trusted certificate. You should set Cloudflare's SSL mode to **Full (Strict)**.

**Why this matters:** If you leave SSL set to **Flexible**, here's what happens:

1. Visitor hits Cloudflare over HTTPS
2. Cloudflare forwards to Vercel over HTTP
3. Vercel detects plain HTTP and redirects to HTTPS
4. Cloudflare again hits Vercel over HTTP...
5. Infinite redirect loop → \`ERR_TOO_MANY_REDIRECTS\`

Setting SSL to **Full (Strict)** breaks this loop by having Cloudflare connect to Vercel over HTTPS from the start. The redirect never fires.

## Common Errors and Fixes

### ERR_TOO_MANY_REDIRECTS

**Cause:** SSL mode is set to Flexible, but your origin is also redirecting HTTP to HTTPS, creating an infinite loop.

**Fix:** Change Cloudflare SSL/TLS mode to **Full** or **Full (Strict)**. This is almost always the right fix.

### Email Stops Working After Switching Nameservers

**Cause:** MX records weren't imported correctly, or the orange cloud is enabled on an MX-related record.

**Fix:** Go to **DNS** in Cloudflare, find your MX records, and ensure they exist and are set to **DNS Only** (grey cloud). Also check that any SPF TXT records carried over correctly. If you use Google Workspace or Microsoft 365, the specific records required are documented in their respective admin panels.

### Site Shows "Too Many Redirects" on www but Not Root (or Vice Versa)

**Cause:** One record is proxied and one isn't, creating inconsistent SSL behavior.

**Fix:** Ensure consistent proxy status across your A record (\`@\`) and CNAME (\`www\`). Both should be Proxied (orange cloud) for a standard setup.

### Cloudflare Shows "Not Active" After 24 Hours

**Cause:** Nameservers weren't updated correctly at the registrar, or the registrar hasn't propagated the change yet.

**Fix:** Re-check the nameserver values at your registrar. Copy-paste directly from the Cloudflare dashboard to avoid typos. Run \`dig yourdomain.com NS\` to verify what nameservers are currently live.

## Frequently Asked Questions

**Do I need to transfer my domain to Cloudflare to use it?**
No. Cloudflare Registrar is optional. You can keep your domain registered anywhere (GoDaddy, Namecheap, Google Domains) and simply update the nameservers to point to Cloudflare. The registrar and the DNS provider are separate roles.

**Will Cloudflare affect my Google Search Console verification?**
TXT records used for domain verification pass through Cloudflare DNS without issue. As long as the verification TXT record was imported (or you add it manually), Search Console verification works normally.

**Can I use Cloudflare on a subdomain only?**
Yes, through a feature called **Cloudflare for SaaS** or by using CNAME setup (available on Business/Enterprise plans). The standard free plan requires you to proxy at the root domain level. For most use cases, adding the full domain is the simpler path.

**Does enabling the orange cloud hide my real server IP?**
Yes. When a record is proxied, Cloudflare's IP addresses are returned in DNS queries instead of your origin IP. This is one of the key security benefits — it prevents attackers from targeting your origin directly.

**Is the free plan enough for a production site?**
For most sites, yes. The free plan includes unlimited bandwidth, DDoS protection, the global CDN, free SSL, Bot Fight Mode, and basic firewall rules. The paid plans add more advanced WAF rules, image optimization, analytics, and support. Start with free and upgrade when you hit a specific limitation.

## Take Your Infrastructure Further With Amex Technology

Setting up Cloudflare correctly is the foundation of a resilient, performant web infrastructure — but it's just one layer of a production-grade stack. A complete setup also includes edge caching strategy, cache purge automation, performance budgets, monitoring that correlates CDN events with application errors, and security rules tuned to your traffic patterns.

At **Amex Technology**, we help teams build and optimize the full deployment stack — from DNS and CDN configuration to CI/CD pipelines and observability. If you're setting up a new project or hardening an existing one, we'd be glad to review your setup.

Explore our [software development services](/services), see our [Portfolio](/portfolio), or [get in touch](/contact) to talk through your project.
    `,
    category: "DevOps",
    tags: ["Cloudflare", "DNS", "Security", "Performance", "DevOps"],
    readTime: "9 min read",
    publishedAt: "2025-03-05",
    gradientFrom: "#f97316",
    gradientTo: "#0ea5e9",
    featured: false,
    image: "/images/blog/how-to-setup-cloudflare-dns/4.webp",
    author: { name: "Amex Technology Team", url: "https://amextechnology.com/about" },
    updatedAt: "2026-07-15",
    keywords: ["Cloudflare", "DNS", "Security", "Performance", "Cloudflare DNS setup", "nameservers"],
    metaTitle: "How to Set Up Cloudflare DNS: Step-by-Step Guide (2026)",
    metaDescription: "Set up Cloudflare DNS from scratch: add your site, update nameservers, configure SSL/TLS, security, and performance. Full 2026 walkthrough.",
    faq: [
      {
        question: "Do I need to transfer my domain to Cloudflare to use it?",
        answer: "No. Cloudflare Registrar is optional. You can keep your domain registered anywhere (GoDaddy, Namecheap, Google Domains) and simply update the nameservers to point to Cloudflare. The registrar and the DNS provider are separate roles.",
      },
      {
        question: "Will Cloudflare affect my Google Search Console verification?",
        answer: "TXT records used for domain verification pass through Cloudflare DNS without issue. As long as the verification TXT record was imported (or you add it manually), Search Console verification works normally.",
      },
      {
        question: "Can I use Cloudflare on a subdomain only?",
        answer: "Yes, through a feature called Cloudflare for SaaS or by using CNAME setup (available on Business/Enterprise plans). The standard free plan requires you to proxy at the root domain level. For most use cases, adding the full domain is the simpler path.",
      },
      {
        question: "Does enabling the orange cloud hide my real server IP?",
        answer: "Yes. When a record is proxied, Cloudflare's IP addresses are returned in DNS queries instead of your origin IP. This is one of the key security benefits — it prevents attackers from targeting your origin directly.",
      },
      {
        question: "Is the free plan enough for a production site?",
        answer: "For most sites, yes. The free plan includes unlimited bandwidth, DDoS protection, the global CDN, free SSL, Bot Fight Mode, and basic firewall rules. The paid plans add more advanced WAF rules, image optimization, analytics, and support. Start with free and upgrade when you hit a specific limitation.",
      },
    ],
  },
  {
    slug: "how-to-export-code-from-lovable",
    title: "How to Export Code From Lovable to GitHub or Local (2026 Guide)",
    excerpt:
      "Learn how to export your Lovable project to GitHub or run it locally — so you can self-host, extend, or hand off to a developer.",
    content: `
## What Is Lovable and Why Would You Export?

Lovable is an AI-powered no-code builder that lets you describe a web application in plain English and get a working React app in minutes. For founders, designers, and product managers who want to move fast without a full engineering team, it's a genuinely powerful way to go from idea to functional prototype.

But at some point, most Lovable users hit a wall. You need a custom integration that Lovable's interface doesn't support. You want to hand the codebase off to a developer for production hardening. You want to self-host the app on your own infrastructure instead of Lovable's platform. Or you need to add authentication flows, payment processing, or backend logic that goes beyond what the visual editor can produce.

That's when exporting the code becomes essential. The good news: Lovable generates real code — not some proprietary format — and getting it out is straightforward once you know the steps.

## The Stack Lovable Generates

Before you export, it helps to know what you're getting. Lovable generates a standard modern React application with the following stack:

- **React** — the UI component library (the same React used by millions of developers worldwide)
- **Vite** — a fast, modern build tool that replaces the older Create React App setup
- **Tailwind CSS** — a utility-first CSS framework for styling
- **shadcn/ui** — a component library built on Radix UI, giving you accessible, polished UI primitives
- **Supabase** — an open-source Firebase alternative for database, authentication, and storage (if your app uses a backend)

This is a legitimate, production-capable tech stack. A developer who knows React can pick up a Lovable export and continue building without needing to learn any proprietary tools.

## Method 1: Connect to GitHub via Lovable Settings

The cleanest way to export is by connecting your Lovable project directly to GitHub. This gives you a proper version-controlled repository rather than a one-time ZIP snapshot.

### Step 1: Open Your Project Settings

In your Lovable editor, click on the project name or the settings icon in the top bar. This opens the project settings panel on the right side of the screen.

### Step 2: Find the GitHub Integration

In the settings panel, look for the **GitHub** section. If you haven't connected GitHub before, you'll see a **Connect to GitHub** button. Click it and authorize Lovable to access your GitHub account via OAuth. Grant the permissions Lovable requests — it needs permission to create and push to repositories.

### Step 3: Create and Push the Repository

![Publishing a Lovable project repository to GitHub remote — Publish Workflow dialog](/images/blog/how-to-export-code-from-lovable/2.png)

Once connected, give your repository a name and select whether it should be public or private. Click **Push to GitHub**. Lovable will initialize a Git repository from your project and push all the generated code to a new GitHub repo under your account.

Visit your GitHub profile to confirm the repository exists. You should see all the files — the \`src/\` directory, \`package.json\`, \`vite.config.ts\`, \`tailwind.config.ts\`, and more.

Going forward, changes you make in the Lovable editor can be synced back to GitHub with a single click from the same settings panel.

## Cloning the Repo and Running Locally

![Clone repository, install dependencies, and run dev server — complete local setup workflow](/images/blog/how-to-export-code-from-lovable/3.png)

With your code on GitHub, getting it running locally takes four commands.

### Clone the Repository

\`\`\`bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
\`\`\`

Replace \`your-username\` and \`your-repo-name\` with your actual GitHub username and the repository name you set in Lovable.

### Install Dependencies

\`\`\`bash
npm install
\`\`\`

This reads \`package.json\` and installs all the required packages into a local \`node_modules/\` directory. The first install may take a minute or two.

### Start the Development Server

\`\`\`bash
npm run dev
\`\`\`

Vite will start a local development server, usually at \`http://localhost:5173\`. Open that URL in your browser — you should see your Lovable app running locally, identical to how it appeared in the Lovable editor.

## Understanding the Project Structure

A Lovable export has a clean, conventional structure:

\`\`\`
src/
  components/       — React UI components
  pages/            — Top-level route components
  hooks/            — Custom React hooks
  lib/              — Utility functions and config
  integrations/     — Supabase client setup
public/             — Static assets
package.json        — Dependencies and scripts
vite.config.ts      — Vite build configuration
tailwind.config.ts  — Tailwind CSS configuration
\`\`\`

The components folder is where you'll spend most of your time as a developer. Each component Lovable generated corresponds to a visible section of your UI.

## Environment Variables: What Lovable Stores vs What You Recreate

This is the most common stumbling block when running a Lovable export locally. Lovable's platform securely stores your environment variables (like your Supabase project URL and anon key) and injects them at build time. When you export the code, those values are not included — you need to recreate them yourself.

Create a \`.env.local\` file in the root of your project:

\`\`\`bash
touch .env.local
\`\`\`

Add your Supabase credentials (find these in your Supabase project dashboard under **Settings → API**):

\`\`\`
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
\`\`\`

Note the \`VITE_\` prefix — this is how Vite exposes environment variables to the client-side code. Any variable without this prefix will be invisible to your React components.

Add \`.env.local\` to your \`.gitignore\` if it isn't already there. Never commit credentials to version control.

## Deploying the Export to Vercel

Once the app runs locally, deploying to Vercel takes under five minutes.

1. Push your code to GitHub (if you've made any local changes)
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**
3. Import your GitHub repository
4. In the **Environment Variables** section, add \`VITE_SUPABASE_URL\` and \`VITE_SUPABASE_ANON_KEY\` with the same values as your local \`.env.local\`
5. Click **Deploy**

Vercel automatically detects the Vite framework and configures the build settings correctly. Your app will be live at a \`.vercel.app\` URL within two minutes. Connect a custom domain from the Vercel project settings when you're ready.

## What You Can Customize Post-Export

Once you have the code locally, you're no longer limited by what Lovable's editor supports. Common post-export customizations include:

**Custom API routes** — Add a backend with serverless functions using Vercel Edge Functions or a separate Express/Hono API server.

**Advanced authentication** — Replace the basic Supabase auth setup with custom flows: magic links, social OAuth, SSO, or role-based access control enforced at the row level in Supabase.

**Third-party integrations** — Add Stripe for payments, Resend for transactional email, Posthog for analytics, or any other npm package that wasn't available in Lovable's interface.

**Performance optimization** — Add code splitting, lazy loading, image optimization, and caching headers that aren't configured in the default export.

**CI/CD pipeline** — Set up GitHub Actions to run type checking, linting, and tests on every PR before merging.

## Common Issues and Fixes

### Missing Environment Variables Cause a Blank Screen

If you open \`http://localhost:5173\` and see a blank page or console errors like \`undefined is not an object\`, the most likely cause is missing Supabase credentials.

**Fix:** Double-check that \`.env.local\` exists in the project root, that the variable names start with \`VITE_\`, and that you restarted the dev server after creating the file (\`npm run dev\` needs to be restarted to pick up new \`.env.local\` values).

### Supabase Connection Errors

If you see errors like \`Failed to fetch\` or \`NetworkError\` in the console when the app tries to load data, your Supabase project may have Row Level Security (RLS) policies that block anonymous access.

**Fix:** Check your Supabase dashboard under **Authentication → Policies**. If your app is supposed to show data to unauthenticated users, add an RLS policy that allows \`SELECT\` for the \`anon\` role on the relevant tables.

### \`npm install\` Fails With Peer Dependency Errors

Lovable may have used a Node.js version with a specific npm behavior. If \`npm install\` throws warnings about peer dependencies, try:

\`\`\`bash
npm install --legacy-peer-deps
\`\`\`

Or install and use the Node version specified in the project's \`.nvmrc\` or \`package.json\` engines field if one is present.

## Frequently Asked Questions

**Does exporting from Lovable cost anything?**
Exporting to GitHub is available on Lovable's paid plans. Check Lovable's current pricing page for the exact tier that includes GitHub export — it's typically included in the Pro plan.

**Will my Lovable app keep working after I export?**
Yes. Exporting the code to GitHub doesn't remove or disable your Lovable project. Both the Lovable-hosted version and your exported copy exist independently. You can continue editing in Lovable and syncing to GitHub as needed.

**Can a developer continue building in Lovable after I export?**
Yes. Because Lovable pushes to a real GitHub repo, a developer can clone the repo, work locally in VS Code or any editor, and push changes back to GitHub. The Lovable editor can also pull those changes back in (with some limitations on heavily customized code).

**Do I need to keep paying for Lovable after I self-host?**
No. Once you've exported the code and deployed it to your own infrastructure, your app runs independently of Lovable. You only need an active Lovable subscription if you want to continue using the AI editor to make changes.

**What's the difference between the Lovable export and a Bolt.new or v0.dev export?**
All three generate React code you can export. Lovable's exports tend to be more complete full-stack applications with Supabase integration. Bolt and v0.dev are stronger for UI prototypes. The underlying React/Vite/Tailwind stack is similar across all three.

## Take Your Lovable Prototype to Production With Amex Technology

Exporting from Lovable is the bridge between a fast prototype and a production application. But the gap between "it works locally" and "it scales reliably with real users" is significant — it involves production database optimization, proper auth hardening, CI/CD pipelines, monitoring, and deployment infrastructure.

At **Amex Technology**, we specialize in taking Lovable and other no-code prototypes and turning them into production-grade applications. Whether you need a developer to extend your exported codebase, a team to rebuild it on a more scalable architecture, or help setting up the deployment and monitoring infrastructure, we can help.

Explore our [software development services](/services), see our [Portfolio](/portfolio), or [get in touch](/contact) to talk through your project.
    `,
    category: "Tutorial",
    tags: ["Lovable", "No-Code", "GitHub", "Developer Tools", "Deployment"],
    readTime: "5 min read",
    publishedAt: "2025-03-28",
    gradientFrom: "#ec4899",
    gradientTo: "#8b5cf6",
    featured: false,
    image: "/images/blog/how-to-export-code-from-lovable/1.webp",
    author: { name: "Amex Technology Team", url: "https://amextechnology.com/about" },
    updatedAt: "2026-07-15",
    keywords: ["Lovable", "No-Code", "GitHub", "Developer Tools", "export code from Lovable", "self-host"],
    metaTitle: "How to Export Code From Lovable to GitHub (2026 Guide)",
    metaDescription: "Export your Lovable project to GitHub or run it locally so you can self-host, extend, or hand it to a developer. Step-by-step guide.",
    faq: [
      {
        question: "Does exporting from Lovable cost anything?",
        answer: "Exporting to GitHub is available on Lovable's paid plans. Check Lovable's current pricing page for the exact tier that includes GitHub export — it's typically included in the Pro plan.",
      },
      {
        question: "Will my Lovable app keep working after I export?",
        answer: "Yes. Exporting the code to GitHub doesn't remove or disable your Lovable project. Both the Lovable-hosted version and your exported copy exist independently. You can continue editing in Lovable and syncing to GitHub as needed.",
      },
      {
        question: "Can a developer continue building in Lovable after I export?",
        answer: "Yes. Because Lovable pushes to a real GitHub repo, a developer can clone the repo, work locally in VS Code or any editor, and push changes back to GitHub. The Lovable editor can also pull those changes back in (with some limitations on heavily customized code).",
      },
      {
        question: "Do I need to keep paying for Lovable after I self-host?",
        answer: "No. Once you've exported the code and deployed it to your own infrastructure, your app runs independently of Lovable. You only need an active Lovable subscription if you want to continue using the AI editor to make changes.",
      },
      {
        question: "What's the difference between the Lovable export and a Bolt.new or v0.dev export?",
        answer: "All three generate React code you can export. Lovable's exports tend to be more complete full-stack applications with Supabase integration. Bolt and v0.dev are stronger for UI prototypes. The underlying React/Vite/Tailwind stack is similar across all three.",
      },
    ],
  },
  {
    slug: "how-to-setup-resend-email",
    title: "How to Set Up Resend Transactional Email in Next.js (2026 Guide)",
    excerpt:
      "Complete guide to setting up Resend — from domain verification and DNS records to sending your first email with Next.js and React Email templates.",
    content: `
## Why Transactional Email Is Harder Than It Looks

Transactional emails — password resets, order confirmations, welcome emails, invoice receipts — are some of the most business-critical messages your application sends. If they don't land in the inbox, users can't log in, can't complete purchases, and assume your product is broken.

The problem is that email delivery is genuinely complex. Every major email provider (Gmail, Outlook, Apple Mail) uses a combination of IP reputation, domain reputation, content filtering, and authentication checks to decide whether a message goes to the inbox or the spam folder. Getting this right with raw SMTP is a full-time job.

This is why developers reach for email delivery services. For years, SendGrid and Mailgun dominated this space. But both carry the baggage of legacy APIs, confusing dashboards, and aggressive spam filtering on shared IP pools that punish new senders for the bad behaviour of other accounts.

**Resend** is the modern alternative. Built specifically for developers, it has a clean REST API, first-class React Email integration for building templates, and an excellent free tier (3,000 emails per month, 100/day) that covers most side projects and early-stage products.

## Creating a Resend Account and Getting Your API Key

![Resend API Keys dashboard — Create API Key button and existing development key](/images/blog/how-to-setup-resend-email/1.png)

Go to [resend.com](https://resend.com) and sign up with your GitHub account or email. The onboarding flow is fast — you're in the dashboard within two minutes.

Once inside, navigate to **API Keys** in the left sidebar and click **Create API Key**. Give it a descriptive name (e.g., \`production-app\` or \`local-dev\`) and select the appropriate permission level:

- **Full Access** — can send emails and manage domain settings. Use for your production server.
- **Sending Access** — can only send emails. Safer for application use; recommended.

Click **Add** and copy the key immediately. Resend only shows the full key once. Store it in your environment variables — never in source code.

\`\`\`bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
\`\`\`

On Vercel or any deployment platform, add this as a secret environment variable. Locally, add it to your \`.env.local\` file (which should be in \`.gitignore\`).

## Adding and Verifying Your Sending Domain

![Resend Domains dashboard showing SPF, DKIM, and DMARC DNS verification records for a verified domain](/images/blog/how-to-setup-resend-email/3.png)

You can send from Resend's shared domain (\`onboarding@resend.dev\`) immediately, but for production you must send from your own domain. This is both a deliverability requirement (Gmail and Outlook increasingly filter mail from shared sender pools) and a branding requirement.

In the Resend dashboard, go to **Domains** → **Add Domain**. Enter your root domain (e.g., \`yourdomain.com\`). Resend will give you three DNS records to add at your domain registrar.

### SPF Record (Sender Policy Framework)

SPF is a TXT record that tells receiving mail servers which IP addresses are authorized to send email on behalf of your domain.

\`\`\`
Type:  TXT
Name:  @
Value: v=spf1 include:amazonses.com ~all
\`\`\`

Resend uses Amazon SES infrastructure under the hood, so the SPF record authorizes Amazon's sending IPs. The \`~all\` at the end is a "soft fail" — messages from unauthorized sources are flagged but not rejected outright, which is the standard practice.

### DKIM Record (DomainKeys Identified Mail)

DKIM adds a cryptographic signature to every outbound message. The receiving server looks up the public key in your DNS and verifies the signature, confirming the email wasn't tampered with in transit.

Resend generates the key pair. You add the public key as a CNAME record:

\`\`\`
Type:  CNAME
Name:  resend._domainkey
Value: resend._domainkey.yourdomain.com.dkim.resend.com
\`\`\`

Without DKIM, your emails are more likely to be flagged as spoofed. This is the most important authentication record.

### DMARC Record (Domain-based Message Authentication)

DMARC ties SPF and DKIM together and tells receiving servers what to do when a message fails both checks.

\`\`\`
Type:  TXT
Name:  _dmarc
Value: v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com
\`\`\`

Start with \`p=none\` (monitor mode) — this means failing messages are still delivered but Resend can report on them. Once you've confirmed your legitimate email passes authentication, tighten to \`p=quarantine\` (send to spam) or \`p=reject\` (block entirely).

After adding all three records, return to the Resend dashboard and click **Verify**. DNS propagation usually takes 15–60 minutes. Once all three records show a green checkmark, your domain is verified and ready to send.

## Installing the Resend SDK

In your project directory:

\`\`\`bash
npm install resend
\`\`\`

That's the only dependency needed for sending emails. For React Email templates (covered below), you'll install additional packages.

## Sending Your First Email With the SDK

![Resend dashboard showing an API POST request and live email preview delivered successfully](/images/blog/how-to-setup-resend-email/2.png)

With the SDK installed and your API key in environment variables, sending an email takes five lines:

\`\`\`typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const { data, error } = await resend.emails.send({
  from: 'Your App <noreply@yourdomain.com>',
  to: ['user@example.com'],
  subject: 'Welcome to Your App',
  html: '<p>Thanks for signing up! We are glad you are here.</p>',
});
\`\`\`

The \`from\` field must use a domain you have verified in Resend. The \`to\` field accepts a string or array of strings. The \`html\` field accepts any HTML string — though for production you'll want to use React Email templates rather than raw HTML strings.

## Using React Email for Templates

React Email lets you build HTML email templates as React components, using a set of cross-client-compatible primitives. This solves one of the ugliest problems in email development: different email clients (Gmail web, Outlook desktop, Apple Mail) render HTML very differently, and writing HTML that works everywhere is painful.

Install React Email and the component library:

\`\`\`bash
npm install @react-email/components react-email
\`\`\`

Create a template file at \`src/emails/WelcomeEmail.tsx\`:

\`\`\`tsx
import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Button,
  Hr,
} from '@react-email/components';

interface WelcomeEmailProps {
  name: string;
  loginUrl: string;
}

export default function WelcomeEmail({ name, loginUrl }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#f6f9fc', fontFamily: 'sans-serif' }}>
        <Container style={{ maxWidth: '560px', margin: '0 auto', padding: '40px 20px' }}>
          <Heading style={{ color: '#1a1a1a' }}>Welcome, {name}</Heading>
          <Text style={{ color: '#555', lineHeight: '1.6' }}>
            Your account is ready. Click the button below to sign in for the first time.
          </Text>
          <Button
            href={loginUrl}
            style={{ backgroundColor: '#6366f1', color: '#fff', padding: '12px 24px', borderRadius: '6px' }}
          >
            Sign In
          </Button>
          <Hr style={{ borderColor: '#e4e4e7', margin: '32px 0' }} />
          <Text style={{ color: '#999', fontSize: '12px' }}>
            If you did not create this account, you can safely ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
\`\`\`

To render this to an HTML string for Resend, use the \`render\` function from \`@react-email/components\`:

\`\`\`typescript
import { render } from '@react-email/components';
import WelcomeEmail from '@/emails/WelcomeEmail';

const html = await render(<WelcomeEmail name="Jane" loginUrl="https://app.example.com/login" />);
\`\`\`

## Integrating Resend in a Next.js App Router API Route

![Next.js and Resend developer workflow — API route, email template, dashboard, and Gmail inbox](/images/blog/how-to-setup-resend-email/5.png)

Here is a complete, production-ready API route at \`src/app/api/send/route.ts\`:

\`\`\`typescript
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/components';
import WelcomeEmail from '@/emails/WelcomeEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email } = await req.json();

  if (!name || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const html = await render(
    <WelcomeEmail name={name} loginUrl={\`https://yourdomain.com/login\`} />
  );

  const { data, error } = await resend.emails.send({
    from: 'Your App <noreply@yourdomain.com>',
    to: [email],
    subject: \`Welcome to Your App, \${name}!\`,
    html,
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }

  return NextResponse.json({ id: data?.id });
}
\`\`\`

This route validates inputs, renders the React Email template to HTML, sends the email, and returns the Resend message ID on success or a structured error on failure. The Resend instance is created outside the handler so it is reused across requests in the same function instance.

## Handling Form Submissions with Loading and Error States

On the client side, calling this route from a form with proper feedback:

\`\`\`tsx
'use client';

import { useState } from 'react';

export default function SignupForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');

    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;

    const res = await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });

    setStatus(res.ok ? 'success' : 'error');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" type="text" placeholder="Your name" required />
      <input name="email" type="email" placeholder="Your email" required />
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : 'Sign Up'}
      </button>
      {status === 'success' && <p>Check your inbox — email sent!</p>}
      {status === 'error' && <p>Something went wrong. Please try again.</p>}
    </form>
  );
}
\`\`\`

## Best Practices for Deliverability

Getting emails delivered to the inbox consistently requires more than just having a verified domain.

**Use a consistent sending address.** Pick one \`from\` address per email type and stick to it. Changing senders frequently damages reputation.

**Warm up new domains gradually.** A brand-new domain that suddenly sends 1,000 emails on day one will trigger spam filters. Start with small batches (10–50/day), ramp up over two to four weeks.

**Include a plain-text version.** Emails with only HTML content score lower with some spam filters. Resend supports a \`text\` field alongside \`html\` — always include a plain-text fallback.

**Avoid spam trigger words in subjects.** Phrases like "FREE!!!", "Act Now", or "You've been selected" train spam filters against you. Write subject lines the way you'd write them to a colleague.

**Handle bounces and complaints.** Resend's webhook system can notify your application when an email hard-bounces or is marked as spam. Remove those addresses from your mailing list immediately — continued sending to bad addresses damages your domain reputation.

## Testing With Resend's Email Logs

One of Resend's standout features is the **Logs** section in the dashboard. Every email you send is recorded with its full status: delivered, bounced, opened (if tracking is enabled), or failed.

When debugging a deliverability issue, check Logs first. You'll see the exact error message Resend received from the recipient's mail server — far more useful than a generic "email failed to send" error from most providers.

You can also use Resend's **test email addresses** (\`delivered@resend.dev\`, \`bounced@resend.dev\`, \`complained@resend.dev\`) to simulate different delivery outcomes without sending to real users. This is especially useful for testing your webhook handling logic.

## Common Errors and Fixes

### "The domain is not verified"

Your \`from\` address uses a domain that hasn't been verified in Resend, or verification is still pending.

**Fix:** Check the Domains section of your dashboard. If records were recently added, wait 15–60 minutes for DNS propagation and click Verify again. Confirm the DNS records match exactly what Resend provided — extra spaces or missing characters in CNAME values are a common source of failures.

### Rate limit errors on the free tier

Resend's free tier caps sends at 100 emails per day and 3,000 per month. If you hit this limit, the API returns a \`429 Too Many Requests\` error.

**Fix:** Upgrade to a paid plan, or implement a queue system that batches and spaces out sends. For production applications with any real user volume, upgrade early — the paid tier starts at very reasonable pricing.

### \`render\` returns an empty string

This happens when the React Email render function is called in an environment that doesn't support JSX transformation, or when there's a mismatch between the React version and React Email's peer dependency expectations.

**Fix:** Ensure your \`tsconfig.json\` has \`"jsx": "react-jsx"\` and that your Next.js version is 13.4 or later. Running \`npm install react@latest react-dom@latest\` to align versions resolves most cases.

## Frequently Asked Questions

**Can I use Resend to send marketing emails, not just transactional ones?**
Resend is primarily designed for transactional email — messages triggered by user actions. For bulk marketing campaigns (newsletters, promotional blasts), dedicated platforms like Loops, Buttondown, or ConvertKit are better suited. Resend's terms of service and infrastructure are optimized for transactional volume.

**Do I need my own domain to use Resend?**
No — you can send from \`onboarding@resend.dev\` immediately after creating an account. However, for production use you must add and verify your own domain. Emails from Resend's shared domain will be flagged as suspicious by many email clients for any message that looks like it comes from your product.

**How does Resend compare to SendGrid on price?**
Resend's free tier (3,000/month) is more generous than SendGrid's (100/day). Resend's paid plans are also simpler and cheaper for most developer use cases. SendGrid has a larger feature set for enterprise scenarios (dedicated IPs, advanced analytics, marketing automation), but for a typical web application Resend's API is cleaner and more affordable.

**Can I send attachments with Resend?**
Yes. The \`resend.emails.send\` method accepts an \`attachments\` array where each item has a \`filename\` and \`content\` (base64-encoded string or Buffer). PDFs, images, and other binary files all work — just keep attachment sizes reasonable to avoid triggering spam filters.

**What happens to emails in the queue if my server goes down during a send?**
Resend handles delivery retries internally once a message is accepted by their API. If your server crashes before the API call completes, the email is not queued on Resend's side. For guaranteed delivery, consider using a background job queue (BullMQ, Inngest, Trigger.dev) to persist the send intent before making the Resend API call.

## Add Production-Grade Email to Your App With Amex Technology

Resend makes the initial setup straightforward, but building a truly robust email system requires more: proper bounce handling, unsubscribe flows, email preference management, monitoring for deliverability regressions, and making sure your domain reputation stays clean as your user base grows.

At **Amex Technology**, we integrate production-grade transactional email into every application we build — from the DNS verification and React Email template system to the webhook infrastructure that handles bounces and complaints automatically.

If you're building a product that needs reliable email, explore our [web app development services](/services#web-app-development), see our [Portfolio](/portfolio), or reach out via the [Contact](/contact) page.
    `,
    category: "Engineering",
    tags: ["Resend", "Email", "Next.js", "API", "Transactional Email"],
    readTime: "8 min read",
    publishedAt: "2025-04-14",
    gradientFrom: "#10b981",
    gradientTo: "#0ea5e9",
    featured: false,
    image: "/images/blog/how-to-setup-resend-email/4.webp",
    imagePosition: "object-top",
    author: { name: "Amex Technology Team", url: "https://amextechnology.com/about" },
    updatedAt: "2026-07-15",
    keywords: ["Resend", "Email", "Next.js", "Transactional Email", "SPF DKIM DMARC", "React Email"],
    metaTitle: "How to Set Up Resend Email in Next.js (2026 Guide)",
    metaDescription: "Configure Resend end to end: domain verification, SPF/DKIM DNS records, and sending your first email with Next.js and React Email.",
    faq: [
      {
        question: "Can I use Resend to send marketing emails, not just transactional ones?",
        answer: "Resend is primarily designed for transactional email — messages triggered by user actions. For bulk marketing campaigns (newsletters, promotional blasts), dedicated platforms like Loops, Buttondown, or ConvertKit are better suited. Resend's terms of service and infrastructure are optimized for transactional volume.",
      },
      {
        question: "Do I need my own domain to use Resend?",
        answer: "No — you can send from onboarding@resend.dev immediately after creating an account. However, for production use you must add and verify your own domain. Emails from Resend's shared domain will be flagged as suspicious by many email clients for any message that looks like it comes from your product.",
      },
      {
        question: "How does Resend compare to SendGrid on price?",
        answer: "Resend's free tier (3,000/month) is more generous than SendGrid's (100/day). Resend's paid plans are also simpler and cheaper for most developer use cases. SendGrid has a larger feature set for enterprise scenarios (dedicated IPs, advanced analytics, marketing automation), but for a typical web application Resend's API is cleaner and more affordable.",
      },
      {
        question: "Can I send attachments with Resend?",
        answer: "Yes. The resend.emails.send method accepts an attachments array where each item has a filename and content (base64-encoded string or Buffer). PDFs, images, and other binary files all work — just keep attachment sizes reasonable to avoid triggering spam filters.",
      },
      {
        question: "What happens to emails in the queue if my server goes down during a send?",
        answer: "Resend handles delivery retries internally once a message is accepted by their API. If your server crashes before the API call completes, the email is not queued on Resend's side. For guaranteed delivery, consider using a background job queue (BullMQ, Inngest, Trigger.dev) to persist the send intent before making the Resend API call.",
      },
    ],
  },
  {
    slug: "connect-nextjs-react-with-supabase",
    title: "How to Connect Next.js with Supabase: Auth, Database & Real-Time (2026)",
    excerpt:
      "A comprehensive guide to integrating Supabase with Next.js or React — covering database queries, authentication, Row Level Security, and real-time subscriptions.",
    content: `
## What Is Supabase?

Supabase is an open-source backend-as-a-service built on top of PostgreSQL. It bundles four major services under a single project:

- **Database** — a fully managed PostgreSQL instance with a built-in REST and GraphQL API, generated automatically from your schema
- **Auth** — user management with email/password, magic links, OAuth providers (Google, GitHub, etc.), and phone auth
- **Storage** — an S3-compatible file storage service with access policies tied to your database permissions
- **Realtime** — a WebSocket layer that lets clients subscribe to database changes as they happen

Unlike Firebase, which is a NoSQL document store, Supabase gives you a real relational database with foreign keys, joins, and full SQL power. That makes it a substantially better fit for the structured data most applications actually need.

## When to Use Supabase

Supabase is a strong default choice for any full-stack application where you want a complete backend without managing your own infrastructure. It's particularly well-suited for:

- **SaaS products** that need multi-tenant data isolation via Row Level Security
- **Applications with complex data relationships** that benefit from SQL and joins
- **Projects that need auth, database, and file storage** from a single provider
- **Prototypes and MVPs** where speed of development matters more than custom infrastructure

The free tier (500 MB database, 1 GB storage, 50,000 monthly active users) is generous enough to take a project from zero to early revenue.

## Step 1: Create a Supabase Project and Get Your Credentials

![Supabase new organization creation screen — Name, Type, and Plan selection](/images/blog/connect-nextjs-react-with-supabase/pasted-image.png)

Go to [supabase.com](https://supabase.com), sign in, and click **New Project**. Give it a name, choose a region close to your users, and set a strong database password (save this — you'll need it for direct Postgres connections).

Once the project is provisioned (about 30 seconds), navigate to **Settings → API**. You'll find two values you need:

- **Project URL** — something like \`https://abcdefgh.supabase.co\`
- **anon public key** — a long JWT string. This is safe to use in client-side code as long as Row Level Security is enabled on your tables.

Keep the **service_role key** secret. It bypasses RLS entirely and should only be used in server-side code where you explicitly need admin access to the database.

## Step 2: Install the SDK and Configure Environment Variables

![Supabase project API Settings showing Project URL, anon public key, and service role key](/images/blog/connect-nextjs-react-with-supabase/image-2.png)

![VS Code editor with .env.local file open — NEXT_PUBLIC_SUPABASE_URL and keys configured](/images/blog/connect-nextjs-react-with-supabase/pasted-image-3.png)

\`\`\`bash
npm install @supabase/supabase-js
\`\`\`

Create a \`.env.local\` file in your project root (add it to \`.gitignore\` if it isn't already):

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
\`\`\`

The \`NEXT_PUBLIC_\` prefix exposes these variables to the browser bundle. The anon key is intentionally public — it's designed to be used in client-side code. Its permissions are limited by Row Level Security policies on your database tables.

## Step 3: Initialize the Client

Create \`src/lib/supabase.ts\`:

\`\`\`typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
\`\`\`

Import this singleton wherever you need database or auth access. For plain React (Vite or Create React App) this single file is all you need. For Next.js App Router, you'll use a different setup covered below — but this client is still the right starting point for React-only projects.

## Step 4: Database CRUD Operations

Supabase's query builder mirrors SQL closely. Here are the four essential operations.

### Select (Read)

\`\`\`typescript
const { data, error } = await supabase
  .from('posts')
  .select('id, title, content, created_at')
  .order('created_at', { ascending: false })
  .limit(10);
\`\`\`

### Insert (Create)

\`\`\`typescript
const { data, error } = await supabase
  .from('posts')
  .insert({ title: 'My First Post', content: 'Hello world', user_id: userId })
  .select()
  .single();
\`\`\`

The \`.select().single()\` chain returns the newly created row — useful when you need the auto-generated \`id\`.

### Update

\`\`\`typescript
const { error } = await supabase
  .from('posts')
  .update({ title: 'Updated Title' })
  .eq('id', postId);
\`\`\`

### Delete

\`\`\`typescript
const { error } = await supabase
  .from('posts')
  .delete()
  .eq('id', postId);
\`\`\`

Always handle the \`error\` return value. A common mistake is checking \`data\` before checking \`error\` — the error object tells you whether a query failed and why, including RLS policy violations.

## Step 5: Authentication — Email/Password Signup and Login

Supabase Auth ships with pre-built flows for the most common authentication methods.

### Sign Up

\`\`\`typescript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securepassword123',
  options: {
    data: { full_name: 'Jane Smith' },   // stored in auth.users.raw_user_meta_data
  },
});

if (error) {
  console.error('Signup error:', error.message);
} else {
  console.log('User created:', data.user?.id);
}
\`\`\`

By default, Supabase sends a confirmation email. The user is not considered active until the link is clicked. You can disable email confirmation in **Authentication → Settings** for development, but always enable it in production.

### Sign In

\`\`\`typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'securepassword123',
});

if (data.session) {
  console.log('Logged in:', data.session.user.id);
}
\`\`\`

### Sign Out

\`\`\`typescript
await supabase.auth.signOut();
\`\`\`

### Listening to Auth State Changes

\`\`\`typescript
const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') { /* update UI */ }
  if (event === 'SIGNED_OUT') { /* redirect to login */ }
});

// Clean up on component unmount
return () => subscription.unsubscribe();
\`\`\`

## Step 6: Next.js App Router Setup With @supabase/ssr

The single \`createClient\` approach works for React SPAs, but Next.js App Router has both server and client components, Server Actions, and middleware — each running in a different context with different cookie access. Supabase provides \`@supabase/ssr\` to handle this correctly.

\`\`\`bash
npm install @supabase/ssr
\`\`\`

### Browser Client (Client Components)

\`\`\`typescript
// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
\`\`\`

Use this in any \`'use client'\` component. It reads and writes cookies in the browser, keeping the session in sync.

### Server Client (Server Components, Route Handlers, Server Actions)

\`\`\`typescript
// src/lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );
}
\`\`\`

### Middleware for Session Refresh

Without middleware, a server component renders with a potentially expired session. Add \`src/middleware.ts\` to refresh the session on every request:

\`\`\`typescript
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  await supabase.auth.getUser();   // refreshes session if needed
  return supabaseResponse;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
\`\`\`

This ensures that short-lived access tokens are refreshed server-side before your page renders, preventing flickering auth states.

## Step 7: Row Level Security

Row Level Security (RLS) is PostgreSQL's mechanism for enforcing per-row access rules at the database level. With RLS enabled, even if a bug in your application code accidentally exposes a query, the database itself will only return rows the authenticated user is allowed to see.

Enable RLS on a table and add a policy in the Supabase SQL editor:

\`\`\`sql
-- Enable RLS on the posts table
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Users can only read their own posts
CREATE POLICY "Users can view their own posts"
  ON posts FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only insert posts with their own user_id
CREATE POLICY "Users can insert their own posts"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can only update their own posts
CREATE POLICY "Users can update their own posts"
  ON posts FOR UPDATE
  USING (auth.uid() = user_id);
\`\`\`

\`auth.uid()\` is a Supabase built-in that returns the ID of the currently authenticated user from the JWT. With these policies in place, a query for \`posts\` using the anon key will only ever return rows where \`user_id\` matches the logged-in user — regardless of what filters the application code passes.

## Step 8: Real-Time Subscriptions

Supabase Realtime lets you subscribe to database changes using PostgreSQL's logical replication. Changes to any table — inserts, updates, deletes — are broadcast over a WebSocket to all subscribed clients.

\`\`\`typescript
const channel = supabase
  .channel('posts-changes')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'posts' },
    (payload) => {
      if (payload.eventType === 'INSERT') {
        setPosts(prev => [payload.new as Post, ...prev]);
      }
      if (payload.eventType === 'DELETE') {
        setPosts(prev => prev.filter(p => p.id !== payload.old.id));
      }
    }
  )
  .subscribe();

// Clean up on unmount
return () => { supabase.removeChannel(channel); };
\`\`\`

Before subscriptions work, you must enable replication on the table in the Supabase dashboard under **Database → Replication**. Toggle the relevant tables on.

## Step 9: File Uploads With Supabase Storage

![Supabase Storage dashboard alongside real-time database update workflow diagram](/images/blog/connect-nextjs-react-with-supabase/4.png)

Create a storage bucket in **Storage → New Bucket**. Set it to private unless files need to be publicly accessible.

\`\`\`typescript
// Upload a file
const { data, error } = await supabase.storage
  .from('avatars')
  .upload(\`\${userId}/avatar.png\`, file, {
    contentType: 'image/png',
    upsert: true,
  });

// Get a public URL (for public buckets)
const { data: { publicUrl } } = supabase.storage
  .from('avatars')
  .getPublicUrl(\`\${userId}/avatar.png\`);

// Get a signed URL (for private buckets, valid for 1 hour)
const { data: { signedUrl } } = await supabase.storage
  .from('avatars')
  .createSignedUrl(\`\${userId}/avatar.png\`, 3600);
\`\`\`

Storage access is controlled by storage policies, similar in syntax to RLS. A common policy for user avatars: allow a user to upload and read files only under their own \`user_id\` path.

## Common Mistakes

### Using the Anon Key Server-Side Without RLS

The anon key is safe on the client because RLS limits what it can access. But if you use it in a Server Action or Route Handler without RLS enabled on your tables, every authenticated user can query every row — including other users' data.

**Fix:** Enable RLS on every table that contains user data. Use the Supabase dashboard's **Advisors → Security** tab to get a report of tables with RLS disabled.

### Not Refreshing the Session in Middleware

If you skip the middleware setup, server components render with a stale or expired session. The user appears logged out on the first server render even though their browser has a valid session cookie.

**Fix:** Add the middleware from Step 6 above. This is the most common source of "auth works in client components but not server components" confusion.

### Fetching Data in Client Components When Server Components Would Work

Many developers default to \`useEffect\` + Supabase client for all data fetching. In Next.js App Router, Server Components can fetch data directly without a loading state, waterfall, or client-side JavaScript.

**Fix:** Use the server client in Server Components for initial data loads. Reserve the browser client for mutations, real-time subscriptions, and auth state changes that must happen on the client.

## Frequently Asked Questions

**Is the anon key safe to commit to a public repository?**
The anon key is designed to be public — it identifies your project, not your access level. It's safe to expose it in client-side code. What makes it safe is RLS. Without RLS on your tables, the anon key grants full read/write access to all rows, which is why enabling RLS is non-negotiable for any production application.

**What's the difference between \`createClient\` from \`@supabase/supabase-js\` and from \`@supabase/ssr\`?**
The base \`createClient\` stores the session in localStorage, which doesn't work in server environments. The \`@supabase/ssr\` variants (\`createBrowserClient\` and \`createServerClient\`) use cookies instead, enabling the session to be read by both browser and server code in Next.js.

**Can I use Supabase with a React app that isn't Next.js?**
Yes. The base \`@supabase/supabase-js\` client works in any JavaScript environment — Vite, Create React App, React Native, or plain HTML. The \`@supabase/ssr\` package is specifically for server-rendering frameworks like Next.js, Remix, and SvelteKit.

**How do I handle database migrations as my schema changes?**
Supabase integrates with the Supabase CLI and supports migration files that you can version control alongside your application code. Run \`supabase db diff\` to generate a migration from schema changes, then \`supabase db push\` to apply it. For teams, this is the recommended approach over manually editing tables in the dashboard.

**Does Supabase support full-text search?**
Yes. PostgreSQL has built-in full-text search using \`tsvector\` and \`tsquery\`. Supabase exposes this through the \`.textSearch()\` method on the query builder. For more advanced search (fuzzy matching, relevance ranking, multi-language), you can use the \`pg_trgm\` extension, which Supabase supports out of the box.

## Build Production-Grade Supabase Applications With Amex Technology

Setting up Supabase correctly is the beginning. A production application needs a hardened schema with proper indexes, RLS policies that cover every access pattern, a migration strategy that works with CI/CD, and monitoring that alerts you when query performance degrades.

At **Amex Technology**, we design and build full-stack applications on the Next.js and Supabase stack — from schema design and RLS policy architecture to the deployment pipeline and observability layer. If you're starting a new project or scaling an existing one, we'd be glad to help you get it right from the foundation.

Explore our [software development services](/services), see our [Portfolio](/portfolio), or [get in touch](/contact) to talk through your project.
    `,
    category: "Engineering",
    tags: ["Next.js", "React", "Supabase", "Database", "Authentication", "Full Stack"],
    readTime: "10 min read",
    publishedAt: "2025-05-20",
    gradientFrom: "#22c55e",
    gradientTo: "#3b82f6",
    featured: true,
    image: "/images/blog/connect-nextjs-react-with-supabase/mainimage.webp",
    author: { name: "Amex Technology Team", url: "https://amextechnology.com/about" },
    updatedAt: "2026-07-15",
    keywords: ["Next.js", "React", "Supabase", "Database", "Authentication", "Row Level Security"],
    metaTitle: "How to Connect Next.js to Supabase (2026 Complete Guide)",
    metaDescription: "Integrate Supabase with Next.js or React: database queries, auth, Row Level Security, and real-time subscriptions. Complete 2026 guide.",
    faq: [
      {
        question: "Is the anon key safe to commit to a public repository?",
        answer: "The anon key is designed to be public — it identifies your project, not your access level. It's safe to expose it in client-side code. What makes it safe is RLS. Without RLS on your tables, the anon key grants full read/write access to all rows, which is why enabling RLS is non-negotiable for any production application.",
      },
      {
        question: "What's the difference between createClient from @supabase/supabase-js and from @supabase/ssr?",
        answer: "The base createClient stores the session in localStorage, which doesn't work in server environments. The @supabase/ssr variants (createBrowserClient and createServerClient) use cookies instead, enabling the session to be read by both browser and server code in Next.js.",
      },
      {
        question: "Can I use Supabase with a React app that isn't Next.js?",
        answer: "Yes. The base @supabase/supabase-js client works in any JavaScript environment — Vite, Create React App, React Native, or plain HTML. The @supabase/ssr package is specifically for server-rendering frameworks like Next.js, Remix, and SvelteKit.",
      },
      {
        question: "How do I handle database migrations as my schema changes?",
        answer: "Supabase integrates with the Supabase CLI and supports migration files that you can version control alongside your application code. Run supabase db diff to generate a migration from schema changes, then supabase db push to apply it. For teams, this is the recommended approach over manually editing tables in the dashboard.",
      },
      {
        question: "Does Supabase support full-text search?",
        answer: "Yes. PostgreSQL has built-in full-text search using tsvector and tsquery. Supabase exposes this through the .textSearch() method on the query builder. For more advanced search (fuzzy matching, relevance ranking, multi-language), you can use the pg_trgm extension, which Supabase supports out of the box.",
      },
    ],
  },
  {
    slug: "how-to-connect-github-with-lovable",
    title: "How to Connect GitHub With Lovable (2026 Step-by-Step Guide)",
    excerpt:
      "Sync your Lovable project to GitHub in a few clicks — set up two-way sync, work locally, and keep real version control. A clear step-by-step guide.",
    content: `
## Why Connect Lovable to GitHub

Lovable lets you build a full app from a chat prompt, but by default that code lives inside Lovable's editor. Connecting your project to GitHub gives the code a real, version-controlled home that you own.

Once connected, every change you make in Lovable is committed to your repository, and any change you push to GitHub flows back into Lovable. You can work locally in your own editor, collaborate with other developers, review changes as pull requests, and keep a full history.

If you plan to grow the project beyond a prototype, this is the first step. This guide covers connecting Lovable to GitHub, how the two-way sync works, and how to fix the issues people hit most.

## Before You Start

Make sure you have:

- A **Lovable project** you want to sync
- A **GitHub account** (the free plan is fine)
- Permission to create repositories on the account or organization you want to use

You don't need to know Git commands to connect the two — Lovable handles the initial setup for you.

## Step 1: Open the GitHub Integration in Lovable

Open your project in Lovable. In the top-right of the editor, find the **GitHub** button (or open the project menu and choose the GitHub / version control option).

Click it to start the connection flow. The first time, Lovable will ask you to authorize its GitHub app.

## Step 2: Authorize Lovable on GitHub

![GitHub authorization screen requesting Lovable repository permissions — Authorize Lovable button](/images/blog/how-to-connect-github-with-lovable/2.png)

You'll be redirected to GitHub to install and authorize the Lovable app. GitHub asks which account or organization to install it on, and whether to grant access to **all repositories** or **only select repositories**.

Choosing "only select repositories" is the safer option — grant access to a single repo now and add more later. Approve the permissions and you'll be sent back to Lovable.

## Step 3: Create or Select a Repository

![Lovable Create New Repository screen — repository name, Public/Private toggle, and Create Repository button](/images/blog/how-to-connect-github-with-lovable/3.png)

Back in Lovable, you can now either:

- **Create a new repository** — Lovable creates a fresh repo under your account and pushes the current project into it, or
- **Connect an existing repository** — link the project to a repo you already have

Pick a name, choose public or private, and confirm. Lovable performs the first commit and push, and within a few seconds your code appears on GitHub.

## Step 4: How Two-Way Sync Works

![Two-way synchronization workflow between Lovable, GitHub, and your local developer machine](/images/blog/how-to-connect-github-with-lovable/4.png)

After connecting, Lovable and GitHub stay in sync automatically:

- Edits you make **in Lovable** are committed and pushed to the connected branch.
- Commits pushed **to GitHub** (from your machine or a teammate) are pulled back into Lovable.

This is what makes a hybrid workflow possible — non-technical teammates keep prompting in Lovable while developers work in a proper local environment, and both sides see the same code.

## Working Locally After Connecting

![Complete workflow: Lovable Project → Connect GitHub → Clone Repository → Develop Locally → Push → Auto-Sync to Lovable](/images/blog/how-to-connect-github-with-lovable/5.png)

To edit the project on your own machine, clone the repository:

\`\`\`bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
npm install
npm run dev
\`\`\`

Make your changes, then commit and push:

\`\`\`bash
git add .
git commit -m "Update landing page copy"
git push origin main
\`\`\`

Your push flows straight back into Lovable. If you'd rather take the code out entirely instead of syncing, see our guide on [how to export code from Lovable](/blog/how-to-export-code-from-lovable).

## Common Issues and Fixes

**"Lovable can't see my repository."** Re-check the GitHub app permissions — if you chose "only select repositories," the target repo must be in that list. Add it under GitHub → Settings → Applications → Lovable.

**Changes aren't syncing.** Confirm both sides are on the same branch (usually \`main\`). Lovable syncs to the connected branch only.

**Merge conflicts.** If you and Lovable edit the same lines, Git can conflict. Resolve it locally, commit, and push — Lovable picks up the resolved version.

## Frequently Asked Questions

**Do I need to know Git to connect Lovable to GitHub?**
No. Lovable sets up the repository and the first commit for you. You only need Git if you want to work locally, and even then the basic clone, commit, and push commands are enough.

**Is the GitHub sync two-way?**
Yes. Changes in Lovable are pushed to GitHub, and changes pushed to GitHub are pulled back into Lovable automatically, as long as they're on the connected branch.

**Can I connect a private repository?**
Yes. When creating the repo you can choose private, or connect an existing private repo — just grant the Lovable GitHub app access to it.

**What happens to my code if I disconnect GitHub?**
Your code stays in both places. Disconnecting stops the sync, but the GitHub repository and the Lovable project both keep their current code.

**Can multiple developers work on the same Lovable project through GitHub?**
Yes. That's the main benefit — developers work through GitHub with branches and pull requests while the project stays editable in Lovable.

## Take Your Projects Further With Amex Technology

Connecting Lovable to GitHub is the bridge between a prototype and a production codebase. From there you'll want proper branching, CI/CD, staging environments, and a deployment setup that scales.

At **Amex Technology**, we help teams take Lovable and no-code projects into professional, maintainable production apps. Whether you're wiring up GitHub, adding a [custom domain to Lovable](/blog/how-to-connect-custom-domain-with-lovable), or rebuilding for scale, we can help.

Explore our [software development services](/services), see our [Portfolio](/portfolio), or [get in touch](/contact) to talk through your project.
    `,
    category: "Tutorial",
    tags: ["Lovable", "GitHub", "Version Control"],
    readTime: "6 min read",
    publishedAt: "2026-07-12",
    gradientFrom: "#8b5cf6",
    gradientTo: "#ec4899",
    featured: false,
    image: "/images/blog/how-to-connect-github-with-lovable/1.webp",
    author: { name: "Amex Technology Team", url: "https://amextechnology.com/about" },
    updatedAt: "2026-07-12",
    keywords: ["Lovable", "GitHub", "Version Control", "connect GitHub to Lovable", "Lovable GitHub sync"],
    metaTitle: "How to Connect GitHub to Lovable (2026 Step-by-Step)",
    metaDescription: "Connect your Lovable project to GitHub for two-way sync and real version control. Step-by-step setup, how the sync works, and common fixes.",
    faq: [
      {
        question: "Do I need to know Git to connect Lovable to GitHub?",
        answer: "No. Lovable sets up the repository and the first commit for you. You only need Git if you want to work locally, and even then the basic clone, commit, and push commands are enough.",
      },
      {
        question: "Is the GitHub sync two-way?",
        answer: "Yes. Changes in Lovable are pushed to GitHub, and changes pushed to GitHub are pulled back into Lovable automatically, as long as they're on the connected branch.",
      },
      {
        question: "Can I connect a private repository?",
        answer: "Yes. When creating the repo you can choose private, or connect an existing private repo — just grant the Lovable GitHub app access to it.",
      },
      {
        question: "What happens to my code if I disconnect GitHub?",
        answer: "Your code stays in both places. Disconnecting stops the sync, but the GitHub repository and the Lovable project both keep their current code.",
      },
      {
        question: "Can multiple developers work on the same Lovable project through GitHub?",
        answer: "Yes. That's the main benefit — developers work through GitHub with branches and pull requests while the project stays editable in Lovable.",
      },
    ],
  },
  {
    slug: "how-to-connect-custom-domain-with-lovable",
    title: "How to Connect a Custom Domain to Lovable (2026 Step-by-Step Guide)",
    excerpt:
      "Point your custom domain to a Lovable project — publish, connect the domain, set the DNS records, and enable HTTPS. A clear step-by-step walkthrough.",
    content: `
## Why Use a Custom Domain

By default, a Lovable project lives on a \`.lovable.app\` subdomain. That's fine for testing, but a custom domain — your own \`yourbrand.com\` — is what makes the project look professional, builds trust, and helps with SEO and brand recall.

The good news: connecting a domain to Lovable takes just a few steps. You publish the project, tell Lovable which domain to use, add a couple of DNS records at your registrar, and wait for HTTPS to switch on. This guide covers the whole process and the issues people hit most.

## Before You Start

You'll need:

- A **published Lovable project** (custom domains only work after publishing)
- A **domain** you own, registered at any registrar (GoDaddy, Namecheap, Cloudflare, and so on)
- Access to that registrar's **DNS settings** — this is where you'll add records

You don't need to transfer your domain to Lovable. You keep it where it is and simply point the DNS at Lovable.

## Step 1: Publish Your Lovable Project

In the Lovable editor, click **Publish** (top-right). This pushes your project live on its default \`.lovable.app\` URL. Confirm the site loads there before moving on — the custom domain simply points at this published version.

## Step 2: Add Your Domain in Lovable

![Lovable Domains & Branding screen — Connect Custom Domain button with CNAME and TXT DNS records](/images/blog/how-to-connect-custom-domain-with-lovable/2.png)

Open **Project Settings** and find the **Domains** section. Click **Connect domain** (or **Add custom domain**) and enter the exact domain you want to use — for example \`yourbrand.com\` or \`www.yourbrand.com\`.

Lovable then shows you the **exact DNS records** to add. Leave this screen open — you'll copy these values into your registrar next. The values Lovable displays are the source of truth; use those rather than any generic ones.

## Step 3: Add the DNS Records at Your Registrar

![DNS records diagram for custom domain: A Record, CNAME, DNS Verification TXT, and SSL Certificate](/images/blog/how-to-connect-custom-domain-with-lovable/3.png)

Log into your domain registrar and open its **DNS management** page. Add the records Lovable gave you. Typically that means one of:

- **Root / apex domain** (\`yourbrand.com\`) — an **A record** pointing to the IP address Lovable shows.
- **Subdomain** (\`www.yourbrand.com\`) — a **CNAME record** pointing to the target Lovable shows.

Enter each record exactly as displayed (host/name, type, and value). If you want both the root and \`www\` to work, add both records, then save.

If your registrar is Cloudflare, set the record to **DNS only** (grey cloud) while connecting so the proxy doesn't block verification. For a full Cloudflare walkthrough, see our [Cloudflare DNS setup guide](/blog/how-to-setup-cloudflare-dns).

## Step 4: Verify and Wait for HTTPS

![Lovable Domain Status dashboard showing Verified & Active with SSL Certificate and HTTPS Enabled](/images/blog/how-to-connect-custom-domain-with-lovable/4.png)

Back in Lovable, the domain status moves to **verifying**. Once the DNS records are detected, Lovable issues an SSL certificate automatically and your site becomes available over **https://** at your custom domain.

DNS changes can take anywhere from a few minutes to 48 hours to propagate, though in practice it's usually under an hour.

## Verifying It Works

![Lovable publishing workflow: Publish Project → Add Custom Domain → Configure DNS → Verify Domain → Enable HTTPS → Website Live](/images/blog/how-to-connect-custom-domain-with-lovable/5.png)

Open your domain in a browser. You should see your Lovable site load with a padlock (valid HTTPS). To confirm the record has propagated, check it with a tool like whatsmydns.net and make sure it resolves to the value Lovable gave you.

## Common Issues and Fixes

**Domain stuck on "verifying."** The DNS records probably don't match. Re-open the Lovable domains screen and compare each value character-for-character with your registrar. A stray dot or the wrong record type is the usual culprit.

**Site works on \`www\` but not the root (or vice versa).** You only added one of the two records. Add both the apex (A) and \`www\` (CNAME), and set your preferred version as the primary.

**No HTTPS or certificate error.** SSL is issued after DNS verifies, so give it time. On Cloudflare, keep the record DNS-only during setup so the certificate can validate.

**Old site still showing.** That's browser or DNS caching. Try an incognito window, flush your DNS, and let propagation finish.

## Frequently Asked Questions

**Do I have to transfer my domain to Lovable?**
No. You keep your domain at its current registrar and just point the DNS records at Lovable. Nothing about ownership changes.

**How long does it take for the domain to work?**
Usually under an hour, but DNS propagation can officially take up to 48 hours. HTTPS turns on automatically once Lovable verifies the records.

**Do I need to buy an SSL certificate?**
No. Lovable provisions and renews a free SSL certificate for your custom domain automatically once the DNS is verified.

**Can I use both the root domain and www?**
Yes. Add the A record for the root domain and a CNAME for \`www\`, then choose which one is primary — the other redirects to it.

**My domain is at GoDaddy — does that work?**
Yes, any registrar works. Add the records in GoDaddy's DNS manager. If you also deploy elsewhere, our [Vercel + GoDaddy guide](/blog/connect-vercel-app-godaddy-domain) covers the same DNS concepts step by step.

## Take Your Projects Further With Amex Technology

A custom domain makes your Lovable project feel real — but a professional launch also means analytics, SEO, performance, and a plan for when the app outgrows no-code.

At **Amex Technology**, we help founders and businesses take Lovable projects to production — from [connecting GitHub](/blog/how-to-connect-github-with-lovable) and custom domains to full rebuilds.

Explore our [software development services](/services), see our [Portfolio](/portfolio), or [get in touch](/contact) to talk through your project.
    `,
    category: "DevOps",
    tags: ["Lovable", "Custom Domain", "DNS"],
    readTime: "7 min read",
    publishedAt: "2026-07-14",
    gradientFrom: "#0ea5e9",
    gradientTo: "#6366f1",
    featured: false,
    image: "/images/blog/how-to-connect-custom-domain-with-lovable/1.webp",
    author: { name: "Amex Technology Team", url: "https://amextechnology.com/about" },
    updatedAt: "2026-07-14",
    keywords: ["Lovable", "Custom Domain", "DNS", "connect custom domain to Lovable", "Lovable custom domain"],
    metaTitle: "How to Add a Custom Domain to Lovable (2026 Guide)",
    metaDescription: "Add a custom domain to your Lovable project: publish, connect the domain, set A/CNAME DNS records, enable HTTPS, and fix propagation issues.",
    faq: [
      {
        question: "Do I have to transfer my domain to Lovable?",
        answer: "No. You keep your domain at its current registrar and just point the DNS records at Lovable. Nothing about ownership changes.",
      },
      {
        question: "How long does it take for the domain to work?",
        answer: "Usually under an hour, but DNS propagation can officially take up to 48 hours. HTTPS turns on automatically once Lovable verifies the records.",
      },
      {
        question: "Do I need to buy an SSL certificate?",
        answer: "No. Lovable provisions and renews a free SSL certificate for your custom domain automatically once the DNS is verified.",
      },
      {
        question: "Can I use both the root domain and www?",
        answer: "Yes. Add the A record for the root domain and a CNAME for www, then choose which one is primary — the other redirects to it.",
      },
      {
        question: "My domain is at GoDaddy — does that work?",
        answer: "Yes, any registrar works. Add the records in GoDaddy's DNS manager. The DNS concepts are the same across registrars.",
      },
    ],
  }
];
