import { BotIcon, ChartIcon, FormIcon, LayersIcon, NetworkIcon } from "@/components/icons";
import { PathCard, PricingCard, ServiceCard } from "@/components/cards";
import { BuilderLab } from "@/components/client/builder-lab";
import { GeneratorStudio } from "@/components/client/generator-studio";
import { LabsShowcase } from "@/components/client/labs-showcase";
import { TemplatesMarketplace } from "@/components/client/templates-marketplace";
import { HeroWorkflowCanvas } from "@/components/workflow-canvas";
import { GlassCard, GradientButton, SectionHeader, StatusBadge } from "@/components/ui";
import { automationCaseStudies } from "@/data/automationCaseStudies";
import { automationLearningPaths } from "@/data/automationLearningPaths";
import { automationPrompts } from "@/data/automationPrompts";
import { automationServicePackages } from "@/data/automationServices";
import { automationToolsDirectory } from "@/data/automationTools";
import { automationUseCases } from "@/data/automationUseCases";
import { integrationBlueprint } from "@/config/integration";
import { pricingPlans } from "@/data/pricing";
import { siteConfig } from "@/data/core";

const pillars = [
  { title: "Learn Automation", description: "مسارات عربية واضحة تبني الفهم ثم التطبيق ثم الحوكمة.", icon: FormIcon },
  { title: "Build Automation", description: "مولد، Builder، Labs، وقوالب جاهزة لتسريع التنفيذ.", icon: NetworkIcon },
  { title: "Design with an Agent", description: "وكيل استشاري يحول الوصف إلى Blueprint تنفيذي متكامل.", icon: BotIcon },
  { title: "Use Ready Templates", description: "Marketplace غني بقوالب عملية وقابلة للحفظ والتطوير.", icon: LayersIcon },
  { title: "Offer Automation as a Service", description: "صفحة خدمات وباقات واستشارة جاهزة للتعامل مع العملاء.", icon: ChartIcon },
];

const differentiators = [
  "عربي أولًا، لكن بدون إخفاء المصطلحات التقنية المهمة مثل workflow وtrigger وwebhook وAPI.",
  "منصة تجمع التعلم والتصميم والبناء والخدمة في رحلة واحدة، بدل فصلها في أدوات متباعدة.",
  "Automation Agent يعطيك blueprint حقيقي بدل مجرد نص تسويقي أو output عشوائي.",
  "طبقة بيانات typed ونظيفة تسمح بإضافة backend وSSO وdashboard shared لاحقًا بدون إعادة البناء من الصفر.",
];

export function HomePage() {
  const topPaths = automationLearningPaths.slice(0, 6);
  const topServices = automationServicePackages.slice(0, 6);
  const topUseCases = automationUseCases.slice(0, 6);
  const topTools = automationToolsDirectory.slice(0, 4);
  const topCaseStudies = automationCaseStudies.slice(0, 3);
  const topPrompts = automationPrompts.slice(0, 4);

  return (
    <div className="space-y-3 pb-6">
      <section className="section-shell pt-3">
        <div className="section-inner">
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <GlassCard className="overflow-hidden p-7 sm:p-8">
              <div className="relative z-10 space-y-6">
                <div className="flex flex-wrap gap-2">
                  <StatusBadge tone="cyan">Arabic-first Automation Academy</StatusBadge>
                  <StatusBadge tone="violet">v2 Product Platform</StatusBadge>
                </div>
                <div className="space-y-4">
                  <h1 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl xl:text-6xl">
                    تعلّم، صمّم، ابنِ، وأطلق الأتمتة من منصة واحدة
                  </h1>
                  <p className="max-w-2xl text-base leading-8 text-[var(--text-muted)] sm:text-lg">
                    {siteConfig.description} في v2، أصبحت المنصة أقرب إلى consultant عملي: تعلم structured، templates قابلة للاستخدام، Tools Hub، Labs، Builder، وAutomation Design Agent.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <GradientButton href="/automation-agent" className="w-full">
                    ابدأ مع الوكيل
                  </GradientButton>
                  <GradientButton href="/paths" variant="secondary" className="w-full">
                    ابدأ التعلّم
                  </GradientButton>
                  <GradientButton href="/templates" variant="ghost" className="w-full">
                    استكشف القوالب
                  </GradientButton>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <MiniHeroStat label="Learning Paths" value={`${automationLearningPaths.length}+`} />
                  <MiniHeroStat label="Templates" value="30+" />
                  <MiniHeroStat label="Labs & Tools" value={`${automationToolsDirectory.length}+`} />
                </div>
              </div>
            </GlassCard>

            <HeroWorkflowCanvas />
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="section-inner space-y-6">
          <SectionHeader
            eyebrow="Five Pillars"
            title="خمسة أعمدة تبني منصة أتمتة حقيقية"
            description="هذه ليست landing page فقط. هي أكاديمية، consultant، lab، marketplace، وواجهة خدمة جاهزة للنمو."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {pillars.map((pillar) => (
              <GlassCard key={pillar.title} className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border-bright)] bg-[rgba(87,225,255,0.08)] text-[var(--cyan)]">
                  <pillar.icon />
                </div>
                <h3 className="font-heading text-xl font-semibold text-white">{pillar.title}</h3>
                <p className="text-sm leading-7 text-[var(--text-muted)]">{pillar.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="section-inner">
          <GlassCard className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-5">
              <StatusBadge tone="gold">Flagship Feature</StatusBadge>
              <h2 className="font-heading text-3xl font-bold text-white">Automation Design Agent</h2>
              <p className="text-base leading-8 text-[var(--text-muted)]">
                من أول business goal إلى proposal جاهز للعميل وtechnical brief وprompts متعددة المنصات. الوكيل يسأل عن العملية الحالية، الأدوات، trigger، القيود، ثم يقترح stack مناسب وخطة اختبار وصيانة واضحة.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "يسأل عن الهدف والجهة والألم التشغيلي",
                  "يقترح stack حسب الكلفة والخصوصية والمهارة",
                  "يولد Blueprint وProposal وTechnical Brief",
                  "يحفظ المخرجات محليًا لتظهر داخل Dashboard",
                ].map((item) => (
                  <div key={item} className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--text-muted)]">
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <GradientButton href="/automation-agent">جرّب الوكيل الآن</GradientButton>
                <GradientButton href="/generator" variant="secondary">
                  ابدأ من المولد
                </GradientButton>
              </div>
            </div>

            <div className="grid gap-4">
              <GlassCard className="space-y-3 rounded-[26px] bg-[rgba(255,255,255,0.03)]">
                <div className="font-display text-xs uppercase tracking-[0.24em] text-[var(--cyan)]/75">Blueprint Preview</div>
                <div className="font-heading text-xl font-semibold text-white">Sales follow-up blueprint</div>
                <div className="space-y-2">
                  {["Trigger: New form submission", "Stack: Make + CRM + WhatsApp concepts", "Review: human approval للحالات الحساسة", "Output: lead follow-up + task + log"].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/8 bg-[rgba(255,255,255,0.03)] px-4 py-3 text-sm text-[var(--text-muted)]">
                      {item}
                    </div>
                  ))}
                </div>
              </GlassCard>
              <GlassCard className="space-y-3 rounded-[26px] bg-[rgba(255,255,255,0.03)]">
                <div className="font-heading text-lg font-semibold text-white">Prompt Library Snippets</div>
                {topPrompts.map((prompt) => (
                  <div key={prompt.id} className="rounded-2xl border border-white/8 bg-[rgba(255,255,255,0.03)] px-4 py-3">
                    <div className="font-semibold text-white">{prompt.title}</div>
                    <div className="mt-1 text-sm text-[var(--text-muted)]">{prompt.goal}</div>
                  </div>
                ))}
              </GlassCard>
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="section-shell">
        <div className="section-inner space-y-6">
          <SectionHeader
            eyebrow="Learning Paths"
            title="ابدأ من المسار المناسب بدل التشتت بين الأدوات"
            description="من الأساسيات حتى الحوكمة والأمن، المسارات هنا تغطي التعلم العملي وبناء capstone له معنى تشغيلي."
            actions={<GradientButton href="/paths">عرض كل المسارات</GradientButton>}
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {topPaths.map((path) => (
              <PathCard key={path.id} path={path} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="section-inner space-y-6">
          <SectionHeader
            eyebrow="Templates Marketplace"
            title="سوق قوالب قوي لاختصار أول 60% من التنفيذ"
            description="القوالب هنا ليست أسماء فارغة؛ كل قالب معه business problem وsummary وtools وtesting checklist وrisks وupgrade ideas."
            actions={<GradientButton href="/templates">اذهب إلى السوق الكامل</GradientButton>}
          />
          <TemplatesMarketplace compact />
        </div>
      </section>

      <section className="section-shell">
        <div className="section-inner space-y-6">
          <SectionHeader
            eyebrow="Generator + Builder"
            title="حوّل الفكرة إلى خطة، ثم افهمها على canvas"
            description="المولد يعطيك workflow plan متعدد المنصات، والمعمل يشرح المسار والعقد والأخطاء وخطة الاختبار."
          />
          <GeneratorStudio compact />
          <BuilderLab compact />
        </div>
      </section>

      <section className="section-shell">
        <div className="section-inner space-y-6">
          <SectionHeader
            eyebrow="Tools Hub"
            title="دليل أدوات + أدوات قرار تشغيلية"
            description="قبل أن تختار n8n أو Make أو Python، افهم متى تستخدم كل واحد ومتى تتجنبه. صفحة الأدوات فيها directory حي، ROI calculator، complexity estimator، stack advisor، checklist generator، وproposal generator."
            actions={<GradientButton href="/tools">افتح الأدوات</GradientButton>}
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {topTools.map((tool) => (
              <GlassCard key={tool.id} className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-heading text-xl font-semibold text-white">{tool.name}</div>
                  <StatusBadge tone={tool.difficulty === "متقدم" ? "gold" : tool.difficulty === "متوسط" ? "cyan" : "green"}>
                    {tool.difficulty}
                  </StatusBadge>
                </div>
                <p className="text-sm leading-7 text-[var(--text-muted)]">{tool.whatItIs}</p>
                <div className="text-sm text-[var(--cyan)]">{tool.bestUseCases.slice(0, 2).join(" • ")}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="section-inner space-y-6">
          <SectionHeader
            eyebrow="Practical Labs"
            title="مختبرات عملية تبني عضلة التنفيذ لا مجرد الفهم النظري"
            description="من Form to Sheet إلى Webhook concept وApproval workflow وn8n self-hosted concept، كل lab يعطيك objective وخطوات وأخطاء شائعة وتحديًا إضافيًا."
            actions={<GradientButton href="/labs">استعرض كل المعامل</GradientButton>}
          />
          <LabsShowcase compact />
        </div>
      </section>

      <section className="section-shell">
        <div className="section-inner space-y-6">
          <SectionHeader
            eyebrow="Services"
            title="منصة تعلم، نعم. لكن أيضًا جاهزة لتقديم الأتمتة كخدمة"
            description="سواء كنت صاحب عمل أو مقدم خدمة، صفحة الخدمات تقدم باقات واضحة ونموذج consultation يحفظ الطلبات محليًا الآن تمهيدًا للربط الكامل لاحقًا."
            actions={<GradientButton href="/services">اطلب استشارة أتمتة</GradientButton>}
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {topServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="section-inner grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
          <GlassCard className="space-y-5">
            <SectionHeader
              eyebrow="Use Cases"
              title="حالات استخدام حقيقية لقطاعات عربية عملية"
              description="التعليم، المبيعات، التسويق، الموارد البشرية، المالية، الدعم، العقارات، والعيادات. لكل قطاع أمثلة تشغيلية ومكاسب واضحة."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {topUseCases.map((useCase) => (
                <div key={useCase.id} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                  <div className="font-heading text-xl font-semibold text-white">{useCase.title}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {useCase.examples.map((example) => (
                      <span key={example} className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--text-muted)]">
                        {example}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 space-y-2">
                    {useCase.operationalWins.map((win) => (
                      <div key={win} className="text-sm text-[var(--cyan)]">
                        {win}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="space-y-5">
            <SectionHeader
              eyebrow="Case Studies"
              title="دراسات حالة تشبه ما يحدث في العمل فعلاً"
              description="نماذج عملية من التدريب والعقار والعيادات والمتاجر والـ HR والعمليات."
            />
            <div className="space-y-4">
              {topCaseStudies.map((caseStudy) => (
                <div key={caseStudy.id} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                  <div className="font-heading text-xl font-semibold text-white">{caseStudy.title}</div>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{caseStudy.businessProblem}</p>
                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    <FeatureList title="Before" items={caseStudy.beforeAutomation} />
                    <FeatureList title="After" items={caseStudy.afterAutomation} />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="section-shell">
        <div className="section-inner grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <GlassCard className="space-y-5">
            <SectionHeader
              eyebrow="Why Darhous"
              title="لماذا تبدو هذه المنصة مختلفة؟"
              description="لأنها مصممة حول رحلة أتمتة كاملة، لا حول شكل landing page فقط."
            />
            <div className="space-y-3">
              {differentiators.map((item) => (
                <div key={item} className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-[var(--text-muted)]">
                  {item}
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="space-y-5">
            <SectionHeader
              eyebrow="One Account Ecosystem"
              title="حساب واحد ضمن منظومة Darhous"
              description="هذا المنتج مستقل اليوم، لكنه معماريًا مستعد للربط مع الحساب الموحد واللوحة المشتركة وسجل التعلّم والشهادات."
            />
            <div className="grid gap-4 md:grid-cols-2">
              <MiniHeroStat label="SSO" value={integrationBlueprint.sso.status} />
              <MiniHeroStat label="Shared Profile" value={integrationBlueprint.sharedProfile.status} />
              <MiniHeroStat label="Certificates" value={integrationBlueprint.certificates.status} />
              <MiniHeroStat label="Backend" value={integrationBlueprint.backend.status} />
            </div>
            <div className="grid gap-4 md:grid-cols-5">
              {["Darhous Main Platform", "Automation Academy", "User Dashboard", "Templates & Labs", "Services & Certificates"].map((item, index) => (
                <div key={item} className="relative rounded-[24px] border border-white/10 bg-white/5 p-4 text-center text-sm font-semibold text-white">
                  {item}
                  {index < 4 ? <div className="marching-line absolute -left-5 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-[rgba(87,225,255,0.25)] md:block" /> : null}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <GradientButton href="/integrations" variant="secondary">
                استكشف طبقة التكامل
              </GradientButton>
              <GradientButton href="/about" variant="ghost">
                عن المنصة
              </GradientButton>
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="section-shell">
        <div className="section-inner space-y-6">
          <SectionHeader
            eyebrow="Access"
            title="خطط استخدام تناسب التعلم أو التنفيذ أو تقديم الخدمة"
            description="ابدأ مجانًا، توسع بالتعلم الاحترافي، أو اطلب بناء workflow كامل لفريقك أو عملائك."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {pricingPlans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="section-inner">
          <GlassCard className="space-y-5 text-center">
            <div className="inline-flex self-center rounded-full border border-[rgba(87,225,255,0.24)] bg-[rgba(87,225,255,0.08)] px-4 py-2 text-sm text-[var(--cyan)]">
              {siteConfig.altSlogan}
            </div>
            <h2 className="font-heading text-4xl font-bold text-white">ابدأ رحلتك في عالم الأتمتة الآن</h2>
            <p className="mx-auto max-w-3xl text-base leading-8 text-[var(--text-muted)]">
              تعلم، جرّب، ابنِ، وشغّل أول Workflow ذكي لك مع درهوس. وإذا أردت تحويله إلى حل عملي لعميل أو لفريقك، فصفحة الخدمات والوكيل جاهزان لذلك.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <GradientButton href="/automation-agent">ابدأ مع Automation Agent</GradientButton>
              <GradientButton href="/templates" variant="secondary">
                استكشف القوالب
              </GradientButton>
              <GradientButton href="/services" variant="ghost">
                اطلب خدمة أتمتة
              </GradientButton>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}

function MiniHeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <div className="text-xs text-[var(--text-soft)]">{label}</div>
      <div className="mt-2 font-display text-2xl font-bold text-white">{value}</div>
    </div>
  );
}

function FeatureList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[22px] border border-white/8 bg-[rgba(255,255,255,0.03)] p-4">
      <div className="font-heading text-lg font-semibold text-white">{title}</div>
      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <div key={item} className="text-sm text-[var(--text-muted)]">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
