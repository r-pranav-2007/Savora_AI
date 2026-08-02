"use client";

import { motion } from "framer-motion";
import { Code2, GraduationCap, Heart } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { IconBadge } from "@/components/ui/icon-badge";

const HIGHLIGHTS = [
  { icon: GraduationCap, tone: "violet" as const },
  { icon: Code2, tone: "blue" as const },
  { icon: Heart, tone: "rose" as const },
];

export default function AboutPage() {
  return (
    <div className="relative flex flex-1 flex-col overflow-x-hidden bg-(--background)">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 right-[-10%] h-[26rem] w-[26rem] rounded-full bg-violet-300/25 blur-3xl dark:bg-violet-600/10" />
        <div className="absolute top-[38rem] -left-32 h-[24rem] w-[24rem] rounded-full bg-amber-200/25 blur-3xl dark:bg-amber-500/10" />
        <div className="absolute bottom-0 right-[8%] h-80 w-80 rounded-full bg-rose-200/20 blur-3xl dark:bg-rose-500/10" />
      </div>

      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 pb-6 pt-14 text-center sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl dark:text-white"
          >
            About the <span className="gradient-text">Project</span>
          </motion.h1>
        </section>

        <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl border border-black/5 bg-white p-8 shadow-[var(--shadow-card)] dark:border-white/10 dark:bg-white/[0.04] sm:p-10"
          >
            <div className="mb-8 flex items-center justify-center gap-4">
              {HIGHLIGHTS.map(({ icon, tone }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                >
                  <IconBadge icon={icon} tone={tone} size="lg" />
                </motion.div>
              ))}
            </div>

            <div className="space-y-5 text-center text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300 sm:text-base">
              <p>
                <span className="gradient-text font-bold">Savora AI</span>{" "}
                is an innovative artificial intelligence project developed as part of our college coursework.
                This intelligent recipe
                recommendation platform combines the power of AI with culinary knowledge to create
                personalized recipes based on users&rsquo; ingredients, dietary preferences, cooking time,
                and taste preferences.
              </p>
              <p>
                Our system leverages advanced AI models and natural language processing to understand user
                requests, whether through conversational chat or intuitive ingredient selection, and
                generates customized recipes complete with ingredients, step-by-step instructions, and
                nutritional insights.
              </p>
              <p>
                The project demonstrates the practical application of artificial intelligence in the food
                and culinary domain, showcasing how AI can simplify meal planning, reduce food waste by
                utilizing available ingredients, and deliver personalized cooking experiences tailored to
                every user&rsquo;s unique needs and preferences.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mt-8 rounded-2xl bg-violet-50 px-6 py-5 text-center dark:bg-violet-500/10"
            >
              <p className="flex items-center justify-center gap-2 text-sm font-bold text-violet-700 dark:text-violet-300">
                <GraduationCap size={16} />
                Academic Project · Artificial Intelligence &amp; Culinary Tech
              </p>
              <p className="mt-1 text-xs text-violet-600/80 dark:text-violet-300/70">
                Developed to explore the intersection of AI technology and culinary personalization.
              </p>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
