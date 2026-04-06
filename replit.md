# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Window Cleaning Booking App (artifacts/window-cleaning)

Finnish ikkunanpesu (window cleaning) booking system for **Siisti Pesu**.

- React + Vite frontend, TypeScript, Tailwind CSS, framer-motion
- Multi-step booking flow: window selection → date/time/contact → confirmation
- EmailJS integration for booking email notifications (VITE_EMAILJS_* env vars)
- Admin mode: tap logo 5× quickly → password "admin123" → block/unblock calendar dates
- Booked time slots + admin-blocked dates stored in **PostgreSQL** (shared across all devices)
- API calls go to `/api-server/api/bookings/...` — Vite dev proxy forwards to localhost:8080

### Database Tables (lib/db/src/schema/bookings.ts)
- `blocked_dates` — admin-blocked calendar dates (PK: date text)
- `booked_slots` — customer-booked time slots (PK: date + time_slot)
- When a booking is made at time T, slots T, T+1h, T+2h, T+3h are blocked for that date

### API Endpoints (artifacts/api-server/src/routes/bookings.ts)
- `GET  /api/bookings/blocked-dates` — list all admin-blocked dates
- `POST /api/bookings/blocked-dates/toggle` — toggle a date blocked/unblocked
- `GET  /api/bookings/booked-slots` — all booked slots grouped by date
- `POST /api/bookings/booked-slots` — block 4 slots starting from {date, startTime}

### Logo
- SP logo at `artifacts/window-cleaning/public/sp-logo.png`
- Referenced as `${import.meta.env.BASE_URL}sp-logo.png`
