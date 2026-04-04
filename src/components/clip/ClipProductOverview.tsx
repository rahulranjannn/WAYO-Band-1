import { useState } from 'react';
import { Star, Minus, Plus } from 'lucide-react';
import { PriceDisplay } from '../PriceDisplay';

interface ClipProductOverviewProps {
  onOpenWaitlist: () => void;
}

export function ClipProductOverview({ onOpenWaitlist }: ClipProductOverviewProps) {
  const [mainImage, setMainImage] = useState('/hero1-1080.webp');
  const [selectedColor, setSelectedColor] = useState('Slate Black');
  const [quantity, setQuantity] = useState(1);

  const colors = [
    { name: 'Slate Black', hex: '#1A1A2E', label: 'most popular for travel' },
    { name: 'Sunshine Yellow', hex: '#F5C842', label: 'easy to spot' },
    { name: 'Coral Red', hex: '#FF7F6B', label: 'vibrant and bold' },
  ];

  const thumbnails = [
    '/hero1-1080.webp',
    '/childband-1080.webp',
    '/one-1080.webp',
    '/three-1080.webp',
  ];

  const selectedColorData = colors.find(c => c.name === selectedColor);

  return (
    <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column - Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="bg-wayo-cream rounded-[2rem] overflow-hidden aspect-square relative">
              <img src={mainImage} alt="Wayo Clip" className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {thumbnails.map((thumb, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setMainImage(thumb)}
                  className={`rounded-xl overflow-hidden aspect-square border-2 transition-all ${mainImage === thumb ? 'border-wayo-dark' : 'border-transparent hover:border-gray-200'}`}
                >
                  <img src={thumb} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Buy Box */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="inline-block bg-wayo-mint/20 text-teal-800 font-bold px-3 py-1 rounded-full text-sm w-fit mb-4">
              Your bag stays. You sleep.
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold text-wayo-dark mb-4 font-display tracking-tight">
              Wayo Clip
            </h1>

            <div className="flex items-center gap-2 mb-8">
              <div className="flex text-wayo-yellow">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <span className="text-gray-500 font-medium text-sm hover:text-wayo-dark cursor-pointer transition-colors">
                Be the first to review →
              </span>
            </div>

            <div className="mb-8 flex flex-col items-start gap-2">
              <PriceDisplay discountedPrice={799} originalPrice={999} />
              <div className="text-gray-500 font-medium">Complete Set — Clip + Wrist Band</div>
            </div>

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

            <div className="mb-8">
              <div className="font-bold text-wayo-dark mb-3">Color</div>
              <div className="flex gap-4 mb-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full transition-all border-2 border-white shadow-sm ${selectedColor === color.name ? 'ring-2 ring-offset-2 ring-gray-800 scale-110' : 'hover:scale-105'}`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={color.name}
                  />
                ))}
              </div>
              <div className="text-sm font-medium text-gray-500">
                <span className="text-wayo-dark font-bold">{selectedColor}</span> — {selectedColorData?.label}
              </div>
            </div>

            <div className="flex flex-col gap-4 mb-6">
              <div className="flex items-center justify-between border-2 border-gray-200 rounded-full px-4 py-2 w-36 h-[60px]">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-gray-500 hover:text-wayo-dark text-2xl font-medium px-2"
                ><Minus className="w-5 h-5" /></button>
                <span className="font-bold text-wayo-dark text-xl">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-gray-500 hover:text-wayo-dark text-2xl font-medium px-2"
                ><Plus className="w-5 h-5" /></button>
              </div>
              
              <button 
                onClick={onOpenWaitlist}
                className="w-full bg-wayo-yellow text-wayo-dark rounded-xl font-bold text-xl hover:bg-yellow-400 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg h-[64px] px-8"
              >
                Pre-Order Now — ₹799
              </button>
              
              <button 
                onClick={onOpenWaitlist}
                className="w-full bg-white border-2 border-gray-200 text-wayo-dark rounded-xl font-bold text-lg hover:border-gray-300 hover:bg-gray-50 transition-all h-[64px] px-8"
              >
                Join the Waitlist — Get Launch Notification
              </button>
            </div>

            <div className="flex justify-center gap-4 text-xs font-bold text-gray-500 mb-10">
              <span className="flex items-center gap-1">🔒 Secure checkout</span>
              <span>·</span>
              <span className="flex items-center gap-1">🇮🇳 Ships across India</span>
              <span>·</span>
              <span className="flex items-center gap-1">📦 Launching Soon</span>
            </div>

            <div className="divide-y divide-gray-100 border-t border-gray-100">
              {[
                {
                  q: "What's in the box?",
                  a: "1 Wayo Clip, 1 Wrist Band, 1 USB-C charging cable. Clip goes on the bag. Band goes on your wrist. That's it."
                },
                {
                  q: "How does the Clip attach to my bag?",
                  a: "The Wayo Clip has a strong spring-loaded clip on the back — it snaps onto any zipper pull, bag strap, or belt loop in seconds. It won't fall off on its own."
                },
                {
                  q: "What if I'm not wearing the band and my bag moves?",
                  a: "The band will still buzz and sound an alarm — even from inside your pocket or placed nearby. As long as it's within about 30 metres of the Clip, it will alert."
                },
                {
                  q: "Does it need a SIM card or internet?",
                  a: "No. Wayo Clip works completely offline. No SIM, no Wi-Fi, no app, no subscription. It just works."
                }
              ].map((faq, index) => (
                <div key={index} className="py-4">
                  <button 
                    onClick={(e) => {
                      const nextEl = (e.currentTarget.nextElementSibling as HTMLElement);
                      if (nextEl) {
                        nextEl.style.maxHeight = nextEl.style.maxHeight ? '' : `${nextEl.scrollHeight}px`;
                      }
                      e.currentTarget.querySelector('svg')?.classList.toggle('rotate-180');
                    }}
                    className="flex justify-between items-center font-bold text-wayo-dark cursor-pointer w-full text-left"
                  >
                    {faq.q}
                    <span className="transition-transform duration-300 transform">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </button>
                  <div className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
                    <p className="text-gray-600 mt-3 font-medium leading-relaxed pb-2">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
