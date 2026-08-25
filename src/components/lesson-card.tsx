import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Lesson } from "@/lib/lessons";

export function LessonCard({
  lesson,
  index,
}: {
  lesson: Lesson;
  index: number;
}) {
  const Icon = lesson.icon;
  return (
    <Link
      href={`/lekcije/${lesson.slug}`}
      className="group relative flex flex-col rounded-2xl border border-border bg-bg p-6 transition hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
    >
      <ArrowUpRight className="absolute right-5 top-5 h-4 w-4 text-faint transition group-hover:text-accent" />
      <span className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-accent-soft text-accent-ink">
        <Icon className="h-6 w-6" />
      </span>
      <span className="text-xs font-medium text-faint">Lekcija {index + 1}</span>
      <h3 className="mt-0.5 text-base font-semibold tracking-tight">
        {lesson.title}
      </h3>
      <p className="mt-1 text-sm leading-6 text-muted">{lesson.subtitle}</p>
    </Link>
  );
}
