import { motion } from 'motion/react';
import { Wifi, Droplet, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TwoShields() {
    return (
        <section className="py-24 bg-[#1A1A2E] text-white overflow-hidden relative">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #C0392B 0%, transparent 70%)' }}></div>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <span className="bg-wayo-coral rounded-full px-4 py-1 text-xs font-bold tracking-widest uppercase mb-6 inline-block shadow-sm">
                    DUAL PROTECTION
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-16 leading-tight">
                    Distance. Water. Both covered.
                </h2>

                <div className="grid md:grid-cols-2 gap-12 lg:gap-24 mb-16 items-center">
                    {/* Left Block */}
                    <div className="flex flex-col items-center group">
                        <div className="w-24 h-24 bg-white/10 rounded-[2rem] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 backdrop-blur-sm border border-white/20">
                            <Wifi className="w-12 h-12 text-wayo-coral" />
                        </div>
                        <p className="text-xl md:text-2xl font-bold leading-relaxed max-w-sm">
                            <span className="text-wayo-coral block mb-2">Wanders too far?</span>
                            <span className="text-gray-300 font-medium">Instant vibration alert.</span>
                        </p>
                    </div>

                    {/* Right Block */}
                    <div className="flex flex-col items-center group">
                        <div className="w-24 h-24 bg-white/10 rounded-[2rem] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 backdrop-blur-sm border border-white/20">
                            <Droplet className="w-12 h-12 text-[#2D9C8F]" />
                        </div>
                        <p className="text-xl md:text-2xl font-bold leading-relaxed max-w-sm">
                            <span className="text-[#2D9C8F] block mb-2">Falls in water?</span>
                            <span className="text-gray-300 font-medium">Instant submersion alert.</span>
                        </p>
                    </div>
                </div>

                <Link
                    to="/features"
                    className="inline-flex items-center gap-2 bg-wayo-coral text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-red-700 hover:shadow-xl transition-all text-lg"
                >
                    See All Features <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </section>
    );
}
