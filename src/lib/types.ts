import type { StaticImageData } from "next/image";
import type { LucideIcon } from "lucide-react";

/** Metapodaci jedne lekcije (definišu se u `content/lessons/<slug>/meta.ts`). */
export type LessonMeta = {
  /** URL segment: /lekcije/<slug> */
  slug: string;
  /** Naslov lekcije */
  title: string;
  /** Mali podtekst na kartici */
  subtitle: string;
  /** React ikonica (lucide-react) za karticu i zaglavlje */
  icon: LucideIcon;
};

/** Metapodaci jedne vežbe (definišu se u `content/exercises/<slug>/meta.ts`). */
export type ExerciseMeta = {
  /** URL segment: /vezbe/<slug> */
  slug: string;
  /** Naslov vežbe */
  title: string;
  /** Jedna rečenica — šta agent radi (kartica u galeriji + intro) */
  summary: string;
  /** Kratki tagovi alata/veština */
  tags: string[];
  /** Cover slika za karticu u galeriji (statični import) */
  cover: StaticImageData;
  /** Full-width baner na vrhu stranice; `null` -> placeholder baner */
  banner: StaticImageData | null;
};
