// Predefined tag catalog used by Tag Mode. Kept separate from the AI layer so
// the UI's available options don't depend on how recipes are generated.

export const CUISINE_OPTIONS = [
  "Indian",
  "South Indian",
  "North Indian",
  "Italian",
  "Chinese",
  "Mexican",
  "Thai",
  "Japanese",
  "Mediterranean",
  "American",
] as const;

export const MEAL_TYPE_OPTIONS = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snack",
  "Dessert",
] as const;

export const COOKING_TIME_OPTIONS = [
  "Under 15 mins",
  "15-30 mins",
  "30-45 mins",
  "45+ mins",
] as const;

export const SPICE_LEVEL_OPTIONS = ["Mild", "Medium", "Hot", "Extra Hot"] as const;

export const DIETARY_PREFERENCE_OPTIONS = [
  "Vegetarian",
  "Vegan",
  "High Protein",
  "Low Carb",
  "Keto",
  "Gluten Free",
  "Dairy Free",
  "Healthy",
] as const;

export const DIFFICULTY_OPTIONS = ["Easy", "Medium", "Hard"] as const;

// A curated quick-select list; users can still type/add custom ingredients.
export const COMMON_INGREDIENTS = [
  "Onion",
  "Tomato",
  "Potato",
  "Paneer",
  "Chicken",
  "Egg",
  "Rice",
  "Pasta",
  "Cheese",
  "Butter",
  "Milk",
  "Mushroom",
  "Spinach",
  "Capsicum",
  "Garlic",
  "Ginger",
  "Corn",
  "Beans",
  "Carrot",
  "Broccoli",
  "Lemon",
  "Fish",
  "Shrimp",
] as const;

export const MIN_SERVINGS = 1;
export const MAX_SERVINGS = 12;
export const DEFAULT_SERVINGS = 2;

export type Cuisine = (typeof CUISINE_OPTIONS)[number];
export type MealType = (typeof MEAL_TYPE_OPTIONS)[number];
export type CookingTimeOption = (typeof COOKING_TIME_OPTIONS)[number];
export type DietaryPreference = (typeof DIETARY_PREFERENCE_OPTIONS)[number];
export type SpiceLevel = (typeof SPICE_LEVEL_OPTIONS)[number];
export type DifficultyOption = (typeof DIFFICULTY_OPTIONS)[number];

export interface TagSelections {
  ingredients: string[];
  cuisine?: Cuisine;
  mealType?: MealType;
  cookingTime?: CookingTimeOption;
  dietaryPreference?: DietaryPreference[];
  spiceLevel?: SpiceLevel;
  difficulty?: DifficultyOption;
  servings?: number;
  additionalPreferences?: string;
}
