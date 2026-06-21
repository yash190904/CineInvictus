"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Something went wrong. Please try again.");

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-[var(--color-accent)] bg-[var(--color-surface)] p-8 text-center"
      >
        <p className="font-display text-2xl text-[var(--color-ink)]">Message sent</p>
        <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
          Thanks for reaching out — I&apos;ll get back to you within a day or two.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="font-mono text-xs uppercase tracking-wide text-[var(--color-ink-faint)]">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-accent)]"
        />
      </div>

      <div>
        <label htmlFor="email" className="font-mono text-xs uppercase tracking-wide text-[var(--color-ink-faint)]">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-accent)]"
        />
      </div>

      <div>
        <label htmlFor="message" className="font-mono text-xs uppercase tracking-wide text-[var(--color-ink-faint)]">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-accent)]"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-[var(--color-accent)]">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-[var(--color-accent)] px-6 py-3 font-mono text-sm uppercase tracking-wide text-[var(--color-on-accent)] transition-colors hover:bg-[var(--color-accent-dim)] disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
