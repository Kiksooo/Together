import type { Metadata } from "next";
import {
  Chapter,
  EditorialPage,
  Paragraph,
  TextLink,
} from "@/components/editorial/EditorialPage";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "Memorial Sculptures | TOGETHER",
  "Memorial sculptures from TOGETHER are designed around connection. HUG, the first piece, is a sculptural object for remembrance at home.",
  "/memorial-sculptures",
);

export default function MemorialSculpturesPage() {
  return (
    <EditorialPage
      eyebrow="Memorial sculptures"
      title="Memorial Sculptures Designed Around Connection"
    >
      <Chapter title="Contemporary memorial sculpture">
        <Paragraph>
          A memorial does not have to look like a traditional memorial.
        </Paragraph>
        <Paragraph>
          Contemporary memorial sculpture brings together remembrance, design and
          material to create objects that can have a meaningful place within the
          home.
        </Paragraph>
        <Paragraph>
          At <TextLink href="/about">TOGETHER</TextLink>, we are interested in
          what happens when a memorial object is considered first as a piece of
          design — its proportions, silhouette, material, presence and
          relationship to the space around it.
        </Paragraph>
        <Paragraph>
          Our first work, <TextLink href="/hug">HUG</TextLink>, explores this
          idea through two individual memorial vessels that come together as one
          sculptural form.
        </Paragraph>
      </Chapter>

      <Chapter title="Sculptural objects for remembrance">
        <Chapter level={3} title="Memorial objects for the home">
          <Paragraph>
            A contemporary memorial sculpture can be quiet and personal.
          </Paragraph>
          <Paragraph>
            Rather than relying on traditional symbols, materials or visual
            language, the object can communicate through form.
          </Paragraph>
          <Paragraph>
            HUG was created with this in mind: a sculptural object that can
            remain part of everyday surroundings while holding a deeply personal
            purpose.
          </Paragraph>
        </Chapter>

        <Chapter level={3} title="Designing for connection">
          <Paragraph>
            Many memorial urns are designed around an individual.
          </Paragraph>
          <Paragraph>HUG begins from a different perspective.</Paragraph>
          <Paragraph>
            It was designed around the relationship between two people.
          </Paragraph>
          <Paragraph>
            Two separate vessels remain individually meaningful. When placed
            together, they create a shared sculptural composition.
          </Paragraph>
        </Chapter>
      </Chapter>

      <Chapter title="A different approach to memorial design">
        <Paragraph>
          TOGETHER is exploring a more contemporary language for{" "}
          <TextLink href="/cremation-urns">cremation memorials</TextLink> — one
          based on simplicity, proportion, material and emotional meaning rather
          than traditional funeral aesthetics.
        </Paragraph>
        <Paragraph>
          The result is intended to feel considered, timeless and at home.
        </Paragraph>
        <Paragraph>
          Further questions about the piece are gathered in the{" "}
          <TextLink href="/faq">HUG FAQ</TextLink>.
        </Paragraph>
      </Chapter>
    </EditorialPage>
  );
}
