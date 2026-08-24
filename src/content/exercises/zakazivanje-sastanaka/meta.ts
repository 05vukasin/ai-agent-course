import type { ExerciseMeta } from "@/lib/types";

import banner from "./images/banner.png";

export const meta: ExerciseMeta = {
  slug: "zakazivanje-sastanaka",
  title: "Agent za zakazivanje sastanaka",
  summary:
    "Iz dolaznog mejla prepozna zahtev za sastanak, proveri slobodne termine u kalendaru, ponudi termine i po potvrdi napravi događaj.",
  tags: ["Gmail", "Google Calendar", "Scheduled tasks"],
  // Kartica u galeriji koristi isti baner kao i vrh stranice.
  cover: banner,
  banner,
};
