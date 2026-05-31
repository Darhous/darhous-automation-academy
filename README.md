# Darhous Automation Academy

أكاديمية درهوس للأتمتة الذكية

منصة عربية مستقلة لتعلم الأتمتة، تصميمها، بنائها، واستخدامها كخدمة. الإصدار الحالي هو v2 من المنتج، ويجمع بين التعلم المنظم، سوق القوالب، مولد الخطط، Automation Design Agent، Workflow Builder، Labs، Tools Hub، Dashboard، وAdmin foundation.

## Purpose

المنصة مبنية كمنتج standalone اليوم، لكنها مهيأة معماريًا للاندماج لاحقًا داخل Darhous Smart Learning Ecosystem مع الحساب الموحد، لوحة التحكم المشتركة، وسجل التعلّم والشهادات.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Structured typed content under `src/data`
- Browser-safe `localStorage` demo state

## Main Routes

- `/` homepage product experience
- `/automation-agent` Automation Design Agent
- `/paths` learning paths and lesson preview
- `/templates` automation template marketplace
- `/generator` automation plan generator
- `/builder` workflow planning lab
- `/labs` practical automation labs
- `/services` automation services and consultation form
- `/tools` tools hub with calculators and advisors
- `/dashboard` user dashboard
- `/admin` admin foundation
- `/auth/login`
- `/auth/register`
- `/integrations`
- `/coming-soon`
- `/about`
- `/contact`

## Core Features

- Arabic-first RTL premium dark UI
- Rich content system for learning paths, lessons, tools, templates, recipes, use cases, case studies, glossary, prompts, and checklists
- Automation Design Agent with multi-step wizard and deterministic blueprint generation
- Tools Hub with:
  - ROI calculator
  - workflow complexity estimator
  - stack advisor
  - webhook explainer
  - checklist generator
  - client proposal generator
- Templates marketplace with search, category filters, difficulty, department, access level, and implementation plan copy
- Generator producing workflow summary, setup steps, risks, and prompts for `n8n`, `Make`, `Zapier`, and `Python`
- Builder lab with sample workflows, node library, explain panel, logs, and test actions
- Practical labs with objectives, steps, expected outputs, mistakes, challenge tasks, and completion checklists
- Service request flow saved locally and surfaced in `/dashboard` and `/admin`

## Project Structure

- `src/data/*` content, templates, tools, labs, prompts, services, and comparisons
- `src/types/index.ts` shared platform domain types
- `src/lib/generator.ts` deterministic workflow plan generator
- `src/lib/automation-agent.ts` local rule-based blueprint engine
- `src/lib/storage.ts` local demo state helpers
- `src/config/integration.ts` future Darhous ecosystem integration placeholders
- `src/components/*` reusable layout, cards, and client surfaces

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

Browser-only local state is used for harmless demo interactions:

- Saved templates: `darhous.savedTemplates`
- Generated workflows: `darhous.generatedWorkflows`
- Saved blueprints: `darhous.savedBlueprints`
- Service requests: `darhous.serviceRequests`

No secrets or private keys are stored in the frontend.

## Future Darhous Integration

The product is standalone today, but ready for later integration with Darhous Smart Learning Ecosystem through:

- shared SSO placeholder
- shared user profile source
- shared dashboard widgets
- shared certificates
- shared portal registry
- future Supabase or backend service layer

See `src/config/integration.ts`.

## Author

designed by Ahmed Darhous
