"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChefHat, Clock, Lightbulb, Users, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DishImage } from "./dish-image";
import { NutritionPanel } from "./nutrition-panel";
import type { Recipe } from "@/lib/types";

interface RecipeModalProps {
  recipe: Recipe | null;
  open: boolean;
  onClose: () => void;
}

export function RecipeModal({ recipe, open, onClose }: RecipeModalProps) {
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

  return (
    <AnimatePresence>
      {open && recipe && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-[#15121f]"
          >
            <div className="relative h-56 shrink-0 sm:h-64">
              <DishImage
                src={recipe.imageUrl}
                status={recipe.imageStatus}
                alt={recipe.name}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close recipe details"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-md backdrop-blur transition-transform hover:scale-105"
              >
                <X size={16} />
              </button>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5">
                <h2 className="text-xl font-extrabold text-white sm:text-2xl">{recipe.name}</h2>
              </div>
            </div>

            <div className="overflow-y-auto p-5 sm:p-7">
              <p className="mb-4 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {recipe.description}
              </p>

              <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-neutral-500 dark:text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <Clock size={15} /> {recipe.cookingTimeMinutes} mins
                </span>
                <span className="flex items-center gap-1.5">
                  <Users size={15} /> {recipe.servings} Servings
                </span>
                <span className="flex items-center gap-1.5">
                  <ChefHat size={15} /> {recipe.difficulty}
                </span>
                {recipe.dietaryTags.map((tag) => (
                  <Badge key={tag} tone="green">
                    {tag}
                  </Badge>
                ))}
              </div>

              <NutritionPanel nutrition={recipe.nutrition} layout="grid" className="mb-6" />

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-[1fr_1.3fr]">
                <div>
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
                    Ingredients
                  </h3>
                  <ul className="space-y-2.5">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li
                        key={index}
                        className="flex items-baseline gap-2 text-sm text-neutral-700 dark:text-neutral-300"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                        <span>
                          <span className="font-semibold text-neutral-900 dark:text-white">
                            {ingredient.quantity} {ingredient.unit ?? ""}
                          </span>{" "}
                          {ingredient.name}
                          {ingredient.notes && (
                            <span className="text-neutral-400"> — {ingredient.notes}</span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
                    Instructions
                  </h3>
                  <ol className="space-y-4">
                    {recipe.instructions.map((step) => (
                      <li key={step.stepNumber} className="flex gap-3 text-sm">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
                          {step.stepNumber}
                        </span>
                        <span className="pt-0.5 leading-relaxed text-neutral-700 dark:text-neutral-300">
                          {step.instruction}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {recipe.tips.length > 0 && (
                <div className="mt-7 rounded-2xl bg-amber-50 p-5 dark:bg-amber-500/10">
                  <h3 className="mb-2.5 flex items-center gap-1.5 text-sm font-bold text-amber-700 dark:text-amber-300">
                    <Lightbulb size={16} />
                    Cooking Tips
                  </h3>
                  <ul className="space-y-1.5">
                    {recipe.tips.map((tip, index) => (
                      <li
                        key={index}
                        className="text-sm leading-relaxed text-amber-800/90 dark:text-amber-200/80"
                      >
                        • {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
