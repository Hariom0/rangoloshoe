"use client";

import { useTransition } from "react";
import { Lock, User, Loader2, AlertCircle } from "lucide-react";

interface LoginFormProps {
  errorParam?: string;
  // We pass the server action securely down as a prop
  loginAction: (formData: FormData) => Promise<void>;
}

export function LoginForm({ errorParam, loginAction }: LoginFormProps) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      try {
        await loginAction(formData);
      } catch (err) {
        // Next.js redirect errors are expected to bubble up to the framework container
        throw err;
      }
    });
  };

  return (
    <div className="w-full max-w-md p-6 sm:p-8 bg-white/60 backdrop-blur-md rounded-2xl border border-primary/10 shadow-xl shadow-primary/5">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-headline text-3xl italic text-foreground tracking-tight mb-2">
          Young Fashion 
        </h1>
        <p className="font-body text-xs text-muted-foreground uppercase tracking-widest">
          Admin Portal
        </p>
      </div>

      {/* Error Alert Box */}
      {errorParam && !isPending && (
        <div className="flex items-center gap-2 p-3.5 mb-6 rounded-xl bg-red-50 text-red-700 border border-red-100 text-sm animate-fade-in">
          <AlertCircle size={16} className="shrink-0" />
          <p>Invalid username or password.</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Username input container */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium uppercase tracking-wider text-foreground/70">
            Username
          </label>
          <div className="relative group">
            <User 
              size={18} 
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40 transition-colors group-focus-within:text-primary" 
            />
            <input
              name="username"
              type="text"
              placeholder="Enter your username"
              required
              disabled={isPending}
              className="w-full h-11 pl-11 pr-4 rounded-xl border border-border bg-white text-sm outline-none transition-all placeholder:text-foreground/30 focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:opacity-50"
            />
          </div>
        </div>

        {/* Password input container */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium uppercase tracking-wider text-foreground/70">
            Password
          </label>
          <div className="relative group">
            <Lock 
              size={18} 
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40 transition-colors group-focus-within:text-primary" 
            />
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              required
              disabled={isPending}
              className="w-full h-11 pl-11 pr-4 rounded-xl border border-border bg-white text-sm outline-none transition-all placeholder:text-foreground/30 focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:opacity-50"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="relative w-full h-12 mt-2 bg-primary text-white font-semibold rounded-xl text-sm transition-all duration-300 shadow-md shadow-primary/10 hover:bg-primary/95 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center"
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              <span>Authenticating...</span>
            </div>
          ) : (
            <span>Sign In</span>
          )}
        </button>
      </form>
    </div>
  );
}