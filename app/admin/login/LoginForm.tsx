"use client";

import { useState } from "react";

export default function LoginForm({
  next,
  error,
}: {
  next?: string;
  error?: string;
}) {
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [clientError, setClientError] = useState<string | null>(error || null);

  return (
    <form
      method="POST"
      action="/api/admin/login"
      onSubmit={async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setClientError(null);
        try {
          const res = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password, next }),
          });
          const data = await res.json().catch(() => ({}));
          if (res.ok && data.next) {
            window.location.href = data.next;
            return;
          }
          setClientError(data.error || "Sign in failed.");
        } catch {
          setClientError("Network error. Try again.");
        } finally {
          setSubmitting(false);
        }
      }}
      className="mt-8 flex flex-col gap-4"
    >
      <label className="block">
        <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-eyebrow text-cream/80">
          Password
        </span>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          autoFocus
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full rounded-sm border border-cream/20 bg-charcoal/40 px-4 py-3 text-cream placeholder:text-cream/40 focus:border-cream/60 focus:bg-charcoal/60 focus:outline-none"
        />
      </label>
      {clientError && (
        <p
          role="alert"
          className="rounded-sm border border-red-400/40 bg-red-900/20 px-3 py-2 text-sm text-red-200"
        >
          {clientError}
        </p>
      )}
      <button
        type="submit"
        disabled={submitting || !password}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-sm bg-cream px-7 py-3.5 text-[11px] font-medium uppercase tracking-button text-charcoal transition-all hover:-translate-y-0.5 hover:bg-paper disabled:cursor-wait disabled:opacity-60"
      >
        {submitting ? "Signing in…" : "Sign in"}
      </button>
      <p className="mt-3 text-center text-[11px] text-cream/50">
        Sessions last 30 days.
      </p>
    </form>
  );
}
