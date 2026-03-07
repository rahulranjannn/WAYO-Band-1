import { motion } from 'motion/react';
import { Target, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';

interface AboutPageProps {
    onOpenWaitlist: () => void;
}

export function AboutPage({ onOpenWaitlist }: AboutPageProps) {
    const values = [
        { icon: <Target className="w-8 h-8 text-wayo-coral mb-4" />, title: "Simplicity First", desc: "If your grandmother can't use it in 10 seconds, it's too complicated. We design for real people, not tech enthusiasts." },
        { icon: <ShieldCheck className="w-8 h-8 text-wayo-coral mb-4" />, title: "Safety Without Surveillance", desc: "Wayo isn't about tracking or monitoring. It's about a gentle signal that says \"we're still connected.\"" },
        { icon: <MapPin className="w-8 h-8 text-wayo-coral mb-4" />, title: "Made for India", desc: "Built with Indian families in mind — crowded markets, joint families, local festivals. Wayo understands the way you live." }
    ];

    const team = [
        { initial: "R", name: "Rahul S.", role: "Founder & Builder", bio: "Spent 5 years in hardware, 1 terrifying moment at a mela, and built Wayo." },
        { initial: "A", name: "Anjali K.", role: "Product Design", bio: "Former UX lead, now obsessed with making safety completely invisible." }
    ];

    return (
        <main className="bg-white">
            {/* Hero */}
            <section className="pt-36 lg:pt-48 pb-12 text-center max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center">
                <span className="text-wayo-coral text-sm font-bold tracking-widest uppercase mb-4 block">
                    OUR STORY
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#1A1A2E] mb-6">
                    Built by parents.<br className="hidden md:block" /> For every parent.
                </h1>
                <p className="text-xl text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
                    Wayo started with one terrifying moment at a crowded mela — and a question: why doesn't something simple like this already exist?
                </p>
            </section>

            {/* Origin Story */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-[#1A1A2E] mb-6">It happened to us too.</h2>
                            <div className="prose prose-lg text-[#6B7280]">
                                <p className="mb-4">
                                    We were at a local festival. One second our daughter was right there, the next — gone. That split-second panic changed everything.
                                </p>
                                <p className="mb-4">
                                    We looked at every solution on the market: GPS trackers with monthly fees, smartwatches too complex for toddlers, phone-based apps that assumed everyone had a smartphone ready. Nothing fit.
                                </p>
                                <p>
                                    So we built Wayo — because every family deserves peace of mind, not a complicated gadget.
                                </p>
                            </div>
                        </div>
                        <div className="rounded-[20px] overflow-hidden shadow-lg aspect-square md:aspect-auto md:h-[500px] bg-gray-100 relative">
                            <img src="/childband.png" alt="Family at market" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-[#2D9C8F]/10 mix-blend-multiply"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-24 bg-wayo-cream">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-[#1A1A2E] mb-12 text-center">What we believe in.</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((v, i) => (
                            <div key={i} className="bg-white p-8 rounded-[20px] shadow-sm border border-gray-100 flex flex-col items-start">
                                {v.icon}
                                <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">{v.title}</h3>
                                <p className="text-[#6B7280] leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-[#1A1A2E] mb-12 text-center">The people behind Wayo.</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {team.map((t, i) => (
                            <div key={i} className="bg-gray-50 p-6 rounded-[20px] flex items-center gap-6 border border-gray-100">
                                <div className="w-20 h-20 shrink-0 bg-white rounded-full border-4 border-wayo-coral flex items-center justify-center text-3xl font-bold text-[#1A1A2E] shadow-sm">
                                    {t.initial}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[#1A1A2E]">{t.name}</h3>
                                    <p className="text-wayo-coral font-medium text-sm mb-2 uppercase tracking-wide">{t.role}</p>
                                    <p className="text-[#6B7280] text-sm leading-relaxed">"{t.bio}"</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="py-32 bg-[#1A1A2E] text-white text-center">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <blockquote className="text-3xl md:text-5xl font-extrabold leading-tight mb-8 text-[#2D9C8F]">
                        "We're not building a tracker. We're building a thread — invisible, unbreakable, and always there."
                    </blockquote>
                    <p className="text-gray-400 font-bold tracking-widest uppercase">— The Wayo Team</p>
                </div>
            </section>

            {/* CTA Strip */}
            <section className="py-24 bg-white text-center">
                <div className="max-w-2xl mx-auto px-4 sm:px-6">
                    <h2 className="text-3xl font-bold text-[#1A1A2E] mb-8">
                        Be part of our first batch of families.
                    </h2>
                    <button
                        onClick={onOpenWaitlist}
                        className="bg-wayo-coral text-white px-8 py-4 rounded-full font-bold transition-all shadow-md hover:bg-red-700 shadow-wayo-coral/30 inline-flex items-center text-lg"
                    >
                        Join the Waitlist <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                </div>
            </section>

        </main>
    );
}
