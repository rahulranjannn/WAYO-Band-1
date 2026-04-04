import { RefreshCcw, Truck, Lock, MessageCircle } from 'lucide-react';
import type { WayoModel } from '../App';

interface FinalCTAProps {
  selectedModel: WayoModel;
}

export function FinalCTA({ selectedModel }: FinalCTAProps) {
  const price = selectedModel === 'plus' ? '1,499' : '999';
  const mrp = selectedModel === 'plus' ? '2,499' : '1,799';

  return (
    <section className="py-24 bg-wayo-coral text-white text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 font-display">
          Keep them close. Always.
        </h2>
        <p className="text-xl sm:text-2xl mb-10 font-medium text-white/90">
          Wayo Band. One pair. A lifetime of peace of mind.
        </p>
        
        <div className="mb-10">
          <div className="flex items-baseline justify-center gap-3 mb-2">
            <span className="text-4xl font-extrabold">₹{price}</span>
            <span className="text-xl text-white/60 line-through font-medium">₹{mrp}</span>
            <span className="text-sm font-bold bg-white/20 px-2 py-1 rounded-md">per pair</span>
          </div>
          <p className="text-white/80 font-medium">· Free delivery across India</p>
        </div>

        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-full sm:w-auto bg-white text-wayo-coral px-16 py-6 rounded-full font-bold text-2xl hover:bg-gray-50 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl min-h-[72px] mb-10"
        >
          Pre-Order Your Wayo Pair
        </button>

        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-sm font-medium text-white/90">
          <div className="flex items-center gap-2"><RefreshCcw className="w-4 h-4" /> 7-day returns</div>
          <div className="flex items-center gap-2"><Truck className="w-4 h-4" /> Free delivery</div>
          <div className="flex items-center gap-2"><Lock className="w-4 h-4" /> Secure payment</div>
          <div className="flex items-center gap-2"><MessageCircle className="w-4 h-4" /> WhatsApp support</div>
        </div>
      </div>
    </section>
  );
}
