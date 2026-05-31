import Link from "next/link";
import type { ReactNode } from "react";
import type { AdminMetric, AutomationLab, AutomationPath, AutomationService, AutomationTemplate, AutomationTool, DashboardStat, IntegrationApp } from "@/types";
import { BulletList, GlassCard, GradientButton, StatusBadge } from "@/components/ui";

export function PathCard({ path }: { path: AutomationPath }) {
  return (
    <GlassCard className="flex h-full flex-col gap-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-display text-xs uppercase tracking-[0.24em] text-[var(--cyan)]/75">{path.englishLabel}</div>
          <h3 className="mt-2 font-heading text-xl font-semibold text-white">{path.title}</h3>
        </div>
        <StatusBadge tone={path.difficulty === "مبتدئ" ? "green" : path.difficulty === "متوسط" ? "cyan" : "gold"}>
          {path.difficulty}
        </StatusBadge>
      </div>
      <p className="text-sm leading-7 text-[var(--text-muted)]">{path.description}</p>
      <div className="grid grid-cols-3 gap-3 text-sm">
        <Metric label="الدروس" value={`${path.lessons}`} />
        <Metric label="المشاريع" value={`${path.projects}`} />
        <Metric label="المدة" value={path.duration} />
      </div>
      <div className="flex flex-wrap gap-2">
        {path.focus.map((item) => (
          <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[var(--text-soft)]">
            {item}
          </span>
        ))}
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
          <StatusBadge tone={template.featured ? "gold" : "cyan"}>{template.category}</StatusBadge>
          <h3 className="font-heading text-xl font-semibold text-white">{template.title}</h3>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--text-soft)]">{template.timeSaved}</span>
      </div>
      <p className="text-sm leading-7 text-[var(--text-muted)]">{template.description}</p>
      <div className="flex flex-wrap gap-2">
        {template.apps.map((app) => (
          <span key={app} className="rounded-full bg-[rgba(87,225,255,0.08)] px-3 py-1 text-xs text-[var(--cyan)]">
            {app}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <Metric label="الصعوبة" value={template.difficulty} />
        <Metric label="الأثر" value={template.outcome} compact />
      </div>
      {action}
    </GlassCard>
  );
}

export function LabCard({ lab, action }: { lab: AutomationLab; action?: ReactNode }) {
  return (
    <GlassCard className="flex h-full flex-col gap-5">
      <div className="space-y-2">
        <StatusBadge tone="violet">{lab.skillLevel}</StatusBadge>
        <h3 className="font-heading text-xl font-semibold text-white">{lab.title}</h3>
      </div>
      <p className="text-sm leading-7 text-[var(--text-muted)]">{lab.goal}</p>
      <div className="grid grid-cols-3 gap-3 text-sm">
        <Metric label="الأدوات" value={`${lab.tools.length}`} />
        <Metric label="الخطوات" value={`${lab.steps}`} />
        <Metric label="المدة" value={lab.duration} />
      </div>
      <div className="flex flex-wrap gap-2">
        {lab.tools.map((tool) => (
          <span key={tool} className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--text-soft)]">
            {tool}
          </span>
        ))}
      </div>
      {action}
    </GlassCard>
  );
}

export function ToolCard({ tool }: { tool: AutomationTool }) {
  return (
    <GlassCard className="flex h-full flex-col gap-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-display text-xs uppercase tracking-[0.24em] text-[var(--cyan)]/75">{tool.type}</div>
          <h3 className="mt-2 font-heading text-xl font-semibold text-white">{tool.name}</h3>
        </div>
        <StatusBadge tone={tool.pricing === "مجاني" ? "green" : tool.pricing === "مدفوع" ? "gold" : "cyan"}>
          {tool.pricing}
        </StatusBadge>
      </div>
      <p className="text-sm leading-7 text-[var(--text-muted)]">{tool.bestFor}</p>
      <Metric label="الاستخدام الموصى به" value={tool.useCase} compact />
      <div className="mt-auto flex flex-wrap gap-2">
        {tool.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs text-[var(--text-soft)]">
            {tag}
          </span>
        ))}
      </div>
      <Link href="/tools" className="mt-2 inline-flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-[var(--border-bright)]">
        <span>Learn</span>
        <span className="font-latin text-[var(--cyan)]">{tool.difficulty}</span>
      </Link>
    </GlassCard>
  );
}

export function ServiceCard({ service }: { service: AutomationService }) {
  return (
    <GlassCard className="flex h-full flex-col gap-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-heading text-xl font-semibold text-white">{service.title}</h3>
        <span className="rounded-full border border-[rgba(244,198,114,0.26)] bg-[rgba(244,198,114,0.08)] px-3 py-1 text-xs text-[var(--gold)]">
          {service.turnaround}
        </span>
      </div>
      <p className="text-sm leading-7 text-[var(--text-muted)]">{service.description}</p>
      <BulletList items={service.deliverables} />
    </GlassCard>
  );
}

export function PricingCard({
  plan,
}: {
  plan: { id: string; title: string; price: string; description: string; features: string[]; cta: string; href: string; featured?: boolean };
}) {
  return (
    <GlassCard className={`flex h-full flex-col gap-5 ${plan.featured ? "glow-border" : ""}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-heading text-2xl font-semibold text-white">{plan.title}</h3>
          <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{plan.description}</p>
        </div>
        {plan.featured ? <StatusBadge tone="gold">الأكثر طلبًا</StatusBadge> : null}
      </div>
      <div className="flex items-end gap-2">
        <span className="font-display text-4xl font-bold text-white">{plan.price}</span>
        <span className="text-sm text-[var(--text-soft)]">{plan.price === "حسب الطلب" ? "" : "EGP"}</span>
      </div>
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
    <GlassCard className="space-y-4">
      <div className="text-sm text-[var(--text-muted)]">{stat.label}</div>
      <div className="font-display text-3xl font-bold text-white">{stat.value}</div>
      <div className="text-sm text-[var(--cyan)]">{stat.trend}</div>
    </GlassCard>
  );
}

export function AdminMetricCard({ metric }: { metric: AdminMetric }) {
  return (
    <GlassCard className="space-y-4">
      <div className="text-sm text-[var(--text-muted)]">{metric.label}</div>
      <div className="font-display text-3xl font-bold text-white">{metric.value}</div>
      <div className="text-sm text-[var(--text-soft)]">{metric.hint}</div>
    </GlassCard>
  );
}

export function IntegrationCard({ app }: { app: IntegrationApp }) {
  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-heading text-lg font-semibold text-white">{app.name}</h3>
        <StatusBadge tone={app.status === "قريبًا" ? "violet" : app.status === "مفضل" ? "gold" : "green"}>
          {app.status}
        </StatusBadge>
      </div>
      <div className="font-display text-xs uppercase tracking-[0.24em] text-[var(--cyan)]/75">{app.category}</div>
      <p className="text-sm leading-7 text-[var(--text-muted)]">{app.useCase}</p>
    </GlassCard>
  );
}

function Metric({ label, value, compact = false }: { label: string; value: string; compact?: boolean }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className="text-xs text-[var(--text-soft)]">{label}</div>
      <div className={compact ? "mt-2 text-sm leading-6 text-white" : "mt-2 font-semibold text-white"}>{value}</div>
    </div>
  );
}
