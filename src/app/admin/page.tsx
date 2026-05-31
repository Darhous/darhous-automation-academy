import { AdminView } from "@/components/client/admin-view";
import { SectionHeader } from "@/components/ui";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("لوحة الإدارة", "أساس لوحة الإدارة المستقبلية لمنصة أكاديمية درهوس.");

export default function AdminPage() {
  return (
    <div className="section-shell">
      <div className="section-inner space-y-6">
        <SectionHeader
          eyebrow="Admin Foundation"
          title="أساس لوحة إدارة جاهز للربط لاحقًا"
          description="إدارة المسارات، القوالب، المختبرات، الطلبات، والمخرجات المولدة في واجهة تمهيدية واضحة وغير مضللة."
        />
        <AdminView />
      </div>
    </div>
  );
}
