# Pipeline Dashboard

Work in progress: Hiring-manager dashboard. Built in Angular, with Typescript and Tailwind and using PrimeNG components. Mocked with dummy data.

**Live demo:** [pipeline-dashboard-seven-chi.vercel.app/](https://pipeline-dashboard-seven-chi.vercel.app/)

## Current Stage

First Pass: blocking in components for responsive layout.

## Stack

- **Angular** 21.2.x
- **PrimeNG** 21.x
- **Tailwind CSS** 4 + `tailwindcss-primeui`
- **Node** 20.19+, 22.12+, or 24+ (26.2.x used in development)
- **npm** 8+ (`package-lock.json` — use npm, not yarn/pnpm)
Check `node -v` and `npm -v` against the ranges above before installing.

## Setup

**1. Clone the repo**

```bash
git clone https://github.com/SneauxGirl/pipeline-dashboard.git
cd pipeline-dashboard
```

**2. Install dependencies**

```bash
npm install
```

**3. Start the dev server**

```bash
npm start
```

**4. Open the app**

[http://localhost:4200](http://localhost:4200)

The dev server reloads when you change source files.

### Production build (optional)

```bash
npm run build
npm run serve:ssr:pip
```

Output goes to `dist/pip/`. Fonts load from Google Fonts on first visit (network required for typography).

Section components live under `src/app/sections/` and compose on `src/app/pages/dashboard/`.

## Project conventions

- PrimeNG-first UI; custom markup only when PrimeNG has no fit
- Mobile-first layout (flexbox)
- Design tokens and fonts in `src/styles.css`

## Scripts

| Command                 | Purpose                          |
| ----------------------- | -------------------------------- |
| `npm start`             | Dev server (`ng serve`)          |
| `npm test`              | Unit tests (Vitest)              |
| `npm run build`         | Production build                 |
| `npm run serve:ssr:pip` | Run SSR server after build       |

## Status

Work in progress — additional dashboard sections (KPIs, schedule, charts, etc.) are not built yet.
