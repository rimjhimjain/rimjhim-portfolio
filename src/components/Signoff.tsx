"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import {
  AnimatePresence,
  motion,
} from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { SignalObject } from "./SignalObject";
import { links } from "@/content/profile";

function ContactOverlay({
  onDismiss,
  focusRef,
}: {
  onDismiss: () => void;
  focusRef: RefObject<HTMLButtonElement | null>;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const returnFocus = focusRef.current;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      if (returnFocus instanceof HTMLElement)
        returnFocus.focus({ preventScroll: true });
    };
  }, [focusRef]);
  return (
    <motion.dialog
      ref={dialog}
      className="contact-dialog"
      initial={{ opacity: 0, scale: 0.86, y: 45, borderRadius: 70 }}
      animate={{ opacity: 1, scale: 1, y: 0, borderRadius: 2 }}
      exit={{ opacity: 0, scale: 0.94, y: 18 }}
      transition={{ duration: reduced ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
      aria-labelledby="contact-title"
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = event.currentTarget.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex="0"]',
        );
        const first = controls.item(0);
        const last = controls.item(controls.length - 1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        onDismiss();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onDismiss();
      }}
    >
      <div className="contact-panel">
        <div className="dialog-topline">
          <span className="mono">The next chapter / Together</span>
          <motion.button
            className="close-dialog"
            aria-label="Close contact overlay"
            onClick={() => onDismiss()}
            whileHover={{ rotate: 90 }}
            autoFocus
          >
            ×
          </motion.button>
        </div>
        <h2 id="contact-title">
          Let&apos;s make
          <br />
          something work.
        </h2>
        <p>Tell me what you have in mind.</p>
        <a className="contact-email" href={`mailto:${links.email}`}>
          {links.email}
        </a>
        <div className="contact-socials">
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn ↗
          </a>
          <a href={links.github} target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
          <a
            href="/Rimjhim_Jain_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume ↗
          </a>
          <a href={links.phoneHref}>Call ↗</a>
        </div>
        <motion.a
          className="project-cta"
          href={`mailto:${links.email}?subject=Let's%20start%20a%20project`}
          whileHover={{ x: 3 }}
          whileTap={{ scale: 0.98 }}
        >
          Start a Project <span aria-hidden="true">↗</span>
        </motion.a>
      </div>
    </motion.dialog>
  );
}

export function Signoff() {
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const reduced = usePrefersReducedMotion();

  return (
    <footer id="contact" className="collaborate-section">
      <div className="collaborate-layout wrap">
        <div className="collaborate-copy">
          <div className="chapter-label mono">05 / The next chapter</div>
          <h2>
            Bring me
            <br />
            the hard part.
          </h2>
          <p>
            Architecture, edge cases, production polish.
            <br />
            Let&apos;s make it work for the people using it.
          </p>
          <motion.button
            ref={trigger}
            className="collaborate-link"
            aria-haspopup="dialog"
            onClick={() => setOpen(true)}
            whileHover={reduced ? undefined : { x: 5 }}
            whileTap={reduced ? undefined : { scale: 0.98 }}
          >
            Start a conversation <span aria-hidden="true">↗</span>
          </motion.button>
        </div>
        <div className="signal-stage">
          <div className="signal-stage-label mono">
            <span>Signal / 01—03</span>
            <span>AI · systems · people</span>
          </div>
          <SignalObject />
          <div className="signal-orbit-label signal-orbit-label-top mono">INPUT</div>
          <div className="signal-orbit-label signal-orbit-label-right mono">REASONING</div>
          <div className="signal-orbit-label signal-orbit-label-bottom mono">OUTCOME</div>
        </div>
      </div>
      <div className="footer-bottom wrap">
        <a
          className="monogram"
          href="#subject"
          aria-label="Rimjhim Jain, back to top"
        >
          R<span>•</span>J
        </a>
        <span className="mono">Rimjhim Jain / Software & AI engineer</span>
        <a href={`mailto:${links.email}`}>{links.email}</a>
        <a href="#subject">Back to top ↑</a>
      </div>
      <AnimatePresence>
        {open && (
          <ContactOverlay
            key="contact"
            focusRef={trigger}
            onDismiss={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </footer>
  );
}
