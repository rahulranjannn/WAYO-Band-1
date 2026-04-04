import { useState } from 'react';
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
  const [selectedColor, setSelectedColor] = useState('Coral');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>('description');
  const [hasExtraBand, setHasExtraBand] = useState(false);
  const { addToCart } = useCart();

  const colors = [
    { name: 'Coral', class: 'bg-wayo-coral' },
    { name: 'Yellow', class: 'bg-wayo-yellow' },
    { name: 'Mint', class: 'bg-wayo-mint' },
  ];

  const images = [
    '/hero1-1080.webp',
    '/childband-1080.webp',
    '/one-1080.webp',
    '/three-1080.webp',
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
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-gray-100">
              <img
                src={images[activeImage]}
                alt="Wayo Band"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
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
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <span className="text-sm text-gray-500 font-medium">(128 Reviews)</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-wayo-dark mb-4 font-display leading-tight">
                Wayo Band Pair
              </h1>
              <p className="text-lg text-gray-600 font-medium mb-6">
                The invisible safety thread. Instant alerts the moment your child wanders too far — no phone, no app, no internet.
              </p>
              <div className="mb-4">
                <PriceDisplay discountedPrice={finalPrice} originalPrice={finalMrp} />
              </div>
              <p className="text-sm text-gray-500 font-medium">Taxes included. Free delivery across India.</p>
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
                  addToCart({
                    id: `wayo-band-${selectedModel}-${selectedColor}`,
                    name: `Wayo ${selectedModel === 'plus' ? 'Plus' : 'Band'}`,
                    model: selectedModel,
                    color: selectedColor,
                    price: (selectedModel === 'plus' ? 1499 : 999) + (hasExtraBand ? 500 : 0),
                    quantity: quantity,
                    image: images[activeImage],
                    hasExtraBand: hasExtraBand
                  });
                  setQuantity(1);
                  setHasExtraBand(false);
                  setSelectedModel('standard');
                }}
                className="w-full bg-wayo-coral text-white rounded-full font-bold text-xl hover:bg-red-500 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-wayo-coral/20 h-[60px] px-8"
              >
                Add to Cart
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
                        <li>Free standard shipping across India (3-5 business days).</li>
                        <li>Express shipping available at checkout.</li>
                        <li>7-day no-questions-asked return policy.</li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
