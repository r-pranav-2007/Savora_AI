import type { GenerateRecipeRequest } from "../types";
import { MOCK_RECIPES, type MockRecipeEntry } from "../mock-data/recipes";

// Turns either a free-text chat message or a set of selected tags into a flat
// list of lowercase search terms, so both input modes can be matched against
// the mock recipe bank with the same scoring logic.
function extractSearchTerms(request: GenerateRecipeRequest): string[] {
  if (request.mode === "chat") {
    return request.message
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(Boolean);
  }

  const { tags } = request;
  const terms: string[] = [
    ...(tags.ingredients ?? []),
    tags.cuisine,
    tags.mealType,
    tags.cookingTime,
    ...(tags.dietaryPreference ?? []),
    tags.spiceLevel,
    tags.difficulty,
    ...(tags.additionalPreferences?.split(/[^a-zA-Z0-9]+/).filter(Boolean) ?? []),
  ]
    .filter((value): value is string => Boolean(value))
    .map((value) => value.toLowerCase());

  return terms;
}

function scoreRecipe(entry: MockRecipeEntry, terms: string[]): number {
  let score = 0;
  for (const term of terms) {
    for (const keyword of entry.keywords) {
      if (keyword.includes(term) || term.includes(keyword)) {
        score += 1;
      }
    }
  }
  return score;
}

export function matchRecipe(request: GenerateRecipeRequest): MockRecipeEntry {
  const terms = extractSearchTerms(request);

  if (terms.length === 0) {
    return MOCK_RECIPES[Math.floor(Math.random() * MOCK_RECIPES.length)];
  }

  let best: MockRecipeEntry[] = [];
  let bestScore = 0;

  for (const entry of MOCK_RECIPES) {
    const score = scoreRecipe(entry, terms);
    if (score > bestScore) {
      bestScore = score;
      best = [entry];
    } else if (score === bestScore && score > 0) {
      best.push(entry);
    }
  }

  if (best.length === 0) {
    return MOCK_RECIPES[Math.floor(Math.random() * MOCK_RECIPES.length)];
  }

  return best[Math.floor(Math.random() * best.length)];
}
