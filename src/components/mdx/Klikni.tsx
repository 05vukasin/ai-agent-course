import type { ReactNode } from "react";
import { MousePointerClick } from "lucide-react";

type KlikniProps = {
  naslov?: string;
  children: ReactNode;
};

/** "Klik po klik" box — numerisani koraci klikanja kroz UI. */
export function Klikni({ naslov = "Klik po klik", children }: KlikniProps) {
  return (
    <div className="my-6 rounded-xl border border-border bg-surface/60 p-5">
      <div className="mb-1 flex items-center gap-2 text-sm font-semibold">
        <MousePointerClick className="h-4 w-4 text-accent" />
        {naslov}
      </div>
      <div className="[&_ol]:my-2 [&_ol]:space-y-1.5 [&_li]:leading-6">
        {children}
      </div>
    </div>
  );
}
