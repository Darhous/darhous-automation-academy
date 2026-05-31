import type { ToolComparison } from "@/types";

export const automationComparisons: ToolComparison[] = [
  {
    id: "zapier-vs-make-vs-n8n",
    title: "Zapier vs Make vs n8n",
    focus: "السرعة مقابل المرونة والكلفة",
    options: [
      { name: "Zapier", bestFor: "فِرق صغيرة تريد launch سريعًا", caution: "قد يصبح مكلفًا مع التوسع" },
      { name: "Make", bestFor: "سيناريوهات مرئية أقوى من Zapier", caution: "ما زال no-code بتكلفة متزايدة" },
      { name: "n8n", bestFor: "Open-source وخصوصية وتحكم أكبر", caution: "يحتاج فهمًا تقنيًا أكثر" },
    ],
    verdict: "اختر Zapier للسرعة المطلقة، Make للوضوح المرئي، وn8n عندما تريد مرونة أعلى وكلفة أذكى على المدى المتوسط.",
  },
  {
    id: "power-automate-vs-make",
    title: "Power Automate vs Make",
    focus: "بيئات Microsoft مقابل SaaS متنوعة",
    options: [
      { name: "Power Automate", bestFor: "الشركات التي تعيش داخل Microsoft 365", caution: "أثقل على المشاريع الصغيرة" },
      { name: "Make", bestFor: "المشاريع الأسرع والفرق متعددة الأدوات", caution: "أقل مؤسسية في بعض الحالات" },
    ],
    verdict: "إذا كانت الموافقات والملفات والبريد كلها في Microsoft فابدأ بـ Power Automate، وإلا فغالبًا Make أسرع تنفيذًا.",
  },
  {
    id: "sheets-vs-airtable-vs-supabase",
    title: "Sheets vs Airtable vs Supabase",
    focus: "أين تحتفظ ببيانات الـ workflow؟",
    options: [
      { name: "Google Sheets", bestFor: "البدايات السريعة والتقارير الخفيفة", caution: "ليس قاعدة بيانات حقيقية" },
      { name: "Airtable", bestFor: "قاعدة مرئية أكثر تنظيمًا للفرق", caution: "تكلفة وقيود حسب الخطة" },
      { name: "Supabase", bestFor: "منتج يحتاج بيانات مشتركة ونموًا مستقبليًا", caution: "يحتاج طبقة تقنية أوضح" },
    ],
    verdict: "ابدأ بـ Sheets إذا كانت الحاجة بسيطة، ارتقِ إلى Airtable حين تحتاج structure مرئي، واختر Supabase عندما يصبح المنتج نفسه جزءًا من الحل.",
  },
  {
    id: "whatsapp-vs-email",
    title: "WhatsApp vs Email في الأتمتة",
    focus: "اختيار القناة المناسبة",
    options: [
      { name: "WhatsApp", bestFor: "التذكير السريع والمتابعة الفورية", caution: "قيود API وموافقات القوالب" },
      { name: "Email", bestFor: "التوثيق والمحتوى الأطول والمرفقات", caution: "أبطأ في الفتح أحيانًا" },
    ],
    verdict: "استخدم WhatsApp للسرعة والـ reminders، وEmail عندما تحتاج سجلًا أو محتوى مفصلًا أو مرفقات.",
  },
];
