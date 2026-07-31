"use client";

import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({ value, onChange, onSubmit, placeholder, className }: SearchInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim() && onSubmit) {
      e.preventDefault();
      onSubmit(value.trim());
    }
  };

  return (
    <div
      className={`flex w-full max-w-xs items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 transition-[max-width] duration-300 ease-out focus-within:max-w-md dark:border-white/10 dark:bg-white/5 ${className ?? ""}`}
    >
      <Search size={16} className="shrink-0 text-neutral-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder ?? "Search..."}
        className="min-w-0 flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none dark:text-white dark:placeholder:text-neutral-500"
      />
    </div>
  );
}
