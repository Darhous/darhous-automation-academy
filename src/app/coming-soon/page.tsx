import { ComingSoonCard, SectionHeader } from "@/components/ui";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("قريبًا", "صفحة للحالات القادمة والموديولات المستقبلية.");

export default function ComingSoonPage() {
  return (
    <div className="section-shell">
      <div className="section-inner space-y-6">
        <SectionHeader
          eyebrow="Coming Soon"
          title="وحدات جديدة قيد الإعداد"
          description="هذه الصفحة تستخدم لحالات الوصول إلى أجزاء ما زالت في roadmap، بدل أن تنتهي الروابط إلى أزرار مكسورة أو صفحات فارغة."
        />
        <ComingSoonCard
          title="مزيد من وحدات المنظومة قادمة"
          description="سيتم توصيل صفحات مثل الخصوصية، الشروط، إدارة المحتوى، والتقارير الموحدة مع البنية المشتركة لـ Darhous عند اكتمال طبقات التكامل."
        />
      </div>
    </div>
  );
}
