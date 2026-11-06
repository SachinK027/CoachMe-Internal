# CoachME Advisory

Premium redesign of the CoachME Advisory website with a separate Admin CMS and NestJS API.

The live Wix site remains the client-facing demo until cutover. This monorepo runs locally.

## Stack

- `apps/web` — Next.js public website (static content Phase 1)
- `apps/admin` — Admin CMS UI (`http://localhost:3001`)
- `apps/api` — NestJS API + Prisma + email/ICS (`http://localhost:4000/api`)
- `packages/content` — Migrated business content from the live site
- PostgreSQL — schema + seed ready (see `docs/DATABASE.md`)

## Quick start (public site)

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Admin + API

```bash
# Terminal 1 — API (after Postgres is available)
pnpm --filter api start:dev

# Terminal 2 — Admin
pnpm --filter admin dev
```

Default seeded admin (after `pnpm --filter api prisma:seed`):

- Email: `admin@coachme-advisory.com`
- Password: `ChangeMe123!`

## Design system

- Forest `#263F38`, Ivory `#F5F1E9`, Champagne `#D9BFA6`, Sage `#A8B7A6`, Charcoal `#252B29`
- Display: Fraunces · UI/body: Manrope
- Editorial layouts — not a Wix clone

## Booking

- Enhanced month/week calendar
- No online payment
- Tries API first; falls back to browser `localStorage` demo mode
- Email + ICS implemented in API `MailService` when SMTP is configured

## Docs

- [Content inventory](docs/CONTENT_INVENTORY.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Database](docs/DATABASE.md)
