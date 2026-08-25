import type { ExerciseMeta } from "@/lib/types";

import banner from "./images/banner.png";

export const meta: ExerciseMeta = {
  slug: "crm-update",
  title: "Agent za CRM update (posle sastanka)",
  summary:
    "Iz beleški ili mejl-threada sa sastanka izvuče kontakt, temu, fazu deala i sledeći korak, pa upiše ili ažurira red u CRM-u.",
  tags: ["Notion", "Gmail", "Scheduled tasks"],
  // Kartica u galeriji koristi isti baner kao i vrh stranice.
  cover: banner,
  banner,
};
