"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "motion/react";
import { Viz } from "./viz";
import { work } from "@/content/profile";

const HORIZONTAL_FROM = 940;

/** The work section pins and pans sideways through the panels. Below
 *  `HORIZONTAL_FROM`, or when motion is reduced, the same panels stack
 *  vertically — the content and its order are identical either way. */
export function WorkReel() {
  const reelRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const [horizontal, setHorizontal] = useState(false);
  const [measuredSpan, setMeasuredSpan] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [index, setIndex] = useState(1);

  // Mode is decided from the viewport alone. It cannot depend on the measured
  // track width, because the track is only wide enough to scroll once the
  // horizontal layout is already applied.
  useEffect(() => {
    const decide = () => setHorizontal(window.innerWidth >= HORIZONTAL_FROM && !reduced);
    decide();
    window.addEventListener("resize", decide, { passive: true });
    return () => window.removeEventListener("resize", decide);
  }, [reduced]);

  // Measure only after the horizontal layout has landed in the DOM. The first
  // measurement waits a frame so the browser has applied that layout.
  useEffect(() => {
    if (!horizontal) return;
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setViewportHeight(window.innerHeight);
      setMeasuredSpan(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    const raf = requestAnimationFrame(measure);
    window.addEventListener("resize", measure, { passive: true });
    // Web fonts land after first paint and change the track's width.
    document.fonts?.ready.then(measure).catch(() => {});
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, [horizontal]);

  const span = horizontal ? measuredSpan : 0;
  const panning = horizontal && span > 0;

  const { scrollYProgress } = useScroll({ target: reelRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -span]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (!panning) return;
    const clamped = Math.min(1, Math.max(0, value));
    setIndex(Math.min(work.length, Math.floor(clamped * work.length) + 1));
  });

  return (
    <section>
      <div className="wrap">
        <div className="reel-head">
          <h2>What I&rsquo;ve built</h2>
          <p>Four systems at Inspra.ai that run against live call traffic, and the one that taught me to ship.</p>
        </div>
      </div>

      <div
        ref={reelRef}
        className="reel"
        data-horizontal={horizontal}
        style={panning ? { height: viewportHeight + span } : undefined}
      >
        <div className="reel-sticky">
          <motion.div ref={trackRef} className="reel-track" style={panning ? { x } : undefined}>
            {work.map((panel) => (
              <article key={panel.id} className="panel">
                <Viz kind={panel.viz} />
                <p className="panel-meta">{panel.meta}</p>
                <h3>{panel.title}</h3>
                <p className="panel-body">{panel.body}</p>
                <p className="tools">{panel.tools}</p>
              </article>
            ))}
          </motion.div>

          <div className="reel-rail" aria-hidden="true">
            <span className="reel-count">
              {index} / {work.length}
            </span>
            <span className="reel-bar">
              <motion.i style={panning ? { scaleX: scrollYProgress } : { scaleX: 0 }} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
