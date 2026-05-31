"use client";

import { useEffect, useMemo, useState } from "react";
import { AdminMetricCard } from "@/components/cards";
import { EmptyState, GlassCard, StatusBadge } from "@/components/ui";
import { automationLabsV2 } from "@/data/automationLabsV2";
import { automationLearningPaths } from "@/data/automationLearningPaths";
import { automationTemplates } from "@/data/automationTemplates";
import { automationToolsDirectory } from "@/data/automationTools";
import { getGeneratedWorkflows, getSavedBlueprints, getServiceRequests } from "@/lib/storage";
import { formatDate } from "@/lib/utils";
import type { AutomationBlueprint, GeneratedWorkflow, ServiceRequest } from "@/types";

export function AdminView() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [workflows, setWorkflows] = useState<GeneratedWorkflow[]>([]);
  const [blueprints, setBlueprints] = useState<AutomationBlueprint[]>([]);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      setRequests(getServiceRequests());
      setWorkflows(getGeneratedWorkflows());
      setBlueprints(getSavedBlueprints());
    }, 0);

    return () => window.clearTimeout(handle);
  }, []);

  const metrics = useMemo(
    () => [
      { id: "templates", label: "إجمالي القوالب", value: `${automationTemplates.length}`, hint: "قوالب متنوعة بين Free وPro وService-ready." },
      { id: "tools", label: "إجمالي الأدوات", value: `${automationToolsDirectory.length}`, hint: "دليل أدوات + أدوات استشارية داخل الصفحة." },
      { id: "labs", label: "إجمالي المعامل", value: `${automationLabsV2.length}`, hint: "معامل عملية جاهزة للتوسع إلى tracked labs لاحقًا." },
      { id: "paths", label: "إجمالي المسارات", value: `${automationLearningPaths.length}`, hint: "نظام تعلم واسع يغطي التأسيس والتنفيذ والحوكمة." },
    ],
    [],
  );

  const popularPaths = automationLearningPaths.slice(0, 5);
  const missingAreas = ["Power BI / dashboards", "ERP workflows", "document OCR pipelines", "advanced WhatsApp provider guides"];

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-[rgba(244,198,114,0.24)] bg-[rgba(244,198,114,0.08)] px-5 py-4 text-sm leading-7 text-[var(--gold)]">
        هذه لوحة إدارة واجهية foundation فقط. لا توجد صلاحيات حقيقية أو backend آمن بعد، لكنها جاهزة لتصبح طبقة تشغيل ومحتوى عند ربطها بخدمات المنظومة الرئيسية.
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <AdminMetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <GlassCard className="space-y-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-heading text-2xl font-semibold text-white">Portal Analytics</h2>
            <StatusBadge tone="cyan">v2 content foundation</StatusBadge>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Panel title="Manage Users" value="واجهة تمهيدية لحين الربط مع Darhous SSO والحساب الموحد." />
            <Panel title="Manage Courses" value="تعتمد حاليًا على data static منظمة وقابلة للتحويل إلى CMS أو DB." />
            <Panel title="Manage Learning Paths" value={`${automationLearningPaths.length} path جاهز للتصنيف والتوسعة.`} />
            <Panel title="Manage Templates" value={`${automationTemplates.length} template مع metadata عملية.`} />
            <Panel title="Manage Labs" value={`${automationLabsV2.length} lab مع objective وsteps وchecklist.`} />
            <Panel title="Manage Tools Directory" value={`${automationToolsDirectory.length} entries + calculators + advisor داخل /tools.`} />
          </div>
        </GlassCard>

        <GlassCard className="space-y-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-heading text-2xl font-semibold text-white">Popular Paths</h2>
            <StatusBadge tone="violet">Mock operational insight</StatusBadge>
          </div>
          {popularPaths.map((path, index) => (
            <div key={path.id} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="font-semibold text-white">{path.title}</div>
                <span className="text-xs text-[var(--text-soft)]">#{index + 1}</span>
              </div>
              <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{path.subtitle}</p>
            </div>
          ))}
        </GlassCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <GlassCard className="space-y-5">
          <h2 className="font-heading text-2xl font-semibold text-white">Service Requests Inbox</h2>
          {requests.length ? (
            <div className="grid gap-4">
              {requests.map((request) => (
                <div key={request.id} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-semibold text-white">{request.name}</div>
                    <StatusBadge tone="gold">{request.urgency}</StatusBadge>
                  </div>
                  <div className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{request.requestedAutomation}</div>
                  <div className="mt-3 text-xs text-[var(--text-soft)]">
                    {request.email} • {request.whatsapp} • {formatDate(request.submittedAt)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title="لا توجد طلبات خدمة حتى الآن" description="صفحة الخدمات ستغذي هذه القائمة مباشرة في هذا الإصدار." />
          )}
        </GlassCard>

        <GlassCard className="space-y-5">
          <h2 className="font-heading text-2xl font-semibold text-white">Generated Blueprints & Workflows</h2>
          <div className="space-y-3">
            {blueprints.length ? (
              blueprints.map((blueprint) => (
                <div key={blueprint.id} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-semibold text-white">{blueprint.title}</div>
                    <StatusBadge tone={blueprint.estimatedComplexity === "متقدم" ? "gold" : blueprint.estimatedComplexity === "متوسط" ? "cyan" : "green"}>
                      {blueprint.estimatedComplexity}
                    </StatusBadge>
                  </div>
                  <div className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{blueprint.summary}</div>
                </div>
              ))
            ) : (
              <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm text-[var(--text-muted)]">
                لا توجد blueprints محفوظة بعد.
              </div>
            )}

            {workflows.length ? (
              workflows.map((workflow) => (
                <div key={workflow.id} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-semibold text-white">{workflow.title}</div>
                    <span className="text-xs text-[var(--text-soft)]">{formatDate(workflow.savedAt)}</span>
                  </div>
                  <div className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{workflow.prompt}</div>
                </div>
              ))
            ) : (
              <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm text-[var(--text-muted)]">
                لا توجد workflows مولدة حتى الآن.
              </div>
            )}
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
        <GlassCard className="space-y-5">
          <h2 className="font-heading text-2xl font-semibold text-white">Content Coverage</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Panel title="Learning" value="مسارات + دروس + glossary + prompts + case studies" />
            <Panel title="Building" value="Generator + Agent + Builder + Templates + Labs" />
            <Panel title="Services" value="باقات خدمة + consultation form + local operational inbox" />
            <Panel title="Future Integration" value="طبقة integration.ts واضحة للحساب المشترك والـ backend." />
          </div>
        </GlassCard>

        <GlassCard className="space-y-5">
          <h2 className="font-heading text-2xl font-semibold text-white">Suggested Next Updates</h2>
          {missingAreas.map((item) => (
            <div key={item} className="rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm text-[var(--text-muted)]">
              {item}
            </div>
          ))}
        </GlassCard>
      </div>
    </div>
  );
}

function Panel({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <div className="font-display text-xs uppercase tracking-[0.22em] text-[var(--text-soft)]">{title}</div>
      <div className="mt-3 text-base leading-7 text-white">{value}</div>
    </div>
  );
}
