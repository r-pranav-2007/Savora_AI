"use client";

import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

interface StepperProps {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

export function Stepper({ value, min, max, onChange }: StepperProps) {
  const decrement = () => onChange(Math.max(min, value - 1));
  const increment = () => onChange(Math.min(max, value + 1));

  return (
    <div className="flex items-center gap-5">
      <motion.button
        type="button"
        onClick={decrement}
        disabled={value <= min}
        whileHover={{ scale: value > min ? 1.08 : 1 }}
        whileTap={{ scale: value > min ? 0.92 : 1 }}
        aria-label="Decrease servings"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-neutral-700 transition-colors hover:border-violet-200 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300"
      >
        <Minus size={16} />
      </motion.button>

      <span className="w-8 text-center text-xl font-bold text-neutral-900 dark:text-white">
        {value}
      </span>

      <motion.button
        type="button"
        onClick={increment}
        disabled={value >= max}
        whileHover={{ scale: value < max ? 1.08 : 1 }}
        whileTap={{ scale: value < max ? 0.92 : 1 }}
        aria-label="Increase servings"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-neutral-700 transition-colors hover:border-violet-200 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300"
      >
        <Plus size={16} />
      </motion.button>
    </div>
  );
}
