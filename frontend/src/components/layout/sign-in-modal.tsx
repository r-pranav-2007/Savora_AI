"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Eye, EyeOff, Loader2, Lock, Mail, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type Mode = "signin" | "signup";

interface SignInModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.63h6.47c-.28 1.5-1.13 2.77-2.4 3.62v3h3.88c2.27-2.09 3.57-5.17 3.57-8.8Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3.02c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.26v3.12A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.27a7.2 7.2 0 0 1 0-4.54V6.61H1.26a12 12 0 0 0 0 10.78l4.01-3.12Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.34.6 4.59 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.26 6.61l4.01 3.12C6.22 6.88 8.87 4.77 12 4.77Z"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-1.94c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.6.24 2.77.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.07.78 2.16v3.2c0 .3.21.66.79.55A10.75 10.75 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export function SignInModal({ open, onClose }: SignInModalProps) {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const reset = () => {
    setMode("signin");
    setName("");
    setEmail("");
    setPassword("");
    setShowPassword(false);
    setRememberMe(false);
    setErrors({});
    setIsSubmitting(false);
    setSuccess(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 250);
  };

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    // Portals need a browser `document` — this flips true only after the
    // client mounts, avoiding an SSR/hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const switchMode = (next: Mode) => {
    setMode(next);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: FormErrors = {};
    if (mode === "signup" && !name.trim()) nextErrors.name = "Enter your name";
    if (!email.trim()) nextErrors.email = "Enter your email";
    else if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Enter a valid email";
    if (!password) nextErrors.password = "Enter your password";
    else if (password.length < 6) nextErrors.password = "At least 6 characters";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(handleClose, 1300);
    }, 900);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-[#15121f]"
          >
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-black/5 hover:text-neutral-700 dark:hover:bg-white/10 dark:hover:text-neutral-200"
            >
              <X size={16} />
            </button>

            {success ? (
              <div className="flex flex-col items-center px-8 py-14 text-center">
                <motion.span
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10"
                >
                  <CheckCircle2 size={32} />
                </motion.span>
                <h2 className="mt-5 text-lg font-bold text-neutral-900 dark:text-white">
                  {mode === "signin" ? "Welcome back!" : "Account created!"}
                </h2>
                <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
                  You&rsquo;re all set. Redirecting you now&hellip;
                </p>
              </div>
            ) : (
              <div className="p-8">
                <div className="mb-6 text-center">
                  <Image
                    src="/logo-icon.png"
                    alt=""
                    width={278}
                    height={426}
                    className="mx-auto mb-4 h-14 w-auto"
                  />
                  <h2 className="text-xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                    {mode === "signin" ? "Welcome back" : "Create your account"}
                  </h2>
                  <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
                    {mode === "signin"
                      ? "Sign in to save recipes and pick up where you left off."
                      : "Join Savora to save, revisit and personalize your recipes."}
                  </p>
                </div>

                <div className="mb-6 grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:border-black/20 hover:shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-neutral-200 dark:hover:border-white/20"
                  >
                    <GoogleIcon />
                    Google
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:border-black/20 hover:shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-neutral-200 dark:hover:border-white/20"
                  >
                    <GithubIcon />
                    GitHub
                  </button>
                </div>

                <div className="mb-6 flex items-center gap-3">
                  <span className="h-px flex-1 bg-black/5 dark:bg-white/10" />
                  <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500">
                    or continue with email
                  </span>
                  <span className="h-px flex-1 bg-black/5 dark:bg-white/10" />
                </div>

                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                  {mode === "signup" && (
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                        Name
                      </label>
                      <div
                        className={`flex items-center gap-2 rounded-2xl border bg-white px-4 py-3 transition-colors dark:bg-white/5 ${
                          errors.name
                            ? "border-red-300 dark:border-red-500/40"
                            : "border-black/10 focus-within:border-violet-300 dark:border-white/10"
                        }`}
                      >
                        <User size={16} className="shrink-0 text-neutral-400" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          className="min-w-0 flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none dark:text-white dark:placeholder:text-neutral-500"
                        />
                      </div>
                      {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
                    </div>
                  )}

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                      Email
                    </label>
                    <div
                      className={`flex items-center gap-2 rounded-2xl border bg-white px-4 py-3 transition-colors dark:bg-white/5 ${
                        errors.email
                          ? "border-red-300 dark:border-red-500/40"
                          : "border-black/10 focus-within:border-violet-300 dark:border-white/10"
                      }`}
                    >
                      <Mail size={16} className="shrink-0 text-neutral-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="min-w-0 flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none dark:text-white dark:placeholder:text-neutral-500"
                      />
                    </div>
                    {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                      Password
                    </label>
                    <div
                      className={`flex items-center gap-2 rounded-2xl border bg-white px-4 py-3 transition-colors dark:bg-white/5 ${
                        errors.password
                          ? "border-red-300 dark:border-red-500/40"
                          : "border-black/10 focus-within:border-violet-300 dark:border-white/10"
                      }`}
                    >
                      <Lock size={16} className="shrink-0 text-neutral-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="min-w-0 flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none dark:text-white dark:placeholder:text-neutral-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="shrink-0 text-neutral-400 transition-colors hover:text-violet-600"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {errors.password && <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>}
                  </div>

                  {mode === "signin" && (
                    <div className="flex items-center justify-between text-xs">
                      <label className="flex items-center gap-1.5 font-medium text-neutral-600 dark:text-neutral-400">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="h-3.5 w-3.5 rounded border-black/20 text-violet-600 focus:ring-violet-400 dark:border-white/20"
                        />
                        Remember me
                      </label>
                      <button
                        type="button"
                        className="font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  <Button type="submit" size="lg" disabled={isSubmitting} className="mt-1 w-full">
                    {isSubmitting ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : mode === "signin" ? (
                      "Sign In"
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>

                <p className="mt-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
                  {mode === "signin" ? (
                    <>
                      Don&rsquo;t have an account?{" "}
                      <button
                        type="button"
                        onClick={() => switchMode("signup")}
                        className="font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
                      >
                        Sign up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => switchMode("signin")}
                        className="font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
                      >
                        Sign in
                      </button>
                    </>
                  )}
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
