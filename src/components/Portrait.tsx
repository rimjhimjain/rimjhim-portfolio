"use client";

import Image from "next/image";
import { useSpectrogram } from "@/hooks/useSpectrogram";
import { portraitSrc, portraitAlt } from "@/content/profile";

/** Editorial portrait frame. Until a photo is dropped in, it holds a
 *  generative spectrogram fill so the composition still reads. */
export function Portrait() {
  const canvasRef = useSpectrogram({
    bufferWidth: 72,
    bufferHeight: 96,
    blur: 16,
    speed: 0.008,
    contrast: 3.2,
    vertical: true,
    seed: 40,
  });

  if (portraitSrc) {
    return (
      <figure className="portrait">
        <Image src={portraitSrc} alt={portraitAlt} fill priority sizes="(max-width: 940px) 100vw, 32vw" />
      </figure>
    );
  }

  return (
    <figure className="portrait">
      <canvas ref={canvasRef} aria-hidden="true" />
      <figcaption className="portrait-note">
        Portrait slot — add <code>public/portrait.jpg</code> and set <code>portraitSrc</code> in{" "}
        <code>src/content/profile.ts</code>.
      </figcaption>
    </figure>
  );
}
