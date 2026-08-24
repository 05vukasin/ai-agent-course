import type { ComponentType } from "react";

import type { ExerciseMeta } from "@/lib/types";

// --- Registrovane vežbe ---------------------------------------------------
// DODAVANJE NOVE VEŽBE = importuj njen meta + content i dodaj stavku u `exercises`.
import { meta as newsletterMeta } from "@/content/exercises/newsletter-agent/meta";
import NewsletterContent from "@/content/exercises/newsletter-agent/content.mdx";
// -------------------------------------------------------------------------

export type Exercise = ExerciseMeta & {
  /** MDX telo vežbe (renderuje se na /vezbe/<slug>) */
  Content: ComponentType;
};

export const exercises: Exercise[] = [
  { ...newsletterMeta, Content: NewsletterContent },
];

export function getExercise(slug: string): Exercise | undefined {
  return exercises.find((exercise) => exercise.slug === slug);
}
