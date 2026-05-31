"use client";

import { useMemo, useState } from "react";
import { TemplateCard } from "@/components/cards";
import { SearchFilterBar } from "@/components/search-filter-bar";
import { EmptyState, GlassCard, GradientButton, StatusBadge } from "@/components/ui";
import { automationTemplates } from "@/data/automationTemplates";
import { saveTemplate } from "@/lib/storage";
import { copyTextToClipboard } from "@/lib/utils";

const categoryFilters = ["الكل", ...Array.from(new Set(automationTemplates.map((template) => template.category)))];
const departmentFilters = ["الكل", ...Array.from(new Set(automationTemplates.map((template) => template.department)))];
const accessFilters = ["الكل", "Free", "Pro", "Service-ready"];
const difficultyFilters = ["الكل", "مبتدئ", "متوسط", "متقدم"];

const categoryLabels: Record<string, string> = {
  Education: "التعليم",
  Sales: "المبيعات",
  AI: "الذكاء الاصطناعي",
  Finance: "المالية",
  Marketing: "التسويق",
  HR: "الموارد البشرية",
  Support: "خدمة العملاء",
  Operations: "العمليات",
  Clinics: "العيادات",
  "Real Estate": "العقارات",
  "E-commerce": "التجارة الإلكترونية",
};

const departmentLabels: Record<string, string> = {
  education: "التعليم",
  sales: "المبيعات",
  operations: "العمليات",
  marketing: "التسويق",
  hr: "الموارد البشرية",
  support: "خدمة العملاء",
  finance: "المالية",
};

const accessLabels: Record<string, string> = {
  Free: "مجاني",
  Pro: "احترافي",
  "Service-ready": "جاهز للخدمة",
};

export function TemplatesMarketplace({ compact = false }: { compact?: boolean }) {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [activeDepartment, setActiveDepartment] = useState("الكل");
  const [activeAccess, setActiveAccess] = useState("الكل");
  const [activeDifficulty, setActiveDifficulty] = useState("الكل");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(automationTemplates[0]?.id ?? "");
  const [notice, setNotice] = useState("");

  const filtered = useMemo(() => {
    return automationTemplates.filter((template) => {
      const categoryMatch = activeCategory === "الكل" || template.category === activeCategory;
      const departmentMatch = activeDepartment === "الكل" || template.department === activeDepartment;
      const accessMatch = activeAccess === "الكل" || template.access === activeAccess;
      const difficultyMatch = activeDifficulty === "الكل" || template.difficulty === activeDifficulty;
      const searchMatch =
        !search ||
        [
          template.title,
          template.businessProblem,
          template.workflowSummary,
          template.category,
          template.department,
          ...template.requiredTools,
          ...template.actions,
        ]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
      return categoryMatch && departmentMatch && accessMatch && difficultyMatch && searchMatch;
    });
  }, [activeAccess, activeCategory, activeDepartment, activeDifficulty, search]);

  const visibleTemplates = compact ? filtered.slice(0, 6) : filtered;
  const selected = filtered.find((template) => template.id === selectedId) ?? filtered[0] ?? automationTemplates[0];

  async function copyImplementationPlan() {
    if (!selected) return;
    const text = [
      selected.title,
      "",
      `المشكلة: ${selected.businessProblem}`,
      `الملخص: ${selected.workflowSummary}`,
      `Trigger: ${selected.trigger}`,
      "",
      "خطوات الإعداد:",
      ...selected.setupSteps.map((item) => `- ${item}`),
      "",
      "قائمة التحقق للاختبار:",
      ...selected.testingChecklist.map((item) => `- ${item}`),
    ].join("\n");
    const copied = await copyTextToClipboard(text);
    setNotice(copied ? "تم نسخ خطة التنفيذ." : "تعذر النسخ تلقائيًا على هذا المتصفح.");
  }

  function handleUseTemplate(id: string) {
    saveTemplate(id);
    setNotice("تم حفظ القالب في localStorage وسيظهر في لوحة التحكم.");
  }

  return (
    <div className="space-y-6">
      <SearchFilterBar
        search={search}
        onSearch={setSearch}
        filters={categoryFilters}
        labels={categoryLabels}
        activeFilter={activeCategory}
        onFilterChange={setActiveCategory}
        placeholder="ابحث عن قالب أو أداة أو مشكلة تشغيلية"
      />

      {!compact ? (
        <div className="grid gap-3 md:grid-cols-3">
          <InlineFilter title="القسم" options={departmentFilters} value={activeDepartment} onChange={setActiveDepartment} labels={departmentLabels} />
          <InlineFilter title="مستوى الصعوبة" options={difficultyFilters} value={activeDifficulty} onChange={setActiveDifficulty} />
          <InlineFilter title="نوع الوصول" options={accessFilters} value={activeAccess} onChange={setActiveAccess} labels={accessLabels} />
        </div>
      ) : null}

      {notice ? (
        <div className="rounded-2xl border border-[rgba(87,225,255,0.24)] bg-[rgba(87,225,255,0.08)] px-4 py-3 text-sm text-[var(--cyan)]">
          {notice}
        </div>
      ) : null}

      {selected ? (
        <div className={`grid gap-6 ${compact ? "" : "xl:grid-cols-[1.1fr_0.9fr]"}`}>
          <div className="grid gap-5 md:grid-cols-2">
            {visibleTemplates.map((template) => (
              <div key={template.id} onMouseEnter={() => setSelectedId(template.id)}>
                <TemplateCard
                  template={template}
                  action={
                    <div className="grid gap-2 sm:grid-cols-2">
                      <GradientButton onClick={() => handleUseTemplate(template.id)} className="w-full">
                        استخدم القالب
                      </GradientButton>
                      <GradientButton onClick={() => setSelectedId(template.id)} variant="secondary" className="w-full">
                        عرض الـ Workflow
                      </GradientButton>
                    </div>
                  }
                />
              </div>
            ))}
          </div>

          {!compact ? (
            <GlassCard className="sticky top-28 h-fit space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="font-display text-xs uppercase tracking-[0.24em] text-[var(--cyan)]/75">معاينة القالب</div>
                  <h3 className="mt-2 font-heading text-2xl font-semibold text-white">{selected.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge tone={selected.access === "Service-ready" ? "gold" : selected.access === "Pro" ? "violet" : "green"}>
                    {accessLabels[selected.access] ?? selected.access}
                  </StatusBadge>
                  <StatusBadge tone={selected.difficulty === "متقدم" ? "gold" : selected.difficulty === "متوسط" ? "cyan" : "green"}>
                    {selected.difficulty}
                  </StatusBadge>
                </div>
              </div>

              <p className="text-sm leading-7 text-[var(--text-muted)]">{selected.workflowSummary}</p>

              <div className="grid gap-3 sm:grid-cols-2">
                <MiniStat label="الفئة" value={categoryLabels[selected.category] ?? selected.category} />
                <MiniStat label="القسم" value={departmentLabels[selected.department] ?? selected.department} />
                <MiniStat label="زمن الإعداد" value={selected.estimatedSetupTime} />
                <MiniStat label="عدد الأدوات" value={`${selected.requiredTools.length}`} />
              </div>

              <SectionBlock title="الأدوات المطلوبة" items={selected.requiredTools} />
              <SectionBlock title="خطوات الإعداد" items={selected.setupSteps} />
              <SectionBlock title="حقول الإدخال" items={selected.inputFields} />
              <SectionBlock title="Checklist الاختبار" items={selected.testingChecklist} />
              <SectionBlock title="المخاطر" items={selected.risks} />
              <SectionBlock title="أفكار التطوير" items={selected.upgradeIdeas} />

              <div className="rounded-[24px] border border-[rgba(244,198,114,0.24)] bg-[rgba(244,198,114,0.08)] p-4 text-sm leading-7 text-[var(--gold)]">
                <span className="font-semibold text-white">المخرج النهائي:</span> {selected.output}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <GradientButton onClick={() => handleUseTemplate(selected.id)} className="w-full">
                  استخدم القالب
                </GradientButton>
                <GradientButton onClick={copyImplementationPlan} variant="secondary" className="w-full">
                  انسخ خطة التنفيذ
                </GradientButton>
              </div>
            </GlassCard>
          ) : null}
        </div>
      ) : (
        <EmptyState title="لا توجد قوالب مطابقة" description="جرّب تغيير الفلاتر أو البحث باسم مختلف أو قسم آخر." />
      )}
    </div>
  );
}

function InlineFilter({
  title,
  options,
  value,
  onChange,
  labels,
}: {
  title: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  labels?: Record<string, string>;
}) {
  return (
    <label className="rounded-[22px] border border-white/10 bg-white/5 p-4">
      <div className="mb-2 text-sm text-[var(--text-muted)]">{title}</div>
      <select value={value} onChange={(event) => onChange(event.target.value)} className={fieldClassName}>
        {options.map((option) => (
          <option key={option}>{labels?.[option] ?? option}</option>
        ))}
      </select>
    </label>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
      <div className="text-xs text-[var(--text-soft)]">{label}</div>
      <div className="mt-2 text-sm text-white">{value}</div>
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

const fieldClassName =
  "h-12 w-full rounded-2xl border border-white/10 bg-[rgba(6,10,19,0.82)] px-4 text-sm text-white outline-none focus:border-[var(--border-bright)]";
