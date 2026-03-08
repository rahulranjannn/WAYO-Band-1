import { Hero } from '../components/Hero';
import { AhaSection } from '../components/AhaSection';
import { FeatureStrip } from '../components/FeatureStrip';
import { TwoShields } from '../components/TwoShields';
import { HowItWorks } from '../components/HowItWorks';

import { SEO } from '../components/SEO';

interface HomeProps {
    onOpenWaitlist: () => void;
}

export function Home({ onOpenWaitlist }: HomeProps) {
    return (
        <main>
            <SEO
                title="WAYO Band — No matter where they go, WAYO brings them back."
                description="WAYO Band — the screen-free wristband that alerts you the moment your child wanders too far or falls in water. No app, no fees. Launching April 2026."
                path="/"
                heroImage="/hero1.webp"
                isHome={true}
            />
            <Hero onOpenWaitlist={onOpenWaitlist} />
            <AhaSection />
            <FeatureStrip />
            <TwoShields />
            <HowItWorks />
        </main>
    );
}
