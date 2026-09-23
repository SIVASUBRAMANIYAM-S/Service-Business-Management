# Categories

The category tree below is the source of truth for what customers see on the
Home screen. It mirrors the current placeholder data in
`apps/mobile/src/lib/placeholder-data.ts` (`CATEGORIES`) — when this file changes,
update that placeholder data (and, once Phase 2 lands, the `categories` table
seed) to match.

## Home Services (`group: home_services`)

| id | Name | Icon |
|---|---|---|
| `ac-repair` | AC Repair | ❄️ |
| `plumbing` | Plumbing | 🔧 |
| `electrical` | Electrical | 💡 |
| `cleaning` | Cleaning | 🧹 |
| `pest-control` | Pest Control | 🐜 |
| `appliance-repair` | Appliance Repair | 🛠️ |

## Healthcare (`group: healthcare`)

| id | Name | Icon |
|---|---|---|
| `clinic` | Clinics | 🏥 |
| `dentist` | Dentists | 🦷 |
| `physiotherapy` | Physiotherapists | 🧑‍⚕️ |
| `veterinary` | Veterinary | 🐾 |

## Adding a new category later

Categories are stored as flat rows with a `group` field (`home_services` |
`healthcare` today), not hard-coded per screen. To add a new group later
(e.g. Beauty, Automotive, Education) or a new category within an existing
group:

1. Add the row to `CATEGORIES` in `apps/mobile/src/lib/placeholder-data.ts` (or,
   once Phase 2 lands, insert into the real `categories` table via a migration).
2. Update the table in this file to match.
3. No screen code should need to change — `home.tsx` renders whatever is in
   `CATEGORIES`, grouped by `group`.
