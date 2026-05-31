"use client";

import Link from "next/link";
import { useState } from "react";
import { SaveIcon, SparkIcon } from "@/components/icons";
import { HeroWorkflowCanvas } from "@/components/workflow-canvas";
import { generateWorkflow } from "@/lib/generator";
import { saveGeneratedWorkflow } from "@/lib/storage";
import { formatDate } from "@/lib/utils";
import type { GeneratedWorkflow } from "@/types";

const defaultPrompt =
  "أريد إرسال رسالة واتساب تلقائية لكل طالب بعد إنهاء الاختبار مع تحديث Google Sheets وإرسال نسخة للبريد.";

export function GeneratorStudio({ compact = false }: { compact?: boolean }) {
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [workflow, setWorkflow] = useState<GeneratedWorkflow | null>(null);
  const [notice, setNotice] = useState("");

  function handleGenerate() {
    const next = generateWorkflow(prompt);
    setWorkflow(next);
    setNotice("تم توليد Workflow تجريبي قابل للحفظ والتطوير.");
  }

  function handleSave() {
    const next = workflow ?? generateWorkflow(prompt);
    saveGeneratedWorkflow(next);
    setWorkflow(next);
    setNotice("تم حفظ الفكرة داخل لوحة التحكم.");
  }

  const active = workflow ?? generateWorkflow(defaultPrompt);

  return (
    <div className={`grid gap-6 ${compact ? "xl:grid-cols-[1.1fr_1fr]" : "xl:grid-cols-[0.95fr_1.1fr]"}`}>
      <div className="glass-panel rounded-[32px] p-6 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="font-display text-xs uppercase tracking-[0.24em] text-[var(--cyan)]/75">AI Generator</div>
            <h3 className="mt-2 font-heading text-2xl font-semibold text-white">مولد الأتمتة بالذكاء الاصطناعي</h3>
          </div>
        </div>
        <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
          اكتب ما تريد أتمتته... مثال: أريد إرسال رسالة واتساب تلقائية لكل طالب بعد إنهاء الاختبار
        </p>
        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          className="mt-5 h-40 w-full rounded-[24px] border border-white/10 bg-[rgba(5,10,18,0.82)] p-4 text-sm leading-7 text-white outline-none ring-0 placeholder:text-[var(--text-soft)] focus:border-[var(--border-bright)]"
          placeholder="اكتب ما تريد أتمتته..."
        />
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <button
            type="button"
            onClick={handleGenerate}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#c8fbff_0%,#7ce8ff_45%,#8d90ff_100%)] px-5 text-sm font-semibold text-slate-950"
          >
            <SparkIcon className="h-4 w-4" />
            ولّد Workflow
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 text-sm font-semibold text-white transition hover:border-[var(--border-bright)]"
          >
            <SaveIcon className="h-4 w-4" />
            احفظ الفكرة
          </button>
          <Link
            href="/services"
            className="inline-flex h-12 items-center justify-center rounded-2xl border border-[rgba(244,198,114,0.28)] bg-[rgba(244,198,114,0.1)] px-5 text-sm font-semibold text-[var(--gold)]"
          >
            اطلب تنفيذها
          </Link>
        </div>
        {notice ? (
          <div className="mt-4 rounded-2xl border border-[rgba(87,225,255,0.24)] bg-[rgba(87,225,255,0.08)] px-4 py-3 text-sm text-[var(--cyan)]">
            {notice}
          </div>
        ) : null}
      </div>

      <div className="glass-panel rounded-[32px] p-6 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="font-display text-xs uppercase tracking-[0.24em] text-[var(--cyan)]/75">Generated Output</div>
            <h3 className="mt-2 font-heading text-2xl font-semibold text-white">{active.recommendedTemplate}</h3>
          </div>
          <span className="rounded-full border border-white/10 px-3 py-2 text-xs text-[var(--text-soft)]">
            {formatDate(active.savedAt)}
          </span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Info label="Suggested trigger" value={active.trigger} />
          <Info label="Complexity" value={active.complexity} />
          <Info label="Estimated setup" value={active.setupTime} />
          <Info label="Recommended template" value={active.recommendedTemplate} />
        </div>

        <div className="mt-5">
          <div className="font-display text-xs uppercase tracking-[0.22em] text-[var(--text-soft)]">Required apps</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {active.requiredApps.map((app) => (
              <span key={app} className="rounded-full border border-[var(--border-bright)] bg-[rgba(87,225,255,0.1)] px-3 py-1 text-xs text-[var(--cyan)]">
                {app}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div className="font-display text-xs uppercase tracking-[0.22em] text-[var(--text-soft)]">Workflow steps</div>
          {active.steps.map((step, index) => (
            <div key={step} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[rgba(87,225,255,0.12)] font-display text-sm font-bold text-[var(--cyan)]">
                {index + 1}
              </div>
              <p className="text-sm leading-7 text-[var(--text-muted)]">{step}</p>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <div className="font-display text-xs uppercase tracking-[0.22em] text-[var(--text-soft)]">Required permissions</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {active.permissions.map((permission) => (
              <span key={permission} className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--text-muted)]">
                {permission}
              </span>
            ))}
          </div>
        </div>

        {!compact ? <div className="mt-6"><HeroWorkflowCanvas compact /></div> : null}
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className="font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-soft)]">{label}</div>
      <div className="mt-2 text-sm leading-6 text-white">{value}</div>
    </div>
  );
}
