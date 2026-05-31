"use client";

import { useState } from "react";
import { LabCard } from "@/components/cards";
import { automationLabs } from "@/data/labs";

export function LabsShowcase() {
  const [selectedId, setSelectedId] = useState(automationLabs[0]?.id ?? "");
  const selected = automationLabs.find((lab) => lab.id === selectedId) ?? automationLabs[0];

  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <div className="grid gap-5 md:grid-cols-2">
        {automationLabs.map((lab) => (
          <div key={lab.id} onMouseEnter={() => setSelectedId(lab.id)}>
            <LabCard
              lab={lab}
              action={
                <button
                  type="button"
                  onClick={() => setSelectedId(lab.id)}
                  className="mt-auto rounded-2xl bg-[linear-gradient(135deg,#c8fbff_0%,#7ce8ff_45%,#8d90ff_100%)] px-4 py-3 text-sm font-semibold text-slate-950"
                >
                  Start Lab
                </button>
              }
            />
          </div>
        ))}
      </div>

      <div className="glass-panel sticky top-28 h-fit rounded-[32px] p-6">
        <div className="font-display text-xs uppercase tracking-[0.24em] text-[var(--cyan)]/75">selected lab</div>
        <h3 className="mt-2 font-heading text-2xl font-semibold text-white">{selected.title}</h3>
        <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">{selected.summary}</p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <PanelItem label="Goal" value={selected.goal} />
          <PanelItem label="Deliverable" value={selected.deliverable} />
          <PanelItem label="Duration" value={selected.duration} />
          <PanelItem label="Steps" value={`${selected.steps}`} />
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {selected.tools.map((tool) => (
            <span key={tool} className="rounded-full border border-[var(--border-bright)] bg-[rgba(87,225,255,0.08)] px-3 py-1 text-xs text-[var(--cyan)]">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function PanelItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className="font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-soft)]">{label}</div>
      <div className="mt-2 text-sm leading-6 text-white">{value}</div>
    </div>
  );
}
