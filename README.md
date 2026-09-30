# Youth League Platform (Next.js 15 · App Router · TypeScript)

| Route | Strategy |
|---|---|
| `/`, `/history`, `/rules`, `/contact` | SSG |
| `/players`, `/players/[id]`, `/fixtures` | ISR (`revalidate = 60`) |
| `/live` | SSR (`force-dynamic`) |
| `/admin` | CSR (`"use client"` + fetch to `/api/*`) |

Patterns: Repository (`repositories/`), Strategy (`StandingsStrategy`), Singleton (`lib/container.ts`), Service layer, rich domain models (`domain/`).

Run: `npm install && npm run dev`. Build check: `npm run build && npm start`.

Note: data lives in memory (resets on restart / differs per serverless instance on Vercel).
To persist, implement `LeagueRepository` with a database (Neon/Supabase/Vercel Postgres).
