"use client";

import { useState } from "react";
import { SelectChip } from "./select-chip";

interface PillSelectProps {
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
  initialCount?: number;
}

export function PillSelect({ options, selected, onToggle, initialCount }: PillSelectProps) {
  const [expanded, setExpanded] = useState(false);
  const showAll = !initialCount || expanded || options.length <= initialCount;
  const visible = showAll ? options : options.slice(0, initialCount);

  return (
    <div className="flex flex-wrap gap-2">
      {visible.map((option) => (
        <SelectChip
          key={option}
          label={option}
          selected={selected.includes(option)}
          onClick={() => onToggle(option)}
        />
      ))}
      {!showAll && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="rounded-full border border-dashed border-violet-300 px-4 py-2 text-sm font-semibold text-violet-600 transition-colors hover:bg-violet-50 dark:border-violet-400/40 dark:text-violet-300 dark:hover:bg-violet-500/10"
        >
          + More
        </button>
      )}
    </div>
  );
}
