"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { HeroWorkflowCanvas } from "@/components/workflow-canvas";
import { GradientButton, GlassCard, StatusBadge } from "@/components/ui";
import { generateWorkflow } from "@/lib/generator";
import { saveGeneratedWorkflow } from "@/lib/storage";
import { formatDate } from "@/lib/utils";
import type { GeneratedWorkflow } from "@/types";

const presets = [
  {
    id: "lead-follow-up",
    label: "lead follow-up",
    prompt: "أريد workflow لمتابعة lead جديد من نموذج الموقع عبر CRM ورسالة واتساب ثم إنشاء مهمة للمتابعة.",
  },
  {
    id: "onboarding",
    label: "onboarding",
    prompt: "أريد أتمتة onboarding للموظف الجديد تشمل إنشاء مهام وإرسال البريد وتجهيز مجلد المستندات.",
  },
  {
    id: "invoice-reminder",
    label: "invoice reminder",
    prompt: "أريد تذكيرًا تلقائيًا بالفواتير المستحقة مع مراجعة بشرية للحالات الكبيرة.",
  },
  {
    id: "report-generation",
    label: "report generation",
    prompt: "أريد إنشاء تقرير يومي تلقائي من Google Sheets مع ملخص تنفيذي وإرساله بالبريد.",
  },
  {
    id: "content-approval",
    label: "content approval",
    prompt: "أريد workflow لاعتماد المحتوى بين الكاتب والمراجع ثم تجهيز النشر.",
  },
  {
    id: "student-registration",
    label: "student registration",
    prompt: "أريد أتمتة تسجيل الطلاب ثم إرسال رسالة ترحيب وتأكيد وجدولة تذكير قبل بداية الدورة.",
  },
  {
    id: "booking-confirmation",
    label: "booking confirmation",
    prompt: "أريد تأكيد حجوزات المواعيد وإرسال reminder قبل الموعد مع تحديث السجل.",
  },
];

const defaultPrompt = presets[0].prompt;

export function GeneratorStudio({ compact = false }: { compact?: boolean }) {
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [workflow, setWorkflow] = useState<GeneratedWorkflow>(() => generateWorkflow(defaultPrompt));
  const [notice, setNotice] = useState("");

  const clientSummary = useMemo(
    () =>
      [
        workflow.title,
        workflow.summary,
        `Trigger: ${workflow.trigger}`,
        `Recommended tools: ${workflow.recommendedTools.join("، ")}`,
        `Actions: ${workflow.actions.join("، ")}`,
      ].join("\n"),
    [workflow],
  );

  function handleGenerate(nextPrompt = prompt) {
    const next = generateWorkflow(nextPrompt);
    setPrompt(nextPrompt);
    setWorkflow(next);
    setNotice("تم توليد خطة عملية مع prompts مناسبة لعدة منصات تنفيذ.");
  }

  function handleSave() {
    saveGeneratedWorkflow(workflow);
    setNotice("تم حفظ الخطة في localStorage لتظهر داخل لوحة التحكم.");
  }

  async function copyText(label: string, text: string) {
    await navigator.clipboard.writeText(text);
    setNotice(`تم نسخ ${label}.`);
  }

  return (
    <div className={`grid gap-6 ${compact ? "xl:grid-cols-[1fr_1fr]" : "xl:grid-cols-[0.95fr_1.1fr]"}`}>
      <GlassCard className="space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="font-display text-xs uppercase tracking-[0.24em] text-[var(--cyan)]/75">Automation Plan Generator</div>
            <h3 className="mt-2 font-heading text-2xl font-semibold text-white">حوّل فكرتك إلى خطة تنفيذ أتمتة جاهزة</h3>
          </div>
          <StatusBadge tone="violet">Frontend-ready AI stub</StatusBadge>
        </div>

        <p className="text-sm leading-7 text-[var(--text-muted)]">
          اكتب وصفًا عمليًا لما تريد أتمتته، أو اختر preset جاهزًا. المولد ينتج لك عنوان workflow، trigger، actions، أدوات مقترحة، checklist، وموجهات جاهزة لـ n8n وMake وZapier وPython.
        </p>

        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleGenerate(preset.prompt)}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-[var(--text-muted)] transition hover:border-[var(--border-bright)] hover:text-white"
            >
              {preset.label}
            </button>
          ))}
        </div>

        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          className="min-h-40 w-full rounded-[24px] border border-white/10 bg-[rgba(5,10,18,0.82)] p-4 text-sm leading-7 text-white outline-none placeholder:text-[var(--text-soft)] focus:border-[var(--border-bright)]"
          placeholder="اكتب ما تريد أتمتته... مثال: أريد إرسال رسالة واتساب تلقائية لكل طالب بعد إنهاء الاختبار"
        />

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <GradientButton onClick={() => handleGenerate()} className="w-full">
            ولّد الخطة
          </GradientButton>
          <GradientButton onClick={handleSave} variant="secondary" className="w-full">
            احفظ الخطة
          </GradientButton>
          <GradientButton onClick={() => copyText("الشرح الموجه للعميل", workflow.clientExplanation)} variant="secondary" className="w-full">
            انسخ الشرح للعميل
          </GradientButton>
          <GradientButton href="/services" variant="ghost" className="w-full">
            اطلب تنفيذها
          </GradientButton>
        </div>

        {notice ? (
          <div className="rounded-2xl border border-[rgba(87,225,255,0.24)] bg-[rgba(87,225,255,0.08)] px-4 py-3 text-sm text-[var(--cyan)]">
            {notice}
          </div>
        ) : null}

        {!compact ? <HeroWorkflowCanvas compact /> : null}
      </GlassCard>

      <GlassCard className="space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="font-display text-xs uppercase tracking-[0.24em] text-[var(--cyan)]/75">Generated Output</div>
            <h3 className="mt-2 font-heading text-2xl font-semibold text-white">{workflow.title}</h3>
          </div>
          <div className="rounded-full border border-white/10 px-3 py-2 text-xs text-[var(--text-soft)]">{formatDate(workflow.savedAt)}</div>
        </div>

        <p className="text-sm leading-7 text-[var(--text-muted)]">{workflow.summary}</p>

        <div className="grid gap-4 sm:grid-cols-2">
          <InfoCard label="Trigger" value={workflow.trigger} />
          <InfoCard label="Recommended Tools" value={workflow.recommendedTools.join("، ")} />
        </div>

        <Panel title="Workflow Actions" items={workflow.actions} />
        <Panel title="Setup Steps" items={workflow.setupSteps} />
        <Panel title="Testing Checklist" items={workflow.testChecklist} />
        <Panel title="Risks" items={workflow.risks} />

        <div className="rounded-[24px] border border-[rgba(244,198,114,0.2)] bg-[rgba(244,198,114,0.08)] p-4">
          <div className="font-heading text-lg font-semibold text-white">Client-facing explanation</div>
          <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{workflow.clientExplanation}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <PromptCard title="n8n Prompt" prompt={workflow.prompts.n8n} onCopy={() => copyText("n8n prompt", workflow.prompts.n8n)} />
          <PromptCard title="Make Prompt" prompt={workflow.prompts.make} onCopy={() => copyText("Make prompt", workflow.prompts.make)} />
          <PromptCard title="Zapier Prompt" prompt={workflow.prompts.zapier} onCopy={() => copyText("Zapier prompt", workflow.prompts.zapier)} />
          <PromptCard title="Python Prompt" prompt={workflow.prompts.python} onCopy={() => copyText("Python prompt", workflow.prompts.python)} />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <GradientButton onClick={() => copyText("الملخص الكامل", clientSummary)} variant="secondary" className="w-full">
            Copy Summary
          </GradientButton>
          <Link
            href="/automation-agent"
            className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 text-sm font-semibold text-white transition hover:border-[var(--border-bright)]"
          >
            افتح Automation Agent
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
      <div className="text-xs text-[var(--text-soft)]">{label}</div>
      <div className="mt-2 text-sm leading-7 text-white">{value}</div>
    </div>
  );
}

function Panel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[26px] border border-white/10 bg-white/5 p-5">
      <div className="font-heading text-lg font-semibold text-white">{title}</div>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item} className="rounded-2xl border border-white/8 bg-[rgba(255,255,255,0.03)] px-4 py-3 text-sm leading-7 text-[var(--text-muted)]">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function PromptCard({
  title,
  prompt,
  onCopy,
}: {
  title: string;
  prompt: string;
  onCopy: () => void;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="font-heading text-base font-semibold text-white">{title}</div>
        <button type="button" onClick={onCopy} className="text-xs font-semibold text-[var(--cyan)]">
          Copy
        </button>
      </div>
      <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{prompt}</p>
    </div>
  );
}
