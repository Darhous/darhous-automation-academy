import Link from "next/link";
import type { ReactNode } from "react";
import type {
  AdminMetric,
  AutomationLab,
  AutomationTemplate,
  AutomationTool,
  DashboardStat,
  IntegrationApp,
  LearningPath,
  ServicePackage,
} from "@/types";
import { BulletList, GlassCard, GradientButton, StatusBadge } from "@/components/ui";

function difficultyTone(level: string) {
  if (level === "مبتدئ") return "green" as const;
  if (level === "متوسط") return "cyan" as const;
  return "gold" as const;
}

function accessTone(access: AutomationTemplate["access"]) {
  if (access === "Free") return "green" as const;
  if (access === "Pro") return "violet" as const;
  return "gold" as const;
}

function accessLabel(access: AutomationTemplate["access"]) {
  if (access === "Free") return "مجاني";
  if (access === "Pro") return "احترافي";
  return "جاهز للخدمة";
}

function categoryLabel(category: string) {
  const labels: Record<string, string> = {
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

  return labels[category] ?? category;
}

function departmentLabel(department: string) {
  const labels: Record<string, string> = {
    education: "التعليم",
    sales: "المبيعات",
    operations: "العمليات",
    marketing: "التسويق",
    hr: "الموارد البشرية",
    support: "خدمة العملاء",
    finance: "المالية",
  };

  return labels[department] ?? department;
}

function integrationTone(status: IntegrationApp["status"]) {
  if (status === "جاهز") return "green" as const;
  if (status === "مفضل") return "cyan" as const;
  return "violet" as const;
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/5 p-3">
      <div className="text-xs text-[var(--text-soft)]">{label}</div>
      <div className="mt-2 font-display text-sm font-semibold text-white">{value}</div>
    </div>
  );
}

export function PathCard({ path }: { path: LearningPath }) {
  return (
    <GlassCard className="flex h-full flex-col gap-5">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="font-display text-xs uppercase tracking-[0.24em] text-[var(--cyan)]/75">{path.englishLabel}</div>
          <h3 className="font-heading text-2xl font-semibold text-white">{path.title}</h3>
          <p className="text-sm text-[var(--text-soft)]">{path.subtitle}</p>
        </div>
        <StatusBadge tone={difficultyTone(path.level)}>{path.level}</StatusBadge>
      </div>

      <p className="text-sm leading-7 text-[var(--text-muted)]">{path.outcome}</p>

      <div className="grid grid-cols-3 gap-3 text-sm">
        <Metric label="الدروس" value={`${path.estimatedLessons}`} />
        <Metric label="الوحدات" value={`${path.modules.length}`} />
        <Metric label="المدة" value={path.duration} />
      </div>

      <div className="flex flex-wrap gap-2">
        {path.recommendedTools.slice(0, 4).map((tool) => (
          <span key={tool} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[var(--text-soft)]">
            {tool}
          </span>
        ))}
      </div>

      <div className="rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
        <div className="text-xs text-[var(--text-soft)]">المشروع الختامي</div>
        <div className="mt-2 text-sm leading-7 text-white">{path.finalCapstoneProject}</div>
      </div>

      <div className="mt-auto">
        <GradientButton href="/paths" variant="secondary" className="w-full">
          استكشف المسار
        </GradientButton>
      </div>
    </GlassCard>
  );
}

export function TemplateCard({
  template,
  action,
}: {
  template: AutomationTemplate;
  action?: ReactNode;
}) {
  return (
    <GlassCard className="flex h-full flex-col gap-5">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <StatusBadge tone={accessTone(template.access)}>{accessLabel(template.access)}</StatusBadge>
            <StatusBadge tone={difficultyTone(template.difficulty)}>{template.difficulty}</StatusBadge>
          </div>
          <h3 className="font-heading text-xl font-semibold text-white">{template.title}</h3>
          <p className="text-sm text-[var(--text-soft)]">
            {categoryLabel(template.category)} • {departmentLabel(template.department)}
          </p>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-2 text-xs text-[var(--text-soft)]">{template.estimatedSetupTime}</span>
      </div>

      <p className="text-sm leading-7 text-[var(--text-muted)]">{template.businessProblem}</p>

      <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
        <div className="text-xs text-[var(--text-soft)]">ملخص التدفق</div>
        <div className="mt-2 text-sm leading-7 text-white">{template.workflowSummary}</div>
      </div>

      <div className="flex flex-wrap gap-2">
        {template.requiredTools.slice(0, 4).map((tool) => (
          <span key={tool} className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--text-muted)]">
            {tool}
          </span>
        ))}
      </div>

      <div className="text-sm text-[var(--text-muted)]">
        <span className="text-[var(--cyan)]">Trigger:</span> {template.trigger}
      </div>

      <div className="mt-auto">{action}</div>
    </GlassCard>
  );
}

export function ToolCard({
  tool,
  action,
}: {
  tool: AutomationTool;
  action?: ReactNode;
}) {
  return (
    <GlassCard className="flex h-full flex-col gap-5">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="font-display text-xs uppercase tracking-[0.24em] text-[var(--cyan)]/75">{tool.category}</div>
          <h3 className="font-heading text-xl font-semibold text-white">{tool.name}</h3>
        </div>
        <StatusBadge tone={difficultyTone(tool.difficulty)}>{tool.difficulty}</StatusBadge>
      </div>

      <p className="text-sm leading-7 text-[var(--text-muted)]">{tool.whatItIs}</p>

      <div className="grid grid-cols-2 gap-3">
        <Metric label="التسعير" value={tool.pricingCategory} />
        <Metric label="العربية" value={tool.arabicSupport} />
      </div>

      <div className="space-y-3">
        <div className="text-sm font-semibold text-white">أفضل استخدامات</div>
        <BulletList items={tool.bestUseCases.slice(0, 3)} />
      </div>

      <div className="mt-auto">{action}</div>
    </GlassCard>
  );
}

export function LabCard({
  lab,
  action,
}: {
  lab: AutomationLab;
  action?: ReactNode;
}) {
  return (
    <GlassCard className="flex h-full flex-col gap-5">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h3 className="font-heading text-xl font-semibold text-white">{lab.title}</h3>
          <p className="text-sm text-[var(--text-soft)]">{lab.objective}</p>
        </div>
        <StatusBadge tone={difficultyTone(lab.level)}>{lab.level}</StatusBadge>
      </div>

      <p className="text-sm leading-7 text-[var(--text-muted)]">{lab.scenario}</p>

      <div className="grid grid-cols-3 gap-3">
        <Metric label="الخطوات" value={`${lab.steps.length}`} />
        <Metric label="المدة" value={lab.duration} />
        <Metric label="الأدوات" value={`${lab.tools.length}`} />
      </div>

      <div className="flex flex-wrap gap-2">
        {lab.tools.slice(0, 4).map((tool) => (
          <span key={tool} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[var(--text-soft)]">
            {tool}
          </span>
        ))}
      </div>

      <div className="mt-auto">{action}</div>
    </GlassCard>
  );
}

export function ServiceCard({ service }: { service: ServicePackage }) {
  return (
    <GlassCard className="flex h-full flex-col gap-5">
      <div className="space-y-2">
        <div className="font-display text-xs uppercase tracking-[0.24em] text-[var(--cyan)]/75">{service.timeline}</div>
        <h3 className="font-heading text-xl font-semibold text-white">{service.title}</h3>
        <p className="text-sm leading-7 text-[var(--text-muted)]">{service.whoItsFor}</p>
      </div>

      <div className="grid gap-3">
        <Metric label="النطاق الابتدائي" value={service.startingScope} />
      </div>

      <BulletList items={service.deliverables.slice(0, 3)} />

      <div className="mt-auto">
        <GradientButton href="/services" variant="secondary" className="w-full">
          {service.cta}
        </GradientButton>
      </div>
    </GlassCard>
  );
}

export function PricingCard({
  plan,
}: {
  plan: {
    id: string;
    title: string;
    price: string;
    description: string;
    features: string[];
    cta: string;
    href: string;
    featured?: boolean;
  };
}) {
  return (
    <GlassCard className={`flex h-full flex-col gap-5 ${plan.featured ? "glow-border" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-heading text-2xl font-semibold text-white">{plan.title}</h3>
          <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{plan.description}</p>
        </div>
        {plan.featured ? <StatusBadge tone="gold">الأكثر طلبًا</StatusBadge> : null}
      </div>
      <div className="font-display text-3xl font-bold text-[var(--cyan)]">{plan.price}</div>
      <BulletList items={plan.features} />
      <div className="mt-auto">
        <GradientButton href={plan.href} variant={plan.featured ? "primary" : "secondary"} className="w-full">
          {plan.cta}
        </GradientButton>
      </div>
    </GlassCard>
  );
}

export function DashboardCard({ stat }: { stat: DashboardStat }) {
  return (
    <GlassCard className="space-y-3">
      <div className="text-sm text-[var(--text-muted)]">{stat.label}</div>
      <div className="font-display text-3xl font-bold text-white">{stat.value}</div>
      <div className="text-xs text-[var(--cyan)]">{stat.trend}</div>
    </GlassCard>
  );
}

export function AdminMetricCard({ metric }: { metric: AdminMetric }) {
  return (
    <GlassCard className="space-y-3">
      <div className="text-sm text-[var(--text-muted)]">{metric.label}</div>
      <div className="font-display text-3xl font-bold text-white">{metric.value}</div>
      <div className="text-xs leading-6 text-[var(--text-soft)]">{metric.hint}</div>
    </GlassCard>
  );
}

export function IntegrationCard({ app }: { app: IntegrationApp }) {
  return (
    <GlassCard className="flex h-full flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-display text-xs uppercase tracking-[0.24em] text-[var(--cyan)]/75">{app.category}</div>
          <h3 className="mt-2 font-heading text-xl font-semibold text-white">{app.name}</h3>
        </div>
        <StatusBadge tone={integrationTone(app.status)}>{app.status}</StatusBadge>
      </div>
      <p className="text-sm leading-7 text-[var(--text-muted)]">{app.useCase}</p>
      <div className="mt-auto">
        <Link href="/coming-soon" className="text-sm font-semibold text-[var(--cyan)]">
          مسار التكامل
        </Link>
      </div>
    </GlassCard>
  );
}
