import type { MDXComponents } from "mdx/types";

import { Prompt } from "@/components/mdx/Prompt";
import { Klikni } from "@/components/mdx/Klikni";
import { Checkpoint } from "@/components/mdx/Checkpoint";
import { Callout } from "@/components/mdx/Callout";
import { Slika } from "@/components/mdx/Slika";
import { Blueprint } from "@/components/mdx/Blueprint";
import { Korak } from "@/components/mdx/Korak";

// Next konvencija: globalni mapping komponenti za sve .mdx fajlove.
// Custom komponente su ovde izložene globalno -> u MDX-u ih NE treba importovati
// (importuju se samo slike). Osnovni HTML elementi su stilizovani da MDX bude čist.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom komponente vežbi
    Prompt,
    Klikni,
    Checkpoint,
    Callout,
    Slika,
    Blueprint,
    Korak,

    // Osnovni elementi
    h2: (props) => (
      <h2
        className="mt-14 mb-4 scroll-mt-24 text-2xl font-semibold tracking-tight"
        {...props}
      />
    ),
    h3: (props) => (
      <h3 className="mt-10 mb-3 text-lg font-semibold tracking-tight" {...props} />
    ),
    h4: (props) => <h4 className="mt-6 mb-2 font-semibold" {...props} />,
    p: (props) => <p className="my-4 leading-7 text-ink/90" {...props} />,
    ul: (props) => (
      <ul className="my-4 list-disc space-y-2 pl-6 leading-7 text-ink/90" {...props} />
    ),
    ol: (props) => (
      <ol className="my-4 list-decimal space-y-2 pl-6 leading-7 text-ink/90" {...props} />
    ),
    li: (props) => <li className="pl-1" {...props} />,
    a: (props) => (
      <a
        className="text-accent underline decoration-accent/30 underline-offset-2 transition hover:decoration-accent"
        {...props}
      />
    ),
    strong: (props) => <strong className="font-semibold text-ink" {...props} />,
    code: (props) => (
      <code
        className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-accent-ink"
        {...props}
      />
    ),
    hr: () => <hr className="my-12 border-border" />,
    table: (props) => (
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm" {...props} />
      </div>
    ),
    th: (props) => (
      <th
        className="border border-border bg-surface px-3 py-2 text-left font-semibold"
        {...props}
      />
    ),
    td: (props) => (
      <td className="border border-border px-3 py-2 align-top" {...props} />
    ),

    ...components,
  };
}
