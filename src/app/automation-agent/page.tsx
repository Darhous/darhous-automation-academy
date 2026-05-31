import { AutomationAgentStudio } from "@/components/client/automation-agent";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("وكيل تصميم الأتمتة", "وكيل تصميم الأتمتة داخل أكاديمية درهوس.");

export default function AutomationAgentPage() {
  return (
    <div className="section-shell">
      <div className="section-inner">
        <AutomationAgentStudio />
      </div>
    </div>
  );
}
