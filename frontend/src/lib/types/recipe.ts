// This is the canonical shape returned by the recipe generation service.
// It intentionally matches the structured JSON we'll eventually request from
// the OpenAI API, so swapping the mock service for a real one requires no
// changes on the consuming side.

export type Difficulty = "Easy" | "Medium" | "Hard";

export type ImageStatus = "idle" | "loading" | "ready" | "error";

export interface RecipeIngredient {
  name: string;
  quantity: string;
  unit?: string;
  notes?: string;
}

export interface RecipeInstructionStep {
  stepNumber: number;
  instruction: string;
  durationMinutes?: number;
}

export interface NutritionInfo {
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  cookingTimeMinutes: number;
  servings: number;
  difficulty: Difficulty;
  cuisine?: string;
  mealType?: string;
  dietaryTags: string[];
  ingredients: RecipeIngredient[];
  instructions: RecipeInstructionStep[];
  nutrition: NutritionInfo;
  tips: string[];

  // Image fields are populated by a separate, async call after the recipe
  // itself is returned — they never block the initial recipe response.
  imageUrl?: string;
  imageStatus: ImageStatus;
}
