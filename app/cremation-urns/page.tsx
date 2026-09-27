import type { Metadata } from "next";
import {
  Chapter,
  EditorialPage,
  Paragraph,
  PreorderLink,
  TextLink,
} from "@/components/editorial/EditorialPage";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "Cremation Urns for Two | TOGETHER",
  "A contemporary approach to cremation urns for two people. HUG uses two individual vessels that can be kept apart or brought together as one memorial.",
  "/cremation-urns",
);

export default function CremationUrnsPage() {
  return (
    <EditorialPage
      eyebrow="Cremation urns"
      title="Contemporary Cremation Urns for Two"
    >
      <Chapter title="Two individual vessels">
        <Paragraph>A cremation urn is more than a vessel.</Paragraph>
        <Paragraph>
          For many families, it becomes part of the way a person is remembered
          and the way their presence remains within the home.
        </Paragraph>
        <Paragraph>
          Traditional cremation urns often use familiar forms and visual
          language. <TextLink href="/about">TOGETHER</TextLink> is exploring
          another direction: memorial vessels considered as{" "}
          <TextLink href="/memorial-sculptures">contemporary objects</TextLink>.
        </Paragraph>
        <Paragraph>
          <TextLink href="/hug">HUG</TextLink> is our first design.
        </Paragraph>
        <Paragraph>
          It consists of two individual cremation vessels designed to come
          together as one sculptural composition.
        </Paragraph>
      </Chapter>

      <Chapter title="One shared memorial object">
        <Chapter level={3} title="Companion urns for two people">
          <Paragraph>
            HUG belongs to the broader idea of companion urns and urns for two
            people, but approaches the concept through sculpture.
          </Paragraph>
          <Paragraph>
            Rather than combining two sets of ashes into one conventional double
            urn, HUG uses two individual vessels that can be brought together.
          </Paragraph>
          <Paragraph>Each person remains individually represented.</Paragraph>
          <Paragraph>Together, the two forms create one object.</Paragraph>
        </Chapter>

        <Chapter level={3} title="Ceramic memorial urns">
          <Paragraph>HUG is being developed in high-fired porcelain.</Paragraph>
          <Paragraph>
            The material was chosen as part of the sculptural character of the
            piece, allowing the form to feel refined and considered within a
            contemporary interior.
          </Paragraph>
          <Paragraph>
            <TextLink href="/faq">Final production specifications</TextLink> are
            still being developed.
          </Paragraph>
        </Chapter>
      </Chapter>

      <Chapter title="Designed for the home">
        <Chapter
          level={3}
          title="A memorial urn designed for contemporary interiors"
        >
          <Paragraph>HUG is intended to sit naturally within a home.</Paragraph>
          <Paragraph>
            The design avoids traditional funeral styling and instead considers
            the object as part of an interior — something quiet, sculptural and
            personal.
          </Paragraph>
        </Chapter>

        <Chapter level={3} title="Expected retail price">
          <Paragraph>£895 per pair.</Paragraph>
          <Paragraph>HUG is currently in development and pre-launch.</Paragraph>
          <PreorderLink />
        </Chapter>
      </Chapter>
    </EditorialPage>
  );
}
