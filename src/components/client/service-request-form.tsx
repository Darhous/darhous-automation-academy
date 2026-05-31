"use client";

import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import { saveServiceRequest } from "@/lib/storage";
import type { ServiceRequest } from "@/types";

const initialForm = {
  name: "",
  email: "",
  whatsapp: "",
  businessType: "",
  requestedAutomation: "",
  urgency: "خلال هذا الشهر",
};

export function ServiceRequestForm() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState<ServiceRequest | null>(null);

  function updateField<K extends keyof typeof initialForm>(key: K, value: (typeof initialForm)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const request: ServiceRequest = {
      id: `request-${Date.now()}`,
      ...form,
      submittedAt: new Date().toISOString(),
    };
    saveServiceRequest(request);
    setSubmitted(request);
    setForm(initialForm);
  }

  return (
    <div className="glass-panel rounded-[32px] p-6">
      <div className="font-display text-xs uppercase tracking-[0.24em] text-[var(--cyan)]/75">service request</div>
      <h3 className="mt-2 font-heading text-2xl font-semibold text-white">اطلب أتمتة مخصصة</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
        هذا النموذج يحفظ الطلب محليًا في النسخة الحالية حتى يصبح backend المشترك جاهزًا داخل منظومة Darhous.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
        <Field label="الاسم">
          <input value={form.name} onChange={(event) => updateField("name", event.target.value)} required className={fieldClassName} />
        </Field>
        <Field label="البريد الإلكتروني">
          <input type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} required className={fieldClassName} />
        </Field>
        <Field label="رقم WhatsApp">
          <input value={form.whatsapp} onChange={(event) => updateField("whatsapp", event.target.value)} required className={fieldClassName} />
        </Field>
        <Field label="نوع النشاط">
          <input value={form.businessType} onChange={(event) => updateField("businessType", event.target.value)} required className={fieldClassName} />
        </Field>
        <Field label="الأولوية">
          <select value={form.urgency} onChange={(event) => updateField("urgency", event.target.value)} className={fieldClassName}>
            <option>عاجل جدًا</option>
            <option>خلال هذا الأسبوع</option>
            <option>خلال هذا الشهر</option>
            <option>استكشاف فقط</option>
          </select>
        </Field>
        <div />
        <Field label="الأتمتة المطلوبة" full>
          <textarea
            value={form.requestedAutomation}
            onChange={(event) => updateField("requestedAutomation", event.target.value)}
            required
            className={`${fieldClassName} min-h-36`}
          />
        </Field>
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#c8fbff_0%,#7ce8ff_45%,#8d90ff_100%)] px-5 text-sm font-semibold text-slate-950"
        >
          إرسال الطلب
        </button>
      </form>
      {submitted ? (
        <div className="mt-5 rounded-2xl border border-[rgba(50,211,154,0.28)] bg-[rgba(50,211,154,0.08)] px-4 py-3 text-sm text-[var(--success)]">
          تم حفظ طلب {submitted.name} بنجاح. سيظهر أيضًا داخل صفحة /admin لهذا الإصدار التجريبي.
        </div>
      ) : null}
    </div>
  );
}

function Field({
  label,
  children,
  full = false,
}: {
  label: string;
  children: ReactNode;
  full?: boolean;
}) {
  return (
    <label className={`space-y-2 ${full ? "md:col-span-2" : ""}`}>
      <span className="text-sm text-[var(--text-muted)]">{label}</span>
      {children}
    </label>
  );
}

const fieldClassName =
  "h-12 w-full rounded-2xl border border-white/10 bg-[rgba(6,10,19,0.82)] px-4 text-sm text-white outline-none placeholder:text-[var(--text-soft)] focus:border-[var(--border-bright)]";
