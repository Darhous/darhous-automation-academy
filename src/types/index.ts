export type Difficulty = "مبتدئ" | "متوسط" | "متقدم";
export type PricingCategory = "مجاني" | "مجاني / مدفوع" | "مدفوع" | "مفاهيمي";
export type Department =
  | "sales"
  | "marketing"
  | "hr"
  | "education"
  | "finance"
  | "operations"
  | "support"
  | "personal-productivity"
  | "other";
export type Objective =
  | "save-time"
  | "reduce-errors"
  | "increase-sales"
  | "improve-follow-up"
  | "organize-data"
  | "improve-reporting";
export type BlueprintConstraint =
  | "no-paid-tools"
  | "low-cost"
  | "no-code"
  | "open-source"
  | "privacy-sensitive"
  | "approval-step"
  | "human-review"
  | "mobile"
  | "arabic-support";
export type TemplateAccess = "Free" | "Pro" | "Service-ready";
export type NodeType =
  | "Trigger"
  | "Action"
  | "Condition"
  | "Delay"
  | "AI Step"
  | "Loop"
  | "Filter"
  | "Webhook"
  | "Notification"
  | "Approval"
  | "Data Transform"
  | "Error Handler";

export interface LearningPath {
  id: string;
  title: string;
  subtitle: string;
  englishLabel: string;
  level: Difficulty;
  duration: string;
  targetAudience: string[];
  outcome: string;
  modules: string[];
  practicalProjects: string[];
  recommendedTools: string[];
  finalCapstoneProject: string;
  category: string;
  estimatedLessons: number;
}

export interface Lesson {
  id: string;
  title: string;
  summary: string;
  level: Difficulty;
  duration: string;
  takeaways: string[];
  pathIds: string[];
}

export interface AutomationTool {
  id: string;
  name: string;
  category: string;
  whatItIs: string;
  bestUseCases: string[];
  difficulty: Difficulty;
  pricingCategory: PricingCategory;
  pros: string[];
  cons: string[];
  whenToUse: string[];
  whenNotToUse: string[];
  exampleAutomations: string[];
  relatedLearningPaths: string[];
  arabicSupport: string;
}

export interface AutomationTemplate {
  id: string;
  title: string;
  category: string;
  department: string;
  difficulty: Difficulty;
  businessProblem: string;
  workflowSummary: string;
  requiredTools: string[];
  setupSteps: string[];
  inputFields: string[];
  output: string;
  testingChecklist: string[];
  risks: string[];
  upgradeIdeas: string[];
  estimatedSetupTime: string;
  access: TemplateAccess;
  trigger: string;
  actions: string[];
  featured?: boolean;
}

export interface AutomationRecipe {
  id: string;
  title: string;
  problem: string;
  workflowSteps: string[];
  requiredTools: string[];
  dataInputs: string[];
  trigger: string;
  actions: string[];
  expectedOutput: string;
  difficulty: Difficulty;
  estimatedBuildTime: string;
  risks: string[];
  testingChecklist: string[];
  upgradeIdeas: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  businessProblem: string;
  beforeAutomation: string[];
  afterAutomation: string[];
  workflowMap: string[];
  toolsUsed: string[];
  expectedImpact: string;
  kpiImprovements: string[];
  implementationRoadmap: string[];
}

export interface GlossaryTerm {
  id: string;
  term: string;
  arabicDefinition: string;
  simpleExample: string;
  relatedTerms: string[];
}

export interface AutomationPrompt {
  id: string;
  title: string;
  goal: string;
  prompt: string;
  output: string;
  recommendedFor: string[];
}

export interface AutomationChecklist {
  id: string;
  title: string;
  projectType: string;
  tools: string[];
  sensitivity: string;
  discoveryChecklist: string[];
  buildChecklist: string[];
  qaChecklist: string[];
  launchChecklist: string[];
  maintenanceChecklist: string[];
}

export interface ToolComparison {
  id: string;
  title: string;
  focus: string;
  options: Array<{
    name: string;
    bestFor: string;
    caution: string;
  }>;
  verdict: string;
}

export interface ServicePackage {
  id: string;
  title: string;
  whoItsFor: string;
  deliverables: string[];
  timeline: string;
  startingScope: string;
  requiredClientInputs: string[];
  finalOutputs: string[];
  cta: string;
}

export interface AutomationUseCase {
  id: string;
  title: string;
  examples: string[];
  operationalWins: string[];
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
  type: NodeType;
  app: string;
  description: string;
}

export interface WorkflowSample {
  id: string;
  title: string;
  overview: string;
  trigger: string;
  nodes: WorkflowNode[];
  requiredApps: string[];
  expectedData: string[];
  possibleErrors: string[];
  testPlan: string[];
  explanation: string;
}

export interface AutomationLab {
  id: string;
  title: string;
  objective: string;
  scenario: string;
  tools: string[];
  steps: string[];
  expectedOutput: string;
  commonMistakes: string[];
  challengeTask: string;
  completionChecklist: string[];
  level: Difficulty;
  duration: string;
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

export interface GeneratedWorkflow {
  id: string;
  prompt: string;
  title: string;
  summary: string;
  trigger: string;
  actions: string[];
  recommendedTools: string[];
  setupSteps: string[];
  testChecklist: string[];
  risks: string[];
  clientExplanation: string;
  prompts: {
    n8n: string;
    make: string;
    zapier: string;
    python: string;
  };
  savedAt: string;
}

export interface AutomationAgentInput {
  businessGoal: string;
  department: Department;
  objective: Objective;
  currentSteps: string;
  owner: string;
  frequency: string;
  durationMinutes: number;
  painPoints: string;
  apps: string[];
  trigger: string;
  desiredActions: string[];
  constraints: BlueprintConstraint[];
}

export interface AutomationBlueprint {
  id: string;
  title: string;
  summary: string;
  recommendedStack: string[];
  stackReasoning: string[];
  workflowDiagram: string[];
  trigger: string;
  actions: string[];
  requiredDataFields: string[];
  appsInvolved: string[];
  implementationPlan: string[];
  testingChecklist: string[];
  errorHandlingPlan: string[];
  privacyAndSecurityNotes: string[];
  maintenancePlan: string[];
  estimatedComplexity: Difficulty;
  estimatedImplementationTime: string;
  monthlyCostCategory: string;
  expectedROI: string;
  upgradeIdeas: string[];
  clientProposal: string;
  technicalBrief: string;
  buildPrompts: {
    n8n: string;
    make: string;
    zapier: string;
    python: string;
  };
  savedAt: string;
}

export interface DashboardMock {
  maturityScore: number;
  enrolledPathIds: string[];
  savedTemplateIds: string[];
  completedLabIds: string[];
  generatedBlueprintIds: string[];
  recentActivity: string[];
}
