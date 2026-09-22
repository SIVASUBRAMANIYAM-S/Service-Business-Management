-- Seed data for local/dev use. Mirrors mobile/src/lib/placeholder-data.ts
-- CATEGORIES so the app's UI doesn't change once it switches from the
-- placeholder array to a real Supabase query. Keep these two in sync.

insert into public.categories (id, "group", name, icon, sort_order) values
  ('ac-repair', 'home_services', 'AC Repair', '❄️', 1),
  ('plumbing', 'home_services', 'Plumbing', '🔧', 2),
  ('electrical', 'home_services', 'Electrical', '💡', 3),
  ('cleaning', 'home_services', 'Cleaning', '🧹', 4),
  ('pest-control', 'home_services', 'Pest Control', '🐜', 5),
  ('appliance-repair', 'home_services', 'Appliance Repair', '🛠️', 6),
  ('clinic', 'healthcare', 'Clinics', '🏥', 7),
  ('dentist', 'healthcare', 'Dentists', '🦷', 8),
  ('physiotherapy', 'healthcare', 'Physiotherapists', '🧑‍⚕️', 9),
  ('veterinary', 'healthcare', 'Veterinary', '🐾', 10)
on conflict (id) do nothing;
