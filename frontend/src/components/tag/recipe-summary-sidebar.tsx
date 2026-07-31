"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  CalendarDays,
  Clock,
  Flame,
  Globe,
  Heart,
  NotebookPen,
  Sparkles,
  Users,
} from "lucide-react";
import { IconBadge } from "@/components/ui/icon-badge";
import { getIngredientEmoji } from "@/lib/ingredient-catalog";
import { SPICE_LEVEL_OPTIONS } from "@/lib/types";

type Tone = "violet" | "green" | "rose" | "amber" | "blue";

interface RecipeSummarySidebarProps {
  ingredients: string[];
  cuisine?: string;
  mealType?: string;
  cookingTime?: string;
  spiceLevel?: string;
  dietaryPreference: string[];
  difficulty?: string;
  servings: number;
  additionalPreferences: string;
}

function SummaryRow({
  icon: Icon,
  tone,
  label,
  value,
  isSet,
  extra,
}: {
  icon: typeof Globe;
  tone: Tone;
  label: string;
  value: string;
  isSet: boolean;
  extra?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
      className="flex items-center gap-3 border-t border-black/5 py-3.5 first:border-t-0 dark:border-white/10"
    >
      <IconBadge icon={Icon} tone={isSet ? tone : "neutral"} size="sm" className={isSet ? "" : "opacity-50"} />
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold text-neutral-900 dark:text-white">{label}</span>
        <span
          className={`block truncate text-sm ${
            isSet
              ? "font-medium text-violet-600 dark:text-violet-400"
              : "italic text-neutral-400 dark:text-neutral-600"
          }`}
        >
          {value}
        </span>
      </span>
      {isSet && extra}
    </motion.div>
  );
}

function SpiceDots({ level }: { level: string }) {
  const index = SPICE_LEVEL_OPTIONS.indexOf(level as (typeof SPICE_LEVEL_OPTIONS)[number]);
  const filled = index >= 0 ? index + 1 : 0;
  return (
    <span className="flex shrink-0 gap-0.5">
      {SPICE_LEVEL_OPTIONS.map((_, i) => (
        <Flame
          key={i}
          size={12}
          className={
            i < filled
              ? "fill-rose-400 text-rose-400"
              : "fill-neutral-200 text-neutral-200 dark:fill-white/10 dark:text-white/10"
          }
        />
      ))}
    </span>
  );
}

export function RecipeSummarySidebar({
  ingredients,
  cuisine,
  mealType,
  cookingTime,
  spiceLevel,
  dietaryPreference,
  difficulty,
  servings,
  additionalPreferences,
}: RecipeSummarySidebarProps) {
  const checklist = [
    ingredients.length > 0,
    Boolean(cuisine),
    Boolean(mealType),
    Boolean(cookingTime),
    Boolean(spiceLevel),
    dietaryPreference.length > 0,
    Boolean(difficulty),
  ];
  const completedCount = checklist.filter(Boolean).length;
  const totalCount = checklist.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <aside className="flex flex-col gap-1 rounded-3xl border border-black/5 bg-white p-6 shadow-[var(--shadow-card)] dark:border-white/10 dark:bg-white/[0.04]">
      <div className="mb-1 flex items-center gap-2">
        <Sparkles size={18} className="text-violet-500" />
        <div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">Your Recipe Summary</h3>
          <p className="text-xs text-neutral-400 dark:text-neutral-500">Review your selections</p>
        </div>
      </div>

      <div className="mb-1 mt-3 flex items-center justify-between text-xs font-semibold text-neutral-400 dark:text-neutral-500">
        <span>Progress</span>
        <span className="text-violet-600 dark:text-violet-400">
          {completedCount} of {totalCount}
        </span>
      </div>
      <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-white/10">
        <motion.div
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="gradient-brand h-full rounded-full"
        />
      </div>

      <div className="border-t border-black/5 py-3.5 dark:border-white/10">
        <div className="mb-2 flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${ingredients.length > 0 ? "bg-emerald-400" : "bg-neutral-300 dark:bg-white/15"}`}
          />
          <span className="text-sm font-bold text-neutral-900 dark:text-white">Ingredients</span>
          <span className="ml-auto rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-semibold text-neutral-500 dark:bg-white/10 dark:text-neutral-400">
            {ingredients.length}
          </span>
        </div>
        {ingredients.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {ingredients.map((name) => (
              <span
                key={name}
                className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700 dark:bg-violet-500/10 dark:text-violet-300"
              >
                {getIngredientEmoji(name)} {name}
              </span>
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-black/10 px-3 py-2.5 text-xs text-neutral-400 dark:border-white/10 dark:text-neutral-500">
            Nothing selected yet — search or tap a popular ingredient to get started.
          </p>
        )}
      </div>

      <SummaryRow icon={Globe} tone="violet" label="Cuisine" value={cuisine ?? "Not set yet"} isSet={Boolean(cuisine)} />
      <SummaryRow
        icon={CalendarDays}
        tone="amber"
        label="Meal Type"
        value={mealType ?? "Not set yet"}
        isSet={Boolean(mealType)}
      />
      <SummaryRow
        icon={Clock}
        tone="blue"
        label="Cooking Time"
        value={cookingTime ?? "Not set yet"}
        isSet={Boolean(cookingTime)}
      />
      <SummaryRow
        icon={Flame}
        tone="rose"
        label="Spice Level"
        value={spiceLevel ?? "Not set yet"}
        isSet={Boolean(spiceLevel)}
        extra={spiceLevel ? <SpiceDots level={spiceLevel} /> : undefined}
      />
      <SummaryRow
        icon={Heart}
        tone="green"
        label="Dietary Preference"
        value={dietaryPreference.length > 0 ? dietaryPreference.join(", ") : "Not set yet"}
        isSet={dietaryPreference.length > 0}
      />
      <SummaryRow
        icon={BarChart3}
        tone="amber"
        label="Difficulty"
        value={difficulty ?? "Not set yet"}
        isSet={Boolean(difficulty)}
      />
      <SummaryRow icon={Users} tone="violet" label="Servings" value={`${servings} servings`} isSet />
      <SummaryRow
        icon={NotebookPen}
        tone="violet"
        label="Additional Preferences"
        value={additionalPreferences.trim() || "None added"}
        isSet={Boolean(additionalPreferences.trim())}
      />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="mt-4 rounded-2xl bg-violet-50 p-4 dark:bg-violet-500/10"
      >
        <p className="mb-1 flex items-center gap-1.5 text-sm font-bold text-violet-700 dark:text-violet-300">
          Ready to create something amazing?
        </p>
        <p className="text-xs leading-relaxed text-violet-600/80 dark:text-violet-300/70">
          Our AI will generate the perfect recipe based on your selections. ✨
        </p>
      </motion.div>
    </aside>
  );
}
