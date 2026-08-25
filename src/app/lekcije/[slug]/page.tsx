import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

import { lessons, getLesson } from "@/lib/lessons";

export function generateStaticParams() {
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) return {};
  return { title: lesson.title, description: lesson.subtitle };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  const { Content, title, subtitle, icon: Icon } = lesson;

  return (
    <article className="mx-auto max-w-[760px] px-5 pb-24">
      <div className="pt-6">
        <Link
          href="/#lekcije"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" /> Sve lekcije
        </Link>
      </div>

      <header className="mt-6 border-b border-border pb-8">
        <span className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-accent-soft text-accent-ink">
          <Icon className="h-7 w-7" />
        </span>
        <p className="mb-2 text-sm font-medium text-accent">Lekcija</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted">{subtitle}</p>
      </header>

      <div className="mt-2">
        <Content />
      </div>
    </article>
  );
}
