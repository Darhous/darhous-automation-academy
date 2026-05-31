"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandIcon, CloseIcon, MenuIcon } from "@/components/icons";
import { BrandLogo, GradientButton } from "@/components/ui";
import { footerLinks, navLinks, siteConfig } from "@/data/core";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <div className="section-inner">
        <div className="glass-panel rounded-[28px] px-4 py-3 shadow-[0_0_40px_rgba(18,198,255,0.08)]">
          <div className="flex items-center justify-between gap-4">
            <BrandLogo compact />

            <nav className="hidden items-center gap-2 xl:flex">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-sm font-semibold transition",
                      active
                        ? "bg-white/8 text-white shadow-[inset_0_0_0_1px_rgba(87,225,255,0.18)]"
                        : "text-[var(--text-muted)] hover:bg-white/6 hover:text-white",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <Link href="/auth/login" className="rounded-2xl px-4 py-3 text-sm font-semibold text-[var(--text-muted)] transition hover:text-white">
                تسجيل الدخول
              </Link>
              <GradientButton href="/auth/register">ابدأ الآن</GradientButton>
            </div>

            <button
              type="button"
              aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
              onClick={() => setOpen((value) => !value)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:border-[var(--border-bright)] xl:hidden"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>

          {open ? (
            <div className="mt-4 space-y-2 border-t border-white/8 pt-4 xl:hidden">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-2xl px-4 py-3 text-sm font-semibold transition",
                    pathname === link.href ? "bg-white/8 text-white" : "text-[var(--text-muted)] hover:bg-white/6 hover:text-white",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link href="/auth/login" onClick={() => setOpen(false)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white">
                  تسجيل الدخول
                </Link>
                <Link href="/auth/register" onClick={() => setOpen(false)} className="rounded-2xl bg-[linear-gradient(135deg,#c8fbff_0%,#7ce8ff_45%,#8d90ff_100%)] px-4 py-3 text-center text-sm font-semibold text-slate-950">
                  ابدأ الآن
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  const socialLinks = [
    {
      id: "instagram" as const,
      href: "https://www.instagram.com/darhous/",
      color: "#E1306C",
      bg: "rgba(225,48,108,0.1)",
    },
    {
      id: "linkedin" as const,
      href: "https://www.linkedin.com/in/darhous/",
      color: "#0A66C2",
      bg: "rgba(10,102,194,0.1)",
    },
    {
      id: "facebook" as const,
      href: "https://www.facebook.com/ahmed.darhous",
      color: "#1877F2",
      bg: "rgba(24,119,242,0.1)",
    },
    {
      id: "whatsapp" as const,
      href: "https://wa.me/201030002331",
      color: "#25D366",
      bg: "rgba(37,211,102,0.1)",
    },
  ];

  return (
    <footer className="section-shell pb-10 pt-14">
      <div className="section-inner">
        <div className="glass-panel rounded-[32px] px-6 py-8 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr_1fr]">
            <div className="space-y-4">
              <BrandLogo />
              <p className="max-w-xl text-base leading-8 text-[var(--text-muted)]">{`منصة عربية لتعلم وبناء وتشغيل الأتمتة الذكية.`}</p>
              <p className="text-sm leading-7 text-[var(--text-soft)]">{siteConfig.description}</p>
            </div>

            <div className="space-y-3">
              <h3 className="font-heading text-lg font-semibold text-white">روابط المنصة</h3>
              <div className="space-y-2">
                {footerLinks.map((link) => (
                  <Link key={`${link.href}-${link.label}`} href={link.href} className="block text-sm text-[var(--text-muted)] transition hover:text-[var(--cyan)]">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-heading text-lg font-semibold text-white">منظومة Darhous</h3>
              <p className="text-sm leading-7 text-[var(--text-muted)]">
                هذا المنتج مستقل اليوم، ومهيأ ليتصل لاحقًا بالحساب الموحد، لوحة التحكم المشتركة، وسجل التعلم داخل Darhous Smart Learning Ecosystem.
              </p>
              <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm text-[var(--text-soft)]">
                نفس الحساب، نفس المشاريع، نفس الشهادات، ومعامل أتمتة أكثر ذكاءً.
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-4 border-t border-[rgba(255,255,255,0.05)] pt-6">
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.id}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border transition duration-200 hover:-translate-y-1 hover:scale-110"
                  style={{
                    color: social.color,
                    background: social.bg,
                    borderColor: `${social.color}4d`,
                    boxShadow: `0 0 0 rgba(0,0,0,0)`,
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.boxShadow = `0 0 22px ${social.color}66`;
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
                  }}
                >
                  <BrandIcon name={social.id} />
                </a>
              ))}
            </div>

            <div className="font-mono-soft text-center text-xs text-[rgba(237,247,255,0.5)]">
              designed by{" "}
              <a
                href="mailto:ahmeddarhous@gmail.com"
                className="text-[rgba(87,225,255,0.85)] transition hover:text-[rgba(87,225,255,1)]"
              >
                Ahmed Darhous
              </a>{" "}
              ©
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
