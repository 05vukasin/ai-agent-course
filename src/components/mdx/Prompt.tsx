"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

type PromptProps = {
  /** Tačan tekst prompta (koristi template literal da sačuvaš prelome redova) */
  text: string;
  /** Labela iznad bloka */
  label?: string;
};

export function Prompt({ text, label = "Prompt — kopiraj" }: PromptProps) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="my-6">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent">
        {label}
      </div>
      <div className="relative rounded-xl border border-border bg-surface">
        <button
          type="button"
          onClick={copy}
          className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md border border-border bg-bg px-2.5 py-1.5 text-xs font-medium text-muted transition hover:border-accent hover:text-accent"
          aria-label="Kopiraj prompt"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" /> Kopirano
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" /> Kopiraj
            </>
          )}
        </button>
        <pre className="overflow-x-auto px-4 py-4 pr-24 font-mono text-[0.82rem] leading-relaxed text-ink">
          {text}
        </pre>
      </div>
    </div>
  );
}
