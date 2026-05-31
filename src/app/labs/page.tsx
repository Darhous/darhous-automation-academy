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
          title="معامل تطبيقية تبني الثقة قبل التنفيذ الحقيقي"
          description="كل Lab هنا يتضمن objective واضحًا، سيناريو، خطوات، مخرجات متوقعة، أخطاء شائعة، challenge task، وcompletion checklist."
        />
        <LabsShowcase />
      </div>
    </div>
  );
}
