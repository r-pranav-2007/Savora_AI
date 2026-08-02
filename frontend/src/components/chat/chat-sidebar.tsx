"use client";

import { Clock, MessageSquare, Plus } from "lucide-react";
import { IconBadge } from "@/components/ui/icon-badge";

const RECENT_CHATS = [
  { title: "Paneer, mushroom & garlic", time: "Today, 10:30 AM" },
  { title: "High protein dinner", time: "Yesterday, 7:15 PM" },
  { title: "Spicy noodles recipe", time: "Yesterday, 5:20 PM" },
];

interface ChatSidebarProps {
  onSelectPrompt: (text: string) => void;
  onNewChat: () => void;
}

export function ChatSidebar({ onSelectPrompt, onNewChat }: ChatSidebarProps) {
  return (
    <aside className="hidden flex-col gap-5 lg:flex">
      <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-[var(--shadow-card)] dark:border-white/10 dark:bg-white/[0.04]">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <IconBadge icon={Clock} tone="violet" size="sm" />
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Recent Chats</h3>
          </div>
          <button
            type="button"
            className="text-xs font-semibold text-violet-600 transition-colors hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
          >
            View all
          </button>
        </div>

        <div className="flex flex-col gap-1">
          {RECENT_CHATS.map((chat) => (
            <button
              key={chat.title}
              type="button"
              onClick={() => onSelectPrompt(chat.title)}
              className="flex items-start gap-2.5 rounded-xl px-2 py-2.5 text-left transition-colors hover:bg-violet-50 dark:hover:bg-violet-500/10"
            >
              <MessageSquare size={15} className="mt-0.5 shrink-0 text-neutral-400 dark:text-neutral-500" />
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                  {chat.title}
                </span>
                <span className="block text-xs text-neutral-400 dark:text-neutral-500">{chat.time}</span>
              </span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onNewChat}
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-neutral-50 py-2.5 text-sm font-semibold text-neutral-600 transition-colors hover:bg-neutral-100 dark:bg-white/5 dark:text-neutral-300 dark:hover:bg-white/10"
        >
          <Plus size={15} />
          New Chat
        </button>
      </div>
    </aside>
  );
}
