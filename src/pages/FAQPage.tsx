import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SEO } from '../components/SEO';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FAQPageProps {
    onOpenWaitlist: () => void;
}

export function FAQPage({ onOpenWaitlist }: FAQPageProps) {
    const faqs = [
        {
            category: "Product Questions",
            items: [
                { q: "What exactly is Wayo Band?", a: "It's a pair of wristbands — one for you, one for your child (or loved one). When they move too far from you, both bands vibrate at the same time, instantly alerting both of you." },
                { q: "Does it need a phone, WiFi, or internet?", a: "Not at all. Wayo works completely on its own — no app, no internet connection, no SIM card. Just put it on and go." },
                { q: "How far is \"too far\"?", a: "It depends on where you are. In open spaces like parks or beaches, Wayo alerts at up to 100 metres." },
                { q: "Does Wayo alert me if my child falls into water?", a: "Yes. The child's band has a water submersion sensor. If it detects full submersion — in a pool, lake, river, or sea — your parent band instantly vibrates to alert you. It won't go off for rain, splashes, or handwashing." },
                { q: "Will it work in saltwater (sea/ocean)?", a: "Yes — Wayo's water sensor works in both fresh water and salt water." },
                { q: "How long does the battery last?", a: "Several days on a full charge. Wayo charges via USB-C (same as most phones today), and will gently alert you before the battery gets too low." },
                { q: "Is it waterproof?", a: "Wayo is splash-resistant and built for everyday outdoor use. We don't recommend submerging it." },
                { q: "Will it work in crowded places like malls or metro stations?", a: "Yes. Wayo doesn't rely on mobile networks or WiFi signals, so crowded spaces or underground locations don't affect it at all." },
                { q: "What age is it suitable for?", a: "Wayo is designed for children aged 2 and up, and works equally well for elderly family members who need gentle monitoring." },
                { q: "Can I pair more than two bands?", a: "The first version comes as a pair — one for you, one for your child. V2 supports one parent band connected to multiple child bands — perfect for families with two or more kids. Register early and you'll be first to own it when that's available." },
            ]
        },
        {
            category: "Early Access Questions",
            items: [
                { q: "When does Wayo launch?", a: "We're targeting April 2026 for our first batch." },
                { q: "What happens when I register?", a: "You'll be among the first to know when Wayo is available. No payment is collected now." },
                { q: "Will early access members get anything special?", a: "Yes — early registrants will have first access to the first batch before it opens to the public." },
                { q: "How do I contact you?", a: "Reach us at hello@wayoband.com or through our Contact page." },
            ]
        }
    ];

    const [openIndex, setOpenIndex] = useState<{ cat: number, idx: number } | null>(null);

    const toggle = (cat: number, idx: number) => {
        if (openIndex?.cat === cat && openIndex?.idx === idx) {
            setOpenIndex(null);
        } else {
            setOpenIndex({ cat, idx });
        }
    };

    return (
        <main className="bg-wayo-cream min-h-screen">
            <SEO
                title="Wayo Band FAQ"
                description="Answers to your questions about Wayo Band — range, battery life, water alerts, early access, and how it works. No jargon, just honest answers."
                path="/faq"
            />
            {/* Hero */}
            <section className="pt-36 lg:pt-48 pb-12 text-center max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center">
                <span className="text-wayo-coral text-sm font-bold tracking-widest uppercase mb-4 block">
                    FAQ
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#1A1A2E] mb-6">
                    Every question, answered honestly.
                </h1>
                <p className="text-xl text-[#4B5563]">
                    No jargon. No fine print. Just real answers.
                </p>
            </section>

            {/* Accordions */}
            <section className="py-16">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                    {faqs.map((category, catIndex) => (
                        <div key={catIndex}>
                            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-6">{category.category}</h2>
                            <div className="space-y-4">
                                {category.items.map((faq, idx) => {
                                    const isOpen = openIndex?.cat === catIndex && openIndex?.idx === idx;
                                    return (
                                        <div key={idx} className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
                                            <button
                                                className="w-full text-left px-6 py-5 flex items-center justify-between font-bold text-[#1A1A2E] text-lg hover:bg-gray-50 transition-colors"
                                                onClick={() => toggle(catIndex, idx)}
                                            >
                                                {faq.q}
                                                <ChevronDown className={`w-5 h-5 text-wayo-coral transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                                            </button>
                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <div className="px-6 pb-5 text-[#4B5563] leading-relaxed">
                                                            {faq.a}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Strip */}
            <section className="py-24">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <div className="bg-white rounded-[30px] p-10 text-center shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-[#1A1A2E] mb-6">
                            Can't find your answer?
                        </h2>
                        <Link
                            to="/contact"
                            className="bg-transparent border-2 border-wayo-coral text-wayo-coral px-8 py-3.5 rounded-full font-bold hover:bg-wayo-coral hover:text-white transition-colors inline-flex items-center text-lg"
                        >
                            Talk to Us <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
