import type { ComponentType } from "react";

import type { ExerciseMeta } from "@/lib/types";

// --- Registrovane vežbe ---------------------------------------------------
// DODAVANJE NOVE VEŽBE = importuj njen meta + content i dodaj stavku u `exercises`.
import { meta as newsletterMeta } from "@/content/exercises/newsletter-agent/meta";
import NewsletterContent from "@/content/exercises/newsletter-agent/content.mdx";

import { meta as zakazivanjeMeta } from "@/content/exercises/zakazivanje-sastanaka/meta";
import ZakazivanjeContent from "@/content/exercises/zakazivanje-sastanaka/content.mdx";

import { meta as crmMeta } from "@/content/exercises/crm-update/meta";
import CrmContent from "@/content/exercises/crm-update/content.mdx";

import { meta as leadMeta } from "@/content/exercises/lead-kvalifikacija/meta";
import LeadContent from "@/content/exercises/lead-kvalifikacija/content.mdx";

import { meta as followUpMeta } from "@/content/exercises/follow-up-nudger/meta";
import FollowUpContent from "@/content/exercises/follow-up-nudger/content.mdx";

import { meta as meetingPrepMeta } from "@/content/exercises/meeting-prep/meta";
import MeetingPrepContent from "@/content/exercises/meeting-prep/content.mdx";

import { meta as konkurencijaMeta } from "@/content/exercises/analiza-konkurencije/meta";
import KonkurencijaContent from "@/content/exercises/analiza-konkurencije/content.mdx";
// -------------------------------------------------------------------------

export type Exercise = ExerciseMeta & {
  /** MDX telo vežbe (renderuje se na /vezbe/<slug>) */
  Content: ComponentType;
};

export const exercises: Exercise[] = [
  { ...newsletterMeta, Content: NewsletterContent },
  { ...zakazivanjeMeta, Content: ZakazivanjeContent },
  { ...crmMeta, Content: CrmContent },
  { ...leadMeta, Content: LeadContent },
  { ...followUpMeta, Content: FollowUpContent },
  { ...meetingPrepMeta, Content: MeetingPrepContent },
  { ...konkurencijaMeta, Content: KonkurencijaContent },
];

export function getExercise(slug: string): Exercise | undefined {
  return exercises.find((exercise) => exercise.slug === slug);
}
