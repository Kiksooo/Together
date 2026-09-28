import type { Metadata } from "next";

const PRODUCTION_ORIGIN = "https://www.together-memorial.com";

const PRODUCTION_HOSTS = new Set([
  "together-memorial.com",
  "www.together-memorial.com",
]);

function productionFallback(): string | undefined {
  return process.env.NODE_ENV === "production" ? PRODUCTION_ORIGIN : undefined;
}

function hasUriScheme(value: string): boolean {
  // hostname:port is not a scheme, even though it matches scheme syntax.
  if (/^[^/?#:]+:\d{1,5}(?:[/?#]|$)/.test(value)) return false;
  return /^[a-z][a-z\d+.-]*:/i.test(value);
}

function parseAbsoluteHttpUrl(value: string): URL | undefined {
  const candidates = hasUriScheme(value) ? [value] : [value, `https://${value}`];

  for (const candidate of candidates) {
    try {
      const url = new URL(candidate);
      if (url.protocol !== "http:" && url.protocol !== "https:") continue;
      if (!url.hostname) continue;
      return url;
    } catch {
      continue;
    }
  }

  return undefined;
}

export function configuredSiteUrl(): string | undefined {
  const value = process.env.NEXT_PUBLIC_SITE_URL
    ?.trim()
    .replace(/^\uFEFF/, "")
    .replace(/^['"]+|['"]+$/g, "")
    .trim();

  if (!value) return productionFallback();

  const url = parseAbsoluteHttpUrl(value);
  if (!url) return productionFallback();

  const hostname = url.hostname.replace(/\.$/, "").toLowerCase();
  if (PRODUCTION_HOSTS.has(hostname)) return PRODUCTION_ORIGIN;

  return url.origin;
}

const description =
  "TOGETHER creates contemporary memorial sculptures designed around the relationships we never want to lose.";

const hugImage = {
  url: "/images/hug-assembled.png",
  width: 630,
  height: 1024,
  alt: "The two HUG vessels together, forming one composition.",
} as const;

export function organizationJsonLd() {
  const url = configuredSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TOGETHER",
    description,
    ...(url ? { url } : {}),
  };
}

export function hugProductJsonLd() {
  const url = configuredSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "HUG",
    description:
      "HUG is a contemporary memorial sculpture for two. Two individual cremation vessels come together as one object of remembrance. It is in development and pre-launch. The expected retail price is £895 per pair.",
    brand: {
      "@type": "Brand",
      name: "TOGETHER",
    },
    category: "Memorial sculpture",
    ...(url ? { url: `${url}/hug` } : {}),
  };
}

export function pageMetadata(
  title: string,
  pageDescription: string,
  path: string,
): Metadata {
  const base = configuredSiteUrl();
  const canonical = base ? `${base}${path}` : path;
  return {
    title,
    description: pageDescription,
    ...(base ? { metadataBase: new URL(base) } : {}),
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description: pageDescription,
      type: "website",
      siteName: "TOGETHER",
      url: canonical,
      images: [
        {
          ...hugImage,
          url: base ? `${base}${hugImage.url}` : hugImage.url,
        },
      ],
    },
  };
}

export const hugFaqs = [
  {
    question: "What is TOGETHER?",
    answer:
      "TOGETHER is a design-led memorial brand creating contemporary memorial sculptures around the relationships we never want to lose. HUG is the first piece.",
  },
  {
    question: "What is HUG?",
    answer:
      "HUG is a pair of individual memorial vessels that come together to form one sculptural composition.",
  },
  {
    question: "Is HUG a cremation urn?",
    answer:
      "Yes. Each HUG vessel is being designed as an individual cremation vessel. Final technical specifications are currently in development.",
  },
  {
    question: "Is HUG designed for two people?",
    answer:
      "Yes. HUG is designed around two individual people and their connection. Each vessel remains separate while the two can be brought together.",
  },
  {
    question: "What is HUG made from?",
    answer:
      "HUG is being developed in high-fired porcelain. Final production specifications are still being developed.",
  },
  {
    question: "Can the two vessels be kept separately?",
    answer:
      "Yes. The concept of HUG is based on two individual vessels that can exist separately or together as one composition.",
  },
  {
    question: "How much will HUG cost?",
    answer: "The expected retail price is £895 per pair.",
  },
  {
    question: "Is HUG available now?",
    answer:
      "HUG is currently in development and pre-launch. Visitors can register their interest through the pre-order on the website.",
  },
  {
    question: "Where is HUG made?",
    answer:
      "HUG is being developed with a manufacturing partner in Japan.",
  },
  {
    question: "When will HUG be available?",
    answer: "The launch date has not been finalised.",
  },
] as const;

export const hugFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: hugFaqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};
