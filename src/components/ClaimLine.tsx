"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, useReducedMotion } from "motion/react";
import { profile } from "@/content/profile";

/** The thesis of the page. A read-head sweeps the line as it scrolls past,
 *  brightening words the way a playhead crosses a waveform. At rest, and
 *  whenever motion is reduced, the whole line simply reads at full strength. */
export function ClaimLine() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const head = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const backgroundImage = useMotionTemplate`linear-gradient(100deg, var(--color-bone) 0 ${head}, var(--color-bone-dim) ${head} 100%)`;

  return (
    <section className="act claim">
      <div className="wrap">
        <motion.p
          ref={ref}
          className="claim-line"
          data-sweep={reduced ? "off" : "on"}
          style={reduced ? undefined : { backgroundImage }}
        >
          {profile.claim.lead} <span className="quiet">{profile.claim.turn}</span>
        </motion.p>
      </div>
    </section>
  );
}
