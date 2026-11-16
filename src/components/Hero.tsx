"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import { Flashlight } from "./Flashlight";
import { profile } from "@/content/profile";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Hero() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".hero-kicker", { y: 12, opacity: 0, duration: 0.5 })
          .from(
            ".hero-name span",
            { yPercent: 105, stagger: 0.13, duration: 1 },
            "-=0.2",
          )
          .from(
            ".portrait-stage",
            { clipPath: "inset(100% 0 0 0)", duration: 1.2 },
            "<0.1",
          )
          .from(
            ".hero-detail",
            { y: 18, opacity: 0, stagger: 0.12, duration: 0.65 },
            "-=0.6",
          );
        gsap.to(".portrait-image", {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="subject" className="hero-section">
      <div className="hero-kicker mono">
        <span>A portfolio in five chapters</span>
        <span>Software, with a human point of view.</span>
      </div>
      <div className="hero-composition">
        <h1 className="hero-name">
          <span>{profile.firstName}</span>
          <span>
            {profile.lastName}
            <i aria-hidden="true">.</i>
          </span>
        </h1>
        <div className="portrait-stage">
          <Flashlight className="hero-photo" radius={240} darkness={0.88}>
            <Image
              className="portrait-image"
              src="/images/rimjhim-portrait.webp"
              alt="Rimjhim Jain, seated in an olive suit"
              fill
              priority
              sizes="(max-width: 700px) 90vw, 48vw"
            />
            <span className="photo-corner top-left" />
            <span className="photo-corner bottom-right" />
            <span className="photo-caption mono">
              Fig. 01 / The person behind the systems
            </span>
          </Flashlight>
        </div>
        <Flashlight
          className="hero-sticker hero-detail"
          radius={160}
          darkness={0.96}
        >
          AI & backend. Human first.
        </Flashlight>
        <div className="hero-description hero-detail">
          <span className="chapter-label mono">01 / The subject</span>
          <p>
            Good AI needs
            <br />
            good systems.
          </p>
          <div className="hero-role">
            I build the backend, workflows, and product infrastructure that
            <br className="desktop-break" /> make AI useful beyond the demo.
          </div>
        </div>
        <div className="hero-note hero-detail">
          <span className="status-dot" />
          Currently at Inspra.ai
          <br />
          <span className="mono">Engineer / Builder / Problem solver</span>
        </div>
        <svg
          className="hero-arrow hero-detail"
          viewBox="0 0 180 90"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 72C69 89 114 68 163 15M138 18l29-9-2 29"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>
      <div className="hero-bottom hero-detail">
        <span className="mono">
          AI systems / Backend / Product infrastructure
        </span>
        <motion.a href="#work" whileHover={{ y: 3 }}>
          Explore the work <span aria-hidden="true">↓</span>
        </motion.a>
        <span className="torch-hint mono">
          Try the light switch. Look a little closer.
        </span>
      </div>
    </section>
  );
}
