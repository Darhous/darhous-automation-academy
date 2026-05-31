import { SectionHeader, GlassCard } from "@/components/ui";
import { siteConfig } from "@/data/core";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("عن المنصة", "نظرة عامة على أكاديمية درهوس للأتمتة الذكية.");

export default function AboutPage() {
  return (
    <div className="section-shell">
      <div className="section-inner space-y-6">
        <SectionHeader
          eyebrow="About Platform"
          title={siteConfig.nameArabic}
          description="منتج مستقل اليوم، لكنه مصمم منذ البداية ليكون جزءًا طبيعيًا من Darhous Smart Learning Ecosystem."
        />
        <div className="grid gap-5 md:grid-cols-2">
          <GlassCard className="space-y-4">
            <h3 className="font-heading text-2xl font-semibold text-white">الرؤية</h3>
            <p className="text-base leading-8 text-[var(--text-muted)]">
              منصة عربية تجعل تعلم الأتمتة وبناءها وتشغيلها أكثر وضوحًا واحترافية، مع انتقال سلس لاحقًا إلى النظام البيئي الأكبر.
            </p>
          </GlassCard>
          <GlassCard className="space-y-4">
            <h3 className="font-heading text-2xl font-semibold text-white">الهيكلة</h3>
            <p className="text-base leading-8 text-[var(--text-muted)]">
              واجهة App Router، طبقة بيانات مستقلة، local demo state، وملف تكامل يحدد بوضوح أماكن الربط القادمة مع الحساب الموحد والبيانات المشتركة.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
