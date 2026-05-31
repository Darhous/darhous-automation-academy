import type { AutomationLab } from "@/types";

const lab = (
  id: string,
  title: string,
  objective: string,
  scenario: string,
  tools: string[],
  steps: string[],
  expectedOutput: string,
  commonMistakes: string[],
  challengeTask: string,
  completionChecklist: string[],
  level: AutomationLab["level"],
  duration: string,
): AutomationLab => ({
  id,
  title,
  objective,
  scenario,
  tools,
  steps,
  expectedOutput,
  commonMistakes,
  challengeTask,
  completionChecklist,
  level,
  duration,
});

export const automationLabsV2: AutomationLab[] = [
  lab("lab-1", "Lab 1: Form to Sheet to Email", "فهم أبسط workflow عملي من مدخل إلى إشعار.", "مركز تدريبي يستقبل تسجيلات جديدة ويحتاج إشعارًا سريعًا.", ["Google Forms", "Google Sheets", "Gmail"], ["إنشاء النموذج", "ربط البيانات بالجدول", "إعداد رسالة التأكيد", "اختبار تسجيل واحد"], "تسجيل جديد مع رسالة واضحة وسجل مرتب.", ["حقول ناقصة", "رسالة بلا متغيرات صحيحة"], "أضف إشعارًا داخليًا إضافيًا للمنسق.", ["اختبرت نموذجًا", "تأكدت من sheet", "راجعت البريد"], "مبتدئ", "35 دقيقة"),
  lab("lab-2", "Lab 2: Lead Capture Workflow", "تنظيم lead من form إلى CRM إلى follow-up.", "وكالة تسويقية تتلقى leads من landing page.", ["Form", "CRM", "Email"], ["تحديد الحقول", "ربط lead owner", "إعداد follow-up"], "Lead جديد محدث داخل CRM.", ["عدم تعيين owner", "تكرار leads"], "أضف scoring أوليًا للـ lead.", ["تم إنشاء lead", "تم إرسال التنبيه"], "متوسط", "40 دقيقة"),
  lab("lab-3", "Lab 3: Daily Report Automation", "بناء تقرير يومي دون تجميع يدوي.", "شركة لوجستية تحتاج summary سريعًا كل صباح.", ["Google Sheets", "Email", "AI Model"], ["تجهيز البيانات", "تحديد المؤشرات", "صياغة summary", "إرسال report"], "ملخص يومي منظم وقابل للإرسال.", ["استخدام مصادر غير موحدة", "أرقام غير مكتملة"], "أضف مقارنة مع اليوم السابق.", ["اختبرت يومًا كاملاً", "راجعت الأرقام"], "متوسط", "45 دقيقة"),
  lab("lab-4", "Lab 4: Appointment Reminder", "تقليل no-show عبر reminders منضبطة.", "عيادة أو خدمة مواعيد تحتاج تأكيدًا قبل الموعد.", ["Calendar", "WhatsApp concepts", "Email"], ["إنشاء حدث", "إعداد reminder", "إرسال confirmation"], "تأكيد وتذكير واضحان قبل الموعد.", ["توقيت خاطئ", "إرسال مكرر"], "أضف reschedule option في الرسالة.", ["اختبرت الموعد", "فحصت reminder"], "مبتدئ", "30 دقيقة"),
  lab("lab-5", "Lab 5: CRM Follow-up", "أتمتة متابعة فرص المبيعات المفتوحة.", "مندوب مبيعات يحتاج reminders تلقائية للصفقات الباردة.", ["CRM", "Calendar", "Email"], ["تحديد الصفقات المتأخرة", "إنشاء تذكير", "إرسال summary"], "قائمة متابعة أسبوعية للصفقات المفتوحة.", ["قواعد قديمة للـ stages", "كثرة التنبيهات"], "قسّم الصفقات حسب القيمة.", ["حددت الصفقات", "راجعت reminders"], "متوسط", "35 دقيقة"),
  lab("lab-6", "Lab 6: AI Email Classifier Concept", "فهم كيف تُصنف الرسائل قبل اتخاذ إجراء.", "فريق دعم يستقبل رسائل متنوعة يحتاج تصنيفها.", ["Gmail", "AI Model", "Notion"], ["جمع الرسائل", "اقتراح labels", "توجيه حسب الفئة"], "تصنيف أولي ورسائل ذات أولوية واضحة.", ["اعتماد كامل على AI", "غياب review بشري"], "أضف human review للحالات الحساسة.", ["اختبرت 3 رسائل", "راجعت التصنيف"], "متقدم", "45 دقيقة"),
  lab("lab-7", "Lab 7: Webhook Receiver Concept", "فهم استقبال الأحداث event-driven.", "موقع أو خدمة ترسل webhook عند عملية معينة.", ["Webhook", "n8n"], ["قراءة payload", "التحقق من الحقول", "تسجيل الحدث", "إرسال تنبيه"], "Event log واضح مع تنبيه على الحدث.", ["عدم التحقق من الحقول", "نسيان retries"], "أضف path خاصًا للأخطاء.", ["اختبرت payload", "راجعت السجل"], "متوسط", "40 دقيقة"),
  lab("lab-8", "Lab 8: Approval Workflow", "تصميم موافقة بخطوات واضحة.", "طلب داخلي يحتاج مرورًا على مدير ثم مالية.", ["Forms", "Email", "Sheets"], ["استقبال الطلب", "إرسال للمراجع الأول", "التصعيد عند التأخير"], "سجل موافقات واضح ومؤرخ.", ["عدم تحديد timeouts", "مسار رفض غير واضح"], "أضف approval ثانوي للحالات الكبيرة.", ["اختبرت الموافقة", "اختبرت الرفض"], "متقدم", "50 دقيقة"),
  lab("lab-9", "Lab 9: Google Sheets Automation", "استخدام Sheets كطبقة تشغيل خفيفة.", "فريق عمليات يريد tracker يومي بذكاء أكبر.", ["Google Sheets", "Apps Script concepts"], ["هيكلة الجدول", "إضافة قواعد", "إعداد تنبيه"], "جدول أكثر قابلية للتشغيل.", ["أعمدة مبعثرة", "صيغ بلا توثيق"], "أضف مؤشر KPI بسيط.", ["نظمت الجدول", "اختبرت التنبيه"], "مبتدئ", "35 دقيقة"),
  lab("lab-10", "Lab 10: n8n Self-hosted Workflow Concept", "فهم متى يناسبك n8n أكثر من حلول SaaS.", "شركة تريد كلفة أقل وتحكمًا أكبر في بياناتها.", ["n8n", "Webhook", "Supabase"], ["تصميم trigger", "إضافة nodes", "إدارة errors", "تسجيل الأحداث"], "Blueprint واضح لـ n8n flow قابل للتنفيذ.", ["اختيار n8n رغم حاجة بسيطة", "غياب log واضح"], "أضف approval step وحساب كلفة شهرية.", ["حددت nodes", "راجعت error path"], "متقدم", "60 دقيقة"),
];
