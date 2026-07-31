import type { TagSelections } from "./tags";

export interface ChatGenerateRequest {
  mode: "chat";
  message: string;
}

export interface TagGenerateRequest {
  mode: "tag";
  tags: TagSelections;
}

export type GenerateRecipeRequest = ChatGenerateRequest | TagGenerateRequest;

export interface ApiErrorResponse {
  error: string;
}
