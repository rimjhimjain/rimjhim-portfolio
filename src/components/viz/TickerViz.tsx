"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const LINE =
  "M0 148 L20 140 L40 146 L60 128 L80 134 L100 118 L120 124 L140 104 L160 112 L180 92 L200 100 " +
  "L220 78 L240 88 L260 70 L280 80 L300 58 L320 68 L340 48 L360 56 L380 38 L400 44";

/** A price line arriving over a websocket: the stroke draws itself in and a
 *  marker rides the leading edge. */
export function TickerViz() {
  const lineRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const line = lineRef.current;
    const dot = dotRef.current;
    if (!line || !dot) return;

    if (reduced) {
      line.style.strokeDasharray = "";
      line.style.strokeDashoffset = "";
      return;
    }

    const length = line.getTotalLength();
    line.style.strokeDasharray = `${length}`;
    let raf = 0;
    let start = 0;

    const sweep = (now: number) => {
      if (!start) start = now;
      const k = ((now - start) % 4200) / 4200;
      line.style.strokeDashoffset = `${length * (1 - k)}`;
      const point = line.getPointAtLength(length * k);
      dot.setAttribute("cx", `${point.x}`);
      dot.setAttribute("cy", `${point.y}`);
      raf = requestAnimationFrame(sweep);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !raf) raf = requestAnimationFrame(sweep);
      else if (!entry.isIntersecting) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    observer.observe(line);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      line.style.strokeDasharray = "";
      line.style.strokeDashoffset = "";
    };
  }, [reduced]);

  return (
    <div className="viz">
      <svg
        viewBox="0 0 400 200"
        role="img"
        aria-label="A live price line streaming in over a websocket."
      >
        <g stroke="#45443D" strokeWidth="1" opacity="0.55">
          <path d="M0 50 H400" />
          <path d="M0 100 H400" />
          <path d="M0 150 H400" />
        </g>
        <path
          ref={lineRef}
          fill="none"
          stroke="#F3D735"
          strokeWidth="1.75"
          strokeLinejoin="round"
          d={LINE}
        />
        <circle ref={dotRef} cx="400" cy="44" r="3.4" fill="#EAE8E2" />
      </svg>
    </div>
  );
}
