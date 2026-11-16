# Editorial portfolio redesign

## Audit
- Next.js 16 App Router, React 19, TypeScript, Tailwind 4, Motion 13, Lenis.
- One route, `/`. Existing profile data, five project diagrams, skill groups, achievement figures and direct contact links.
- No API or form submission backend. Portrait was a configuration placeholder.
- Initial source of truth: October 14 resume and existing `src/content/profile.ts`. On October 29, the user supplied an updated resume and kept select existing profile details by request. Supplied October 28 portraits are original assets; reference hero is visual inspiration only.
- Preserve all five projects and their diagrams. No public project repository or live links are provided; do not invent them.

## Design
Near-black #11110F, ivory #EAE8E2, yellow #F3D735, red #ED513F, blue #819EBB. Archivo display, Newsreader prose, system mono annotations. A portrait-led opening and five navigable chapters, staggered case-study compositions, an ivory collaboration interlude. Keep the real photo intact, cropped in CSS. No synthetic portrait.

## Implementation
1. Optimize supplied portraits, copy resume, correct profile role and experience dates.
2. Add GSAP and scoped ScrollTrigger animations; retain Motion for interactive UI. Use native scrolling for anchor and dialog compatibility.
3. Build a reusable mask-based flashlight with pointer-event animation frames, touch support, all-content fallback, and reduced-motion/device capability checks.
4. Build hero, chapter navigation, editorial cases, grouped toolkit and record using current content.
5. Build inline SVG pulling hand, individual animated strings, glossy Motion button, native modal dialog with focus restoration and real contacts.
6. Run ESLint, TypeScript, production build, browser checks at desktop/tablet/mobile widths and reduced motion. Check links against resume and report external reachability separately.
