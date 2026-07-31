"use client";

import { motion } from "framer-motion";
import { SelectChip } from "./select-chip";

interface ChipGroupProps {
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
}

export function ChipGroup({ options, selected, onToggle }: ChipGroupProps) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((option, index) => (
        <motion.div
          key={option}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.02 * index }}
        >
          <SelectChip
            label={option}
            selected={selected.includes(option)}
            onClick={() => onToggle(option)}
          />
        </motion.div>
      ))}
    </div>
  );
}
