import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import About from "@/components/About";
import Process from "@/components/Process";
import Audience from "@/components/Audience";
import Testimonials from "@/components/Testimonials";
import CtaStrip from "@/components/CtaStrip";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <About />
      <Process />
      <Audience />
      <Testimonials />
      <CtaStrip />
    </>
  );
}
