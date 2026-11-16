"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const PROVIDERS = [
  {
    label: "VAPI",
    y: 52,
    path: "M50 48 C 84 48, 84 84, 118 84",
    id: "pw1",
    fill: "#819EBB",
    begin: "0s",
  },
  {
    label: "Retell",
    y: 86,
    path: "M50 82 L118 83",
    id: "pw2",
    fill: "#ED513F",
    begin: "0.7s",
  },
  {
    label: "Elk",
    y: 120,
    path: "M50 116 C 84 116, 84 84, 118 84",
    id: "pw3",
    fill: "#F3D735",
    begin: "1.4s",
  },
];

const WORKERS = [
  {
    label: "disposition",
    y: 28,
    ty: 46,
    path: "M176 84 C 212 84, 212 42, 248 42",
    id: "pq1",
    begin: "0.4s",
  },
  {
    label: "sentiment",
    y: 70,
    ty: 88,
    path: "M176 84 L248 84",
    id: "pq2",
    begin: "1.1s",
  },
  {
    label: "voicemail",
    y: 112,
    ty: 130,
    path: "M176 84 C 212 84, 212 126, 248 126",
    id: "pq3",
    begin: "1.8s",
  },
];

/** Webhooks in, one ingest point, three independent workers draining their
 *  own Redis queues. */
export function PipelineViz() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="viz">
      <svg
        viewBox="0 0 400 200"
        role="img"
        aria-label="Webhooks from VAPI, Retell and Elk flow into one ingest service, then fan out to disposition, sentiment and voicemail workers over Redis queues."
      >
        <g fontFamily="var(--font-display)" fontSize="9.5" fill="#AAA79C">
          {PROVIDERS.map((p) => (
            <text key={p.label} x="14" y={p.y}>
              {p.label}
            </text>
          ))}
        </g>

        <g fill="none" stroke="#45443D" strokeWidth="1">
          {PROVIDERS.map((p) => (
            <path key={p.id} id={p.id} d={p.path} />
          ))}
          {WORKERS.map((w) => (
            <path key={w.id} id={w.id} d={w.path} />
          ))}
        </g>

        <rect
          x="118"
          y="66"
          width="58"
          height="36"
          rx="2"
          fill="#11110F"
          stroke="#F3D735"
          strokeWidth="1"
        />
        <text
          x="147"
          y="88"
          fontFamily="var(--font-display)"
          fontSize="10"
          fill="#EAE8E2"
          textAnchor="middle"
        >
          ingest
        </text>

        {WORKERS.map((w) => (
          <rect
            key={w.label}
            x="248"
            y={w.y}
            width="94"
            height="28"
            rx="2"
            fill="#11110F"
            stroke="#45443D"
          />
        ))}
        <g
          fontFamily="var(--font-display)"
          fontSize="10"
          fill="#D4D1C6"
          textAnchor="middle"
        >
          {WORKERS.map((w) => (
            <text key={w.label} x="295" y={w.ty}>
              {w.label}
            </text>
          ))}
        </g>

        <text
          x="200"
          y="172"
          fontFamily="var(--font-display)"
          fontSize="9.5"
          fill="#AAA79C"
          textAnchor="middle"
        >
          Redis queues → Supabase → GoHighLevel
        </text>

        {!reduced && (
          <g>
            {PROVIDERS.map((p) => (
              <circle key={`dot-${p.id}`} r="2.6" fill={p.fill}>
                <animateMotion
                  dur="2.6s"
                  begin={p.begin}
                  repeatCount="indefinite"
                >
                  <mpath href={`#${p.id}`} />
                </animateMotion>
              </circle>
            ))}
            {WORKERS.map((w) => (
              <circle key={`dot-${w.id}`} r="2.6" fill="#EAE8E2">
                <animateMotion
                  dur="2.2s"
                  begin={w.begin}
                  repeatCount="indefinite"
                >
                  <mpath href={`#${w.id}`} />
                </animateMotion>
              </circle>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}
