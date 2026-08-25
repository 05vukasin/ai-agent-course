import type { ComponentType } from "react";

import type { LessonMeta } from "@/lib/types";

// --- Registrovane lekcije -------------------------------------------------
// DODAVANJE NOVE LEKCIJE = importuj njen meta + content i dodaj stavku u `lessons`.
import { meta as skillsMeta } from "@/content/lessons/skills/meta";
import SkillsContent from "@/content/lessons/skills/content.mdx";

import { meta as connectorsMeta } from "@/content/lessons/connectors/meta";
import ConnectorsContent from "@/content/lessons/connectors/content.mdx";

import { meta as scheduledMeta } from "@/content/lessons/scheduled-tasks/meta";
import ScheduledContent from "@/content/lessons/scheduled-tasks/content.mdx";
// -------------------------------------------------------------------------

export type Lesson = LessonMeta & {
  /** MDX telo lekcije (renderuje se na /lekcije/<slug>) */
  Content: ComponentType;
};

export const lessons: Lesson[] = [
  { ...skillsMeta, Content: SkillsContent },
  { ...connectorsMeta, Content: ConnectorsContent },
  { ...scheduledMeta, Content: ScheduledContent },
];

export function getLesson(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}
