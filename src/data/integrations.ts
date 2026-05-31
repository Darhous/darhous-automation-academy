import type { IntegrationApp } from "@/types";

export const integrationApps: IntegrationApp[] = [
  { id: "gmail", name: "Gmail", category: "Email", useCase: "تنبيهات، ملخصات، ورسائل تلقائية", status: "جاهز" },
  { id: "google-sheets", name: "Google Sheets", category: "Google Workspace", useCase: "جداول تشغيلية وتقارير", status: "مفضل" },
  { id: "google-forms", name: "Google Forms", category: "Google Workspace", useCase: "التقاط الطلبات والاستبيانات", status: "جاهز" },
  { id: "whatsapp", name: "WhatsApp", category: "Messaging", useCase: "رسائل الطلاب والعملاء", status: "مفضل" },
  { id: "telegram", name: "Telegram", category: "Messaging", useCase: "تنبيهات داخلية وتشغيلية", status: "جاهز" },
  { id: "notion", name: "Notion", category: "Workspace", useCase: "قاعدة معرفة ولوحات تشغيل", status: "جاهز" },
  { id: "airtable", name: "Airtable", category: "Data", useCase: "قواعد بيانات مرئية", status: "جاهز" },
  { id: "slack", name: "Slack", category: "Collaboration", useCase: "موافقات وإشعارات الفرق", status: "جاهز" },
  { id: "crm", name: "CRM", category: "Sales", useCase: "متابعة leads والفرص", status: "مفضل" },
  { id: "calendar", name: "Calendar", category: "Scheduling", useCase: "مواعيد، تذكير، وجدولة", status: "جاهز" },
  { id: "database", name: "Database", category: "Developer", useCase: "مزامنة البيانات والتحديثات", status: "جاهز" },
  { id: "supabase", name: "Supabase", category: "Future Backend", useCase: "طبقة بيانات مشتركة للمنظومة لاحقًا", status: "قريبًا" },
];
