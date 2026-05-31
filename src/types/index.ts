export type Difficulty = "مبتدئ" | "متوسط" | "متقدم";

export interface AutomationPath {
  id: string;
  title: string;
  englishLabel: string;
  description: string;
  difficulty: Difficulty;
  lessons: number;
  projects: number;
  duration: string;
  focus: string[];
}

export interface AutomationTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: Difficulty;
  timeSaved: string;
  apps: string[];
  outcome: string;
  featured?: boolean;
}

export interface AutomationLab {
  id: string;
  title: string;
  goal: string;
  tools: string[];
  steps: number;
  skillLevel: Difficulty;
  duration: string;
  summary: string;
  deliverable: string;
}

export interface AutomationTool {
  id: string;
  name: string;
  type: string;
  bestFor: string;
  difficulty: Difficulty;
  pricing: "مجاني" | "مدفوع" | "مجاني / مدفوع";
  useCase: string;
  tags: string[];
}

export interface AutomationService {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  turnaround: string;
}

export interface IntegrationApp {
  id: string;
  name: string;
  category: string;
  useCase: string;
  status: "جاهز" | "قريبًا" | "مفضل";
}

export interface WorkflowNode {
  id: string;
  label: string;
  type: "Trigger" | "Action" | "Condition" | "Delay" | "AI Step" | "Loop" | "Filter" | "Webhook" | "Notification";
  app: string;
  description: string;
}

export interface GeneratedWorkflow {
  id: string;
  prompt: string;
  trigger: string;
  requiredApps: string[];
  steps: string[];
  complexity: Difficulty;
  setupTime: string;
  permissions: string[];
  recommendedTemplate: string;
  summary: string;
  savedAt: string;
}

export interface DashboardStat {
  id: string;
  label: string;
  value: string;
  trend: string;
}

export interface AdminMetric {
  id: string;
  label: string;
  value: string;
  hint: string;
}

export interface ServiceRequest {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  businessType: string;
  requestedAutomation: string;
  urgency: string;
  submittedAt: string;
}
