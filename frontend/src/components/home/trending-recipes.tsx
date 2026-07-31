"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Clock, Heart, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { DishImage } from "./dish-image";
import type { ShowcaseRecipe } from "@/lib/types";

interface TrendingRecipesProps {
  items: ShowcaseRecipe[];
  isLoading: boolean;
  onSelect: (recipe: ShowcaseRecipe) => void;
}

export function TrendingRecipes({ items, isLoading, onSelect }: TrendingRecipesProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: direction * 320, behavior: "smooth" });
  };

  return (
    <section id="trending" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold text-neutral-900 sm:text-2xl dark:text-white">
          <Sparkles size={20} className="text-violet-500" />
          Trending Recipes
        </h2>
        <a
          href="#trending"
          className="group hidden items-center gap-1.5 text-sm font-semibold text-violet-600 sm:flex dark:text-violet-400"
        >
          View all recipes
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      <div className="relative">
        <div
          ref={scrollerRef}
          className="scrollbar-none flex gap-5 overflow-x-auto scroll-smooth pb-2"
        >
          {isLoading && items.length === 0
            ? Array.from({ length: 4 }).map((_, i) => <TrendingCardSkeleton key={i} />)
            : items.map((item, index) => (
                <TrendingCard key={item.id} item={item} index={index} onSelect={onSelect} />
              ))}
        </div>

        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Scroll left"
          className="absolute -left-3 top-1/3 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/5 bg-white text-neutral-600 shadow-md transition-transform hover:scale-105 sm:flex dark:border-white/10 dark:bg-[#1a1626] dark:text-neutral-300"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Scroll right"
          className="absolute -right-3 top-1/3 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/5 bg-white text-neutral-600 shadow-md transition-transform hover:scale-105 sm:flex dark:border-white/10 dark:bg-[#1a1626] dark:text-neutral-300"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}

function TrendingCard({
  item,
  index,
  onSelect,
}: {
  item: ShowcaseRecipe;
  index: number;
  onSelect: (item: ShowcaseRecipe) => void;
}) {
  const [favorited, setFavorited] = useState(false);
  const isVeg = item.dietaryTags.some((tag) => tag.toLowerCase().includes("veg") && !tag.toLowerCase().includes("non"));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: 0.06 * index }}
      whileHover={{ y: -6 }}
      className="w-64 shrink-0 cursor-pointer sm:w-72"
      onClick={() => onSelect(item)}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100 dark:bg-white/5">
        <DishImage src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setFavorited((v) => !v);
          }}
          aria-label="Toggle favorite"
          className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-600 shadow-sm backdrop-blur transition-transform hover:scale-110"
        >
          <Heart size={14} className={favorited ? "fill-rose-500 text-rose-500" : ""} />
        </button>
        <span className="absolute bottom-2.5 left-2.5">
          <Badge tone="white">
            <Clock size={11} />
            {item.cookingTimeMinutes} mins
          </Badge>
        </span>
      </div>

      <h3 className="mt-3 mb-1 truncate text-[15px] font-bold text-neutral-900 dark:text-white">
        {item.name}
      </h3>
      <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
        <span className="flex items-center gap-1 font-semibold text-neutral-700 dark:text-neutral-200">
          <StarRating rating={item.rating} size={11} />
          {item.rating}
        </span>
        <Badge tone={isVeg ? "green" : "rose"} className="px-2 py-0.5">
          {isVeg ? "Veg" : "Non-Veg"}
        </Badge>
        <Badge tone="neutral" className="px-2 py-0.5">
          {item.difficulty}
        </Badge>
      </div>
    </motion.div>
  );
}

function TrendingCardSkeleton() {
  return (
    <div className="w-64 shrink-0 animate-pulse sm:w-72">
      <div className="aspect-[4/3] rounded-2xl bg-neutral-100 dark:bg-white/5" />
      <div className="mt-3 h-4 w-3/4 rounded bg-neutral-100 dark:bg-white/5" />
      <div className="mt-2 h-3 w-1/2 rounded bg-neutral-100 dark:bg-white/5" />
    </div>
  );
}
