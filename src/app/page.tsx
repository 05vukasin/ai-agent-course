import { exercises } from "@/lib/exercises";
import { lessons } from "@/lib/lessons";
import { ExerciseCard } from "@/components/exercise-card";
import { LessonCard } from "@/components/lesson-card";
import { SectionHeading } from "@/components/section-heading";
import { Hero } from "@/components/hero";

export default function HomePage() {
  return (
    <>
      <Hero />

      <div className="mx-auto max-w-5xl px-5">
        {/* Lekcije */}
        <section id="lekcije" className="scroll-mt-20 pt-14">
          <SectionHeading
            eyebrow="Osnove"
            title="Lekcije"
            subtitle="Tri gradivna bloka svakog agenta — savladaj ih pre vežbi."
          />
          <div className="grid gap-5 sm:grid-cols-3">
            {lessons.map((lesson, index) => (
              <LessonCard key={lesson.slug} lesson={lesson} index={index} />
            ))}
          </div>
        </section>

        {/* Vežbe */}
        <section id="vezbe" className="scroll-mt-20 py-14">
          <SectionHeading
            eyebrow="Praksa"
            title="Vežbe"
            subtitle="Napravi konkretne agente korak po korak."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {exercises.map((exercise) => (
              <ExerciseCard key={exercise.slug} exercise={exercise} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
