import { useState } from 'react';
import { Hero } from './components/Hero';
import { AhaSection } from './components/AhaSection';
import { HowItWorks } from './components/HowItWorks';
import { Benefits } from './components/Benefits';
import { Footer } from './components/Footer';
import { WaitlistModal } from './components/WaitlistModal';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-wayo-cream font-sans selection:bg-wayo-coral selection:text-white">
      <nav className="absolute top-0 left-0 right-0 z-40 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="h-20 md:h-24 flex items-center shrink-0">
            <img src="/logo2.png" alt="Wayo" className="h-full w-auto object-contain" />
          </div>
          <button
            onClick={openModal}
            className="hidden sm:block bg-white/50 backdrop-blur-sm border border-white/50 hover:bg-white text-wayo-dark px-6 py-2 rounded-full font-bold transition-all text-sm"
          >
            Get Early Access
          </button>
        </div>
      </nav>

      <main>
        <Hero onOpenWaitlist={openModal} />
        <AhaSection />
        <HowItWorks />
        <Benefits />
      </main>

      <Footer onOpenWaitlist={openModal} />

      <WaitlistModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
