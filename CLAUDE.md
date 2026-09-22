# Service Business Management — project rules for AI coding agents

This file applies to the whole repository. `mobile/CLAUDE.md` /
`mobile/AGENTS.md` add Expo/React-Native-specific rules on top of this — read
both before touching code in `mobile/`.

## What this project is

Read [`docs/01-product-overview.md`](./docs/01-product-overview.md) and
[`docs/02-mvp-scope.md`](./docs/02-mvp-scope.md) first. In short: a
marketplace app (customer picks the specific business/provider, pays at
booking time) for Home Services + Healthcare. **Only the customer mobile app
is being built right now** — no business/staff/admin dashboards yet.

## Repository layout

```
service-business-management/
├── mobile/            # Expo + TypeScript customer app (the only app right now)
├── supabase/          # Migrations, seed data — see supabase/migrations/
├── docs/              # Living product/architecture docs — keep in sync with code
├── CLAUDE.md           # this file
```

There is no `apps/web`, `packages/`, or monorepo tooling yet — don't add one
without being asked. When the business/staff/admin web dashboard phase
starts, that's the point to introduce a proper monorepo structure.

## Rules

1. **Don't add a new dependency without calling it out first.** If a task
   seems to need a new library, stop and say so (name it, explain why) before
   installing it. Prefer what's already installed
   (`@supabase/supabase-js`, `@tanstack/react-query`, `zustand`,
   `react-hook-form`, `zod`, `expo-secure-store`).
2. **Keep decisions in `docs/02-mvp-scope.md` up to date.** If a change
   contradicts a confirmed decision there (marketplace model, customer picks
   provider, pay-at-booking, healthcare V1 scope), either follow the existing
   decision or update the doc in the same change — don't silently diverge.
3. **Supabase migrations are additive and forward-only.** Never edit a
   migration file that's already been applied/pushed; add a new migration
   instead. Every new migration should update
   [`docs/04-database-schema.md`](./docs/04-database-schema.md) in the same
   change. New tables/columns need an explicit RLS policy — don't leave a
   table with RLS enabled and no policies (locks everyone out) or RLS
   disabled on a table with user data (opens it to everyone).
4. **Categories are data, not code.** Don't hard-code category lists in
   components; read from `CATEGORIES` (`mobile/src/lib/placeholder-data.ts`
   today, the real `categories` table after Phase 2) and keep
   [`docs/03-categories.md`](./docs/03-categories.md) in sync.
5. **Placeholder vs. real data.** Code in `mobile/src/lib/placeholder-data.ts`
   is temporary. When wiring a screen to real Supabase data, remove the
   placeholder import for that screen rather than leaving both in place.
6. **Naming:** files in `mobile/src/app/` are routes (expo-router) — keep
   non-route code in `components/`, `hooks/`, `lib/`, `store/`, `types/`.
   Use kebab-case for filenames, PascalCase for components/types, camelCase
   for variables/functions, matching the existing files.
7. **Healthcare data is more sensitive.** Don't add patient-records/medical-
   document features without an explicit request — see the risk note in
   `docs/02-mvp-scope.md`.

## Before declaring a task done

From `mobile/`: `npx tsc --noEmit` and `npx expo lint`. For Supabase changes:
the migration must be valid SQL (and applied via `supabase db push` once a
project is linked) and documented in `docs/04-database-schema.md`.
