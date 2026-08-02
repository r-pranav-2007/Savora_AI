"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  CalendarDays,
  Clock,
  Flame,
  Globe,
  Heart,
  NotebookPen,
  ShieldCheck,
  Sprout,
  Users,
} from "lucide-react";
import { IngredientPicker } from "@/components/tag/ingredient-picker";
import { PillSelect } from "@/components/tag/pill-select";
import { SectionHeader } from "@/components/tag/section-header";
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
  { id: "ingredients-section", label: "Ingredients & Tags", subtitle: "Add what you have" },
  { id: "preferences-section", label: "Preferences", subtitle: "Tell us your style" },
  { id: "review-section", label: "Review & Generate", subtitle: "Get your recipe" },
];

// The sidebar behind "review-section" is `sticky`, so it's pinned in view
// almost as soon as the page loads — observing it directly would make step 3
// look "active" immediately. Instead we track a plain (non-sticky) sentinel
// placed just above the Generate button, which only enters view once the
// user has actually scrolled past ingredients and preferences.
const REVIEW_TRIGGER_ID = "review-trigger";

const DECORATIONS = [
  { emoji: "🍅", className: "-left-3 top-2 text-3xl -rotate-6" },
  { emoji: "🍄", className: "-right-2 top-6 text-2xl rotate-6" },
  { emoji: "🌿", className: "bottom-1 left-1 text-2xl" },
  { emoji: "✨", className: "-top-3 right-8 text-lg text-violet-400" },
];

export default function TagModePage() {
  const { recipe, isGenerating, error, generate } = useRecipeGenerator();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

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
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = STEPS.findIndex((step) => step.id === entry.target.id);
          if (index !== -1) setActiveStep(index);
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    ["ingredients-section", "preferences-section"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    const reviewObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setActiveStep(2);
        }
      },
      { rootMargin: "0px 0px -5% 0px", threshold: 0 }
    );
    const reviewEl = document.getElementById(REVIEW_TRIGGER_ID);
    if (reviewEl) reviewObserver.observe(reviewEl);

    return () => {
      sectionObserver.disconnect();
      reviewObserver.disconnect();
    };
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

  const removeIngredient = (name: string) => setIngredients((prev) => prev.filter((i) => i !== name));

  const handleClearAll = () => {
    setIngredients([]);
    setCuisine(undefined);
    setMealType(undefined);
    setCookingTime(undefined);
    setSpiceLevel(undefined);
    setDietaryPreference([]);
    setDifficulty(undefined);
    setServings(DEFAULT_SERVINGS);
    setAdditionalPreferences("");
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
        <section className="mx-auto max-w-5xl px-4 pb-8 pt-10 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-10">
            <div className="relative hidden h-36 w-36 shrink-0 lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center text-7xl"
              >
                🥗
              </motion.div>
              {DECORATIONS.map((d, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2.8 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }}
                  className={`absolute select-none ${d.className}`}
                >
                  {d.emoji}
                </motion.span>
              ))}
            </div>

            <div className="text-center lg:flex-1 lg:text-left">
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
                className="mx-auto mt-4 max-w-md text-base leading-relaxed text-neutral-500 sm:text-lg lg:mx-0 lg:max-w-xl lg:text-center dark:text-neutral-400"
              >
                Choose your ingredients and preferences — our AI will create something amazing, made just for
                you.
              </motion.p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <StepperNav steps={STEPS} activeIndex={activeStep} onStepClick={handleStepClick} />
        </div>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="min-w-0 rounded-3xl border border-black/5 bg-white p-6 shadow-[var(--shadow-card)] dark:border-white/10 dark:bg-white/[0.04] sm:p-8"
            >
              <div id="ingredients-section" className="scroll-mt-28">
                <SectionHeader
                  number={1}
                  icon={Sprout}
                  tone="violet"
                  title="Ingredients"
                  subtitle="Add the ingredients you have or love"
                />
                <div className="mt-5">
                  <IngredientPicker selected={ingredients} onChange={setIngredients} />
                </div>
              </div>

              <div id="preferences-section" className="scroll-mt-28">
                <div className="mt-10 border-t border-black/5 pt-10 dark:border-white/10">
                  <SectionHeader
                    number={2}
                    icon={Globe}
                    tone="violet"
                    title="Cuisine"
                    subtitle="Pick a cuisine you're craving"
                  />
                  <div className="mt-5">
                    <PillSelect
                      options={CUISINE_OPTIONS}
                      selected={cuisine ? [cuisine] : []}
                      onToggle={(v) => toggleSingle(cuisine, v as Cuisine, setCuisine)}
                      initialCount={6}
                    />
                  </div>
                </div>

                <div className="mt-8 border-t border-black/5 pt-8 dark:border-white/10">
                  <SectionHeader
                    number={3}
                    icon={CalendarDays}
                    tone="amber"
                    title="Meal Type"
                    subtitle="What are you planning to cook?"
                  />
                  <div className="mt-5">
                    <PillSelect
                      options={MEAL_TYPE_OPTIONS}
                      selected={mealType ? [mealType] : []}
                      onToggle={(v) => toggleSingle(mealType, v as MealType, setMealType)}
                    />
                  </div>
                </div>

                <div className="mt-8 border-t border-black/5 pt-8 dark:border-white/10">
                  <SectionHeader
                    number={4}
                    icon={Heart}
                    tone="green"
                    title="Dietary Preference"
                    subtitle="Tell us your dietary needs"
                  />
                  <div className="mt-5">
                    <PillSelect
                      options={DIETARY_PREFERENCE_OPTIONS}
                      selected={dietaryPreference}
                      onToggle={(v) => toggleMulti(dietaryPreference, v, setDietaryPreference)}
                    />
                  </div>
                </div>

                <div className="mt-8 border-t border-black/5 pt-8 dark:border-white/10">
                  <SectionHeader
                    number={5}
                    icon={Clock}
                    tone="blue"
                    title="Cooking Time"
                    subtitle="How much time do you have?"
                  />
                  <div className="mt-5">
                    <PillSelect
                      options={COOKING_TIME_OPTIONS}
                      selected={cookingTime ? [cookingTime] : []}
                      onToggle={(v) => toggleSingle(cookingTime, v as CookingTimeOption, setCookingTime)}
                    />
                  </div>
                </div>

                <div className="mt-8 border-t border-black/5 pt-8 dark:border-white/10">
                  <SectionHeader
                    number={6}
                    icon={Flame}
                    tone="rose"
                    title="Spice Level"
                    subtitle="How spicy do you like it?"
                  />
                  <div className="mt-5">
                    <PillSelect
                      options={SPICE_LEVEL_OPTIONS}
                      selected={spiceLevel ? [spiceLevel] : []}
                      onToggle={(v) => toggleSingle(spiceLevel, v as SpiceLevel, setSpiceLevel)}
                    />
                  </div>
                </div>

                <div className="mt-8 border-t border-black/5 pt-8 dark:border-white/10">
                  <SectionHeader
                    number={7}
                    icon={BarChart3}
                    tone="amber"
                    title="Difficulty"
                    subtitle="Pick your comfort level"
                  />
                  <div className="mt-5">
                    <PillSelect
                      options={DIFFICULTY_OPTIONS}
                      selected={difficulty ? [difficulty] : []}
                      onToggle={(v) => toggleSingle(difficulty, v as DifficultyOption, setDifficulty)}
                    />
                  </div>
                </div>

                <div className="mt-8 border-t border-black/5 pt-8 dark:border-white/10">
                  <SectionHeader number={8} icon={Users} tone="violet" title="Servings" subtitle="How many servings?" />
                  <div className="mt-5">
                    <Stepper value={servings} min={MIN_SERVINGS} max={MAX_SERVINGS} onChange={setServings} />
                  </div>
                </div>

                <div className="mt-8 border-t border-black/5 pt-8 dark:border-white/10">
                  <SectionHeader
                    number={9}
                    icon={NotebookPen}
                    tone="violet"
                    title="Additional Preferences"
                    subtitle="Any extra instructions for the AI? (optional)"
                  />
                  <div className="mt-5">
                    <PreferenceCard value={additionalPreferences} onChange={setAdditionalPreferences} />
                  </div>
                </div>
              </div>

              <div id={REVIEW_TRIGGER_ID} className="h-px" aria-hidden="true" />
            </motion.div>

            <div id="review-section" className="scroll-mt-28 lg:sticky lg:top-24">
              <RecipeSummarySidebar
                ingredients={ingredients}
                onRemoveIngredient={removeIngredient}
                onAddIngredientsClick={() => handleStepClick("ingredients-section")}
                onClearAll={handleClearAll}
                cuisine={cuisine}
                mealType={mealType}
                cookingTime={cookingTime}
                spiceLevel={spiceLevel}
                dietaryPreference={dietaryPreference}
                difficulty={difficulty}
                servings={servings}
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
                error={error}
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
