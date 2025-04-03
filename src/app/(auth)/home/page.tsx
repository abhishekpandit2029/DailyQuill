import CTASection from "@/components/Main/Home/CTASection";
import NewsLetter from "@/components/Main/Home/NewsLetter";
import PriceSection from "@/components/Main/Home/PriceSection";
import ProductOverview from "@/components/Main/Home/ProductOverview";
import Testinomials from "@/components/Main/Home/Testinomials";

export default function Home() {
  return (
    <div>
      <CTASection />
      <ProductOverview />
      <Testinomials />
      <PriceSection />
      <NewsLetter />
    </div>
  );
}
