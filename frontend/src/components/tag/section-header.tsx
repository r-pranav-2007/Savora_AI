import type { LucideIcon } from "lucide-react";
import { IconBadge } from "@/components/ui/icon-badge";

type Tone = "violet" | "green" | "rose" | "amber" | "blue";

const NUMBER_TONE_CLASS: Record<Tone, string> = {
  violet: "bg-violet-600",
  green: "bg-emerald-500",
  rose: "bg-rose-500",
  amber: "bg-amber-500",
  blue: "bg-blue-500",
};

interface SectionHeaderProps {
  number: number;
  icon: LucideIcon;
  tone: Tone;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}

export function SectionHeader({ number, icon, tone, title, subtitle, action }: SectionHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${NUMBER_TONE_CLASS[tone]}`}
        >
          {number}
        </span>
        <IconBadge icon={icon} tone={tone} size="sm" />
        <div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">{title}</h3>
          <p className="text-xs text-neutral-400 dark:text-neutral-500">{subtitle}</p>
        </div>
      </div>
      {action}
    </div>
  );
}
