import { PathCard } from "@/components/cards";
import { SectionHeader, GlassCard } from "@/components/ui";
import { automationPaths } from "@/data/automationPaths";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("المسارات التعليمية", "استعرض مسارات تعلم الأتمتة داخل أكاديمية درهوس.");

export default function PathsPage() {
  return (
    <div className="section-shell">
      <div className="section-inner space-y-6">
        <SectionHeader
          eyebrow="Learning Paths"
          title="مسارات تعلم مرتبة حسب مستوى النضج"
          description="كل مسار مصمم ليساعدك تبني مهارة عملية قابلة للتطبيق مباشرة في العمل أو المشاريع."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {automationPaths.map((path) => (
            <PathCard key={path.id} path={path} />
          ))}
        </div>
        <GlassCard className="grid gap-4 md:grid-cols-3">
          {[
            "ابدأ بالأساسيات ثم no-code إذا كنت تبني أول workflow.",
            "اختر AI Automation إذا كانت لديك حاجة للتلخيص أو التصنيف أو الردود الذكية.",
            "اختر Developer Automation إذا كان لديك APIs أو webhooks أو بنية تقنية تحتاج تكاملًا أعمق.",
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-[var(--text-muted)]">
              {item}
            </div>
          ))}
        </GlassCard>
      </div>
    </div>
  );
}
