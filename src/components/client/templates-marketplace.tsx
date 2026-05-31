"use client";

import { useMemo, useState } from "react";
import { TemplateCard } from "@/components/cards";
import { SearchFilterBar } from "@/components/search-filter-bar";
import { GradientButton, GlassCard, StatusBadge } from "@/components/ui";
import { homepageTemplateFilters } from "@/data/core";
import { automationTemplates } from "@/data/templates";
import { saveTemplate } from "@/lib/storage";

export function TemplatesMarketplace({ compact = false }: { compact?: boolean }) {
  const [activeFilter, setActiveFilter] = useState("الكل");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(automationTemplates[0]?.id ?? "");
  const [message, setMessage] = useState("");

  const filtered = useMemo(() => {
    return automationTemplates.filter((template) => {
      const filterMatch =
        activeFilter === "الكل" ||
        template.category === activeFilter ||
        template.apps.some((app) => app.includes(activeFilter));
      const searchMatch =
        !search ||
        `${template.title} ${template.description} ${template.apps.join(" ")} ${template.category}`
          .toLowerCase()
          .includes(search.toLowerCase());
      return filterMatch && searchMatch;
    });
  }, [activeFilter, search]);

  const selected = filtered.find((template) => template.id === selectedId) ?? filtered[0] ?? automationTemplates[0];

  function handleUseTemplate(id: string) {
    saveTemplate(id);
    setMessage("تم حفظ القالب في لوحة التحكم.");
  }

  const items = compact ? filtered.slice(0, 3) : filtered;

  return (
    <div className="space-y-6">
      <SearchFilterBar
        search={search}
        onSearch={setSearch}
        filters={homepageTemplateFilters}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        placeholder="ابحث عن template أو app أو use case"
      />

      {message ? (
        <div className="rounded-2xl border border-[rgba(50,211,154,0.3)] bg-[rgba(50,211,154,0.08)] px-4 py-3 text-sm text-[var(--success)]">
          {message}
        </div>
      ) : null}

      <div className={`grid gap-5 ${compact ? "xl:grid-cols-3" : "xl:grid-cols-[1.35fr_0.9fr]"}`}>
        <div className={`grid gap-5 ${compact ? "md:grid-cols-2 xl:grid-cols-3" : "md:grid-cols-2"}`}>
          {items.map((template) => (
            <div key={template.id} onMouseEnter={() => setSelectedId(template.id)}>
              <TemplateCard
                template={template}
                action={
                  <div className="mt-auto flex gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedId(template.id)}
                      className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-[var(--border-bright)]"
                    >
                      Preview
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUseTemplate(template.id)}
                      className="flex-1 rounded-2xl bg-[linear-gradient(135deg,#c8fbff_0%,#7ce8ff_45%,#8d90ff_100%)] px-4 py-3 text-sm font-semibold text-slate-950"
                    >
                      Use Template
                    </button>
                  </div>
                }
              />
            </div>
          ))}
        </div>

        {!compact ? (
          <GlassCard className="sticky top-28 h-fit space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <StatusBadge tone="violet">Preview Panel</StatusBadge>
                <h3 className="mt-3 font-heading text-2xl font-semibold text-white">{selected.title}</h3>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-2 text-xs text-[var(--text-soft)]">{selected.timeSaved}</span>
            </div>
            <p className="text-sm leading-7 text-[var(--text-muted)]">{selected.description}</p>
            <div className="grid grid-cols-2 gap-3">
              <Info label="Category" value={selected.category} />
              <Info label="Difficulty" value={selected.difficulty} />
              <Info label="Apps" value={`${selected.apps.length}`} />
              <Info label="Impact" value={selected.outcome} />
            </div>
            <div className="flex flex-wrap gap-2">
              {selected.apps.map((app) => (
                <span key={app} className="rounded-full border border-[var(--border-bright)] bg-[rgba(87,225,255,0.1)] px-3 py-1 text-xs text-[var(--cyan)]">
                  {app}
                </span>
              ))}
            </div>
            <GradientButton href="/generator" variant="secondary" className="w-full">
              خصص هذا القالب عبر مولد الأتمتة
            </GradientButton>
          </GlassCard>
        ) : null}
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className="font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-soft)]">{label}</div>
      <div className="mt-2 text-sm leading-6 text-white">{value}</div>
    </div>
  );
}
