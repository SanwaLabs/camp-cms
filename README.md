# Youth Program Operations Platform

Secure web platform for youth-serving organizations to manage staff profiles,
incidents, certifications, evaluations, surveys, reporting, and AI-assisted
program support.

## Stack

- Next.js + TypeScript
- Tailwind CSS
- Supabase Auth, Postgres, Storage, Realtime, and RLS
- Vercel deployment and cron
- OpenAI-compatible AI suggestion endpoint

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Required environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

The app can run in demo mode without Supabase env vars. Protected routes become
enforced after Supabase keys are configured.

## Supabase Database

Supabase schema changes are versioned in [`supabase/migrations`](supabase/migrations).
The initial baseline creates the app schema, RLS policies, indexes, storage
buckets, and audit logging tables described in
[`docs/database-manual-setup.md`](docs/database-manual-setup.md).

Apply migrations with the Supabase CLI from a reviewed checkout:

```bash
supabase db reset
```

For a linked remote project, review the SQL first and then run the appropriate
Supabase CLI migration command for that environment. Do not commit
`supabase/.temp` or environment secrets.

## Demo data

The app ships with a **Princeton-Blairstown Center** demo snapshot loaded via
`supabase db reset`. Five role-based demo accounts (`@sanwalabs.ai`) let you
explore the same dataset with different permissions.

See [docs/demo-princeton-blairstown-center.md](docs/demo-princeton-blairstown-center.md)
for the full walkthrough. Contact your admin for the demo password; local
developers set `DEMO_USER_PASSWORD` in `.env.local` (see `.env.example`).

```bash
npm run db:reset
npm run dev
```

## Deployment

Deploy the web app to Vercel:

1. Import the repository into Vercel.
2. Add the environment variables above to Preview and Production.
3. Connect the app to the migrated Supabase project.
4. Confirm `/login`, `/dashboard`, `/api/reports/export`, and
   `/api/notifications/reminders` work in Preview.

Daily reminder checks are configured in [`vercel.json`](vercel.json). The route
currently runs in dry-run mode until an email provider and audit table are
connected.

## Verification

```bash
npm run typecheck
npm run build
```

Before production launch:

- Confirm RLS on every exposed Supabase table.
- Confirm storage policies for staff documents and incident attachments.
- Confirm service-role keys are never exposed to the browser.
- Run Supabase security and performance advisors manually.
- Confirm sensitive exports and AI saves produce audit records.
