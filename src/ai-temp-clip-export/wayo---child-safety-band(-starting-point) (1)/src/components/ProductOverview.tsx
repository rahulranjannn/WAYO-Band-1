import { useState } from 'react';
import { Star, ShieldCheck, Truck, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { WayoModel } from '../App';

interface ProductOverviewProps {
  selectedModel: WayoModel;
  setSelectedModel: (model: WayoModel) => void;
}

export function ProductOverview({ selectedModel, setSelectedModel }: ProductOverviewProps) {
  const [selectedColor, setSelectedColor] = useState('Coral');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>('description');

  const colors = [
    { name: 'Coral', class: 'bg-wayo-coral' },
    { name: 'Yellow', class: 'bg-wayo-yellow' },
    { name: 'Mint', class: 'bg-wayo-mint' },
  ];

  const images = [
    '/hero-image.png',
    'https://picsum.photos/seed/wayo1/800/800',
    'https://picsum.photos/seed/wayo2/800/800',
    'https://picsum.photos/seed/wayo3/800/800',
  ];

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const price = selectedModel === 'plus' ? '1,499' : '999';
  const mrp = selectedModel === 'plus' ? '2,499' : '1,799';
  const save = selectedModel === 'plus' ? '1,000' : '800';

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
              <div className="flex items-end gap-3 mb-2">
                <span className="text-3xl font-extrabold text-wayo-dark">₹{price}</span>
                <span className="text-xl text-gray-400 line-through font-medium mb-1">₹{mrp}</span>
                <span className="text-sm font-bold text-wayo-mint bg-wayo-mint/10 px-2 py-1 rounded-md mb-1">Save ₹{save}</span>
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

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col gap-5 mb-8">
              <div className="flex items-center justify-between border-2 border-gray-200 rounded-full px-4 py-2 w-36 h-[60px]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-gray-500 hover:text-wayo-dark text-2xl font-medium px-2"
                >-</button>
                <span className="font-bold text-wayo-dark text-xl">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-gray-500 hover:text-wayo-dark text-2xl font-medium px-2"
                >+</button>
              </div>
              <button className="w-full bg-wayo-coral text-white rounded-full font-bold text-xl hover:bg-red-500 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-wayo-coral/40 h-[72px] px-8">
                Pre-Order Your Wayo Pair
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
