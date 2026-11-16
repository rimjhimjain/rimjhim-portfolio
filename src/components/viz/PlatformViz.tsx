"use client";

/** The workspace surface in miniature: nav, the visual automation-flow
 *  builder, and the credits panel that Stripe billing feeds. */
export function PlatformViz() {
  return (
    <div className="viz">
      <svg
        viewBox="0 0 400 200"
        role="img"
        aria-label="The workspace console: navigation, a visual automation-flow builder branching from a call step to SMS and CRM sync, and a credits panel."
      >
        <rect x="16" y="16" width="70" height="168" rx="2" fill="#11110F" stroke="#45443D" />
        <g fill="#45443D">
          <rect x="28" y="30" width="46" height="5" rx="2.5" />
          <rect x="28" y="44" width="38" height="5" rx="2.5" />
          <rect x="28" y="58" width="42" height="5" rx="2.5" />
          <rect x="28" y="72" width="34" height="5" rx="2.5" />
        </g>
        <rect x="26" y="86" width="50" height="5" rx="2.5" fill="#F3D735" />
        <g fill="#45443D">
          <rect x="28" y="100" width="40" height="5" rx="2.5" />
          <rect x="28" y="114" width="45" height="5" rx="2.5" />
        </g>

        <g fill="none" stroke="#45443D" strokeWidth="1">
          <path d="M158 54 L196 54" />
          <path d="M234 54 C 256 54, 256 104, 278 104" />
          <path d="M234 54 C 256 54, 256 150, 278 150" />
        </g>
        <g fill="#11110F" stroke="#45443D">
          <rect x="104" y="38" width="54" height="32" rx="2" />
          <rect x="278" y="88" width="66" height="32" rx="2" />
          <rect x="278" y="134" width="66" height="32" rx="2" />
        </g>
        <rect x="196" y="38" width="38" height="32" rx="2" fill="#11110F" stroke="#ED513F" />
        <g fontFamily="var(--font-display)" fontSize="9" fill="#D4D1C6" textAnchor="middle">
          <text x="131" y="58">trigger</text>
          <text x="215" y="58">call</text>
          <text x="311" y="108">SMS</text>
          <text x="311" y="154">CRM sync</text>
        </g>

        <rect x="104" y="104" width="66" height="62" rx="2" fill="none" stroke="#45443D" />
        <text x="137" y="124" fontFamily="var(--font-display)" fontSize="9" fill="#AAA79C" textAnchor="middle">
          credits
        </text>
        <g fill="#F3D735" opacity="0.85">
          <rect x="114" y="150" width="8" height="8" />
          <rect x="126" y="142" width="8" height="16" />
          <rect x="138" y="134" width="8" height="24" />
          <rect x="150" y="146" width="8" height="12" />
        </g>
      </svg>
    </div>
  );
}
