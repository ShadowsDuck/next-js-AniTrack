import CardSection from "@/components/card-section";
import FooterSection from "@/components/footer";
import { HeroHeader } from "@/components/header";
import HeroSection from "@/components/hero-section";

export default function Home() {
  return (
    <>
      <HeroHeader />
      <HeroSection />
      <CardSection />
      <FooterSection />
    </>
  );
}
