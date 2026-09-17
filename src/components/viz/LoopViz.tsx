"use client";

import { useReducedMotion } from "motion/react";

const ORBIT = "M328 100 A128 66 0 1 1 72 100 A128 66 0 1 1 328 100";

const STEPS = [
  { x: 158, y: 18, tx: 200, ty: 35, label: "correction" },
  { x: 292, y: 86, tx: 335, ty: 103, label: "guideline" },
  { x: 158, y: 156, tx: 200, ty: 173, label: "backtest" },
  { x: 22, y: 86, tx: 65, ty: 103, label: "deploy" },
];

const GOLDEN = [
  { cx: 190, cy: 92, fill: "#FF8A3D" },
  { cx: 210, cy: 95, fill: "#FF3D77" },
  { cx: 196, cy: 108, fill: "#7B4BE0" },
  { cx: 209, cy: 110, fill: "#FFD9A0" },
];

/** A correction going round the loop: it becomes a guideline, gets backtested
 *  against the golden set at the centre, and only then deploys. */
export function LoopViz() {
  const reduced = useReducedMotion();

  return (
    <div className="viz">
      <svg
        viewBox="0 0 400 200"
        role="img"
        aria-label="A reviewer correction becomes a guideline, is backtested against a golden set, and deploys only if it passes."
      >
        <defs>
          <linearGradient id="loopRamp" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7B4BE0" />
            <stop offset="0.5" stopColor="#FF3D77" />
            <stop offset="1" stopColor="#FF8A3D" />
          </linearGradient>
        </defs>

        <ellipse cx="200" cy="100" rx="128" ry="66" fill="none" stroke="#2C2138" strokeWidth="1.25" />
        <path id="loopPath" d={ORBIT} fill="none" stroke="url(#loopRamp)" strokeWidth="1.5" opacity="0.55" />

        {STEPS.map((step) => (
          <rect key={step.label} x={step.x} y={step.y} width={step.label === "correction" || step.label === "backtest" ? 84 : 86} height="26" rx="2" fill="#0A0710" stroke="#2C2138" />
        ))}
        <g fontFamily="var(--font-display)" fontSize="10" fill="#C7BCD3" textAnchor="middle">
          {STEPS.map((step) => (
            <text key={step.label} x={step.tx} y={step.ty}>
              {step.label}
            </text>
          ))}
        </g>

        <circle cx="200" cy="100" r="26" fill="none" stroke="#2C2138" />
        {GOLDEN.map((dot) => (
          <circle key={`${dot.cx}-${dot.cy}`} cx={dot.cx} cy={dot.cy} r="2.4" fill={dot.fill} />
        ))}
        <text x="200" y="140" fontFamily="var(--font-display)" fontSize="9" fill="#8E7EA2" textAnchor="middle">
          golden set
        </text>

        <circle r="4" fill="#FFD9A0">
          {!reduced && (
            <>
              <animateMotion dur="7s" repeatCount="indefinite" rotate="auto">
                <mpath href="#loopPath" />
              </animateMotion>
              <animate
                attributeName="fill"
                values="#7B4BE0;#FF3D77;#FF8A3D;#FFD9A0;#7B4BE0"
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
