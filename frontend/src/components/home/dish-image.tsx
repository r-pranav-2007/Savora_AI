"use client";

import { useState } from "react";
import type { ImageStatus } from "@/lib/types";

const FALLBACK_IMAGE = "/images/placeholder-dish.svg";

interface DishImageProps {
  src?: string;
  alt: string;
  status?: ImageStatus;
  className?: string;
}

export function DishImage({ src, alt, status = "ready", className = "" }: DishImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const showSkeleton = status === "loading" || (!src && status !== "error");

  if (showSkeleton) {
    return (
      <div
        className={`animate-pulse bg-gradient-to-br from-violet-100 via-orange-50 to-amber-100 dark:from-violet-500/10 dark:via-white/5 dark:to-amber-500/10 ${className}`}
      />
    );
  }

  const effectiveSrc = errored || status === "error" || !src ? FALLBACK_IMAGE : src;

  return (
    <img
      src={effectiveSrc}
      alt={alt}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      onError={() => setErrored(true)}
      className={`${className} transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
    />
  );
}
