import { ToolsExplorer } from "@/components/client/tools-explorer";
import { SectionHeader } from "@/components/ui";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("دليل الأدوات", "مقارنة بين أدوات الأتمتة واختيار الأنسب حسب الحالة.");

export default function ToolsPage() {
  return (
    <div className="section-shell">
      <div className="section-inner space-y-6">
        <SectionHeader
          eyebrow="Tools Directory"
          title="اكتشف الأداة المناسبة قبل أن تبدأ البناء"
          description="البحث والتصفية يعملان هنا على الواجهة لمساعدتك تقارن بسرعة بين الأدوات المختلفة حسب use case ومستوى التعقيد."
        />
        <ToolsExplorer />
      </div>
    </div>
  );
}
