"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { ChatRecipeCard } from "@/components/chat/chat-recipe-card";
import { TypingIndicator } from "@/components/chat/typing-indicator";
import type { ChatMessage as ChatMessageType } from "@/hooks/use-chat";

interface ChatMessageProps {
  message: ChatMessageType;
  isSaved: boolean;
  onToggleSave: () => void;
  onRegenerate: () => void;
  isRegenerating: boolean;
}

export function ChatMessage({ message, isSaved, onToggleSave, onRegenerate, isRegenerating }: ChatMessageProps) {
  if (message.role === "user") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-violet-100 px-4 py-3 text-sm font-medium text-violet-700 dark:bg-violet-500/15 dark:text-violet-300"
      >
        {message.text}
      </motion.div>
    );
  }

  if (message.status === "typing") {
    return <TypingIndicator />;
  }

  if (message.status === "error") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mr-auto flex max-w-[90%] items-center gap-2 rounded-2xl rounded-tl-sm bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:bg-red-500/10 dark:text-red-300"
      >
        <AlertTriangle size={16} className="shrink-0" />
        {message.text}
      </motion.div>
    );
  }

  if (message.recipe) {
    return (
      <ChatRecipeCard
        recipe={message.recipe}
        isSaved={isSaved}
        onToggleSave={onToggleSave}
        onRegenerate={onRegenerate}
        isRegenerating={isRegenerating}
      />
    );
  }

  return null;
}
