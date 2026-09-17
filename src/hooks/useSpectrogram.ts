"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { mountSpectrogram, type SpectrogramOptions } from "@/lib/spectrogram";

/** Attaches an ambient spectrogram field to a canvas; holds a still frame when
 *  the visitor has asked for reduced motion. */
export function useSpectrogram(options: SpectrogramOptions) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const handle = mountSpectrogram(canvas, options, !reduced);
    return () => handle.destroy();
    // `options` is a literal at every call site, so compare by value.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, JSON.stringify(options)]);

  return ref;
}
