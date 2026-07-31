"use client";

import { useCallback, useRef, useState } from "react";
import { generateRecipe, generateRecipeImage } from "@/lib/api-client";
import type { GenerateRecipeRequest, Recipe } from "@/lib/types";

interface GeneratorState {
  recipe: Recipe | null;
  isGenerating: boolean;
  error: string | null;
}

// Drives the two-phase flow: the recipe is fetched and rendered first, then
// a second, independent request fetches the dish image and patches it onto
// the recipe once it resolves — it never blocks or delays the recipe itself.
export function useRecipeGenerator() {
  const [state, setState] = useState<GeneratorState>({
    recipe: null,
    isGenerating: false,
    error: null,
  });
  const requestIdRef = useRef(0);

  const fetchImage = useCallback(async (recipe: Recipe, requestId: number) => {
    try {
      const { imageUrl } = await generateRecipeImage(recipe);
      setState((prev) => {
        if (requestId !== requestIdRef.current || prev.recipe?.id !== recipe.id) return prev;
        return { ...prev, recipe: { ...prev.recipe, imageUrl, imageStatus: "ready" } };
      });
    } catch {
      setState((prev) => {
        if (requestId !== requestIdRef.current || prev.recipe?.id !== recipe.id) return prev;
        return { ...prev, recipe: { ...prev.recipe, imageStatus: "error" } };
      });
    }
  }, []);

  const generate = useCallback(
    async (request: GenerateRecipeRequest): Promise<Recipe | null> => {
      const requestId = ++requestIdRef.current;
      setState({ recipe: null, isGenerating: true, error: null });

      try {
        const { recipe: generated } = await generateRecipe(request);
        if (requestId !== requestIdRef.current) return null;

        const recipe: Recipe = { ...generated, imageStatus: "loading" };
        setState({ recipe, isGenerating: false, error: null });
        void fetchImage(recipe, requestId);
        return recipe;
      } catch (err) {
        if (requestId !== requestIdRef.current) return null;
        setState({
          recipe: null,
          isGenerating: false,
          error: err instanceof Error ? err.message : "Something went wrong. Please try again.",
        });
        return null;
      }
    },
    [fetchImage]
  );

  return { ...state, generate };
}
