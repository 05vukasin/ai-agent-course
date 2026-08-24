import Image, { type StaticImageData } from "next/image";

type SlikaProps = {
  /** Statični import slike: import s from "./images/x.png" */
  src: StaticImageData;
  /** Opis ispod slike */
  caption?: string;
  /** Alt tekst (pristupačnost); default = caption */
  alt?: string;
};

/** Slika sa opisom (figure). */
export function Slika({ src, caption, alt }: SlikaProps) {
  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt ?? caption ?? ""}
        className="w-full rounded-xl border border-border"
        sizes="(max-width: 768px) 100vw, 760px"
        placeholder="blur"
      />
      {caption ? (
        <figcaption className="mt-2 text-center text-sm text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
