"use client";

import { useEffect, useState } from "react";
import { AdminMetricCard } from "@/components/cards";
import { EmptyState, GlassCard, StatusBadge } from "@/components/ui";
import { adminMetrics } from "@/data/dashboardMock";
import { automationLabs } from "@/data/labs";
import { automationPaths } from "@/data/automationPaths";
import { automationTemplates } from "@/data/templates";
import { automationTools } from "@/data/tools";
import { getGeneratedWorkflows, getServiceRequests } from "@/lib/storage";
import { formatDate } from "@/lib/utils";
import type { GeneratedWorkflow, ServiceRequest } from "@/types";

export function AdminView() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [workflows, setWorkflows] = useState<GeneratedWorkflow[]>([]);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      setRequests(getServiceRequests());
      setWorkflows(getGeneratedWorkflows());
    }, 0);

    return () => window.clearTimeout(handle);
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-[rgba(244,198,114,0.24)] bg-[rgba(244,198,114,0.08)] px-5 py-4 text-sm leading-7 text-[var(--gold)]">
        هذه لوحة إدارة واجهية فقط في هذا الإصدار. لا توجد صلاحيات حقيقية أو backend آمن بعد، لكنها جاهزة للربط لاحقًا مع إدارة محتوى المنظومة الرئيسية.
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {adminMetrics.map((metric) => (
          <AdminMetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <GlassCard className="space-y-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-heading text-2xl font-semibold text-white">تحليلات البوابة</h2>
            <StatusBadge tone="cyan">أساس لوحة الإدارة</StatusBadge>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Panel title="إدارة المستخدمين" value="مستعد للربط مع SSO" />
            <Panel title="إدارة المسارات" value={`${automationPaths.length} مسارات تعليمية`} />
            <Panel title="إدارة القوالب" value={`${automationTemplates.length} قالبًا`} />
            <Panel title="إدارة المختبرات" value={`${automationLabs.length} مختبرات`} />
            <Panel title="دليل الأدوات" value={`${automationTools.length} أدوات`} />
            <Panel title="عناصر قادمة" value="جاهزة للربط مع CMS لاحقًا" />
          </div>
        </GlassCard>

        <GlassCard className="space-y-5">
          <h2 className="font-heading text-2xl font-semibold text-white">مراجعة الـ workflows المولدة</h2>
          {workflows.length ? (
            workflows.map((workflow) => (
              <div key={workflow.id} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-semibold text-white">{workflow.recommendedTemplate}</div>
                  <span className="text-xs text-[var(--text-soft)]">{workflow.complexity}</span>
                </div>
                <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{workflow.prompt}</p>
                <div className="mt-2 text-xs text-[var(--text-soft)]">{formatDate(workflow.savedAt)}</div>
              </div>
            ))
          ) : (
            <EmptyState title="لا توجد workflows للمراجعة" description="أي output محفوظ من مولد الأتمتة سيظهر هنا." />
          )}
        </GlassCard>
      </div>

      <GlassCard className="space-y-5">
        <h2 className="font-heading text-2xl font-semibold text-white">صندوق طلبات الخدمة</h2>
        {requests.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {requests.map((request) => (
              <div key={request.id} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-semibold text-white">{request.name}</div>
                  <StatusBadge tone="gold">{request.urgency}</StatusBadge>
                </div>
                <div className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{request.requestedAutomation}</div>
                <div className="mt-3 text-xs text-[var(--text-soft)]">{request.email} • {request.whatsapp}</div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="لا توجد طلبات خدمة حتى الآن" description="صفحة الخدمات ستغذي هذه القائمة مباشرة في هذا الإصدار." />
        )}
      </GlassCard>
    </div>
  );
}

function Panel({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <div className="font-display text-xs uppercase tracking-[0.22em] text-[var(--text-soft)]">{title}</div>
      <div className="mt-3 text-base text-white">{value}</div>
    </div>
  );
}
