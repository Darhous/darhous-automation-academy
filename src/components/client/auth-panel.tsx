"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import { BrandLogo, GlassCard, StatusBadge } from "@/components/ui";

export function AuthPanel({ mode }: { mode: "login" | "register" }) {
  const [submitted, setSubmitted] = useState(false);
  const title = mode === "login" ? "تسجيل الدخول" : "إنشاء حساب جديد";
  const description =
    mode === "login"
      ? "واجهة جاهزة لربط SSO الموحد لاحقًا مع Darhous Smart Learning Ecosystem."
      : "أنشئ حسابك كبوابة مؤقتة الآن، ثم سيتم استبداله بالحساب الموحد عند الدمج.";

  return (
    <div className="section-shell">
      <div className="section-inner">
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <GlassCard className="space-y-5">
            <BrandLogo />
            <StatusBadge tone="violet">Future SSO placeholder</StatusBadge>
            <h1 className="font-heading text-4xl font-bold text-white">{title}</h1>
            <p className="text-base leading-8 text-[var(--text-muted)]">{description}</p>
            <div className="grid gap-3">
              {["نفس حساب Darhous لاحقًا", "تقدمك محفوظ", "وصول موحد للقوالب والمعامل والخدمات"].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--text-muted)]">
                  {item}
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="الاسم الكامل">
                <input className={fieldClassName} placeholder="Ahmed Darhous" />
              </Field>
              <Field label="البريد الإلكتروني">
                <input className={fieldClassName} type="email" placeholder="name@example.com" />
              </Field>
              <Field label="كلمة المرور">
                <input className={fieldClassName} type="password" placeholder="••••••••" />
              </Field>
              <Field label="نوع الاستخدام">
                <select className={fieldClassName}>
                  <option>متعلم</option>
                  <option>صاحب عمل</option>
                  <option>فريق عمليات</option>
                </select>
              </Field>
            </div>
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#c8fbff_0%,#7ce8ff_45%,#8d90ff_100%)] px-5 text-sm font-semibold text-slate-950"
            >
              {mode === "login" ? "دخول تجريبي" : "إنشاء حساب تجريبي"}
            </button>
            {submitted ? (
              <div className="rounded-2xl border border-[rgba(87,225,255,0.24)] bg-[rgba(87,225,255,0.08)] px-4 py-3 text-sm text-[var(--cyan)]">
                تم تفعيل الحالة التوضيحية. خطوة الربط الحقيقي ستتم لاحقًا عبر طبقة SSO المشتركة.
              </div>
            ) : null}
            <div className="text-sm text-[var(--text-soft)]">
              {mode === "login" ? "لا تملك حسابًا؟ " : "لديك حساب بالفعل؟ "}
              <Link href={mode === "login" ? "/auth/register" : "/auth/login"} className="text-[var(--cyan)]">
                {mode === "login" ? "أنشئ حسابًا" : "سجل الدخول"}
              </Link>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="space-y-2">
      <span className="text-sm text-[var(--text-muted)]">{label}</span>
      {children}
    </label>
  );
}

const fieldClassName =
  "h-12 w-full rounded-2xl border border-white/10 bg-[rgba(6,10,19,0.82)] px-4 text-sm text-white outline-none focus:border-[var(--border-bright)]";
