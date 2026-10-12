# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # Start development server
npm run build            # Build for production (static export to /out)
npm run test             # Run tests
npm run test:coverage    # Run tests with coverage
npm run eslint:check     # Check linting
npm run eslint:fix       # Auto-fix lint issues
npm run prettier:check   # Check formatting
npm run prettier:fix     # Auto-fix formatting
```

Run a single test file: `npx jest components/hero/Hero.test.tsx`

**Package manager**: npm (`npm run dev|build|test`). Node version pinned in `.nvmrc`.

## Stack & Dependencies

- **Next.js 16** (Pages Router) + **React 19** + **TypeScript 5.9**
- **next-seo 6** — SEO meta/OpenGraph
- **dayjs 1.11** — date formatting utilities (role durations)
- **Sass** — SASS modules per component + global variables/theme
- **Hanken Grotesk** via `next/font/google` (self-hosted at build), applied in `_app.tsx`

No animation library: the redesign removed framer-motion deliberately.

## Architecture

**Build output**: Static HTML via `output: 'export'` in `next.config.js` → `/out/`. No server runtime, no API routes. `images.unoptimized: true` since there's no image optimization server.

**Single quiet page**: As of the "business card" redesign, `pages/index.tsx` is one short recruiter-friendly page rendered top to bottom: `Hero` (photo, name, title, location, one-sentence lead) → `Now` (two narrative paragraphs + contact links row) → `Projects` (featured cards + compact list) → `Awards` (collapsible `<details>` rows) → `Education` (one row) → `Stack` (text rows). Awards are deliberately not linked to projects. There is no navigation menu and no section anchors — the page is short by design. Only `index.tsx`, `404.tsx`, `_app.tsx`, `_document.tsx` exist under `/pages/`.

**Design intent** (do not regress): the page is deliberately quiet. No GitHub activity widgets, no animated counters, no skill percentage bars, no tag clouds, no age/birthDate anywhere. Numbers on the page must be about work (years, coverage %, scale), never vanity metrics. One accent color (amber `--highlight-color`), used sparingly: badges, link hovers.

**Data**: `DataProvider` (`utils/DataProvider.tsx`) wraps the app in `_app.tsx`; reads `/public/data.json` at build time, exposed via `useSiteData()`. Types are inferred from the JSON itself (`typeof data`).

**Email obfuscation**: the address never appears as plain text in HTML, JSON, or the static export. `data.json` stores it as reversed `[user, domain]` parts (`emailParts`); `utils/email.ts` (`buildEmail`) assembles it in the browser on click. Keep it that way.

**vCard**: `utils/vcard.ts` (`downloadVCard`) builds a .vcf on the client (name, title, email, links, photo from `/public/avatar-vcard.jpg`) — the "Save contact" button in `Now`.

**Resume**: "Resume (PDF)" links to `resumeUrl` in data.json (`/public/shrey-singh-resume.pdf`). Replace that file to update it.

**Theming**: `ThemeProvider` (`utils/ThemeProvider.tsx`) manages a dark/light toggle, persisted via `data-theme` attribute on `<html>` and `localStorage`; an inline script in `_document.tsx` stamps `data-theme` before hydration (no flash). Both palettes are CSS custom properties in `/styles/theme.css` (`:root` = dark defaults, `[data-theme='light']` = overrides). Container width: `640px`.

**SEO / sharing**: `_document.tsx` embeds JSON-LD `Person` (name, title, links, `knowsAbout` from stack). `pages/index.tsx` sets OpenGraph from `siteUrl` with `/public/og-image.png` (1200×630: photo + name + title) — regenerate it if the name/title/photo changes.

**Components** (`/components/`): Feature-based directories, barrel-exported from `components/index.ts`. Each folder has: `Component.tsx`, `Component.test.tsx`, `styles.module.sass`, `index.ts`, optionally `utils.tsx` (+ test).

**Styling**: SASS modules per component; global theme in `/styles/theme.css`; global reset + shared classes (`.textLink`, `.sectionLabel`, `.skipLink`, `.page404`, print rules) in `/styles/globals.sass`; breakpoint variable in `/styles/variables.sass` (mobile: 768px).

## Component Inventory

| Component     | Purpose                                                                                                                                                         |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Hero`        | Photo (80px), name, title, location/timezone, one-sentence lead                                                                                                 |
| `Now`         | Narrative bio paragraphs (with `**bold**` markers via `renderBold`), contact links row, email reveal + copy, Resume (print), Save contact (vCard)               |
| `Projects`    | Featured cards (favicon icons from `/public/images/icons/`, wide cards for The Dead Zone/JanSamadhan, sub-project pills) + compact list rows + "More on GitHub" |
| `Awards`      | Collapsible `<details>` rows: title · organiser, Winner/Finalist badge, year, bullets; first row open by default                                                |
| `Education`   | Single row: school · degree, period                                                                                                                             |
| `Stack`       | Text rows (Languages / Web / AI / Data & geo / Tooling), no percentages                                                                                         |
| `ThemeToggle` | Fixed sun/moon button, top-right corner                                                                                                                         |
| `Footer`      | footer line from data.json, "Say hi" (mailto), copyright, design credit                                                                                         |
| `Icon`        | SVG icon switch (github, telegram, linkedin, web, social, left, right, sun, moon)                                                                               |

## Special Cases

- `Awards` `<details>` open state is controlled via a `Set<number>` synced in `onToggle` (index 0 open initially).
- `_app.tsx` hides `Footer` on 404. No analytics are loaded.
- `tests/jest.setup.tsx` mocks `next/image` (static imports become `static-import.png`) and `next/link`.
- Only link public repos from data.json (several of Shrey's repos are private).

## data.json Structure

```
siteUrl         — canonical URL used for OG image, JSON-LD, vCard (update when the domain changes; also robots.txt/sitemap.xml)
resumeUrl       — path to the PDF resume in /public
biography       — name, title, location, timezone, lead, now[] (paragraphs, **bold** markers), footer
emailParts      — [user, domain], each reversed (see Email obfuscation above)
contactLinks[]  — icon, label, link (GitHub, LinkedIn)
projects        — featured[{ title, icon, link, wide?, description, stack, parts?[] }], more[{ title, icon?, link, description }]
awards[]        — title, org, badge (Winner/Finalist), year, bullets[]
education       — degree, school, period
stack[]         — group, items (comma-separated string)
seo             — title, description
```

Project `icon` values: `/images/icons/*.png|svg` render as images; `"telegram"` renders the Telegram icon; absent → GitHub icon.

## Code Conventions

- **Prettier**: 4-space indent, single quotes, 120 char line width, trailing commas off, one JSX attribute per line
- **Path alias**: `@/` maps to the project root
- **Tests**: RTL + Jest; components that use `useSiteData()` must be wrapped in `DataProvider`; assertions against `data.json` values, no snapshots
- Coverage collected from `/components/` only (excludes `.d.ts`, `.test.tsx`, `index.ts`, `types.ts`, `constants.ts`)
- ESLint: `simple-import-sort`, `react`, `react-hooks`, `jest`, `prettier`
- Design adapted from miksrv/miksoft.pro (MIT); keep the credit in the footer and LICENSE.
