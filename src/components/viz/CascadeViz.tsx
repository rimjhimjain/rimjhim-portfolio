"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { rampAt } from "@/lib/spectrogram";

/** Gate positions across the frame, and how much of the traffic each one
 *  absorbs. The shape matches the engine's design — deterministic signals
 *  take the bulk, the reasoning agent sees almost nothing — without
 *  claiming a measured figure anywhere on screen. */
const GATES = [0.26, 0.48, 0.7, 0.9];
const SHARE = [0.6, 0.22, 0.13, 0.05];

const STAGES = [
  { at: "26%", label: "deterministic signals" },
  { at: "48%", label: "embedding recall" },
  { at: "70%", label: "structured LLM call" },
  { at: "90%", label: "reasoning agent" },
];

type Call = {
  x: number;
  y: number;
  gate: number;
  speed: number;
  drop: number;
  rgb: [number, number, number];
};

export function CascadeViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const calls: Call[] = [];
    let raf = 0;
    let last = 0;
    let spawnAcc = 0;
    let visible = false;

    const resize = () => {
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr));
    };

    const pickGate = () => {
      const r = Math.random();
      let sum = 0;
      for (let i = 0; i < SHARE.length; i++) {
        sum += SHARE[i];
        if (r <= sum) return i;
      }
      return SHARE.length - 1;
    };

    const spawn = () => {
      const gate = pickGate();
      calls.push({
        x: 0,
        y: 0.18 + Math.random() * 0.64,
        gate,
        speed: 0.00042 + Math.random() * 0.00026,
        drop: 0,
        rgb: rampAt(0.24 + gate * 0.24),
      });
    };

    const draw = (dt: number) => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      ctx.save();
      ctx.strokeStyle = "#45443D";
      ctx.lineWidth = dpr;
      ctx.setLineDash([3 * dpr, 5 * dpr]);
      for (const gate of GATES) {
        ctx.beginPath();
        ctx.moveTo(gate * w, h * 0.12);
        ctx.lineTo(gate * w, h * 0.8);
        ctx.stroke();
      }
      ctx.restore();

      for (let i = calls.length - 1; i >= 0; i--) {
        const call = calls[i];
        const gateX = GATES[call.gate];
        if (call.x < gateX) call.x += call.speed * dt;
        else call.drop += dt * 0.0016;
        if (call.drop > 1) {
          calls.splice(i, 1);
          continue;
        }
        const alpha = call.drop > 0 ? Math.max(0, 1 - call.drop) : 1;
        const px = Math.min(call.x, gateX) * w;
        const py = (call.y + call.drop * 0.42) * h;
        const [r, g, b] = call.rgb;
        ctx.globalAlpha = alpha * 0.92;
        ctx.fillStyle = `rgb(${r | 0},${g | 0},${b | 0})`;
        ctx.beginPath();
        ctx.arc(px, py, 2.1 * dpr, 0, Math.PI * 2);
        ctx.fill();
        // A short trail behind each call, so direction reads at a glance.
        ctx.globalAlpha = alpha * 0.22;
        ctx.fillRect(px - 16 * dpr, py - 0.5 * dpr, 16 * dpr, dpr);
      }
      ctx.globalAlpha = 1;
    };

    const tick = (now: number) => {
      const dt = last ? Math.min(48, now - last) : 16;
      last = now;
      if (visible) {
        spawnAcc += dt;
        while (spawnAcc > 46) {
          spawn();
          spawnAcc -= 46;
        }
        draw(dt);
      }
      raf = visible ? requestAnimationFrame(tick) : 0;
    };

    resize();
    // Seed a populated frame so the still image is never an empty box.
    for (let i = 0; i < 40; i++) {
      spawn();
      calls[calls.length - 1].x = Math.random() * 0.9;
    }
    draw(16);

    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting && !document.hidden;
        if (visible && !raf) {
          last = 0;
          raf = requestAnimationFrame(tick);
        } else if (!visible) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { rootMargin: "100px" },
    );
    const onResize = () => {
      resize();
      draw(16);
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(canvas);

    if (!reduced) {
      observer.observe(canvas);
    }

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, [reduced]);

  return (
    <div className="viz">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Calls entering the engine and dropping out at each stage: deterministic signals, embedding recall, a structured LLM call, then a reasoning agent."
      />
      <div className="viz-labels" aria-hidden="true">
        {STAGES.map((stage) => (
          <span key={stage.label} style={{ left: stage.at }}>
            {stage.label}
          </span>
        ))}
      </div>
    </div>
  );
}
