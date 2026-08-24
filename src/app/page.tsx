import { exercises } from "@/lib/exercises";
import { ExerciseCard } from "@/components/exercise-card";
import { Hero } from "@/components/hero";

export default function HomePage() {
  return (
    <>
      <Hero />

      <div className="mx-auto max-w-5xl px-5">
        <section className="py-14">
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
