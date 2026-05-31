"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { GradientButton, GlassCard, SectionHeader, StatusBadge } from "@/components/ui";
import { generateAutomationBlueprint } from "@/lib/automation-agent";
import { saveBlueprint } from "@/lib/storage";
import { formatDate } from "@/lib/utils";
import type { AutomationAgentInput, BlueprintConstraint, Department, Objective } from "@/types";

const departmentOptions: Array<{ value: Department; label: string }> = [
  { value: "sales", label: "المبيعات" },
  { value: "marketing", label: "التسويق" },
  { value: "hr", label: "الموارد البشرية" },
  { value: "education", label: "التعليم" },
  { value: "finance", label: "المالية" },
  { value: "operations", label: "العمليات" },
  { value: "support", label: "خدمة العملاء" },
  { value: "personal-productivity", label: "الإنتاجية الشخصية" },
  { value: "other", label: "أخرى" },
];

const objectiveOptions: Array<{ value: Objective; label: string }> = [
  { value: "save-time", label: "توفير الوقت" },
  { value: "reduce-errors", label: "تقليل الأخطاء" },
  { value: "increase-sales", label: "زيادة المبيعات" },
  { value: "improve-follow-up", label: "تحسين المتابعة" },
  { value: "organize-data", label: "تنظيم البيانات" },
  { value: "improve-reporting", label: "تحسين التقارير" },
];

const appOptions = [
  "Google Sheets",
  "Gmail",
  "WhatsApp",
  "Telegram",
  "Notion",
  "Airtable",
  "CRM",
  "Website form",
  "Calendar",
  "Drive",
  "Excel",
  "Custom API",
  "Other",
];

const triggerOptions = [
  "New form submission",
  "New email",
  "New row in sheet",
  "Scheduled time",
  "New CRM lead",
  "New payment",
  "Manual button",
  "Webhook",
  "File upload",
];

const actionOptions = [
  "Send email",
  "Send WhatsApp message",
  "Add row",
  "Update CRM",
  "Create task",
  "Generate report",
  "Notify team",
  "Create document",
  "Schedule event",
  "Route approval",
  "Call API",
];

const constraintOptions: Array<{ value: BlueprintConstraint; label: string }> = [
  { value: "no-paid-tools", label: "بدون أدوات مدفوعة" },
  { value: "low-cost", label: "تكلفة منخفضة" },
  { value: "no-code", label: "No-code" },
  { value: "open-source", label: "تفضيل open-source" },
  { value: "privacy-sensitive", label: "بيانات حساسة" },
  { value: "approval-step", label: "يحتاج approval" },
  { value: "human-review", label: "يحتاج مراجعة بشرية" },
  { value: "mobile", label: "يعمل جيدًا على الموبايل" },
  { value: "arabic-support", label: "دعم عربي" },
];

const steps = [
  "الهدف",
  "العملية الحالية",
  "التطبيقات",
  "Trigger",
  "الإجراءات",
  "القيود",
  "المخرجات",
];

const initialInput: AutomationAgentInput = {
  businessGoal: "أريد تنظيم استلام العملاء المحتملين ومتابعتهم تلقائيًا.",
  department: "sales",
  objective: "improve-follow-up",
  currentSteps: "يصل lead من النموذج، ثم يراجعه الفريق يدويًا ويُرسل الرد بعد ساعات.",
  owner: "منسق المبيعات",
  frequency: "يوميًا",
  durationMinutes: 25,
  painPoints: "تأخر المتابعة، ضياع بعض leads، وعدم وجود owner واضح.",
  apps: ["Website form", "CRM", "WhatsApp", "Google Sheets"],
  trigger: "New form submission",
  desiredActions: ["Update CRM", "Send WhatsApp message", "Create task"],
  constraints: ["low-cost", "arabic-support"],
};

export function AutomationAgentStudio() {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState<AutomationAgentInput>(initialInput);
  const [notice, setNotice] = useState("");
  const [blueprint, setBlueprint] = useState(() => generateAutomationBlueprint(initialInput));

  const canContinue = useMemo(() => {
    if (step === 0) return input.businessGoal.trim().length > 10;
    if (step === 1) return input.currentSteps.trim().length > 10 && input.owner.trim().length > 1;
    if (step === 2) return input.apps.length > 0;
    if (step === 3) return input.trigger.length > 0;
    if (step === 4) return input.desiredActions.length > 0;
    return true;
  }, [input, step]);

  function update<K extends keyof AutomationAgentInput>(key: K, value: AutomationAgentInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  function toggleSelection<T extends string>(list: T[], value: T) {
    return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
  }

  async function copyText(label: string, text: string) {
    await navigator.clipboard.writeText(text);
    setNotice(`تم نسخ ${label}.`);
  }

  function generate() {
    const next = generateAutomationBlueprint(input);
    setBlueprint(next);
    setStep(6);
    setNotice("تم توليد Automation Blueprint كامل بناءً على البيانات الحالية.");
  }

  function save() {
    saveBlueprint(blueprint);
    setNotice("تم حفظ الـ blueprint محليًا ليظهر لاحقًا داخل لوحة التحكم.");
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(blueprint, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${blueprint.id}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setNotice("تم تصدير الملف بصيغة JSON.");
  }

  function reset() {
    setInput(initialInput);
    const next = generateAutomationBlueprint(initialInput);
    setBlueprint(next);
    setStep(0);
    setNotice("تمت إعادة ضبط الوكيل إلى الحالة الافتراضية.");
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Automation Design Agent"
        title="صمّم الأتمتة مع وكيل استشاري يفهم العملية قبل الأداة"
        description="هذا الوكيل لا يحتاج API خارجي في هذه المرحلة. هو planner محلي ذكي يحول معلوماتك إلى blueprint تنفيذي، proposal جاهز، وtechnical brief قابل للتسليم أو التطوير."
        actions={
          <>
            <GradientButton onClick={generate}>Generate Blueprint</GradientButton>
            <GradientButton href="/services" variant="secondary">
              اطلب تنفيذ الخطة
            </GradientButton>
          </>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.25fr]">
        <GlassCard className="space-y-5">
          <div className="flex flex-wrap gap-2">
            {steps.map((label, index) => (
              <button
                key={label}
                type="button"
                onClick={() => setStep(index)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                  step === index
                    ? "border-[var(--border-bright)] bg-[rgba(87,225,255,0.12)] text-[var(--cyan)]"
                    : "border-white/10 bg-white/5 text-[var(--text-muted)] hover:text-white"
                }`}
              >
                {index + 1}. {label}
              </button>
            ))}
          </div>

          {step === 0 ? (
            <div className="space-y-4">
              <Field label="ما الذي تريد أتمتته؟">
                <textarea
                  value={input.businessGoal}
                  onChange={(event) => update("businessGoal", event.target.value)}
                  className={`${fieldClassName} min-h-36`}
                />
              </Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="القسم">
                  <select value={input.department} onChange={(event) => update("department", event.target.value as Department)} className={fieldClassName}>
                    {departmentOptions.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="الهدف الرئيسي">
                  <select value={input.objective} onChange={(event) => update("objective", event.target.value as Objective)} className={fieldClassName}>
                    {objectiveOptions.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="space-y-4">
              <Field label="الخطوات الحالية">
                <textarea
                  value={input.currentSteps}
                  onChange={(event) => update("currentSteps", event.target.value)}
                  className={`${fieldClassName} min-h-32`}
                />
              </Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="من ينفذ المهمة؟">
                  <input value={input.owner} onChange={(event) => update("owner", event.target.value)} className={fieldClassName} />
                </Field>
                <Field label="عدد مرات التكرار">
                  <input value={input.frequency} onChange={(event) => update("frequency", event.target.value)} className={fieldClassName} />
                </Field>
                <Field label="المدة لكل مرة بالدقائق">
                  <input
                    type="number"
                    min={1}
                    value={input.durationMinutes}
                    onChange={(event) => update("durationMinutes", Number(event.target.value) || 1)}
                    className={fieldClassName}
                  />
                </Field>
              </div>
              <Field label="ما نقاط الألم؟">
                <textarea value={input.painPoints} onChange={(event) => update("painPoints", event.target.value)} className={`${fieldClassName} min-h-28`} />
              </Field>
            </div>
          ) : null}

          {step === 2 ? (
            <SelectionGrid
              title="اختر التطبيقات ومصادر البيانات"
              options={appOptions}
              values={input.apps}
              onToggle={(value) => update("apps", toggleSelection(input.apps, value))}
            />
          ) : null}

          {step === 3 ? (
            <SelectionGrid
              title="اختر الـ Trigger الأساسي"
              single
              options={triggerOptions}
              values={[input.trigger]}
              onToggle={(value) => update("trigger", value)}
            />
          ) : null}

          {step === 4 ? (
            <SelectionGrid
              title="اختر الإجراءات المطلوبة"
              options={actionOptions}
              values={input.desiredActions}
              onToggle={(value) => update("desiredActions", toggleSelection(input.desiredActions, value))}
            />
          ) : null}

          {step === 5 ? (
            <SelectionGrid
              title="حدود وقيود التنفيذ"
              options={constraintOptions.map((item) => item.label)}
              values={constraintOptions.filter((item) => input.constraints.includes(item.value)).map((item) => item.label)}
              onToggle={(label) => {
                const found = constraintOptions.find((item) => item.label === label);
                if (!found) return;
                update("constraints", toggleSelection(input.constraints, found.value));
              }}
            />
          ) : null}

          {step === 6 ? (
            <div className="space-y-4">
              <div className="rounded-[24px] border border-[rgba(87,225,255,0.18)] bg-[rgba(87,225,255,0.06)] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="font-heading text-xl font-semibold text-white">{blueprint.title}</div>
                    <div className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{blueprint.summary}</div>
                  </div>
                  <StatusBadge tone={blueprint.estimatedComplexity === "متقدم" ? "gold" : blueprint.estimatedComplexity === "متوسط" ? "cyan" : "green"}>
                    {blueprint.estimatedComplexity}
                  </StatusBadge>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <MiniStat label="الزمن المتوقع" value={blueprint.estimatedImplementationTime} />
                <MiniStat label="تكلفة شهرية" value={blueprint.monthlyCostCategory} />
                <MiniStat label="التطبيقات" value={`${blueprint.appsInvolved.length}`} />
                <MiniStat label="آخر تحديث" value={formatDate(blueprint.savedAt)} />
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <GradientButton onClick={() => copyText("الـ blueprint", stringifyBlueprint(blueprint))}>Copy Blueprint</GradientButton>
                <GradientButton onClick={() => copyText("عرض العميل", blueprint.clientProposal)} variant="secondary">
                  Copy Client Proposal
                </GradientButton>
                <GradientButton onClick={() => copyText("الملف التقني", blueprint.technicalBrief)} variant="secondary">
                  Copy Technical Brief
                </GradientButton>
                <GradientButton onClick={exportJson} variant="ghost">
                  Export as JSON
                </GradientButton>
                <GradientButton onClick={save} variant="secondary">
                  Save locally
                </GradientButton>
                <GradientButton onClick={reset} variant="ghost">
                  Reset
                </GradientButton>
              </div>
            </div>
          ) : null}

          <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={() => setStep((current) => Math.max(current - 1, 0))}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white"
            >
              السابق
            </button>
            <div className="text-xs text-[var(--text-soft)]">يمكنك التنقل بين الخطوات أو توليد الخطة مباشرة.</div>
            <button
              type="button"
              onClick={() => (step === 6 ? generate() : setStep((current) => Math.min(current + 1, steps.length - 1)))}
              disabled={!canContinue}
              className="rounded-2xl bg-[linear-gradient(135deg,#c8fbff_0%,#7ce8ff_45%,#8d90ff_100%)] px-4 py-3 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {step === 6 ? "إعادة التوليد" : "التالي"}
            </button>
          </div>

          {notice ? (
            <div className="rounded-2xl border border-[rgba(87,225,255,0.2)] bg-[rgba(87,225,255,0.08)] px-4 py-3 text-sm text-[var(--cyan)]">
              {notice}
            </div>
          ) : null}
        </GlassCard>

        <GlassCard className="space-y-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-display text-xs uppercase tracking-[0.24em] text-[var(--cyan)]/75">Blueprint Output</div>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-white">{blueprint.title}</h2>
            </div>
            <StatusBadge tone="violet">Consultant Mode</StatusBadge>
          </div>

          <Panel title="Recommended Stack" items={blueprint.recommendedStack} />
          <Panel title="Why this stack?" items={blueprint.stackReasoning} />
          <Panel title="Workflow Diagram" items={blueprint.workflowDiagram} />
          <Panel title="Required Data Fields" items={blueprint.requiredDataFields} />
          <Panel title="Implementation Plan" items={blueprint.implementationPlan} />
          <Panel title="Testing Checklist" items={blueprint.testingChecklist} />
          <Panel title="Error Handling Plan" items={blueprint.errorHandlingPlan} />
          <Panel title="Privacy & Security" items={blueprint.privacyAndSecurityNotes} />
          <Panel title="Maintenance Plan" items={blueprint.maintenancePlan} />
          <Panel title="Upgrade Ideas" items={blueprint.upgradeIdeas} />

          <div className="grid gap-4 lg:grid-cols-2">
            <TextBlock title="Copyable Client Proposal" text={blueprint.clientProposal} />
            <TextBlock title="Copyable Technical Brief" text={blueprint.technicalBrief} />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <TextBlock title="n8n Prompt" text={blueprint.buildPrompts.n8n} />
            <TextBlock title="Make Prompt" text={blueprint.buildPrompts.make} />
            <TextBlock title="Zapier Prompt" text={blueprint.buildPrompts.zapier} />
            <TextBlock title="Python Prompt" text={blueprint.buildPrompts.python} />
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function SelectionGrid({
  title,
  options,
  values,
  onToggle,
  single = false,
}: {
  title: string;
  options: string[];
  values: string[];
  onToggle: (value: string) => void;
  single?: boolean;
}) {
  return (
    <div className="space-y-4">
      <div className="text-sm text-[var(--text-muted)]">{title}</div>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const active = values.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className={`rounded-[22px] border px-4 py-4 text-right text-sm transition ${
                active
                  ? "border-[var(--border-bright)] bg-[rgba(87,225,255,0.12)] text-white"
                  : "border-white/10 bg-white/5 text-[var(--text-muted)] hover:text-white"
              }`}
            >
              <div className="font-semibold">{option}</div>
              <div className="mt-1 text-xs text-[var(--text-soft)]">{single ? "اختيار واحد" : "يمكن اختيار عدة عناصر"}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="space-y-2">
      <div className="text-sm text-[var(--text-muted)]">{label}</div>
      {children}
    </label>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
      <div className="text-xs text-[var(--text-soft)]">{label}</div>
      <div className="mt-2 text-sm font-semibold text-white">{value}</div>
    </div>
  );
}

function Panel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[26px] border border-white/10 bg-white/5 p-5">
      <div className="font-heading text-xl font-semibold text-white">{title}</div>
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

function TextBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[26px] border border-white/10 bg-white/5 p-5">
      <div className="font-heading text-lg font-semibold text-white">{title}</div>
      <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[var(--text-muted)]">{text}</p>
    </div>
  );
}

function stringifyBlueprint(blueprint: ReturnType<typeof generateAutomationBlueprint>) {
  return [
    blueprint.title,
    "",
    blueprint.summary,
    "",
    "Recommended Stack:",
    ...blueprint.recommendedStack.map((item) => `- ${item}`),
    "",
    "Workflow Diagram:",
    ...blueprint.workflowDiagram.map((item) => `- ${item}`),
    "",
    "Implementation Plan:",
    ...blueprint.implementationPlan.map((item) => `- ${item}`),
    "",
    "Testing Checklist:",
    ...blueprint.testingChecklist.map((item) => `- ${item}`),
  ].join("\n");
}

const fieldClassName =
  "min-h-12 w-full rounded-2xl border border-white/10 bg-[rgba(6,10,19,0.82)] px-4 py-3 text-sm text-white outline-none placeholder:text-[var(--text-soft)] focus:border-[var(--border-bright)]";
