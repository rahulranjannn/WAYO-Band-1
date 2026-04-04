import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Home } from 'lucide-react';
import { SEO } from '../components/SEO';

export function OrderSuccessPage() {
  return (
    <main className="min-h-screen bg-wayo-cream flex items-center justify-center selection:bg-wayo-coral selection:text-white px-4 pt-20">
      <SEO title="Order Confirmed" description="Your WAYO order is confirmed." path="/order-success" />
      
      <div className="max-w-lg w-full bg-white p-10 sm:p-12 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col items-center text-center animate-in zoom-in-95 duration-500 fade-in slide-in-from-bottom-10 mt-12">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8 relative">
          <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20"></div>
          <CheckCircle2 className="w-12 h-12 text-green-500 z-10" />
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-extrabold text-wayo-dark font-display mb-4">
          Payment Successful!
        </h1>
        
        <p className="text-gray-600 font-medium text-lg leading-relaxed mb-10">
          Welcome to the WAYO Family. Your order is confirmed and your email receipt is on its way.
        </p>
        
        <Link 
          to="/"
          className="w-full bg-wayo-dark text-white py-4 px-6 rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
        >
          <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Return to Home
        </Link>
      </div>
    </main>
  );
}
