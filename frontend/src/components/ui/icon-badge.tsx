import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type Tone = "violet" | "green" | "rose" | "amber" | "blue" | "neutral";

const tones: Record<Tone, string> = {
  violet: "bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300",
  green: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300",
  rose: "bg-rose-100 text-rose-500 dark:bg-rose-500/15 dark:text-rose-300",
  amber: "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300",
  blue: "bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300",
  neutral: "bg-neutral-100 text-neutral-600 dark:bg-white/10 dark:text-neutral-300",
};

const sizes = {
  sm: { box: "h-9 w-9 rounded-xl", icon: 16 },
  md: { box: "h-12 w-12 rounded-2xl", icon: 20 },
  lg: { box: "h-14 w-14 rounded-2xl", icon: 24 },
};

export function IconBadge({
  icon: Icon,
  tone = "violet",
  size = "md",
  className,
}: {
  icon: LucideIcon;
  tone?: Tone;
  size?: keyof typeof sizes;
  className?: string;
}) {
  const { box, icon } = sizes[size];
  return (
    <div className={cn("flex shrink-0 items-center justify-center", box, tones[tone], className)}>
      <Icon size={icon} strokeWidth={2.25} />
    </div>
  );
}
