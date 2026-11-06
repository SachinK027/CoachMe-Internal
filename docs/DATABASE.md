# Database setup

PostgreSQL is required for Phase 2/3 persistence. Docker Desktop was not available in the build environment, so the schema is committed and ready to apply locally.

## Start Postgres

Option A — Docker:

```bash
cd apps/api
docker compose up -d
```

Option B — Local Postgres 16 with database `coachme`, user/password matching `.env`.

## Apply schema + seed

```bash
pnpm --filter api prisma:generate
pnpm --filter api exec prisma migrate dev --name init
pnpm --filter api prisma:seed
```

Seed imports services, workshops, blog posts and site settings from `@coachme/content`, creates RBAC roles/permissions, and a Super Admin:

- Email: `admin@coachme-advisory.com`
- Password: `ChangeMe123!`

## Notes

- Public API endpoints fall back to static content when the DB is offline.
- Booking create still attempts email/ICS and returns a demo fallback payload if Postgres is unavailable.
- Availability model C tables are included: `AvailabilityRule`, `AvailabilityException`, `BookableSlot`.
