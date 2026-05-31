import type {
  AutomationAgentInput,
  AutomationBlueprint,
  BlueprintConstraint,
  Department,
  Difficulty,
  Objective,
} from "@/types";

function departmentLabel(department: Department) {
  const labels: Record<Department, string> = {
    sales: "المبيعات",
    marketing: "التسويق",
    hr: "الموارد البشرية",
    education: "التعليم",
    finance: "المالية",
    operations: "العمليات",
    support: "خدمة العملاء",
    "personal-productivity": "الإنتاجية الشخصية",
    other: "أخرى",
  };

  return labels[department];
}

function objectiveLabel(objective: Objective) {
  const labels: Record<Objective, string> = {
    "save-time": "توفير الوقت",
    "reduce-errors": "تقليل الأخطاء",
    "increase-sales": "رفع المبيعات",
    "improve-follow-up": "تحسين المتابعة",
    "organize-data": "تنظيم البيانات",
    "improve-reporting": "تحسين التقارير",
  };

  return labels[objective];
}

function hasConstraint(constraints: BlueprintConstraint[], key: BlueprintConstraint) {
  return constraints.includes(key);
}

function recommendStack(input: AutomationAgentInput) {
  if (hasConstraint(input.constraints, "open-source") || hasConstraint(input.constraints, "privacy-sensitive")) {
    return ["n8n", "Google Sheets أو Supabase", "Email", "Webhook"];
  }

  if (hasConstraint(input.constraints, "no-code") && hasConstraint(input.constraints, "low-cost")) {
    return ["Make", "Google Sheets", "Gmail", "Notion"];
  }

  if (input.apps.includes("Excel") || input.apps.includes("Custom API")) {
    return ["Python", "Webhook", "Supabase", "Email"];
  }

  if (input.apps.includes("Calendar") && input.apps.includes("Drive")) {
    return ["Google Workspace", "Apps Script concepts", "Google Sheets"];
  }

  if (input.department === "finance" || input.department === "operations") {
    return ["Power Automate", "Email", "Google Sheets"];
  }

  return ["Make", "CRM", "Google Sheets", "Email"];
}

function estimateComplexity(input: AutomationAgentInput): Difficulty {
  let score = 0;
  score += input.apps.length;
  score += input.desiredActions.length;
  score += input.constraints.length;
  score += input.durationMinutes > 45 ? 2 : 1;

  if (hasConstraint(input.constraints, "human-review")) score += 2;
  if (hasConstraint(input.constraints, "approval-step")) score += 2;
  if (input.apps.includes("Custom API")) score += 2;

  if (score <= 8) return "مبتدئ";
  if (score <= 14) return "متوسط";
  return "متقدم";
}

function costCategory(stack: string[], constraints: BlueprintConstraint[]) {
  if (hasConstraint(constraints, "open-source") || stack.includes("n8n")) return "منخفضة غالبًا";
  if (stack.includes("Power Automate")) return "متوسطة إلى مرتفعة بحسب التراخيص";
  if (stack.includes("Make")) return "منخفضة إلى متوسطة";
  return "متوسطة";
}

function implementationTime(level: Difficulty) {
  if (level === "مبتدئ") return "يوم إلى يومين";
  if (level === "متوسط") return "3 إلى 5 أيام";
  return "أسبوع إلى أسبوعين";
}

function blueprintDataFields(input: AutomationAgentInput) {
  const core = ["اسم السجل أو العميل", "تاريخ الإنشاء", "الحالة الحالية", "المسؤول"];
  if (input.apps.includes("Google Sheets") || input.apps.includes("Excel")) core.push("رقم الصف أو المرجع");
  if (input.apps.includes("CRM")) core.push("مرحلة الـ pipeline");
  if (input.department === "education") core.push("اسم الطالب أو الدورة");
  if (input.department === "finance") core.push("القيمة المالية أو رقم الطلب");
  return core;
}

function stackReasoning(stack: string[]) {
  return stack.map((item) => {
    if (item === "n8n") return "تم اختيار n8n لأنه يوازن بين المرونة والخصوصية والكلفة عند وجود حساسية بيانات أو تفضيل open-source.";
    if (item === "Make") return "تم اختيار Make لأنه مناسب للفرق التي تريد no-code delivery سريعًا مع رؤية مرئية واضحة.";
    if (item === "Power Automate") return "تم اختيار Power Automate لأن العملية تميل إلى approvals وعمليات داخلية أقرب لبيئات Microsoft أو العمليات المؤسسية.";
    if (item === "Python") return "تم اختيار Python لأن العملية تحمل منطقًا خاصًا أو ربط APIs يتجاوز حدود المنصات الجاهزة.";
    if (item === "Webhook") return "تم إدخال Webhook لأن trigger أو data handoff يحتاج استجابة event-driven واضحة.";
    if (item.includes("Supabase")) return "تم ترشيح Supabase كطبقة بيانات أنظف عندما تحتاج سجلًا مشتركًا وقابلًا للتوسع بدل الاعتماد الكامل على الجداول.";
    return `تم تضمين ${item} لأنه يتماشى مع التطبيقات الحالية والقيود المحددة في السيناريو.`;
  });
}

function whatsappNote(input: AutomationAgentInput) {
  if (!input.apps.includes("WhatsApp")) return [];

  return [
    "إذا كان التنفيذ يعتمد على WhatsApp، فالتطبيق الفعلي يحتاج WhatsApp Business API أو مزودًا معتمدًا.",
    "ينبغي استخدام قوالب رسائل approved وتحديد حالات الإرسال المقبولة لتجنب الحظر أو الرفض.",
  ];
}

export function generateAutomationBlueprint(input: AutomationAgentInput): AutomationBlueprint {
  const stack = recommendStack(input);
  const complexity = estimateComplexity(input);
  const title = `${departmentLabel(input.department)} - ${objectiveLabel(input.objective)} عبر ${input.trigger}`;
  const diagram = [
    `Trigger: ${input.trigger}`,
    `Capture: ${input.apps.join(" -> ")}`,
    `Process: ${input.desiredActions.join(" -> ")}`,
    hasConstraint(input.constraints, "human-review") ? "Human Review: Required before final step" : "Human Review: Optional",
    "Outcome: تحديث الحالة + إشعار + سجل تشغيلي",
  ];

  const implementationPlan = [
    "تفكيك العملية الحالية إلى خطوات ومدخلات ومسؤوليات.",
    `اختيار stack النهائي: ${stack.join("، ")}.`,
    "تعريف خريطة البيانات والحقول الإلزامية قبل أي تنفيذ.",
    "بناء trigger ثم اختبار happy path ببيانات تجريبية واضحة.",
    hasConstraint(input.constraints, "approval-step")
      ? "إضافة approval lane واضح مع timeout وتصعيد."
      : "إضافة notifications وتسجيل الحالة النهائية داخل سجل مركزي.",
    "تنفيذ QA على الحالات الناقصة والمكررة وحالات الفشل المؤقت.",
    "تجهيز SOP مبسط وخطة صيانة شهرية بعد الإطلاق.",
  ];

  const clientProposal = [
    `نقترح تنفيذ أتمتة داخل قسم ${departmentLabel(input.department)} بهدف ${objectiveLabel(input.objective)}.`,
    `ستعتمد الأتمتة على ${stack.join("، ")} مع مراعاة القيود التالية: ${input.constraints.join("، ") || "لا توجد قيود خاصة"}.`,
    "النطاق يشمل تحليل الخطوات الحالية، تصميم workflow، اختبار أولي، وتسليم خطة تشغيل وصيانة مبسطة.",
    `التعقيد المتوقع: ${complexity}، والزمن التقديري للتنفيذ: ${implementationTime(complexity)}.`,
  ].join(" ");

  const technicalBrief = [
    `Goal: ${input.businessGoal}`,
    `Department: ${departmentLabel(input.department)}`,
    `Trigger: ${input.trigger}`,
    `Apps: ${input.apps.join(", ")}`,
    `Desired actions: ${input.desiredActions.join(", ")}`,
    `Constraints: ${input.constraints.join(", ") || "none"}`,
    `Manual flow summary: ${input.currentSteps}`,
  ].join("\n");

  const promptsContext = `القسم ${departmentLabel(input.department)}، الهدف ${objectiveLabel(input.objective)}، trigger = ${input.trigger}، apps = ${input.apps.join("، ")}، actions = ${input.desiredActions.join("، ")}`;

  return {
    id: `blueprint-${Date.now()}`,
    title,
    summary: `هذه الخطة تحول العملية الحالية من تنفيذ يدوي يستغرق قرابة ${input.durationMinutes} دقيقة لكل مرة إلى مسار أوضح وأقل اعتمادًا على المتابعة اليدوية، مع تركيز خاص على ${objectiveLabel(input.objective)}.`,
    recommendedStack: stack,
    stackReasoning: stackReasoning(stack),
    workflowDiagram: diagram,
    trigger: input.trigger,
    actions: input.desiredActions,
    requiredDataFields: blueprintDataFields(input),
    appsInvolved: input.apps,
    implementationPlan,
    testingChecklist: [
      "اختبر happy path ببيانات مكتملة.",
      "اختبر حالة بيانات ناقصة أو غير صحيحة.",
      "اختبر التكرار أو duplicate submissions.",
      hasConstraint(input.constraints, "human-review")
        ? "اختبر مرور الحالة عبر human review ثم الإكمال."
        : "اختبر fallback notification عند فشل خطوة رئيسية.",
      "راجع الرسائل النهائية والـ logs.",
    ],
    errorHandlingPlan: [
      "سجل كل فشل في طبقة log واضحة يمكن مراجعتها.",
      "أعد المحاولة للحالات المؤقتة مثل فشل API أو انقطاع الشبكة.",
      "أرسل تنبيهًا داخليًا عند الفشل بعد retry.",
      "لا تُنفذ الخطوة النهائية إذا كانت الحقول الإلزامية ناقصة.",
    ],
    privacyAndSecurityNotes: [
      hasConstraint(input.constraints, "privacy-sensitive")
        ? "العملية مصنفة كحساسة، لذا يفضّل تقليل الوصول واعتماد open-source أو بيئة خاصة."
        : "التزم بمبدأ least privilege حتى في العمليات غير الحساسة.",
      "وثّق من يملك الوصول إلى البيانات ومن يملك حق تعديل الـ workflow.",
      ...whatsappNote(input),
    ],
    maintenancePlan: [
      "مراجعة شهرية للـ workflow والرسائل والقوالب.",
      "مراجعة logs والأخطاء المتكررة كل أسبوعين.",
      "تحديث الحقول أو قواعد القرار عند تغير العملية الفعلية.",
    ],
    estimatedComplexity: complexity,
    estimatedImplementationTime: implementationTime(complexity),
    monthlyCostCategory: costCategory(stack, input.constraints),
    expectedROI: `إذا كانت العملية الحالية تُنفذ ${input.frequency} وتستغرق ${input.durationMinutes} دقيقة لكل مرة، فالعائد المتوقع يظهر في تقليل الوقت والأخطاء وتحسين الانضباط خلال أول أسابيع التشغيل.`,
    upgradeIdeas: [
      "إضافة dashboard تشغيلية تقيس الأداء.",
      hasConstraint(input.constraints, "human-review") ? "تقليل المراجعة البشرية للحالات المنخفضة المخاطر لاحقًا." : "إضافة human review للحالات الحساسة فقط.",
      "ربط الخطوات مع سجل موحد داخل dashboard أو قاعدة بيانات لاحقًا.",
    ],
    clientProposal,
    technicalBrief,
    buildPrompts: {
      n8n: `صمّم n8n workflow لهذا السيناريو. ${promptsContext}. أضف trigger، data mapping، error handler، logging، وnotes بالعربية.`,
      make: `حوّل السيناريو التالي إلى Make scenario واضح. ${promptsContext}. وضّح modules وfilters وrouters وexception path.`,
      zapier: `اقترح Zapier implementation plan لهذا السيناريو. ${promptsContext}. وضّح trigger app، action apps، وما الحدود التي قد تجعل Zapier غير كافٍ.`,
      python: `اكتب technical implementation brief بلغة Python لهذا السيناريو. ${promptsContext}. وضّح libraries ونقاط التحقق وerror handling.`,
    },
    savedAt: new Date().toISOString(),
  };
}
