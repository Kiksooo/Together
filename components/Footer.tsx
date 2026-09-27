import Link from "next/link";

const links = [
  { label: "About", href: "/about" },
  { label: "HUG", href: "/hug" },
  { label: "Memorial Sculptures", href: "/memorial-sculptures" },
  { label: "Cremation Urns", href: "/cremation-urns" },
  { label: "FAQ", href: "/faq" },
] as const;

export default function Footer() {
  return (
    <footer className="bg-stone text-ink-muted">
      <div className="mx-auto flex max-w-[100vw] flex-col px-6 pt-1 pb-8 md:px-[8vw] md:pb-10">
        <p className="font-sans text-[9px] font-light tracking-[0.16em]">
          TOGETHER
        </p>

        <nav
          aria-label="Footer"
          className="mt-4 flex flex-row flex-nowrap items-baseline gap-x-4 sm:gap-x-6 md:mt-5 md:gap-x-8"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap font-sans text-[9px] font-light leading-none text-ink-muted transition-colors duration-500 hover:text-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink/40"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="mt-5 font-sans text-[9px] font-light leading-none md:mt-6">
          © 2026 TOGETHER
        </p>
      </div>
    </footer>
  );
}
