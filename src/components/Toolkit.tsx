import { toolkit } from "@/content/profile";
import { Chapter } from "./Chapter";

export function Toolkit() {
  return (
    <section id="toolkit" className="toolkit-section wrap section-space">
      <Chapter number="03" label="The toolkit" title="A toolkit, put to work." />
      <div className="toolkit-layout">
        <p className="toolkit-intro">
          Start with the
          <br />
          problem. Choose
          <br />
          the tool after.
          <span>
            From a clear interface to the services and models behind it, I work
            across the whole system.
          </span>
        </p>
        <div>
          {toolkit.map((band) => (
            <div className="skill-row" key={band.name}>
              <h3>{band.name}</h3>
              <ul>
                {band.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
