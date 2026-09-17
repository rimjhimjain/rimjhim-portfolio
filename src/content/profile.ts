/**
 * Every piece of copy on the site lives here, so the page components stay
 * layout-only. Figures are taken verbatim from the resume — nothing is
 * inferred or rounded.
 */

export const profile = {
  firstName: "Rimjhim",
  lastName: "Jain",
  role: "Software engineer, AI and backend",
  summary:
    "I ship production AI systems end to end — LLM classification pipelines and agentic workflows, " +
    "high-throughput Haskell and Python backends, and the Next.js product surfaces that sit on top of them. " +
    "Currently building the workspace product, agency console and data layer of a multi-tenant AI voice-agent platform.",
  claim: {
    lead: "Every call the platform makes gets an outcome.",
    turn: "I built the system that decides it.",
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

/**
 * Drop a file at `public/portrait.jpg` and set this to "/portrait.jpg".
 * While it is null the portrait frame renders its generative fallback.
 */
export const portraitSrc: string | null = null;
export const portraitAlt = "Rimjhim Jain";

export type VizKind = "cascade" | "loop" | "pipeline" | "platform" | "ticker";

export type WorkPanel = {
  id: string;
  viz: VizKind;
  meta: string;
  title: string;
  body: string;
  tools: string;
};

export const work: WorkPanel[] = [
  {
    id: "disposition",
    viz: "cascade",
    meta: "Inspra.ai — AI voice agent platform, 2025 to now",
    title: "Self-Learning Disposition Engine",
    body:
      "Labels the outcome of every call the platform places. Deterministic signals settle most of them with no " +
      "model in the loop at all. Embedding recall matches what human reviewers have already corrected. Only what " +
      "survives both reaches a single structured LLM call, with a stronger second-pass reasoning agent waiting " +
      "behind it. Reviewers feed corrections back in, and the engine keeps them.",
    tools: "Python, FastAPI, embeddings, OpenRouter",
  },
  {
    id: "learning-loop",
    viz: "loop",
    meta: "Inspra.ai — AI voice agent platform, 2025 to now",
    title: "Agentic Learning Loop",
    body:
      "Reviewer corrections don’t just get stored, they get promoted. An LLM turns each one into a classification " +
      "guideline, and every candidate is backtested against a golden set before it goes anywhere: it has to fix at " +
      "least one prior error and regress zero, or it doesn’t deploy. The ones that pass deploy themselves, and " +
      "per-workspace confidence thresholds tune from how often reviewers agree.",
    tools: "LLM evaluation, prompt engineering, automated backtesting",
  },
  {
    id: "post-call",
    viz: "pipeline",
    meta: "Inspra.ai — AI voice agent platform, 2025 to now",
    title: "Post-Call Pipeline",
    body:
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
    meta: "Inspra.ai — AI voice agent platform, 2025 to now",
    title: "The platform itself",
    body:
      "The workspace application and agency admin console, end to end: self-serve signup and onboarding, outbound " +
      "call and SMS campaigns, Stripe billing with credits and auto top-up, telephony and carrier management, and a " +
      "visual automation-flow builder. I designed the core schema and its migration history in Prisma and Postgres, " +
      "and built the REST surface across the workspace, agency, webhook and cron namespaces, plus a standalone " +
      "public API in FastAPI with async SQLAlchemy, rate limiting and generated OpenAPI docs. Vitest suites behind " +
      "all of it.",
    tools: "Next.js, TypeScript, React, Prisma, PostgreSQL, Stripe, Vitest",
  },
  {
    id: "stock-tracker",
    viz: "ticker",
    meta: "Mphasis — Application Delivery Unit, February to May 2025",
    title: "Realtime Stock Tracker",
    body:
      "My internship build: a live market-data tracker on .NET Core and Angular, streaming price updates straight " +
      "to the UI over WebSockets. I designed the REST layer between the frontend and backend and shipped it inside " +
      "an Agile team, with code review and version control — the first place I learned what “done” actually means.",
    tools: ".NET Core, Angular, WebSockets, REST",
  },
];

/** Each band takes its own point on the spectrogram ramp, so colour encodes cluster. */
export const toolkit: { name: string; colour: string; items: string[] }[] = [
  {
    name: "Languages",
    colour: "#7B4BE0",
    items: ["Python", "TypeScript", "JavaScript", "Haskell", "Go", "Java", "SQL", "C++"],
  },
  {
    name: "AI and LLM",
    colour: "#9B47C9",
    items: ["Agentic workflows", "LLM evaluation", "Prompt engineering", "Embeddings", "OpenRouter", "Anthropic SDK"],
  },
  {
    name: "Backend",
    colour: "#C8449F",
    items: ["FastAPI", "Servant/Warp", "Node.js", "Express", ".NET Core", "REST", "OpenAPI", "SQLAlchemy"],
  },
  {
    name: "Frontend",
    colour: "#FF3D77",
    items: ["Next.js", "React", "Angular", "Tailwind", "TanStack Query", "Radix UI"],
  },
  {
    name: "Data",
    colour: "#FF5D5A",
    items: ["PostgreSQL", "Supabase", "Firebase", "Redis", "Prisma", "MongoDB", "MySQL"],
  },
  {
    name: "Voice AI",
    colour: "#FF7A45",
    items: ["VAPI", "Retell", "LiveKit", "ElevenLabs", "SIP"],
  },
  {
    name: "Automation and CRM",
    colour: "#FF9E38",
    items: ["n8n", "GoHighLevel", "CRM integrations"],
  },
  {
    name: "Infra and tooling",
    colour: "#FFC46B",
    items: ["Docker", "Vercel", "Stripe", "Git", "Pytest", "Vitest"],
  },
];

export const proof: { value: number; decimals: number; unit: string; note: string }[] = [
  { value: 1, decimals: 0, unit: "st", note: "Hack The Mountain 4.0, Cyber City, Gurgaon" },
  { value: 1, decimals: 0, unit: "/400+", note: "Rank in the HTM 4.0 Delhi 2023 coding challenge" },
  { value: 250, decimals: 0, unit: "+", note: "DSA problems on LeetCode, as rimjhim_jain_29" },
  { value: 8.6, decimals: 1, unit: "/10", note: "CGPA, B.Tech in Computer Science and Engineering" },
];

export const education =
  "Chitkara University, Patiala, 2021 to 2025. Certified in MySQL and advanced data structures. " +
  "English fluent, Hindi native.";
