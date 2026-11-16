# Rimjhim Jain's portfolio

A cinematic editorial portfolio with five chapters: the subject, engineering case studies, toolkit, experience and achievements, and collaboration.

## Run

```bash
npm install
npm run dev
npm run lint
npx tsc --noEmit
npm run build
npm start
```

The app uses Next.js 16, React 19, TypeScript and Tailwind 4. Archivo and Newsreader are served by `next/font`; a fresh build needs access to Google Fonts.

## Content and assets

- `src/content/profile.ts`: identity, contact destinations, project summaries and full engineering notes, skill groups, education and achievements. The current resume supplies the hero summary and skills. The education, certification, language, and LeetCode details remain from the existing portfolio, as requested.
- `public/Rimjhim_Jain_Resume.pdf`: the supplied resume, available from the record section and contact overlay.
- `public/images/rimjhim-portrait.webp`: the supplied seated, forward-facing portrait.
- `public/images/rimjhim-about.webp`: the supplied seated portrait used in the record section.
- `src/components/Hero.tsx`, `Proof.tsx` and `Signoff.tsx`: section introductions and presentation copy.

No required contact configuration remains. Email, telephone, LinkedIn and GitHub come from the resume. Individual project live/repository URLs were not supplied, so the case studies do not expose speculative links. Add only verified destinations if those projects become public. Illustrations describe architecture; the stock chart is illustrative data, not live market data.

## Motion and interactions

GSAP with `@gsap/react` and ScrollTrigger handles the opening sequence, portrait parallax, workbench entrances and chapter reveals. Scoped contexts and media queries revert animations on unmount and when reduced motion changes.

The existing `motion/react` package, the current Framer Motion distribution, handles navigation feedback, button hover/tap and tilt, and the contact panel. GSAP owns entrance wrappers; Motion owns their interactive children. Native page scrolling keeps anchor navigation and modal scroll locking predictable.

`Flashlight` is a reusable content-mask component. The header switch turns it on. `radius` and `darkness` props control the feathered beam. Pointer movement and touch taps update CSS coordinates through one pending animation frame, with no per-event React state updates. The effect defaults to full visibility, keeps essential copy outside the mask, and disables on reduced motion or devices reporting two or fewer logical processors. All lights can be restored with the keyboard-accessible switch.

The contact overlay uses a native modal dialog with explicit focus cycling, Escape and visible close controls, background scroll locking and trigger focus restoration. The project CTA opens an email draft; there is no form backend.

## Design

Tokens and responsive rules are in `src/app/globals.css`. Near-black and ivory form the base; yellow, red, and blue mark annotations and diagram stages. Archivo display, Newsreader prose, and system mono annotations. The portrait-led opening and five navigable chapters frame seven case studies, including SMS automation and runtime Stripe configuration. The workbench presents seven illustrated projects in an asymmetric layout, with native dialogs for detailed engineering notes. Dedicated styles live in `src/app/workbench.css`. Project covers use perspective, message, orbit, and chart interactions on hover, and a dependency-free WebGL sculpture closes the page. Motion respects reduced-motion preferences. The portrait remains the actual supplied photograph, without generated identity changes.

See `docs/implementation-plan.md` for the original audit and plan, and `docs/validation.md` for validation results.
