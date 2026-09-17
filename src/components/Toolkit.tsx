import { toolkit } from "@/content/profile";
import type { CSSProperties } from "react";

/** Skill clusters as spectrogram bands. Colour is the encoding: each band
 *  sits at its own point on the ramp, so a chip's tint names its cluster. */
export function Toolkit() {
  return (
    <section className="act">
      <div className="wrap">
        <h2 className="section-title">The toolkit</h2>
        <p className="section-lede">Grouped by what I reach for them to do, not by how long the list is.</p>

        {toolkit.map((band) => (
          <div key={band.name} className="band" style={{ "--c": band.colour } as CSSProperties}>
            <p className="band-name">{band.name}</p>
            <ul className="chips">
              {band.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
