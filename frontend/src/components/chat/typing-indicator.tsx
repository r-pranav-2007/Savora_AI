"use client";

import { motion } from "framer-motion";

export function TypingIndicator() {
  return (
    <div className="mr-auto flex w-fit items-center gap-1.5 rounded-2xl rounded-tl-sm bg-neutral-100 px-4 py-3.5 dark:bg-white/10">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-violet-400"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
