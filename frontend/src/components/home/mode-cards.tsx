"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, LayoutGrid, MessageCircle } from "lucide-react";
import { IconBadge } from "@/components/ui/icon-badge";

interface ModeCardProps {
  icon: typeof MessageCircle;
  tone: "violet" | "green";
  title: string;
  description: string;
  linkLabel: string;
  href: string;
  delay: number;
}

function ModeCard({ icon, tone, title, description, linkLabel, href, delay }: ModeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -4 }}
    >
      <Link
        href={href}
        className="group block rounded-3xl border border-black/5 bg-white p-6 shadow-[var(--shadow-card)] transition-shadow hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04]"
      >
        <IconBadge icon={icon} tone={tone} size="md" className="mb-4" />
        <h3 className="mb-1.5 text-lg font-bold text-neutral-900 dark:text-white">{title}</h3>
        <p className="mb-4 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
          {description}
        </p>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 dark:text-violet-400">
          {linkLabel}
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </motion.div>
  );
}

export function ModeCards() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1">
      <ModeCard
        icon={MessageCircle}
        tone="violet"
        title="Chat Mode"
        description="Describe what you have, your cravings or ideas."
        linkLabel="Start Chatting"
        href="#chat-search"
        delay={0.15}
      />
      <ModeCard
        icon={LayoutGrid}
        tone="green"
        title="Tag Mode"
        description="Pick ingredients, diet, cuisine and preferences."
        linkLabel="Explore Ingredients"
        href="/tag"
        delay={0.25}
      />
    </div>
  );
}
