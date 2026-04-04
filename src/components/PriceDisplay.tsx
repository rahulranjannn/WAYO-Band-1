import React from 'react';

interface PriceDisplayProps {
  discountedPrice: number;
  originalPrice: number;
  className?: string; 
}

export function PriceDisplay({ discountedPrice, originalPrice, className = '' }: PriceDisplayProps) {
  const save = originalPrice - discountedPrice;
  return (
    <div className={`flex items-end gap-3 ${className}`}>
      <span className="text-4xl font-extrabold text-wayo-dark leading-none">₹{discountedPrice}</span>
      <span className="text-xl text-gray-400 line-through font-medium pb-0.5">₹{originalPrice}</span>
      <span className="text-sm font-bold text-[#52B788] bg-[#F0FBF4] px-2.5 py-1 rounded-md pb-0.5 whitespace-nowrap">Save ₹{save}</span>
    </div>
  );
}
