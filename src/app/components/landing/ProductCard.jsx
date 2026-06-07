'use client';
import React, { useState } from 'react';

export default function ProductCard({ product }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="group relative flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-container">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        
        {/* Like Button */}
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className={`absolute top-2 right-2 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur shadow-sm transition-all duration-300 z-10 ${isLiked ? 'text-red-500 bg-white' : 'text-primary hover:bg-primary hover:text-white'}`}
        >
          <span className={`material-symbols-outlined text-[16px] md:text-[20px] ${isLiked ? 'font-variation-settings-"FILL"-1' : ''}`}>
            favorite
          </span>
        </button>

        {/* Add to Bag (Slides up on hover - Desktop focus, but available via tap on mobile) */}
        <div className="absolute inset-x-0 bottom-0 p-3 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-10">
          <button
          className="w-full py-3 md:py-4 bg-primary text-on-primary text-sm md:text-base font-bold rounded-lg shadow-xl hover:bg-primary-container transition-colors">
            Add to Bag
          </button>
        </div>
      </div>
      
      {/* Product Details */}
      <div className="p-4 md:p-6 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-primary mb-1 md:mb-2 block line-clamp-1">
            {product.collection}
          </span>
          <h3 className="text-base md:text-xl font-bold font-body text-on-surface mb-2 line-clamp-1">
            {product.title}
          </h3>
        </div>
        
        <div className="flex items-center gap-2 md:gap-3">
          <span className="text-base md:text-lg font-bold text-on-surface">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span className="text-xs md:text-sm text-on-surface-variant/60 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}