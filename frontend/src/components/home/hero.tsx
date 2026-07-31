"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { SearchBar } from "./search-bar";
import { QuickFilters } from "./quick-filters";
import { ModeCards } from "./mode-cards";

interface HeroProps {
  onGenerate: (message: string) => void;
  isGenerating: boolean;
}

export function Hero({ onGenerate, isGenerating }: HeroProps) {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 pt-12 pb-8 sm:px-6 lg:grid-cols-[1.6fr_1fr] lg:gap-10 lg:px-8 lg:pt-20">
      <div>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-3.5 py-1.5 text-xs font-bold tracking-wide text-violet-600 dark:bg-violet-500/15 dark:text-violet-300"
        >
          <Sparkles size={13} />
          AI POWERED
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-5xl font-extrabold leading-[1.05] tracking-tight text-neutral-900 sm:text-6xl lg:text-[3.4rem] xl:text-7xl dark:text-white"
        >
          Cook <span className="gradient-text">anything.</span>
          <br />
          Taste <span className="gradient-text">everything.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-5 max-w-lg text-base leading-relaxed text-neutral-500 sm:text-lg dark:text-neutral-400"
        >
          Your personal AI kitchen that turns ingredients, cravings or ideas into amazing recipes.
        </motion.p>

        <motion.div
          id="chat-search"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 max-w-xl scroll-mt-28"
        >
          <SearchBar onSubmit={onGenerate} isGenerating={isGenerating} />
        </motion.div>

        <div className="mt-6 max-w-xl">
          <QuickFilters onSelect={onGenerate} disabled={isGenerating} />
        </div>
      </div>

      <ModeCards />
    </section>
  );
}
