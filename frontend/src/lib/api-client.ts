import type { ApiErrorResponse, GenerateRecipeRequest, Recipe, ShowcaseRecipe } from "@/lib/types";

// The only place the frontend knows about the backend's location. Every
// other module talks to these functions, never to `fetch` + a raw URL —
// keeping the frontend a pure consumer of the Savora API.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error((data as ApiErrorResponse).error ?? "Something went wrong. Please try again.");
  }

  return data as T;
}

export function generateRecipe(body: GenerateRecipeRequest): Promise<{ recipe: Recipe }> {
  return request("/api/recipes/generate", { method: "POST", body: JSON.stringify(body) });
}

export function generateRecipeImage(recipe: Recipe): Promise<{ imageUrl: string }> {
  return request("/api/recipes/image", { method: "POST", body: JSON.stringify(recipe) });
}

export function getFeaturedShowcase(): Promise<{ recipe: ShowcaseRecipe }> {
  return request("/api/recipes/featured");
}

export function getTrendingShowcase(): Promise<{ recipes: ShowcaseRecipe[] }> {
  return request("/api/recipes/trending");
}
