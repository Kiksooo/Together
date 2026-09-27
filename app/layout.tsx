import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import SmoothScroll from "@/components/SmoothScroll";
import { organizationJsonLd, pageMetadata } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = pageMetadata(
  "TOGETHER — HUG",
  "Memorial sculptures designed around the relationships we never want to lose.",
  "/",
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable}`}
    >
      <body className="font-sans antialiased">
        <JsonLd data={organizationJsonLd()} />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
