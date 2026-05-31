import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowUpLeftIcon, CheckIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border-bright)] bg-[rgba(11,19,31,0.85)] shadow-[0_0_28px_rgba(18,198,255,0.22)]">
        <Image src="/logo-mark.svg" alt="Darhous Automation Academy logo" width={32} height={32} />
      </div>
      <div className="min-w-0">
        <div className="font-display text-lg font-bold tracking-normal text-[var(--cyan)] glow-text">
          Darhous Academy
        </div>
        {!compact ? (
          <div className="font-heading text-sm text-[var(--text-muted)]">{`أكاديمية درهوس للأتمتة الذكية`}</div>
        ) : null}
      </div>
    </Link>
  );
}

export function GradientButton({
  href,
  children,
  variant = "primary",
  icon,
  className,
  onClick,
  type = "button",
  disabled = false,
}: {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}) {
  const shared =
    "pill-button inline-flex h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold";

  const variants = {
    primary:
      "bg-[linear-gradient(135deg,#c8fbff_0%,#7ce8ff_45%,#8d90ff_100%)] text-slate-950 shadow-[0_12px_40px_rgba(18,198,255,0.28)]",
    secondary:
      "glass-panel bg-[rgba(255,255,255,0.03)] text-white shadow-[0_0_0_1px_rgba(87,225,255,0.12)]",
    ghost:
      "border border-white/10 bg-white/5 text-[var(--text-muted)] hover:border-[var(--border-bright)] hover:text-white",
  };

  const content = (
    <>
      {icon}
      <span>{children}</span>
      {variant === "secondary" ? <ArrowUpLeftIcon className="h-4 w-4" /> : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn(shared, variants[variant], className)}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(shared, variants[variant], disabled && "cursor-not-allowed opacity-60", className)}
    >
      {content}
    </button>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl space-y-3">
        <div className="font-display text-xs uppercase tracking-[0.3em] text-[var(--cyan)]/80">{eyebrow}</div>
        <h2 className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl">{title}</h2>
        <p className="max-w-2xl text-base leading-8 text-[var(--text-muted)] sm:text-lg">{description}</p>
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  );
}

export function GlassCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("glass-panel rounded-[28px] p-6", className)}>{children}</div>;
}

export function StatusBadge({
  children,
  tone = "cyan",
}: {
  children: ReactNode;
  tone?: "cyan" | "violet" | "gold" | "green";
}) {
  const tones = {
    cyan: "border-[rgba(87,225,255,0.28)] bg-[rgba(87,225,255,0.1)] text-[var(--cyan)]",
    violet: "border-[rgba(140,123,255,0.28)] bg-[rgba(140,123,255,0.12)] text-[#b6abff]",
    gold: "border-[rgba(244,198,114,0.3)] bg-[rgba(244,198,114,0.1)] text-[var(--gold)]",
    green: "border-[rgba(50,211,154,0.28)] bg-[rgba(50,211,154,0.1)] text-[var(--success)]",
  };

  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold", tones[tone])}>
      <span className={cn("status-dot h-2 w-2 rounded-full", tone === "cyan" && "bg-[var(--cyan)]", tone === "violet" && "bg-[var(--violet)]", tone === "gold" && "bg-[var(--gold)]", tone === "green" && "bg-[var(--success)]")} />
      {children}
    </span>
  );
}

export function EmptyState({
  title,
  description,
  cta,
}: {
  title: string;
  description: string;
  cta?: ReactNode;
}) {
  return (
    <GlassCard className="flex min-h-52 flex-col items-start justify-center gap-4 border-dashed text-right">
      <StatusBadge tone="violet">حالة فارغة</StatusBadge>
      <h3 className="font-heading text-xl font-semibold text-white">{title}</h3>
      <p className="max-w-xl text-sm leading-7 text-[var(--text-muted)]">{description}</p>
      {cta}
    </GlassCard>
  );
}

export function ComingSoonCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <GlassCard className="space-y-4">
      <StatusBadge tone="violet">قريبًا</StatusBadge>
      <h3 className="font-heading text-2xl font-bold text-white">{title}</h3>
      <p className="text-base leading-8 text-[var(--text-muted)]">{description}</p>
      <div className="flex flex-wrap gap-3 text-sm text-[var(--text-soft)]">
        {["roadmap", "shared auth", "backend integration"].map((item) => (
          <span key={item} className="rounded-full border border-white/10 px-3 py-1">
            {item}
          </span>
        ))}
      </div>
    </GlassCard>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
          <CheckIcon className="mt-1 h-4 w-4 text-[var(--cyan)]" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}
