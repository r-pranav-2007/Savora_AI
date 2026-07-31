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
      <motion.div
        animate={{
          boxShadow: focused
            ? "0 20px 45px -18px rgba(124,58,237,0.45)"
            : "0 10px 30px -15px rgba(30,15,60,0.15)",
        }}
        transition={{ duration: 0.25 }}
        className="flex items-center gap-2 rounded-full border border-black/5 bg-white p-2 pl-5 dark:border-white/10 dark:bg-white/[0.06]"
      >
        <Sparkles size={20} className="shrink-0 text-violet-500" />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="What would you like to cook today?"
          disabled={isGenerating}
          className="min-w-0 flex-1 bg-transparent py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none disabled:opacity-60 sm:text-base dark:text-white dark:placeholder:text-neutral-500"
        />
        <motion.button
          type="submit"
          disabled={isGenerating || !value.trim()}
          whileHover={{ scale: value.trim() ? 1.06 : 1 }}
          whileTap={{ scale: value.trim() ? 0.94 : 1 }}
          aria-label="Generate recipe"
          className="gradient-brand flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white shadow-md shadow-violet-500/30 disabled:opacity-50"
        >
          {isGenerating ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <ArrowRight size={18} />
          )}
        </motion.button>
      </motion.div>
    </form>
  );
}
