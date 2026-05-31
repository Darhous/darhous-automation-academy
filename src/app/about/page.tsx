import { GlassCard, SectionHeader } from "@/components/ui";
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
          description="منصة مستقلة اليوم، لكنها مصممة منذ البداية كأكاديمية أتمتة عربية قابلة للربط لاحقًا بالحساب الموحد واللوحة المشتركة داخل Darhous Smart Learning Ecosystem."
        />
        <div className="grid gap-5 md:grid-cols-3">
          <GlassCard className="space-y-4">
            <h3 className="font-heading text-2xl font-semibold text-white">الرؤية</h3>
            <p className="text-base leading-8 text-[var(--text-muted)]">
              منصة عربية تجعل تعلّم الأتمتة وبناءها وتشغيلها أكثر وضوحًا واحترافية، من غير أن تضحي بالعمق أو الشكل الإنتاجي.
            </p>
          </GlassCard>
          <GlassCard className="space-y-4">
            <h3 className="font-heading text-2xl font-semibold text-white">الهيكلة</h3>
            <p className="text-base leading-8 text-[var(--text-muted)]">
              Next.js App Router، TypeScript، Tailwind، بيانات typed، local state آمن، وملف تكامل يحدد بوضوح أماكن الربط القادمة.
            </p>
          </GlassCard>
          <GlassCard className="space-y-4">
            <h3 className="font-heading text-2xl font-semibold text-white">v2 Platform</h3>
            <p className="text-base leading-8 text-[var(--text-muted)]">
              Learn Automation، Build Automation، Design with an Agent، Use Ready Templates، Offer Automation as a Service.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
