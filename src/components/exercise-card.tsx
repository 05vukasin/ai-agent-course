import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import type { Exercise } from "@/lib/exercises";
import { CardTags } from "@/components/card-tags";

export function ExerciseCard({ exercise }: { exercise: Exercise }) {
  return (
    <Link
      href={`/vezbe/${exercise.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-bg transition hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-surface">
        <Image
          src={exercise.cover}
          alt={exercise.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 420px"
          placeholder="blur"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold tracking-tight">
            {exercise.title}
          </h3>
          <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-faint transition group-hover:text-accent" />
        </div>
        <p className="text-sm leading-6 text-muted">{exercise.summary}</p>
        <CardTags tags={exercise.tags} />
      </div>
    </Link>
  );
}
