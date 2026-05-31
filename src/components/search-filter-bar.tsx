"use client";

import { FilterIcon, SearchIcon } from "@/components/icons";

export function SearchFilterBar({
  search,
  onSearch,
  filters,
  activeFilter,
  onFilterChange,
  placeholder,
}: {
  search: string;
  onSearch: (value: string) => void;
  filters: string[];
  activeFilter: string;
  onFilterChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="space-y-4">
      <label className="glass-panel flex h-13 items-center gap-3 rounded-2xl px-4">
        <SearchIcon className="text-[var(--cyan)]" />
        <input
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[var(--text-soft)]"
        />
      </label>
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-[var(--text-soft)]">
          <FilterIcon className="h-4 w-4" />
          تصفية
        </span>
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => onFilterChange(filter)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
              activeFilter === filter
                ? "border-[var(--border-bright)] bg-[rgba(87,225,255,0.12)] text-[var(--cyan)]"
                : "border-white/10 bg-white/5 text-[var(--text-muted)] hover:border-white/20 hover:text-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
