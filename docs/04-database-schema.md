# Database Schema

This document is kept in sync with the actual Supabase migrations in
[`supabase/migrations/`](../supabase/migrations). If you change a migration,
update this file in the same commit.

**Status:** the SQL below has been written and syntax-validated locally, but
has **not** been applied to a live Supabase project yet — that happens once a
project exists (see [02-mvp-scope.md](./02-mvp-scope.md) and the plan's Phase
2). Once linked, run `npx supabase db push` (or `supabase db reset` for local
dev) to apply it.

## Current migration

`supabase/migrations/20260922175301_init_schema.sql` — first MVP schema.
Covers only what the customer mobile app needs today (marketplace browsing +
booking). Staff/admin/business-dashboard/patient-records tables are a later
migration, not part of this one.

## Tables

### `profiles`

One row per customer, extending `auth.users`.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | = `auth.users.id` |
| `full_name` | `text` | nullable |
| `phone` | `text` | nullable |
| `created_at` | `timestamptz` | |
| `updated_at` | `timestamptz` | |

A `handle_new_user()` trigger on `auth.users` automatically inserts a
`profiles` row (with `full_name` pulled from signup metadata) whenever a new
user signs up — so Phase 2's "does signup create a profiles row?" check
should pass without any extra client code.

### `categories`

Flat category list with a `group`, matching
[03-categories.md](./03-categories.md). Seeded via `supabase/seed.sql`.

| Column | Type | Notes |
|---|---|---|
| `id` | `text` PK | slug, e.g. `ac-repair` |
| `group` | `text` | `home_services` \| `healthcare` |
| `name` | `text` | display name |
| `icon` | `text` | emoji shown on Home |
| `sort_order` | `integer` | display order |
| `created_at` | `timestamptz` | |

### `businesses`

The entities a customer picks from within a category (marketplace model).

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `category_id` | `text` | FK → `categories.id` |
| `owner_id` | `uuid` | FK → `auth.users.id`, **nullable** — business-owner accounts are a later phase |
| `name` | `text` | |
| `rating` | `numeric(2,1)` | 0–5 |
| `address` | `text` | nullable |
| `created_at` / `updated_at` | `timestamptz` | |

### `services`

What a business offers, with price and duration.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `business_id` | `uuid` | FK → `businesses.id`, cascades on delete |
| `name` | `text` | |
| `price_rupees` | `integer` | >= 0 |
| `duration_minutes` | `integer` | > 0 |
| `created_at` / `updated_at` | `timestamptz` | |

### `bookings`

One customer, one service, at one business, paid at booking time.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `customer_id` | `uuid` | FK → `auth.users.id` |
| `business_id` | `uuid` | FK → `businesses.id`, denormalized from `services.business_id` for simpler RLS/queries |
| `service_id` | `uuid` | FK → `services.id` |
| `scheduled_at` | `timestamptz` | |
| `status` | `text` | `pending` \| `confirmed` \| `completed` \| `cancelled` |
| `price_rupees` | `integer` | >= 0, snapshot of the service price at booking time |
| `payment_status` | `text` | `pending` \| `paid` \| `refunded` |
| `created_at` / `updated_at` | `timestamptz` | |

## Row Level Security (RLS)

| Table | Policy | Effect |
|---|---|---|
| `profiles` | `profiles_select_own`, `profiles_update_own` | a user can only read/update their own row |
| `categories` | `categories_public_read` | anyone can read all rows |
| `businesses` | `businesses_public_read` | anyone can read all rows |
| `services` | `services_public_read` | anyone can read all rows |
| `bookings` | `bookings_select_own`, `bookings_insert_own` | a user can only see/create their own bookings |

Business-owner/staff/admin write access (managing their own businesses,
services, and bookings) is **not** in this migration — it's added once the
web dashboard phase begins, along with the roles needed to scope those
policies correctly.

## Not in this migration (future)

- Staff, business-owner, and admin roles/tables
- Business verification/approval workflow
- Patient records / medical documents (healthcare)
- Reviews, payments/invoices tables, notifications
