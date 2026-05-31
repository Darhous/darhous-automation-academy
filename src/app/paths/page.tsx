import { PathCard } from "@/components/cards";
import { GlassCard, SectionHeader } from "@/components/ui";
import { automationLearningPaths } from "@/data/automationLearningPaths";
import { automationLessons } from "@/data/automationLessons";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("المسارات التعليمية", "استعرض مسارات تعلم الأتمتة داخل أكاديمية درهوس.");

export default function PathsPage() {
  return (
    <div className="section-shell">
      <div className="section-inner space-y-6">
        <SectionHeader
          eyebrow="Learning Paths"
          title="مسارات تعلم عميقة من الأساسيات إلى التنفيذ والحوكمة"
          description="كل مسار يتضمن outcome واضحًا، modules، مشاريع تطبيقية، أدوات موصى بها، وcapstone له معنى عملي في العمل أو الخدمة."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {automationLearningPaths.map((path) => (
            <PathCard key={path.id} path={path} />
          ))}
        </div>

        <GlassCard className="space-y-4">
          <h3 className="font-heading text-2xl font-semibold text-white">Lesson Library Preview</h3>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {automationLessons.slice(0, 8).map((lesson) => (
              <div key={lesson.id} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-semibold text-white">{lesson.title}</div>
                  <span className="text-xs text-[var(--text-soft)]">{lesson.duration}</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{lesson.summary}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
