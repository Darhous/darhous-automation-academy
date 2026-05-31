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
          title="Admin foundation محترم ومهيأ لربط backend لاحقًا"
          description="محتوى، طلبات خدمة، مخرجات مولدة، مقاييس تغطية، وثغرات محتوى واضحة في واجهة frontend-only صريحة وغير مضللة."
        />
        <AdminView />
      </div>
    </div>
  );
}
