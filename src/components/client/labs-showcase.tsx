"use client";

import { useState } from "react";
import { LabCard } from "@/components/cards";
import { GlassCard, GradientButton, StatusBadge } from "@/components/ui";
import { automationLabsV2 } from "@/data/automationLabsV2";

export function LabsShowcase({ compact = false }: { compact?: boolean }) {
  const [selectedId, setSelectedId] = useState(automationLabsV2[0]?.id ?? "");
  const selected = automationLabsV2.find((lab) => lab.id === selectedId) ?? automationLabsV2[0];
  const visibleLabs = compact ? automationLabsV2.slice(0, 4) : automationLabsV2;

  return (
    <div className={`grid gap-6 ${compact ? "" : "xl:grid-cols-[1.15fr_0.85fr]"}`}>
      <div className="grid gap-5 md:grid-cols-2">
        {visibleLabs.map((lab) => (
          <div key={lab.id} onMouseEnter={() => setSelectedId(lab.id)}>
            <LabCard
              lab={lab}
              action={
                <div className="grid gap-2 sm:grid-cols-2">
                  <GradientButton onClick={() => setSelectedId(lab.id)} className="w-full">
                    Start Lab
                  </GradientButton>
                  <GradientButton href="/builder" variant="secondary" className="w-full">
                    افتح المعمل
                  </GradientButton>
                </div>
              }
            />
          </div>
        ))}
      </div>

      {!compact ? (
        <GlassCard className="sticky top-28 h-fit space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="font-display text-xs uppercase tracking-[0.24em] text-[var(--cyan)]/75">Selected Lab</div>
              <h3 className="mt-2 font-heading text-2xl font-semibold text-white">{selected.title}</h3>
            </div>
            <StatusBadge tone={selected.level === "متقدم" ? "gold" : selected.level === "متوسط" ? "cyan" : "green"}>
              {selected.level}
            </StatusBadge>
          </div>

          <p className="text-sm leading-7 text-[var(--text-muted)]">{selected.scenario}</p>

          <div className="grid gap-3 sm:grid-cols-2">
            <MiniStat label="Objective" value={selected.objective} />
            <MiniStat label="Expected Output" value={selected.expectedOutput} />
            <MiniStat label="Duration" value={selected.duration} />
            <MiniStat label="Steps" value={`${selected.steps.length}`} />
          </div>

          <SectionBlock title="الأدوات" items={selected.tools} />
          <SectionBlock title="الخطوات" items={selected.steps} />
          <SectionBlock title="الأخطاء الشائعة" items={selected.commonMistakes} />
          <SectionBlock title="Checklist الإكمال" items={selected.completionChecklist} />

          <div className="rounded-[24px] border border-[rgba(244,198,114,0.24)] bg-[rgba(244,198,114,0.08)] p-4 text-sm leading-7 text-[var(--gold)]">
            Challenge Task: {selected.challengeTask}
          </div>
        </GlassCard>
      ) : null}
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
      <div className="text-xs text-[var(--text-soft)]">{label}</div>
      <div className="mt-2 text-sm leading-7 text-white">{value}</div>
    </div>
  );
}

function SectionBlock({ title, items }: { title: string; items: string[] }) {
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
