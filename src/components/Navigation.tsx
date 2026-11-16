"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { LightSwitch } from "./Flashlight";

const chapters = [
  { id: "subject", title: "Subject" },
  { id: "work", title: "Workbench" },
  { id: "toolkit", title: "Toolkit" },
  { id: "record", title: "Record" },
  { id: "contact", title: "Collaborate" },
];

export function Navigation() {
  const [active, setActive] = useState("subject");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries.find((item) => item.isIntersecting);
        if (entry) setActive(entry.target.id);
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    chapters.forEach(({ id }) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <header className="site-header">
      <a
        className="monogram"
        href="#subject"
        aria-label="Rimjhim Jain, back to introduction"
      >
        R<span>•</span>J
      </a>
      <nav aria-label="Portfolio chapters">
        {chapters.map((chapter, index) => (
          <motion.a
            key={chapter.id}
            href={`#${chapter.id}`}
            aria-current={active === chapter.id ? "location" : undefined}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            <span className="nav-number">0{index + 1}</span>
            {chapter.title}
          </motion.a>
        ))}
      </nav>
      <LightSwitch />
    </header>
  );
}
