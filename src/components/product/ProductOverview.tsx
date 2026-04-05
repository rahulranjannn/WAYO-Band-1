import { useState, useRef } from 'react';
import { Star, ShieldCheck, Truck, RotateCcw, ChevronDown, ChevronUp, Minus, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PriceDisplay } from '../PriceDisplay';
import { useCart } from '../../context/CartContext';
import type { WayoModel } from '../../pages/ProductPage';

interface ProductOverviewProps {
  selectedModel: WayoModel;
  setSelectedModel: (model: WayoModel) => void;
}

export function ProductOverview({ selectedModel, setSelectedModel }: ProductOverviewProps) {
  const [selectedColor, setSelectedColor] = useState('Pink');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>('description');
  const [hasExtraBand, setHasExtraBand] = useState(false);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  const trackAddToCart = (price: number) => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'AddToCart', { value: price, currency: 'INR' });
    }
  };

  const colors = [
    { name: 'Pink', class: 'bg-[#FFB6C1]' },
    { name: 'Blue', class: 'bg-[#AEC6CF]' },
  ];

  const images = [
    '/1.webp',
    '/2.webp',
    '/3.webp',
    '/4.webp',
  ];

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const basePrice = selectedModel === 'plus' ? 1499 : 999;
  const baseMrp = selectedModel === 'plus' ? 2499 : 1799;

  const finalPrice = basePrice + (hasExtraBand ? 500 : 0);
  const finalMrp = baseMrp + (hasExtraBand ? 500 : 0);

  return (
    <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* Left: Image Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4 mt-6 lg:mt-0">
            <div 
              ref={scrollRef}
              className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar aspect-square rounded-3xl bg-gray-50 border border-gray-100"
              onScroll={(e) => {
                const scrollLeft = e.currentTarget.scrollLeft;
                const width = e.currentTarget.offsetWidth;
                const newIndex = Math.round(scrollLeft / width);
                if (newIndex !== activeImage && newIndex >= 0 && newIndex < images.length) {
                  setActiveImage(newIndex);
                }
              }}
            >
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Wayo Band ${idx + 1}`}
                  className="w-full h-full object-cover flex-shrink-0 snap-center"
                />
              ))}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveImage(idx);
                    if (scrollRef.current) {
                      scrollRef.current.scrollTo({
                        left: scrollRef.current.offsetWidth * idx,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-wayo-coral' : 'border-transparent hover:border-gray-200'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Buy Box */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex text-wayo-yellow">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <span
                  onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-500 font-medium text-sm hover:text-wayo-dark cursor-pointer transition-colors"
                >
                  (100+ prebookings received) →
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-wayo-dark mb-4 font-display leading-tight">
                Wayo Band Pair
              </h1>

              <div className="mb-4">
                <PriceDisplay discountedPrice={finalPrice} originalPrice={finalMrp} />
              </div>
              <p className="text-sm text-gray-500 font-medium mb-4">Taxes included. Complete Set — Parent + Child Band.</p>

              <div className="flex flex-wrap gap-2 mb-8">
                <div className="bg-wayo-yellow/20 text-yellow-800 px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5">
                  <span>🔔</span> Instant Vibration Alert
                </div>
                <div className="bg-wayo-yellow/20 text-yellow-800 px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5">
                  <span>📵</span> No App. No Phone.
                </div>
                <div className="bg-wayo-yellow/20 text-yellow-800 px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5">
                  <span>✅</span> No Monthly Fees
                </div>
              </div>
            </div>

            <hr className="border-gray-100 my-6" />

            {/* Model Selector */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-wayo-dark">Model:</span>
              </div>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setSelectedModel('standard')}
                  className={`flex justify-between items-center p-4 rounded-xl border-2 transition-all text-left ${selectedModel === 'standard' ? 'border-wayo-coral bg-wayo-coral/5' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <div>
                    <div className="font-bold text-wayo-dark">Wayo Band</div>
                    <div className="text-sm text-gray-500">Instant distance & water alerts</div>
                  </div>
                  <div className="font-bold text-wayo-dark">₹999</div>
                </button>
                <button
                  onClick={() => setSelectedModel('plus')}
                  className={`flex justify-between items-center p-4 rounded-xl border-2 transition-all text-left ${selectedModel === 'plus' ? 'border-wayo-coral bg-wayo-coral/5' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <div>
                    <div className="font-bold text-wayo-dark">Wayo Plus</div>
                    <div className="text-sm text-gray-500">Adds 2-way voice calling</div>
                  </div>
                  <div className="font-bold text-wayo-dark">₹1,499</div>
                </button>
              </div>
            </div>

            {/* Color Selector */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-wayo-dark">Color: <span className="font-medium text-gray-600">{selectedColor}</span></span>
              </div>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-12 h-12 rounded-full ${color.class} border-4 transition-all ${selectedColor === color.name ? 'border-gray-300 scale-110' : 'border-white hover:scale-105 shadow-sm'}`}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Extra Band Add-on */}
            <div className="mb-8">
              <h3 className="text-[15px] font-semibold text-[#4B5563] mb-3 font-display tracking-tight">Need an extra band for a sibling?</h3>
              <div className="flex items-center justify-between py-3 px-4 bg-wayo-cream/40 rounded-[1.25rem] border border-gray-100/80 shadow-sm transition-all hover:bg-wayo-cream/60">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white rounded-xl overflow-hidden border border-gray-100 flex-shrink-0 shadow-sm">
                    <img src="/childband-1080.webp" alt="Extra Band" className="w-full h-full object-cover object-center" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-wayo-dark text-[15px]">Extra Wayo Child Band</span>
                    <span className="text-sm font-bold text-wayo-coral mt-0.5">+₹500</span>
                  </div>
                </div>

                <button
                  onClick={() => setHasExtraBand(!hasExtraBand)}
                  className={`px-5 py-2 font-bold rounded-xl transition-all text-sm w-28 flex justify-center items-center ${hasExtraBand
                    ? 'bg-transparent border-2 border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50/50'
                    : 'bg-wayo-dark text-white border-2 border-transparent hover:bg-gray-800 hover:-translate-y-0.5 shadow-sm hover:shadow'
                    }`}
                >
                  {hasExtraBand ? '✓ Added' : '+ Add'}
                </button>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="mb-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Limited batch of 500 pcs available
              </span>
            </div>
            <div className="flex flex-col gap-5 mb-8">
              <div className="flex items-center justify-between border-2 border-gray-200 rounded-full px-4 py-2 w-36 h-[60px] bg-white text-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-gray-500 hover:text-wayo-dark font-medium px-2 py-2"
                ><Minus className="w-5 h-5" /></button>
                <span className="font-bold text-wayo-dark">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-gray-500 hover:text-wayo-dark font-medium px-2 py-2"
                ><Plus className="w-5 h-5" /></button>
              </div>
              <button
                onClick={() => {
                  const priceToTrack = (selectedModel === 'plus' ? 1499 : 999) + (hasExtraBand ? 500 : 0);
                  trackAddToCart(priceToTrack);
                  addToCart({
                    id: `wayo-band-${selectedModel}-${selectedColor}`,
                    name: `Wayo ${selectedModel === 'plus' ? 'Plus' : 'Band'}`,
                    model: selectedModel,
                    color: selectedColor,
                    price: priceToTrack,
                    quantity: quantity,
                    image: images[activeImage],
                    hasExtraBand: hasExtraBand
                  });
                  setQuantity(1);
                  setHasExtraBand(false);
                  setSelectedModel('standard');
                  setIsAddedFeedback(true);
                  setTimeout(() => setIsAddedFeedback(false), 2000);
                }}
                className={`w-full text-white rounded-full font-bold text-xl transition-all transform shadow-md h-[60px] px-8 flex items-center justify-center gap-2 ${
                  isAddedFeedback ? 'bg-wayo-mint hover:bg-green-500 scale-[1.02]' : 'bg-wayo-coral hover:bg-red-500 hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                {isAddedFeedback ? 'Added to Cart ✓' : 'Add to Cart'}
              </button>
            </div>

            <button
              onClick={scrollToHowItWorks}
              className="w-full bg-wayo-cream text-wayo-dark rounded-full font-bold text-base hover:bg-gray-100 transition-colors h-[48px] mb-8"
            >
              See How It Works ↓
            </button>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                <ShieldCheck className="w-5 h-5 text-wayo-mint" /> 1 Year Warranty
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                <Truck className="w-5 h-5 text-wayo-mint" /> Free Shipping
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                <RotateCcw className="w-5 h-5 text-wayo-mint" /> 7-Day Replacements
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                <Star className="w-5 h-5 text-wayo-mint" /> 24/7 Support
              </div>
            </div>

            <hr className="border-gray-100 my-2" />

            {/* Accordions */}
            <div className="divide-y divide-gray-100">
              {/* Description Accordion */}
              <div className="py-4">
                <button
                  onClick={() => toggleAccordion('description')}
                  className="flex justify-between items-center w-full text-left font-bold text-wayo-dark"
                >
                  Product Description
                  {openAccordion === 'description' ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>
                <AnimatePresence>
                  {openAccordion === 'description' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-gray-600 text-sm leading-relaxed font-medium">
                        Wayo Band is a revolutionary child safety wearable that requires zero setup. No apps, no Bluetooth pairing, no subscriptions. Just wear the parent band, put the child band on your little one, and you're connected. If they wander beyond a safe 20-meter radius, both bands instantly vibrate and alarm.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Shipping Accordion */}
              <div className="py-4">
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="flex justify-between items-center w-full text-left font-bold text-wayo-dark"
                >
                  Shipping & Returns
                  {openAccordion === 'shipping' ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>
                <AnimatePresence>
                  {openAccordion === 'shipping' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <ul className="pt-4 text-gray-600 text-sm leading-relaxed font-medium list-disc pl-5 space-y-2">
                        <li>Free standard shipping across India (5-7 business days).</li>
                        <li>Express shipping available at checkout.</li>
                        <li>7-day replacement policy.</li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      {/* Floating Add to Cart for Mobile */}
      <div className="md:hidden fixed bottom-6 left-0 right-0 z-40 px-4 pointer-events-none flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-300">
        <button
          onClick={() => {
            trackAddToCart(finalPrice);
            addToCart({
              id: `wayo-band-${selectedModel}-${selectedColor}`,
              name: `Wayo ${selectedModel === 'plus' ? 'Plus' : 'Band'}`,
              model: selectedModel,
              color: selectedColor,
              price: finalPrice,
              quantity: quantity,
              image: images[activeImage],
              hasExtraBand: hasExtraBand
            });
            setIsAddedFeedback(true);
            setTimeout(() => setIsAddedFeedback(false), 2000);
          }}
          className={`w-[95%] max-w-sm text-white py-4 rounded-[2rem] font-bold text-lg pointer-events-auto shadow-[0_10px_40px_rgba(0,0,0,0.3)] flex items-center justify-center gap-2 transform transition-transform ${
             isAddedFeedback ? 'bg-wayo-mint scale-[1.02]' : 'bg-wayo-dark active:scale-95'
          }`}
        >
          {isAddedFeedback ? 'Added to Cart ✓' : `Add to Cart - ₹${finalPrice}`}
        </button>
      </div>
    </section>
  );
}
