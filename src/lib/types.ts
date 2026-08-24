import type { StaticImageData } from "next/image";

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
