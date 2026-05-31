# Darhous Automation Academy

أكاديمية درهوس للأتمتة الذكية

منصة عربية مستقلة لتعلم الأتمتة، استكشاف القوالب، تجربة مولد workflows، معاينة builder، تشغيل مختبرات عملية، وإدارة طلبات الخدمات داخل تجربة SaaS / EdTech جاهزة للمراجعة.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Local static data modules
- localStorage for safe demo state

## Main Routes

- `/` homepage product experience
- `/paths` learning paths
- `/templates` automation template marketplace
- `/generator` AI automation generator
- `/builder` workflow builder preview
- `/labs` automation labs
- `/services` business automation services
- `/tools` tools explorer
- `/dashboard` user dashboard
- `/admin` admin dashboard foundation
- `/auth/login`
- `/auth/register`
- `/integrations`
- `/coming-soon`
- `/about`
- `/contact`

## Features

- Arabic-first RTL premium dark UI
- Shared typed data layer under `src/data`
- Template filtering and preview
- Tool search and client-side filtering
- Deterministic mock AI workflow generation
- Saving generated workflows to `localStorage`
- Saving templates to `localStorage`
- Service request form saved to `localStorage`
- Dashboard reading saved templates, generated workflows, and service requests
- Admin foundation reviewing saved workflows and service requests
- Builder preview with selectable nodes, add node, run test, reset canvas, and logs

## Project Structure

- `src/data/*` content and mock configuration
- `src/types/index.ts` shared platform types
- `src/lib/generator.ts` deterministic workflow generation
- `src/lib/storage.ts` local demo state helpers
- `src/config/integration.ts` future Darhous ecosystem integration placeholders
- `src/components/*` reusable UI, cards, layout, and feature surfaces

## Install

```bash
npm install
```

## Run Dev

```bash
npm run dev
```

## Typecheck

```bash
npm run typecheck
```

## Lint

```bash
npm run lint
```

## Build

```bash
npm run build
```

## Demo State

- Saved templates use `darhous.savedTemplates`
- Generated workflows use `darhous.generatedWorkflows`
- Service requests use `darhous.serviceRequests`

All three are browser-only demo state stores and contain no secrets.

## Future Darhous Integration

The platform is standalone today, but the codebase is prepared for later integration with Darhous Smart Learning Ecosystem through:

- shared SSO placeholder
- shared user profile layer
- shared dashboard widgets
- shared certificates
- shared portal registry
- future Supabase or backend service integration

See `src/config/integration.ts`.

## Author

designed by Ahmed Darhous
