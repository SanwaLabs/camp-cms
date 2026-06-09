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

## Supabase Boundary

Do not create or run migrations from this repository. Database setup is manual.

Use [`docs/database-manual-setup.md`](docs/database-manual-setup.md) as a
reviewable reference for schema, RLS, indexes, storage buckets, and audit
logging. Apply database changes manually in Supabase.

## Deployment

Deploy the web app to Vercel:

1. Import the repository into Vercel.
2. Add the environment variables above to Preview and Production.
3. Connect the app to the manually configured Supabase project.
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
