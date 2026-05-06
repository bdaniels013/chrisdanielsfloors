import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Process from "@/components/Process";
import Audience from "@/components/Audience";
import CtaStrip from "@/components/CtaStrip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Process />
      <Audience />
      <CtaStrip />
    </>
  );
}
