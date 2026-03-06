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
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="bg-wayo-yellow text-yellow-900 text-center py-2 text-xs sm:text-sm font-bold tracking-widest uppercase shadow-sm">
          Launching April 2026
        </div>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="flex justify-start">
            <div className="h-16 md:h-20 lg:h-24 flex items-center shrink-0">
              <img src="/logo2.png" alt="Wayo" className="h-full w-auto object-contain" />
            </div>
          </div>
          <div className="hidden md:flex justify-center gap-6 lg:gap-8 text-wayo-dark font-medium text-sm lg:text-base whitespace-nowrap">
            <a href="#" className="hover:text-wayo-coral transition-colors">Home</a>
            <a href="#" className="hover:text-wayo-coral transition-colors">How it Works</a>
            <a href="#" className="hover:text-wayo-coral transition-colors">FAQ</a>
          </div>
          <div className="flex justify-end">
            <button
              onClick={openModal}
              className="bg-wayo-dark text-white hover:bg-gray-800 px-6 py-2.5 rounded-full font-bold transition-all text-sm shadow-md"
            >
              Get Early Access
            </button>
          </div>
        </nav>
      </header>

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
