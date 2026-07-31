import { Router } from "express";
import {
  generateRecipe,
  generateRecipeImage,
  getFeaturedShowcase,
  getTrendingShowcase,
} from "../controllers/recipe.controller";

export const recipeRouter = Router();

// Recipe generation: rendered immediately, no image wait.
recipeRouter.post("/generate", generateRecipe);

// Deliberately separate from /generate — the frontend calls this only after
// the recipe itself has already rendered, so image latency never blocks it.
recipeRouter.post("/image", generateRecipeImage);

// Static showcase content for the homepage (default featured card + trending rail).
recipeRouter.get("/featured", getFeaturedShowcase);
recipeRouter.get("/trending", getTrendingShowcase);
