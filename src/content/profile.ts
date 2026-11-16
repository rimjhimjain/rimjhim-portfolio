/** Resume-backed facts and existing project descriptions. */

export const profile = {
  firstName: "Rimjhim",
  lastName: "Jain",
  role: "Software engineer / Python, backend and AI systems",
  summary:
    "I build the backend, workflows, and product infrastructure that make AI useful in the moments that matter. " +
    "At Inspra.ai, my work spans voice systems, SMS automation, billing, and the infrastructure behind reliable outreach.",
  claim: {
    lead: "Good AI needs good systems.",
    turn: "I build the parts that make it work.",
  },
} as const;

export const links = {
  email: "rimjhim2973@gmail.com",
  phone: "+91 89799 77357",
  phoneHref: "tel:+918979977357",
  github: "https://github.com/rimjhimjain",
  githubLabel: "github.com/rimjhimjain",
  linkedin: "https://www.linkedin.com/in/rimjhimjain29/",
  linkedinLabel: "linkedin.com/in/rimjhimjain29",
} as const;

/** Optimized from the portrait supplied for this portfolio. */
export const portraitSrc: string | null = "/images/rimjhim-portrait.webp";
export const portraitAlt = "Rimjhim Jain";

export type VizKind =
  | "cascade"
  | "loop"
  | "pipeline"
  | "platform"
  | "ticker"
  | "sms"
  | "billing";

export type WorkPanel = {
  id: string;
  viz: VizKind;
  meta: string;
  title: string;
  body: string;
  tools: string;
  notes: string;
};

export const work: WorkPanel[] = [
  {
    id: "disposition",
    viz: "cascade",
    meta: "Inspra.ai / July 2025 to present",
    title: "Self-Learning Disposition Engine",
    body: "Call outcomes need reliable classification. I built a Python and FastAPI engine that combines deterministic rules, embedding retrieval and LLM inference, resolving most calls without a model call.",
    notes:
      "Labels the outcome of every call the platform places. Deterministic signals settle most of them with no " +
      "model in the loop at all. Embedding recall matches what human reviewers have already corrected. Only what " +
      "survives both reaches a single structured LLM call, with a stronger second-pass reasoning agent waiting " +
      "behind it. Reviewers feed corrections back in, and the engine keeps them.",
    tools: "Python, FastAPI, embeddings, OpenRouter",
  },
  {
    id: "learning-loop",
    viz: "loop",
    meta: "Inspra.ai / July 2025 to present",
    title: "Agentic Learning Loop",
    body: "A reviewer correction should improve the next decision. I built an evaluation loop that turns corrections into guidelines, tests them against a golden set, and deploys only when a prior error is fixed with zero regressions on that set.",
    notes:
      "Reviewer corrections don’t just get stored, they get promoted. An LLM turns each one into a classification " +
      "guideline, and every candidate is backtested against a golden set before it goes anywhere: it has to fix at " +
      "least one prior error and regress zero, or it doesn’t deploy. The ones that pass deploy themselves, and " +
      "per-workspace confidence thresholds tune from how often reviewers agree.",
    tools: "LLM evaluation, prompt engineering, automated backtesting",
  },
  {
    id: "post-call",
    viz: "pipeline",
    meta: "Inspra.ai / July 2025 to present",
    title: "Post-Call Pipeline",
    body: "Every completed call triggers several independent jobs. I built a Haskell service that routes voice-provider webhooks through Redis workers for outcomes, sentiment and voicemail, packaged in one Docker image.",
    notes:
      "A Haskell service that takes VAPI, Retell and Elk webhooks and fans every finished call out to independent " +
      "disposition, sentiment and voicemail workers over Redis queues. Voicemail gets settled from provider " +
      "metadata and callee-side greeting patterns, so those calls never reach a model and can never come back " +
      "labelled “not interested.” Everything persists to Supabase and syncs to GoHighLevel. It ships as one Docker " +
      "image running three roles.",
    tools: "Haskell, Servant/Warp, Redis, Supabase, Docker",
  },
  {
    id: "platform",
    viz: "platform",
    meta: "Inspra.ai / July 2025 to present",
    title: "The voice-agent workspace",
    body: "An AI voice platform needs a product people can operate. I built the multi-tenant workspace and agency console, including onboarding, campaigns, usage-credit billing and a visual automation builder.",
    notes:
      "The workspace application and agency admin console, end to end: self-serve signup and onboarding, outbound " +
      "call and SMS campaigns, Stripe billing with credits and auto top-up, telephony and carrier management, and a " +
      "visual automation-flow builder. I designed the core schema and its migration history in Prisma and Postgres, " +
      "and built the REST surface across the workspace, agency, webhook and cron namespaces, plus a standalone " +
      "public API in FastAPI with async SQLAlchemy, rate limiting and generated OpenAPI docs. Vitest suites behind " +
      "all of it.",
    tools: "Next.js, TypeScript, React, Prisma, PostgreSQL, Stripe, Vitest",
  },
  {
    id: "sms-automation",
    viz: "sms",
    meta: "Inspra.ai / November 2026",
    title: "More than a send button.",
    body: "I built SMS campaign workflows that carry a conversation past the first reply, with AI preparation, sender selection, and clear outcomes for each contact.",
    notes:
      "The campaign flow handles sender choice before contact upload, duplicate conversations, received-message " +
      "visibility, and contacts that are already busy in another conversation. AI replies use structured output, " +
      "prepare independent context in parallel, and can draw on knowledge-base documents. Workflow status makes " +
      "the result of an upload visible, while opt-out footer behavior can be chosen per template.",
    tools: "Next.js, TypeScript, SMS workflows, AI conversations",
  },
  {
    id: "stripe-billing",
    viz: "billing",
    meta: "Inspra.ai / November 2026",
    title: "Keys change. The product keeps running.",
    body: "I built runtime Stripe account switching in Super Admin, so teams can manage test and live credentials without a redeploy.",
    notes:
      "Stripe test and live key sets are stored encrypted and selected from Super Admin. Switching the active " +
      "set re-syncs plan prices and surfaces subscriptions or Connect-linked agencies created under the previous " +
      "keys. Stripe.js reads its publishable key at runtime, while environment configuration remains the fallback.",
    tools: "Stripe, Next.js, TypeScript, encrypted configuration",
  },
  {
    id: "stock-tracker",
    viz: "ticker",
    meta: "Mphasis / February to May 2025",
    title: "Realtime Stock Tracker",
    body: "Market data changes while the screen is open. During my Mphasis internship, I built a stock-market tracker with Angular and .NET Core, streaming price updates to the frontend over WebSockets.",
    notes:
      "My internship build: a live market-data tracker on .NET Core and Angular, streaming price updates straight " +
      "to the UI over WebSockets. I designed the REST layer between the frontend and backend and shipped it inside " +
      "an Agile team, with code review and version control — the first place I learned what “done” actually means.",
    tools: ".NET Core, Angular, WebSockets, REST",
  },
];

/** Skills and systems described in the current resume. */
export const toolkit: { name: string; items: string[] }[] = [
  {
    name: "Languages",
    items: [
      "Python",
      "TypeScript",
      "JavaScript",
      "Haskell",
      "Go",
      "Java",
      "SQL",
      "C++",
    ],
  },
  {
    name: "AI and evaluation",
    items: [
      "Agentic workflows",
      "LLM evaluation",
      "Prompt engineering",
      "Embeddings",
      "OpenRouter",
      "Anthropic SDK",
    ],
  },
  {
    name: "Backend and APIs",
    items: [
      "FastAPI",
      "Servant/Warp",
      "Node.js",
      "Express",
      ".NET Core",
      "REST",
      "OpenAPI",
      "SQLAlchemy",
    ],
  },
  {
    name: "Frontend and realtime",
    items: ["Angular", "React", "Next.js", "WebSockets"],
  },
  {
    name: "Databases and processing",
    items: [
      "PostgreSQL",
      "Redis",
      "MongoDB",
      "MySQL",
      "Prisma",
      "Supabase",
      "Firebase",
      "Async workers",
      "Caching",
      "Webhook processing",
    ],
  },
  {
    name: "Voice and integrations",
    items: ["VAPI", "Retell", "Elk", "GoHighLevel"],
  },
  {
    name: "Delivery and quality",
    items: [
      "Docker",
      "Git",
      "Pytest",
      "Vitest",
      "Vercel",
      "Regression testing",
      "Code review",
      "Agile",
    ],
  },
];

export const proof: {
  value: number;
  decimals: number;
  unit: string;
  note: string;
}[] = [
  {
    value: 1,
    decimals: 0,
    unit: "st",
    note: "Hack The Mountain 4.0, Cyber City, Gurgaon",
  },
  {
    value: 1,
    decimals: 0,
    unit: "/400+",
    note: "Rank in the HTM 4.0 Delhi 2023 coding challenge",
  },
  {
    value: 250,
    decimals: 0,
    unit: "+",
    note: "DSA problems on LeetCode, as rimjhim_jain_29",
  },
  {
    value: 8.6,
    decimals: 1,
    unit: "/10",
    note: "CGPA, B.Tech in Computer Science and Engineering",
  },
];

export const education =
  "Chitkara University, Patiala, 2021 to 2025. Certified in MySQL and advanced data structures. " +
  "English fluent, Hindi native.";
