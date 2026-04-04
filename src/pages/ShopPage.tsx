import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, LifeBuoy } from 'lucide-react';
import { SEO } from '../components/SEO';
import { PriceDisplay } from '../components/PriceDisplay';

export function ShopPage() {
  const [isTextExpanded, setIsTextExpanded] = useState(false);

  const products = [
    {
      id: 'band',
      name: 'Wayo Band',
      tagline: 'Child Safety Redefined',
      image: '/hero1-1080.webp',
      price: 999,
      originalPrice: 1799,
      link: '/product',
      color: 'bg-wayo-cream'
    },
    {
      id: 'clip',
      name: 'Wayo Clip',
      tagline: 'Smart Luggage Protection',
      image: '/pool1-1080.webp', 
      price: 799,
      originalPrice: 999,
      link: '/product/clip',
      color: 'bg-wayo-yellow/10'
    }
  ];

  return (
    <main className="min-h-screen bg-[#FAFAF8] pt-32 pb-24 border-t border-gray-100">
      <SEO 
        title="Shop - WAYO"
        description="Explore the WAYO ecosystem of smart safety devices."
        path="/shop"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-wayo-dark/5 text-gray-500 font-bold px-4 py-1.5 rounded-full text-sm mb-4 tracking-widest uppercase">
            Store
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-wayo-dark font-display mb-4">
            Our Products
          </h1>
          <p className="text-xl text-gray-500 font-medium max-w-xl mx-auto">
            Smart, screen-free offline safety for the things and people you love the most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {products.map((product) => (
            <Link 
              key={product.id} 
              to={product.link}
              className="group flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className={`aspect-square sm:aspect-[6/5] p-12 flex items-center justify-center ${product.color} relative overflow-hidden`}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                />
              </div>
              <div className="p-8 pb-10 flex flex-col flex-grow">
                <h2 className="text-3xl font-extrabold text-wayo-dark font-display mb-2">{product.name}</h2>
                <p className="text-gray-500 font-medium mb-8 text-lg flex-grow">{product.tagline}</p>
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-6">
                  <PriceDisplay discountedPrice={product.price} originalPrice={product.originalPrice} />
                  <div className="bg-wayo-dark text-white px-8 py-3 rounded-xl font-bold text-base group-hover:bg-gray-800 transition-colors shadow-md lg:ml-4">
                    View Details
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Phase 2: SEO Text Block */}
        <div className="mt-24 max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden transition-all duration-300">
          <h2 className="text-2xl font-extrabold text-wayo-dark font-display mb-4 text-center">Smart, Screen-Free Safety for Your Family</h2>
          <div className={`relative ${isTextExpanded ? '' : 'max-h-16 overflow-hidden'}`}>
            <p className="text-gray-600 font-medium leading-relaxed text-center">
              Looking for a way to keep your children and belongings safe without introducing them to screens or the internet? The WAYO ecosystem is designed by parents, for parents. Our devices rely on secure, proximity-based technology, meaning there are no hidden monthly subscription fees, no internet browsers, and no distractions. Whether you are keeping your toddler close in a crowded mall with the WAYO Band, or securing your luggage during transit with the WAYO Clip, you get absolute peace of mind.
            </p>
            {!isTextExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
            )}
          </div>
          <div className="mt-4 flex justify-center">
            <button 
              onClick={() => setIsTextExpanded(!isTextExpanded)} 
              className="px-6 py-2 bg-wayo-cream text-wayo-dark rounded-full font-bold text-sm hover:bg-gray-200 transition-colors"
            >
              {isTextExpanded ? '- Less' : '+ More'}
            </button>
          </div>
        </div>

        {/* Phase 3: Trust Badges */}
        <div className="mt-16 bg-wayo-cream rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-evenly gap-8 md:gap-4">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-wayo-mint">
              <Truck className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-wayo-dark text-lg">Free Delivery Across India</h3>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-wayo-mint">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-wayo-dark text-lg">1-Year Manufacturer Warranty</h3>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-wayo-mint">
              <LifeBuoy className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-wayo-dark text-lg">24/7 Support</h3>
          </div>
        </div>

      </div>
    </main>
  );
}
