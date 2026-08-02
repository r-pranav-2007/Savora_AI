"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Plus, RotateCcw, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getIngredientEmoji } from "@/lib/ingredient-catalog";

type Tone = "violet" | "green" | "rose" | "amber" | "blue";

const TONE_TEXT_CLASS: Record<Tone, string> = {
  violet: "text-violet-600 dark:text-violet-400",
  green: "text-emerald-600 dark:text-emerald-400",
  rose: "text-rose-600 dark:text-rose-400",
  amber: "text-amber-600 dark:text-amber-400",
  blue: "text-blue-600 dark:text-blue-400",
};

interface RecipeSummarySidebarProps {
  ingredients: string[];
  onRemoveIngredient: (name: string) => void;
  onAddIngredientsClick: () => void;
  onClearAll: () => void;
  cuisine?: string;
  mealType?: string;
  cookingTime?: string;
  spiceLevel?: string;
  dietaryPreference: string[];
  difficulty?: string;
  servings: number;
  onGenerate: () => void;
  isGenerating: boolean;
  error: string | null;
}

function SummaryLine({ label, value, tone }: { label: string; value?: string; tone: Tone }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5 text-sm">
      <span className="text-neutral-500 dark:text-neutral-400">{label}</span>
      <span
        className={`truncate text-right ${
          value ? `font-semibold ${TONE_TEXT_CLASS[tone]}` : "italic text-neutral-400 dark:text-neutral-600"
        }`}
      >
        {value || "Not set"}
      </span>
    </div>
  );
}

export function RecipeSummarySidebar({
  ingredients,
  onRemoveIngredient,
  onAddIngredientsClick,
  onClearAll,
  cuisine,
  mealType,
  cookingTime,
  spiceLevel,
  dietaryPreference,
  difficulty,
  servings,
  onGenerate,
  isGenerating,
  error,
}: RecipeSummarySidebarProps) {
  return (
    <aside className="flex flex-col gap-5">
      <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-[var(--shadow-card)] dark:border-white/10 dark:bg-white/[0.04]">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-violet-500" />
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">Your Recipe Summary</h3>
              <p className="text-xs text-neutral-400 dark:text-neutral-500">Here&rsquo;s what we&rsquo;ve got so far</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClearAll}
            className="flex shrink-0 items-center gap-1 text-xs font-semibold text-neutral-400 transition-colors hover:text-violet-600 dark:text-neutral-500 dark:hover:text-violet-400"
          >
            <RotateCcw size={12} />
            Clear all
          </button>
        </div>

        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-bold text-neutral-900 dark:text-white">Selected Ingredients</span>
          <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-semibold text-neutral-500 dark:bg-white/10 dark:text-neutral-400">
            {ingredients.length}
          </span>
        </div>

        {ingredients.length > 0 ? (
          <div className="mb-2 flex flex-col gap-1.5">
            {ingredients.map((name) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between gap-2 rounded-xl bg-violet-50 px-3 py-2 dark:bg-violet-500/10"
              >
                <span className="min-w-0 truncate text-sm font-medium text-violet-700 dark:text-violet-300">
                  {getIngredientEmoji(name)} {name}
                </span>
                <button
                  type="button"
                  onClick={() => onRemoveIngredient(name)}
                  aria-label={`Remove ${name}`}
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-violet-400 transition-colors hover:bg-violet-200 hover:text-violet-700 dark:hover:bg-violet-500/20"
                >
                  <X size={12} />
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="mb-2 rounded-xl border border-dashed border-black/10 px-3 py-2.5 text-xs text-neutral-400 dark:border-white/10 dark:text-neutral-500">
            Nothing selected yet — search or tap an ingredient to get started.
          </p>
        )}

        <button
          type="button"
          onClick={onAddIngredientsClick}
          className="mb-1 flex items-center gap-1 text-sm font-semibold text-violet-600 transition-colors hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
        >
          <Plus size={14} />
          Add more ingredients
        </button>

        <div className="divide-y divide-black/5 border-t border-black/5 dark:divide-white/10 dark:border-white/10">
          <SummaryLine label="Cuisine" value={cuisine} tone="violet" />
          <SummaryLine label="Meal Type" value={mealType} tone="amber" />
          <SummaryLine
            label="Dietary Preference"
            value={dietaryPreference.length > 0 ? dietaryPreference.join(", ") : undefined}
            tone="green"
          />
          <SummaryLine label="Cooking Time" value={cookingTime} tone="blue" />
          <SummaryLine label="Spice Level" value={spiceLevel} tone="rose" />
          <SummaryLine label="Difficulty" value={difficulty} tone="amber" />
          <SummaryLine label="Servings" value={`${servings} servings`} tone="violet" />
        </div>

        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-xs font-medium text-red-700 dark:bg-red-500/10 dark:text-red-300">
            <AlertTriangle size={14} className="shrink-0" />
            {error}
          </div>
        )}

        <Button size="lg" onClick={onGenerate} disabled={isGenerating} className="mt-5 w-full">
          <Sparkles size={17} />
          {isGenerating ? "Generating..." : "Generate Recipe"}
        </Button>
        <p className="mt-2 text-center text-xs text-neutral-400 dark:text-neutral-500">
          Our AI will craft the perfect recipe for you!
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="rounded-2xl bg-violet-50 p-5 dark:bg-violet-500/10"
      >
        <p className="mb-1 flex items-center gap-1.5 text-sm font-bold text-violet-700 dark:text-violet-300">
          <Sparkles size={14} />
          AI Magic
        </p>
        <p className="text-xs leading-relaxed text-violet-600/80 dark:text-violet-300/70">
          The more details you add, the more personalized and accurate your recipe will be.
        </p>
      </motion.div>
    </aside>
  );
}
