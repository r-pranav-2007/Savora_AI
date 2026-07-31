"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, type LucideIcon } from "lucide-react";
import { IconBadge } from "@/components/ui/icon-badge";
import { Button } from "@/components/ui/button";
import { SelectChip } from "./select-chip";

type Tone = "violet" | "green" | "rose" | "amber" | "blue";

interface FilterDropdownProps {
  icon: LucideIcon;
  tone: Tone;
  label: string;
  placeholder: string;
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
  multi?: boolean;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FilterDropdown({
  icon,
  tone,
  label,
  placeholder,
  options,
  selected,
  onToggle,
  multi = false,
  isOpen,
  onOpenChange,
}: FilterDropdownProps) {
  const displayValue = selected.length > 0 ? selected.join(", ") : placeholder;

  return (
    <div className="relative">
      <motion.button
        type="button"
        onClick={() => onOpenChange(!isOpen)}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`flex w-full items-center gap-3 rounded-2xl border bg-white p-4 text-left transition-colors dark:bg-white/5 ${
          isOpen
            ? "border-violet-300 dark:border-violet-400/40"
            : "border-black/10 hover:border-violet-200 dark:border-white/10"
        }`}
      >
        <IconBadge icon={icon} tone={tone} size="sm" />
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-bold text-neutral-900 dark:text-white">{label}</span>
          <span
            className={`block truncate text-xs ${
              selected.length > 0
                ? "font-medium text-violet-600 dark:text-violet-400"
                : "text-neutral-400 dark:text-neutral-500"
            }`}
          >
            {displayValue}
          </span>
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-neutral-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => onOpenChange(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 rounded-2xl border border-black/10 bg-white p-4 shadow-xl dark:border-white/10 dark:bg-[#1a1626]"
            >
              <div className="flex flex-wrap gap-2">
                {options.map((option) => (
                  <SelectChip
                    key={option}
                    label={option}
                    selected={selected.includes(option)}
                    onClick={() => {
                      onToggle(option);
                      if (!multi) onOpenChange(false);
                    }}
                  />
                ))}
              </div>
              {multi && (
                <div className="mt-3 flex justify-end">
                  <Button size="sm" variant="outline" onClick={() => onOpenChange(false)}>
                    Done
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
