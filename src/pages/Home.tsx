import { Hero } from '../components/Hero';
import { AhaSection } from '../components/AhaSection';
import { FeatureStrip } from '../components/FeatureStrip';
import { TwoShields } from '../components/TwoShields';
import { HowItWorks } from '../components/HowItWorks';

interface HomeProps {
    onOpenWaitlist: () => void;
}

export function Home({ onOpenWaitlist }: HomeProps) {
    return (
        <main>
            <Hero onOpenWaitlist={onOpenWaitlist} />
            <AhaSection />
            <FeatureStrip />
            <TwoShields />
            <HowItWorks />
        </main>
    );
}
