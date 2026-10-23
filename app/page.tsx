import Nav from "./components/Nav";
import Hero from "./components/Hero";
import TwoSided from "./components/TwoSided";
import HowItWorks from "./components/HowItWorks";
import Stats from "./components/Stats";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TwoSided />
        <HowItWorks />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
