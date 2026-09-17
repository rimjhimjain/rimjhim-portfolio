import type { VizKind } from "@/content/profile";
import { CascadeViz } from "./CascadeViz";
import { LoopViz } from "./LoopViz";
import { PipelineViz } from "./PipelineViz";
import { PlatformViz } from "./PlatformViz";
import { TickerViz } from "./TickerViz";

const REGISTRY: Record<VizKind, () => React.JSX.Element> = {
  cascade: CascadeViz,
  loop: LoopViz,
  pipeline: PipelineViz,
  platform: PlatformViz,
  ticker: TickerViz,
};

export function Viz({ kind }: { kind: VizKind }) {
  const Component = REGISTRY[kind];
  return <Component />;
}
