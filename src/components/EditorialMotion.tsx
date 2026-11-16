"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function EditorialMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils
          .toArray<HTMLElement>(".chapter-heading")
          .forEach((heading) =>
            gsap.from(heading, {
              y: 28,
              opacity: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: { trigger: heading, start: "top 90%", once: true },
            }),
          );
        gsap.from(".about-portrait", {
          clipPath: "inset(0 0 100% 0)",
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".about-portrait",
            start: "top 85%",
            once: true,
          },
        });
      });
      return () => media.revert();
    },
    { scope: root },
  );
  return <div ref={root}>{children}</div>;
}
