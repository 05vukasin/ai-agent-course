import type { ReactNode } from "react";
import { Info, TriangleAlert, Lightbulb } from "lucide-react";

type CalloutProps = {
  /** "info" (podrazumevano) | "warn" | "tip" */
  tip?: "info" | "warn" | "tip";
  children: ReactNode;
};

const STYLES = {
  info: {
    Icon: Info,
    box: "border-border bg-surface/70",
    icon: "text-muted",
  },
  warn: {
    Icon: TriangleAlert,
    box: "border-accent/30 bg-accent-soft",
    icon: "text-accent",
  },
  tip: {
    Icon: Lightbulb,
    box: "border-border bg-surface/70",
    icon: "text-accent",
  },
} as const;

/** Napomena / upozorenje / savet. */
export function Callout({ tip = "info", children }: CalloutProps) {
  const { Icon, box, icon } = STYLES[tip];
  return (
    <div className={`my-6 flex gap-3 rounded-xl border p-4 ${box}`}>
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${icon}`} />
      <div className="[&>p:first-child]:mt-0 [&>p:last-child]:mb-0 text-sm leading-6">
        {children}
      </div>
    </div>
  );
}
