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
          title="Tools Hub لاتخاذ القرار قبل التنفيذ"
          description="هذه الصفحة تجمع directory حي للأدوات مع ROI calculator وcomplexity estimator وstack advisor وchecklist generator وproposal generator."
        />
        <ToolsExplorer />
      </div>
    </div>
  );
}
