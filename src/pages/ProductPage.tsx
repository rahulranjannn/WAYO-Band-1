import { useState } from 'react';
import { ProductOverview } from '../components/product/ProductOverview';
import { AhaSection } from '../components/product/AhaSection';
import { HowItWorks } from '../components/product/HowItWorks';
import { Features } from '../components/product/Features';
import { ComparisonTable } from '../components/product/ComparisonTable';
import { WhatsInTheBox } from '../components/product/WhatsInTheBox';
import { WhoItsFor } from '../components/product/WhoItsFor';
import { Specs } from '../components/product/Specs';
import { Testimonials } from '../components/product/Testimonials';
import { FinalCTA } from '../components/product/FinalCTA';
import { SEO } from '../components/SEO';

export type WayoModel = 'standard' | 'plus';

export function ProductPage() {
  const [selectedModel, setSelectedModel] = useState<WayoModel>('plus');

  return (
    <main className="pb-28 lg:pb-0">
      <SEO title="Buy Wayo - Smart Child Safety Band" description="A screen-free wristband pair that alerts parents when their child wanders too far or falls in water." path="/product" />
      <ProductOverview selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
      <AhaSection />
      <HowItWorks />
      <Features />
      <ComparisonTable />
      <WhatsInTheBox />
      <WhoItsFor />
      <Specs />
      <Testimonials variant="band" />
      <FinalCTA selectedModel={selectedModel} />
    </main>
  );
}
