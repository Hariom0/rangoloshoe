"use client"
// ProductSlider.tsx
import React from 'react';
import { Product } from './types';

interface Props {
  title: string;
  subtitle?: string;
  products: Product[];
  isLoading: boolean;
}

export const ProductSlider: React.FC<Props> = ({ title, subtitle, products, isLoading }) => {
  return (
    <section className="py-12 md:py-24 px-4 md:px-8 max-w-screen-2xl mx-auto">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl md:text-4xl font-headline text-on-surface">{title}</h2>
          {subtitle && <p className="text-on-surface-variant mt-2 text-sm md:text-base">{subtitle}</p>}
        </div>
        <button className="text-primary font-semibold text-sm hover:underline hidden md:block">
          View All
        </button>
      </div>

      {isLoading ? (
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="min-w-40 md:min-w-70 h-64 bg-surface-variant animate-pulse rounded-xl"></div>
          ))}
        </div>
      ) : (
        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar">
          {products.map(product => (
            <div key={product.id} className="min-w-40 w-40 md:min-w-70 md:w-70 shrink-0 snap-start group cursor-pointer">
              <div className="relative aspect-4/5 bg-surface-container rounded-xl overflow-hidden mb-3">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <button className="absolute top-2 right-2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-primary shadow-sm active:scale-90 transition-transform">
                  <span className="material-symbols-outlined text-[18px]">favorite</span>
                </button>
              </div>
              <p className="text-xs text-on-surface-variant font-medium uppercase tracking-wider mb-1">{product.category}</p>
              <h3 className="text-sm md:text-lg font-semibold text-on-surface truncate">{product.name}</h3>
              <p className="text-primary font-bold mt-1">₹{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};