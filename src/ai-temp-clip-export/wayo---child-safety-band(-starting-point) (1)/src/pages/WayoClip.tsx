import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ClipProductOverview } from '../components/clip/ClipProductOverview';
import { ClipTheMoment } from '../components/clip/ClipTheMoment';
import { ClipHowItWorks } from '../components/clip/ClipHowItWorks';
import { ClipFeatures } from '../components/clip/ClipFeatures';
import { ClipUseCases } from '../components/clip/ClipUseCases';
import { ClipComparison } from '../components/clip/ClipComparison';
import { ClipSpecs } from '../components/clip/ClipSpecs';
import { ClipFinalCTA } from '../components/clip/ClipFinalCTA';

export function WayoClip() {
  return (
    <div className="min-h-screen bg-wayo-cream font-sans selection:bg-wayo-coral selection:text-white">
      <Navbar />

      <main>
        <ClipProductOverview />
        <ClipTheMoment />
        <ClipHowItWorks />
        <ClipFeatures />
        <ClipUseCases />
        <ClipComparison />
        <ClipSpecs />
        <ClipFinalCTA />
      </main>

      <Footer />
    </div>
  );
}
