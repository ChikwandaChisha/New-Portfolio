# Portfolio Website

This repository contains a Vite + React + TypeScript portfolio site for showcasing personal projects. The app uses a single-page layout with animated sections and in-app case-study pages for individual projects.

## What the app includes

- A landing experience with hero, about, experience, projects, contact, and footer sections
- Project cards that link to detailed case studies inside the same app
- Expandable image galleries for project walkthroughs
- Theme support and animated transitions powered by Framer Motion and Tailwind CSS

## Featured projects

The portfolio currently highlights these projects in the project section and case-study content:

- Arbitra
- CryptNote
- Search Engine
- Swahili Toxicity Detection
- SoundSwipe

## Tech stack

- React 19
- TypeScript
- Vite 7
- Tailwind CSS
- Framer Motion
- Radix UI primitives
- Lucide icons

## Project structure

```text
.
├── public/                # Static assets and project screenshots
├── src/
│   ├── components/        # Shared UI and animation components
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utility helpers
│   ├── sections/          # Page sections and case-study content
│   └── utils/             # Scroll and routing helpers
├── index.html
├── package.json
└── vite.config.ts
```

## Development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

## Build

Create a production build:

```bash
npm run build
```

## Notes

- The app uses hash-based routing for project detail views, handled in the main app component and the project detail section.
- Project-specific case-study content lives in the section files under src/sections.
- The CryptNote screenshots are stored under public/cryptnote.
