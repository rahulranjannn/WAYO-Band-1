import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Hero } from './components/Hero';
import { AhaSection } from './components/AhaSection';
import { HowItWorks } from './components/HowItWorks';
import { Benefits } from './components/Benefits';
import { Footer } from './components/Footer';
import { WaitlistModal } from './components/WaitlistModal';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-wayo-cream font-sans selection:bg-wayo-coral selection:text-white pb-24 md:pb-0">
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="bg-wayo-yellow text-yellow-900 text-center py-2 text-xs sm:text-sm font-bold tracking-widest uppercase shadow-sm">
          Launching April 2026
        </div>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 grid grid-cols-3 md:grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="flex justify-start items-center">
            <button
              className="md:hidden p-2 -ml-2 text-wayo-dark"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-7 h-7" />
            </button>
            <div className="hidden md:flex h-20 lg:h-24 items-center shrink-0">
              <img src="/logo2.png" alt="Wayo" className="h-full w-auto object-contain" />
            </div>
          </div>

          <div className="flex justify-center flex-grow whitespace-nowrap">
            <div className="md:hidden h-16 sm:h-20 flex items-center shrink-0">
              <img src="/logo2.png" alt="Wayo" className="h-full w-auto object-contain" />
            </div>
            <div className="hidden md:flex justify-center gap-6 lg:gap-8 text-wayo-dark font-medium text-sm lg:text-base">
              <a href="#" className="hover:text-wayo-coral transition-colors">Home</a>
              <a href="#" className="hover:text-wayo-coral transition-colors">How it Works</a>
              <a href="#" className="hover:text-wayo-coral transition-colors">FAQ</a>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={openModal}
              className="hidden md:block bg-wayo-dark text-white hover:bg-gray-800 px-6 py-2.5 rounded-full font-bold transition-all text-sm shadow-md"
            >
              Get Early Access
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-wayo-cream flex flex-col md:hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="px-4 py-4 flex justify-between items-center border-b border-gray-200">
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -ml-2 text-wayo-dark">
              <X className="w-7 h-7" />
            </button>
            <div className="h-16 flex items-center">
              <img src="/logo2.png" alt="Wayo" className="h-full w-auto object-contain" />
            </div>
            <div className="w-11" /> {/* Spacer for centering the logo (w-7 icon + p-2 padding = 44px = w-11) */}
          </div>
          <div className="flex flex-col items-center justify-center flex-grow gap-8 text-2xl font-bold text-wayo-dark pb-20">
            <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
            <a href="#" onClick={() => setIsMobileMenuOpen(false)}>How it Works</a>
            <a href="#" onClick={() => setIsMobileMenuOpen(false)}>FAQ</a>
          </div>
        </div>
      )}

      <main>
        <Hero onOpenWaitlist={openModal} />
        <AhaSection />
        <HowItWorks />
        <Benefits />
      </main>

      <Footer onOpenWaitlist={openModal} />

      {/* Floating Mobile CTA */}
      <div className="md:hidden fixed bottom-6 left-0 right-0 z-40 px-4 pointer-events-none flex justify-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
        <button
          onClick={openModal}
          className="w-[95%] max-w-sm bg-wayo-dark text-white py-4 rounded-[2rem] font-bold text-lg pointer-events-auto shadow-[0_10px_40px_rgba(0,0,0,0.3)] flex items-center justify-center gap-2 transform active:scale-95 transition-transform"
        >
          Get Early Access
        </button>
      </div>

      <WaitlistModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
