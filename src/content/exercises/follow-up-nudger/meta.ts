import type { ExerciseMeta } from "@/lib/types";

import banner from "./images/banner.png";

export const meta: ExerciseMeta = {
  slug: "follow-up-nudger",
  title: "Follow-up nudger (buđenje dealova)",
  summary:
    "Svake nedelje nađe dealove bez kontakta duže od X dana i napiše personalizovane follow-up mejlove kao draftove — čovek samo pošalje.",
  tags: ["Notion", "Gmail", "Scheduled tasks"],
  cover: banner,
  banner,
};
