import { automationTemplates } from "@/data/templates";
import type { Difficulty, GeneratedWorkflow } from "@/types";

interface Scenario {
  keys: string[];
  trigger: string;
  apps: string[];
  steps: string[];
  complexity: Difficulty;
  setupTime: string;
  permissions: string[];
  templateId: string;
  summary: string;
}

const scenarios: Scenario[] = [
  {
    keys: ["واتساب", "whatsapp", "طالب", "test", "اختبار"],
    trigger: "إكمال اختبار أو تحديث حالة طالب",
    apps: ["Google Forms", "Google Sheets", "WhatsApp", "Gmail"],
    steps: [
      "التقاط نتيجة الاختبار من النموذج أو النظام",
      "تحديث سجل الطالب في Google Sheets",
      "تجهيز رسالة مخصصة حسب النتيجة",
      "إرسال واتساب فوري للطالب",
      "تسجيل الحدث داخل dashboard والمتابعة بالبريد",
    ],
    complexity: "متوسط",
    setupTime: "45-60 دقيقة",
    permissions: ["الوصول إلى Google Forms", "تعديل Google Sheets", "إرسال WhatsApp"],
    templateId: "welcome-students",
    summary: "Workflow تعليمي يربط نتائج الاختبار مع التواصل الفوري والمتابعة.",
  },
  {
    keys: ["crm", "عميل", "lead", "مبيعات"],
    trigger: "استلام lead جديد أو تحديث في pipeline",
    apps: ["Google Forms", "CRM", "WhatsApp", "Gmail"],
    steps: [
      "استقبال بيانات lead جديد",
      "تقييم المرحلة أو المصدر",
      "إنشاء أو تحديث السجل داخل CRM",
      "إرسال رسالة follow-up مناسبة",
      "تنبيه الفريق التجاري إذا كانت الحالة عالية الأولوية",
    ],
    complexity: "متوسط",
    setupTime: "35-50 دقيقة",
    permissions: ["الوصول إلى CRM", "إرسال Gmail", "إرسال WhatsApp"],
    templateId: "lead-followup",
    summary: "مسار مبيعات واضح يمنع تأخر الاستجابة ويرفع احتمال التحويل.",
  },
  {
    keys: ["بريد", "email", "mail", "تلخيص"],
    trigger: "وصول رسائل جديدة أو موعد الملخص اليومي",
    apps: ["Gmail", "AI Model", "Notion"],
    steps: [
      "جمع الرسائل المهمة من صندوق الوارد",
      "إرسال المحتوى إلى AI Model للتلخيص",
      "استخراج الأولويات والإجراءات المقترحة",
      "حفظ brief داخل Notion",
      "إرسال الملخص للفريق أو المستخدم",
    ],
    complexity: "متوسط",
    setupTime: "25-35 دقيقة",
    permissions: ["قراءة Gmail", "الوصول إلى نموذج AI", "تعديل Notion"],
    templateId: "daily-email-summary",
    summary: "Workflow يساعدك على رؤية البريد اليومي كقرارات بدل فوضى.",
  },
  {
    keys: ["تقرير", "report", "sheet", "مبيعات أسبوعي"],
    trigger: "موعد أسبوعي أو تحديث بيانات جديد",
    apps: ["Google Sheets", "AI Model", "PDF Generator"],
    steps: [
      "قراءة مؤشرات الأداء من الجداول",
      "استخراج التغيرات الرئيسية أسبوعيًا",
      "صياغة ملخص تنفيذي بالذكاء الاصطناعي",
      "إخراج ملف PDF أو brief مرئي",
      "مشاركته مع أصحاب القرار",
    ],
    complexity: "متوسط",
    setupTime: "40-55 دقيقة",
    permissions: ["قراءة Google Sheets", "استخدام PDF Generator"],
    templateId: "weekly-sales-report",
    summary: "مسار تقارير يختصر التجميع والصياغة والتنسيق في خطوة واحدة.",
  },
];

function fallbackScenario(prompt: string): Scenario {
  return {
    keys: [],
    trigger: "وصول حدث جديد من form أو webhook",
    apps: ["Webhook", "AI Model", "Google Sheets", "Dashboard"],
    steps: [
      "التقاط الحدث من المصدر الأساسي",
      "تنظيف البيانات وتحديد نوع الطلب",
      "تمرير الحالة عبر خطوة AI للفهم أو التصنيف",
      "تحديث سجل تشغيلي في Google Sheets أو CRM",
      "إرسال إشعار نهائي وإظهار الحالة في dashboard",
    ],
    complexity: prompt.length > 90 ? "متقدم" : "متوسط",
    setupTime: prompt.length > 90 ? "60-90 دقيقة" : "30-45 دقيقة",
    permissions: ["الوصول إلى مصدر البيانات", "الكتابة في السجل التشغيلي", "تشغيل الإشعارات"],
    templateId: "customer-requests",
    summary: "اقتراح عام قابل للتخصيص حسب الأدوات التي تستخدمها اليوم.",
  };
}

export function generateWorkflow(prompt: string): GeneratedWorkflow {
  const normalized = prompt.toLowerCase();
  const matched = scenarios.find((scenario) =>
    scenario.keys.some((key) => normalized.includes(key.toLowerCase())),
  );
  const scenario = matched ?? fallbackScenario(prompt);
  const template = automationTemplates.find((item) => item.id === scenario.templateId);

  return {
    id: `wf-${Date.now()}`,
    prompt,
    trigger: scenario.trigger,
    requiredApps: scenario.apps,
    steps: scenario.steps,
    complexity: scenario.complexity,
    setupTime: scenario.setupTime,
    permissions: scenario.permissions,
    recommendedTemplate: template?.title ?? "بناء Workflow مخصص",
    summary: scenario.summary,
    savedAt: new Date().toISOString(),
  };
}
