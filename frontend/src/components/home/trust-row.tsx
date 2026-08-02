"use client";

import { motion } from "framer-motion";
import { ChefHat, Heart, ShieldCheck, Sparkles } from "lucide-react";

const ITEMS = [
  { icon: ChefHat, value: "75K+", label: "Recipes Generated", tone: "violet" as const },
  { icon: Sparkles, value: "AI Powered", label: "Smart & Personalized", tone: "amber" as const },
  { icon: Heart, value: "Loved by", label: "Home Cooks", tone: "rose" as const },
  { icon: ShieldCheck, value: "Private & Secure", label: "Your data is yours", tone: "green" as const },
];

const toneClass = {
  violet: "bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300",
  amber: "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300",
  rose: "bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300",
  green: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300",
};

export function TrustRow() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 divide-black/5 rounded-3xl border border-black/5 bg-white py-2 shadow-[var(--shadow-card)] sm:grid-cols-4 sm:divide-x dark:divide-white/10 dark:border-white/10 dark:bg-white/[0.04]">
        {ITEMS.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="flex items-center gap-3 px-4 py-4 sm:justify-center"
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${toneClass[item.tone]}`}
            >
              <item.icon size={17} strokeWidth={2.25} />
            </span>
            <span>
              <span className="block text-sm font-extrabold text-neutral-900 dark:text-white">
                {item.value}
              </span>
              <span className="block text-xs text-neutral-500 dark:text-neutral-400">{item.label}</span>
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
