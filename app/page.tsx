import Image from "next/image";
import HeroSection from "./(components)/HeroSection";
import TopCategories from "./(components)/TopCats";
import TopSellingProducts from "./(components)/TopProds";
import ContactForm from "./(components)/ContactUs";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <TopCategories />
      <TopSellingProducts />
      <ContactForm />
    </div>
  );
}
