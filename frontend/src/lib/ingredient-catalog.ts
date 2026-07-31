import { COMMON_INGREDIENTS } from "@/lib/types";

// Presentation-only metadata (emoji + category) for the ingredient picker UI.
// The backend contract only ever sees the plain ingredient name strings from
// COMMON_INGREDIENTS — this file has no bearing on recipe generation itself.
export const INGREDIENT_CATEGORIES = ["Vegetables", "Protein", "Dairy", "Grains"] as const;
export type IngredientCategory = (typeof INGREDIENT_CATEGORIES)[number];

interface IngredientMeta {
  name: string;
  emoji: string;
  category: IngredientCategory;
}

const META: Record<string, { emoji: string; category: IngredientCategory }> = {
  Onion: { emoji: "🧅", category: "Vegetables" },
  Tomato: { emoji: "🍅", category: "Vegetables" },
  Potato: { emoji: "🥔", category: "Vegetables" },
  Paneer: { emoji: "🧀", category: "Dairy" },
  Chicken: { emoji: "🍗", category: "Protein" },
  Egg: { emoji: "🥚", category: "Protein" },
  Rice: { emoji: "🍚", category: "Grains" },
  Pasta: { emoji: "🍝", category: "Grains" },
  Cheese: { emoji: "🧀", category: "Dairy" },
  Butter: { emoji: "🧈", category: "Dairy" },
  Milk: { emoji: "🥛", category: "Dairy" },
  Mushroom: { emoji: "🍄", category: "Vegetables" },
  Spinach: { emoji: "🥬", category: "Vegetables" },
  Capsicum: { emoji: "🫑", category: "Vegetables" },
  Garlic: { emoji: "🧄", category: "Vegetables" },
  Ginger: { emoji: "🫚", category: "Vegetables" },
  Corn: { emoji: "🌽", category: "Vegetables" },
  Beans: { emoji: "🫘", category: "Vegetables" },
  Carrot: { emoji: "🥕", category: "Vegetables" },
  Broccoli: { emoji: "🥦", category: "Vegetables" },
  Lemon: { emoji: "🍋", category: "Vegetables" },
  Fish: { emoji: "🐟", category: "Protein" },
  Shrimp: { emoji: "🍤", category: "Protein" },
};

export const INGREDIENT_CATALOG: IngredientMeta[] = COMMON_INGREDIENTS.map((name) => ({
  name,
  emoji: META[name]?.emoji ?? "🍽️",
  category: META[name]?.category ?? "Vegetables",
}));

export function getIngredientEmoji(name: string): string {
  return META[name]?.emoji ?? "🌿";
}
