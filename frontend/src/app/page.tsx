"use client";

import { useCallback, useRef, useState } from "react";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { FeaturedRecipe } from "@/components/home/featured-recipe";
import { TrendingRecipes } from "@/components/home/trending-recipes";
import { FeatureStrip } from "@/components/home/feature-strip";
import { RecipeModal } from "@/components/home/recipe-modal";
import { useRecipeGenerator } from "@/hooks/use-recipe-generator";
import { useShowcaseData } from "@/hooks/use-showcase-data";
import type { ShowcaseRecipe } from "@/lib/types";

export default function Home() {
  const { recipe, isGenerating, error, generate } = useRecipeGenerator();
  const { featured, trending, isLoading: isLoadingShowcase } = useShowcaseData();
  const [modalOpen, setModalOpen] = useState(false);
  const lastQueryRef = useRef<string | null>(null);
  const featuredRef = useRef<HTMLDivElement>(null);

  const runGenerate = useCallback(
    async (message: string, autoOpen: boolean) => {
      lastQueryRef.current = message;
      requestAnimationFrame(() => {
        featuredRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      const result = await generate({ mode: "chat", message });
      if (autoOpen && result) setModalOpen(true);
    },
    [generate]
  );

  const handleSearch = (message: string) => void runGenerate(message, false);

  const handleViewFullRecipe = () => {
    if (recipe) {
      setModalOpen(true);
    } else if (featured) {
      void runGenerate(featured.name, true);
    }
  };

  const handleTrendingSelect = (item: ShowcaseRecipe) => void runGenerate(item.name, true);

  const handleRetry = () => {
    if (lastQueryRef.current) void runGenerate(lastQueryRef.current, false);
  };

  return (
    <div className="relative flex flex-1 flex-col overflow-x-hidden bg-(--background)">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-violet-300/20 blur-3xl dark:bg-violet-600/10" />
        <div className="absolute top-[45rem] -left-32 h-[26rem] w-[26rem] rounded-full bg-amber-200/15 blur-3xl dark:bg-amber-500/10" />
        <div className="absolute bottom-0 right-[10%] h-80 w-80 rounded-full bg-rose-200/15 blur-3xl dark:bg-rose-500/10" />
      </div>
      <main className="flex-1">
        <Hero onGenerate={handleSearch} isGenerating={isGenerating} />
        <div ref={featuredRef} className="scroll-mt-24">
          <FeaturedRecipe
            recipe={recipe}
            showcase={featured}
            isGenerating={isGenerating}
            isLoadingShowcase={isLoadingShowcase}
            error={error}
            onViewFullRecipe={handleViewFullRecipe}
            onRetry={handleRetry}
          />
        </div>
        <TrendingRecipes items={trending} isLoading={isLoadingShowcase} onSelect={handleTrendingSelect} />
        <FeatureStrip />
      </main>
      <Footer />
      <RecipeModal
        recipe={recipe}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onRegenerate={handleRetry}
        isRegenerating={isGenerating}
      />
    </div>
  );
}
