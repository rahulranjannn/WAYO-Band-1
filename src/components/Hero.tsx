import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenWaitlist: () => void;
}

export function Hero({ onOpenWaitlist }: HeroProps) {
  return (
    <section className="relative pt-36 lg:pt-48 pb-12 md:pb-24 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="z-10 flex flex-col"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight text-wayo-dark mb-6">
              No matter where they go —
              <span className="block text-wayo-coral mt-4 lg:mt-5">WAYO brings them back.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-2 lg:mb-8 max-w-lg leading-relaxed">
              The brilliantly simple, screen free wristband that keeps your child safely within reach.
            </p>

            {/* Desktop Actions (Hidden on Mobile) */}
            <div className="hidden lg:block">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onOpenWaitlist}
                  className="bg-wayo-dark text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all transform hover:scale-105 active:scale-95 shadow-xl flex items-center justify-center gap-2"
                >
                  Join the Waitlist <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-8 flex items-center gap-4 text-sm font-medium text-gray-500">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                      <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <p>Join 2,000+ parents on the list</p>
              </div>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full"
          >
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 bg-[#fbf9f6]">
              <img
                src="/hero1.png"
                alt="Wayo Band - No setup needed, just wear & go"
                className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>

            {/* Decorative blobs */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-wayo-yellow rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10 animate-pulse"></div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-wayo-mint rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </motion.div>

          {/* Mobile Actions (Hidden on Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="block lg:hidden mt-2"
          >
            <div className="flex flex-col gap-4">
              <button
                onClick={onOpenWaitlist}
                className="bg-wayo-dark text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all active:scale-95 shadow-xl flex items-center justify-center gap-2"
              >
                Join the Waitlist <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-6 flex flex-col justify-center items-center gap-3 text-sm font-medium text-gray-500">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                    <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <p>Join 2,000+ parents on the list</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
