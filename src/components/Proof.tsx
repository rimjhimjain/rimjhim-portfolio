import Image from "next/image";
import { proof, education } from "@/content/profile";
import { Chapter } from "./Chapter";

export function Proof() {
  return (
    <section id="record" className="record-section wrap section-space">
      <Chapter number="04" label="The record" title="Behind the systems." />
      <div className="about-layout">
        <figure className="about-portrait">
          <Image
            src="/images/rimjhim-about.webp"
            alt="Rimjhim Jain seated beside a window"
            width={780}
            height={1040}
            sizes="(max-width: 700px) 90vw, 30vw"
          />
          <figcaption className="mono">Off-screen / Still curious.</figcaption>
        </figure>
        <div className="about-copy">
          <h3>
            Curiosity, followed
            <br />
            by implementation.
          </h3>
          <p>
            I build across the whole product: the screen a person uses, the
            service behind it, and the AI that helps it make decisions. My work
            at Inspra.ai brings those pieces together in a voice-agent platform.
          </p>
          <p>
            I care about what happens after the first version ships. Reviewer
            feedback, evaluation and regression tests are part of how I build
            systems that can improve.
          </p>
          <a
            href="/Rimjhim_Jain_Resume.pdf"
            className="text-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read my resume <span aria-hidden="true">↗</span>
          </a>
          <div className="experience">
            <div>
              <span className="mono">Jul 2025 – Present</span>
              <h4>Software Engineer, AI & Backend</h4>
              <p>Inspra.ai</p>
            </div>
            <div>
              <span className="mono">Feb – May 2025</span>
              <h4>Software Engineering Intern</h4>
              <p>Mphasis / Application Delivery Unit</p>
            </div>
          </div>
        </div>
      </div>
      <div className="proof-grid">
        {proof.map((item) => (
          <div className="proof-item" key={item.note}>
            <p className="proof-num">
              {item.value.toFixed(item.decimals)}
              <span>{item.unit}</span>
            </p>
            <p>{item.note}</p>
          </div>
        ))}
      </div>
      <p className="education">{education}</p>
    </section>
  );
}
