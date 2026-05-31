import { ServiceCard } from "@/components/cards";
import { ServiceRequestForm } from "@/components/client/service-request-form";
import { SectionHeader } from "@/components/ui";
import { automationServices } from "@/data/services";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("خدمات الأتمتة", "اطلب تنفيذ أتمتة مخصصة لعملك أو فريقك.");

export default function ServicesPage() {
  return (
    <div className="section-shell">
      <div className="section-inner space-y-6">
        <SectionHeader
          eyebrow="Automation Services"
          title="خدمات تنفيذ للأعمال والفرق"
          description="سواء كنت تحتاج reporting، رسائل، CRM، تعليم، أو تكامل APIs، المنصة تقدم واجهة طلب واضحة ومجهزة للربط لاحقًا."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {automationServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        <ServiceRequestForm />
      </div>
    </div>
  );
}
