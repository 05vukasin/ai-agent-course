import type { ExerciseMeta } from "@/lib/types";

import banner from "./images/banner.png";

export const meta: ExerciseMeta = {
  slug: "lead-kvalifikacija",
  title: "Agent za kvalifikaciju leada",
  summary:
    "Za novog leada istraži firmu na webu, oceni koliko odgovara vašem idealnom klijentu (ICP) i predloži pristup, pa to upiše u CRM.",
  tags: ["Web research", "Notion", "Scheduled tasks"],
  // Kartica u galeriji koristi isti baner kao i vrh stranice.
  cover: banner,
  banner,
};
