"use client";

import { motion } from "framer-motion";
import { Droplet, Dumbbell, Flame, Wheat } from "lucide-react";
import { IconBadge } from "@/components/ui/icon-badge";
import type { NutritionInfo } from "@/lib/types";

const barToneClass = {
  rose: "bg-rose-400",
  green: "bg-emerald-400",
  amber: "bg-amber-400",
  blue: "bg-blue-400",
};

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
    { icon: Flame, tone: "rose" as const, value: nutrition.calories, label: "Calories", max: 800 },
    { icon: Dumbbell, tone: "green" as const, value: nutrition.proteinGrams, unit: "g", label: "Protein", max: 50 },
    { icon: Wheat, tone: "amber" as const, value: nutrition.carbsGrams, unit: "g", label: "Carbs", max: 100 },
    { icon: Droplet, tone: "blue" as const, value: nutrition.fatsGrams, unit: "g", label: "Fat", max: 40 },
  ];

  return (
    <div
      className={`rounded-2xl bg-neutral-50 p-5 dark:bg-white/[0.04] ${
        layout === "grid"
          ? "grid grid-cols-2 gap-5 sm:grid-cols-4"
          : "flex flex-col justify-center gap-4"
      } ${className}`}
    >
      {rows.map((row, index) => {
        const percent = Math.min(100, Math.round((row.value / row.max) * 100));
        return (
          <motion.div
            key={row.label}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.05 * index }}
            className="flex items-center gap-3"
          >
            <IconBadge icon={row.icon} tone={row.tone} size="sm" />
            <div className="min-w-0 flex-1 leading-tight">
              <div className="text-lg font-bold text-neutral-900 dark:text-white">
                {row.value}
                {row.unit ?? ""}
              </div>
              <div className="mb-1.5 text-xs text-neutral-500 dark:text-neutral-400">{row.label}</div>
              <div className="h-1 w-full max-w-20 overflow-hidden rounded-full bg-neutral-200 dark:bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 0.7, delay: 0.15 + 0.05 * index, ease: "easeOut" }}
                  className={`h-full rounded-full ${barToneClass[row.tone]}`}
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
