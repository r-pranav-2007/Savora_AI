"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";

interface SearchBarProps {
  onSubmit: (message: string) => void;
  isGenerating: boolean;
}

export function SearchBar({ onSubmit, isGenerating }: SearchBarProps) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || isGenerating) return;
    onSubmit(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 -z-10 rounded-full bg-violet-400/25 blur-2xl dark:bg-violet-500/15"
      />
      <motion.div
        animate={{
          boxShadow: focused
            ? "0 24px 55px -16px rgba(124,58,237,0.55), 0 0 0 4px rgba(139,92,246,0.15)"
            : "0 16px 40px -18px rgba(124,58,237,0.35), 0 0 0 1px rgba(124,58,237,0.08)",
          scale: focused ? 1.01 : 1,
        }}
        transition={{ duration: 0.25 }}
        className="flex items-center gap-2.5 rounded-full border border-violet-100 bg-white p-2.5 pl-6 dark:border-white/10 dark:bg-white/[0.06]"
      >
        <Sparkles size={22} className="shrink-0 text-violet-500" />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="What would you like to cook today?"
          disabled={isGenerating}
          className="min-w-0 flex-1 bg-transparent py-4 text-base font-semibold text-neutral-900 placeholder:font-medium placeholder:text-neutral-400 focus:outline-none disabled:opacity-60 sm:text-lg dark:text-white dark:placeholder:text-neutral-500"
        />
        <motion.button
          type="submit"
          disabled={isGenerating || !value.trim()}
          whileHover={{ scale: value.trim() ? 1.06 : 1 }}
          whileTap={{ scale: value.trim() ? 0.94 : 1 }}
          aria-label="Generate recipe"
          className="gradient-brand flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow-md shadow-violet-500/30 disabled:opacity-50"
        >
          {isGenerating ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <ArrowRight size={20} />
          )}
        </motion.button>
      </motion.div>
    </form>
  );
}
