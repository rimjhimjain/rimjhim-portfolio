"use client";

import { Portrait } from "./Portrait";
import { useSpectrogram } from "@/hooks/useSpectrogram";
import { profile, links } from "@/content/profile";

export function Hero() {
  const canvasRef = useSpectrogram({
    bufferWidth: 128,
    bufferHeight: 72,
    blur: 18,
    speed: 0.011,
    contrast: 2.8,
  });

  return (
    <section className="act">
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
      <div className="wrap hero-inner">
        <div className="hero">
          <div>
            <h1 className="name">
              <span>{profile.firstName}</span>
              <span className="lit-word">{profile.lastName}</span>
            </h1>
            <p className="role">{profile.role}</p>
            <p className="summary">{profile.summary}</p>
            <div className="contact-row">
              <a href={`mailto:${links.email}`}>{links.email}</a>
              <a href={links.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={links.phoneHref}>{links.phone}</a>
            </div>
          </div>
          <Portrait />
        </div>
      </div>
    </section>
  );
}
