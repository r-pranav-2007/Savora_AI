"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  Bookmark,
  ChefHat,
  Clock,
  ListPlus,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { DishImage } from "./dish-image";
import { NutritionPanel } from "./nutrition-panel";
import type { Recipe, ShowcaseRecipe } from "@/lib/types";

interface FeaturedRecipeProps {
  recipe: Recipe | null;
  showcase: ShowcaseRecipe | null;
  isGenerating: boolean;
  isLoadingShowcase: boolean;
  error: string | null;
  onViewFullRecipe: () => void;
  onRetry: () => void;
}

export function FeaturedRecipe({
  recipe,
  showcase: showcaseRecipe,
  isGenerating,
  isLoadingShowcase,
  error,
  onViewFullRecipe,
  onRetry,
}: FeaturedRecipeProps) {
  const [saved, setSaved] = useState(false);
  const [listed, setListed] = useState(false);

  if (isGenerating || (!recipe && isLoadingShowcase)) return <FeaturedSkeleton />;

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-red-100 bg-red-50 px-6 py-12 text-center dark:border-red-500/20 dark:bg-red-500/10">
          <AlertTriangle className="text-red-500" size={28} />
          <p className="max-w-md text-sm font-medium text-red-700 dark:text-red-300">{error}</p>
          <Button variant="outline" size="sm" onClick={onRetry}>
            Try again
          </Button>
        </div>
      </div>
    );
  }

  if (!recipe && !showcaseRecipe) return null;

  const showcase = !recipe;
  const data = recipe
    ? {
        name: recipe.name,
        description: recipe.description,
        cookingTimeMinutes: recipe.cookingTimeMinutes,
        servings: recipe.servings,
        difficulty: recipe.difficulty,
        highlightTag: recipe.dietaryTags[0] ?? recipe.cuisine ?? "Personalized",
        imageUrl: recipe.imageUrl,
        imageStatus: recipe.imageStatus,
        nutrition: recipe.nutrition,
      }
    : {
        name: showcaseRecipe!.name,
        description: showcaseRecipe!.description,
        cookingTimeMinutes: showcaseRecipe!.cookingTimeMinutes,
        servings: showcaseRecipe!.servings,
        difficulty: showcaseRecipe!.difficulty,
        highlightTag: showcaseRecipe!.highlightTag,
        imageUrl: showcaseRecipe!.imageUrl,
        imageStatus: "ready" as const,
        nutrition: showcaseRecipe!.nutrition,
      };

  return (
    <section id="featured" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="grid grid-cols-1 gap-6 rounded-3xl border border-black/5 bg-white p-4 shadow-[var(--shadow-card)] sm:p-6 lg:grid-cols-[1.1fr_1.3fr_0.8fr] dark:border-white/10 dark:bg-white/[0.04]"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100 lg:aspect-auto lg:min-h-[280px] dark:bg-white/5">
          <DishImage
            src={data.imageUrl}
            status={data.imageStatus}
            alt={data.name}
            className="h-full w-full object-cover"
          />
          <span className="absolute left-3 top-3">
            <Badge tone="white">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              {showcase ? "Featured" : "Just Generated"}
            </Badge>
          </span>
          <span className="absolute bottom-3 left-3">
            <Badge tone="white">
              <Clock size={12} />
              {data.cookingTimeMinutes} mins
            </Badge>
          </span>
        </div>

        <div className="flex flex-col justify-center py-1">
          <Badge tone="violet" className="mb-3 w-fit">
            {showcase ? <Star size={12} /> : <Sparkles size={12} />}
            {data.highlightTag}
          </Badge>

          <h3 className="mb-2 text-2xl font-extrabold leading-tight text-neutral-900 sm:text-3xl dark:text-white">
            {data.name}
          </h3>

          {showcase && showcaseRecipe ? (
            <div className="mb-3 flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
              <StarRating rating={showcaseRecipe.rating} />
              <span className="font-semibold text-neutral-700 dark:text-neutral-200">
                {showcaseRecipe.rating}
              </span>
              <span>({showcaseRecipe.reviewCount} reviews)</span>
            </div>
          ) : (
            <div className="mb-3 flex items-center gap-1.5 text-sm font-medium text-violet-600 dark:text-violet-400">
              <Sparkles size={14} />
              Generated just for you
            </div>
          )}

          <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-neutral-500 dark:text-neutral-400">
            <span className="flex items-center gap-1.5">
              <Clock size={15} /> {data.cookingTimeMinutes} mins
            </span>
            <span className="flex items-center gap-1.5">
              <Users size={15} /> {data.servings} Servings
            </span>
            <span className="flex items-center gap-1.5">
              <ChefHat size={15} /> {data.difficulty}
            </span>
          </div>

          <p className="mb-5 max-w-md text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            {data.description}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={onViewFullRecipe}>
              View Full Recipe
              <ArrowRight size={15} />
            </Button>
            <Button variant="outline" onClick={() => setSaved((v) => !v)}>
              <Bookmark size={15} className={saved ? "fill-violet-600 text-violet-600" : ""} />
              {saved ? "Saved" : "Save Recipe"}
            </Button>
            <Button variant="outline" onClick={() => setListed((v) => !v)}>
              <ListPlus size={15} className={listed ? "text-violet-600" : ""} />
              {listed ? "Added" : "Add to List"}
            </Button>
          </div>
        </div>

        <NutritionPanel nutrition={data.nutrition} />
      </motion.div>
    </section>
  );
}

function FeaturedSkeleton() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="grid animate-pulse grid-cols-1 gap-6 rounded-3xl border border-black/5 bg-white p-4 shadow-[var(--shadow-card)] sm:p-6 lg:grid-cols-[1.1fr_1.3fr_0.8fr] dark:border-white/10 dark:bg-white/[0.04]">
        <div className="aspect-[4/3] rounded-2xl bg-neutral-100 lg:aspect-auto lg:min-h-[280px] dark:bg-white/5" />
        <div className="flex flex-col justify-center gap-3 py-1">
          <div className="h-5 w-28 rounded-full bg-neutral-100 dark:bg-white/5" />
          <div className="h-8 w-3/4 rounded-lg bg-neutral-100 dark:bg-white/5" />
          <div className="h-4 w-1/2 rounded-lg bg-neutral-100 dark:bg-white/5" />
          <div className="h-16 w-full rounded-lg bg-neutral-100 dark:bg-white/5" />
          <div className="flex gap-3">
            <div className="h-10 w-36 rounded-full bg-neutral-100 dark:bg-white/5" />
            <div className="h-10 w-28 rounded-full bg-neutral-100 dark:bg-white/5" />
          </div>
        </div>
        <div className="rounded-2xl bg-neutral-50 p-5 dark:bg-white/[0.04]">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="mb-4 flex items-center gap-3 last:mb-0">
              <div className="h-9 w-9 rounded-xl bg-neutral-100 dark:bg-white/5" />
              <div className="flex-1">
                <div className="mb-1 h-4 w-12 rounded bg-neutral-100 dark:bg-white/5" />
                <div className="h-3 w-16 rounded bg-neutral-100 dark:bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
