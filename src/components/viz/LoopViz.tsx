"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const ORBIT = "M328 100 A128 66 0 1 1 72 100 A128 66 0 1 1 328 100";

const STEPS = [
  { x: 158, y: 18, tx: 200, ty: 35, label: "correction" },
  { x: 292, y: 86, tx: 335, ty: 103, label: "guideline" },
  { x: 158, y: 156, tx: 200, ty: 173, label: "backtest" },
  { x: 22, y: 86, tx: 65, ty: 103, label: "deploy" },
];

const GOLDEN = [
  { cx: 190, cy: 92, fill: "#F3D735" },
  { cx: 210, cy: 95, fill: "#ED513F" },
  { cx: 196, cy: 108, fill: "#819EBB" },
  { cx: 209, cy: 110, fill: "#EAE8E2" },
];

/** A correction going round the loop: it becomes a guideline, gets backtested
 *  against the golden set at the centre, and only then deploys. */
export function LoopViz() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="viz">
      <svg
        viewBox="0 0 400 200"
        role="img"
        aria-label="A reviewer correction becomes a guideline, is backtested against a golden set, and deploys only if it passes."
      >
        <defs>
          <linearGradient id="loopRamp" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#819EBB" />
            <stop offset="0.5" stopColor="#ED513F" />
            <stop offset="1" stopColor="#F3D735" />
          </linearGradient>
        </defs>

        <ellipse
          cx="200"
          cy="100"
          rx="128"
          ry="66"
          fill="none"
          stroke="#45443D"
          strokeWidth="1.25"
        />
        <path
          id="loopPath"
          d={ORBIT}
          fill="none"
          stroke="url(#loopRamp)"
          strokeWidth="1.5"
          opacity="0.55"
        />

        {STEPS.map((step) => (
          <rect
            key={step.label}
            x={step.x}
            y={step.y}
            width={
              step.label === "correction" || step.label === "backtest" ? 84 : 86
            }
            height="26"
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
          {STEPS.map((step) => (
            <text key={step.label} x={step.tx} y={step.ty}>
              {step.label}
            </text>
          ))}
        </g>

        <circle cx="200" cy="100" r="26" fill="none" stroke="#45443D" />
        {GOLDEN.map((dot) => (
          <circle
            key={`${dot.cx}-${dot.cy}`}
            cx={dot.cx}
            cy={dot.cy}
            r="2.4"
            fill={dot.fill}
          />
        ))}
        <text
          x="200"
          y="140"
          fontFamily="var(--font-display)"
          fontSize="9"
          fill="#AAA79C"
          textAnchor="middle"
        >
          golden set
        </text>

        <circle r="4" fill="#EAE8E2">
          {!reduced && (
            <>
              <animateMotion dur="7s" repeatCount="indefinite" rotate="auto">
                <mpath href="#loopPath" />
              </animateMotion>
              <animate
                attributeName="fill"
                values="#819EBB;#ED513F;#F3D735;#EAE8E2;#819EBB"
                dur="7s"
                repeatCount="indefinite"
              />
            </>
          )}
        </circle>
      </svg>
    </div>
  );
}
