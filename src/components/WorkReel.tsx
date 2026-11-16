"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Viz } from "./viz";
import { WorkArtifact } from "./WorkArtifact";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { work, type VizKind, type WorkPanel } from "@/content/profile";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const covers: Record<
  VizKind,
  { title: string; category: string; line: string }
> = {
  platform: {
    title: "The whole thing. From schema to screen.",
    category: "Software engineering / Voice AI",
    line: "A workspace for the people behind the calls.",
  },
  sms: {
    title: "Keep the conversation going.",
    category: "SMS automation",
    line: "Campaigns, replies, and all the in-between.",
  },
  cascade: {
    title: "A little less guessing.",
    category: "AI classification",
    line: "Rules first. Models when they matter.",
  },
  billing: {
    title: "Change the keys. Keep going.",
    category: "Stripe infrastructure",
    line: "Test to live, without a redeploy.",
  },
  loop: {
    title: "Good systems take feedback.",
    category: "Agentic learning",
    line: "A correction today. A better decision tomorrow.",
  },
  pipeline: {
    title: "The call ends. The work begins.",
    category: "Post-call processing",
    line: "One event. Independent workers. Everything connected.",
  },
  ticker: {
    title: "Made to keep up.",
    category: "Realtime stock tracker",
    line: "My first chapter in building for a team.",
  },
};
const order: VizKind[] = [
  "platform",
  "sms",
  "cascade",
  "billing",
  "loop",
  "pipeline",
  "ticker",
];
const selectedWork = order.flatMap((kind) =>
  work.filter((panel) => panel.viz === kind),
);

function ProjectStory({
  panel,
  onClose,
}: {
  panel: WorkPanel;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      if (trigger instanceof HTMLElement)
        trigger.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="project-story"
      aria-labelledby="story-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="story-paper">
        <div className="story-topline">
          <span className="mono">Inside the build</span>
          <button onClick={onClose} autoFocus aria-label="Close project story">
            ×
          </button>
        </div>
        <p className="mono story-meta">{panel.meta}</p>
        <h2 id="story-title">{panel.title}</h2>
        <p className="story-lead">{panel.body}</p>
        <div className="story-diagram">
          <Viz kind={panel.viz} />
          <span className="mono">
            {panel.viz === "ticker"
              ? "Illustrative price data"
              : "Architecture illustration"}
          </span>
        </div>
        <h3>The engineering behind it</h3>
        <p className="story-notes">{panel.notes}</p>
        <div className="story-tools">
          <span className="mono">Built with</span>
          <p>{panel.tools}</p>
        </div>
        <button className="story-return" onClick={onClose}>
          Back to the workbench <span aria-hidden="true">↗</span>
        </button>
      </div>
    </dialog>
  );
}

export function WorkReel() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<WorkPanel | null>(null);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const visible = new Set<Element>();
    const update = () => {
      section.querySelectorAll<HTMLElement>(".work-piece").forEach((piece) => {
        piece.dataset.running = String(
          visible.has(piece) && !document.hidden && !paused && !reduced,
        );
      });
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        });
        update();
      },
      { threshold: 0.15 },
    );
    section
      .querySelectorAll(".work-piece")
      .forEach((piece) => observer.observe(piece));
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [paused, reduced]);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        if (paused) return;
        gsap.utils.toArray<HTMLElement>(".work-piece").forEach((piece) => {
          gsap.fromTo(
            piece.querySelector(".artifact"),
            { y: 15 },
            {
              y: -15,
              ease: "none",
              scrollTrigger: {
                trigger: piece,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.7,
              },
            },
          );
          gsap.from(piece, {
            y: 65,
            opacity: 0.4,
            rotate: 2,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: piece, start: "top 94%", once: true },
          });
        });
      });
      return () => media.revert();
    },
    { scope: root, dependencies: [paused], revertOnUpdate: true },
  );
  return (
    <section
      ref={root}
      id="work"
      className="workbench wrap section-space"
      aria-labelledby="work-title"
    >
      <div className="workbench-heading">
        <p className="mono">Selected work / 2025–2026</p>
        <h2 id="work-title">
          A curious mind.
          <br />
          <em>A busy workbench.</em>
          <span className="work-spark" aria-hidden="true">
            ✳
          </span>
        </h2>
        <div className="workbench-intro">
          <p>
            I like the part where a tricky problem
            <br />
            turns into AI people can actually use.
          </p>
          <div className="workbench-controls">
            <span>Pick a project. Take a closer look. ↙</span>
            <button
              className="motion-toggle"
              disabled={reduced}
              aria-pressed={paused || reduced}
              onClick={() => setPaused(!paused)}
            >
              {reduced
                ? "Reduced motion"
                : paused
                  ? "Play motion ↗"
                  : "Pause motion Ⅱ"}
            </button>
          </div>
        </div>
      </div>
      <div className="workbench-grid">
        {selectedWork.map((panel) => (
          <article
            id={panel.id}
            key={panel.id}
            className={`work-piece piece-${panel.viz}`}
          >
            <button
              className="piece-open"
              aria-haspopup="dialog"
              aria-label={`Explore ${panel.title}`}
              onClick={() => setActive(panel)}
            >
              <span className="piece-category mono">
                {covers[panel.viz].category}
              </span>
              <span className="piece-title">{covers[panel.viz].title}</span>
              <WorkArtifact kind={panel.viz} />
              <span className="piece-bottom">
                <span>{covers[panel.viz].line}</span>
                <span className="piece-arrow" aria-hidden="true">
                  ↗
                </span>
              </span>
            </button>
          </article>
        ))}
      </div>
      <p className="workbench-footnote mono">
        Project illustrations / Open each piece for my contribution,
        architecture & tools.
      </p>
      {active && (
        <ProjectStory panel={active} onClose={() => setActive(null)} />
      )}
    </section>
  );
}
