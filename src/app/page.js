// app/page.jsx

import Footer from "@/components/Footer";
import Landing from "@/components/Landing";
import Navbar from "@/components/Navbar";
import PricingPlans from "@/components/PricingPlans"; // Correct import name
import Product from "@/components/Product";
import TextType from "@/components/TextType";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <TextType
          text={[
            "Connect face-to-face, instantly",
            "Crystal-clear video calls",
            "Voice chat with your team, anywhere",
            "Seamless communication, redefined"
          ]}
          typingSpeed={50}
          pauseDuration={2000}
          showCursor={true}
          cursorCharacter="_"
        />
        <Landing />
        <Product />
        <PricingPlans />
        <Footer />
      </main>
    </>
  );
}