import type { GlossaryTerm } from "@/types";

const term = (id: string, label: string, arabicDefinition: string, simpleExample: string, relatedTerms: string[]): GlossaryTerm => ({
  id,
  term: label,
  arabicDefinition,
  simpleExample,
  relatedTerms,
});

export const automationGlossary: GlossaryTerm[] = [
  term("trigger", "Trigger", "الحدث الذي يبدأ الـ workflow.", "وصول تسجيل جديد من نموذج.", ["Action", "Webhook"]),
  term("action", "Action", "الخطوة التي ينفذها النظام بعد trigger أو شرط.", "إرسال بريد أو إضافة صف.", ["Trigger", "Workflow"]),
  term("webhook", "Webhook", "إشعار لحظي ترسله خدمة إلى خدمة أخرى عند حدوث حدث معين.", "عند الدفع يصل payload إلى endpoint.", ["API", "Payload"]),
  term("api", "API", "واجهة برمجية تسمح للأنظمة بالتواصل المنظم.", "إنشاء lead داخل CRM عبر API.", ["Endpoint", "Token"]),
  term("endpoint", "Endpoint", "العنوان المحدد داخل API الذي تستهدفه الطلبات.", "POST /leads", ["API", "Payload"]),
  term("payload", "Payload", "البيانات المرسلة داخل الطلب أو الـ webhook.", "{ name, phone, source }", ["JSON", "Webhook"]),
  term("json", "JSON", "صيغة شائعة لتمثيل البيانات بين الأنظمة.", "{\"status\":\"new\"}", ["Payload", "API"]),
  term("authentication", "Authentication", "طريقة إثبات هوية العميل أو التطبيق عند الوصول لنظام آخر.", "API key أو token.", ["OAuth", "Token"]),
  term("oauth", "OAuth", "أسلوب تفويض يسمح للتطبيقات بالوصول الآمن دون مشاركة كلمة المرور مباشرة.", "ربط Gmail عبر OAuth.", ["Authentication", "Token"]),
  term("token", "Token", "رمز يستخدم للوصول المصرح به إلى خدمة أو API.", "Bearer token في header.", ["Authentication", "Rate Limit"]),
  term("rate-limit", "Rate Limit", "حد أقصى لعدد الطلبات خلال فترة معينة.", "100 request per minute.", ["API", "Retry"]),
  term("cron-job", "Cron Job", "تشغيل مجدول يعتمد على الوقت.", "تشغيل التقرير الساعة 8 صباحًا.", ["Workflow", "Scheduled trigger"]),
  term("workflow", "Workflow", "المسار الكامل للخطوات والمنطق بين trigger والنتيجة.", "Form → Sheet → Email", ["Trigger", "Action"]),
  term("scenario", "Scenario", "اسم آخر شائع للـ workflow في بعض المنصات.", "Make scenario لمتابعة leads.", ["Workflow", "Node"]),
  term("node", "Node", "عنصر واحد داخل canvas يمثل trigger أو action أو logic.", "Google Sheets node.", ["Workflow", "Connector"]),
  term("connector", "Connector", "حلقة الربط الجاهزة مع خدمة أو تطبيق.", "Gmail connector.", ["Integration", "Node"]),
  term("integration", "Integration", "الربط بين نظامين أو أكثر لنقل البيانات أو الأوامر.", "ربط CRM مع Google Sheets.", ["API", "Connector"]),
  term("error-handling", "Error Handling", "آلية التعامل مع الفشل أو البيانات غير الصالحة داخل الـ workflow.", "إرسال تنبيه عند فشل API.", ["Retry", "Queue"]),
  term("retry", "Retry", "إعادة المحاولة تلقائيًا بعد فشل مؤقت.", "إعادة الطلب بعد 30 ثانية.", ["Error Handling", "Rate Limit"]),
  term("queue", "Queue", "طابور من المهام ينتظر المعالجة بالترتيب أو وفق قواعد معينة.", "طلبات support waiting.", ["Retry", "Workflow"]),
  term("rpa", "RPA", "Robotic Process Automation لأتمتة تفاعلات متكررة مع واجهات لا توفر تكاملًا مباشرًا.", "نظام قديم بلا API.", ["Browser Automation", "Workflow"]),
  term("scraping", "Scraping", "استخراج بيانات من واجهة ويب عند غياب طريقة رسمية أفضل.", "قراءة جدول من portal.", ["Browser Automation", "RPA"]),
  term("etl", "ETL", "استخراج البيانات وتحويلها ثم تحميلها إلى وجهة جديدة.", "جمع بيانات المبيعات وتحويلها للتقرير.", ["Data Transform", "Workflow"]),
  term("crm", "CRM", "نظام إدارة علاقات العملاء والفرص البيعية.", "HubSpot أو CRM داخلي.", ["Lead", "Sales Automation"]),
  term("sla", "SLA", "اتفاق مستوى الخدمة الذي يحدد سرعة الاستجابة أو المعالجة.", "الرد خلال ساعتين.", ["Support", "Escalation"]),
  term("human-in-the-loop", "Human-in-the-loop", "إبقاء خطوة مراجعة بشرية داخل الأتمتة قبل الإجراء النهائي.", "مراجعة مختصر AI قبل الإرسال.", ["Approval", "Privacy"]),
];
