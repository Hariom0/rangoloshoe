'use client';
import React, { useState, useEffect } from 'react';

export default function Filters() {
  const [filterData, setFilterData] = useState({
    categories: [],
    sizes: [],
    colors: []
  });

  // Fetch filter options dynamically
  useEffect(() => {
    // Simulated API call for filter data
    const fetchFilters = () => {
      setFilterData({
        categories: ['Juttis & Khussas', 'Kolhapuri Sandals', 'Heeled Mules', 'Artisan Flats'],
        sizes: [3, 4, 5, 6, 7, 8, 9],
        colors: [
          { name: 'Maroon', hex: '#9b0044' },
          { name: 'Saffron', hex: '#fb6d00' },
          { name: 'Cream', hex: '#fbf9f6' },
          { name: 'Midnight', hex: '#1b1c1a' },
          { name: 'Gold', hex: '#d4af37' }
        ]
      });
    };
    fetchFilters();
  }, []);

  return (
    <aside className="w-full space-y-8 lg:space-y-10 lg:sticky lg:top-32 h-fit">
      {/* Filter Section: Gender */}
      <section>
        <h3 className="text-sm font-bold tracking-wider uppercase mb-4 lg:mb-6 text-on-surface">Gender</h3>
        <div className="flex flex-wrap gap-2 lg:gap-3">
          {['Men', 'Women', 'Unisex'].map((gender, i) => (
            <button key={gender} className={`px-4 lg:px-5 py-2 rounded-full text-xs lg:text-sm font-medium transition-all ${i === 1 ? 'bg-primary-container text-on-primary' : 'border border-outline-variant/30 hover:bg-primary-container hover:text-on-primary'}`}>
              {gender}
            </button>
          ))}
        </div>
      </section>

      {/* Filter Section: Category */}
      <section>
        <h3 className="text-sm font-bold tracking-wider uppercase mb-4 lg:mb-6 text-on-surface">Category</h3>
        <div className="space-y-3">
          {filterData.categories.map((category, idx) => (
            <label key={category} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                defaultChecked={idx === 1}
                className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary accent-primary" 
              />
              <span className="text-on-surface-variant group-hover:text-on-surface transition-colors text-sm lg:text-base">
                {category}
              </span>
            </label>
          ))}
        </div>
      </section>

      {/* Filter Section: Size */}
      <section>
        <h3 className="text-sm font-bold tracking-wider uppercase mb-4 lg:mb-6 text-on-surface">Size (UK)</h3>
        <div className="grid grid-cols-4 gap-2">
          {filterData.sizes.map((size) => (
            <button key={size} className={`aspect-square flex items-center justify-center rounded-lg text-sm transition-colors ${size === 5 ? 'border border-primary bg-primary/5 font-bold' : 'border border-outline-variant/30 hover:border-primary'}`}>
              {size}
            </button>
          ))}
        </div>
      </section>

      {/* Filter Section: Color */}
      <section>
        <h3 className="text-sm font-bold tracking-wider uppercase mb-4 lg:mb-6 text-on-surface">Color Palette</h3>
        <div className="flex flex-wrap gap-3 lg:gap-4">
          {filterData.colors.map((color) => (
            <button 
              key={color.name} 
              className={`w-8 h-8 rounded-full ring-offset-2 hover:ring-1 ring-outline-variant/30 transition-all ${color.name === 'Cream' ? 'border border-outline-variant/50' : ''}`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </section>

      {/* Filter Section: Price Range */}
      <section>
        <h3 className="text-sm font-bold tracking-wider uppercase mb-4 lg:mb-6 text-on-surface">Price Range</h3>
        <input 
          type="range" 
          min="500" 
          max="10000" 
          defaultValue="5000"
          className="w-full h-1 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary" 
        />
        <div className="flex justify-between mt-4 text-xs font-medium text-on-surface-variant">
          <span>₹500</span>
          <span>₹10,000+</span>
        </div>
      </section>
    </aside>
  );
}