import { Instagram, Linkedin, Twitter, ArrowRight } from 'lucide-react';

export function ContactPage() {
    return (
        <main className="bg-wayo-cream min-h-screen">
            {/* Hero */}
            <section className="pt-36 lg:pt-48 pb-12 text-center max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center">
                <span className="text-wayo-coral text-sm font-bold tracking-widest uppercase mb-4 block">
                    CONTACT
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#1A1A2E] mb-6">
                    We're real people. Say hello.
                </h1>
                <p className="text-xl text-[#6B7280]">
                    We read and reply to every message personally.
                </p>
            </section>

            {/* 2-column Layout */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">

                        {/* Left Column: Contact Details */}
                        <div>
                            <h2 className="text-3xl font-bold text-[#1A1A2E] mb-8">Get in touch</h2>
                            <div className="space-y-6 text-[#1A1A2E] text-lg font-medium">
                                <p className="flex items-center gap-3">
                                    <span className="text-2xl">📧</span> Email: <a href="mailto:hello@wayoband.com" className="text-wayo-coral hover:underline">hello@wayoband.com</a>
                                </p>
                                <p className="flex items-center gap-3">
                                    <span className="text-2xl">📱</span> WhatsApp: <span className="font-bold">+91 98765 43210</span> <span className="text-[#6B7280] font-normal text-sm ml-2">(for quick queries)</span>
                                </p>
                                <p className="flex items-center gap-3">
                                    <span className="text-2xl">📍</span> Based in: India 🇮🇳
                                </p>
                                <p className="flex items-center gap-3">
                                    <span className="text-2xl">🕐</span> Response time: Within 24 hours
                                </p>
                            </div>

                            <div className="mt-12">
                                <div className="flex gap-4">
                                    <a href="#" className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#1A1A2E] hover:text-white hover:bg-wayo-coral hover:border-wayo-coral transition-all shadow-sm">
                                        <Instagram className="w-6 h-6" />
                                    </a>
                                    <a href="#" className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#1A1A2E] hover:text-white hover:bg-wayo-coral hover:border-wayo-coral transition-all shadow-sm">
                                        <Linkedin className="w-6 h-6" />
                                    </a>
                                    <a href="#" className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#1A1A2E] hover:text-white hover:bg-wayo-coral hover:border-wayo-coral transition-all shadow-sm">
                                        <Twitter className="w-6 h-6" />
                                    </a>
                                </div>
                            </div>

                            <div className="mt-12 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                                <p className="text-[#6B7280] italic leading-relaxed">
                                    We're a small team building something we genuinely believe in. Your message won't go to a bot — it comes straight to us.
                                </p>
                            </div>
                        </div>

                        {/* Right Column: Contact Form */}
                        <div className="bg-white rounded-[30px] p-8 shadow-sm border border-gray-100">
                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-[#1A1A2E] mb-2">Full Name</label>
                                    <input type="text" placeholder="Jane Doe" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-wayo-coral focus:ring-2 focus:ring-wayo-coral/20 outline-none transition-all placeholder-gray-400" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#1A1A2E] mb-2">Email Address</label>
                                    <input type="email" placeholder="jane@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-wayo-coral focus:ring-2 focus:ring-wayo-coral/20 outline-none transition-all placeholder-gray-400" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#1A1A2E] mb-2">Phone (optional)</label>
                                    <input type="tel" placeholder="+91 98765 43210" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-wayo-coral focus:ring-2 focus:ring-wayo-coral/20 outline-none transition-all placeholder-gray-400" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#1A1A2E] mb-2">I'm reaching out about…</label>
                                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-wayo-coral focus:ring-2 focus:ring-wayo-coral/20 outline-none transition-all bg-white text-[#1A1A2E]">
                                        <option>Early Access</option>
                                        <option>Product Question</option>
                                        <option>Press & Media</option>
                                        <option>Partnership</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#1A1A2E] mb-2">Message</label>
                                    <textarea rows={4} placeholder="How can we help?" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-wayo-coral focus:ring-2 focus:ring-wayo-coral/20 outline-none transition-all placeholder-gray-400 resize-none"></textarea>
                                </div>

                                <button type="button" className="w-full bg-wayo-coral text-white py-4 rounded-xl font-bold shadow-lg shadow-wayo-coral/30 hover:bg-red-700 transition-all inline-flex items-center justify-center">
                                    Send Message <ArrowRight className="w-5 h-5 ml-2" />
                                </button>

                                <p className="text-center text-sm text-[#6B7280] mt-4">
                                    Or email us directly at <a href="mailto:hello@wayoband.com" className="font-bold underline text-[#1A1A2E]">hello@wayoband.com</a>
                                </p>
                            </form>
                        </div>

                    </div>
                </div>
            </section>

            {/* Map Strip (Optional) */}
            <section className="py-24 border-t border-gray-200 relative overflow-hidden bg-white">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
                    <svg width="600" height="600" viewBox="0 0 100 100" className="fill-current text-[#1A1A2E]">
                        <path d="M50 0 L100 50 L50 100 L0 50 Z" />
                    </svg>
                </div>
                <div className="relative z-10 text-center">
                    <p className="text-xl font-bold text-[#1A1A2E] tracking-widest uppercase flex items-center justify-center gap-3">
                        Proudly built in India <span>🇮🇳</span>
                    </p>
                </div>
            </section>
        </main>
    );
}
