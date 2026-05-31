"use client";

import { useMemo, useState } from "react";
import { PlusIcon, PlayIcon, RefreshIcon } from "@/components/icons";
import type { WorkflowNode } from "@/types";

const appSidebar = ["Gmail", "Google Sheets", "Google Forms", "WhatsApp", "Telegram", "Notion", "Airtable", "Slack", "CRM", "Webhook", "AI Model", "PDF Generator", "Calendar", "Database"];

const seedNodes: WorkflowNode[] = [
  { id: "node-trigger", label: "New Submission", type: "Trigger", app: "Google Forms", description: "استلام trigger جديد من نموذج." },
  { id: "node-filter", label: "Check Score", type: "Condition", app: "AI Model", description: "تقييم الشرط أو التصنيف المطلوب." },
  { id: "node-action", label: "Send Notification", type: "Notification", app: "WhatsApp", description: "إرسال الإشعار للمستخدم أو الفريق." },
];

const addableNodes: WorkflowNode[] = [
  { id: "sample-action", label: "Update Record", type: "Action", app: "Google Sheets", description: "تحديث السجل الأساسي." },
  { id: "sample-delay", label: "Wait 1 Hour", type: "Delay", app: "Calendar", description: "تأخير قبل المتابعة." },
  { id: "sample-webhook", label: "Webhook Push", type: "Webhook", app: "Webhook", description: "إرسال البيانات لنظام خارجي." },
  { id: "sample-loop", label: "Loop Contacts", type: "Loop", app: "CRM", description: "تكرار المعالجة على مجموعة عناصر." },
];

export function BuilderLab({ compact = false }: { compact?: boolean }) {
  const [nodes, setNodes] = useState<WorkflowNode[]>(seedNodes);
  const [selectedId, setSelectedId] = useState(seedNodes[0].id);
  const [logs, setLogs] = useState<string[]>(["جاهز لتشغيل اختبار workflow."]);
  const [addIndex, setAddIndex] = useState(0);

  const selectedNode = useMemo(
    () => nodes.find((node) => node.id === selectedId) ?? nodes[0],
    [nodes, selectedId],
  );

  function handleAddNode() {
    const sample = addableNodes[addIndex % addableNodes.length];
    const nextNode = { ...sample, id: `${sample.id}-${Date.now()}` };
    setNodes((current) => [...current, nextNode]);
    setSelectedId(nextNode.id);
    setAddIndex((value) => value + 1);
    setLogs((current) => [`تمت إضافة node جديدة: ${nextNode.label}`, ...current].slice(0, 8));
  }

  function handleRunTest() {
    const nextLogs = [
      `Trigger started from ${nodes[0]?.app ?? "source"}`,
      `Validated ${nodes.length} nodes in sequence`,
      `Latest selected node: ${selectedNode.label}`,
      "Execution completed with demo status: success",
    ];
    setLogs(nextLogs);
  }

  function handleReset() {
    setNodes(seedNodes);
    setSelectedId(seedNodes[0].id);
    setLogs(["تمت إعادة ضبط اللوحة إلى الحالة الأساسية."]);
  }

  return (
    <div className={`grid gap-6 ${compact ? "" : "xl:grid-cols-[0.9fr_1.4fr_0.9fr]"}`}>
      <div className="glass-panel rounded-[32px] p-5">
        <div className="font-display text-xs uppercase tracking-[0.24em] text-[var(--cyan)]/75">apps</div>
        <div className="mt-4 flex flex-wrap gap-2">
          {appSidebar.map((app) => (
            <button
              key={app}
              type="button"
              onClick={() => setLogs((current) => [`تم اختيار app من الشريط الجانبي: ${app}`, ...current].slice(0, 8))}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-[var(--text-muted)] transition hover:border-[var(--border-bright)] hover:text-white"
            >
              {app}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-panel rounded-[32px] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-display text-xs uppercase tracking-[0.24em] text-[var(--cyan)]/75">workflow canvas</div>
            <h3 className="mt-2 font-heading text-xl font-semibold text-white">معمل بناء الـ Workflows</h3>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={handleAddNode} className="inline-flex h-11 items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm font-semibold text-white transition hover:border-[var(--border-bright)]">
              <PlusIcon className="h-4 w-4" />
              Add node
            </button>
            <button type="button" onClick={handleRunTest} className="inline-flex h-11 items-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#c8fbff_0%,#7ce8ff_45%,#8d90ff_100%)] px-4 text-sm font-semibold text-slate-950">
              <PlayIcon className="h-4 w-4" />
              Run test
            </button>
            <button type="button" onClick={handleReset} className="inline-flex h-11 items-center gap-2 rounded-2xl border border-[rgba(244,198,114,0.3)] bg-[rgba(244,198,114,0.1)] px-4 text-sm font-semibold text-[var(--gold)]">
              <RefreshIcon className="h-4 w-4" />
              Reset
            </button>
          </div>
        </div>

        <div className="mt-5 space-y-4 rounded-[28px] border border-white/10 bg-[rgba(6,10,19,0.82)] p-5">
          {nodes.map((node, index) => (
            <button
              key={node.id}
              type="button"
              onClick={() => setSelectedId(node.id)}
              className={`relative w-full rounded-[24px] border p-4 text-right transition ${
                selectedId === node.id
                  ? "border-[var(--border-bright)] bg-[rgba(87,225,255,0.08)] shadow-[0_0_25px_rgba(18,198,255,0.14)]"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-display text-xs uppercase tracking-[0.22em] text-[var(--cyan)]/75">{node.type}</div>
                  <div className="mt-2 font-heading text-lg font-semibold text-white">{node.label}</div>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{node.description}</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/8 font-display text-sm font-bold text-white">
                  {node.app.slice(0, 2)}
                </div>
              </div>
              {index < nodes.length - 1 ? (
                <div className="absolute right-8 top-full h-4 w-px bg-[rgba(87,225,255,0.25)]" />
              ) : null}
            </button>
          ))}
        </div>

        {!compact ? (
          <div className="mt-5 rounded-[24px] border border-white/10 bg-white/5 p-4">
            <div className="font-display text-xs uppercase tracking-[0.22em] text-[var(--text-soft)]">Execution logs</div>
            <div className="mt-3 space-y-2">
              {logs.map((log) => (
                <div key={log} className="rounded-2xl border border-white/10 bg-[rgba(7,12,21,0.82)] px-3 py-2 text-sm text-[var(--text-muted)]">
                  {log}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {!compact ? (
        <div className="space-y-6">
          <div className="glass-panel rounded-[32px] p-5">
            <div className="font-display text-xs uppercase tracking-[0.24em] text-[var(--cyan)]/75">Node settings</div>
            <h3 className="mt-2 font-heading text-xl font-semibold text-white">{selectedNode.label}</h3>
            <div className="mt-5 space-y-3">
              <Setting label="Type" value={selectedNode.type} />
              <Setting label="App" value={selectedNode.app} />
              <Setting label="Description" value={selectedNode.description} />
              <Setting label="Mode" value="Demo preview / future schema mapping" />
            </div>
          </div>

          <div className="glass-panel rounded-[32px] p-5">
            <div className="font-display text-xs uppercase tracking-[0.24em] text-[var(--cyan)]/75">Logs panel</div>
            <div className="mt-4 space-y-2">
              {logs.map((log, index) => (
                <div key={`${log}-${index}`} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-[var(--text-muted)]">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Setting({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className="font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-soft)]">{label}</div>
      <div className="mt-2 text-sm leading-6 text-white">{value}</div>
    </div>
  );
}
