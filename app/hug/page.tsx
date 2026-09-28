import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import {
  Chapter,
  EditorialPage,
  Paragraph,
  PreorderLink,
  TextLink,
} from "@/components/editorial/EditorialPage";
import { hugProductJsonLd, pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "TOGETHER HUG — A Memorial Sculpture for Two",
  "TOGETHER HUG is a memorial sculpture for two. Two individual cremation vessels come together as one sculptural composition. Pre-order; expected price £895 per pair.",
  "/hug",
);

export default function HugPage() {
  return (
    <EditorialPage
      eyebrow="HUG"
      title="HUG — A Memorial Sculpture for Two"
    >
      <JsonLd data={hugProductJsonLd()} />

      <Chapter title="Two vessels. One connection.">
        <Paragraph>
          HUG is <TextLink href="/about">TOGETHER</TextLink>&apos;s first
          memorial sculpture — a pair of individual{" "}
          <TextLink href="/cremation-urns">cremation vessels</TextLink> designed
          to come together as one object.
        </Paragraph>
        <Paragraph>
          Each vessel is complete on its own. Together, they form HUG.
        </Paragraph>

        <Chapter level={3} title="Individual vessels">
          <Paragraph>
            Each side of HUG is an individual memorial vessel.
          </Paragraph>
          <Paragraph>
            They can exist separately or be brought together to create the
            complete HUG composition.
          </Paragraph>
          <Paragraph>
            This distinction is central to the design: togetherness without
            losing individuality.
          </Paragraph>
        </Chapter>
      </Chapter>

      <Chapter title="Designed around connection.">
        <Chapter level={3} title="A memorial for two">
          <Paragraph>
            HUG was designed for people who want to remember two lives together
            while keeping each person individually represented.
          </Paragraph>
          <Paragraph>
            The idea is simple: two vessels, two lives, one connection.
          </Paragraph>
        </Chapter>

        <Chapter level={3} title="For couples, families and shared remembrance">
          <Paragraph>
            HUG is intended for people looking for a contemporary way to remember
            loved ones together.
          </Paragraph>
          <Paragraph>
            It may be relevant to couples, partners, parents, siblings or other
            relationships where keeping two people connected is meaningful.
          </Paragraph>
        </Chapter>
      </Chapter>

      <Chapter title="A contemporary memorial object.">
        <Chapter
          level={3}
          title="Designed as an object, not a traditional funeral product"
        >
          <Paragraph>
            HUG takes a contemporary approach to the cremation urn.
          </Paragraph>
          <Paragraph>
            Its sculptural form is designed to sit naturally within a home,
            alongside the objects and spaces that already hold meaning.
          </Paragraph>
          <Paragraph>
            The intention is not to disguise what it is. HUG is a{" "}
            <TextLink href="/memorial-sculptures">memorial object</TextLink>. But
            it is also designed to feel like something you can live with.
          </Paragraph>
        </Chapter>

        <Chapter level={3} title="Material">
          <Paragraph>HUG is being developed in high-fired porcelain.</Paragraph>
          <Paragraph>
            Production and final{" "}
            <TextLink href="/faq">technical details</TextLink> are currently in
            development.
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
