"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useMotionValueEvent } from "motion/react";

const PATH = "M5 0 C 0 170, 10 300, 5 480 C 0 640, 10 780, 5 1000";

/** One lit thread down the left rail, drawn by page scroll, with a bright
 *  head riding the tip. It is the throughline that ties the acts together.
 *
 *  The head is positioned imperatively rather than through state — this runs
 *  on every scroll frame, and a re-render per frame is not worth paying. */
export function SignalThread() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.35 });
  const bedRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGCircleElement>(null);

  const moveHead = (value: number) => {
    const path = bedRef.current;
    const head = headRef.current;
    if (!path || !head) return;
    const point = path.getPointAtLength(path.getTotalLength() * Math.min(1, Math.max(0, value)));
    head.setAttribute("cx", `${point.x}`);
    head.setAttribute("cy", `${point.y}`);
  };

  useEffect(() => {
    moveHead(progress.get());
  }, [progress]);

  useMotionValueEvent(progress, "change", moveHead);

  return (
    <div className="thread" aria-hidden="true">
      <svg viewBox="0 0 10 1000" preserveAspectRatio="none">
        <defs>
          <linearGradient id="threadRamp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7B4BE0" />
            <stop offset="0.38" stopColor="#FF3D77" />
            <stop offset="0.72" stopColor="#FF8A3D" />
            <stop offset="1" stopColor="#FFD9A0" />
          </linearGradient>
        </defs>
        <path ref={bedRef} className="bed" d={PATH} />
        <motion.path className="lit" d={PATH} style={{ pathLength: progress }} />
        <circle ref={headRef} className="head" r="2.6" cx="5" cy="0" />
      </svg>
    </div>
  );
}
