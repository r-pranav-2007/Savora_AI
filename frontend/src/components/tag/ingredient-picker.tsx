"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Search, SlidersHorizontal, X } from "lucide-react";
import { INGREDIENT_CATALOG, INGREDIENT_CATEGORIES, getIngredientEmoji } from "@/lib/ingredient-catalog";

interface IngredientPickerProps {
  selected: string[];
  onChange: (next: string[]) => void;
}

export function IngredientPicker({ selected, onChange }: IngredientPickerProps) {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [category, setCategory] = useState<string>("All");
  const scrollerRef = useRef<HTMLDivElement>(null);

  const toggle = (name: string) => {
    onChange(selected.includes(name) ? selected.filter((i) => i !== name) : [...selected, name]);
  };

  const remove = (name: string) => onChange(selected.filter((i) => i !== name));

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

  const scrollBy = (direction: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: direction * 240, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-3 transition-colors focus-within:border-violet-300 dark:border-white/10 dark:bg-white/5">
          <Search size={16} className="shrink-0 text-neutral-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
              onClick={() => setCategory(cat)}
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

      <div>
        <p className="mb-3 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          Popular ingredients
        </p>
        <div className="relative">
          <div
            ref={scrollerRef}
            className="scrollbar-none flex gap-2.5 overflow-x-auto scroll-smooth pb-1"
          >
            {filteredCatalog.length > 0 ? (
              filteredCatalog.map((item) => {
                const isSelected = selected.includes(item.name);
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => toggle(item.name)}
                    className={`flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${
                      isSelected
                        ? "border-violet-300 bg-violet-50 text-violet-700 dark:border-violet-400/40 dark:bg-violet-500/15 dark:text-violet-300"
                        : "border-black/10 bg-white text-neutral-700 hover:border-violet-200 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300"
                    }`}
                  >
                    <span className="text-base leading-none">{item.emoji}</span>
                    {item.name}
                  </button>
                );
              })
            ) : (
              <p className="py-2 text-sm text-neutral-400 dark:text-neutral-500">
                No matches — press Enter in the search box to add &ldquo;{query}&rdquo; as a custom
                ingredient.
              </p>
            )}
          </div>
          {filteredCatalog.length > 4 && (
            <>
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                aria-label="Scroll left"
                className="absolute -left-2 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-black/5 bg-white text-neutral-500 shadow-md sm:flex dark:border-white/10 dark:bg-[#1a1626]"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                aria-label="Scroll right"
                className="absolute -right-2 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-black/5 bg-white text-neutral-500 shadow-md sm:flex dark:border-white/10 dark:bg-[#1a1626]"
              >
                <ChevronRight size={14} />
              </button>
            </>
          )}
        </div>
      </div>

      {selected.length > 0 && (
        <div>
          <p className="mb-3 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            Your selected ingredients
          </p>
          <div className="flex flex-wrap gap-2.5">
            {selected.map((name) => (
              <motion.span
                key={name}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 py-1.5 pl-3 pr-2 text-sm font-medium text-violet-700 dark:border-violet-400/30 dark:bg-violet-500/10 dark:text-violet-300"
              >
                <Check size={13} />
                <span>
                  {getIngredientEmoji(name)} {name}
                </span>
                <button
                  type="button"
                  onClick={() => remove(name)}
                  aria-label={`Remove ${name}`}
                  className="ml-0.5 flex h-4 w-4 items-center justify-center rounded-full text-violet-400 transition-colors hover:bg-violet-200 hover:text-violet-700 dark:hover:bg-violet-500/20"
                >
                  <X size={12} />
                </button>
              </motion.span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
