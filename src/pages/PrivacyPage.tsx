import React from 'react';

export function PrivacyPage() {
    return (
        <main className="bg-white min-h-screen">
            {/* Hero */}
            <section className="pt-36 lg:pt-48 pb-12 text-center max-w-4xl mx-auto px-4 sm:px-6 border-b border-gray-100 flex flex-col items-center">
                <span className="text-wayo-coral text-sm font-bold tracking-widest uppercase mb-4 block">
                    PRIVACY POLICY
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#1A1A2E] mb-6">
                    We keep it simple here too.
                </h1>
                <p className="text-xl text-[#6B7280]">
                    Last updated: March 2026
                </p>
            </section>

            {/* Content */}
            <section className="py-16">
                <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 text-[18px] leading-relaxed text-[#6B7280] space-y-12">

                    <div>
                        <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4">What we collect</h2>
                        <p>
                            When you register on our website, we collect your name, phone number, email address, and city. That's it.
                        </p>
                    </div>

                    <div className="h-px bg-gray-100"></div>

                    <div>
                        <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4">Why we collect it</h2>
                        <p>
                            To send you launch updates and early access information about Wayo Band. We will never use your data for anything else.
                        </p>
                    </div>

                    <div className="h-px bg-gray-100"></div>

                    <div>
                        <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4">What we don't do</h2>
                        <p>
                            We don't sell your data. We don't share it with advertisers. We don't use it to target you with ads.
                        </p>
                    </div>

                    <div className="h-px bg-gray-100"></div>

                    <div>
                        <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4">Cookies</h2>
                        <p>
                            Our website uses basic cookies to understand how people find us (analytics only). No tracking cookies. No third-party ad cookies.
                        </p>
                    </div>

                    <div className="h-px bg-gray-100"></div>

                    <div>
                        <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4">Your rights</h2>
                        <p>
                            You can ask us to delete your data at any time by emailing hello@wayoband.com. We'll remove it within 48 hours, no questions asked.
                        </p>
                    </div>

                    <div className="h-px bg-gray-100"></div>

                    <div>
                        <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4">Contact</h2>
                        <p>
                            Questions? Email us: hello@wayoband.com
                        </p>
                    </div>

                </div>
            </section>
        </main>
    );
}
