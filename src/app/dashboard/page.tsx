import { DashboardView } from "@/components/client/dashboard-view";
import { SectionHeader } from "@/components/ui";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("لوحة التحكم", "لوحة تحكم المستخدم داخل أكاديمية درهوس.");

export default function DashboardPage() {
  return (
    <div className="section-shell">
      <div className="section-inner space-y-6">
        <SectionHeader
          eyebrow="User Dashboard"
          title="لوحة تحكم عملية تقرأ من بياناتك التجريبية"
          description="هنا تلتقي المسارات، المعامل، القوالب المحفوظة، workflows المولدة، وطلبات الخدمة في شاشة واحدة."
        />
        <DashboardView />
      </div>
    </div>
  );
}
