"use client";

import { useEffect, useState } from "react";
import { Heart, X, ShoppingBag, ArrowLeft, Flame, Star, ShoppingCart } from "lucide-react";

// --- TYPES DEFINITION MATCHING THE API PAYLOAD ---
export interface Media {
  _id: string;
  url: string;
  altText: string;
  isPrimary?: boolean;
}

export interface Variant {
  _id: string;
  size: number | string;
  stock: number;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  category: string;
  gender: string;
  price: number;
  discountPrice?: number;
  images: Media[];
  variants: Variant[];
  is_bestseller?: boolean;
  is_fresh_drop?: boolean;
}

export default function WishlistPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Helper: Safely grab primary image or fallback
  const getPrimaryImage = (p: Product) => {
    const primary = p.images.find((img) => img.isPrimary);
    return primary ? primary.url : p.images[0]?.url || "";
  };

  // Helper: Format price text
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Core Orchestrator: Read local storage keys and fetch products
  useEffect(() => {
    async function loadWishlist() {
      try {
        const stored = localStorage.getItem("wishlist");
        if (!stored) {
          setProducts([]);
          setLoading(false);
          return;
        }

        const slugs: string[] = JSON.parse(stored);
        if (slugs.length === 0) {
          setProducts([]);
          setLoading(false);
          return;
        }

        // Fetch products by passing a clean, comma-separated slug parameter string
        const res = await fetch(`/api/products/${slugs.join(",")}`);
        if (!res.ok) throw new Error("Failed to resolve collection mapping profiles");
        
        const payload = await res.json();
        if (payload.success && Array.isArray(payload.data)) {
          setProducts(payload.data);
        }
      } catch (err) {
        console.error("Wishlist sync engine error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadWishlist();
  }, []);

  // Action Handler: Evict a single entity row with explicit array updates
  const handleRemoveItem = (slugToRemove: string) => {
    // 1. Synchronize UI components locally
    const filteredProducts = products.filter((p) => p.slug !== slugToRemove);
    setProducts(filteredProducts);

    // 2. Clear from local browser engine array references
    const stored = localStorage.getItem("wishlist");
    if (stored) {
      const slugs: string[] = JSON.parse(stored);
      const updatedSlugs = slugs.filter((s) => s !== slugToRemove);
      
      if (updatedSlugs.length === 0) {
        localStorage.removeItem("wishlist");
      } else {
        localStorage.setItem("wishlist", JSON.stringify(updatedSlugs));
      }
    }
  };

  // Render State 1: Shimmer skeleton cards during data fetching
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50/50 px-4 py-6 max-w-md mx-auto space-y-4">
        <div className="h-8 w-1/3 bg-neutral-200 animate-pulse rounded-md mb-6" />
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex gap-4 p-3 bg-white rounded-2xl border border-neutral-100 h-28 animate-pulse">
            <div className="w-24 h-full bg-neutral-200 rounded-xl" />
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 bg-neutral-200 rounded w-3/4" />
              <div className="h-3 bg-neutral-200 rounded w-1/2" />
              <div className="h-5 bg-neutral-200 rounded w-1/3 pt-2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Render State 2: Fallback configuration when no slugs remain
  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-white px-6 flex flex-col items-center justify-center text-center max-w-md mx-auto">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-neutral-100 rounded-full scale-125 blur-sm opacity-50" />
          <div className="relative w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center border border-neutral-100 text-neutral-400">
            <Heart className="w-8 h-8 stroke-[1.5]" />
          </div>
        </div>
        <h2 className="text-xl font-bold text-neutral-900 tracking-tight">Your wishlist is empty</h2>
        <p className="text-sm text-neutral-500 mt-2 max-w-[280px] leading-relaxed">
          Tap the heart on your favorite items to save them here for later.
        </p>
        <button 
          onClick={() => window.location.href = "/"}
          className="mt-8 w-full h-12 bg-neutral-900 text-white rounded-xl text-sm font-semibold tracking-wide shadow-sm hover:bg-neutral-800 active:scale-[0.98] transition-transform"
        >
          Explore Collections
        </button>
      </div>
    );
  }

  // Render State 3: Production UI stack view
  return (
<div className="min-h-screen bg-neutral-50/30 w-full max-w-md md:max-w-6xl mx-auto md:px-6 lg:px-8 flex flex-col transition-all">
      {/* Top Navigation Header - Expands padding on desktop */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-neutral-100/80 px-4 md:px-6 h-16 flex items-center justify-between md:mt-4 md:rounded-2xl md:border md:shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => window.history.back()} className="p-1 -ml-1 text-neutral-700 hover:text-neutral-900 active:scale-95 transition-transform">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base md:text-xl font-bold text-neutral-900">Wishlist ({products.length})</h1>
        </div>
        <div className="relative flex items-center gap-2">
          <span className="hidden md:inline text-xs font-semibold text-neutral-500">Saved Items</span>
          <Heart className="w-5 h-5 text-red-500 fill-red-500" />
        </div>
      </header>

      {/* Main Container - Switches from vertical stack to multi-column grid layout on desktop */}
      <main className="flex-1 py-4 md:py-6 space-y-3 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 items-start overflow-y-auto">
        {products.map((product) => {
          const hasDiscount = !!(product.discountPrice && product.discountPrice < product.price);
          const activePrice = hasDiscount ? product.discountPrice! : product.price;

          return (
            <div
              key={product._id}
              className="group relative flex gap-4 p-3.5 bg-white rounded-2xl border border-neutral-200/60 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] md:hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.08)] md:hover:border-neutral-300 transition-all active:border-neutral-300"
            >
              {/* Product Visual Container (Left Anchor) */}
              <div className="relative w-24 h-24 bg-neutral-50 rounded-xl overflow-hidden flex-shrink-0 border border-neutral-100 md:w-28 md:h-28">
                <img
                  src={getPrimaryImage(product)}
                  alt={product.name}
                  className="w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Dynamically Placed Mini Attribute Flags */}
                <div className="absolute bottom-15 left-1 flex flex-col gap-0.5">
                  {product.is_fresh_drop && (
                    <span className="flex items-center text-[8px] font-black uppercase tracking-wider bg-amber-500 text-neutral-950 px-1 py-0.5 rounded shadow-sm">
                      <Flame className="w-2 h-2 mr-0.5 fill-current" /> Drop
                    </span>
                  )}
                  {product.is_bestseller && (
                    <span className="flex items-center text-[8px] font-black uppercase tracking-wider bg-blue-600 text-white px-1 py-0.5 rounded shadow-sm">
                      <Star className="w-2 h-2 mr-0.5 fill-current" /> Best
                    </span>
                  )}
                </div>
              </div>

              {/* Central Information Typography Block */}
              <div className="flex-1 flex flex-col justify-between min-w-0 pr-8">
                <div>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                    {product.gender} · {product.category}
                  </span>
                  <h3 className="text-sm font-bold text-neutral-800 tracking-tight truncate mt-0.5 pr-2 md:text-base md:group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                </div>

                {/* Variant tags layout */}
                <div className="flex gap-1 overflow-x-auto py-1 no-scrollbar">
                  {product.variants.map((v, idx) => (
                    <span key={v._id || idx} className="text-[10px] font-medium px-1.5 py-0.5 bg-neutral-50 border border-neutral-100 rounded text-neutral-500 flex-shrink-0">
                      UK {v.size}
                    </span>
                  ))}
                </div>

                {/* Price Display Layout Block */}
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-extrabold text-neutral-900 md:text-lg">
                    {formatPrice(activePrice)}
                  </span>
                  {hasDiscount && (
                    <span className="text-xs font-medium text-neutral-400 line-through">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
              </div>

              {/* Absolute Action Containers Wrapper */}
              <div className="absolute right-3.5 top-3.5 bottom-3.5 flex flex-col justify-between items-end">
                {/* Dismiss Button */}
                <button
                  onClick={() => handleRemoveItem(product.slug)}
                  aria-label="Remove item"
                  className="w-7 h-7 bg-neutral-50 hover:bg-red-50 hover:border-red-200 border border-neutral-200/80 rounded-full flex items-center justify-center text-neutral-400 hover:text-red-500 transition-all active:scale-90 shadow-sm"
                >
                  <X className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>

                {/* Direct Router Call-To-Action Button */}
                <button
                  onClick={() => window.location.href = `/products/${product.slug}`}
                  className="w-8 h-8 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl flex items-center justify-center shadow-sm active:scale-90 transition-all md:opacity-0 md:group-hover:opacity-100 md:translate-y-1 md:group-hover:translate-y-0"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}