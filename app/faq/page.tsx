import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import {
  EditorialPage,
  Paragraph,
  TextLink,
} from "@/components/editorial/EditorialPage";
import { hugFaqJsonLd, hugFaqs, pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "HUG FAQ | Contemporary Memorial Urn for Two | TOGETHER",
  "Find answers about HUG, the TOGETHER memorial sculpture, including its design, two individual vessels, materials, development status and expected price.",
  "/faq",
);

function Answer({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14 md:mt-16">
      <h2 className="max-w-[28ch] font-serif text-[clamp(1.35rem,2.4vw,1.85rem)] font-light leading-[1.2] tracking-[-0.03em] text-ink">
        {question}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function FaqPage() {
  return (
    <EditorialPage eyebrow="FAQ" title="Questions about HUG.">
      <JsonLd data={hugFaqJsonLd} />

      <Answer question={hugFaqs[0].question}>
        <Paragraph>
          <TextLink href="/about">TOGETHER</TextLink> is a design-led memorial
          brand creating{" "}
          <TextLink href="/memorial-sculptures">
            contemporary memorial sculptures
          </TextLink>{" "}
          around the relationships we never want to lose.{" "}
          <TextLink href="/hug">HUG</TextLink> is the first piece.
        </Paragraph>
      </Answer>

      <Answer question={hugFaqs[1].question}>
        <Paragraph>
          <TextLink href="/hug">HUG</TextLink> is a pair of individual memorial
          vessels that come together to form one sculptural composition.
        </Paragraph>
      </Answer>

      <Answer question={hugFaqs[2].question}>
        <Paragraph>
          Yes. Each HUG vessel is being designed as an individual{" "}
          <TextLink href="/cremation-urns">cremation vessel</TextLink>. Final
          technical specifications are currently in development.
        </Paragraph>
      </Answer>

      <Answer question={hugFaqs[3].question}>
        <Paragraph>{hugFaqs[3].answer}</Paragraph>
      </Answer>

      <Answer question={hugFaqs[4].question}>
        <Paragraph>{hugFaqs[4].answer}</Paragraph>
      </Answer>

      <Answer question={hugFaqs[5].question}>
        <Paragraph>{hugFaqs[5].answer}</Paragraph>
      </Answer>

      <Answer question={hugFaqs[6].question}>
        <Paragraph>{hugFaqs[6].answer}</Paragraph>
      </Answer>

      <Answer question={hugFaqs[7].question}>
        <Paragraph>
          HUG is currently in development and pre-launch. Visitors can register
          their interest through the{" "}
          <TextLink href="/#price-heading">pre-order CTA</TextLink> on the
          website.
        </Paragraph>
      </Answer>

      <Answer question={hugFaqs[8].question}>
        <Paragraph>{hugFaqs[8].answer}</Paragraph>
      </Answer>

      <Answer question={hugFaqs[9].question}>
        <Paragraph>{hugFaqs[9].answer}</Paragraph>
      </Answer>
    </EditorialPage>
  );
}
