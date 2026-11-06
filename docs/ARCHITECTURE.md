# Architecture

## Apps

- `apps/web` — public Next.js site (Phase 1 static content; ready to consume API)
- `apps/admin` — separate admin CMS UI
- `apps/api` — NestJS REST API + Prisma + mail/ICS
- `packages/content` — typed migrated content shared by web/api seed

## Local ports

- Web: `http://localhost:3000`
- Admin: `http://localhost:3001`
- API: `http://localhost:4000/api`
- Postgres: `localhost:5432` via `apps/api/docker-compose.yml`

## Database bootstrap

```bash
cd apps/api
docker compose up -d
pnpm prisma:generate
pnpm prisma migrate dev --name init
pnpm prisma:seed
pnpm start:dev
```

## Auth roles

- SUPER_ADMIN
- CONTENT_MANAGER
- BOOKING_MANAGER

Seeded admin: `admin@coachme-advisory.com` / `ChangeMe123!`

## Booking + notifications

- Public booking posts to `POST /api/bookings`
- Payment status defaults to `NONE`
- Capacity decremented transactionally for workshop sessions
- Confirmation email + ICS via `MailService` when SMTP env vars are set
