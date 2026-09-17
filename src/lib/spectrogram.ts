/**
 * Ambient spectrogram field.
 *
 * Layered sines are rasterised into a tiny offscreen buffer (about 128x72),
 * then upscaled and blurred onto the visible canvas. Working at buffer scale
 * keeps the per-pixel loop cheap enough to run every frame, and the blur on
 * the way up is what makes it read as drifting bands rather than noise.
 */

/** Violet → magenta → amber → pale, the same ramp the rest of the site uses. */
const RAMP: [number, number, number][] = [
  [12, 7, 22],
  [58, 26, 96],
  [123, 48, 150],
  [255, 61, 119],
  [255, 138, 61],
  [255, 217, 160],
];

export function rampAt(t: number): [number, number, number] {
  const clamped = t < 0 ? 0 : t > 1 ? 1 : t;
  const f = clamped * (RAMP.length - 1);
  const i = Math.floor(f);
  const k = f - i;
  const a = RAMP[i];
  const b = RAMP[Math.min(i + 1, RAMP.length - 1)];
  return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
}

export type SpectrogramOptions = {
  /** Offscreen buffer size. Bigger is sharper and slower. */
  bufferWidth: number;
  bufferHeight: number;
  blur: number;
  speed: number;
  contrast: number;
  /** Fade from the centre out instead of top-down. Suits tall frames. */
  vertical?: boolean;
  seed?: number;
};

export type SpectrogramHandle = { destroy: () => void };

export function mountSpectrogram(
  canvas: HTMLCanvasElement,
  options: SpectrogramOptions,
  animate: boolean,
): SpectrogramHandle {
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return { destroy: () => {} };

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const { bufferWidth: bw, bufferHeight: bh } = options;

  const buffer = document.createElement("canvas");
  buffer.width = bw;
  buffer.height = bh;
  const bctx = buffer.getContext("2d");
  if (!bctx) return { destroy: () => {} };
  const image = bctx.createImageData(bw, bh);

  let raf = 0;
  let visible = true;
  let t = options.seed ?? 0;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));
  };

  const draw = () => {
    const data = image.data;
    let p = 0;
    for (let y = 0; y < bh; y++) {
      const ny = y / bh;
      for (let x = 0; x < bw; x++) {
        const nx = x / bw;
        // High frequency across y, low across x: the field reads as drifting
        // spectrogram bands rather than the blobby gradient wash you get from
        // equal frequencies on both axes.
        let v =
          Math.sin(ny * 15.5 + t * 0.44 + Math.sin(nx * 2.3 + t * 0.19) * 1.25) +
          Math.sin(ny * 26.0 - t * 0.33 + Math.sin(nx * 1.4 - t * 0.12) * 0.8) * 0.62 +
          Math.sin(nx * 3.4 + t * 0.51) * 0.38;
        v = (v / 2.0 + 1) / 2;
        v = Math.pow(v, options.contrast);
        const falloff = options.vertical ? 1 - Math.abs(ny - 0.5) * 1.55 : 1 - ny * 0.72;
        v *= Math.max(0, falloff);
        const [r, g, b] = rampAt(v);
        data[p++] = r;
        data[p++] = g;
        data[p++] = b;
        data[p++] = Math.min(255, v * 300);
      }
    }
    bctx.putImageData(image, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.filter = `blur(${options.blur * dpr}px)`;
    ctx.drawImage(buffer, 0, 0, canvas.width, canvas.height);
    ctx.filter = "none";
  };

  const tick = () => {
    if (visible) {
      t += options.speed;
      draw();
    }
    raf = requestAnimationFrame(tick);
  };

  const onResize = () => {
    resize();
    draw();
  };

  resize();
  draw();

  let observer: IntersectionObserver | null = null;
  if (animate) {
    observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
      },
      { rootMargin: "120px" },
    );
    observer.observe(canvas);
    raf = requestAnimationFrame(tick);
  }
  window.addEventListener("resize", onResize, { passive: true });

  return {
    destroy: () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
      window.removeEventListener("resize", onResize);
    },
  };
}
