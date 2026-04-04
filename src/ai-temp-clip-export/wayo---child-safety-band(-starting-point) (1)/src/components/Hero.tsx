import { motion } from 'motion/react';
import { Lock, Droplets, Zap, Truck } from 'lucide-react';

export function Hero() {
  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-wayo-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 z-10 order-2 lg:order-1"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-wayo-dark mb-6 font-display">
              No matter where they go — <br className="hidden sm:block" />
              <span className="text-wayo-coral">Wayo brings them back.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-lg leading-relaxed font-medium">
              Two little wristbands. One invisible safety thread. Instant alerts the moment your child wanders too far — no phone, no app, no internet. Ever.
            </p>
            
            <div className="mb-8">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-3xl font-extrabold text-wayo-dark">₹1,499</span>
                <span className="text-lg text-gray-400 line-through font-medium">₹1,999</span>
                <span className="text-sm font-bold text-wayo-mint bg-wayo-mint/10 px-2 py-1 rounded-md">per pair</span>
              </div>
              <p className="text-sm text-gray-600 font-medium">· Free delivery across India</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                className="bg-wayo-coral text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-500 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-wayo-coral/30 w-full sm:w-auto min-h-[52px]"
              >
                Order Your Wayo Pair
              </button>
              <button
                onClick={scrollToHowItWorks}
                className="bg-white text-wayo-dark border-2 border-gray-200 px-8 py-4 rounded-full font-bold text-lg hover:border-wayo-dark transition-all w-full sm:w-auto min-h-[52px]"
              >
                See How It Works
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-gray-600">
              <div className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-wayo-mint" /> No app needed</div>
              <div className="flex items-center gap-1.5"><Droplets className="w-4 h-4 text-wayo-mint" /> Waterproof</div>
              <div className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-wayo-mint" /> Instant alerts</div>
              <div className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-wayo-mint" /> Ships across India</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 relative order-1 lg:order-2"
          >
            <div className="relative rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl transition-transform duration-500 bg-white">
              <img
                src="/hero-image.png"
                alt="Wayo Child and Mom Bands"
                className="w-full h-auto object-cover"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
