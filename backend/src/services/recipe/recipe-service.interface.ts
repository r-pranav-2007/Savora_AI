import type { GenerateRecipeRequest, Recipe } from "../../types";

// The contract the rest of the app depends on. Swapping the mock
// implementation for a real OpenAI-backed one later only means writing a new
// class that satisfies this interface and pointing `index.ts` at it — no
// other file needs to change.
export interface RecipeService {
  generateRecipe(request: GenerateRecipeRequest): Promise<Recipe>;
}
