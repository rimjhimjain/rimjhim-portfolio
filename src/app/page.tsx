import { SignalThread } from "@/components/SignalThread";
import { Hero } from "@/components/Hero";
import { ClaimLine } from "@/components/ClaimLine";
import { WorkReel } from "@/components/WorkReel";
import { Toolkit } from "@/components/Toolkit";
import { Proof } from "@/components/Proof";
import { Signoff } from "@/components/Signoff";

export default function Home() {
  return (
    <>
      <SignalThread />
      <main>
        <Hero />
        <ClaimLine />
        <WorkReel />
        <Toolkit />
        <Proof />
      </main>
      <Signoff />
    </>
  );
}
