import { workflowNodesPreview } from "@/data/dashboardMock";
import { cn } from "@/lib/utils";

const toneMap = [
  "from-cyan-300/70 to-cyan-500/30 border-cyan-300/30",
  "from-violet-300/70 to-violet-500/30 border-violet-300/30",
  "from-sky-300/70 to-blue-500/30 border-sky-300/30",
  "from-amber-300/70 to-yellow-500/30 border-amber-300/30",
];

export function HeroWorkflowCanvas({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn("glass-panel node-grid relative overflow-hidden rounded-[32px] p-5 sm:p-7", compact ? "min-h-[360px]" : "min-h-[500px]")}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(87,225,255,0.08),transparent_38%)]" />
      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-display text-xs uppercase tracking-[0.3em] text-[var(--cyan)]/75">workflow canvas</div>
            <div className="mt-2 font-heading text-xl font-semibold text-white">Preview orchestration lab</div>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-[var(--text-muted)]">
            {compact ? "8 nodes مترابطة" : "معاينة حية لمسار الأكاديمية"}
          </div>
        </div>

        <div className={cn("relative grid gap-4", compact ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-2 xl:grid-cols-4")}>
          {workflowNodesPreview.map((node, index) => (
            <div key={node.id} className={cn("relative rounded-[24px] border bg-[rgba(9,14,24,0.78)] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.38)]", toneMap[index % toneMap.length])}>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/8 font-display text-sm font-bold text-white">
                  {node.app.slice(0, 2)}
                </div>
                <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--text-soft)]">
                  {node.type}
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-base font-semibold text-white">{node.label}</h3>
                <p className="text-sm leading-6 text-[var(--text-muted)]">{node.description}</p>
                <div className="font-display text-xs uppercase tracking-[0.22em] text-[var(--cyan)]/75">{node.app}</div>
              </div>
              {index < workflowNodesPreview.length - 1 ? (
                <div className="marching-line absolute left-[-2px] top-1/2 hidden h-[1px] w-6 -translate-y-1/2 bg-[rgba(87,225,255,0.25)] xl:block" />
              ) : null}
            </div>
          ))}
        </div>

        {!compact ? (
          <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
              <div className="font-display text-xs uppercase tracking-[0.24em] text-[var(--cyan)]/75">active stack</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Trigger", "AI", "Gmail", "Sheets", "WhatsApp", "Notion", "CRM"].map((item) => (
                  <span key={item} className="rounded-full border border-white/10 px-3 py-2 text-xs text-[var(--text-muted)]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-[24px] border border-[var(--border-bright)] bg-[rgba(7,12,22,0.82)] p-4">
              <div className="font-heading text-lg font-semibold text-white">مسار جاهز لسيناريو تعليم + AI + إشعارات</div>
              <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">
                هذا المشهد يترجم روح التصميم المرجعي إلى واجهة تشعر أنها منتج حقيقي: nodes متصلة، حالات واضحة، وإشارات بصرية تساعدك تقرأ المنطق بسرعة.
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
