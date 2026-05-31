import type { AutomationUseCase } from "@/types";

export const automationUseCases: AutomationUseCase[] = [
  { id: "education", title: "التعليم", examples: ["التسجيل", "الحضور", "الشهادات", "إشعارات الطلاب"], operationalWins: ["تقليل العمل اليدوي", "تجربة طالب أوضح", "سجل تدريبي أنظف"] },
  { id: "sales", title: "المبيعات", examples: ["lead capture", "follow-up", "pipeline updates", "renewal reminders"], operationalWins: ["سرعة استجابة أعلى", "متابعة أفضل", "وضوح pipeline"] },
  { id: "marketing", title: "التسويق", examples: ["اعتماد المحتوى", "النشر", "التقارير", "campaign intake"], operationalWins: ["ثبات العمليات", "تقليل التأخير", "قياس أسرع"] },
  { id: "hr", title: "الموارد البشرية", examples: ["التوظيف", "onboarding", "الحضور", "طلبات الموظفين"], operationalWins: ["أقل تشتت", "تحديثات حالة أسرع", "توثيق أفضل"] },
  { id: "finance", title: "المالية", examples: ["تذكيرات الفواتير", "موافقات المصروفات", "تقارير شهرية", "أرشفة الفواتير"], operationalWins: ["تقليل الأخطاء", "تسريع الموافقات", "سجل أوضح"] },
  { id: "support", title: "خدمة العملاء", examples: ["ticket routing", "escalation", "feedback loops", "SLA alerts"], operationalWins: ["خفض زمن الاستجابة", "وضوح الملكية", "رضا أعلى"] },
  { id: "real-estate", title: "العقارات", examples: ["استفسارات المشاريع", "تأكيد الزيارات", "متابعة leads", "توزيع الوسطاء"], operationalWins: ["سرعة متابعة", "تنظيم الزيارات", "تقليل ضياع leads"] },
  { id: "clinics", title: "العيادات", examples: ["حجوزات", "تذكير بالمواعيد", "متابعة بعد الزيارة", "جداول يومية"], operationalWins: ["خفض no-show", "إدارة يومية أفضل", "حمل إداري أقل"] },
];
