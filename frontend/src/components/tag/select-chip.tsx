"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface SelectChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

export function SelectChip({ label, selected, onClick, className }: SelectChipProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      animate={{ scale: selected ? [1, 1.06, 1] : 1 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200",
        selected
          ? "gradient-brand border-transparent text-white shadow-[0_8px_20px_-8px_rgba(124,58,237,0.55)]"
          : "border-black/10 bg-white text-neutral-700 hover:border-violet-200 hover:text-violet-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 dark:hover:border-violet-400/30 dark:hover:text-violet-300",
        className
      )}
    >
      {label}
    </motion.button>
  );
}
