"use client";

import { Plus } from "lucide-react";

const SUGGESTIONS = ["Make it crispy", "Use less oil", "Kids friendly", "Budget friendly", "Restaurant style"];

interface PreferenceCardProps {
  value: string;
  onChange: (value: string) => void;
}

export function PreferenceCard({ value, onChange }: PreferenceCardProps) {
  const appendSuggestion = (text: string) => {
    if (value.toLowerCase().includes(text.toLowerCase())) return;
    onChange(value.trim() ? `${value.trim()}, ${text}` : text);
  };

  return (
    <div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Anything else you'd like? (Optional)"
        rows={4}
        className="w-full resize-none rounded-2xl border border-black/10 bg-neutral-50 p-4 text-sm leading-relaxed text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-violet-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-neutral-500 dark:focus:bg-white/[0.07]"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => appendSuggestion(suggestion)}
            className="inline-flex items-center gap-1 rounded-full border border-dashed border-black/15 px-3 py-1.5 text-xs font-medium text-neutral-500 transition-colors hover:border-violet-300 hover:text-violet-600 dark:border-white/15 dark:text-neutral-400 dark:hover:border-violet-400/40 dark:hover:text-violet-300"
          >
            <Plus size={12} />
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
