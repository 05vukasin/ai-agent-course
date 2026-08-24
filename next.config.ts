import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Statičan sajt — export u `out/`, hostuje se bilo gde (Vercel ga detektuje sam).
  output: "export",
  images: { unoptimized: true },
  // Dozvoli .mdx stranice/sadržaj pored .ts/.tsx.
  pageExtensions: ["ts", "tsx", "mdx"],
  // Zaključaj koren na ovaj projekat (ignoriši lockfile-ove u roditeljskim folderima).
  turbopack: { root: fileURLToPath(new URL(".", import.meta.url)) },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
