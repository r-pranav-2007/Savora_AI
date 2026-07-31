import type { Recipe } from "../../types";
import { randomDelay } from "../../utils/delay";
import type { ImageService, RecipeImageResult } from "./image-service.interface";

// TheMealDB's free tier (test key "1") is a live, public database of real
// dish photos we use as a realistic stand-in until a proper image generation
// API is wired in. No API key or account is required for this tier.
const MEALDB_BASE = "https://www.themealdb.com/api/json/v1/1";

const FALLBACK_IMAGE = "/images/placeholder-dish.svg";

const CUISINE_TO_AREA: Record<string, string> = {
  indian: "Indian",
  "north indian": "Indian",
  "south indian": "Indian",
  italian: "Italian",
  chinese: "Chinese",
  mexican: "Mexican",
  thai: "Thai",
  mediterranean: "Greek",
  continental: "British",
  japanese: "Japanese",
};

const MEAL_TYPE_TO_CATEGORY: Record<string, string> = {
  breakfast: "Breakfast",
  dessert: "Dessert",
  snack: "Starter",
};

interface MealDbMeal {
  strMeal?: string;
  strMealThumb?: string;
}

interface MealDbResponse {
  meals: MealDbMeal[] | null;
}

async function fetchJson(url: string, timeoutMs = 5000): Promise<MealDbResponse> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) {
      throw new Error(`MealDB request failed with status ${res.status}`);
    }
    return (await res.json()) as MealDbResponse;
  } finally {
    clearTimeout(timeout);
  }
}

function pickRandomThumb(response: MealDbResponse): string | undefined {
  const candidates = (response.meals ?? []).filter((meal) => Boolean(meal.strMealThumb));
  if (candidates.length === 0) return undefined;
  const choice = candidates[Math.floor(Math.random() * candidates.length)];
  return choice.strMealThumb;
}

function resolveCategory(recipe: Recipe): string | undefined {
  const tags = recipe.dietaryTags.map((tag) => tag.toLowerCase());
  if (tags.includes("vegan")) return "Vegan";
  if (tags.includes("vegetarian")) return "Vegetarian";
  if (recipe.mealType) {
    return MEAL_TYPE_TO_CATEGORY[recipe.mealType.toLowerCase()];
  }
  return undefined;
}

export class MockImageService implements ImageService {
  async getRecipeImage(recipe: Recipe): Promise<RecipeImageResult> {
    // Simulate the extra latency a real image generation call would add,
    // separately from (and after) the recipe response.
    await randomDelay(800, 2000);

    try {
      const area = recipe.cuisine ? CUISINE_TO_AREA[recipe.cuisine.toLowerCase()] : undefined;
      if (area) {
        const byArea = await fetchJson(`${MEALDB_BASE}/filter.php?a=${encodeURIComponent(area)}`);
        const thumb = pickRandomThumb(byArea);
        if (thumb) return { imageUrl: thumb };
      }

      const category = resolveCategory(recipe);
      if (category) {
        const byCategory = await fetchJson(`${MEALDB_BASE}/filter.php?c=${encodeURIComponent(category)}`);
        const thumb = pickRandomThumb(byCategory);
        if (thumb) return { imageUrl: thumb };
      }

      const random = await fetchJson(`${MEALDB_BASE}/random.php`);
      const thumb = pickRandomThumb(random);
      if (thumb) return { imageUrl: thumb };

      return { imageUrl: FALLBACK_IMAGE };
    } catch {
      return { imageUrl: FALLBACK_IMAGE };
    }
  }
}
