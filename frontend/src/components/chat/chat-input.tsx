"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Loader2, Mic, Paperclip, Send } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isGenerating: boolean;
}

export function ChatInput({ value, onChange, onSubmit, isGenerating }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [value]);

  const canSend = value.trim().length > 0 && !isGenerating;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (canSend) onSubmit();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (canSend) onSubmit();
      }}
      className="relative"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-3 -z-10 rounded-[2rem] bg-violet-400/20 blur-2xl dark:bg-violet-500/10"
      />
      <div className="rounded-3xl border border-violet-100 bg-white p-4 transition-colors focus-within:border-violet-300 dark:border-white/10 dark:bg-white/[0.06]">
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Savora anything..."
          className="max-h-40 min-h-8 w-full resize-none bg-transparent text-base font-medium text-neutral-900 placeholder:font-medium placeholder:text-neutral-400 focus:outline-none dark:text-white dark:placeholder:text-neutral-500"
        />

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled
              title="Attach image — coming soon"
              aria-label="Attach image (coming soon)"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-100 text-neutral-500 transition-colors hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white/10 dark:text-neutral-400"
            >
              <Paperclip size={16} />
            </button>
            <button
              type="button"
              disabled
              title="Voice input — coming soon"
              aria-label="Voice input (coming soon)"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-100 text-neutral-500 transition-colors hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white/10 dark:text-neutral-400"
            >
              <Mic size={16} />
            </button>
          </div>

          <motion.button
            type="submit"
            disabled={!canSend}
            whileHover={{ scale: canSend ? 1.06 : 1 }}
            whileTap={{ scale: canSend ? 0.94 : 1 }}
            aria-label="Send message"
            className="gradient-brand flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-md shadow-violet-500/30 disabled:opacity-50"
          >
            {isGenerating ? <Loader2 size={17} className="animate-spin" /> : <Send size={17} />}
          </motion.button>
        </div>
      </div>
    </form>
  );
}
