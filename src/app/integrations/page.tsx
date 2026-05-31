import { IntegrationCard } from "@/components/cards";
import { GlassCard, SectionHeader } from "@/components/ui";
import { integrationApps } from "@/data/integrations";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("التكاملات", "دليل تكاملات التطبيقات والمنظومات داخل الأكاديمية.");

export default function IntegrationsPage() {
  return (
    <div className="section-shell">
      <div className="section-inner space-y-6">
        <SectionHeader
          eyebrow="Integrations"
          title="دليل تكاملات جاهز للتوسع والدمج المستقبلي"
          description="القائمة الحالية تمثل التطبيقات الأساسية التي تدور حول التعلم والبناء والخدمة، مع مؤشرات واضحة لما هو جاهز وما هو مفضل وما سيأتي لاحقًا."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {integrationApps.map((app) => (
            <IntegrationCard key={app.id} app={app} />
          ))}
        </div>
        <GlassCard className="grid gap-4 md:grid-cols-5">
          {["Darhous Main Platform", "Automation Academy", "Shared Profile", "Templates & Labs", "Certificates"].map((item, index) => (
            <div key={item} className="relative rounded-[24px] border border-white/10 bg-white/5 p-4 text-center text-sm font-semibold text-white">
              {item}
              {index < 4 ? <div className="marching-line absolute -left-5 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-[rgba(87,225,255,0.25)] md:block" /> : null}
            </div>
          ))}
        </GlassCard>
      </div>
    </div>
  );
}
