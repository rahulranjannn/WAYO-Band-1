import { useState } from 'react';
import { ClipModal } from './ClipModal';

export function ClipFinalCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-24 sm:py-32 bg-[#F5C842] text-[#1A1A2E] text-center px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-8 font-display leading-tight tracking-tight">
          Your next journey.<br />
          No anxiety included.
        </h2>
        
        <p className="text-xl sm:text-2xl font-medium text-[#1A1A2E]/80 mb-12 max-w-2xl mx-auto leading-relaxed">
          Pre-order the Wayo Clip and travel the way you were supposed to — light, easy, and actually rested.
        </p>
        
        <div className="mb-10">
          <div className="text-3xl font-extrabold mb-2">₹799 — Complete Set.</div>
          <div className="text-lg font-bold text-[#1A1A2E]/70">One time. No fees. Ever.</div>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1A1A2E] text-white px-12 py-5 rounded-xl font-bold text-xl hover:bg-gray-800 transition-all transform hover:scale-105 active:scale-95 shadow-xl mb-12"
        >
          Pre-Order Now →
        </button>
        
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-bold text-[#1A1A2E]/70">
          <span className="flex items-center gap-1.5">🔒 Secure Checkout</span>
          <span className="flex items-center gap-1.5">🇮🇳 Made for India</span>
          <span className="flex items-center gap-1.5">↩️ Easy Returns</span>
          <span className="flex items-center gap-1.5">📦 Ships Soon</span>
        </div>
      </div>

      <ClipModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
