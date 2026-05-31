import type { AutomationService } from "@/types";

export const automationServices: AutomationService[] = [
  {
    id: "sheets-forms",
    title: "أتمتة Google Sheets و Forms",
    description: "تصميم نماذج، جداول، تقارير، والتنقل بين البيانات بشكل تلقائي.",
    deliverables: ["نماذج ذكية", "قواعد تحقق", "تقارير تنفيذية"],
    turnaround: "3-5 أيام",
  },
  {
    id: "messaging",
    title: "أتمتة الرسائل والإشعارات",
    description: "واتساب، بريد، تيليجرام، وإشعارات داخلية مبنية على الأحداث.",
    deliverables: ["رسائل تلقائية", "reminders", "تصعيد للحالات المهمة"],
    turnaround: "2-4 أيام",
  },
  {
    id: "customer-service",
    title: "أتمتة خدمة العملاء",
    description: "التقاط الطلبات، توجيهها، ومتابعة الحالة مع فرق الدعم.",
    deliverables: ["ticket intake", "routing", "status updates"],
    turnaround: "5-7 أيام",
  },
  {
    id: "reporting",
    title: "أتمتة التقارير",
    description: "تجميع البيانات وتحويلها إلى لوحات وتقارير أسبوعية وشهرية.",
    deliverables: ["weekly report", "dashboards", "PDF briefs"],
    turnaround: "4-6 أيام",
  },
  {
    id: "sales",
    title: "أتمتة المبيعات والمتابعة",
    description: "lead routing، متابعة الفرص، وتحديثات pipeline والتنبيهات.",
    deliverables: ["CRM updates", "follow-up flows", "handoff automation"],
    turnaround: "5-8 أيام",
  },
  {
    id: "hr",
    title: "أتمتة الموارد البشرية",
    description: "التوظيف، onboarding، الحضور، والإشعارات الداخلية الأساسية.",
    deliverables: ["HR workflows", "attendance", "document routing"],
    turnaround: "4-6 أيام",
  },
  {
    id: "education",
    title: "أتمتة التعليم والاختبارات",
    description: "التسجيل، الإشعارات، التقييم، الشهادات، ومتابعة الطلاب.",
    deliverables: ["student journeys", "grading support", "certificates"],
    turnaround: "5-8 أيام",
  },
  {
    id: "custom-workflow",
    title: "بناء Workflow مخصص",
    description: "من الصفر حسب سيناريو أعمالك وربط الأدوات الحالية لديك.",
    deliverables: ["custom map", "prototype", "handover guide"],
    turnaround: "بحسب النطاق",
  },
  {
    id: "api-links",
    title: "ربط APIs",
    description: "ربط الخدمات أو الأنظمة الداخلية عبر webhook وAPI بشكل قابل للتوسع.",
    deliverables: ["API contracts", "webhook flows", "error handling"],
    turnaround: "5-10 أيام",
  },
  {
    id: "consulting",
    title: "استشارات التحول الرقمي",
    description: "تحديد الأولويات والأدوات والمسارات المناسبة قبل التنفيذ.",
    deliverables: ["roadmap", "tool stack", "opportunity review"],
    turnaround: "جلسة + تقرير",
  },
];
