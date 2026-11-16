# Portfolio case studies and motion design

## Intent

Make Rimjhim's recent product engineering work easier for hiring teams to discover and understand. The portfolio already has a visual editorial identity and detailed AI/backend case studies. Its platform case study currently compresses SMS workflows, Stripe billing, and Do Not Call Register screening into one paragraph.

## Goals

- Add focused case studies for SMS automation, Stripe billing, and Australian DNCR screening.
- Use concrete, readable copy based on the local `genius365-platform` history and code. Do not add unsupported metrics, public links, or claims of ownership beyond the user's existing portfolio copy.
- Add one distinct, lightweight diagram animation for each case study.
- Preserve the portfolio's original near-black, ivory, yellow, red, and blue palette.
- Replace square project frames with open, varied diagram stages that give each case study more space and depth.
- Replace the footer hand illustration and large pill button with a custom interactive WebGL sculpture and a clear text-led contact action.
- Keep animations decorative, accessible, and disabled for reduced-motion preferences.

## Non-goals

- Rebuilding the page or adopting the reference portfolio's recruiter chat, branding, layout, or copy.
- Deployment or speculative links to private work.
- Copying the reference site's palette or reusing its visual assets.
- Replacing existing case studies or inventing impact metrics.

## Approaches

1. Keep the platform case broad: minimal work, but recent systems remain hard to spot.
2. Add three focused case studies and matching diagrams: recommended because it surfaces the work without replacing the existing portfolio.
3. Split every subsystem into separate cards: too much case-study length for the information currently available.

## Design

Extend the existing `WorkPanel`/`VizKind` registry with three entries and three inline SVG diagrams. SMS depicts a campaign moving through audience selection, AI reply preparation, and conversation outcomes. Stripe depicts test/live key selection, encrypted configuration, and runtime price synchronization. DNCR depicts CSV number screening and clear/held/invalid outcomes. Use CSS keyframes for a message progression, key-state transition, and register scan. Keep diagrams legible without motion, with SVG accessible names; use the existing reduced-motion behavior to stop animation.

The existing colors stay authoritative: near-black #11110F, ivory #EAE8E2, yellow #F3D735, red #ED513F, and blue #819EBB. Refresh the hero claim and project section introduction with concise, distinctive lines that describe the engineer's work without slogans or unsupported claims.

Replace uniform rectangular case-study frames with open, asymmetrical diagram compositions: no heavy card borders, layered atmospheric color, varied visual scale, and restrained perspective on hover. Keep the data and copy easy to scan. Build custom WebGL footer artwork from real 3D geometry: a lit, rotating knot with orbiting rings and connected nodes, responsive to pointer movement. Draw it on a transparent canvas with no added 3D dependency; render a static frame under reduced motion and a CSS fallback if WebGL is unavailable. The footer uses a text-led contact action instead of the hand illustration and oversized pill.

## Constraints

- Work within the current Next.js 16, React 19, TypeScript, GSAP, and global CSS setup.
- Preserve all existing uncommitted user changes.
- Do not add dependencies or public project links.
- Honor reduced motion and keep the new diagrams meaningful when static.
- Keep WebGL local, render it statically for reduced motion, and provide a CSS fallback if WebGL cannot initialize.

## Open decisions

None. The user approved this direction and supplied `/Users/rimjhimjain/vishalli-ai-portfolio` as the design reference.
