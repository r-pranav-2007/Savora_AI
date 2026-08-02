"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChefHat, Clock, Copy, Globe, Heart, RefreshCw, Users } from "lucide-react";
import { DishImage } from "@/components/home/dish-image";
import { NutritionPanel } from "@/components/home/nutrition-panel";
import { Badge } from "@/components/ui/badge";
import { getIngredientEmoji } from "@/lib/ingredient-catalog";
import type { Recipe } from "@/lib/types";

function IngredientChecklist({ recipe }: { recipe: Recipe }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div>
      <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
        Ingredients
      </h4>
      <div className="flex flex-col gap-2">
        {recipe.ingredients.map((ing, index) => {
          const isChecked = checked.has(index);
          return (
            <button
              key={`${ing.name}-${index}`}
              type="button"
              onClick={() => toggle(index)}
              className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left text-sm transition-colors ${
                isChecked
                  ? "border-violet-200 bg-violet-50 dark:border-violet-400/30 dark:bg-violet-500/10"
                  : "border-black/5 bg-neutral-50 hover:border-violet-200 dark:border-white/10 dark:bg-white/[0.03]"
              }`}
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                  isChecked
                    ? "gradient-brand border-transparent text-white"
                    : "border-neutral-300 dark:border-white/20"
                }`}
              >
                {isChecked && <Check size={12} />}
              </span>
              <span className={isChecked ? "text-neutral-400 line-through dark:text-neutral-500" : "text-neutral-700 dark:text-neutral-300"}>
                <span className="font-semibold text-neutral-900 dark:text-white">
                  {ing.quantity}
                  {ing.unit ? ` ${ing.unit}` : ""}
                </span>{" "}
                {getIngredientEmoji(ing.name)} {ing.name}
                {ing.notes ? <span className="text-neutral-400"> — {ing.notes}</span> : null}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepsList({ recipe }: { recipe: Recipe }) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
        Cooking Steps
      </h4>
      <div className="flex flex-col gap-3">
        {recipe.instructions.map((step) => (
          <div
            key={step.stepNumber}
            className="flex gap-3 rounded-2xl border border-black/5 bg-neutral-50 p-4 dark:border-white/10 dark:bg-white/[0.03]"
          >
            <span className="gradient-brand flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
              {step.stepNumber}
            </span>
            <div className="flex-1">
              <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                {step.instruction}
              </p>
              {step.durationMinutes ? (
                <p className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-violet-500">
                  <Clock size={12} />
                  {step.durationMinutes} min
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatRecipeAsText(recipe: Recipe): string {
  const lines = [
    recipe.name,
    recipe.description,
    "",
    `Cooking time: ${recipe.cookingTimeMinutes} min | Servings: ${recipe.servings} | Difficulty: ${recipe.difficulty}`,
    "",
    "Ingredients:",
    ...recipe.ingredients.map((i) => `- ${i.quantity}${i.unit ? ` ${i.unit}` : ""} ${i.name}`),
    "",
    "Steps:",
    ...recipe.instructions.map((s) => `${s.stepNumber}. ${s.instruction}`),
  ];
  return lines.join("\n");
}

interface ChatRecipeCardProps {
  recipe: Recipe;
  isSaved: boolean;
  onToggleSave: () => void;
  onRegenerate: () => void;
  isRegenerating: boolean;
}

export function ChatRecipeCard({ recipe, isSaved, onToggleSave, onRegenerate, isRegenerating }: ChatRecipeCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatRecipeAsText(recipe));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard access can be denied by the browser — silently no-op.
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="mr-auto w-full overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[var(--shadow-card)] dark:border-white/10 dark:bg-white/[0.04]"
    >
      <div className="relative h-48 sm:h-56">
        <DishImage
          src={recipe.imageUrl}
          alt={recipe.name}
          status={recipe.imageStatus}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-5">
          <h3 className="text-xl font-extrabold text-white sm:text-2xl">{recipe.name}</h3>
        </div>
      </div>

      <div className="p-6">
        <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">{recipe.description}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-neutral-500 dark:text-neutral-400">
          <span className="flex items-center gap-1.5">
            <Clock size={15} />
            {recipe.cookingTimeMinutes} min
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={15} />
            {recipe.servings} servings
          </span>
          <span className="flex items-center gap-1.5">
            <ChefHat size={15} />
            {recipe.difficulty}
          </span>
          {recipe.cuisine ? (
            <span className="flex items-center gap-1.5">
              <Globe size={15} />
              {recipe.cuisine}
            </span>
          ) : null}
          <span className="flex items-center gap-1.5 font-semibold text-rose-500">
            {recipe.nutrition.calories} cal
          </span>
          <span className="flex items-center gap-1.5 font-semibold text-emerald-500">
            {recipe.nutrition.proteinGrams}g protein
          </span>
        </div>

        {recipe.dietaryTags.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {recipe.dietaryTags.map((tag) => (
              <Badge key={tag} tone="green">
                {tag}
              </Badge>
            ))}
          </div>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onToggleSave}
            className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              isSaved
                ? "border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-400/30 dark:bg-rose-500/10 dark:text-rose-300"
                : "border-black/10 bg-white text-neutral-600 hover:border-rose-200 hover:text-rose-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300"
            }`}
          >
            <Heart size={15} className={isSaved ? "fill-rose-500 text-rose-500" : ""} />
            {isSaved ? "Saved" : "Save"}
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-neutral-600 transition-colors hover:border-violet-200 hover:text-violet-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300"
          >
            {copied ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} />}
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            type="button"
            onClick={onRegenerate}
            disabled={isRegenerating}
            className="flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-neutral-600 transition-colors hover:border-violet-200 hover:text-violet-600 disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300"
          >
            <RefreshCw size={15} className={isRegenerating ? "animate-spin" : ""} />
            Regenerate
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-[1fr_1.3fr]">
          <IngredientChecklist recipe={recipe} />
          <StepsList recipe={recipe} />
        </div>

        <NutritionPanel nutrition={recipe.nutrition} layout="grid" className="mt-6" />
      </div>
    </motion.div>
  );
}
