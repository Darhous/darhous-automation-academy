import Link from "next/link";
import type { ReactNode } from "react";
import { BotIcon, FormIcon, MailIcon, NetworkIcon, SparkIcon, UserIcon } from "@/components/icons";
import { LabCard, PathCard, PricingCard, ServiceCard, ToolCard } from "@/components/cards";
import { BuilderLab } from "@/components/client/builder-lab";
import { GeneratorStudio } from "@/components/client/generator-studio";
import { TemplatesMarketplace } from "@/components/client/templates-marketplace";
import { HeroWorkflowCanvas } from "@/components/workflow-canvas";
import { SectionHeader, GradientButton, GlassCard, StatusBadge } from "@/components/ui";
import { automationPaths } from "@/data/automationPaths";
import { automationLabs } from "@/data/labs";
import { pricingPlans } from "@/data/pricing";
import { automationServices } from "@/data/services";
import { automationTools } from "@/data/tools";
import { siteConfig } from "@/data/core";
import { industryUseCases } from "@/data/useCases";

const pillars = [
  { title: "تعلم الأتمتة", description: "محتوى عربي واضح يبني الفهم قبل التنفيذ.", icon: FormIcon },
  { title: "ابنِ workflows", description: "مختبرات ومعاينات builder تساعدك تشوف المنطق وهو يتحرك.", icon: NetworkIcon },
  { title: "استخدم قوالب جاهزة", description: "Marketplace قابل للحفظ والتخصيص السريع.", icon: MailIcon },
  { title: "اطلب خدمة أتمتة مخصصة", description: "منصة واحدة للتعلم والتنفيذ الفعلي معًا.", icon: BotIcon },
];

export function HomePage() {
  return (
    <div className="space-y-12 pb-8">
      <section className="section-shell pt-6">
        <div className="section-inner grid items-center gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <StatusBadge tone="cyan">Arabic-first SaaS / EdTech / Automation Platform</StatusBadge>
            <div className="space-y-4">
              <h1 className="font-heading text-5xl font-bold leading-tight text-white sm:text-6xl glow-text">
                {siteConfig.slogan}
              </h1>
              <p className="max-w-2xl text-lg leading-9 text-[var(--text-muted)]">{siteConfig.description}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <GradientButton href="/paths" icon={<SparkIcon className="h-4 w-4" />}>
                ابدأ التعلم الآن
              </GradientButton>
              <GradientButton href="/generator" variant="secondary">
                جرّب مولد الأتمتة
              </GradientButton>
              <GradientButton href="/templates" variant="ghost">
                استكشف القوالب
              </GradientButton>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <Stat value="+40" label="template جاهز" />
              <Stat value="8" label="مختبرات عملية" />
              <Stat value="3 طبقات" label="تعلم + بناء + تنفيذ" />
            </div>
          </div>
          <HeroWorkflowCanvas />
        </div>
      </section>

      <SectionBlock
        eyebrow="About Darhous"
        title="منصة حقيقية تبني المهارة والمسار التنفيذي معًا"
        description="ليست مجرد واجهة دعائية. هذه المنصة مصممة كأكاديمية ومنتج SaaS تعليمي وتشغيلي في الوقت نفسه، جاهزة للعرض اليوم والدمج لاحقًا."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <GlassCard key={pillar.title} className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(87,225,255,0.12)] text-[var(--cyan)]">
                  <Icon />
                </div>
                <h3 className="font-heading text-xl font-semibold text-white">{pillar.title}</h3>
                <p className="text-sm leading-7 text-[var(--text-muted)]">{pillar.description}</p>
              </GlassCard>
            );
          })}
        </div>
      </SectionBlock>

      <SectionBlock
        eyebrow="Learning Paths"
        title="مسارات تعليمية تبنيك من الفهم إلى التنفيذ"
        description="ستة مسارات أساسية تغطي الأساسيات، no-code، الذكاء الاصطناعي، الأعمال، التسويق، وحالات المطورين."
        actions={<GradientButton href="/paths" variant="secondary">كل المسارات</GradientButton>}
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {automationPaths.map((path) => (
            <PathCard key={path.id} path={path} />
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        eyebrow="Template Marketplace"
        title="سوق قوالب عملي بدل صفحات فارغة"
        description="القوالب ليست زينة. يمكنك استعراضها، تصفيتها، ثم حفظها للوحة التحكم واستخدامها كأساس لمولد الأتمتة."
      >
        <TemplatesMarketplace compact />
      </SectionBlock>

      <SectionBlock
        eyebrow="AI Generator"
        title="مولد أتمتة يترجم الفكرة إلى workflow مفهوم"
        description="بدون أي API خارجي في هذه النسخة. التوليد deterministic لكنه مصمم ليعطيك trigger، apps، steps، complexity، وtemplate مناسب."
      >
        <GeneratorStudio compact />
      </SectionBlock>

      <SectionBlock
        eyebrow="Builder Preview"
        title="واجهة builder تشعرك أن المنتج حي"
        description="معاينة workflow builder فيها sidebar، canvas، إعدادات node، زر تشغيل، وسجل logs تجريبي."
      >
        <BuilderLab compact />
      </SectionBlock>

      <SectionBlock
        eyebrow="Automation Labs"
        title="مختبرات تطبيقية قابلة للتوسع"
        description="كل مختبر هنا يربط فكرة تعليمية بمخرج ملموس يمكن تحويله لاحقًا إلى lesson flow كامل داخل المنظومة."
        actions={<GradientButton href="/labs" variant="secondary">كل المعامل</GradientButton>}
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {automationLabs.map((lab) => (
            <LabCard
              key={lab.id}
              lab={lab}
              action={<Link href="/labs" className="mt-auto rounded-2xl bg-[linear-gradient(135deg,#c8fbff_0%,#7ce8ff_45%,#8d90ff_100%)] px-4 py-3 text-center text-sm font-semibold text-slate-950">Start Lab</Link>}
            />
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        eyebrow="Services"
        title="خدمات تنفيذ حقيقية للشركات والفرق"
        description="إذا كانت لديك حاجة مباشرة في العمل، يمكن الانتقال من التعلم إلى طلب أتمتة مخصصة من نفس المنصة."
        actions={<GradientButton href="/services">اطلب أتمتة مخصصة</GradientButton>}
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {automationServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        eyebrow="Tools Explorer"
        title="دليل أدوات يساعدك تختار بدل أن تتوه"
        description="مقارنة سريعة بين n8n وMake وZapier وApps Script وAirtable وNotion وSheets وwebhooks وAPIs وAI Assistants."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {automationTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        eyebrow="Use Cases"
        title="حالات استخدام واضحة حسب المجال"
        description="المنصة تتكلم لغة الأعمال الفعلية، لذلك كل صناعة لها أمثلة عملية مباشرة بدل العموميات."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {industryUseCases.map((useCase) => (
            <GlassCard key={useCase.title} className="space-y-4">
              <h3 className="font-heading text-xl font-semibold text-white">{useCase.title}</h3>
              <div className="grid gap-2">
                {useCase.examples.map((example) => (
                  <div key={example} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--text-muted)]">
                    {example}
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        eyebrow="One Account Ecosystem"
        title="حساب واحد ضمن منظومة درهوس"
        description="المنصة مبنية اليوم كمنتج مستقل، لكن كل جزء فيها مفصول معماريًا بحيث يستوعب لاحقًا نفس الحساب، نفس البيانات، ونفس لوحة التحكم المشتركة."
      >
        <div className="grid gap-6 xl:grid-cols-[1fr_1.2fr]">
          <GlassCard className="space-y-4">
            {["نفس حساب درهوس", "نفس لوحة التحكم", "تقدمك محفوظ", "القوالب المحفوظة", "المشاريع الخاصة بك", "طلبات الخدمة", "الشهادات", "سجل التعلم"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--text-muted)]">
                {item}
              </div>
            ))}
          </GlassCard>
          <GlassCard className="space-y-6">
            <div className="grid gap-4 md:grid-cols-5">
              {["Darhous Main Platform", "Automation Academy", "User Dashboard", "Templates & Labs", "Services"].map((node, index) => (
                <div key={node} className="relative rounded-[24px] border border-white/10 bg-white/5 p-4 text-center text-sm font-semibold text-white">
                  {node}
                  {index < 4 ? <div className="marching-line absolute -left-5 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-[rgba(87,225,255,0.25)] md:block" /> : null}
                </div>
              ))}
            </div>
            <p className="text-sm leading-7 text-[var(--text-muted)]">
              Darhous Main Platform → Automation Academy → User Dashboard → Templates → Labs → Services
            </p>
          </GlassCard>
        </div>
      </SectionBlock>

      <SectionBlock
        eyebrow="Pricing"
        title="خيارات وصول واضحة من البداية"
        description="ابدأ مجانًا، انتقل لمسار احترافي، أو اطلب تنفيذًا مخصصًا إذا كنت جاهزًا للنتيجة التشغيلية مباشرة."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        eyebrow="Final CTA"
        title="ابدأ رحلتك في عالم الأتمتة الآن"
        description="تعلم، جرّب، ابنِ، وشغّل أول Workflow ذكي لك مع درهوس."
      >
        <GlassCard className="flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-center">
          <div className="space-y-3">
            <h3 className="font-heading text-3xl font-bold text-white">جاهز تتحول فكرتك إلى نظام يعمل فعلًا؟</h3>
            <p className="text-base leading-8 text-[var(--text-muted)]">{siteConfig.altSlogan}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <GradientButton href="/auth/register" icon={<UserIcon className="h-4 w-4" />}>ابدأ الآن</GradientButton>
            <GradientButton href="/templates" variant="secondary">استكشف القوالب</GradientButton>
            <GradientButton href="/services" variant="ghost">اطلب خدمة أتمتة</GradientButton>
          </div>
        </GlassCard>
      </SectionBlock>
    </div>
  );
}

function SectionBlock({
  eyebrow,
  title,
  description,
  children,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="section-shell">
      <div className="section-inner space-y-6">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} actions={actions} />
        {children}
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 px-4 py-4">
      <div className="font-display text-2xl font-bold text-white">{value}</div>
      <div className="mt-2 text-sm text-[var(--text-muted)]">{label}</div>
    </div>
  );
}
