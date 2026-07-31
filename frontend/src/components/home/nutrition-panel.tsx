"use client";

import { motion } from "framer-motion";
import { Droplet, Dumbbell, Flame, Wheat } from "lucide-react";
import { IconBadge } from "@/components/ui/icon-badge";
import type { NutritionInfo } from "@/lib/types";

export function NutritionPanel({
  nutrition,
  className = "",
  layout = "vertical",
}: {
  nutrition: NutritionInfo;
  className?: string;
  layout?: "vertical" | "grid";
}) {
  const rows = [
    { icon: Flame, tone: "rose" as const, value: nutrition.calories, label: "Calories" },
    { icon: Dumbbell, tone: "green" as const, value: `${nutrition.proteinGrams}g`, label: "Protein" },
    { icon: Wheat, tone: "amber" as const, value: `${nutrition.carbsGrams}g`, label: "Carbs" },
    { icon: Droplet, tone: "blue" as const, value: `${nutrition.fatsGrams}g`, label: "Fat" },
  ];

  return (
    <div
      className={`rounded-2xl bg-neutral-50 p-5 dark:bg-white/[0.04] ${
        layout === "grid"
          ? "grid grid-cols-2 gap-4 sm:grid-cols-4"
          : "flex flex-col justify-center gap-4"
      } ${className}`}
    >
      {rows.map((row, index) => (
        <motion.div
          key={row.label}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.05 * index }}
          className="flex items-center gap-3"
        >
          <IconBadge icon={row.icon} tone={row.tone} size="sm" />
          <div className="leading-tight">
            <div className="text-lg font-bold text-neutral-900 dark:text-white">{row.value}</div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400">{row.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
