import { useState } from 'react';
import { ProductOverview } from '../components/ProductOverview';
import { AhaSection } from '../components/AhaSection';
import { HowItWorks } from '../components/HowItWorks';
import { Features } from '../components/Features';
import { ComparisonTable } from '../components/ComparisonTable';
import { WhatsInTheBox } from '../components/WhatsInTheBox';
import { WhoItsFor } from '../components/WhoItsFor';
import { Specs } from '../components/Specs';
import { FAQ } from '../components/FAQ';
import { Testimonials } from '../components/Testimonials';
import { FinalCTA } from '../components/FinalCTA';
import { Footer } from '../components/Footer';
import { StickyBar } from '../components/StickyBar';
import { Navbar } from '../components/Navbar';

export type WayoModel = 'standard' | 'plus';

export function WayoBand() {
  const [selectedModel, setSelectedModel] = useState<WayoModel>('plus');

  return (
    <div className="min-h-screen bg-wayo-cream font-sans selection:bg-wayo-coral selection:text-white pb-[84px] md:pb-0">
      <Navbar />

      <main>
        <ProductOverview selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
        <AhaSection />
        <HowItWorks />
        <Features />
        <ComparisonTable />
        <WhatsInTheBox />
        <WhoItsFor />
        <Specs />
        <FAQ />
        <Testimonials />
        <FinalCTA selectedModel={selectedModel} />
      </main>

      <Footer />
      <StickyBar selectedModel={selectedModel} />
    </div>
  );
}
