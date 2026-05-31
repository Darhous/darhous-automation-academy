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
          title="جرّب وصف الفكرة وشاهد الـ workflow المقترح"
          description="المولد هنا لا يعتمد على API خارجي، لكنه يعطيك output واقعيًا بما يكفي لتقييم الفكرة، حفظها، أو تحويلها إلى طلب تنفيذ."
        />
        <GeneratorStudio />
      </div>
    </div>
  );
}
