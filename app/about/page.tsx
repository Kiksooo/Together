import type { Metadata } from "next";
import {
  Chapter,
  EditorialPage,
  Paragraph,
  TextLink,
} from "@/components/editorial/EditorialPage";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "About TOGETHER | Memorial Sculptures",
  "TOGETHER is a memorial brand shaped around relationships. HUG, its first sculpture, is a quiet object of remembrance for the home.",
  "/about",
);

export default function AboutPage() {
  return (
    <EditorialPage eyebrow="About" title="About TOGETHER">
      <Chapter title="Memorials shaped around relationships">
        <Paragraph>
          Memorial objects for the relationships we never want to lose.
        </Paragraph>
        <Paragraph>
          TOGETHER began with a simple idea: some relationships deserve a
          physical expression.
        </Paragraph>
        <Paragraph>
          We create{" "}
          <TextLink href="/memorial-sculptures">
            contemporary memorial sculptures
          </TextLink>{" "}
          designed around connection — objects that can live naturally within a
          home while holding something deeply personal.
        </Paragraph>
        <Paragraph>
          Our first piece, <TextLink href="/hug">HUG</TextLink>, was designed
          around two people. It consists of two individual{" "}
          <TextLink href="/cremation-urns">memorial vessels</TextLink>, each
          complete on its own. Together, they form one sculptural composition.
        </Paragraph>
        <Paragraph>
          The two vessels are intentionally separate. Each one represents an
          individual life and can be kept independently. When brought together,
          their forms meet to create HUG — a physical expression of a
          relationship that continues to matter.
        </Paragraph>
      </Chapter>

      <Chapter title="Designed as objects of remembrance">
        <Paragraph>We wanted to approach remembrance differently.</Paragraph>
        <Paragraph>
          Rather than designing an object that belongs only to the language of
          funerals, TOGETHER explores what a memorial object can become when
          considered as sculpture, design and part of the home.
        </Paragraph>
        <Paragraph>
          HUG is being developed in high-fired porcelain with our manufacturing
          partner in Japan. The form, materials and{" "}
          <TextLink href="/faq">production details</TextLink> are being carefully
          developed before the first release.
        </Paragraph>
        <Paragraph>
          We believe a memorial object does not have to feel distant from
          everyday life. It can be quiet. It can be beautiful. It can sit among
          the things that make a home yours.
        </Paragraph>
        <Paragraph>
          And most importantly, it can represent the connection between two
          people, not simply the loss of one.
        </Paragraph>
      </Chapter>

      <div className="mt-20 md:mt-28">
        <p className="font-sans text-[9px] uppercase tracking-[0.42em] text-ink-faint md:text-[10px]">
          TOGETHER
        </p>
        <p className="mt-4 font-serif text-[clamp(1.5rem,3vw,2.05rem)] font-light leading-none tracking-[-0.03em] text-ink">
          Two lives. One connection.
        </p>
      </div>
    </EditorialPage>
  );
}
