# Product Overview

## What is Service Business Management?

Service Business Management is a marketplace app that connects customers with
local service businesses. A customer opens the app, picks a category (e.g.
"AC Repair" or "Dentist"), sees a list of real businesses that offer that
service, picks the specific business/provider they want, books a time slot,
and pays online at the time of booking.

Later phases add a web dashboard so business owners and their staff can manage
their own bookings, services, and customers — but that is **not** part of the
current build. Right now we are building the **customer mobile app only**.

## Who uses it (roles)

| Role | Where | Status in this build |
|---|---|---|
| Customer | Mobile app (iOS + Android, Expo/React Native) | **Building now** |
| Business Owner | Web dashboard | Future phase |
| Staff / Employee | Web dashboard | Future phase |
| Platform Admin | Web dashboard | Future phase |

## What problem does it solve?

Today, booking a home-service technician or a healthcare appointment usually
means phone calls, guessing at availability, and paying in person. This app
lets a customer:

1. Browse categories (Home Services, Healthcare) from one home screen.
2. See real businesses/providers in each category, not just one assigned provider.
3. Pick the exact business and time slot they want.
4. Pay online during checkout — no separate payment step later.
5. See their booking history in one place.

## Categories at launch

- **Home Services:** AC Repair, Plumbing, Electrical, Cleaning, Pest Control, Appliance Repair.
- **Healthcare:** Clinics, Dentists, Physiotherapists, Veterinary Clinics.

See [03-categories.md](./03-categories.md) for the full category tree.

## Related documents

- [02-mvp-scope.md](./02-mvp-scope.md) — confirmed scope decisions for V1.
- [03-categories.md](./03-categories.md) — category tree.
- [04-database-schema.md](./04-database-schema.md) — database schema (added once the first migration exists).
