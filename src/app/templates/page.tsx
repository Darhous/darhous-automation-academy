import { TemplatesMarketplace } from "@/components/client/templates-marketplace";
import { SectionHeader } from "@/components/ui";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("سوق القوالب", "استعرض قوالب أتمتة عربية جاهزة للحفظ والتخصيص.");

export default function TemplatesPage() {
  return (
    <div className="section-shell">
      <div className="section-inner space-y-6">
        <SectionHeader
          eyebrow="Template Marketplace"
          title="سوق قوالب جاهز للحفظ والتشغيل"
          description="فلترة، معاينة، وحفظ القوالب تعمل هنا فعليًا على الواجهة. القوالب المحفوظة ستظهر داخل لوحة التحكم."
        />
        <TemplatesMarketplace />
      </div>
    </div>
  );
}
