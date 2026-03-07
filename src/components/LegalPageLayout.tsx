import { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface LegalPageLayoutProps {
    title: string;
    lastUpdated: string;
    children: ReactNode;
}

export function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <main className="min-h-screen bg-[#FAFAF8] relative">
            {/* Hero Banner */}
            <section
                className="pt-[140px] pb-[60px] px-6 text-center"
                style={{ background: 'linear-gradient(135deg, #1A2E44, #2D4A6B)' }}
            >
                <div className="text-[13px] text-white/50 mb-4 font-sans">
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                    {' → '}
                    <span>{title}</span>
                </div>
                <h1 className="text-[44px] text-white font-['Playfair_Display'] font-normal leading-tight">
                    {title}
                </h1>
                <div className="text-[13px] text-white/60 mt-3 font-sans">
                    Last updated: {lastUpdated}
                </div>
            </section>

            {/* Content Area */}
            <section className="max-w-[760px] mx-auto px-6 py-16 pb-24 relative z-10">
                <div className="legal-content">
                    {children}
                </div>
            </section>

            {/* Back to top button */}
            {showBackToTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 w-[44px] h-[44px] bg-[#1A2E44] text-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)] z-50 text-[20px] pb-[2px] font-bold hover:bg-[#2D4A6B] transition-all"
                    aria-label="Back to top"
                >
                    ↑
                </button>
            )}
        </main>
    );
}
