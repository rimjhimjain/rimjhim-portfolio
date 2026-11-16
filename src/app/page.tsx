import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { WorkReel } from "@/components/WorkReel";
import { Toolkit } from "@/components/Toolkit";
import { Proof } from "@/components/Proof";
import { Signoff } from "@/components/Signoff";
import { LightProvider } from "@/components/Flashlight";
import { EditorialMotion } from "@/components/EditorialMotion";

export default function Home() {
  return (
    <LightProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <Hero />
        <EditorialMotion>
          <WorkReel />
          <Toolkit />
          <Proof />
        </EditorialMotion>
      </main>
      <Signoff />
    </LightProvider>
  );
}
