import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Portfolio from "@/components/sections/Portfolio";
import ShortsMarquee from "@/components/sections/ShortsMarquee";
import ProblemSolution from "@/components/sections/ProblemSolution";
import Pricing from "@/components/sections/Pricing";
import Reviews from "@/components/sections/Reviews";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import { getFaqSchema, getServiceSchema } from "@/lib/structured-data";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getServiceSchema()) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqSchema()) }}
      />
      <Hero />
      <About />
      <Services />
      <Process />
      <Portfolio />
      <ShortsMarquee />
      <ProblemSolution />
      <Pricing />
      <Reviews />
      <FAQ />
      <CTA />
    </>
  );
}
