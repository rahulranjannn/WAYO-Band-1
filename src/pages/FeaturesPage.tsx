import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { ArrowRight, Wifi, Droplet, Battery, Maximize, Activity, ShieldAlert, BadgeCheck } from 'lucide-react';

interface FeaturesPageProps {
    onOpenWaitlist: () => void;
}

export function FeaturesPage({ onOpenWaitlist }: FeaturesPageProps) {
    return (
        <main className="bg-white">
            <SEO
                title="Wayo Band Features"
                description="Wayo Band has two built-in shields — distance alert (30–100m) and water submersion alert. Two protections, one wristband, zero monthly fees."
                path="/features"
            />
            {/* Hero */}
            <section className="pt-36 lg:pt-48 pb-12 text-center max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center">
                <span className="bg-wayo-coral text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
                    TWO SHIELDS. ONE BAND.
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1A1A2E] mb-6 leading-[1.1]">
                    Everything protecting your child.<br />
                    Nothing getting in the way.
                </h1>
                <p className="text-xl text-[#4B5563] max-w-[560px] mx-auto leading-relaxed">
                    Wayo does two jobs silently and simultaneously — so you can stop worrying and start living.
                </p>
            </section>

            {/* Section 1 — Dual Feature Split */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="text-wayo-coral text-sm font-bold tracking-widest uppercase">WHAT WAYO DOES</span>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Card 1 — Distance Alert */}
                        <div className="bg-[#FFF9F7] rounded-[24px] p-8 md:p-12 shadow-sm border border-[#FBE8E1] relative flex flex-col items-start">
                            <div className="absolute top-8 left-8 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold tracking-widest text-wayo-coral shadow-sm">
                                FEATURE 01
                            </div>

                            <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-900 mb-8 mt-10">
                                <Activity className="w-10 h-10" />
                            </div>

                            <h2 className="text-3xl font-extrabold text-[#1A1A2E] mb-2">Wanders Too Far?</h2>
                            <h3 className="text-2xl font-bold text-wayo-coral mb-6">You'll feel it instantly.</h3>
                            <p className="text-[#4B5563] leading-relaxed mb-10 text-lg">
                                The moment your child moves beyond a safe range whether across a crowded market or down a busy beach both your bands vibrate at the same time. No phone needed. No fumbling. Just an instant signal that says: go find them now.
                            </p>

                            <div className="flex flex-wrap gap-3 mt-auto">
                                <span className="bg-white px-4 py-2 rounded-full text-sm font-bold text-[#1A1A2E] shadow-sm border border-gray-100 flex items-center gap-2">
                                    <Wifi className="w-4 h-4 text-wayo-coral" /> 10–100m range
                                </span>
                                <span className="bg-white px-4 py-2 rounded-full text-sm font-bold text-[#1A1A2E] shadow-sm border border-gray-100 flex items-center gap-2">
                                    <ShieldAlert className="w-4 h-4 text-wayo-coral" /> Silent until needed
                                </span>
                                <span className="bg-white px-4 py-2 rounded-full text-sm font-bold text-[#1A1A2E] shadow-sm border border-gray-100 flex items-center gap-2">
                                    <BadgeCheck className="w-4 h-4 text-wayo-coral" /> Works for elderly too
                                </span>
                            </div>
                        </div>

                        {/* Card 2 — Water Submersion Alert */}
                        <div className="bg-[#F0FAFA] rounded-[24px] p-8 md:p-12 shadow-sm border border-[#E0F2F2] relative flex flex-col items-start">
                            <div className="absolute top-8 left-8 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold tracking-widest text-[#2D9C8F] shadow-sm">
                                FEATURE 02
                            </div>

                            <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-900 mb-8 mt-10">
                                <Droplet className="w-10 h-10" />
                            </div>

                            <h2 className="text-3xl font-extrabold text-[#1A1A2E] mb-2">Falls into Water?</h2>
                            <h3 className="text-2xl font-bold text-[#2D9C8F] mb-6">You'll know within seconds.</h3>
                            <p className="text-[#4B5563] leading-relaxed mb-10 text-lg">
                                If the child's band gets submerged in water a pool, a lake, a river your parent band triggers an immediate alert. Not for splashes. Not for rain. Only when it matters: full submersion. Because a second is all it takes.
                            </p>

                            <div className="flex flex-wrap gap-3 mt-auto">
                                <span className="bg-white px-4 py-2 rounded-full text-sm font-bold text-[#1A1A2E] shadow-sm border border-gray-100 flex items-center gap-2">
                                    <Droplet className="w-4 h-4 text-[#2D9C8F]" /> Detects full submersion
                                </span>
                                <span className="bg-white px-4 py-2 rounded-full text-sm font-bold text-[#1A1A2E] shadow-sm border border-gray-100 flex items-center gap-2">
                                    <Activity className="w-4 h-4 text-[#2D9C8F]" /> Ignores splashes & rain
                                </span>
                                <span className="bg-white px-4 py-2 rounded-full text-sm font-bold text-[#1A1A2E] shadow-sm border border-gray-100 flex items-center gap-2">
                                    <BadgeCheck className="w-4 h-4 text-[#2D9C8F]" /> Beach, pool, river-ready
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2 — Smart Enough */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-extrabold text-[#1A1A2E] mb-6">
                                It <span className="text-[#2D9C8F]">knows</span> a splash from a fall.
                            </h2>
                            <p className="text-xl text-[#4B5563] leading-relaxed mb-8">
                                Not every drop of water is danger. Wayo's water sensor is calibrated to trigger only on full submersion — ignoring handwashing, rain, and the inevitable splash fight. So you only get alerted when something is actually wrong.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 text-2xl">✅</div>
                                    <div>
                                        <strong className="text-[#1A1A2E] block">Triggers on:</strong>
                                        <span className="text-[#4B5563]">Full submersion in pool, lake, river, or sea</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 text-2xl">❌</div>
                                    <div>
                                        <strong className="text-[#1A1A2E] block">Won't trigger on:</strong>
                                        <span className="text-[#4B5563]">Rain, splashing, washing hands, sweat</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Visual Animation */}
                        <div className="relative aspect-square md:aspect-[4/3] bg-[#F0FAFA] rounded-[24px] overflow-hidden flex items-center justify-center border border-[#E0F2F2]">
                            <div className="relative w-64 h-64">
                                {/* Simplified representational animation */}
                                <div className="absolute inset-0 flex items-center justify-center gap-8">
                                    <div className="text-center">
                                        <div className="w-20 h-20 bg-white rounded-2xl shadow-sm text-4xl flex items-center justify-center mb-4 relative mx-auto opacity-50">
                                            🌊
                                            <div className="absolute -top-2 -right-2 bg-gray-200 text-xs px-2 py-0.5 rounded-full font-bold">❌</div>
                                        </div>
                                        <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">SPLASH</span>
                                    </div>

                                    <div className="text-center relative">
                                        <div className="absolute inset-0 bg-wayo-coral rounded-2xl animate-ping opacity-30"></div>
                                        <div className="w-20 h-20 bg-wayo-coral text-white rounded-2xl shadow-xl text-4xl flex items-center justify-center mb-4 relative mx-auto z-10 border-4 border-white">
                                            🌊
                                            <div className="absolute -top-2 -right-2 bg-white text-[#1A1A2E] text-xs px-2 py-0.5 rounded-full font-bold shadow-sm">✅</div>
                                        </div>
                                        <span className="text-xs text-wayo-coral font-bold uppercase tracking-widest">SUBMERVED</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3 — Comparison Table */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-[#1A1A2E] mb-12 text-center">
                        Two threats covered. Zero extra gadgets.
                    </h2>

                    <div className="bg-white rounded-[24px] shadow-sm overflow-hidden border border-gray-100 overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="p-6 border-b border-gray-100 bg-gray-50/50 w-1/3"></th>
                                    <th className="p-6 border-b border-gray-100 bg-wayo-coral text-white font-bold text-lg text-center rounded-t-xl mx-2 shadow-sm">
                                        🟠 Wayo Band
                                    </th>
                                    <th className="p-6 border-b border-gray-100 text-center font-bold text-[#1A1A2E]">GPS Tracker</th>
                                    <th className="p-6 border-b border-gray-100 text-center font-bold text-[#1A1A2E]">Smartwatch</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm md:text-base">
                                <tr>
                                    <td className="p-6 font-bold text-[#1A1A2E]">Distance Alert</td>
                                    <td className="p-6 text-center text-[#2D9C8F] font-bold text-xl bg-[#FFF9F7]">✅</td>
                                    <td className="p-6 text-center text-[#2D9C8F] font-bold text-xl">✅</td>
                                    <td className="p-6 text-center text-gray-300 font-bold text-xl">❌</td>
                                </tr>
                                <tr>
                                    <td className="p-6 font-bold text-[#1A1A2E]">Water Submersion Alert</td>
                                    <td className="p-6 text-center text-[#2D9C8F] font-bold text-xl bg-[#FFF9F7]">✅</td>
                                    <td className="p-6 text-center text-gray-300 font-bold text-xl">❌</td>
                                    <td className="p-6 text-center text-gray-300 font-bold text-xl">❌</td>
                                </tr>
                                <tr>
                                    <td className="p-6 font-bold text-[#1A1A2E]">Works without phone/internet</td>
                                    <td className="p-6 text-center text-[#2D9C8F] font-bold text-xl bg-[#FFF9F7]">✅</td>
                                    <td className="p-6 text-center text-gray-300 font-bold text-xl">❌</td>
                                    <td className="p-6 text-center text-gray-300 font-bold text-xl">❌</td>
                                </tr>
                                <tr>
                                    <td className="p-6 font-bold text-[#1A1A2E]">Monthly subscription fee</td>
                                    <td className="p-6 text-center text-[#1A1A2E] font-bold bg-[#FFF9F7]">❌ None</td>
                                    <td className="p-6 text-center text-gray-400">✅ Required</td>
                                    <td className="p-6 text-center text-gray-400">✅ Required</td>
                                </tr>
                                <tr>
                                    <td className="p-6 font-bold text-[#1A1A2E]">Suitable for toddlers</td>
                                    <td className="p-6 text-center text-[#2D9C8F] font-bold text-xl bg-[#FFF9F7]">✅</td>
                                    <td className="p-6 text-center text-gray-300 font-bold text-xl">❌</td>
                                    <td className="p-6 text-center text-gray-300 font-bold text-xl">❌</td>
                                </tr>
                                <tr>
                                    <td className="p-6 font-bold text-[#1A1A2E]">Grandparent-friendly</td>
                                    <td className="p-6 text-center text-[#2D9C8F] font-bold text-xl bg-[#FFF9F7]">✅</td>
                                    <td className="p-6 text-center text-gray-300 font-bold text-xl">❌</td>
                                    <td className="p-6 text-center text-gray-300 font-bold text-xl">❌</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Section 4 — Real Scenarios */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-center text-[#1A1A2E] mb-2">Built for real Indian family life.</h2>
                    <p className="text-center text-[#4B5563] mb-12">Not a lab. Real places. Real moments.</p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Scenario 1 */}
                        <div className="bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm flex flex-col hover:-translate-y-1 transition-transform">
                            <div className="aspect-video bg-gray-200">
                                <img src="/festival1.webp" alt="Festival" width="400" height="225" loading="lazy" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6 flex-grow flex flex-col items-start">
                                <span className="bg-wayo-coral/10 text-wayo-coral text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4">DISTANCE ALERT</span>
                                <h3 className="text-xl font-bold text-[#1A1A2E] mb-3 flex items-center gap-2">🎡 The Festival</h3>
                                <p className="text-[#4B5563]">Your child runs toward the lights. The crowd swallows them. Before you even panic — your wrist vibrates.</p>
                            </div>
                        </div>

                        {/* Scenario 2 */}
                        <div className="bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm flex flex-col hover:-translate-y-1 transition-transform">
                            <div className="aspect-video bg-gray-200">
                                <img src="/beach1.webp" alt="Beach" width="400" height="225" loading="lazy" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6 flex-grow flex flex-col items-start">
                                <span className="bg-[#2D9C8F]/10 text-[#2D9C8F] text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4">WATER ALERT</span>
                                <h3 className="text-xl font-bold text-[#1A1A2E] mb-3 flex items-center gap-2">🏖️ The Beach</h3>
                                <p className="text-[#4B5563]">You turn to grab the sunscreen. They take one step too many. Wayo alerts you before they're even knee-deep.</p>
                            </div>
                        </div>

                        {/* Scenario 3 */}
                        <div className="bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm flex flex-col hover:-translate-y-1 transition-transform">
                            <div className="aspect-video bg-gray-200">
                                <img src="/pool1.webp" alt="Pool" width="400" height="225" loading="lazy" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6 flex-grow flex flex-col items-start">
                                <span className="bg-[#2D9C8F]/10 text-[#2D9C8F] text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4">WATER ALERT</span>
                                <h3 className="text-xl font-bold text-[#1A1A2E] mb-3 flex items-center gap-2">🏊 The Building Pool</h3>
                                <p className="text-[#4B5563]">Society pools. Cousin's birthday. One adult supervising five kids. Wayo is the set of eyes you can't always have.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 5 — Tech Specs */}
            <section className="py-24 bg-wayo-cream">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-extrabold text-[#1A1A2E] mb-12">The details, without the jargon.</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                            <Wifi className="w-8 h-8 text-[#1A1A2E] mb-4" />
                            <h4 className="font-bold text-[#1A1A2E]">Alert Range</h4>
                            <p className="text-sm text-[#4B5563] mt-2">30–100m outdoors <br /> 20–30m indoors</p>
                        </div>
                        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                            <Droplet className="w-8 h-8 text-[#1A1A2E] mb-4" />
                            <h4 className="font-bold text-[#1A1A2E]">Water Alert</h4>
                            <p className="text-sm text-[#4B5563] mt-2">Triggers on full submersion only</p>
                        </div>
                        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                            <Battery className="w-8 h-8 text-[#1A1A2E] mb-4" />
                            <h4 className="font-bold text-[#1A1A2E]">Battery Life</h4>
                            <p className="text-sm text-[#4B5563] mt-2">Several days per charge (USB-C)</p>
                        </div>
                        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                            <Maximize className="w-8 h-8 text-[#1A1A2E] mb-4" />
                            <h4 className="font-bold text-[#1A1A2E]">Weight</h4>
                            <p className="text-sm text-[#4B5563] mt-2">Light enough to forget you're wearing it</p>
                        </div>
                    </div>

                    <p className="text-sm text-gray-500 max-w-2xl mx-auto">
                        Wayo is a safety alert device — not a substitute for adult supervision. Always watch children near water.
                    </p>
                </div>
            </section>

            {/* Section 6 — FAQ Teaser */}
            <section className="py-24 bg-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <div className="space-y-4 mb-8">
                        <div className="border border-gray-200 rounded-[20px] p-6 bg-gray-50">
                            <h4 className="font-bold text-[#1A1A2E] mb-2">Q: Does it need WiFi or a SIM card?</h4>
                            <p className="text-[#4B5563]">
                                A: Nope. Wayo works completely offline — no internet, no SIM, no monthly fees. Ever.
                            </p>
                        </div>
                        <div className="border border-gray-200 rounded-[20px] p-6 bg-gray-50">
                            <h4 className="font-bold text-[#1A1A2E] mb-2">Q: How far is "too far"?</h4>
                            <p className="text-[#4B5563]">
                                A: It depends on where you are. In open spaces like parks or beaches, Wayo alerts at up to 100 metres. In crowded places like malls or festivals, it triggers sooner — around 10–30 metres — because that's actually when you need it most.
                            </p>
                        </div>
                        <div className="border border-gray-200 rounded-[20px] p-6 bg-gray-50">
                            <h4 className="font-bold text-[#1A1A2E] mb-2">Q: Will it alert if my child is just playing in rain or washing hands?</h4>
                            <p className="text-[#4B5563]">
                                A: No. Wayo's water sensor is calibrated for full submersion only — not surface contact. Splashes, rain, and handwashing won't trigger it.
                            </p>
                        </div>
                        <div className="border border-gray-200 rounded-[20px] p-6 bg-gray-50">
                            <h4 className="font-bold text-[#1A1A2E] mb-2">Q: Does the water alert work in the sea as well as pools?</h4>
                            <p className="text-[#4B5563]">
                                A: Yes — it works in fresh water, salt water, pools, lakes, and rivers.
                            </p>
                        </div>
                    </div>
                    <div className="text-center">
                        <Link to="/faq" className="text-wayo-coral font-bold hover:underline inline-flex items-center text-lg">
                            See all FAQs <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="bg-wayo-coral rounded-[30px] p-12 text-center flex flex-col items-center">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-8">
                            Two features. One band. One family protected.
                        </h2>
                        <button
                            onClick={onOpenWaitlist}
                            className="bg-white text-wayo-coral px-8 py-4 rounded-full font-bold transition-all shadow-xl hover:bg-gray-50 inline-flex items-center text-lg"
                        >
                            Get Early Access <ArrowRight className="w-5 h-5 ml-2" />
                        </button>
                    </div>
                </div>
            </section>

        </main>
    );
}
