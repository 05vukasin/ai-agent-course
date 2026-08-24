import Image, { type StaticImageData } from "next/image";

/** Full-width baner na vrhu vežbe. `banner === null` -> suptilan placeholder. */
export function ExerciseBanner({
  banner,
  title,
}: {
  banner: StaticImageData | null;
  title: string;
}) {
  if (!banner) {
    return (
      <div className="relative aspect-[1000/300] w-full overflow-hidden bg-gradient-to-br from-accent-soft via-surface to-surface">
        <div className="absolute inset-0 grid place-items-center">
          <span className="text-sm text-muted">baner uskoro</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden bg-surface">
      <Image
        src={banner}
        alt={title}
        className="h-auto w-full"
        sizes="100vw"
        priority
        placeholder="blur"
      />
    </div>
  );
}
