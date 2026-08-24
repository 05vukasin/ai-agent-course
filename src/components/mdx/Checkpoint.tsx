import type { ReactNode } from "react";
import { CircleCheck } from "lucide-react";

type CheckpointProps = {
  naslov?: string;
  children: ReactNode;
};

/** Checkpoint — lista uslova "gotovo kad…". */
export function Checkpoint({ naslov = "Checkpoint", children }: CheckpointProps) {
  return (
    <div className="my-8 rounded-xl border border-border bg-bg p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="mb-3 flex items-center gap-2 font-semibold">
        <CircleCheck className="h-5 w-5 text-accent" />
        {naslov}
      </div>
      <div className="[&_ul]:my-0 [&_ul]:list-none [&_ul]:space-y-2 [&_ul]:pl-0 [&_li]:relative [&_li]:pl-7 [&_li]:leading-6 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-0 [&_li]:before:text-accent [&_li]:before:content-['☐']">
        {children}
      </div>
    </div>
  );
}
