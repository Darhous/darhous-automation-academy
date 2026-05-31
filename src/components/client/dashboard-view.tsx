"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { DashboardCard, TemplateCard } from "@/components/cards";
import { EmptyState, GlassCard, StatusBadge } from "@/components/ui";
import { dashboardStats } from "@/data/dashboardMock";
import { automationLabs } from "@/data/labs";
import { automationPaths } from "@/data/automationPaths";
import { automationTemplates } from "@/data/templates";
import { getGeneratedWorkflows, getSavedTemplates, getServiceRequests } from "@/lib/storage";
import { formatDate } from "@/lib/utils";
import type { GeneratedWorkflow, ServiceRequest } from "@/types";

export function DashboardView() {
  const [savedTemplateIds, setSavedTemplateIds] = useState<string[]>([]);
  const [workflows, setWorkflows] = useState<GeneratedWorkflow[]>([]);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      setSavedTemplateIds(getSavedTemplates());
      setWorkflows(getGeneratedWorkflows());
      setRequests(getServiceRequests());
    }, 0);

    return () => window.clearTimeout(handle);
  }, []);

  const savedTemplates = useMemo(
    () => automationTemplates.filter((template) => savedTemplateIds.includes(template.id)),
    [savedTemplateIds],
  );

  const nextPath = automationPaths[2];
  const completedLabs = automationLabs.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <DashboardCard key={stat.id} stat={stat} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <GlassCard className="space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <StatusBadge tone="cyan">Demo user profile</StatusBadge>
              <h2 className="mt-3 font-heading text-2xl font-semibold text-white">أحمد - متعلم ومسؤول أتمتة</h2>
              <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">
                نسخة dashboard الحالية تربط بين المسارات، القوالب المحفوظة، workflows المولدة، وطلبات الخدمة عبر localStorage.
              </p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm text-[var(--text-muted)]">
              <div>Active plan</div>
              <div className="mt-2 font-display text-lg font-bold text-white">متعلم محترف</div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoBox title="المسار النشط" value={nextPath.title} hint={nextPath.englishLabel} />
            <InfoBox title="الخطوة التالية" value="AI Email Summarizer Lab" hint="موصى به حسب اهتمامك الحالي" />
            <InfoBox title="الشهادات" value="Placeholder" hint="سيتم ربطها بمنظومة Darhous لاحقًا" />
            <InfoBox title="AI Suggestions" value="3 اقتراحات" hint="based on your saved workflows" />
          </div>
        </GlassCard>

        <GlassCard className="space-y-4">
          <div className="font-display text-xs uppercase tracking-[0.24em] text-[var(--cyan)]/75">Quick links</div>
          <div className="grid gap-3">
            {[
              { href: "/templates", label: "استكشف القوالب" },
              { href: "/generator", label: "افتح مولد الأتمتة" },
              { href: "/labs", label: "أكمل مختبرًا جديدًا" },
              { href: "/services", label: "اطلب خدمة مخصصة" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-[var(--border-bright)]">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="rounded-[24px] border border-[rgba(244,198,114,0.24)] bg-[rgba(244,198,114,0.08)] p-4 text-sm leading-7 text-[var(--gold)]">
            Recommended next automation: اربط تلخيص البريد اليومي بلوحة تنفيذ أسبوعية داخل Notion.
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <GlassCard className="space-y-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-heading text-2xl font-semibold text-white">Generated workflows</h3>
            <StatusBadge tone="violet">{workflows.length} saved</StatusBadge>
          </div>
          {workflows.length ? (
            <div className="space-y-3">
              {workflows.map((workflow) => (
                <div key={workflow.id} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="font-heading text-lg font-semibold text-white">{workflow.recommendedTemplate}</div>
                    <span className="text-xs text-[var(--text-soft)]">{formatDate(workflow.savedAt)}</span>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{workflow.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {workflow.requiredApps.map((app) => (
                      <span key={app} className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--text-muted)]">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="لا توجد workflows محفوظة بعد"
              description="جرّب صفحة مولد الأتمتة لحفظ أفكارك هنا تلقائيًا."
              cta={<Link href="/generator" className="rounded-2xl bg-[linear-gradient(135deg,#c8fbff_0%,#7ce8ff_45%,#8d90ff_100%)] px-4 py-3 text-sm font-semibold text-slate-950">افتح المولد</Link>}
            />
          )}
        </GlassCard>

        <GlassCard className="space-y-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-heading text-2xl font-semibold text-white">Saved templates</h3>
            <StatusBadge tone="gold">{savedTemplates.length} templates</StatusBadge>
          </div>
          {savedTemplates.length ? (
            <div className="grid gap-4">
              {savedTemplates.slice(0, 3).map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="لم تحفظ أي template بعد"
              description="على صفحة القوالب، زر Use Template يحفظ القالب هنا مباشرة."
              cta={<Link href="/templates" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white">اذهب إلى القوالب</Link>}
            />
          )}
        </GlassCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <GlassCard className="space-y-4">
          <h3 className="font-heading text-2xl font-semibold text-white">Completed labs</h3>
          {completedLabs.map((lab) => (
            <div key={lab.id} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="font-semibold text-white">{lab.title}</div>
              <div className="mt-1 text-sm text-[var(--text-muted)]">{lab.goal}</div>
            </div>
          ))}
        </GlassCard>

        <GlassCard className="space-y-4">
          <h3 className="font-heading text-2xl font-semibold text-white">Service requests</h3>
          {requests.length ? (
            requests.map((request) => (
              <div key={request.id} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-semibold text-white">{request.name}</div>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--text-soft)]">{request.urgency}</span>
                </div>
                <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{request.requestedAutomation}</p>
              </div>
            ))
          ) : (
            <EmptyState title="لا توجد طلبات خدمة بعد" description="أي طلب جديد من صفحة الخدمات سيظهر هنا مع الزمن والبيانات الأساسية." />
          )}
        </GlassCard>
      </div>
    </div>
  );
}

function InfoBox({ title, value, hint }: { title: string; value: string; hint: string }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <div className="text-sm text-[var(--text-muted)]">{title}</div>
      <div className="mt-2 font-heading text-xl font-semibold text-white">{value}</div>
      <div className="mt-2 text-xs text-[var(--text-soft)]">{hint}</div>
    </div>
  );
}
