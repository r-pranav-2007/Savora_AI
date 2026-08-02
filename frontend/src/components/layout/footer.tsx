"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const TEAM = ["Ovieyaa", "Pranav", "Praveen", "Raghul"];

function GithubIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-1.94c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.6.24 2.77.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.07.78 2.16v3.2c0 .3.21.66.79.55A10.75 10.75 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

const SOCIALS = [
  { icon: GithubIcon, label: "GitHub", href: "https://github.com" },
  { icon: LinkedinIcon, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Mail, label: "Email", href: "mailto:hello@savora.app" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-black/5 bg-gradient-to-b from-violet-50/50 to-white dark:border-white/10 dark:from-white/[0.02] dark:to-[#0d0b14]">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-16 left-[6%] h-72 w-72 rounded-full bg-violet-300/20 blur-3xl dark:bg-violet-600/10" />
        <div className="absolute top-10 right-[8%] h-64 w-64 rounded-full bg-amber-200/20 blur-3xl dark:bg-amber-500/10" />
        <div className="absolute bottom-[-4rem] left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-rose-200/15 blur-3xl dark:bg-rose-500/10" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8"
      >
        <div className="flex flex-col items-center">
          <Image src="/logo-icon.png" alt="" width={278} height={426} className="h-16 w-auto" />
          <Image
            src="/logo-wordmark-dark.png"
            alt="Savora"
            width={739}
            height={192}
            className="mt-2 h-10 w-auto dark:hidden"
          />
          <Image
            src="/logo-wordmark-light.png"
            alt="Savora"
            width={739}
            height={192}
            className="mt-2 hidden h-10 w-auto dark:block"
          />
        </div>
        <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
          Your Personal AI Kitchen
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          {SOCIALS.map(({ icon: Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              whileHover={{ y: -3 }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/5 bg-white text-neutral-500 shadow-[var(--shadow-card)] transition-colors hover:border-violet-200 hover:text-violet-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-400 dark:hover:text-violet-400"
            >
              <Icon size={17} />
            </motion.a>
          ))}
        </div>

        <div className="mx-auto mt-10 flex items-center justify-center gap-2">
          <span className="h-px w-16 rounded-full bg-gradient-to-r from-transparent to-violet-300 dark:to-violet-500/40" />
          <span className="gradient-brand h-1.5 w-1.5 rounded-full" />
          <span className="h-px w-16 rounded-full bg-gradient-to-l from-transparent to-violet-300 dark:to-violet-500/40" />
        </div>

        <div className="mx-auto mt-10 w-fit rounded-2xl border border-black/5 bg-white/70 px-8 py-5 shadow-[var(--shadow-card)] backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04]">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
            Made by
          </p>
          <p className="mt-2 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 text-sm font-bold text-neutral-900 dark:text-white">
            {TEAM.map((name, i) => (
              <span key={name} className="flex items-center gap-2.5">
                {name}
                {i < TEAM.length - 1 && <span className="text-violet-400">•</span>}
              </span>
            ))}
          </p>
        </div>

        <p className="mt-8 text-xs text-neutral-400 dark:text-neutral-500">
          © 2026 Savora. Built with passion for home cooks everywhere.
        </p>
      </motion.div>
    </footer>
  );
}
