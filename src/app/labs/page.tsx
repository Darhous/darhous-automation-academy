import { LabsShowcase } from "@/components/client/labs-showcase";
import { SectionHeader } from "@/components/ui";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("مختبرات الأتمتة", "مختبرات عملية لتطبيق automation scenarios مختلفة.");

export default function LabsPage() {
  return (
    <div className="section-shell">
      <div className="section-inner space-y-6">
        <SectionHeader
          eyebrow="Automation Labs"
          title="مختبرات تطبيقية تبني عضلة التنفيذ"
          description="اختر مختبرًا، راجع goal والأدوات والنتيجة النهائية، ثم استخدمه كنقطة انطلاق لمسارك العملي."
        />
        <LabsShowcase />
      </div>
    </div>
  );
}
