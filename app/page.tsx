import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Programs } from "@/components/Programs";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { LearningJourney } from "@/components/LearningJourney";
import { Metrics } from "@/components/Metrics";
import { Gallery } from "@/components/Gallery";
import { Mentors } from "@/components/Mentors";
import { AppShowcase } from "@/components/AppShowcase";
import { Testimonials } from "@/components/Testimonials";
import { Events } from "@/components/Events";
import { Partners } from "@/components/Partners";
import { Recognition } from "@/components/Recognition";
import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";
import { Blog } from "@/components/Blog";
import { Instagram } from "@/components/Instagram";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
import { getSiteContent } from "@/lib/cms/content";

export default async function Home() {
  const c = await getSiteContent();

  return (
    <>
      <Navbar />
      <main id="main">
        <Hero hero={c.hero} />
        <Programs items={c.programs} />
        <WhyChooseUs features={c.features} />
        <LearningJourney items={c.journey} />
        <Metrics items={c.metrics} />
        <Gallery items={c.gallery} />
        <Mentors items={c.mentors} />
        <AppShowcase app={c.app} />
        <Testimonials items={c.testimonials} />
        <Partners items={c.partners} />
        <Events items={c.events} />
        <Recognition />
        <CTA programs={c.programs} />
        <FAQ items={c.faqs} />
        <Blog />
        <Instagram reels={c.reels} contact={c.contact} />
        <Contact contact={c.contact} programs={c.programs} />
      </main>
      <Footer contact={c.contact} programs={c.programs} />
      <FloatingButtons contact={c.contact} />
    </>
  );
}
