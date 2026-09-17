"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { proof, education } from "@/content/profile";

function Counter({ value, decimals, unit }: { value: number; decimals: number; unit: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (reduced || !inView) return;
    const controls = animate(0, value, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setShown(latest),
    });
    return () => controls.stop();
  }, [inView, reduced, value]);

  return (
    <span ref={ref} className="proof-num">
      {shown.toFixed(decimals)}
      <span className="unit">{unit}</span>
    </span>
  );
}

export function Proof() {
  return (
    <section className="act">
      <div className="wrap">
        <h2 className="section-title">Before the job</h2>
        <p className="section-lede">Competitive programming and a computer science degree, in that order of intensity.</p>

        <div className="proof-grid">
          {proof.map((item) => (
            <div key={item.note} className="proof-item">
              <Counter value={item.value} decimals={item.decimals} unit={item.unit} />
              <p>{item.note}</p>
            </div>
          ))}
        </div>

        <p className="proof-foot">{education}</p>
      </div>
    </section>
  );
}
