import Link from "next/link";
import Footer from "@/components/Footer";

export function EditorialPage({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-stone text-ink">
      <header className="px-6 pt-8 md:px-[8vw] md:pt-10">
        <Link
          href="/"
          aria-label="TOGETHER home"
          className="font-sans text-[10px] font-normal uppercase tracking-[0.32em] text-ink transition-opacity duration-700 hover:opacity-50"
        >
          TOGETHER
        </Link>
      </header>

      <main className="px-6 pb-[14vh] pt-[12vh] md:px-[8vw] md:pb-[16vh] md:pt-[14vh]">
        <p className="font-sans text-[9px] uppercase tracking-[0.42em] text-ink-faint md:text-[10px]">
          {eyebrow}
        </p>
        <h1 className="mt-8 max-w-[12em] font-serif text-[clamp(2.35rem,6.2vw,4.6rem)] font-light leading-[0.94] tracking-[-0.035em] text-ink md:mt-12 md:max-w-[14em]">
          {title}
        </h1>
        <div className="mt-14 max-w-[40rem] md:mt-20 [&>section:first-child]:mt-0">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 font-sans text-[13px] font-light leading-[1.9] tracking-[0.02em] text-ink-muted first:mt-0 md:text-[14px]">
      {children}
    </p>
  );
}

const chapterHeadingClass =
  "max-w-[22ch] font-serif text-[clamp(1.65rem,3vw,2.3rem)] font-light leading-[1.15] tracking-[-0.03em] text-ink";

export function Chapter({
  title,
  level = 2,
  children,
}: {
  title: string;
  level?: 2 | 3;
  children: React.ReactNode;
}) {
  const Heading = level === 3 ? "h3" : "h2";

  return (
    <section className="mt-20 md:mt-28">
      <Heading className={chapterHeadingClass}>{title}</Heading>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function TextLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-ink underline decoration-ink/25 underline-offset-[0.28em] transition-colors duration-500 hover:decoration-ink/70"
    >
      {children}
    </Link>
  );
}

export function PreorderLink() {
  return (
    <Link
      href="/#price-heading"
      className="group mt-10 inline-flex w-fit flex-col font-sans text-[10px] uppercase tracking-[0.34em] text-ink"
    >
      PRE-ORDER HUG →
      <span
        aria-hidden="true"
        className="mt-3 block h-px w-8 bg-ink/35 transition-all duration-700 ease-out group-hover:w-full group-hover:bg-ink/70"
      />
    </Link>
  );
}
