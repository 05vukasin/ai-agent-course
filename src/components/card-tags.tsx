"use client";

import { useLayoutEffect, useRef, useState } from "react";

const CHIP =
  "shrink-0 whitespace-nowrap rounded-full border border-border px-2.5 py-0.5 text-xs text-muted";
const GAP = 6; // gap-1.5 = 0.375rem

/**
 * Tagovi u jednom redu. Ako svi ne stanu u širinu kartice, prikaže onoliko
 * koliko stane + „+N" za ostatak (umesto da se prelome u nove redove).
 */
export function CardTags({ tags }: { tags: string[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(tags.length);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const measure = measureRef.current;
    if (!wrap || !measure) return;

    const chipWidths = Array.from(
      measure.querySelectorAll<HTMLElement>("[data-tag]"),
    ).map((el) => el.offsetWidth);
    const plusEl = measure.querySelector<HTMLElement>("[data-plus]");
    const plusWidth = plusEl ? plusEl.offsetWidth : 0;

    function compute() {
      const width = wrap!.clientWidth;
      if (width === 0) return;

      // Da li svi tagovi stanu?
      const totalAll = chipWidths.reduce(
        (sum, w, i) => sum + w + (i > 0 ? GAP : 0),
        0,
      );
      if (totalAll <= width) {
        setVisible(tags.length);
        return;
      }

      // Ne staju svi -> ostavi mesta za „+N" čip.
      let used = 0;
      let count = 0;
      for (let i = 0; i < chipWidths.length; i++) {
        const need = used + (count > 0 ? GAP : 0) + chipWidths[i];
        if (need + GAP + plusWidth <= width) {
          used = need;
          count++;
        } else {
          break;
        }
      }
      setVisible(Math.max(1, count));
    }

    compute();
    const observer = new ResizeObserver(compute);
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [tags]);

  const remaining = tags.length - visible;

  return (
    <div ref={wrapRef} className="relative mt-4">
      {/* Skriveno merenje na prirodnoj širini */}
      <div
        ref={measureRef}
        aria-hidden
        className="pointer-events-none invisible absolute left-0 top-0 flex gap-1.5"
      >
        {tags.map((tag) => (
          <span key={tag} data-tag className={CHIP}>
            {tag}
          </span>
        ))}
        <span data-plus className={CHIP}>
          +{tags.length}
        </span>
      </div>

      {/* Vidljivi red */}
      <div className="flex gap-1.5 overflow-hidden">
        {tags.slice(0, visible).map((tag) => (
          <span key={tag} className={CHIP}>
            {tag}
          </span>
        ))}
        {remaining > 0 ? <span className={CHIP}>+{remaining}</span> : null}
      </div>
    </div>
  );
}
