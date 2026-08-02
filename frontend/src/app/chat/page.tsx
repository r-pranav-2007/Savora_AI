"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessage } from "@/components/chat/chat-message";
import { ChatSidebar } from "@/components/chat/chat-sidebar";
import { ChatSuggestions } from "@/components/chat/chat-suggestions";
import { useChat } from "@/hooks/use-chat";
import type { Recipe } from "@/lib/types";

const DECORATIONS = [
  { emoji: "🌿", className: "left-[3%] top-[14%] text-4xl -rotate-12" },
  { emoji: "🍅", className: "left-[2%] top-[38%] text-4xl rotate-6" },
  { emoji: "🍄", className: "left-[11%] top-[52%] text-3xl" },
  { emoji: "🧅", className: "left-[7%] top-[68%] text-4xl rotate-12" },
  { emoji: "🌱", className: "left-[17%] top-[30%] text-xl" },
  { emoji: "✨", className: "left-[15%] top-[22%] text-lg opacity-70" },
  { emoji: "🌿", className: "right-[6%] top-[32%] text-3xl rotate-6" },
  { emoji: "✨", className: "right-[3%] top-[18%] text-lg opacity-70" },
  { emoji: "🌶️", className: "right-[9%] top-[52%] text-2xl -rotate-6" },
];

export default function ChatModePage() {
  const { messages, isGenerating, sendMessage, regenerate, reset } = useChat();
  const [draft, setDraft] = useState("");
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [regeneratingId, setRegeneratingId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length]);

  const handleSend = () => {
    const text = draft;
    if (!text.trim() || isGenerating) return;
    setDraft("");
    void sendMessage(text);
  };

  const toggleSave = (recipe: Recipe) => {
    setSavedRecipes((prev) =>
      prev.some((r) => r.id === recipe.id) ? prev.filter((r) => r.id !== recipe.id) : [...prev, recipe]
    );
  };

  const handleRegenerate = async (messageId: string, sourceText?: string) => {
    if (!sourceText) return;
    setRegeneratingId(messageId);
    await regenerate(sourceText);
    setRegeneratingId(null);
  };

  const handleNewChat = () => {
    reset();
    setDraft("");
  };

  return (
    <div className="relative flex flex-1 flex-col overflow-x-hidden bg-(--background)">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 right-[-10%] h-[26rem] w-[26rem] rounded-full bg-violet-300/25 blur-3xl dark:bg-violet-600/10" />
        <div className="absolute top-[38rem] -left-32 h-[24rem] w-[24rem] rounded-full bg-amber-200/25 blur-3xl dark:bg-amber-500/10" />
        <div className="absolute bottom-0 right-[8%] h-80 w-80 rounded-full bg-rose-200/20 blur-3xl dark:bg-rose-500/10" />
      </div>

      <main className="flex-1">
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden opacity-60 dark:opacity-30 xl:block">
            {DECORATIONS.map((d, i) => (
              <span key={i} className={`absolute select-none ${d.className}`}>
                {d.emoji}
              </span>
            ))}
          </div>

          <section className="mx-auto max-w-3xl px-4 pb-6 pt-6 text-center sm:px-6 lg:px-8">
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-4 py-1.5 text-xs font-bold tracking-wide text-violet-600 dark:bg-violet-500/10 dark:text-violet-300"
            >
              <Sparkles size={13} />
              AI CHEF
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-4xl font-extrabold leading-[1.12] tracking-tight text-neutral-900 sm:text-5xl dark:text-white"
            >
              What would you like
              <br />
              to <span className="gradient-text">cook today?</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-neutral-500 sm:text-lg dark:text-neutral-400"
            >
              Ask anything about recipes, ingredients, cooking methods or get personalized meal ideas.
            </motion.p>
          </section>
        </div>

        <section className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            <div className="flex min-w-0 flex-col gap-5">
              <ChatInput value={draft} onChange={setDraft} onSubmit={handleSend} isGenerating={isGenerating} />

              {messages.length === 0 ? (
                <ChatSuggestions onSelect={setDraft} />
              ) : (
                <div className="flex flex-col gap-5 rounded-3xl border border-black/5 bg-white p-5 shadow-[var(--shadow-card)] dark:border-white/10 dark:bg-white/[0.04] sm:p-6">
                  {messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      message={message}
                      isSaved={Boolean(message.recipe && savedRecipes.some((r) => r.id === message.recipe!.id))}
                      onToggleSave={() => message.recipe && toggleSave(message.recipe)}
                      onRegenerate={() => handleRegenerate(message.id, message.sourceText)}
                      isRegenerating={isGenerating && regeneratingId === message.id}
                    />
                  ))}
                  <div ref={bottomRef} />
                </div>
              )}
            </div>

            <div className="lg:sticky lg:top-24">
              <ChatSidebar onSelectPrompt={setDraft} onNewChat={handleNewChat} />
            </div>
          </div>
        </section>

        <p className="mx-auto flex max-w-7xl items-center justify-center gap-1.5 px-4 pb-14 text-xs text-neutral-400 sm:px-6 lg:px-8 dark:text-neutral-500">
          <ShieldCheck size={13} />
          Savora remembers your preferences to give better recommendations.
        </p>
      </main>
      <Footer />
    </div>
  );
}
