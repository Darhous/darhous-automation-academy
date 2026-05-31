import { GeneratorStudio } from "@/components/client/generator-studio";
import { SectionHeader } from "@/components/ui";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("مولد الأتمتة", "حول وصفك النصي إلى workflow مقترح داخل أكاديمية درهوس.");

export default function GeneratorPage() {
  return (
    <div className="section-shell">
      <div className="section-inner space-y-6">
        <SectionHeader
          eyebrow="AI Generator"
          title="مولد خطة أتمتة جاهز للنقاش والتنفيذ"
          description="المولد لا يعتمد على API خارجي في هذه المرحلة، لكنه ينتج خطة عملية مع setup steps وrisks وprompts متعددة المنصات وشرح موجه للعميل."
        />
        <GeneratorStudio />
      </div>
    </div>
  );
}
