import type { ExerciseMeta } from "@/lib/types";

import banner from "./images/banner.png";

export const meta: ExerciseMeta = {
  slug: "newsletter-agent",
  title: "Autonomni Newsletter Agent",
  summary:
    "Agent koji svake nedelje sam istraži vesti, napiše newsletter u brend-tonu, popuni vizuelni šablon i ostavi gotov draft u Gmail-u.",
  tags: ["Scheduled tasks", "Gmail", "Claude Design", "Web research"],
  // Kartica u galeriji koristi isti baner kao i vrh stranice.
  cover: banner,
  banner,
};
