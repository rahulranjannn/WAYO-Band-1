import React from 'react';
import { SEO } from '../components/SEO';
import { ClipProductOverview } from '../components/clip/ClipProductOverview';
import { ClipTheMoment } from '../components/clip/ClipTheMoment';
import { ClipFeatures } from '../components/clip/ClipFeatures';
import { ClipHowItWorks } from '../components/clip/ClipHowItWorks';
import { ClipUseCases } from '../components/clip/ClipUseCases';
import { ClipComparison } from '../components/clip/ClipComparison';
import { ClipSpecs } from '../components/clip/ClipSpecs';
import { Testimonials } from '../components/product/Testimonials';
import { ClipFinalCTA } from '../components/clip/ClipFinalCTA';

interface ClipProductPageProps {
  onOpenWaitlist: () => void;
}

export function ClipProductPage({ onOpenWaitlist }: ClipProductPageProps) {
  return (
    <main className="min-h-screen bg-white pb-28 lg:pb-0">
      <SEO 
        title="WAYO Clip - Smart Luggage Protection"
        description="The ultimate smart clip that alerts your wrist the moment your bag is moved. Pre-order now."
        path="/product/clip"
      />
      
      <ClipProductOverview onOpenWaitlist={onOpenWaitlist} />
      <ClipTheMoment />
      <ClipFeatures />
      <ClipHowItWorks />
      <ClipUseCases />
      <ClipComparison />
      <ClipSpecs />
      <Testimonials variant="clip" />
      <ClipFinalCTA onOpenWaitlist={onOpenWaitlist} />
    </main>
  );
}
