export const integrationBlueprint = {
  sso: {
    provider: "Darhous Shared Auth Placeholder",
    status: "planned",
    note: "هنا سيتم ربط تسجيل الدخول الموحد مع بقية منظومة Darhous عند توفر خدمة الهوية المشتركة.",
  },
  sharedProfile: {
    source: "Darhous user profile service",
    status: "planned",
    note: "واجهة لوحة التحكم الحالية مبنية لتبديل بيانات المستخدم التجريبية بملف شخصي موحد لاحقًا.",
  },
  sharedDashboardWidgets: {
    status: "planned",
    note: "يمكن استبدال بطاقات الإحصاءات بويدجتس مشتركة بين الأكاديمية والمنصة الرئيسية.",
  },
  certificates: {
    status: "planned",
    note: "حقل الشهادات موجود في الواجهة تمهيدًا لاستهلاك سجل شهادات مركزي لاحقًا.",
  },
  portalRegistry: {
    status: "planned",
    note: "هيكل التنقل والموديولات يسمح بإضافة academy ضمن portal registry مركزي عند الدمج.",
  },
  backend: {
    candidate: "Supabase or custom service layer",
    status: "planned",
    note: "لا توجد أسرار أو اتصالات حقيقية في هذا الإصدار. سيتم حقن مزود البيانات لاحقًا عبر هذه الطبقة.",
  },
} as const;
