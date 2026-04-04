import { useState } from 'react';
import { ProductOverview } from './components/ProductOverview';
import { AhaSection } from './components/AhaSection';
import { HowItWorks } from './components/HowItWorks';
import { Features } from './components/Features';
import { ComparisonTable } from './components/ComparisonTable';
import { WhatsInTheBox } from './components/WhatsInTheBox';
import { WhoItsFor } from './components/WhoItsFor';
import { Specs } from './components/Specs';
import { FAQ } from './components/FAQ';
import { Testimonials } from './components/Testimonials';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { StickyBar } from './components/StickyBar';

export type WayoModel = 'standard' | 'plus';

export default function App() {
  const [selectedModel, setSelectedModel] = useState<WayoModel>('plus');

  return (
    <div className="min-h-screen bg-wayo-cream font-sans selection:bg-wayo-coral selection:text-white pb-[84px] md:pb-0">
      <nav className="absolute top-0 left-0 right-0 z-40 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-3xl font-extrabold tracking-tighter text-wayo-dark">
            wayo<span className="text-wayo-coral">.</span>
          </div>
        </div>
      </nav>

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
