"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, LayoutGrid, MessageCircle, Plus } from "lucide-react";
import { IconBadge } from "@/components/ui/icon-badge";

function ChatPreview() {
  return (
    <div className="mb-4 flex flex-col gap-2">
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-violet-100 px-3.5 py-2 text-xs font-medium text-violet-700 dark:bg-violet-500/15 dark:text-violet-300"
      >
        I have paneer and mushrooms.
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.9 }}
        className="mr-auto max-w-[90%] rounded-2xl rounded-tl-sm bg-neutral-100 px-3.5 py-2 text-xs font-medium text-neutral-600 dark:bg-white/10 dark:text-neutral-300"
      >
        How about Creamy Garlic Mushroom Paneer? ✨
      </motion.div>
    </div>
  );
}

const TAG_PREVIEW = ["Paneer", "High Protein", "20 mins", "Italian", "Vegetarian"];

function TagPreview() {
  return (
    <div className="mb-4 flex flex-wrap gap-1.5">
      {TAG_PREVIEW.map((tag, i) => (
        <motion.span
          key={tag}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 0.5 + i * 0.08 }}
          whileHover={{ y: -1 }}
          className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
        >
          {tag}
        </motion.span>
      ))}
      <motion.span
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, delay: 0.5 + TAG_PREVIEW.length * 0.08 }}
        whileHover={{ y: -1 }}
        className="inline-flex items-center gap-1 rounded-full border border-dashed border-emerald-300 px-2.5 py-1 text-[11px] font-semibold text-emerald-500 dark:border-emerald-500/40 dark:text-emerald-400"
      >
        <Plus size={10} />
        Add more
      </motion.span>
    </div>
  );
}

interface ModeCardProps {
  icon: typeof MessageCircle;
  tone: "violet" | "green";
  title: string;
  description: string;
  linkLabel: string;
  linkClassName: string;
  href: string;
  delay: number;
  preview: React.ReactNode;
}

function ModeCard({
  icon,
  tone,
  title,
  description,
  linkLabel,
  linkClassName,
  href,
  delay,
  preview,
}: ModeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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
        {preview}
        <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${linkClassName}`}>
          {linkLabel}
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </motion.div>
  );
}

export function ModeCards() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-1">
      <ModeCard
        icon={MessageCircle}
        tone="violet"
        title="Chat Mode"
        description="Describe what you have, your cravings or ideas."
        linkLabel="Start Chatting"
        linkClassName="text-violet-600 dark:text-violet-400"
        href="/chat"
        delay={0.15}
        preview={<ChatPreview />}
      />
      <ModeCard
        icon={LayoutGrid}
        tone="green"
        title="Tag Mode"
        description="Pick ingredients, diet, cuisine and preferences."
        linkLabel="Explore Ingredients"
        linkClassName="text-emerald-600 dark:text-emerald-400"
        href="/tag"
        delay={0.25}
        preview={<TagPreview />}
      />
    </div>
  );
}
