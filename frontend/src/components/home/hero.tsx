"use client";

import { motion } from "framer-motion";
import { Sparkles, Star, Users } from "lucide-react";
import { SearchBar } from "./search-bar";
import { QuickFilters } from "./quick-filters";
import { TrustRow } from "./trust-row";
import { ModeCards } from "./mode-cards";

interface HeroProps {
  onGenerate: (message: string) => void;
  isGenerating: boolean;
}

export function Hero({ onGenerate, isGenerating }: HeroProps) {
  return (
    <>
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 pb-12 pt-8 sm:px-6 md:grid-cols-[1.6fr_1fr] md:items-start md:gap-10 lg:px-8 lg:pt-10">
        <div className="text-center">
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
            className="text-5xl font-extrabold leading-[1.05] tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl dark:text-white"
          >
            Cook <span className="gradient-text">anything.</span>
            <br />
            Taste <span className="gradient-text">everything.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-neutral-500 sm:text-lg dark:text-neutral-400"
          >
            Your personal AI kitchen that turns ingredients, cravings or ideas into amazing recipes.
          </motion.p>

          <motion.div
            id="chat-search"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mx-auto mt-8 max-w-xl scroll-mt-28"
          >
            <SearchBar onSubmit={onGenerate} isGenerating={isGenerating} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl"
          >
            <QuickFilters onSelect={onGenerate} disabled={isGenerating} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-3"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white px-3.5 py-2 text-sm shadow-[var(--shadow-card)] dark:border-white/10 dark:bg-white/[0.06]">
              <Star size={15} className="fill-amber-400 text-amber-400" />
              <span className="font-bold text-neutral-900 dark:text-white">4.9</span>
              <span className="text-neutral-400 dark:text-neutral-500">rating</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white px-3.5 py-2 text-sm shadow-[var(--shadow-card)] dark:border-white/10 dark:bg-white/[0.06]">
              <Users size={15} className="text-violet-500" />
              <span className="font-bold text-neutral-900 dark:text-white">40+</span>
              <span className="text-neutral-400 dark:text-neutral-500">home cooks</span>
            </span>
          </motion.div>
        </div>

        <ModeCards />
      </section>

      <TrustRow />
    </>
  );
}
