"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Viz } from "./viz";
import { Flashlight } from "./Flashlight";
import { Chapter } from "./Chapter";
import { work, type VizKind } from "@/content/profile";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const captions: Record<VizKind, string> = {
  cascade: "A decision, at the right level of complexity.",
  loop: "Corrections become knowledge.",
  pipeline: "One finished call. Independent workers.",
  platform: "The interface is part of the system.",
  ticker: "Live data, without the refresh.",
  sms: "A conversation is a workflow, not a send call.",
  billing: "Runtime changes, without a redeploy.",
};

export function WorkReel() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".case-study").forEach((article) => {
          gsap.from(article.querySelector(".case-visual"), {
            clipPath: "inset(0 0 100% 0)",
            duration: 1,
            ease: "power3.inOut",
            scrollTrigger: { trigger: article, start: "top 85%", once: true },
          });
          gsap.from(article.querySelector(".case-copy"), {
            y: 35,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: { trigger: article, start: "top 80%", once: true },
          });
        });
      });
      return () => media.revert();
    },
    { scope: root },
  );
  return (
    <section ref={root} id="work" className="work-section wrap section-space">
      <Chapter number="02" label="Case files" title="Built for real work." />
      <div className="work-intro">
        <p>
          The details are the work.
          <br />
          <em>Here’s what I built, and why it matters.</em>
        </p>
        <span className="mono">
          Selected engineering work
          <br />
          2025 — 2026
        </span>
      </div>
      {work.map((panel, index) => (
        <article
          className={`case-study case-${panel.viz}`}
          key={panel.id}
          id={panel.id}
        >
          <div className="case-visual">
            <div className="visual-topline mono">
              <span>Case / 0{index + 1}</span>
              <span>System study</span>
            </div>
            <Flashlight radius={170} darkness={0.82}>
              <Viz kind={panel.viz} />
              <div className="diagram-annotation">{captions[panel.viz]}</div>
            </Flashlight>
            <div className="visual-bottomline mono">
              <span>
                {panel.viz === "ticker"
                  ? "Illustrative price data"
                  : "Architecture illustration"}
              </span>
              <span aria-hidden="true">↗</span>
            </div>
          </div>
          <div className="case-copy">
            <p className="case-meta mono">{panel.meta}</p>
            <h3>{panel.title}</h3>
            <p className="case-body">{panel.body}</p>
            <p className="case-tools">
              <span className="mono">Built with</span>
              {panel.tools}
            </p>
            <details>
              <summary>
                Engineering notes <span aria-hidden="true">+</span>
              </summary>
              <p>{panel.notes}</p>
            </details>
          </div>
        </article>
      ))}
    </section>
  );
}
