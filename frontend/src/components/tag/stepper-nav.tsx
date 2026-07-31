"use client";

import { motion } from "framer-motion";

export interface StepDefinition {
  id: string;
  label: string;
}

interface StepperNavProps {
  steps: StepDefinition[];
  activeIndex: number;
  onStepClick: (id: string) => void;
}

export function StepperNav({ steps, activeIndex, onStepClick }: StepperNavProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 rounded-2xl border border-black/5 bg-white px-6 py-4 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
      {steps.map((step, index) => {
        const isActive = index === activeIndex;
        const isDone = index < activeIndex;
        return (
          <button
            key={step.id}
            type="button"
            onClick={() => onStepClick(step.id)}
            className="flex items-center gap-2.5"
          >
            <motion.span
              animate={{
                scale: isActive ? 1.08 : 1,
              }}
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                isActive || isDone
                  ? "gradient-brand text-white"
                  : "bg-neutral-100 text-neutral-400 dark:bg-white/10 dark:text-neutral-500"
              }`}
            >
              {index + 1}
            </motion.span>
            <span
              className={`text-sm font-semibold transition-colors ${
                isActive
                  ? "text-violet-600 dark:text-violet-400"
                  : isDone
                    ? "text-neutral-700 dark:text-neutral-300"
                    : "text-neutral-400 dark:text-neutral-500"
              }`}
            >
              {step.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
