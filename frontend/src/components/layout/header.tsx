"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { DollarSign, Menu, User, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Home", href: "/", active: true },
  { label: "Explore", href: "#trending", active: false },
  { label: "Saved", href: "#", active: false },
  { label: "About", href: "#", active: false },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-[#0d0b14]/80"
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="gradient-brand flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-md shadow-violet-500/20">
            <DollarSign size={18} strokeWidth={2.75} />
          </span>
          <span className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
            Savora
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative py-1 text-sm font-medium text-neutral-700 transition-colors hover:text-violet-600 dark:text-neutral-300 dark:hover:text-violet-400"
            >
              <span className={link.active ? "text-violet-600 dark:text-violet-400" : undefined}>
                {link.label}
              </span>
              {link.active && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full gradient-brand"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <div className="hidden sm:block">
            <Button size="sm" className="!px-5">
              <User size={16} />
              Sign In
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/5 bg-white text-neutral-700 md:hidden dark:border-white/10 dark:bg-white/10 dark:text-neutral-200"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-black/5 md:hidden dark:border-white/10"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                    link.active
                      ? "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300"
                      : "text-neutral-700 dark:text-neutral-300"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 flex items-center gap-3 px-3">
                <ThemeToggle />
                <Button size="sm" className="flex-1">
                  <User size={16} />
                  Sign In
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
