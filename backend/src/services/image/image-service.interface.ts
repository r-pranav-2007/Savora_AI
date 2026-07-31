import type { Recipe } from "../../types";

export interface RecipeImageResult {
  imageUrl: string;
}

// Same swap-point pattern as RecipeService: a real implementation (calling
// an image generation API) just needs to satisfy this interface.
export interface ImageService {
  getRecipeImage(recipe: Recipe): Promise<RecipeImageResult>;
}
