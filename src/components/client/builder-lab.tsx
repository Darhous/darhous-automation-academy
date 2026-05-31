"use client";

import { useMemo, useState } from "react";
import { GradientButton, GlassCard, StatusBadge } from "@/components/ui";
import { workflowSamples } from "@/data/workflowSamples";
import type { NodeType, WorkflowNode, WorkflowSample } from "@/types";

const nodeLibrary: Array<{ label: string; type: NodeType; app: string; description: string }> = [
  { label: "Webhook Trigger", type: "Trigger", app: "Webhook", description: "استقبال حدث لحظي من نظام خارجي." },
  { label: "Email Action", type: "Action", app: "Gmail", description: "إرسال بريد أو إخطار." },
  { label: "Approval Gate", type: "Approval", app: "Manager", description: "إضافة موافقة بشرية قبل المتابعة." },
  { label: "Delay Window", type: "Delay", app: "Calendar", description: "انتظار فترة قبل الخطوة التالية." },
  { label: "Data Mapping", type: "Data Transform", app: "Google Sheets", description: "تنظيف أو ترتيب الحقول." },
  { label: "Error Monitor", type: "Error Handler", app: "Slack", description: "مسار خاص للأخطاء والتنبيهات." },
  { label: "AI Classification", type: "AI Step", app: "AI Model", description: "تصنيف أو تلخيص أو scoring." },
  { label: "Condition Router", type: "Condition", app: "Rules", description: "التفرع حسب القيم أو الحالات." },
];

export function BuilderLab({ compact = false }: { compact?: boolean }) {
  const [sampleId, setSampleId] = useState(workflowSamples[0].id);
  const [selectedNodeId, setSelectedNodeId] = useState(workflowSamples[0].nodes[0].id);
  const [logs, setLogs] = useState<string[]>(["جاهز لفحص workflow الحالي."]);
  const [canvasNodes, setCanvasNodes] = useState<WorkflowNode[]>(workflowSamples[0].nodes);
  const [libraryIndex, setLibraryIndex] = useState(0);

  const activeSample = useMemo(
    () => workflowSamples.find((sample) => sample.id === sampleId) ?? workflowSamples[0],
    [sampleId],
  );

  const selectedNode = useMemo(
    () => canvasNodes.find((node) => node.id === selectedNodeId) ?? canvasNodes[0],
    [canvasNodes, selectedNodeId],
  );

  function switchSample(sample: WorkflowSample) {
    setSampleId(sample.id);
    setCanvasNodes(sample.nodes);
    setSelectedNodeId(sample.nodes[0]?.id ?? "");
    setLogs([`تم تحميل workflow: ${sample.title}`, "جاهز لفحص workflow الحالي."]);
  }

  function addLibraryNode() {
    const candidate = nodeLibrary[libraryIndex % nodeLibrary.length];
    const nextNode: WorkflowNode = {
      id: `${candidate.type}-${Date.now()}`,
      label: candidate.label,
      type: candidate.type,
      app: candidate.app,
      description: candidate.description,
    };
    setCanvasNodes((current) => [...current, nextNode]);
    setSelectedNodeId(nextNode.id);
    setLibraryIndex((value) => value + 1);
    setLogs((current) => [`تمت إضافة node جديدة: ${nextNode.label}`, ...current].slice(0, 6));
  }

  function runTest() {
    setLogs([
      `Trigger fired: ${activeSample.trigger}`,
      `Nodes validated: ${canvasNodes.length}`,
      `Selected node checked: ${selectedNode.label}`,
      "Data mapping passed with demo payload.",
      "Execution finished with status: success",
    ]);
  }

  function resetCanvas() {
    switchSample(activeSample);
  }

  return (
    <div className={`grid gap-6 ${compact ? "xl:grid-cols-[1fr_1fr]" : "xl:grid-cols-[0.82fr_1.28fr_0.9fr]"}`}>
      <GlassCard className="space-y-5">
        <div>
          <div className="font-display text-xs uppercase tracking-[0.24em] text-[var(--cyan)]/75">Node Library</div>
          <h3 className="mt-2 font-heading text-xl font-semibold text-white">مكتبة العقد والعينات</h3>
        </div>

        <div className="space-y-3">
          {workflowSamples.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => switchSample(sample)}
              className={`w-full rounded-[22px] border px-4 py-4 text-right transition ${
                sample.id === activeSample.id
                  ? "border-[var(--border-bright)] bg-[rgba(87,225,255,0.12)]"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              <div className="font-semibold text-white">{sample.title}</div>
              <div className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{sample.overview}</div>
            </button>
          ))}
        </div>

        {!compact ? (
          <div className="space-y-3">
            <div className="text-sm font-semibold text-white">Node Library</div>
            <div className="grid gap-3">
              {nodeLibrary.map((node) => (
                <div key={node.label} className="rounded-[20px] border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-semibold text-white">{node.label}</div>
                    <StatusBadge tone="violet">{node.type}</StatusBadge>
                  </div>
                  <div className="mt-2 text-sm text-[var(--text-muted)]">{node.description}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </GlassCard>

      <GlassCard className="space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="font-display text-xs uppercase tracking-[0.24em] text-[var(--cyan)]/75">Workflow Canvas</div>
            <h3 className="mt-2 font-heading text-2xl font-semibold text-white">{activeSample.title}</h3>
            <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{activeSample.overview}</p>
          </div>
          <div className="flex gap-2">
            <GradientButton onClick={addLibraryNode} variant="secondary">
              Add node
            </GradientButton>
            <GradientButton onClick={runTest}>Run test</GradientButton>
            <GradientButton onClick={resetCanvas} variant="ghost">
              Reset
            </GradientButton>
          </div>
        </div>

        <div className="soft-grid rounded-[30px] border border-white/10 bg-[rgba(6,10,19,0.82)] p-5">
          <div className="grid gap-4 lg:grid-cols-2">
            {canvasNodes.map((node, index) => (
              <button
                key={node.id}
                type="button"
                onClick={() => setSelectedNodeId(node.id)}
                className={`relative rounded-[24px] border p-5 text-right transition ${
                  node.id === selectedNode?.id
                    ? "border-[var(--border-bright)] bg-[rgba(87,225,255,0.12)]"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-display text-xs uppercase tracking-[0.22em] text-[var(--cyan)]/75">{node.app}</div>
                    <div className="mt-2 font-heading text-lg font-semibold text-white">{node.label}</div>
                  </div>
                  <StatusBadge tone={node.type === "Approval" || node.type === "Error Handler" ? "gold" : node.type === "AI Step" ? "violet" : "cyan"}>
                    {node.type}
                  </StatusBadge>
                </div>
                <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{node.description}</p>
                {index < canvasNodes.length - 1 ? (
                  <div className="marching-line absolute -bottom-2 right-1/2 hidden h-px w-16 translate-x-1/2 bg-[rgba(87,225,255,0.3)] lg:block" />
                ) : null}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <InfoPanel title="Required Apps" items={activeSample.requiredApps} />
          <InfoPanel title="Expected Data" items={activeSample.expectedData} />
          {!compact ? <InfoPanel title="Possible Errors" items={activeSample.possibleErrors} /> : null}
          {!compact ? <InfoPanel title="Test Plan" items={activeSample.testPlan} /> : null}
        </div>
      </GlassCard>

      <GlassCard className="space-y-5">
        <div>
          <div className="font-display text-xs uppercase tracking-[0.24em] text-[var(--cyan)]/75">Explain this workflow</div>
          <h3 className="mt-2 font-heading text-2xl font-semibold text-white">شرح المسار بالعربية</h3>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
          <div className="text-xs text-[var(--text-soft)]">الخطوة المحددة</div>
          <div className="mt-2 font-heading text-xl font-semibold text-white">{selectedNode?.label}</div>
          <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{selectedNode?.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <StatusBadge tone="cyan">{selectedNode?.app}</StatusBadge>
            <StatusBadge tone="violet">{selectedNode?.type}</StatusBadge>
          </div>
        </div>

        <div className="rounded-[24px] border border-[rgba(244,198,114,0.24)] bg-[rgba(244,198,114,0.08)] p-4 text-sm leading-7 text-[var(--text-muted)]">
          {activeSample.explanation}
        </div>

        <div className="space-y-3">
          <div className="font-heading text-lg font-semibold text-white">Logs Panel</div>
          {logs.map((log) => (
            <div key={log} className="rounded-2xl border border-white/8 bg-[rgba(255,255,255,0.03)] px-4 py-3 text-sm text-[var(--text-muted)]">
              {log}
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

function InfoPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <div className="font-heading text-lg font-semibold text-white">{title}</div>
      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <div key={item} className="rounded-2xl border border-white/8 bg-[rgba(255,255,255,0.03)] px-4 py-3 text-sm leading-7 text-[var(--text-muted)]">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
