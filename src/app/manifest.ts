import type { MetadataRoute } from "next";

// Neophodno za `output: export` (statičan manifest.webmanifest).
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AI Agent Kurs — Vežbe",
    short_name: "AI Agent Kurs",
    description:
      "Galerija praktičnih vežbi za pravljenje AI agenata — korak po korak.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
