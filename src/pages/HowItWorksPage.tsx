import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Store, Umbrella, Tent, TreePine, ChevronRight } from 'lucide-react';

interface HowItWorksPageProps {
    onOpenWaitlist: () => void;
}

export function HowItWorksPage({ onOpenWaitlist }: HowItWorksPageProps) {
    const steps = [
        {
            num: 1,
            title: "Wear It",
            body: "Put one band on your wrist, one on theirs. Soft, adjustable, and light enough to forget it's there.",
            image: "/childband.png"
        },
        {
            num: 2,
            title: "Roam Free",
            body: "As long as they're within a safe range, both bands stay quiet. No buzzes, no alerts — just a normal, happy day.",
            image: "/three.png"
        },
        {
            num: 3,
            title: "Instant Alert",
            body: "The moment they wander too far, BOTH bands vibrate at the same time — alerting you and stopping them instinctively.",
            image: "/her.png"
        }
    ];

    const places = [
        { icon: <Store className="w-8 h-8 text-wayo-coral mb-3" />, label: "Busy Malls", desc: "Through crowds and noise" },
        { icon: <Umbrella className="w-8 h-8 text-wayo-coral mb-3" />, label: "Beaches", desc: "Sand and splash resistant" },
        { icon: <Tent className="w-8 h-8 text-wayo-coral mb-3" />, label: "Festivals & Fairs", desc: "Works without signal" },
        { icon: <TreePine className="w-8 h-8 text-wayo-coral mb-3" />, label: "Parks & Trails", desc: "Perfect for outdoors" }
    ];

    return (
        <main className="bg-white">
            {/* Hero */}
            <section className="pt-36 lg:pt-48 pb-12 text-center max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center">
                <span className="text-wayo-coral text-sm font-bold tracking-widest uppercase mb-4 block">
                    How It Works
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#1A1A2E] mb-6">
                    Simple enough for a toddler.<br className="hidden md:block" /> Safe enough for every parent.
                </h1>
                <p className="text-xl text-[#6B7280]">
                    No charging apps. No reading manuals. Wayo just works.
                </p>
            </section>

            {/* 3 Steps */}
            <section className="py-16 bg-wayo-cream">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-[#1A1A2E] mb-12">Three steps. That's it.</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {steps.map((step) => (
                            <motion.div
                                key={step.num}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-[20px] shadow-sm overflow-hidden border border-gray-100 p-6 flex flex-col"
                            >
                                <div className="rounded-2xl overflow-hidden mb-6 aspect-video bg-gray-100">
                                    <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="w-10 h-10 rounded-full bg-wayo-coral text-white flex items-center justify-center font-bold text-xl mb-4">
                                    {step.num}
                                </div>
                                <h3 className="text-2xl font-bold text-[#1A1A2E] mb-3">{step.title}</h3>
                                <p className="text-[#6B7280] leading-relaxed flex-grow">{step.body}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The 10–100 Metre Promise */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-[#1A1A2E] mb-6">
                                The <span className="text-[#2D9C8F]">10–100 Metre</span> Promise
                            </h2>
                            <p className="text-xl text-[#6B7280] leading-relaxed">
                                Wayo is calibrated to a 10–100 metre safe zone — far enough for kids to explore, close enough for you to reach them in seconds.
                            </p>
                        </div>
                        {/* Visual Explainer Animation */}
                        <div className="relative aspect-square md:aspect-[4/3] bg-wayo-cream rounded-[20px] flex items-center justify-center overflow-hidden shadow-sm">
                            <div className="relative w-64 h-64 flex items-center justify-center">
                                {/* Safe zone circle */}
                                <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#2D9C8F]/50 animate-[spin_10s_linear_infinite]"></div>
                                <div className="absolute inset-4 rounded-full bg-[#2D9C8F]/10"></div>

                                {/* Parent icon */}
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
                                    <div className="w-12 h-12 bg-[#1A1A2E] rounded-full text-white flex items-center justify-center ring-4 ring-white shadow-lg z-10 font-bold">P</div>
                                </div>

                                {/* Child icon */}
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
                                    <div className="w-10 h-10 bg-wayo-coral rounded-full text-white flex items-center justify-center ring-4 ring-white shadow-lg z-10 font-bold">C</div>
                                </div>

                                {/* Distance text */}
                                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-bold text-[#2D9C8F] bg-white px-3 py-1 rounded-full shadow-sm z-10">
                                    100 metres
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Works Everywhere */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-[#1A1A2E] mb-12">Works everywhere they go.</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {places.map((place, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-[20px] shadow-sm text-center border border-gray-100 transform hover:-translate-y-1 transition-transform">
                                <div className="flex justify-center">{place.icon}</div>
                                <h3 className="font-bold text-[#1A1A2E] mb-1">{place.label}</h3>
                                <p className="text-sm text-[#6B7280]">{place.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Teaser */}
            <section className="py-24 bg-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <h2 className="text-3xl font-bold text-[#1A1A2E] mb-8 text-center">Still curious?</h2>
                    <div className="space-y-4 mb-8">
                        <div className="border border-gray-200 rounded-[20px] p-6 bg-gray-50">
                            <h4 className="font-bold text-[#1A1A2E] flex items-center mb-2">
                                <ChevronRight className="w-5 h-5 text-wayo-coral mr-2 rotate-90" />
                                Does it need WiFi or a SIM card?
                            </h4>
                            <p className="text-[#6B7280] pl-7">
                                Nope. Wayo works completely offline — no internet, no SIM, no monthly fees. Ever.
                            </p>
                        </div>
                        <div className="border border-gray-200 rounded-[20px] p-6 bg-gray-50">
                            <h4 className="font-bold text-[#1A1A2E] flex items-center mb-2">
                                <ChevronRight className="w-5 h-5 text-wayo-coral mr-2 rotate-90" />
                                What if the battery dies?
                            </h4>
                            <p className="text-[#6B7280] pl-7">
                                Wayo charges via USB-C and lasts for days on a single charge. A low battery will alert you well in advance.
                            </p>
                        </div>
                    </div>
                    <div className="text-center">
                        <Link to="/faq" className="text-wayo-coral font-bold hover:underline inline-flex items-center">
                            See all FAQs <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Strip */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="bg-gray-100 rounded-[30px] p-10 text-center flex flex-col items-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-6">
                            Ready to give your family a safety net?
                        </h2>
                        <button
                            onClick={onOpenWaitlist}
                            className="bg-wayo-coral text-white px-8 py-3.5 rounded-full font-bold transition-all shadow-md hover:bg-red-700 inline-flex items-center shadow-wayo-coral/30"
                        >
                            Get Early Access <ArrowRight className="w-5 h-5 ml-2" />
                        </button>
                    </div>
                </div>
            </section>

        </main>
    );
}
