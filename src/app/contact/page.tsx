import Link from "next/link";
import { GlassCard, SectionHeader } from "@/components/ui";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("تواصل معنا", "قنوات التواصل وطلب الخدمات في أكاديمية درهوس.");

export default function ContactPage() {
  return (
    <div className="section-shell">
      <div className="section-inner space-y-6">
        <SectionHeader
          eyebrow="Contact"
          title="تواصل معنا أو ابدأ استشارة أتمتة"
          description="للتعاون، التنفيذ، التدريب، أو الاستفسارات المتعلقة بالمنصة والدمج المستقبلي داخل منظومة Darhous."
        />
        <div className="grid gap-5 md:grid-cols-4">
          <GlassCard className="space-y-3">
            <h3 className="font-heading text-xl font-semibold text-white">البريد</h3>
            <a href="mailto:ahmeddarhous@gmail.com" className="text-[var(--cyan)]">
              ahmeddarhous@gmail.com
            </a>
          </GlassCard>
          <GlassCard className="space-y-3">
            <h3 className="font-heading text-xl font-semibold text-white">WhatsApp</h3>
            <a href="https://wa.me/201030002331" target="_blank" rel="noopener noreferrer" className="text-[var(--cyan)]">
              +20 103 000 2331
            </a>
          </GlassCard>
          <GlassCard className="space-y-3">
            <h3 className="font-heading text-xl font-semibold text-white">خدمة مخصصة</h3>
            <Link href="/services" className="text-[var(--cyan)]">
              اذهب إلى نموذج الطلب
            </Link>
          </GlassCard>
          <GlassCard className="space-y-3">
            <h3 className="font-heading text-xl font-semibold text-white">وكيل الأتمتة</h3>
            <Link href="/automation-agent" className="text-[var(--cyan)]">
              ابدأ من blueprint استشاري
            </Link>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
