import { ToolsExplorer } from "@/components/client/tools-explorer";
import { SectionHeader } from "@/components/ui";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("دليل الأدوات", "مقارنة بين أدوات الأتمتة واختيار الأنسب حسب الحالة.");

export default function ToolsPage() {
  return (
    <div className="section-shell">
      <div className="section-inner space-y-6">
        <SectionHeader
          eyebrow="دليل الأدوات"
          title="Tools Hub لاتخاذ القرار قبل التنفيذ"
          description="هذه الصفحة تجمع دليلًا حيًا للأدوات مع حاسبة ROI، ومقدّر التعقيد، ومستشار الـ Stack، ومولد الـ Checklists، ومولد الـ Proposal."
        />
        <ToolsExplorer />
      </div>
    </div>
  );
}
