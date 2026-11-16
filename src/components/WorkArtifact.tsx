import type { VizKind } from "@/content/profile";

export function WorkArtifact({ kind }: { kind: VizKind }) {
  switch (kind) {
    case "platform":
      return (
        <div className="artifact artifact-platform" aria-hidden="true">
          <div className="console-window">
            <div className="console-bar">
              <span className="console-dots">● ● ●</span>
              <span>Voice workspace / Interface study</span>
              <span>↗</span>
            </div>
            <div className="console-body">
              <div className="console-sidebar">
                <b>
                  Workspace<span>✳</span>
                </b>
                <span>Overview</span>
                <span className="console-selected">Automations</span>
                <span>Campaigns</span>
                <span>Conversations</span>
                <span>Billing</span>
              </div>
              <div className="console-canvas">
                <div className="console-caption">
                  <span>From hello to follow-through.</span>
                  <span className="console-pill">Workflow builder</span>
                </div>
                <div className="workflow-scene">
                  <span className="flow-node node-call">
                    ↗<b>Call completed</b>
                  </span>
                  <span className="flow-thread" />
                  <span className="flow-node node-decision">
                    ✳<b>Find the outcome</b>
                  </span>
                  <div className="flow-branches">
                    <span className="flow-node">
                      ↳<b>Update the CRM</b>
                    </span>
                    <span className="flow-node">
                      ↳<b>Send a follow-up</b>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span className="artifact-note platform-note">
            the glue between
            <br />
            AI & everyday work
          </span>
        </div>
      );
    case "sms":
      return (
        <div className="artifact artifact-sms" aria-hidden="true">
          <div className="message-phone">
            <span className="phone-island" />
            <span className="phone-title">A conversation, continued.</span>
            <div className="bubble bubble-out">
              Hi! Ready for the next step?
            </div>
            <div className="bubble bubble-in">Yes. Tell me more.</div>
            <div className="bubble bubble-out bubble-last">
              Let me pick up where we left off.
            </div>
            <div className="typing">
              <i />
              <i />
              <i />
            </div>
            <span className="phone-input">
              Message <span>↑</span>
            </span>
          </div>
          <span className="message-stamp">
            context
            <br />
            included ↗
          </span>
        </div>
      );
    case "cascade":
      return (
        <div className="artifact artifact-cascade" aria-hidden="true">
          <div className="decision-disc">
            <span className="disc-orbit" />
            <span className="decision-center">
              A call.
              <br />
              <em>A clear outcome.</em>
            </span>
            <span className="decision-label label-rules">01 / Rules</span>
            <span className="decision-label label-recall">02 / Recall</span>
            <span className="decision-label label-reason">03 / Reason</span>
          </div>
          <span className="artifact-note">
            use the simplest
            <br />
            answer that works.
          </span>
        </div>
      );
    case "billing":
      return (
        <div className="artifact artifact-billing" aria-hidden="true">
          <div className="billing-receipt">
            <span className="receipt-mark">s.</span>
            <span className="mono">Runtime configuration</span>
            <strong>
              Ready when
              <br />
              you are.
            </strong>
            <div className="receipt-row">
              <span>Test keys</span>
              <b>Saved</b>
            </div>
            <div className="receipt-row">
              <span>Live keys</span>
              <b>Encrypted</b>
            </div>
            <div className="receipt-row">
              <span>Redeploy needed</span>
              <b>Nope.</b>
            </div>
            <span className="receipt-barcode" />
            <span className="receipt-bottom mono">
              Stripe / Account switching
            </span>
          </div>
          <span className="billing-seal">
            test
            <br />
            <span>↗</span>
            <br />
            live
          </span>
        </div>
      );
    case "loop":
      return (
        <div className="artifact artifact-loop" aria-hidden="true">
          <div className="learning-ring">
            <span className="loop-petal petal-one" />
            <span className="loop-petal petal-two" />
            <span className="loop-petal petal-three" />
            <span className="loop-center">
              learn.
              <br />
              check.
              <br />
              <em>repeat.</em>
            </span>
          </div>
          <span className="loop-note">
            Human feedback,
            <br />
            built into the loop.
          </span>
        </div>
      );
    case "pipeline":
      return (
        <div className="artifact artifact-pipeline" aria-hidden="true">
          <div className="pipeline-ticket">
            <span className="mono">Incoming event</span>
            <strong>call.ended</strong>
            <span className="pipeline-track" />
            <div className="worker-tickets">
              <span>
                01<b>Outcome</b>
                <i>↗</i>
              </span>
              <span>
                02<b>Sentiment</b>
                <i>↗</i>
              </span>
              <span>
                03<b>Voicemail</b>
                <i>↗</i>
              </span>
            </div>
            <span className="pipeline-caption mono">
              Haskell → Redis → independent workers
            </span>
          </div>
        </div>
      );
    case "ticker":
      return (
        <div className="artifact artifact-ticker" aria-hidden="true">
          <div className="ticker-sheet">
            <span className="mono">Market watch / Illustration</span>
            <div className="ticker-bars">
              {[32, 48, 38, 61, 45, 68, 57, 78, 66, 90, 80, 100].map(
                (height, index) => (
                  <i key={index} style={{ height: `${height}%` }} />
                ),
              )}
            </div>
            <span className="ticker-label">
              <b>Always in motion.</b>
              <span>↗</span>
            </span>
          </div>
        </div>
      );
  }
}
