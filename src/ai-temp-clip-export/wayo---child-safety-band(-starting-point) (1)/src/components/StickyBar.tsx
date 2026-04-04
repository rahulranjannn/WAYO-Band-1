import type { WayoModel } from '../App';

interface StickyBarProps {
  selectedModel: WayoModel;
}

export function StickyBar({ selectedModel }: StickyBarProps) {
  const price = selectedModel === 'plus' ? '1,499' : '999';
  const mrp = selectedModel === 'plus' ? '2,499' : '1,799';

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-wayo-dark">₹{price}</span>
            <span className="text-sm text-gray-400 line-through">₹{mrp}</span>
          </div>
          <span className="text-xs text-wayo-mint font-bold">Free Delivery</span>
        </div>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex-1 bg-wayo-coral text-white py-3 px-4 rounded-full font-bold text-sm sm:text-base whitespace-nowrap hover:bg-red-500 transition-colors min-h-[52px] shadow-lg shadow-wayo-coral/30"
        >
          Pre-Order Your Wayo Pair
        </button>
      </div>
    </div>
  );
}
