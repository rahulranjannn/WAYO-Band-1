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

export type WayoModel = 'standard' | 'plus';

export function ProductPage() {
  const [selectedModel, setSelectedModel] = useState<WayoModel>('plus');

  return (
    <main className="pb-28 lg:pb-0">
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
