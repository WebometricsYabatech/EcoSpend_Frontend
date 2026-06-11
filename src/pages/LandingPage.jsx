import Header from "../components/Header";
import Hero from "../components/Hero";
import SocialProof from "../components/SocialProof";
import Features from "../components/Features";
import ProductPreview from "../components/ProductPreview";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";


export default function LandingPage() {
  return (
    <>
      <Header />
      <Hero/>
      <SocialProof/>
      <Features/>
      <ProductPreview/>
      <FinalCTA/>
      <Footer/>
    </>
  );
}