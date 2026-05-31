"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { DashboardCard, TemplateCard } from "@/components/cards";
import { EmptyState, GlassCard, StatusBadge } from "@/components/ui";
import { automationLabsV2 } from "@/data/automationLabsV2";
import { automationLearningPaths } from "@/data/automationLearningPaths";
import { automationTemplates } from "@/data/automationTemplates";
import { getGeneratedWorkflows, getSavedBlueprints, getSavedTemplates, getServiceRequests } from "@/lib/storage";
import { formatDate } from "@/lib/utils";
import type { AutomationBlueprint, GeneratedWorkflow, ServiceRequest } from "@/types";

export function DashboardView() {
  const [savedTemplateIds, setSavedTemplateIds] = useState<string[]>([]);
  const [workflows, setWorkflows] = useState<GeneratedWorkflow[]>([]);
  const [blueprints, setBlueprints] = useState<AutomationBlueprint[]>([]);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      setSavedTemplateIds(getSavedTemplates());
      setWorkflows(getGeneratedWorkflows());
      setBlueprints(getSavedBlueprints());
      setRequests(getServiceRequests());
    }, 0);

    return () => window.clearTimeout(handle);
  }, []);

  const savedTemplates = useMemo(
    () => automationTemplates.filter((template) => savedTemplateIds.includes(template.id)),
    [savedTemplateIds],
  );

  const enrolledPaths = automationLearningPaths.slice(0, 3);
  const completedLabs = automationLabsV2.slice(0, 4);
  const maturityScore = Math.min(92, 38 + savedTemplates.length * 4 + blueprints.length * 8 + workflows.length * 5);

  const stats = [
    { id: "paths", label: "المسارات الملتحق بها", value: `${enrolledPaths.length}`, trend: "منهج واضح ومتدرج" },
    { id: "templates", label: "القوالب المحفوظة", value: `${savedTemplates.length}`, trend: "تظهر من سوق القوالب مباشرة" },
    { id: "blueprints", label: "الـ blueprints المحفوظة", value: `${blueprints.length}`, trend: "ناتجة من Automation Agent" },
    { id: "labs", label: "المعامل المكتملة", value: `${completedLabs.length}`, trend: "جاهزة للتطبيق العملي" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <DashboardCard key={stat.id} stat={stat} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
        <GlassCard className="space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <StatusBadge tone="cyan">Demo user profile</StatusBadge>
              <h2 className="mt-3 font-heading text-2xl font-semibold text-white">أحمد - Automation Strategist</h2>
              <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">
                هذه اللوحة تجمع التعلّم، القوالب، الـ blueprints، الـ workflows، وطلبات الخدمة في مكان واحد، مع بنية جاهزة للربط لاحقًا بالحساب المشترك داخل منظومة Darhous.
              </p>
            </div>
            <div className="rounded-[24px] border border-[rgba(87,225,255,0.24)] bg-[rgba(87,225,255,0.08)] p-4 text-right">
              <div className="text-sm text-[var(--text-soft)]">Automation Maturity Score</div>
              <div className="mt-2 font-display text-4xl font-bold text-white">{maturityScore}%</div>
              <div className="mt-2 text-xs text-[var(--cyan)]">جاهزية جيدة للانتقال من التجريب إلى التكرار المنضبط.</div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoBox title="المسار النشط" value={enrolledPaths[0].title} hint={enrolledPaths[0].subtitle} />
            <InfoBox title="الإجراء التالي الموصى به" value="ابدأ من Automation Agent" hint="صمّم blueprint ثم انقله إلى builder أو التنفيذ." />
            <InfoBox title="اقتراح ذكي" value="حوّل lead follow-up إلى خدمة فعلية" hint="أنت تملك قوالب ومولدًا ومسارًا مناسبًا لذلك." />
            <InfoBox title="الشهادات" value="Foundation for future shared certificates" hint="سيتم ربطها لاحقًا مع السجل الموحد." />
          </div>
        </GlassCard>

        <GlassCard className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-heading text-2xl font-semibold text-white">Quick Links</h3>
            <StatusBadge tone="violet">Action Center</StatusBadge>
          </div>
          <div className="grid gap-3">
            {[
              { href: "/automation-agent", label: "افتح Automation Agent" },
              { href: "/templates", label: "استكشف القوالب" },
              { href: "/generator", label: "ولّد خطة جديدة" },
              { href: "/builder", label: "راجع Workflow في المعمل" },
              { href: "/services", label: "اطلب استشارة أتمتة" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-[var(--border-bright)]">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="rounded-[24px] border border-[rgba(244,198,114,0.24)] bg-[rgba(244,198,114,0.08)] p-4 text-sm leading-7 text-[var(--gold)]">
            أفضل مسار تالي لك الآن: صمّم blueprint لمشكلة حقيقية من عملك، ثم استخدم template جاهز لتسريع التنفيذ بدل البدء من الصفر.
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <GlassCard className="space-y-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-heading text-2xl font-semibold text-white">Saved Templates</h3>
            <StatusBadge tone="gold">{savedTemplates.length}</StatusBadge>
          </div>
          {savedTemplates.length ? (
            <div className="grid gap-4">
              {savedTemplates.slice(0, 2).map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="لم تحفظ أي قالب بعد"
              description="من سوق القوالب، زر Use Template يحفظ القالب هنا مباشرة لتبني عليه لاحقًا."
              cta={
                <Link href="/templates" className="rounded-2xl bg-[linear-gradient(135deg,#c8fbff_0%,#7ce8ff_45%,#8d90ff_100%)] px-4 py-3 text-sm font-semibold text-slate-950">
                  اذهب إلى القوالب
                </Link>
              }
            />
          )}
        </GlassCard>

        <GlassCard className="space-y-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-heading text-2xl font-semibold text-white">Generated Workflows</h3>
            <StatusBadge tone="cyan">{workflows.length}</StatusBadge>
          </div>
          {workflows.length ? (
            <div className="space-y-3">
              {workflows.map((workflow) => (
                <div key={workflow.id} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="font-heading text-lg font-semibold text-white">{workflow.title}</div>
                    <span className="text-xs text-[var(--text-soft)]">{formatDate(workflow.savedAt)}</span>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{workflow.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {workflow.recommendedTools.map((tool) => (
                      <span key={tool} className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--text-muted)]">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title="لا توجد workflows محفوظة" description="جرّب صفحة المولد أو الوكيل لحفظ أول خطة عملية هنا." />
          )}
        </GlassCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <GlassCard className="space-y-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-heading text-2xl font-semibold text-white">Generated Blueprints</h3>
            <StatusBadge tone="violet">{blueprints.length}</StatusBadge>
          </div>
          {blueprints.length ? (
            blueprints.map((blueprint) => (
              <div key={blueprint.id} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="font-semibold text-white">{blueprint.title}</div>
                  <StatusBadge tone={blueprint.estimatedComplexity === "متقدم" ? "gold" : blueprint.estimatedComplexity === "متوسط" ? "cyan" : "green"}>
                    {blueprint.estimatedComplexity}
                  </StatusBadge>
                </div>
                <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{blueprint.summary}</p>
                <div className="mt-3 text-xs text-[var(--text-soft)]">Stack: {blueprint.recommendedStack.join("، ")}</div>
              </div>
            ))
          ) : (
            <EmptyState title="لا توجد blueprints محفوظة" description="صفحة Automation Agent تحفظ المخططات هنا لتكمل عليها في أي وقت." />
          )}
        </GlassCard>

        <GlassCard className="space-y-5">
          <h3 className="font-heading text-2xl font-semibold text-white">Recent Activity & Learning Progress</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {enrolledPaths.map((path) => (
              <div key={path.id} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                <div className="font-semibold text-white">{path.title}</div>
                <div className="mt-2 text-sm text-[var(--text-muted)]">{path.duration}</div>
                <div className="mt-3 h-2 rounded-full bg-white/10">
                  <div className="h-2 rounded-full bg-[linear-gradient(90deg,#57e1ff,#8c7bff)]" style={{ width: `${Math.min(92, 38 + path.estimatedLessons)}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
            <div className="font-heading text-lg font-semibold text-white">Completed Labs</div>
            <div className="mt-3 space-y-2">
              {completedLabs.map((lab) => (
                <div key={lab.id} className="rounded-2xl border border-white/8 bg-[rgba(255,255,255,0.03)] px-4 py-3 text-sm text-[var(--text-muted)]">
                  {lab.title} • {lab.expectedOutput}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
            <div className="font-heading text-lg font-semibold text-white">Service Requests</div>
            <div className="mt-3 space-y-2">
              {requests.length ? (
                requests.map((request) => (
                  <div key={request.id} className="rounded-2xl border border-white/8 bg-[rgba(255,255,255,0.03)] px-4 py-3 text-sm text-[var(--text-muted)]">
                    {request.name} • {request.requestedAutomation}
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-white/8 bg-[rgba(255,255,255,0.03)] px-4 py-3 text-sm text-[var(--text-muted)]">
                  لا توجد طلبات خدمة بعد. صفحة الخدمات ستغذي هذه القائمة مباشرة.
                </div>
              )}
            </div>
          </div>
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
      <div className="mt-2 text-xs leading-6 text-[var(--text-soft)]">{hint}</div>
    </div>
  );
}
