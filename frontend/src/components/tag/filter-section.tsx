"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { IconBadge } from "@/components/ui/icon-badge";
import { cn } from "@/lib/utils/cn";

interface FilterSectionProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

// Animates in on mount (not on scroll-into-view): this page is a form the
// user fills out top to bottom, so sections below the fold must already be
// visible if a user scrolls there quickly — appearance shouldn't be a race
// against scroll speed the way a marketing scroll-reveal is.
export function FilterSection({
  icon,
  title,
  description,
  children,
  className,
  delay = 0,
}: FilterSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={cn("flex flex-col gap-4", className)}
    >
      <div className="flex items-center gap-3">
        <IconBadge icon={icon} tone="violet" size="sm" />
        <div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">{title}</h3>
          {description && (
            <p className="text-xs text-neutral-500 dark:text-neutral-400">{description}</p>
          )}
        </div>
      </div>
      {children}
    </motion.section>
  );
}
