import { Hero } from '../components/Hero';
import { AhaSection } from '../components/AhaSection';
import { HowItWorks } from '../components/HowItWorks';
import { Benefits } from '../components/Benefits';

interface HomeProps {
    onOpenWaitlist: () => void;
}

export function Home({ onOpenWaitlist }: HomeProps) {
    return (
        <main>
            <Hero onOpenWaitlist={onOpenWaitlist} />
            <AhaSection />
            <HowItWorks />
            <Benefits />
        </main>
    );
}
