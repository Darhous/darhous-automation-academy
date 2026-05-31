import type { GeneratedWorkflow, ServiceRequest } from "@/types";

const KEYS = {
  templates: "darhous.savedTemplates",
  workflows: "darhous.generatedWorkflows",
  requests: "darhous.serviceRequests",
};

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getSavedTemplates() {
  return readJSON<string[]>(KEYS.templates, []);
}

export function saveTemplate(templateId: string) {
  const items = Array.from(new Set([templateId, ...getSavedTemplates()]));
  writeJSON(KEYS.templates, items);
  return items;
}

export function getGeneratedWorkflows() {
  return readJSON<GeneratedWorkflow[]>(KEYS.workflows, []);
}

export function saveGeneratedWorkflow(workflow: GeneratedWorkflow) {
  const items = [workflow, ...getGeneratedWorkflows()].slice(0, 12);
  writeJSON(KEYS.workflows, items);
  return items;
}

export function getServiceRequests() {
  return readJSON<ServiceRequest[]>(KEYS.requests, []);
}

export function saveServiceRequest(request: ServiceRequest) {
  const items = [request, ...getServiceRequests()].slice(0, 20);
  writeJSON(KEYS.requests, items);
  return items;
}
