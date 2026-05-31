import { BuilderLab } from "@/components/client/builder-lab";
import { SectionHeader } from "@/components/ui";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("معمل بناء الـ Workflows", "معمل تفاعلي لمعاينة workflows داخل أكاديمية درهوس.");

export default function BuilderPage() {
  return (
    <div className="section-shell">
      <div className="section-inner space-y-6">
        <SectionHeader
          eyebrow="Workflow Builder"
          title="Workflow planning lab بواجهة أقرب لمنتج تشغيلي"
          description="اختر sample workflow، راجع العقد والبيانات المتوقعة والأخطاء المحتملة، أضف nodes جديدة، وشغّل اختبارًا تجريبيًا مع logs واضحة."
        />
        <BuilderLab />
      </div>
    </div>
  );
}
