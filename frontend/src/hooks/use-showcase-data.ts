"use client";

import { useEffect, useState } from "react";
import { getFeaturedShowcase, getTrendingShowcase } from "@/lib/api-client";
import type { ShowcaseRecipe } from "@/lib/types";

interface ShowcaseState {
  featured: ShowcaseRecipe | null;
  trending: ShowcaseRecipe[];
  isLoading: boolean;
  error: string | null;
}

// Loads the homepage's static demo content (default featured dish + trending
// rail) from the backend on mount, rather than bundling it as frontend data.
export function useShowcaseData() {
  const [state, setState] = useState<ShowcaseState>({
    featured: null,
    trending: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    Promise.all([getFeaturedShowcase(), getTrendingShowcase()])
      .then(([{ recipe }, { recipes }]) => {
        if (cancelled) return;
        setState({ featured: recipe, trending: recipes, isLoading: false, error: null });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setState({
          featured: null,
          trending: [],
          isLoading: false,
          error: err instanceof Error ? err.message : "Failed to load showcase content.",
        });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
