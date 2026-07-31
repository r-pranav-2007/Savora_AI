import type { RecipeService } from "./recipe-service.interface";
import { MockRecipeService } from "./mock-recipe-service";

export type { RecipeService } from "./recipe-service.interface";

// Single swap point: once an OpenAI-backed implementation exists, import it
// here instead (e.g. behind an env flag) — nothing outside this file needs
// to know which implementation is active.
export const recipeService: RecipeService = new MockRecipeService();
