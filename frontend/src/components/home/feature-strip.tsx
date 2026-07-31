"use client";

import { motion } from "framer-motion";
import { Brain, Clock, Heart, Leaf } from "lucide-react";
import { IconBadge } from "@/components/ui/icon-badge";

const FEATURES = [
  {
    icon: Brain,
    tone: "violet" as const,
    title: "AI Generated",
    description: "Smart recipes generated just for you.",
  },
  {
    icon: Heart,
    tone: "rose" as const,
    title: "Personalized",
    description: "Based on your preferences, diet and taste.",
  },
  {
    icon: Leaf,
    tone: "green" as const,
    title: "Nutritious",
    description: "Balanced nutrition in every recipe.",
  },
  {
    icon: Clock,
    tone: "blue" as const,
    title: "Time Saving",
    description: "Quick, easy and perfect for your day.",
  },
];

export function FeatureStrip() {
  return (
    <section className="mx-auto max-w-7xl border-t border-black/5 px-4 py-12 sm:px-6 lg:px-8 dark:border-white/10">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.08 * index }}
            className="flex items-start gap-3.5"
          >
            <IconBadge icon={feature.icon} tone={feature.tone} size="sm" />
            <div>
              <h3 className="mb-0.5 text-sm font-bold text-neutral-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-sm leading-snug text-neutral-500 dark:text-neutral-400">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
