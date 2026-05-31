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
          title="معمل builder تفاعلي بواجهة أقرب لمنتج فعلي"
          description="يمكنك اختيار nodes، إضافة عناصر جديدة، تشغيل اختبار تجريبي، ومراجعة logs وإعدادات كل خطوة."
        />
        <BuilderLab />
      </div>
    </div>
  );
}
