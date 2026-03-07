import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(false);

        const form = e.currentTarget;
        const data = new FormData(form);

        try {
            const response = await fetch("https://formspree.io/f/YOUR_ENDPOINT_ID", {
                method: "POST",
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (response.ok) {
                setSubmitted(true);
            } else {
                setError(true);
            }
        } catch (err) {
            setError(true);
        }
    };

    return (
        <main className="min-h-screen bg-[#FAFAF8] font-sans pb-0">
            <SEO
                title="Contact Wayo Band"
                description="Get in touch with the Wayo team. We're real people and we reply to every message personally. Email us at hello@wayoband.com."
                path="/contact"
            />
            {/* SECTION 1 — PAGE HERO BANNER */}
            <section
                className="text-center rounded-b-[32px] pt-[140px] pb-[60px] px-6"
                style={{ background: 'linear-gradient(135deg, #1A2E44, #2D4A6B)' }}
            >
                <div className="inline-block bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 font-['DM_Sans'] text-[12px] font-semibold tracking-[0.1em] mb-4 uppercase">
                    GET IN TOUCH
                </div>

                <h1 className="font-['Playfair_Display'] text-[44px] font-bold text-white leading-tight mb-4 max-w-2xl mx-auto">
                    We'd love to hear<br />from you.
                </h1>

                <p className="font-['DM_Sans'] text-[17px] text-white/70 leading-[1.6] max-w-[480px] mx-auto">
                    Questions about Wayo Band? Partnership ideas?<br />
                    Just want to say hi?— <br />
                    we read every message.
                </p>

                <div className="flex justify-center items-center gap-2 mt-6">
                    <div className="w-[48px] h-[10px] bg-[#A8C8E8] rounded-[5px]"></div>
                    <div className="w-[60px] h-[10px] bg-[#F2A8B8] rounded-[5px]"></div>
                </div>
            </section>

            {/* SECTION 2 — MAIN CONTENT */}
            <section className="py-[48px] md:py-[64px] pb-[64px] md:pb-[96px] px-[20px] md:px-[24px] max-w-[1100px] mx-auto">
                <div className="flex flex-col md:flex-row gap-8 md:gap-0">

                    {/* Mobile: info first, Desktop: form first. CSS trick: use order-2 md:order-1 for form */}
                    <div className="w-full md:w-[55%] order-2 md:order-1">
                        <div className="bg-white rounded-[20px] md:rounded-[24px] p-[32px] md:p-[40px] shadow-[0_4px_24px_rgba(26,46,68,0.08)] border border-[#EAE4DC] m-0">

                            {!submitted ? (
                                <>
                                    <h2 className="font-['DM_Sans'] text-[20px] font-semibold text-[#1A2E44] mb-2">Send us a message</h2>
                                    <p className="font-['DM_Sans'] text-[14px] text-[#7A8FA0] mb-[28px]">We reply within 24 hours on working days.</p>

                                    <form onSubmit={handleSubmit}>
                                        <input type="hidden" name="_subject" value="Contact Form — Wayo Band" />
                                        <input type="hidden" name="source" value="contact_page" />

                                        <div className="mb-5">
                                            <label htmlFor="contact-name" className="font-['DM_Sans'] text-[11px] font-semibold text-[#7A8FA0] tracking-[0.1em] uppercase block mb-1.5">
                                                YOUR NAME *
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[16px]"></span>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="contact-name"
                                                    aria-label="Full Name"
                                                    required
                                                    placeholder="Priya Sharma"
                                                    className="w-full pl-[44px] pr-4 py-[14px] border-[1.5px] border-[#E8E2D9] rounded-[14px] bg-[#FAFAF8] font-['DM_Sans'] text-[15px] text-[#1A2E44] transition-all duration-200 focus:border-[#5B7A99] focus:bg-white focus:shadow-[0_0_0_4px_rgba(91,122,153,0.12)] focus:outline-none [&:not(:placeholder-shown)]:border-[#52B788] [&:not(:placeholder-shown)]:bg-[#F0FBF4]"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-5">
                                            <label htmlFor="contact-email" className="font-['DM_Sans'] text-[11px] font-semibold text-[#7A8FA0] tracking-[0.1em] uppercase block mb-1.5">
                                                EMAIL ADDRESS *
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[16px]"></span>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="contact-email"
                                                    aria-label="Email Address"
                                                    required
                                                    placeholder="you@example.com"
                                                    className="w-full pl-[44px] pr-4 py-[14px] border-[1.5px] border-[#E8E2D9] rounded-[14px] bg-[#FAFAF8] font-['DM_Sans'] text-[15px] text-[#1A2E44] transition-all duration-200 focus:border-[#5B7A99] focus:bg-white focus:shadow-[0_0_0_4px_rgba(91,122,153,0.12)] focus:outline-none [&:not(:placeholder-shown)]:border-[#52B788] [&:not(:placeholder-shown)]:bg-[#F0FBF4]"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-5">
                                            <label htmlFor="contact-phone" className="font-['DM_Sans'] text-[11px] font-semibold text-[#7A8FA0] tracking-[0.1em] uppercase block mb-1.5">
                                                PHONE (OPTIONAL)
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[16px]"></span>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    id="contact-phone"
                                                    aria-label="Phone Number"
                                                    placeholder="+91 98765 43210"
                                                    className="w-full pl-[44px] pr-4 py-[14px] border-[1.5px] border-[#E8E2D9] rounded-[14px] bg-[#FAFAF8] font-['DM_Sans'] text-[15px] text-[#1A2E44] transition-all duration-200 focus:border-[#5B7A99] focus:bg-white focus:shadow-[0_0_0_4px_rgba(91,122,153,0.12)] focus:outline-none [&:not(:placeholder-shown)]:border-[#52B788] [&:not(:placeholder-shown)]:bg-[#F0FBF4]"
                                                />
                                            </div>
                                            <p className="text-[#7A8FA0] text-[12px] mt-1.5">Only if you'd prefer a WhatsApp reply</p>
                                        </div>

                                        <div className="mb-5">
                                            <label htmlFor="contact-topic" className="font-['DM_Sans'] text-[11px] font-semibold text-[#7A8FA0] tracking-[0.1em] uppercase block mb-1.5">
                                                WHAT'S THIS ABOUT?
                                            </label>
                                            <select
                                                name="topic"
                                                id="contact-topic"
                                                required
                                                aria-label="Topic"
                                                defaultValue=""
                                                className="w-full px-4 py-[14px] border-[1.5px] border-[#E8E2D9] rounded-[14px] bg-[#FAFAF8] font-['DM_Sans'] text-[15px] text-[#1A2E44] transition-all duration-200 focus:border-[#5B7A99] focus:bg-white focus:shadow-[0_0_0_4px_rgba(91,122,153,0.12)] focus:outline-none"
                                            >
                                                <option value="" disabled>Select a topic...</option>
                                                <option disabled>─────────────────</option>
                                                <option value="Pre-order / Waitlist question">🛒 Pre-order / Waitlist question</option>
                                                <option value="Product information">📦 Product information</option>
                                                <option value="Partnership / B2B inquiry">🤝 Partnership / B2B inquiry</option>
                                                <option value="Press / Media">📰 Press / Media</option>
                                                <option value="Website issue">🐛 Website issue</option>
                                                <option value="Just saying hi!">💬 Just saying hi!</option>
                                            </select>
                                        </div>

                                        <div className="mb-6">
                                            <label htmlFor="contact-message" className="font-['DM_Sans'] text-[11px] font-semibold text-[#7A8FA0] tracking-[0.1em] uppercase block mb-1.5">
                                                YOUR MESSAGE *
                                            </label>
                                            <textarea
                                                name="message"
                                                id="contact-message"
                                                aria-label="Your Message"
                                                required
                                                rows={5}
                                                placeholder="Tell us what's on your mind..."
                                                className="w-full px-4 py-[14px] min-h-[120px] resize-y border-[1.5px] border-[#E8E2D9] rounded-[14px] bg-[#FAFAF8] font-['DM_Sans'] text-[15px] text-[#1A2E44] transition-all duration-200 focus:border-[#5B7A99] focus:bg-white focus:shadow-[0_0_0_4px_rgba(91,122,153,0.12)] focus:outline-none [&:not(:placeholder-shown)]:border-[#52B788] [&:not(:placeholder-shown)]:bg-[#F0FBF4]"
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full py-4 rounded-[50px] font-['DM_Sans'] text-[16px] font-semibold text-white border-none cursor-pointer transition-all duration-200 shadow-[0_8px_24px_rgba(232,102,61,0.35)] hover:-translate-y-[2px] hover:shadow-[0_12px_28px_rgba(232,102,61,0.45)]"
                                            style={{ background: 'linear-gradient(135deg, #E8663D, #D4532A)' }}
                                        >
                                            Send Message →
                                        </button>
                                        {error && (
                                            <p className="text-red-500 text-sm mt-3 text-center">
                                                Something went wrong. Please email us directly at <a href="mailto:hello@wayoband.com" className="underline">hello@wayoband.com</a>
                                            </p>
                                        )}

                                        <div className="flex justify-center items-center gap-[10px] md:gap-5 mt-[14px] text-[12px] text-[#7A8FA0] flex-wrap">
                                            <span>🔒 Private</span>
                                            <span>·</span>
                                            <span>⚡ 24hr reply</span>
                                            <span>·</span>
                                            <span>🇮🇳 India-based team</span>
                                        </div>
                                    </form>
                                </>
                            ) : (
                                <div className="text-center bg-[#F0FBF4] rounded-[16px] p-[32px]">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 animate-[scaleIn_0.3s_ease-out]">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 6L9 17L4 12" stroke="#52B788" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#1A2E44] mb-2 font-['DM_Sans']">Message sent! 🎉</h3>
                                    <p className="text-[#3D4F5C] font-['DM_Sans'] text-[15px] leading-relaxed">
                                        We'll get back to you within 24 hours.<br />
                                        Check your email — we'll reply from hello@wayoband.com
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column (Info) */}
                    <div className="w-full md:w-[45%] md:pl-[40px] order-1 md:order-2">

                        {/* Section A - Direct Contact Cards */}
                        <div className="space-y-4">
                            <div className="bg-white border border-[#EAE4DC] rounded-[20px] p-6 flex items-start gap-4 transition-all duration-200 hover:-translate-y-[2px] hover:shadow-md w-full">
                                <div className="w-12 h-12 shrink-0 bg-[#EBF1F7] rounded-[14px] flex items-center justify-center text-[22px]">✉️</div>
                                <div>
                                    <h3 className="font-['DM_Sans'] text-[16px] font-semibold text-[#1A2E44]">Email Us</h3>
                                    <a href="mailto:hello@wayoband.com" className="text-[#5B7A99] hover:underline block mt-0.5">hello@wayoband.com</a>
                                    <p className="text-[12px] text-[#7A8FA0] mt-1">Best for detailed questions</p>
                                </div>
                            </div>

                            <div className="bg-white border border-[#EAE4DC] rounded-[20px] p-6 flex items-start gap-4 transition-all duration-200 hover:-translate-y-[2px] hover:shadow-md w-full">
                                <div className="w-12 h-12 shrink-0 bg-[#E8F5E9] rounded-[14px] flex items-center justify-center text-[22px]">💬</div>
                                <div>
                                    <h3 className="font-['DM_Sans'] text-[16px] font-semibold text-[#1A2E44]">WhatsApp</h3>
                                    <a href="https://wa.me/919430360099" target="_blank" rel="noopener noreferrer" className="text-[#5B7A99] hover:underline block mt-0.5">+919430360099</a>
                                    <p className="text-[12px] text-[#7A8FA0] mt-1">Quick questions & support</p>
                                </div>
                            </div>

                            <div className="bg-white border border-[#EAE4DC] rounded-[20px] p-6 flex items-start gap-4 transition-all duration-200 hover:-translate-y-[2px] hover:shadow-md w-full">
                                <div className="w-12 h-12 shrink-0 bg-[#FFF3E0] rounded-[14px] flex items-center justify-center text-[22px]">⚡</div>
                                <div>
                                    <h3 className="font-['DM_Sans'] text-[16px] font-semibold text-[#1A2E44]">Response Time</h3>
                                    <p className="text-[#1A2E44] mt-0.5 font-['DM_Sans']">Within 24 hours</p>
                                    <p className="text-[12px] text-[#7A8FA0] mt-1">Mon–Sat, 10am–7pm IST</p>
                                </div>
                            </div>
                        </div>

                        {/* Section B - About the Team */}
                        <div className="rounded-[20px] p-7 mt-6 w-full" style={{ background: 'linear-gradient(135deg, #1A2E44, #2D4A6B)' }}>
                            <div className="text-[11px] text-white/50 uppercase tracking-[0.05em] mb-2 font-semibold font-['DM_Sans']">WHO WE ARE</div>
                            <p className="font-['DM_Sans'] text-[15px] text-white/85 leading-[1.7]">
                                Wayo Band is built by PSU Pro Enterprises, a small team based in Ranchi, Jharkhand. We're engineers who believe child safety.
                            </p>
                            <div className="flex gap-1.5 mt-5">
                                <div className="w-[40px] h-[8px] bg-[#A8C8E8] rounded-[4px]"></div>
                                <div className="w-[52px] h-[8px] bg-[#F2A8B8] rounded-[4px]"></div>
                            </div>
                        </div>

                        {/* Section C - Social Links */}
                        <div className="mt-6 w-full">
                            <div className="text-[11px] text-[#4B5563] uppercase tracking-[0.1em] mb-3 font-semibold font-['DM_Sans']">FOLLOW OUR JOURNEY</div>
                            <div className="flex gap-3">
                                <a href="#" className="bg-[#FAFAF8] border border-[#EAE4DC] rounded-[100px] px-5 py-2.5 font-['DM_Sans'] text-[14px] font-medium text-[#1A2E44] flex items-center gap-2 hover:bg-[#EBF1F7] hover:border-[#5B7A99] transition-colors">
                                    <span>📸</span> @wayoband
                                </a>
                                <a href="https://chat.whatsapp.com" target="_blank" rel="noopener noreferrer" className="bg-[#FAFAF8] border border-[#EAE4DC] rounded-[100px] px-5 py-2.5 font-['DM_Sans'] text-[14px] font-medium text-[#1A2E44] flex items-center gap-2 hover:bg-[#EBF1F7] hover:border-[#5B7A99] transition-colors">
                                    <span>💬</span> Join Community
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* SECTION 3 — BOTTOM FAQ TEASER */}
            <section className="bg-[#F2EDE4] py-[64px] px-[24px] text-center">
                <div className="text-[12px] text-[#7A8FA0] uppercase font-semibold font-['DM_Sans'] tracking-[0.1em] mb-4">QUICK ANSWERS</div>
                <h2 className="font-['Playfair_Display'] text-[36px] text-[#1A2E44] font-bold mb-8 max-w-xl mx-auto leading-tight">
                    Looking for something specific?
                </h2>

                <div className="flex flex-wrap justify-center gap-3 mb-6 max-w-3xl mx-auto">
                    <Link to="/faq" className="bg-white border border-[#EAE4DC] rounded-[100px] px-[24px] py-[12px] font-['DM_Sans'] text-[14px] text-[#1A2E44] hover:border-[#5B7A99] hover:bg-[#EBF1F7] transition-colors cursor-pointer block">
                        📦 When does Wayo ship?
                    </Link>
                    <Link to="/faq" className="bg-white border border-[#EAE4DC] rounded-[100px] px-[24px] py-[12px] font-['DM_Sans'] text-[14px] text-[#1A2E44] hover:border-[#5B7A99] hover:bg-[#EBF1F7] transition-colors cursor-pointer block">
                        💰 How much will it cost?
                    </Link>
                    <Link to="/faq" className="bg-white border border-[#EAE4DC] rounded-[100px] px-[24px] py-[12px] font-['DM_Sans'] text-[14px] text-[#1A2E44] hover:border-[#5B7A99] hover:bg-[#EBF1F7] transition-colors cursor-pointer block">
                        🔧 How does it work?
                    </Link>
                </div>

                <p className="font-['DM_Sans'] text-[14px] text-[#7A8FA0]">
                    Or check our full <Link to="/faq" className="text-[#5B7A99] hover:underline">FAQ page</Link> for more answers.
                </p>
            </section>

        </main>
    );
}
