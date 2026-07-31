import type { ImageService } from "./image-service.interface";
import { MockImageService } from "./mock-image-service";

export type { ImageService, RecipeImageResult } from "./image-service.interface";

// Swap point for a real image generation API later.
export const imageService: ImageService = new MockImageService();
