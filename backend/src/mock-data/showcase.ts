import type { Difficulty, NutritionInfo } from "../types";

// Static, curated demo content for the homepage's default "Featured" card and
// "Trending" rail. Unlike MOCK_RECIPES (which stands in for freshly
// AI-generated recipes), these represent pre-existing, popular dishes — so
// unlike a personalized generated recipe, it's honest for them to carry a
// rating/review count. Once the user generates their own recipe, the
// Featured card switches to that recipe and drops the rating in favor of a
// "generated for you" indicator.
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

export const FEATURED_SHOWCASE: ShowcaseRecipe = {
  id: "showcase-featured",
  name: "Spicy Garlic Paneer Stir Fry",
  description:
    "A delicious, high-protein paneer stir fry with garlic, bell peppers and a spicy, savory sauce.",
  cookingTimeMinutes: 20,
  servings: 2,
  difficulty: "Easy",
  imageUrl: "https://www.themealdb.com/images/media/meals/3m8yae1763257951.jpg",
  rating: 4.8,
  reviewCount: 256,
  highlightTag: "High Protein",
  dietaryTags: ["Vegetarian"],
  nutrition: { calories: 420, proteinGrams: 35, carbsGrams: 18, fatsGrams: 15 },
};

export const TRENDING_SHOWCASE: ShowcaseRecipe[] = [
  {
    id: "showcase-pesto-pasta",
    name: "Creamy Pesto Pasta",
    description: "A rich basil pesto pasta finished with parmesan and cracked pepper.",
    cookingTimeMinutes: 20,
    servings: 2,
    difficulty: "Easy",
    imageUrl: "https://www.themealdb.com/images/media/meals/0jv5gx1661040802.jpg",
    rating: 4.8,
    reviewCount: 142,
    highlightTag: "Comfort Food",
    dietaryTags: ["Vegetarian"],
    nutrition: { calories: 540, proteinGrams: 14, carbsGrams: 60, fatsGrams: 24 },
  },
  {
    id: "showcase-butter-chicken",
    name: "Butter Chicken",
    description: "Tender chicken simmered in a creamy, spiced tomato butter sauce.",
    cookingTimeMinutes: 25,
    servings: 3,
    difficulty: "Medium",
    imageUrl: "https://www.themealdb.com/images/media/meals/9ya6o71780262651.jpg",
    rating: 4.7,
    reviewCount: 318,
    highlightTag: "Crowd Favorite",
    dietaryTags: ["Non-Vegetarian"],
    nutrition: { calories: 480, proteinGrams: 28, carbsGrams: 14, fatsGrams: 32 },
  },
  {
    id: "showcase-hakka-noodles",
    name: "Veg Hakka Noodles",
    description: "Wok-tossed noodles and crisp vegetables in a savory Indo-Chinese sauce.",
    cookingTimeMinutes: 15,
    servings: 2,
    difficulty: "Easy",
    imageUrl: "https://www.themealdb.com/images/media/meals/118oj61763423896.jpg",
    rating: 4.6,
    reviewCount: 189,
    highlightTag: "Quick Fix",
    dietaryTags: ["Vegetarian"],
    nutrition: { calories: 360, proteinGrams: 9, carbsGrams: 55, fatsGrams: 11 },
  },
  {
    id: "showcase-smoothie-bowl",
    name: "Berry Smoothie Bowl",
    description: "A refreshing blend of mixed berries topped with granola and fresh fruit.",
    cookingTimeMinutes: 10,
    servings: 1,
    difficulty: "Easy",
    imageUrl: "https://www.themealdb.com/images/media/meals/pjbaq11784731571.jpg",
    rating: 4.9,
    reviewCount: 97,
    highlightTag: "Refreshing",
    dietaryTags: ["Vegetarian"],
    nutrition: { calories: 290, proteinGrams: 8, carbsGrams: 48, fatsGrams: 7 },
  },
];
