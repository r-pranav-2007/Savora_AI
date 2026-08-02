"use client";

import { motion } from "framer-motion";
import { CookingPot, Dumbbell, Flame, Soup, Sparkles } from "lucide-react";
import { IconBadge } from "@/components/ui/icon-badge";

export const CHAT_SUGGESTIONS = [
  {
    icon: CookingPot,
    tone: "violet" as const,
    title: "Cook with Ingredients",
    description: "I have paneer, mushrooms and garlic.",
    prompt: "I have paneer, mushrooms and garlic.",
  },
  {
    icon: Dumbbell,
    tone: "green" as const,
    title: "High Protein",
    description: "Recommend a high protein dinner.",
    prompt: "Recommend a high-protein dinner under 500 calories.",
  },
  {
    icon: Soup,
    tone: "amber" as const,
    title: "Italian Pasta",
    description: "I want an authentic Italian pasta.",
    prompt: "I want an authentic Italian pasta.",
  },
  {
    icon: Flame,
    tone: "rose" as const,
    title: "Quick & Spicy",
    description: "Something spicy in under 20 mins.",
    prompt: "Suggest something spicy in under 20 minutes.",
  },
  {
    icon: Sparkles,
    tone: "violet" as const,
    title: "Surprise Me",
    description: "Surprise me with a delicious recipe!",
    prompt: "Surprise me with a delicious recipe!",
  },
];

export function ChatSuggestions({ onSelect }: { onSelect: (text: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {CHAT_SUGGESTIONS.map((s, i) => (
        <motion.button
          key={s.title}
          type="button"
          onClick={() => onSelect(s.prompt)}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.06 }}
          whileHover={{ y: -3 }}
          className="rounded-2xl border border-black/5 bg-white p-4 text-left shadow-[var(--shadow-card)] transition-shadow hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04]"
        >
          <IconBadge icon={s.icon} tone={s.tone} size="md" className="mb-3" />
          <h3 className="mb-1 text-sm font-bold text-neutral-900 dark:text-white">{s.title}</h3>
          <p className="text-xs leading-snug text-neutral-500 dark:text-neutral-400">{s.description}</p>
        </motion.button>
      ))}
    </div>
  );
}
