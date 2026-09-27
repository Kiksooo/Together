import Header from "@/components/Header";
import Hero from "@/components/Hero";
import IdeaSection from "@/components/IdeaSection";
import BelongSection from "@/components/BelongSection";
import ExpectedPriceSection from "@/components/ExpectedPriceSection";
import HugExperience from "@/components/hug/HugExperience";
import MeaningSection from "@/components/MeaningSection";
import ObjectSection from "@/components/ObjectSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <IdeaSection />
      <HugExperience />
      <MeaningSection />
      <ObjectSection />
      <BelongSection />
      <ExpectedPriceSection />
      <Footer />
    </main>
  );
}
