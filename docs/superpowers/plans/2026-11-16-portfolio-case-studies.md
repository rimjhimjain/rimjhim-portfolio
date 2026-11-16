# Portfolio case studies Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Surface recent SMS, Stripe, and DNCR work with three diagrams, open editorial compositions, and an interactive 3D footer sculpture, while restoring the original palette.

**Architecture:** Keep the data-driven case-study list and registry. Add three SVG case-study diagrams and one dependency-free WebGL footer scene. Replace repeated visual frames with open, varied compositions; keep the original palette tokens.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS, SVG, existing GSAP/reduced-motion setup.

**Spec:** `docs/superpowers/specs/2026-11-16-portfolio-case-studies-design.md`

## Global Constraints

- Preserve all existing uncommitted user changes.
- Use only facts supported by existing portfolio content or local project history.
- Add no public project link or unsupported metric.
- Keep case-study diagrams legible without animation and disable motion for reduced-motion preferences.
- Keep existing case studies and responsive layout intact.
- Use a static WebGL frame for reduced motion and a CSS fallback if WebGL cannot initialize.

## Review Focus

- A diagram may communicate a step only through motion; retain a clear static state and accessible SVG label.
- Reduced-motion users may still see CSS or WebGL animation; stop both CSS keyframes and the render loop.
- The 3D context can fail or be lost; retain a CSS fallback and clean up WebGL resources on unmount.
- The work array's captions are index-based; add matching captions for every new case.
- Long project copy may overcrowd mobile case studies; keep summary copy short and detailed notes progressive.

---

### Task 1: Add focused, source-backed case studies

**Files:**
- Modify: `src/content/profile.ts`
- Modify: `src/components/WorkReel.tsx`

**Interfaces:**
- Produces: three `WorkPanel` records for `sms`, `billing`, and `dncr`, with matching IDs, concise summaries, implementation notes, and tooling labels.

- [x] Add the three `VizKind` values and case records. Describe SMS reply preparation, conversation state, and workflow outcomes; describe encrypted Stripe key-set switching and runtime price sync; describe visible DNCR check outcomes and held numbers. Keep unverified impact out.
- [x] Add one short caption per new record to `WorkReel` in matching order.

### Task 2: Draw three specific system diagrams

**Files:**
- Create: `src/components/viz/SmsViz.tsx`
- Create: `src/components/viz/BillingViz.tsx`
- Create: `src/components/viz/DncrViz.tsx`
- Modify: `src/components/viz/index.tsx`

**Interfaces:**
- Produces: `SmsViz`, `BillingViz`, and `DncrViz`, each rendering a static-first accessible SVG inside the established `.viz` container.

- [x] Draw the SMS path from campaign and selected sender into AI reply preparation, then into conversation outcome; animate one message marker through the path.
- [x] Draw an encrypted Stripe configuration with test/live selection and runtime price sync; animate the active environment indicator.
- [x] Draw a CSV screening list with clear, held, and invalid results; animate a screening sweep across rows.
- [x] Register all three components in `Viz`'s `REGISTRY`.

### Task 3: Tune copy, color, and motion

**Files:**
- Modify: `src/content/profile.ts`
- Modify: `src/components/Hero.tsx`
- Modify: `src/app/globals.css`

- [x] Replace the broad hero tagline and case-study introduction with distinctive, specific copy that reads cleanly on desktop and mobile.
- [x] Preserve the existing near-black, ivory, yellow, red, and blue palette.
- [x] Add scoped keyframes for the three new diagrams and stop them within `@media (prefers-reduced-motion: reduce)`.
- [x] Keep the current page sections, image choices, and case-study ordering otherwise intact.

### Task 4: Review the resulting changes

**Files:**
- Review: all files above

- [x] Inspect the complete diff for unrelated changes and unsupported claims.
- [x] Confirm every `VizKind` is registered and every case caption matches the case array.
- [x] Confirm new animation selectors have reduced-motion fallbacks and static SVG states remain understandable.
- [x] Run `npm run lint`, `npx tsc --noEmit`, and `git diff --check`.

Final review found captions were tied to list position; they now use `VizKind` keys so case ordering cannot detach a caption from its diagram.

### Task 5: Replace footer hand with interactive WebGL artwork

**Files:**
- Create: `src/components/SignalObject.tsx`
- Modify: `src/components/Signoff.tsx`
- Modify: `src/app/globals.css`

- [x] Render real 3D knot, orbit rings, and nodes in WebGL; support pointer-driven orientation, visibility-aware rendering, static reduced-motion output, and a fallback when WebGL is unavailable or lost.
- [x] Replace the hand and oversized button with a two-column editorial footer, scene captions, and an accessible contact action that keeps the existing dialog behavior.
- [x] Remove unused footer-only motion logic and update desktop/mobile styles.

### Task 6: Open up project visuals and restore the original palette

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/viz/SmsViz.tsx`
- Modify: `src/components/viz/BillingViz.tsx`
- Modify: `src/components/viz/DncrViz.tsx`
- Modify: `README.md`

- [x] Restore the original `#11110F`, `#EAE8E2`, `#F3D735`, `#ED513F`, and `#819EBB` palette everywhere.
- [x] Replace square bordered project panels with open, varied, layered diagram stages and restrained perspective interaction.
- [x] Update the README to describe the original palette, open case-study layout, and 3D footer scene.
- [x] Run lint, TypeScript, and diff checks after component and layout changes.

Final review confirmed the footer renders real 3D geometry in WebGL. Context loss switches to the CSS fallback and terminates the render loop, including after a later context restoration. The tablet viewport review also identified edge clipping during rotation; the projection scale is reduced to leave a consistent margin.
