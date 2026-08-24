import type { ReactNode } from "react";

type KorakProps = {
  broj: number;
  naslov: string;
  children: ReactNode;
};

/** Zaglavlje jednog koraka (akcent-broj + naslov) + sadržaj koraka. */
export function Korak({ broj, naslov, children }: KorakProps) {
  return (
    <section className="mt-12 scroll-mt-24">
      <div className="flex items-center gap-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent-soft text-sm font-bold text-accent-ink">
          {broj}
        </span>
        <h3 className="text-lg font-semibold tracking-tight">{naslov}</h3>
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}
