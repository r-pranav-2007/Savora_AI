import type { GenerateRecipeRequest, Recipe } from "../../types";
import { matchRecipe } from "../../utils/match-recipe";
import { randomDelay } from "../../utils/delay";
import type { RecipeService } from "./recipe-service.interface";

export class MockRecipeService implements RecipeService {
  async generateRecipe(request: GenerateRecipeRequest): Promise<Recipe> {
    // Stand in for real model latency so the UI's loading state behaves the
    // same way it will once this calls the OpenAI API.
    await randomDelay(600, 1400);

    const { recipe } = matchRecipe(request);

    return {
      ...recipe,
      id: crypto.randomUUID(),
      imageStatus: "idle",
    };
  }
}
