import type { ExerciseMeta } from "@/lib/types";

import cover from "./images/cover.png";
// Kad dodaš baner, odkomentariši sledeću liniju i postavi `banner` ispod:
// import banner from "./images/banner.png";

export const meta: ExerciseMeta = {
  // URL vežbe -> /vezbe/<slug> (mora da bude jednak imenu foldera)
  slug: "moja-vezba",
  title: "Naslov vežbe",
  summary: "Jedna rečenica — šta agent radi i kako pomaže.",
  tags: ["Alat 1", "Alat 2"],
  cover,
  banner: null, // ili: banner
};
