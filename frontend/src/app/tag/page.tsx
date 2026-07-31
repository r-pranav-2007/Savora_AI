"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  CalendarDays,
  Clock,
  Flame,
  Globe,
  Heart,
  NotebookPen,
  ShieldCheck,
  Sparkles,
  Sprout,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconBadge } from "@/components/ui/icon-badge";
import { FilterDropdown } from "@/components/tag/filter-dropdown";
import { IngredientPicker } from "@/components/tag/ingredient-picker";
import { Stepper } from "@/components/tag/stepper";
import { PreferenceCard } from "@/components/tag/preference-card";
import { StepperNav, type StepDefinition } from "@/components/tag/stepper-nav";
import { RecipeSummarySidebar } from "@/components/tag/recipe-summary-sidebar";
import { RecipeModal } from "@/components/home/recipe-modal";
import { useRecipeGenerator } from "@/hooks/use-recipe-generator";
import {
  CUISINE_OPTIONS,
  MEAL_TYPE_OPTIONS,
  COOKING_TIME_OPTIONS,
  SPICE_LEVEL_OPTIONS,
  DIETARY_PREFERENCE_OPTIONS,
  DIFFICULTY_OPTIONS,
  MIN_SERVINGS,
  MAX_SERVINGS,
  DEFAULT_SERVINGS,
  type Cuisine,
  type MealType,
  type CookingTimeOption,
  type SpiceLevel,
  type DifficultyOption,
  type DietaryPreference,
} from "@/lib/types";

const STEPS: StepDefinition[] = [
  { id: "ingredients-section", label: "Ingredients" },
  { id: "preferences-section", label: "Preferences" },
  { id: "review-section", label: "Review & Generate" },
];

export default function TagModePage() {
  const { recipe, isGenerating, error, generate } = useRecipeGenerator();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [ingredients, setIngredients] = useState<string[]>([]);
  const [cuisine, setCuisine] = useState<Cuisine>();
  const [mealType, setMealType] = useState<MealType>();
  const [cookingTime, setCookingTime] = useState<CookingTimeOption>();
  const [spiceLevel, setSpiceLevel] = useState<SpiceLevel>();
  const [dietaryPreference, setDietaryPreference] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<DifficultyOption>();
  const [servings, setServings] = useState(DEFAULT_SERVINGS);
  const [additionalPreferences, setAdditionalPreferences] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = STEPS.findIndex((step) => step.id === entry.target.id);
            if (index !== -1) setActiveStep(index);
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    STEPS.forEach((step) => {
      const el = document.getElementById(step.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleStepClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleSingle = <T extends string>(current: T | undefined, value: T, setter: (v: T | undefined) => void) => {
    setter(current === value ? undefined : value);
  };

  const toggleMulti = (list: string[], value: string, setter: (next: string[]) => void) => {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const handleGenerate = async () => {
    const result = await generate({
      mode: "tag",
      tags: {
        ingredients,
        cuisine,
        mealType,
        cookingTime,
        spiceLevel,
        dietaryPreference: dietaryPreference as DietaryPreference[],
        difficulty,
        servings,
        additionalPreferences: additionalPreferences.trim() || undefined,
      },
    });
    if (result) setModalOpen(true);
  };

  return (
    <div className="relative flex flex-1 flex-col overflow-x-hidden bg-(--background)">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 right-[-10%] h-[26rem] w-[26rem] rounded-full bg-violet-300/25 blur-3xl dark:bg-violet-600/10" />
        <div className="absolute top-[38rem] -left-32 h-[24rem] w-[24rem] rounded-full bg-amber-200/25 blur-3xl dark:bg-amber-500/10" />
        <div className="absolute bottom-0 right-[8%] h-80 w-80 rounded-full bg-rose-200/20 blur-3xl dark:bg-rose-500/10" />
      </div>
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-400 transition-colors hover:text-violet-600 dark:text-neutral-500 dark:hover:text-violet-400"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>
        </div>

        <section className="mx-auto max-w-3xl px-4 pt-6 pb-8 text-center sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold leading-[1.1] tracking-tight text-neutral-900 sm:text-5xl dark:text-white"
          >
            Build your <span className="gradient-text">perfect</span> recipe.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mx-auto mt-4 max-w-md text-base leading-relaxed text-neutral-500 sm:text-lg dark:text-neutral-400"
          >
            Choose your ingredients and preferences. Our AI will create something made just for you.
          </motion.p>
        </section>

        <div className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
          <StepperNav steps={STEPS} activeIndex={activeStep} onStepClick={handleStepClick} />
        </div>

        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div className="flex min-w-0 flex-col gap-6">
              <motion.div
                id="ingredients-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.5 }}
                className="scroll-mt-28 overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[var(--shadow-card)] transition-shadow hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04]"
              >
                <div className="flex items-center gap-3 bg-gradient-to-r from-violet-50 to-transparent px-6 py-5 sm:px-8 dark:from-violet-500/10">
                  <IconBadge icon={Sprout} tone="violet" size="md" />
                  <div>
                    <h2 className="text-base font-bold text-neutral-900 dark:text-white">
                      Add your ingredients
                    </h2>
                    <p className="text-xs text-neutral-400 dark:text-neutral-500">
                      Search or add the ingredients you have
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-5 sm:px-8 sm:pb-8">
                  <IngredientPicker selected={ingredients} onChange={setIngredients} />
                </div>
              </motion.div>

              <motion.div
                id="preferences-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="scroll-mt-28 overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[var(--shadow-card)] transition-shadow hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04]"
              >
                <div className="flex items-center gap-3 bg-gradient-to-r from-violet-50 to-transparent px-6 py-5 sm:px-8 dark:from-violet-500/10">
                  <IconBadge icon={NotebookPen} tone="violet" size="md" />
                  <h2 className="text-base font-bold text-neutral-900 dark:text-white">
                    Set your preferences
                  </h2>
                </div>
                <div className="p-6 pt-5 sm:px-8 sm:pb-8">

                <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <FilterDropdown
                    icon={Globe}
                    tone="violet"
                    label="Cuisine"
                    placeholder="Select cuisine"
                    options={CUISINE_OPTIONS}
                    selected={cuisine ? [cuisine] : []}
                    onToggle={(v) => toggleSingle(cuisine, v as Cuisine, setCuisine)}
                    isOpen={openDropdown === "cuisine"}
                    onOpenChange={(open) => setOpenDropdown(open ? "cuisine" : null)}
                  />
                  <FilterDropdown
                    icon={CalendarDays}
                    tone="amber"
                    label="Meal Type"
                    placeholder="Select meal"
                    options={MEAL_TYPE_OPTIONS}
                    selected={mealType ? [mealType] : []}
                    onToggle={(v) => toggleSingle(mealType, v as MealType, setMealType)}
                    isOpen={openDropdown === "mealType"}
                    onOpenChange={(open) => setOpenDropdown(open ? "mealType" : null)}
                  />
                  <FilterDropdown
                    icon={Clock}
                    tone="blue"
                    label="Cooking Time"
                    placeholder="Select time"
                    options={COOKING_TIME_OPTIONS}
                    selected={cookingTime ? [cookingTime] : []}
                    onToggle={(v) => toggleSingle(cookingTime, v as CookingTimeOption, setCookingTime)}
                    isOpen={openDropdown === "cookingTime"}
                    onOpenChange={(open) => setOpenDropdown(open ? "cookingTime" : null)}
                  />
                  <FilterDropdown
                    icon={Flame}
                    tone="rose"
                    label="Spice Level"
                    placeholder="How spicy?"
                    options={SPICE_LEVEL_OPTIONS}
                    selected={spiceLevel ? [spiceLevel] : []}
                    onToggle={(v) => toggleSingle(spiceLevel, v as SpiceLevel, setSpiceLevel)}
                    isOpen={openDropdown === "spiceLevel"}
                    onOpenChange={(open) => setOpenDropdown(open ? "spiceLevel" : null)}
                  />
                  <FilterDropdown
                    icon={Heart}
                    tone="green"
                    label="Dietary Preference"
                    placeholder="Select preference"
                    options={DIETARY_PREFERENCE_OPTIONS}
                    selected={dietaryPreference}
                    onToggle={(v) => toggleMulti(dietaryPreference, v, setDietaryPreference)}
                    multi
                    isOpen={openDropdown === "dietaryPreference"}
                    onOpenChange={(open) => setOpenDropdown(open ? "dietaryPreference" : null)}
                  />
                  <FilterDropdown
                    icon={BarChart3}
                    tone="amber"
                    label="Difficulty"
                    placeholder="Select difficulty"
                    options={DIFFICULTY_OPTIONS}
                    selected={difficulty ? [difficulty] : []}
                    onToggle={(v) => toggleSingle(difficulty, v as DifficultyOption, setDifficulty)}
                    isOpen={openDropdown === "difficulty"}
                    onOpenChange={(open) => setOpenDropdown(open ? "difficulty" : null)}
                  />
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-4 rounded-2xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/5">
                  <IconBadge icon={Users} tone="violet" size="sm" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-neutral-900 dark:text-white">Servings</p>
                    <p className="text-xs text-neutral-400 dark:text-neutral-500">How many servings?</p>
                  </div>
                  <Stepper value={servings} min={MIN_SERVINGS} max={MAX_SERVINGS} onChange={setServings} />
                </div>

                <div className="mt-4 rounded-2xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/5">
                  <div className="mb-3 flex items-center gap-3">
                    <IconBadge icon={NotebookPen} tone="violet" size="sm" />
                    <div>
                      <p className="text-sm font-bold text-neutral-900 dark:text-white">
                        Additional Preferences{" "}
                        <span className="font-normal text-neutral-400">(Optional)</span>
                      </p>
                      <p className="text-xs text-neutral-400 dark:text-neutral-500">
                        Any extra instructions for the AI?
                      </p>
                    </div>
                  </div>
                  <PreferenceCard value={additionalPreferences} onChange={setAdditionalPreferences} />
                </div>
              </div>
              </motion.div>

              {error && (
                <div className="flex items-center justify-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:bg-red-500/10 dark:text-red-300">
                  <AlertTriangle size={16} />
                  {error}
                </div>
              )}

              <Button size="lg" onClick={handleGenerate} disabled={isGenerating} className="w-full">
                <Sparkles size={17} />
                {isGenerating ? "Generating..." : "Generate Recipe"}
              </Button>
            </div>

            <div id="review-section" className="scroll-mt-28 lg:sticky lg:top-24">
              <RecipeSummarySidebar
                ingredients={ingredients}
                cuisine={cuisine}
                mealType={mealType}
                cookingTime={cookingTime}
                spiceLevel={spiceLevel}
                dietaryPreference={dietaryPreference}
                difficulty={difficulty}
                servings={servings}
                additionalPreferences={additionalPreferences}
              />
            </div>
          </div>

          <p className="mt-10 flex items-center justify-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500">
            <ShieldCheck size={13} />
            Your data is private and secure
          </p>
        </section>
      </main>

      <RecipeModal recipe={recipe} open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
