import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Programs } from "@/components/Programs";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { LearningJourney } from "@/components/LearningJourney";
import { Metrics } from "@/components/Metrics";
import { Gallery } from "@/components/Gallery";
import { Mentors } from "@/components/Mentors";
import { Testimonials } from "@/components/Testimonials";
import { Events } from "@/components/Events";
import { Recognition } from "@/components/Recognition";
import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";
import { Blog } from "@/components/Blog";
import { Instagram } from "@/components/Instagram";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Programs />
        <WhyChooseUs />
        <LearningJourney />
        <Metrics />
        <Gallery />
        <Mentors />
        <Testimonials />
        <Events />
        <Recognition />
        <CTA />
        <FAQ />
        <Blog />
        <Instagram />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
