-- 20260922175301_init_schema.sql
--
-- First MVP schema for Service Business Management (customer mobile app only).
-- Matches the confirmed scope in docs/02-mvp-scope.md:
--   - Marketplace model: many businesses per category, customer picks one.
--   - Customer picks the specific business/provider (no auto-assignment).
--   - Pay at booking time (payment fields live on the booking row).
--   - Healthcare V1 = appointments + basic info only, no medical records yet.
--
-- Full schema for staff/admin/business-dashboard/patient-records comes later.

-- ---------------------------------------------------------------------------
-- profiles: one row per customer, extends auth.users.
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is 'Customer profile, one row per auth.users row. Business owner/staff/admin profiles are a later phase.';

-- Automatically create a profiles row whenever someone signs up via Supabase Auth.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------------------------------------------------------------------------
-- categories: flat list with a group, so new categories/groups don't require
-- code changes (see docs/03-categories.md).
-- ---------------------------------------------------------------------------
create table public.categories (
  id text primary key,
  "group" text not null check ("group" in ('home_services', 'healthcare')),
  name text not null,
  icon text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

comment on table public.categories is 'Home Services + Healthcare category tree. See docs/03-categories.md.';

-- ---------------------------------------------------------------------------
-- businesses: the entities a customer picks from within a category.
-- ---------------------------------------------------------------------------
create table public.businesses (
  id uuid primary key default gen_random_uuid(),
  category_id text not null references public.categories (id),
  owner_id uuid references auth.users (id),
  name text not null,
  rating numeric(2, 1) not null default 0 check (rating >= 0 and rating <= 5),
  address text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.businesses is 'owner_id is nullable for now — business-owner accounts/dashboards are a later phase, not part of this migration.';

create index businesses_category_id_idx on public.businesses (category_id);

-- ---------------------------------------------------------------------------
-- services: what a business offers, with a price and duration.
-- ---------------------------------------------------------------------------
create table public.services (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses (id) on delete cascade,
  name text not null,
  price_rupees integer not null check (price_rupees >= 0),
  duration_minutes integer not null check (duration_minutes > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index services_business_id_idx on public.services (business_id);

-- ---------------------------------------------------------------------------
-- bookings: one customer, one service, one business, paid at booking time.
-- ---------------------------------------------------------------------------
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references auth.users (id),
  business_id uuid not null references public.businesses (id),
  service_id uuid not null references public.services (id),
  scheduled_at timestamptz not null,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  price_rupees integer not null check (price_rupees >= 0),
  payment_status text not null default 'pending'
    check (payment_status in ('pending', 'paid', 'refunded')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.bookings is 'business_id is denormalized from services.business_id to keep RLS/queries simple.';

create index bookings_customer_id_idx on public.bookings (customer_id);
create index bookings_business_id_idx on public.bookings (business_id);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.businesses enable row level security;
alter table public.services enable row level security;
alter table public.bookings enable row level security;

-- profiles: a user can only see/edit their own row.
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- categories / businesses / services: public read (no auth required),
-- no client-side writes yet — writes come with the business dashboard phase.
create policy "categories_public_read" on public.categories
  for select using (true);

create policy "businesses_public_read" on public.businesses
  for select using (true);

create policy "services_public_read" on public.services
  for select using (true);

-- bookings: a customer can only see and create their own bookings.
create policy "bookings_select_own" on public.bookings
  for select using (auth.uid() = customer_id);

create policy "bookings_insert_own" on public.bookings
  for insert with check (auth.uid() = customer_id);
