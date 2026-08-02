"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Search, SlidersHorizontal } from "lucide-react";
import { INGREDIENT_CATALOG, INGREDIENT_CATEGORIES } from "@/lib/ingredient-catalog";

const INITIAL_VISIBLE_COUNT = 15;

interface IngredientPickerProps {
  selected: string[];
  onChange: (next: string[]) => void;
}

export function IngredientPicker({ selected, onChange }: IngredientPickerProps) {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [category, setCategory] = useState<string>("All");
  const [expanded, setExpanded] = useState(false);

  const toggle = (name: string) => {
    onChange(selected.includes(name) ? selected.filter((i) => i !== name) : [...selected, name]);
  };

  const addCustom = (name: string) => {
    if (!selected.some((i) => i.toLowerCase() === name.toLowerCase())) {
      onChange([...selected, name]);
    }
    setQuery("");
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      e.preventDefault();
      addCustom(query.trim());
    }
  };

  const filteredCatalog = useMemo(() => {
    return INGREDIENT_CATALOG.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesQuery = item.name.toLowerCase().includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const isFiltering = query.trim().length > 0 || category !== "All";
  const showAll = isFiltering || expanded || filteredCatalog.length <= INITIAL_VISIBLE_COUNT;
  const visibleCatalog = showAll ? filteredCatalog : filteredCatalog.slice(0, INITIAL_VISIBLE_COUNT);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-3 transition-colors focus-within:border-violet-300 dark:border-white/10 dark:bg-white/5">
          <Search size={16} className="shrink-0 text-neutral-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setExpanded(false);
            }}
            onKeyDown={handleSearchKeyDown}
            placeholder="Search or add the ingredients you have"
            className="min-w-0 flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none dark:text-white dark:placeholder:text-neutral-500"
          />
        </div>
        <button
          type="button"
          onClick={() => setShowFilters((v) => !v)}
          aria-label="Filter by category"
          aria-pressed={showFilters}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border transition-colors ${
            showFilters
              ? "border-violet-300 bg-violet-50 text-violet-600 dark:border-violet-400/40 dark:bg-violet-500/15 dark:text-violet-300"
              : "border-black/10 bg-white text-neutral-500 hover:text-violet-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-400"
          }`}
        >
          <SlidersHorizontal size={16} />
        </button>
      </div>

      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="flex flex-wrap gap-2"
        >
          {["All", ...INGREDIENT_CATEGORIES].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setCategory(cat);
                setExpanded(false);
              }}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                category === cat
                  ? "gradient-brand border-transparent text-white"
                  : "border-black/10 bg-white text-neutral-600 hover:border-violet-200 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      )}

      {visibleCatalog.length > 0 ? (
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {visibleCatalog.map((item, i) => {
            const isSelected = selected.includes(item.name);
            return (
              <motion.button
                key={item.name}
                type="button"
                onClick={() => toggle(item.name)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: Math.min(i, 10) * 0.02 }}
                className={`relative flex items-center gap-2.5 rounded-2xl border p-3 text-left transition-colors ${
                  isSelected
                    ? "border-violet-300 bg-violet-50/60 dark:border-violet-400/40 dark:bg-violet-500/10"
                    : "border-black/10 bg-white hover:border-violet-200 dark:border-white/10 dark:bg-white/5"
                }`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-lg dark:bg-violet-500/10">
                  {item.emoji}
                </span>
                <span className="min-w-0 text-sm font-semibold leading-tight text-neutral-800 dark:text-neutral-200">
                  {item.name}
                </span>
                {isSelected && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-white ring-2 ring-white dark:ring-[#1a1626]">
                    <Check size={11} strokeWidth={3} />
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      ) : (
        <p className="py-2 text-sm text-neutral-400 dark:text-neutral-500">
          No matches — press Enter in the search box to add &ldquo;{query}&rdquo; as a custom ingredient.
        </p>
      )}

      {!showAll && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="self-start rounded-full border border-dashed border-violet-300 px-4 py-2 text-sm font-semibold text-violet-600 transition-colors hover:bg-violet-50 dark:border-violet-400/40 dark:text-violet-300 dark:hover:bg-violet-500/10"
        >
          + View {filteredCatalog.length - INITIAL_VISIBLE_COUNT} more
        </button>
      )}
    </div>
  );
}
