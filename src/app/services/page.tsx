import { ServiceCard } from "@/components/cards";
import { ServiceRequestForm } from "@/components/client/service-request-form";
import { GlassCard, SectionHeader } from "@/components/ui";
import { automationServicePackages } from "@/data/automationServices";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("خدمات الأتمتة", "اطلب تنفيذ أتمتة مخصصة لعملك أو فريقك.");

export default function ServicesPage() {
  return (
    <div className="section-shell">
      <div className="section-inner space-y-6">
        <SectionHeader
          eyebrow="Automation Services"
          title="خدمات أتمتة جاهزة للتحول من فكرة إلى تنفيذ"
          description="من Audit إلى Workflow Design إلى n8n Build وMonthly Support، الصفحة مصممة لتخدم أصحاب الأعمال ومقدمي الخدمات معًا."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {automationServicePackages.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        <GlassCard className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <h3 className="font-heading text-2xl font-semibold text-white">Request Automation Consultation</h3>
            <p className="text-sm leading-7 text-[var(--text-muted)]">
              إذا كنت لا تعرف هل تبدأ من template أو من blueprint أو من build كامل، استخدم نموذج الاستشارة. في هذا الإصدار، الطلب يُحفظ محليًا ثم يظهر مباشرة في صفحة الإدارة.
            </p>
          </div>
          <div className="space-y-2 rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm text-[var(--text-muted)]">
            <div>ما الذي يخرج من جلسة الاستشارة؟</div>
            <div>1. تشخيص العملية الحالية</div>
            <div>2. اقتراح stack مناسب</div>
            <div>3. تقدير أولي للتعقيد والزمن</div>
            <div>4. قرار: template أم build مخصص أم roadmap مرحلي</div>
          </div>
        </GlassCard>
        <ServiceRequestForm />
      </div>
    </div>
  );
}
