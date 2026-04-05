import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Minus, Plus } from 'lucide-react';
import { PriceDisplay } from '../PriceDisplay';
import { useCart } from '../../context/CartContext';

interface ClipProductOverviewProps {
  onOpenWaitlist: () => void;
}

export function ClipProductOverview({ onOpenWaitlist }: ClipProductOverviewProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Black');
  const [quantity, setQuantity] = useState(1);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const primaryButtonRef = useRef<HTMLButtonElement>(null);
  const [showSticky, setShowSticky] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowSticky(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );

    if (primaryButtonRef.current) {
      observer.observe(primaryButtonRef.current);
    }

    return () => {
      if (primaryButtonRef.current) observer.unobserve(primaryButtonRef.current);
    };
  }, []);

  const trackAddToCart = (price: number) => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'AddToCart', { value: price, currency: 'INR' });
    }
  };

  const colors = [
    { name: 'Black', hex: '#1A1A2E', label: 'match with anything' },
  ];

  const thumbnails = [
    '/clip_1.webp',
    '/clip_2.webp',
    '/clip_3.webp',
    '/clip_4.webp',
  ];

  const mainImage = thumbnails[activeImage];

  const selectedColorData = colors.find(c => c.name === selectedColor);

  return (
    <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left Column - Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-4 mt-6 lg:mt-0">
            <div 
              ref={scrollRef}
              className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar bg-wayo-cream rounded-[2rem] aspect-square relative"
              onScroll={(e) => {
                const scrollLeft = e.currentTarget.scrollLeft;
                const width = e.currentTarget.offsetWidth;
                const newIndex = Math.round(scrollLeft / width);
                if (newIndex !== activeImage && newIndex >= 0 && newIndex < thumbnails.length) {
                  setActiveImage(newIndex);
                }
              }}
            >
              {thumbnails.map((thumb, idx) => (
                <img
                  key={idx}
                  src={thumb}
                  alt={`Wayo Clip ${idx + 1}`}
                  className="w-full h-full object-cover flex-shrink-0 snap-center"
                />
              ))}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {thumbnails.map((thumb, idx) => (
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
                  className={`rounded-xl overflow-hidden aspect-square border-2 transition-all ${activeImage === idx ? 'border-wayo-dark' : 'border-transparent hover:border-gray-200'}`}
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
              <span
                onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-gray-500 font-medium text-sm hover:text-wayo-dark cursor-pointer transition-colors"
              >
                (100+ prebookings received) →
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

            <div className="mb-2 mt-4">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Limited batch of 500 pcs available
              </span>
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
                ref={primaryButtonRef}
                onClick={() => {
                  trackAddToCart(799);
                  addToCart({
                    id: `wayo-clip-${selectedColor}`,
                    name: 'Wayo Clip',
                    model: 'Clip',
                    color: selectedColor,
                    price: 799,
                    quantity: quantity,
                    image: mainImage,
                    hasExtraBand: false
                  });
                  setQuantity(1);
                  setIsAddedFeedback(true);
                  setTimeout(() => setIsAddedFeedback(false), 2000);
                }}
                className={`w-full rounded-xl font-bold text-xl transition-all transform shadow-md h-[64px] px-8 flex justify-center items-center ${
                  isAddedFeedback ? 'bg-wayo-mint text-white scale-[1.02]' : 'bg-wayo-yellow text-wayo-dark hover:bg-yellow-400 hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                {isAddedFeedback ? 'Added to Cart ✓' : 'Add to Cart'}
              </button>

              <button
                onClick={() => {
                  addToCart({
                    id: `wayo-clip-${selectedColor}`,
                    name: 'Wayo Clip',
                    model: 'Clip',
                    color: selectedColor,
                    price: 799,
                    quantity: quantity,
                    image: mainImage,
                    hasExtraBand: false
                  });
                  navigate('/checkout');
                }}
                className="w-full bg-white border-2 border-gray-200 text-wayo-dark rounded-xl font-bold text-lg hover:border-gray-300 hover:bg-gray-50 transition-all h-[64px] px-8"
              >
                Book Now
              </button>
            </div>

            <div className="flex justify-center gap-4 text-xs font-bold text-gray-500 mb-10">
              <span className="flex items-center gap-1">🔒 Secure checkout</span>
              <span>·</span>
              <span className="flex items-center gap-1">🇮🇳 Ships across India</span>
              <span>·</span>
              <span className="flex items-center gap-1">📦 Free Shipping</span>
            </div>

            <div className="divide-y divide-gray-100 border-t border-gray-100">
              {[
                {
                  q: "What's in the box?",
                  a: "1 Wayo Clip, 1 Wrist Band, 1 USB-C charging cable. Clip goes on the bag. Band goes on your wrist. That's it."
                },
                {
                  q: "How does the Clip attach to my bag?",
                  a: "The Wayo Clip has a strong spring-loaded clip on the back it snaps onto any zipper pull, bag strap, or belt loop in seconds. It won't fall off on its own."
                },
                {
                  q: "What if I'm not wearing the band and my bag moves?",
                  a: "The band will still buzz and sound an alarm even from inside your pocket or placed nearby. As long as it's within about 30 metres of the Clip, it will alert."
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
      
      {/* Floating Add to Cart for Mobile */}
      <div className={`md:hidden fixed bottom-0 left-0 w-full z-40 p-4 pb-6 pointer-events-none flex justify-center transition-all duration-300 ease-in-out transform ${showSticky ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
        <button
          onClick={() => {
            trackAddToCart(799);
            addToCart({
              id: `wayo-clip-${selectedColor}`,
              name: 'Wayo Clip',
              model: 'Clip',
              color: selectedColor,
              price: 799,
              quantity: quantity,
              image: mainImage,
              hasExtraBand: false
            });
            setIsAddedFeedback(true);
            setTimeout(() => setIsAddedFeedback(false), 2000);
          }}
          className={`w-[95%] max-w-sm py-4 rounded-[2rem] font-bold text-lg pointer-events-auto shadow-[0_10px_40px_rgba(0,0,0,0.3)] flex items-center justify-center gap-2 transform ${
             isAddedFeedback ? 'bg-wayo-mint text-white scale-[1.02]' : 'bg-wayo-dark text-white active:scale-95'
          }`}
        >
          {isAddedFeedback ? 'Added to Cart ✓' : `Add to Cart - ₹799`}
        </button>
      </div>
    </section>
  );
}
