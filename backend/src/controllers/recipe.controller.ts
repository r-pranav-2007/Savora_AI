import type { Request, Response } from "express";
import { recipeService } from "../services/recipe";
import { imageService } from "../services/image";
import { FEATURED_SHOWCASE, TRENDING_SHOWCASE } from "../mock-data/showcase";
import type { ApiErrorResponse, GenerateRecipeRequest, Recipe } from "../types";

function isValidGenerateRequest(body: unknown): body is GenerateRecipeRequest {
  if (!body || typeof body !== "object") return false;
  const mode = (body as { mode?: unknown }).mode;

  if (mode === "chat") {
    const message = (body as { message?: unknown }).message;
    return typeof message === "string" && message.trim().length > 0;
  }

  if (mode === "tag") {
    const tags = (body as { tags?: unknown }).tags;
    if (!tags || typeof tags !== "object") return false;
    const ingredients = (tags as { ingredients?: unknown }).ingredients;
    return Array.isArray(ingredients);
  }

  return false;
}

function isValidRecipe(body: unknown): body is Recipe {
  if (!body || typeof body !== "object") return false;
  const recipe = body as Partial<Recipe>;
  return typeof recipe.id === "string" && typeof recipe.name === "string";
}

function errorBody(error: string): ApiErrorResponse {
  return { error };
}

export async function generateRecipe(req: Request, res: Response) {
  if (!isValidGenerateRequest(req.body)) {
    return res.status(400).json(
      errorBody(
        "Invalid request. Expected { mode: 'chat', message: string } or { mode: 'tag', tags: { ingredients: string[], ... } }."
      )
    );
  }

  try {
    const recipe = await recipeService.generateRecipe(req.body);
    res.json({ recipe });
  } catch (error) {
    console.error("Recipe generation failed:", error);
    res.status(500).json(errorBody("Something went wrong while generating your recipe. Please try again."));
  }
}

export async function generateRecipeImage(req: Request, res: Response) {
  if (!isValidRecipe(req.body)) {
    return res
      .status(400)
      .json(errorBody("Invalid request. Expected a recipe object with at least id and name."));
  }

  try {
    const result = await imageService.getRecipeImage(req.body);
    res.json(result);
  } catch (error) {
    console.error("Image generation failed:", error);
    res.status(500).json(errorBody("Something went wrong while generating the dish image."));
  }
}

export function getFeaturedShowcase(_req: Request, res: Response) {
  res.json({ recipe: FEATURED_SHOWCASE });
}

export function getTrendingShowcase(_req: Request, res: Response) {
  res.json({ recipes: TRENDING_SHOWCASE });
}
