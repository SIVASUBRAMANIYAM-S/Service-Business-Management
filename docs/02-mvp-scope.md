# MVP Scope — Confirmed Decisions

This document records the product decisions already confirmed for V1, so they
aren't re-litigated later as the app grows. If a future change is needed,
update this file in the same commit as the change.

## Business model: Marketplace

The customer sees **multiple businesses per category**, not a single assigned
provider. Example: searching "AC Repair" shows a list of AC repair businesses
near the customer, each with their own services, ratings, and pricing.

This is **not** a SaaS-per-business model (each business getting its own
private app) and **not** an auto-dispatch model (system assigns a technician
with no customer choice).

## Booking model: Customer picks the provider

The customer explicitly selects which business (and later, which
staff member) they want to book, rather than the system assigning one
automatically.

## Payment timing: Pay at booking time

Payment happens online, during checkout, at the moment the booking is
created — not after the service is completed. (Future: refunds/cancellations
policy is a separate decision, not yet made.)

## Healthcare scope for V1: Appointments + basic patient records

Healthcare (clinics, dentists, physiotherapists, vets) launches with:

- Appointment booking (select clinic → doctor → appointment type → date/time → confirm → pay).
- Basic patient/customer information attached to the appointment.

This is **more complex than a pure booking MVP** because patient records
introduce stricter privacy/security/access-control requirements. To manage
that complexity, we build screens in this order regardless of vertical:

```
auth → home → categories/services → business listing → booking → booking history
```

Patient-records screens are added as a **later increment**, once the core
booking loop (the list above) works end-to-end for both Home Services and
Healthcare. This is intentional — not a silently dropped or silently expanded
scope.

## Testing method

Expo Go on physical Android + iPhone devices. No local simulators/emulators
required to start (so no Xcode/Android Studio setup is required for this phase).

## Current build scope

Only the **customer mobile app** (Android + iOS, one Expo/React Native +
TypeScript codebase). Business owner, staff, and admin web dashboards are a
later phase and are explicitly out of scope right now.

## Explicitly out of scope for now (future phases)

- Payments integration (gateway wiring — schema/UI for "pay at booking" comes first)
- Push notifications
- Business/staff/admin web dashboards
- Maps/location
- Patient-records screens (see healthcare note above)
- Full automated test suite, CI/CD, and store deployment
