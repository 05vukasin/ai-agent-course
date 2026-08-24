import Link from "next/link";
import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
        <Link href="/" className="group flex items-center gap-2">
          <Image
            src="/logo.png"
            alt=""
            width={30}
            height={29}
            className="h-7 w-auto transition group-hover:scale-105"
            priority
          />
          <span className="text-sm font-semibold tracking-tight">
            AI Agent Kurs
          </span>
        </Link>
        <Link
          href="/"
          className="text-sm text-muted transition hover:text-ink"
        >
          Vežbe
        </Link>
      </div>
    </header>
  );
}
