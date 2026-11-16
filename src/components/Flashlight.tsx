"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { MotionConfig } from "motion/react";

const LightContext = createContext({ lightsOn: true, toggle: () => {} });

export function LightProvider({ children }: { children: ReactNode }) {
  const [lightsOn, setLightsOn] = useState(true);
  return (
    <MotionConfig reducedMotion="user">
      <LightContext.Provider
        value={{ lightsOn, toggle: () => setLightsOn((value) => !value) }}
      >
        {children}
      </LightContext.Provider>
    </MotionConfig>
  );
}

export function LightSwitch() {
  const { lightsOn, toggle } = useContext(LightContext);
  return (
    <button
      className="light-switch"
      onClick={toggle}
      aria-pressed={!lightsOn}
      aria-label={
        lightsOn ? "Enable flashlight exploration" : "Turn on all lights"
      }
    >
      <span className="switch-track">
        <span />
      </span>
      <span>{lightsOn ? "Lights on" : "Torch on"}</span>
    </button>
  );
}

type FlashlightStyle = CSSProperties & {
  "--beam-size": string;
  "--darkness": number;
};

export function Flashlight({
  children,
  className = "",
  radius = 230,
  darkness = 0.91,
}: {
  children: ReactNode;
  className?: string;
  radius?: number;
  darkness?: number;
}) {
  const root = useRef<HTMLDivElement>(null);
  const { lightsOn } = useContext(LightContext);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const lowPower =
      navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 2;
    let frame = 0;
    let x = 0;
    let y = 0;
    const configure = () => {
      element.dataset.torch = String(
        !lightsOn && !preference.matches && !lowPower,
      );
    };
    const paint = () => {
      const rect = element.getBoundingClientRect();
      element.style.setProperty("--beam-x", `${x - rect.left}px`);
      element.style.setProperty("--beam-y", `${y - rect.top}px`);
      frame = 0;
    };
    const move = (event: PointerEvent) => {
      if (element.dataset.torch !== "true") return;
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    configure();
    preference.addEventListener("change", configure);
    element.addEventListener("pointermove", move, { passive: true });
    element.addEventListener("pointerdown", move, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      preference.removeEventListener("change", configure);
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerdown", move);
    };
  }, [lightsOn]);

  const style: FlashlightStyle = {
    "--beam-size": `${radius}px`,
    "--darkness": darkness,
  };
  return (
    <div ref={root} className={`flashlight ${className}`} style={style}>
      {children}
      <div className="flashlight-darkness" aria-hidden="true" />
    </div>
  );
}
