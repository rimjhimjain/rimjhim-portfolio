import { links } from "@/content/profile";

export function Signoff() {
  return (
    <footer className="signoff">
      <div className="wrap">
        <p className="kicker">Hiring, or want to talk through any of the above?</p>
        <a className="mail" href={`mailto:${links.email}`}>
          {links.email}
        </a>
        <div className="signoff-links">
          <a href={links.github} target="_blank" rel="noopener noreferrer">
            {links.githubLabel}
          </a>
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
            {links.linkedinLabel}
          </a>
          <a href={links.phoneHref}>{links.phone}</a>
        </div>
        <p className="colophon">
          Built by hand. Archivo and Newsreader, a spectrogram palette, and one signal running the length of the page.
        </p>
      </div>
    </footer>
  );
}
