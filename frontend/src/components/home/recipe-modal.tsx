"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  ChefHat,
  Clock,
  Copy,
  Globe,
  Heart,
  Lightbulb,
  RefreshCw,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DishImage } from "./dish-image";
import { NutritionPanel } from "./nutrition-panel";
import type { Recipe } from "@/lib/types";

interface RecipeModalProps {
  recipe: Recipe | null;
  open: boolean;
  onClose: () => void;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
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
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
        Ingredients
      </h3>
      <div className="flex flex-col gap-2">
        {recipe.ingredients.map((ingredient, index) => {
          const isChecked = checked.has(index);
          return (
            <button
              key={index}
              type="button"
              onClick={() => toggle(index)}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition-colors ${
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
                {isChecked && <Check size={12} strokeWidth={3} />}
              </span>
              <span className={isChecked ? "text-neutral-400 line-through dark:text-neutral-500" : "text-neutral-700 dark:text-neutral-300"}>
                <span className="font-semibold text-neutral-900 dark:text-white">
                  {ingredient.quantity} {ingredient.unit ?? ""}
                </span>{" "}
                {ingredient.name}
                {ingredient.notes && <span className="text-neutral-400"> — {ingredient.notes}</span>}
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
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
        Instructions
      </h3>
      <div className="flex flex-col gap-3">
        {recipe.instructions.map((step) => (
          <div
            key={step.stepNumber}
            className="flex gap-4 rounded-2xl border border-black/5 bg-neutral-50 p-4 dark:border-white/10 dark:bg-white/[0.03]"
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

export function RecipeModal({ recipe, open, onClose, onRegenerate, isRegenerating }: RecipeModalProps) {
  const [mounted, setMounted] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lastRecipeId, setLastRecipeId] = useState(recipe?.id);

  // Reset the Save/Copy button state whenever a different recipe is shown —
  // adjusting state directly during render (rather than in an effect) avoids
  // an extra "stale" paint of the previous recipe's saved/copied state.
  if (recipe?.id !== lastRecipeId) {
    setLastRecipeId(recipe?.id);
    setSaved(false);
    setCopied(false);
  }

  useEffect(() => {
    // Portals need a browser `document` — this flips true only after the
    // client mounts, avoiding an SSR/hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const handleCopy = async () => {
    if (!recipe) return;
    try {
      await navigator.clipboard.writeText(formatRecipeAsText(recipe));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard access can be denied by the browser — silently no-op.
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && recipe && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-[100] overflow-y-auto bg-(--background)"
        >
          <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-24 right-[-10%] h-[26rem] w-[26rem] rounded-full bg-violet-300/20 blur-3xl dark:bg-violet-600/10" />
            <div className="absolute bottom-0 left-[-10%] h-80 w-80 rounded-full bg-amber-200/15 blur-3xl dark:bg-amber-500/10" />
          </div>

          <div className="sticky top-0 z-10 border-b border-black/5 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-[#0d0b14]/80">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-1.5 text-sm font-semibold text-neutral-600 transition-colors hover:text-violet-600 dark:text-neutral-300 dark:hover:text-violet-400"
              >
                <ArrowLeft size={16} />
                Back
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSaved((v) => !v)}
                  className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors ${
                    saved
                      ? "border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-400/30 dark:bg-rose-500/10 dark:text-rose-300"
                      : "border-black/10 bg-white text-neutral-600 hover:border-rose-200 hover:text-rose-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300"
                  }`}
                >
                  <Heart size={15} className={saved ? "fill-rose-500 text-rose-500" : ""} />
                  <span className="hidden sm:inline">{saved ? "Saved" : "Save"}</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3.5 py-2 text-sm font-semibold text-neutral-600 transition-colors hover:border-violet-200 hover:text-violet-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300"
                >
                  {copied ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} />}
                  <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
                </button>
                {onRegenerate && (
                  <button
                    type="button"
                    onClick={onRegenerate}
                    disabled={isRegenerating}
                    className="flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3.5 py-2 text-sm font-semibold text-neutral-600 transition-colors hover:border-violet-200 hover:text-violet-600 disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300"
                  >
                    <RefreshCw size={15} className={isRegenerating ? "animate-spin" : ""} />
                    <span className="hidden sm:inline">Regenerate</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="relative h-64 w-full sm:h-80 lg:h-96">
            <DishImage
              src={recipe.imageUrl}
              status={recipe.imageStatus}
              alt={recipe.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0">
              <div className="mx-auto max-w-5xl px-4 pb-8 sm:px-6 lg:px-8">
                {recipe.dietaryTags.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {recipe.dietaryTags.map((tag) => (
                      <Badge key={tag} tone="green">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                <h1 className="text-3xl font-extrabold leading-[1.1] text-white sm:text-4xl lg:text-5xl">
                  {recipe.name}
                </h1>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
            <p className="max-w-3xl text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-300">
              {recipe.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-black/5 py-5 text-sm text-neutral-500 dark:border-white/10 dark:text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Clock size={16} /> {recipe.cookingTimeMinutes} min
              </span>
              <span className="flex items-center gap-1.5">
                <Users size={16} /> {recipe.servings} servings
              </span>
              <span className="flex items-center gap-1.5">
                <ChefHat size={16} /> {recipe.difficulty}
              </span>
              {recipe.cuisine && (
                <span className="flex items-center gap-1.5">
                  <Globe size={16} /> {recipe.cuisine}
                </span>
              )}
            </div>

            <NutritionPanel nutrition={recipe.nutrition} layout="grid" className="mt-8" />

            <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.3fr]">
              <IngredientChecklist recipe={recipe} />
              <StepsList recipe={recipe} />
            </div>

            {recipe.tips.length > 0 && (
              <div className="mt-10 rounded-2xl bg-amber-50 p-6 dark:bg-amber-500/10">
                <h3 className="mb-3 flex items-center gap-1.5 text-sm font-bold text-amber-700 dark:text-amber-300">
                  <Lightbulb size={16} />
                  Cooking Tips
                </h3>
                <ul className="space-y-1.5">
                  {recipe.tips.map((tip, index) => (
                    <li key={index} className="text-sm leading-relaxed text-amber-800/90 dark:text-amber-200/80">
                      • {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
