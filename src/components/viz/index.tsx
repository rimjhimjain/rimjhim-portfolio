import type { VizKind } from "@/content/profile";
import { CascadeViz } from "./CascadeViz";
import { LoopViz } from "./LoopViz";
import { PipelineViz } from "./PipelineViz";
import { PlatformViz } from "./PlatformViz";
import { TickerViz } from "./TickerViz";
import { SmsViz } from "./SmsViz";
import { BillingViz } from "./BillingViz";

const REGISTRY: Record<VizKind, () => React.JSX.Element> = {
  cascade: CascadeViz,
  loop: LoopViz,
  pipeline: PipelineViz,
  platform: PlatformViz,
  ticker: TickerViz,
  sms: SmsViz,
  billing: BillingViz,
};

export function Viz({ kind }: { kind: VizKind }) {
  const Component = REGISTRY[kind];
  return <Component />;
}
