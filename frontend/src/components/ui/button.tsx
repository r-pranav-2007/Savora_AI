import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-(--background)";

const variants: Record<Variant, string> = {
  primary:
    "gradient-brand text-white shadow-[0_10px_25px_-8px_rgba(124,58,237,0.55)] hover:shadow-[0_14px_30px_-6px_rgba(124,58,237,0.65)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
  outline:
    "border border-black/10 bg-white text-neutral-800 hover:-translate-y-0.5 hover:border-black/20 hover:shadow-md active:translate-y-0 active:scale-[0.98] dark:border-white/10 dark:bg-white/5 dark:text-neutral-100 dark:hover:border-white/20",
  ghost:
    "text-violet-600 hover:gap-3 dark:text-violet-400",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

interface LinkProps extends CommonProps {
  href: string;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: ButtonProps | LinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
