import { automationTemplates } from "@/data/automationTemplates";
import type { GeneratedWorkflow } from "@/types";

function matchPrompt(prompt: string) {
  const normalized = prompt.toLowerCase();

  if (normalized.includes("lead") || normalized.includes("عميل") || normalized.includes("مبيعات")) {
    return {
      title: "خطة متابعة Lead متعددة القنوات",
      summary: "خطة عملية لالتقاط lead وتقييمه وتحديث CRM مع متابعة مبكرة.",
      trigger: "New form submission أو New CRM lead",
      actions: ["تنظيف البيانات", "إنشاء lead", "إرسال follow-up", "تذكير مسؤول المبيعات"],
      recommendedTools: ["CRM", "Make", "WhatsApp concepts", "Google Sheets"],
      setupSteps: ["تحديد الحقول الأساسية", "توصيل source بالـ CRM", "إعداد رسالة approved", "بناء تذكير follow-up", "اختبار lead مكرر وlead ناقص"],
      testChecklist: ["اختبار lead كامل", "اختبار duplicate", "اختبار failure في CRM"],
      risks: ["رسائل follow-up قبل التأهيل", "فقدان owner assignment", "تكرار السجل"],
      clientExplanation: "ستتحول عملية متابعة الـ leads من رد فعل متأخر إلى مسار منظم يبدأ خلال دقائق من وصول العميل المحتمل.",
      templateId: "lead-followup-whatsapp",
    };
  }

  if (normalized.includes("فاتورة") || normalized.includes("invoice") || normalized.includes("تحصيل")) {
    return {
      title: "خطة تذكير الفواتير والتحصيل",
      summary: "خطة مجدولة لفحص تواريخ الاستحقاق وإرسال reminders وتصعيد الحالات المتأخرة.",
      trigger: "Scheduled time",
      actions: ["فحص الفواتير المستحقة", "إرسال reminder", "تصعيد داخلي للحالات الحساسة"],
      recommendedTools: ["Google Sheets", "Email", "Power Automate"],
      setupSteps: ["ترتيب بيانات الفواتير", "تعريف نافذة التذكير", "إعداد رسائل متعددة", "إضافة مسار approval للقيم الكبيرة"],
      testChecklist: ["اختبار فاتورة مستحقة", "اختبار فاتورة مدفوعة", "اختبار escalation"],
      risks: ["تواريخ غير محدثة", "إزعاج العميل بعد الدفع", "غياب مراجعة بشرية للحالات الكبيرة"],
      clientExplanation: "ستضمن الخطة متابعة التحصيل بشكل أنضج وتقلل الاعتماد على التذكير اليدوي غير المنتظم.",
      templateId: "finance-approval-lane",
    };
  }

  if (normalized.includes("طالب") || normalized.includes("course") || normalized.includes("registration") || normalized.includes("دورة")) {
    return {
      title: "خطة تسجيل وتعريف المتعلمين",
      summary: "خطة تربط التسجيل، التحديث، الرسائل، والتذكيرات قبل الانطلاق.",
      trigger: "New form submission",
      actions: ["تسجيل الطالب", "إرسال welcome", "إشعار فريق القبول", "جدولة reminder"],
      recommendedTools: ["Google Forms", "Google Sheets", "Gmail", "Calendar"],
      setupSteps: ["تصميم نموذج التسجيل", "إضافة حالة القبول أو الدفع", "إنشاء قوالب الترحيب", "إعداد reminder قبل البداية"],
      testChecklist: ["اختبار طالب جديد", "اختبار حالة incomplete", "اختبار reminder"],
      risks: ["تسجيل مكرر", "بريد غير صحيح", "حالة دفع غير محدثة"],
      clientExplanation: "الخطة تعطي المؤسسة التعليمية رحلة تسجيل احترافية تحافظ على صورة المركز وتخفف العبء على فريق القبول.",
      templateId: "course-registration-pipeline",
    };
  }

  if (normalized.includes("تقرير") || normalized.includes("report") || normalized.includes("ملخص")) {
    return {
      title: "خطة تقرير دوري وتنبيه إداري",
      summary: "خطة تجمع البيانات ثم تولد report موحدًا مع narrative قابل للمشاركة.",
      trigger: "Scheduled time",
      actions: ["جمع البيانات", "حساب KPIs", "كتابة summary", "إرسال التقرير"],
      recommendedTools: ["Google Sheets", "AI Model", "Email", "PDF Generator"],
      setupSteps: ["تجهيز مصدر البيانات", "تعريف المؤشرات", "صياغة prompt الملخص", "اختبار المخرجات مع الإدارة"],
      testChecklist: ["فحص صحة الأرقام", "اختبار فترة زمنية", "اختبار narrative"],
      risks: ["تفاوت المصادر", "summary غير دقيق", "إرسال لأشخاص غير معنيين"],
      clientExplanation: "الخطة تجعل التقارير جزءًا ثابتًا من التشغيل بدل أن تكون عبئًا أسبوعيًا أو يوميًا على الفريق.",
      templateId: "weekly-sales-report",
    };
  }

  return {
    title: "خطة Workflow عملية قابلة للتنفيذ",
    summary: "خطة عامة تحول الطلب إلى Trigger واضح، خطوات، أدوات، ومخاطر واختبارات.",
    trigger: "حدث جديد من form أو CRM أو webhook أو schedule",
    actions: ["تنظيف البيانات", "تنفيذ الخطوات الرئيسية", "إرسال إشعار أو تقرير", "تسجيل النتيجة"],
    recommendedTools: ["n8n", "Google Sheets", "Email", "Notion"],
    setupSteps: ["تفكيك العملية", "تحديد trigger", "توصيل الأدوات", "إضافة error handling", "تنفيذ QA"],
    testChecklist: ["اختبار happy path", "اختبار بيانات ناقصة", "اختبار تكرار التنفيذ"],
    risks: ["عدم وضوح الملكية", "اعتماد زائد على خطوة واحدة", "غياب التوثيق"],
    clientExplanation: "هذه الخطة مناسبة كبداية استشارية ثم يمكن تخصيصها حسب القسم، الأدوات، وحساسية البيانات.",
    templateId: "consulting-proposal-flow",
  };
}

export function generateWorkflow(prompt: string, savedAt = new Date().toISOString()): GeneratedWorkflow {
  const scenario = matchPrompt(prompt);
  const matchedTemplate = automationTemplates.find((template) => template.id === scenario.templateId) ?? automationTemplates[0];
  const technicalContext = `اعتمد على ${scenario.recommendedTools.join("، ")} ونفّذ الخطوات: ${scenario.setupSteps.join(" -> ")}`;

  return {
    id: `wf-${Date.now()}`,
    prompt,
    title: scenario.title,
    summary: scenario.summary,
    trigger: scenario.trigger,
    actions: scenario.actions,
    recommendedTools: scenario.recommendedTools,
    setupSteps: scenario.setupSteps,
    testChecklist: scenario.testChecklist,
    risks: scenario.risks,
    clientExplanation: `${scenario.clientExplanation} القالب الأقرب: ${matchedTemplate.title}.`,
    prompts: {
      n8n: `حوّل هذا السيناريو إلى n8n workflow. ${technicalContext}. أضف nodes وerror handling وlogging.`,
      make: `اكتب خطة Make scenario لهذا السيناريو: ${scenario.title}. ${technicalContext}. وضّح modules وfilters وrouters.`,
      zapier: `صمّم Zapier workflow لهذا السيناريو: ${scenario.title}. ${technicalContext}. اذكر متى يصبح Zapier غير مناسب.`,
      python: `اكتب technical plan بلغة Python لهذا السيناريو: ${scenario.title}. ${technicalContext}. اذكر libraries ونقاط التحقق.`,
    },
    savedAt,
  };
}
