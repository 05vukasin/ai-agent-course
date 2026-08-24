import Image from "next/image";

import heroBg from "./hero-bg.jpg";

export function Hero() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#070b14]">
      {/* Pozadinska slika */}
      <Image
        src={heroBg}
        alt=""
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Tamni slojevi za čitljivost teksta (malo blaži) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#070b14] via-[#070b14]/55 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/80 via-transparent to-[#070b14]/25" />
      {/* Suptilna vinjeta ivica */}
      <div className="absolute inset-0 shadow-[inset_0_0_120px_30px_rgba(0,0,0,0.45)]" />

      {/* Sadržaj */}
      <div className="relative mx-auto flex min-h-[380px] max-w-5xl flex-col justify-center px-5 py-16 sm:min-h-[440px] sm:py-20">
        <div className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
          <span className="h-px w-8 bg-accent" />
          Praktične vežbe
        </div>

        <h1 className="text-5xl font-black uppercase leading-[0.92] tracking-tight text-white sm:text-7xl [text-shadow:0_2px_30px_rgba(0,0,0,0.5)]">
          Nauči da praviš
          <span className="mt-1 block bg-gradient-to-r from-accent to-[#f0a878] bg-clip-text text-transparent">
            AI agente
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
          Svaka vežba te vodi korak po korak — šta agent radi, kako pomaže, i
          tačni koraci sa promptovima i slikama.
        </p>
      </div>
    </section>
  );
}
