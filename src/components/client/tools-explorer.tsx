"use client";

import { useMemo, useState } from "react";
import { ToolCard } from "@/components/cards";
import { SearchFilterBar } from "@/components/search-filter-bar";
import { GlassCard, GradientButton, StatusBadge } from "@/components/ui";
import { automationChecklists } from "@/data/automationChecklists";
import { automationComparisons } from "@/data/automationComparisons";
import { automationToolsDirectory } from "@/data/automationTools";

const categories = ["الكل", ...Array.from(new Set(automationToolsDirectory.map((tool) => tool.category)))];
const toolTabs = ["الدليل", "ROI Calculator", "Complexity Estimator", "Stack Advisor", "Webhook Explainer", "Checklist Generator", "Proposal Generator"] as const;
type ToolTab = (typeof toolTabs)[number];

export function ToolsExplorer() {
  const [activeTab, setActiveTab] = useState<ToolTab>("الدليل");
  const [activeFilter, setActiveFilter] = useState("الكل");
  const [search, setSearch] = useState("");
  const [roi, setRoi] = useState({ frequency: 20, minutes: 25, employees: 2, hourlyCost: 120, automationPercent: 70 });
  const [complexity, setComplexity] = useState({ apps: 4, steps: 7, branches: 2, dataSensitivity: 3, frequency: 5 });
  const [advisor, setAdvisor] = useState({ skill: "مبتدئ", budget: "منخفض", privacy: "عادية", apps: "Google Sheets, Gmail, CRM", style: "no-code" });
  const [checklist, setChecklist] = useState({ projectType: "Lead automation", tools: "CRM, WhatsApp, Sheets", sensitivity: "متوسطة" });
  const [proposal, setProposal] = useState({
    business: "مركز تدريبي",
    problem: "التسجيل والمتابعة يتمان يدويًا ويتسببان في بطء الرد.",
    workflow: "Form -> Google Sheets -> CRM -> WhatsApp -> Follow-up task",
    tools: "Google Forms, Google Sheets, CRM, WhatsApp concepts",
    timeline: "5 أيام عمل",
  });

  const filteredTools = useMemo(() => {
    return automationToolsDirectory.filter((tool) => {
      const filterMatch = activeFilter === "الكل" || tool.category === activeFilter;
      const searchMatch =
        !search ||
        [
          tool.name,
          tool.category,
          tool.whatItIs,
          ...tool.bestUseCases,
          ...tool.exampleAutomations,
          ...tool.relatedLearningPaths,
        ]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
      return filterMatch && searchMatch;
    });
  }, [activeFilter, search]);

  const roiOutput = useMemo(() => {
    const weeklyHours = (roi.frequency * roi.minutes * roi.employees * (roi.automationPercent / 100)) / 60;
    const monthlyHours = weeklyHours * 4.33;
    const monthlySavings = monthlyHours * roi.hourlyCost;
    const complexityRecommendation = weeklyHours > 25 ? "الأتمتة هنا ذات أولوية عالية." : weeklyHours > 10 ? "ابدأ بـ workflow متوسط وواضح." : "ابدأ بأتمتة خفيفة سريعة العائد.";
    return {
      weeklyHours: weeklyHours.toFixed(1),
      monthlyHours: monthlyHours.toFixed(1),
      monthlySavings: monthlySavings.toFixed(0),
      complexityRecommendation,
    };
  }, [roi]);

  const complexityOutput = useMemo(() => {
    const score = complexity.apps * 2 + complexity.steps + complexity.branches * 3 + complexity.dataSensitivity * 2 + complexity.frequency;
    const recommendedPlatform = score <= 18 ? "Make أو Zapier" : score <= 28 ? "n8n أو Power Automate" : "n8n + Python أو custom stack";
    const riskLevel = score <= 18 ? "منخفض" : score <= 28 ? "متوسط" : "مرتفع";
    const testingDepth = score <= 18 ? "happy path + edge cases أساسية" : score <= 28 ? "QA متعدد الحالات + logging" : "QA موسع + fallback + approvals + monitoring";
    return { score, recommendedPlatform, riskLevel, testingDepth };
  }, [complexity]);

  const advisorOutput = useMemo(() => {
    const skill = advisor.skill;
    const style = advisor.style;
    const privacy = advisor.privacy;
    const budget = advisor.budget;
    let recommended = "Make + Google Sheets + Gmail";
    let why = "مناسب للبدء السريع وبناء أول workflows واضحة.";
    let avoid = "تجنب Python أو حلول معقدة في البداية.";

    if (privacy === "عالية" || budget === "منخفض جدًا") {
      recommended = "n8n + Google Sheets أو Supabase";
      why = "يوفر تحكمًا أفضل في الخصوصية وكلفة أكثر ذكاء على المدى المتوسط.";
      avoid = "تجنب المنصات التي تتوسع تكلفتها سريعًا مع حجم التنفيذ.";
    }

    if (style === "code" || skill === "متقدم") {
      recommended = "Python + APIs + n8n";
      why = "يعطيك مرونة أعلى للتكاملات والمنطق الخاص.";
      avoid = "تجنب بناء flows كبيرة على أدوات لا تستوعب المنطق المركب.";
    }

    if (style === "no-code" && skill === "مبتدئ") {
      recommended = "Make أو Zapier";
      why = "أفضل نقطة انطلاق لسرعة التنفيذ ووضوح الصيانة.";
      avoid = "تجنب القفز مباشرة إلى custom code.";
    }

    return { recommended, why, avoid };
  }, [advisor]);

  const checklistOutput = useMemo(() => {
    const base = automationChecklists[0];
    return {
      discovery: [...base.discoveryChecklist, `تأكيد نوع المشروع: ${checklist.projectType}`],
      build: [...base.buildChecklist, `توثيق الأدوات: ${checklist.tools}`],
      qa: [...base.qaChecklist, `مراجعة الحساسية: ${checklist.sensitivity}`],
      launch: base.launchChecklist,
      maintenance: base.maintenanceChecklist,
    };
  }, [checklist]);

  const proposalOutput = useMemo(() => {
    return [
      `نقترح تنفيذ مشروع أتمتة لصالح ${proposal.business} لمعالجة المشكلة التالية: ${proposal.problem}`,
      `التدفق المقترح: ${proposal.workflow}.`,
      `الأدوات المرشحة: ${proposal.tools}.`,
      `الإطار الزمني الأولي: ${proposal.timeline}.`,
      "يشمل النطاق تحليل العملية الحالية، تصميم workflow، اختبار أولي، وتسليم إرشادات تشغيل مبسطة.",
      "لا يشمل النطاق أي تراخيص مدفوعة أو تكاملات تحتاج مزودًا خارجيًا إلا بعد اعتمادها من العميل.",
      "الخطوة التالية: جلسة discovery قصيرة لتثبيت الحقول، الصلاحيات، وحالات الخطأ قبل التنفيذ.",
    ].join(" ");
  }, [proposal]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {toolTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
              activeTab === tab
                ? "border-[var(--border-bright)] bg-[rgba(87,225,255,0.12)] text-[var(--cyan)]"
                : "border-white/10 bg-white/5 text-[var(--text-muted)] hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "الدليل" ? (
        <div className="space-y-6">
          <SearchFilterBar
            search={search}
            onSearch={setSearch}
            filters={categories}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            placeholder="ابحث عن أداة أو use case أو learning path"
          />

          <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="grid gap-5 md:grid-cols-2">
              {filteredTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  action={
                    <GradientButton href="/paths" variant="secondary" className="w-full">
                      تعلّم متى تستخدمها
                    </GradientButton>
                  }
                />
              ))}
            </div>

            <div className="space-y-5">
              <GlassCard className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-heading text-xl font-semibold text-white">مقارنات سريعة</h3>
                  <StatusBadge tone="cyan">Decision aid</StatusBadge>
                </div>
                {automationComparisons.map((comparison) => (
                  <div key={comparison.id} className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                    <div className="font-semibold text-white">{comparison.title}</div>
                    <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{comparison.focus}</p>
                    <div className="mt-3 space-y-2">
                      {comparison.options.map((option) => (
                        <div key={option.name} className="rounded-2xl border border-white/8 bg-[rgba(255,255,255,0.03)] px-3 py-3 text-sm text-[var(--text-muted)]">
                          <span className="font-semibold text-white">{option.name}:</span> {option.bestFor}
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 text-sm text-[var(--gold)]">{comparison.verdict}</div>
                  </div>
                ))}
              </GlassCard>
            </div>
          </div>
        </div>
      ) : null}

      {activeTab === "ROI Calculator" ? (
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <GlassCard className="space-y-4">
            <h3 className="font-heading text-2xl font-semibold text-white">Automation ROI Calculator</h3>
            <RangeField label="عدد مرات المهمة أسبوعيًا" value={roi.frequency} min={1} max={200} onChange={(value) => setRoi((current) => ({ ...current, frequency: value }))} />
            <RangeField label="عدد الدقائق لكل مرة" value={roi.minutes} min={5} max={120} onChange={(value) => setRoi((current) => ({ ...current, minutes: value }))} />
            <RangeField label="عدد الأشخاص المشاركين" value={roi.employees} min={1} max={20} onChange={(value) => setRoi((current) => ({ ...current, employees: value }))} />
            <RangeField label="تكلفة الساعة" value={roi.hourlyCost} min={50} max={500} onChange={(value) => setRoi((current) => ({ ...current, hourlyCost: value }))} />
            <RangeField label="نسبة الأتمتة المتوقعة %" value={roi.automationPercent} min={10} max={100} onChange={(value) => setRoi((current) => ({ ...current, automationPercent: value }))} />
          </GlassCard>
          <GlassCard className="space-y-4">
            <h3 className="font-heading text-2xl font-semibold text-white">النتيجة التقديرية</h3>
            <StatGrid
              items={[
                { label: "ساعات موفرة أسبوعيًا", value: roiOutput.weeklyHours },
                { label: "ساعات موفرة شهريًا", value: roiOutput.monthlyHours },
                { label: "توفير شهري تقريبي", value: `${roiOutput.monthlySavings} ج.م` },
                { label: "توصية", value: roiOutput.complexityRecommendation },
              ]}
            />
          </GlassCard>
        </div>
      ) : null}

      {activeTab === "Complexity Estimator" ? (
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <GlassCard className="space-y-4">
            <h3 className="font-heading text-2xl font-semibold text-white">Workflow Complexity Estimator</h3>
            <RangeField label="عدد التطبيقات" value={complexity.apps} min={1} max={15} onChange={(value) => setComplexity((current) => ({ ...current, apps: value }))} />
            <RangeField label="عدد الخطوات" value={complexity.steps} min={2} max={30} onChange={(value) => setComplexity((current) => ({ ...current, steps: value }))} />
            <RangeField label="عدد الفروع الشرطية" value={complexity.branches} min={0} max={10} onChange={(value) => setComplexity((current) => ({ ...current, branches: value }))} />
            <RangeField label="حساسية البيانات" value={complexity.dataSensitivity} min={1} max={5} onChange={(value) => setComplexity((current) => ({ ...current, dataSensitivity: value }))} />
            <RangeField label="التكرار الأسبوعي" value={complexity.frequency} min={1} max={20} onChange={(value) => setComplexity((current) => ({ ...current, frequency: value }))} />
          </GlassCard>
          <GlassCard className="space-y-4">
            <h3 className="font-heading text-2xl font-semibold text-white">نتيجة التعقيد</h3>
            <StatGrid
              items={[
                { label: "Complexity Score", value: `${complexityOutput.score}` },
                { label: "المنصة الموصى بها", value: complexityOutput.recommendedPlatform },
                { label: "مستوى المخاطر", value: complexityOutput.riskLevel },
                { label: "عمق الاختبار", value: complexityOutput.testingDepth },
              ]}
            />
          </GlassCard>
        </div>
      ) : null}

      {activeTab === "Stack Advisor" ? (
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <GlassCard className="space-y-4">
            <h3 className="font-heading text-2xl font-semibold text-white">Stack Advisor</h3>
            <TextField label="مستوى المستخدم" value={advisor.skill} onChange={(value) => setAdvisor((current) => ({ ...current, skill: value }))} />
            <TextField label="الميزانية" value={advisor.budget} onChange={(value) => setAdvisor((current) => ({ ...current, budget: value }))} />
            <TextField label="حساسية الخصوصية" value={advisor.privacy} onChange={(value) => setAdvisor((current) => ({ ...current, privacy: value }))} />
            <TextField label="التطبيقات الحالية" value={advisor.apps} onChange={(value) => setAdvisor((current) => ({ ...current, apps: value }))} />
            <TextField label="الأسلوب المفضل" value={advisor.style} onChange={(value) => setAdvisor((current) => ({ ...current, style: value }))} />
          </GlassCard>
          <GlassCard className="space-y-4">
            <h3 className="font-heading text-2xl font-semibold text-white">التوصية</h3>
            <InfoPanel title="Recommended Tools" text={advisorOutput.recommended} />
            <InfoPanel title="Why" text={advisorOutput.why} />
            <InfoPanel title="Avoid" text={advisorOutput.avoid} />
          </GlassCard>
        </div>
      ) : null}

      {activeTab === "Webhook Explainer" ? (
        <GlassCard className="space-y-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-heading text-2xl font-semibold text-white">Webhook Explainer</h3>
            <StatusBadge tone="violet">تعليمي تفاعلي</StatusBadge>
          </div>
          <p className="text-sm leading-7 text-[var(--text-muted)]">
            الـ webhook هو حدث يرسل payload من نظام إلى نظام آخر فور وقوع شيء ما. بدل أن تسأل النظام كل دقيقة إن كان هناك جديد، يقوم هو بدفع البيانات إليك مباشرة.
          </p>
          <div className="rounded-[26px] border border-white/10 bg-[rgba(255,255,255,0.03)] p-5 font-mono-soft text-sm leading-7 text-[var(--cyan)]">
            {`{
  "event": "new_form_submission",
  "submitted_at": "2026-05-31T10:30:00Z",
  "student_name": "سارة",
  "course": "Automation Fundamentals",
  "email": "student@example.com"
}`}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <InfoPanel title="استخدامات شائعة" text="استقبال تسجيل جديد، إشعار دفع، إنشاء ticket، تحديث CRM، أو تشغيل workflow لحظي." />
            <InfoPanel title="ملاحظات أمان" text="تحقق من المصدر، وقّع الطلب إن أمكن، لا تثق بأي payload بدون validation، وأضف retry وlogs." />
          </div>
        </GlassCard>
      ) : null}

      {activeTab === "Checklist Generator" ? (
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <GlassCard className="space-y-4">
            <h3 className="font-heading text-2xl font-semibold text-white">Automation Checklist Generator</h3>
            <TextField label="نوع المشروع" value={checklist.projectType} onChange={(value) => setChecklist((current) => ({ ...current, projectType: value }))} />
            <TextField label="الأدوات" value={checklist.tools} onChange={(value) => setChecklist((current) => ({ ...current, tools: value }))} />
            <TextField label="حساسية البيانات" value={checklist.sensitivity} onChange={(value) => setChecklist((current) => ({ ...current, sensitivity: value }))} />
          </GlassCard>
          <div className="space-y-4">
            <ChecklistPanel title="Discovery Checklist" items={checklistOutput.discovery} />
            <ChecklistPanel title="Build Checklist" items={checklistOutput.build} />
            <ChecklistPanel title="QA Checklist" items={checklistOutput.qa} />
            <ChecklistPanel title="Launch Checklist" items={checklistOutput.launch} />
            <ChecklistPanel title="Maintenance Checklist" items={checklistOutput.maintenance} />
          </div>
        </div>
      ) : null}

      {activeTab === "Proposal Generator" ? (
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <GlassCard className="space-y-4">
            <h3 className="font-heading text-2xl font-semibold text-white">Client Proposal Generator</h3>
            <TextField label="نوع العميل" value={proposal.business} onChange={(value) => setProposal((current) => ({ ...current, business: value }))} />
            <TextField label="المشكلة" value={proposal.problem} onChange={(value) => setProposal((current) => ({ ...current, problem: value }))} />
            <TextField label="الـ workflow المقترح" value={proposal.workflow} onChange={(value) => setProposal((current) => ({ ...current, workflow: value }))} />
            <TextField label="الأدوات" value={proposal.tools} onChange={(value) => setProposal((current) => ({ ...current, tools: value }))} />
            <TextField label="الإطار الزمني" value={proposal.timeline} onChange={(value) => setProposal((current) => ({ ...current, timeline: value }))} />
          </GlassCard>
          <GlassCard className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-heading text-2xl font-semibold text-white">الاقتراح المولد</h3>
              <GradientButton onClick={() => navigator.clipboard.writeText(proposalOutput)} variant="secondary">
                Copy Proposal
              </GradientButton>
            </div>
            <p className="whitespace-pre-line text-sm leading-8 text-[var(--text-muted)]">{proposalOutput}</p>
          </GlassCard>
        </div>
      ) : null}
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="space-y-2">
      <div className="text-sm text-[var(--text-muted)]">{label}</div>
      <input value={value} onChange={(event) => onChange(event.target.value)} className={fieldClassName} />
    </label>
  );
}

function RangeField({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3 text-sm text-[var(--text-muted)]">
        <span>{label}</span>
        <span className="font-display text-white">{value}</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={(event) => onChange(Number(event.target.value))} className="w-full accent-cyan-300" />
    </div>
  );
}

function StatGrid({
  items,
}: {
  items: Array<{ label: string; value: string }>;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="rounded-[22px] border border-white/10 bg-white/5 p-4">
          <div className="text-xs text-[var(--text-soft)]">{item.label}</div>
          <div className="mt-2 text-sm leading-7 text-white">{item.value}</div>
        </div>
      ))}
    </div>
  );
}

function InfoPanel({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
      <div className="font-heading text-lg font-semibold text-white">{title}</div>
      <div className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{text}</div>
    </div>
  );
}

function ChecklistPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <GlassCard className="space-y-4">
      <div className="font-heading text-xl font-semibold text-white">{title}</div>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item} className="rounded-2xl border border-white/8 bg-[rgba(255,255,255,0.03)] px-4 py-3 text-sm leading-7 text-[var(--text-muted)]">
            {item}
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

const fieldClassName =
  "h-12 w-full rounded-2xl border border-white/10 bg-[rgba(6,10,19,0.82)] px-4 text-sm text-white outline-none placeholder:text-[var(--text-soft)] focus:border-[var(--border-bright)]";
