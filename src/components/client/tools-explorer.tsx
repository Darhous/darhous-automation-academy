"use client";

import { useMemo, useState } from "react";
import { ToolCard } from "@/components/cards";
import { SearchFilterBar } from "@/components/search-filter-bar";
import { automationTools } from "@/data/tools";

const toolFilters = ["الكل", "workflow", "AI", "Google Workspace", "developer", "no-code", "ops"];

export function ToolsExplorer() {
  const [activeFilter, setActiveFilter] = useState("الكل");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return automationTools.filter((tool) => {
      const filterMatch =
        activeFilter === "الكل" ||
        tool.type.includes(activeFilter) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(activeFilter.toLowerCase()));
      const searchMatch =
        !search ||
        `${tool.name} ${tool.bestFor} ${tool.useCase} ${tool.tags.join(" ")}`.toLowerCase().includes(search.toLowerCase());
      return filterMatch && searchMatch;
    });
  }, [activeFilter, search]);

  return (
    <div className="space-y-6">
      <SearchFilterBar
        search={search}
        onSearch={setSearch}
        filters={toolFilters}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        placeholder="ابحث عن أداة أو use case"
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}
