import type { AdminMetric, DashboardStat, WorkflowNode } from "@/types";

export const dashboardStats: DashboardStat[] = [
  { id: "progress", label: "التقدم العام", value: "68%", trend: "+12% هذا الشهر" },
  { id: "labs", label: "المعامل المكتملة", value: "5", trend: "مختبران هذا الأسبوع" },
  { id: "templates", label: "القوالب المحفوظة", value: "8", trend: "آخر حفظ اليوم" },
  { id: "automation", label: "أفكار مولدة", value: "11", trend: "3 workflows جديدة" },
];

export const adminMetrics: AdminMetric[] = [
  { id: "users", label: "مستخدمون نشطون", value: "1,248", hint: "مؤشر واجهي تمهيدي لحين ربط البيانات الحقيقية" },
  { id: "templates", label: "قوالب منشورة", value: "42", hint: "جاهزة للإدارة والتصنيف لاحقًا" },
  { id: "labs", label: "مختبرات فعالة", value: "8", hint: "مربوطة حاليًا بطبقة البيانات الثابتة" },
  { id: "requests", label: "طلبات خدمة", value: "مباشر", hint: "تُقرأ من localStorage في هذا الإصدار" },
];

export const workflowNodesPreview: WorkflowNode[] = [
  { id: "trigger", label: "Trigger", type: "Trigger", app: "Google Forms", description: "استقبال تسجيل أو طلب جديد." },
  { id: "ai", label: "AI Processing", type: "AI Step", app: "AI Model", description: "تصنيف الطلب أو تلخيصه قبل الإرسال." },
  { id: "gmail", label: "Gmail", type: "Action", app: "Gmail", description: "إرسال رسالة متابعة تلقائية." },
  { id: "sheets", label: "Google Sheets", type: "Action", app: "Google Sheets", description: "تحديث السجل الرئيسي." },
  { id: "whatsapp", label: "WhatsApp", type: "Notification", app: "WhatsApp", description: "إشعار فوري للعميل أو الطالب." },
  { id: "notion", label: "Notion", type: "Action", app: "Notion", description: "أرشفة الملخص أو المهمة." },
  { id: "crm", label: "CRM", type: "Condition", app: "CRM", description: "تحديد المرحلة التالية حسب حالة العميل." },
  { id: "final", label: "Final Action", type: "Action", app: "Dashboard", description: "إغلاق المهمة وتحديث اللوحة." },
];
