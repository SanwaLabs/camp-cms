# Princeton-Blairstown Center Demo Data

This guide describes the seeded demo snapshot for **Princeton-Blairstown Center** (PBC). Use it for sales demos, local development walkthroughs, and role-based access testing.

## Reset the snapshot

From the repository root with the Supabase CLI installed:

```bash
npm run db:reset
```

This applies migrations and loads PBC seed files from `supabase/seeds/` (configured in `supabase/config.toml`).

## Signing in

You can log in as **any** of the five demo users below. Each account shares one demo password.

| Role | Email |
|------|-------|
| Admin | `sage@sanwalabs.ai` |
| Program Manager | `program_manager@sanwalabs.ai` |
| Site Lead | `site_lead@sanwalabs.ai` |
| Facilitator | `facilitator@sanwalabs.ai` |
| School Partner | `school_partner@sanwalabs.ai` |

**Password:** Contact your admin for the demo password. Local developers can find it in `DEMO_USER_PASSWORD` in `.env.local` (see `.env.example` for the variable name). The password is never stored in application code or this documentation.

Start with `sage@sanwalabs.ai` for the full dashboard, then switch roles to see RLS differences.

## Five things to see in the data

### 1. Programs — past, present, and future

**Where:** `/programs` (Past / Present / Future tabs)

**Story:** Four PBC programs with fifteen date-relative sessions (five per tab) so the demo always looks current.

- **Past:** Spring Outdoor Ed week, Leadership Week 1, Memorial Weekend retreat
- **Present:** Leadership Week 3 running **right now**, plus July and Fall sessions within six months
- **Future:** Summer 2027 kickoff and expedition sessions six+ months out

**What to say:** "Session timing buckets update automatically — we never show stale dates after a reset."

### 2. Incidents — noticeable but realistic

**Where:** `/dashboard` (Open incident queue) and `/incidents`

**Story:** Four incidents spanning severity and lifecycle:

| Incident | Severity | Status | Demo hook |
|----------|----------|--------|-----------|
| Camper allergy response — epinephrine administered | High | In review | Overdue follow-up; involves lead facilitator + site lead |
| Challenge course harness pre-check gap | Medium | Open | Equipment checklist gap; due in 3 days |
| Lakefront dock slip — no injury | Low | Closed | Shows completed incident lifecycle |
| Bus arrival 45 min late | Medium | Open | School partnership communication gap |

**What to say:** "Managers see open work immediately — severity, status, and follow-up ownership in one queue."

### 3. Staff — compliance and readiness mix

**Where:** `/staff` and `/dashboard` (Certification risk panel)

**Story:** Seven staff across three sites with mixed compliance states:

- **Jordan Ellis** — CPR expiring in ~18 days (dashboard cert risk)
- **Morgan Reyes** — Background check **pending** (blocked from overnights)
- **Riley Chen** — Crisis Prevention **expired** (urgent flag)
- **Alex Kim** / **Jamie Park** — Linked to site lead and facilitator demo logins

**What to say:** "The roster surfaces who is ready for field work and who needs manager action before the next session."

### 4. Evaluations — coaching arcs and rubric detail

**Where:** `/dashboard` (Recent evaluations), `/evaluations`, `/staff/[id]` (trend chart)

**Story:**

- **Jordan Ellis** — Three evaluations over three months, scores rising 4.1 → 4.7 (sparkline improvement arc)
- **Morgan Reyes** — Recent 4.2 with coaching note on checklist reinforcement
- **Sam Ortiz** — Strong 4.8 with all rubric categories at 4–5

**What to say:** "Evaluation history supports coaching conversations — not just a single score."

### 5. AI assistant — suggestion log (guided reports planned)

**Where:** `/ai`

**Story today:** Three PBC-themed suggestion log entries (survey drafts and rainy-day activity ideas).

**Planned — guided report buttons (not built yet):**

| Button | Intended output |
|--------|-----------------|
| Programs report | Session schedule summary, past/present/future counts, capacity by site |
| Incidents report | Open vs closed breakdown, severity distribution, overdue follow-ups |
| Staff report | Certification compliance snapshot, background check gaps, roster by site |
| Evaluations report | Average scores by staff, trending facilitators, pending gaps |

These will send structured prompts plus aggregated org context to `/api/ai/suggestions` and save results to `ai_suggestion_logs`. Role-gated to admin and program manager.

## Role-based walkthrough

| Role | What to demonstrate |
|------|---------------------|
| Admin | Full dashboard, all modules, export |
| Program Manager | Staff, incidents, evaluations, reports |
| Site Lead | Main Campus incidents and site staff |
| Facilitator | Own profile, certifications, evaluations only |
| School Partner | Read-only approved survey access |

## Credential warning

Demo accounts and `DEMO_USER_PASSWORD` are for **local and demo environments only**. Do not reuse these credentials in production Supabase projects without rotation.
