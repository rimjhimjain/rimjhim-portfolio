# Portfolio — Rimjhim Jain

A single-page portfolio built around one idea: a lit **signal thread** runs the
full length of the page, drawn by scroll, and every section hangs off it.

Live sections, in order: hero, the thesis line, a pinned work reel that pans
sideways through five projects, the toolkit, the record before the job, and the
signoff.

## Stack

- **Next.js 16** (App Router, Turbopack) + React 19 + TypeScript
- **Tailwind CSS v4** for tokens; the bespoke visual treatments live in
  `src/app/globals.css`
- **Motion** for scroll-linked transforms and counters
- **Lenis** for eased scrolling
- **Archivo** (variable, 62–125% width axis) and **Newsreader**, self-hosted via
  `next/font`

## Commands

```bash
npm run dev     # dev server
npm run build   # production build
npm start       # serve the build
npm run lint    # eslint
npx tsc --noEmit  # type check
```

There is no test suite. The verification bar is `npm run lint`, `npx tsc
--noEmit` and `npm run build`, plus a look at the running page.

## Editing content

**All copy and data lives in `src/content/profile.ts`.** The components are
layout only — to change a project, a skill cluster or a figure, edit that file
and nothing else.

### Adding the portrait

1. Drop the image at `public/portrait.jpg`.
2. Set `portraitSrc = "/portrait.jpg"` in `src/content/profile.ts`.

Until then the portrait frame renders a generative spectrogram fill so the
hero composition still holds.

## Design system

The palette is a voice spectrogram, which is the subject matter: a deep
aubergine ground with a violet → magenta → amber → pale ramp as the single
accent. Tokens are defined once in the `@theme` block of
`src/app/globals.css`.

The page commits to one dark world, so there is no light theme to mirror.

## Animation

Every effect is scroll-driven or ambient; nothing hides content behind an
observer, so the page reads fully at rest. Canvas work pauses when offscreen.

`prefers-reduced-motion` is respected throughout: Lenis is skipped, the work
reel stacks vertically, canvas fields hold a still frame, SMIL animations are
not mounted, and counters render their final values.

## Layout notes

Two things that are easy to break again:

- The work reel decides horizontal vs stacked from the **viewport width alone**.
  It cannot key off the measured track width, because the track is only wide
  enough to pan once the horizontal layout is already applied.
- `body` uses `overflow-x: clip`, not `hidden`. `hidden` makes the body a scroll
  container and silently breaks the reel's sticky positioning.

## Deploying

Vercel, no configuration needed:

```bash
npx vercel
```
