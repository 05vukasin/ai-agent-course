import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

import { exercises, getExercise } from "@/lib/exercises";
import { ExerciseBanner } from "@/components/exercise-banner";

export function generateStaticParams() {
  return exercises.map((exercise) => ({ slug: exercise.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exercise = getExercise(slug);
  if (!exercise) return {};
  return { title: exercise.title, description: exercise.summary };
}

export default async function ExercisePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exercise = getExercise(slug);
  if (!exercise) notFound();

  const { Content, title, summary, tags, banner } = exercise;

  return (
    <article>
      <ExerciseBanner banner={banner} title={title} />

      <div className="mx-auto max-w-[760px] px-5 pb-24">
        <div className="pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" /> Sve vežbe
          </Link>
        </div>

        {/* Naslov + šta agent radi */}
        <header className="mt-6 border-b border-border pb-8">
          <div className="mb-4 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted">{summary}</p>
        </header>

        {/* Telo vežbe (MDX) */}
        <div className="mt-2">
          <Content />
        </div>
      </div>
    </article>
  );
}
