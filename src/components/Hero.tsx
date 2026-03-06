import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenWaitlist: () => void;
}

export function Hero({ onOpenWaitlist }: HeroProps) {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="z-10"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-wayo-yellow/20 text-yellow-800 font-bold text-sm mb-6 tracking-wide uppercase">
              Launching April 2026
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight text-wayo-dark mb-6">
              No matter where they go — <br />
              <span className="text-wayo-coral">Wayo brings them back.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
              The brilliantly simple, screen-free wristband that keeps your child safely within reach.
            </p>
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://picsum.photos/seed/kidpark/800/1000"
                alt="Parent and child at a park"
                className="w-full h-[600px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              
              {/* Floating UI Element */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-wayo-mint flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div>
                  <p className="font-bold text-wayo-dark">Status: Safe</p>
                  <p className="text-xs text-gray-500">Connected • 5m away</p>
                </div>
              </motion.div>
            </div>
            
            {/* Decorative blobs */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-wayo-yellow rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10 animate-pulse"></div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-wayo-mint rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
