"use client";

import { useCallback, useRef, useState } from "react";
import { generateRecipe, generateRecipeImage } from "@/lib/api-client";
import type { Recipe } from "@/lib/types";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text?: string;
  recipe?: Recipe;
  status?: "typing" | "done" | "error";
  sourceText?: string;
}

// Mirrors useRecipeGenerator's two-phase (recipe-then-image) flow, but keeps
// a running transcript instead of a single recipe slot, since a conversation
// can hold many recipes at once.
export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const requestIdRef = useRef(0);

  const fetchImage = useCallback(async (recipe: Recipe, assistantId: string, requestId: number) => {
    try {
      const { imageUrl } = await generateRecipeImage(recipe);
      if (requestId !== requestIdRef.current) return;
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId && m.recipe
            ? { ...m, recipe: { ...m.recipe, imageUrl, imageStatus: "ready" } }
            : m
        )
      );
    } catch {
      if (requestId !== requestIdRef.current) return;
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId && m.recipe ? { ...m, recipe: { ...m.recipe, imageStatus: "error" } } : m
        )
      );
    }
  }, []);

  const sendMessage = useCallback(
    async (rawText: string) => {
      const text = rawText.trim();
      if (!text || isGenerating) return;

      const requestId = ++requestIdRef.current;
      const userMessage: ChatMessage = { id: crypto.randomUUID(), role: "user", text };
      const assistantId = crypto.randomUUID();
      const typingMessage: ChatMessage = {
        id: assistantId,
        role: "assistant",
        status: "typing",
        sourceText: text,
      };
      setMessages((prev) => [...prev, userMessage, typingMessage]);
      setIsGenerating(true);

      try {
        const { recipe: generated } = await generateRecipe({ mode: "chat", message: text });
        if (requestId !== requestIdRef.current) return;

        const recipe: Recipe = { ...generated, imageStatus: "loading" };
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, status: "done", recipe } : m))
        );
        setIsGenerating(false);
        void fetchImage(recipe, assistantId, requestId);
      } catch (err) {
        if (requestId !== requestIdRef.current) return;
        setIsGenerating(false);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  status: "error",
                  text: err instanceof Error ? err.message : "Something went wrong. Please try again.",
                }
              : m
          )
        );
      }
    },
    [isGenerating, fetchImage]
  );

  const regenerate = useCallback(
    (sourceText: string) => sendMessage(sourceText),
    [sendMessage]
  );

  const reset = useCallback(() => {
    requestIdRef.current++;
    setIsGenerating(false);
    setMessages([]);
  }, []);

  return { messages, isGenerating, sendMessage, regenerate, reset };
}
