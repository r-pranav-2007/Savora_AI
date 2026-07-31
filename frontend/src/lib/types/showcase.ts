import type { Difficulty, NutritionInfo } from "./recipe";

// Mirrors backend/src/mock-data/showcase.ts's ShowcaseRecipe shape — the
// static, curated demo content served by GET /api/recipes/featured and
// GET /api/recipes/trending.
export interface ShowcaseRecipe {
  id: string;
  name: string;
  description: string;
  cookingTimeMinutes: number;
  servings: number;
  difficulty: Difficulty;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  highlightTag: string;
  dietaryTags: string[];
  nutrition: NutritionInfo;
}
