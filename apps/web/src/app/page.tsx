import { Hero } from "@/components/home/Hero";
import {
  BrandIntro,
  FinalCta,
  FounderTeaser,
  InpInteractive,
  InsightsPreview,
  ServicesShowcase,
  TrustStrip,
  VideoSection,
} from "@/components/home/HomeSections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandIntro />
      <TrustStrip />
      <ServicesShowcase />
      <InpInteractive />
      <VideoSection />
      <FounderTeaser />
      <InsightsPreview />
      <FinalCta />
    </>
  );
}
