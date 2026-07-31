"use client";

import { motion } from "framer-motion";
import { BarChart3, Clock, Heart, Leaf, Soup, Zap, type LucideIcon } from "lucide-react";

interface QuickFilter {
  label: string;
  icon: LucideIcon;
}

const QUICK_FILTERS: QuickFilter[] = [
  { label: "High Protein", icon: Zap },
  { label: "Under 20 mins", icon: Clock },
  { label: "Vegetarian", icon: Leaf },
  { label: "Low Carb", icon: BarChart3 },
  { label: "Kid Friendly", icon: Heart },
  { label: "South Indian", icon: Soup },
];

export function QuickFilters({
  onSelect,
  disabled,
}: {
  onSelect: (label: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {QUICK_FILTERS.map((filter, index) => (
        <motion.button
          key={filter.label}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(filter.label)}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 * index }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-2 rounded-full border border-black/5 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm transition-colors hover:border-violet-200 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 dark:hover:border-violet-400/30 dark:hover:text-violet-300"
        >
          <filter.icon size={15} />
          {filter.label}
        </motion.button>
      ))}
    </div>
  );
}
