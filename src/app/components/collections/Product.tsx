"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import Link from "next/link";

/* =========================
   TYPES
========================= */
type ProductType = {
    _id: string;
    name: string;
    slug: string;
    description: string;
    gender: string;
    category: string;
    price: number;
    discountPrice?: number;
    images: {
        url: string;
        altText: string;
        isPrimary: boolean;
        _id: string;
    }[];
    variants: {
        size: number;
        stock: number;
        sku: string;
        _id: string;
    }[];
};

type Props = {
    products: any
};

/* =========================
   COMPONENT
========================= */
function Product({ products }: Props) {
    const [wishlist, setWishlist] = useState<string[]>([]);

    // Load initial wishlist state on mount
    useEffect(() => {
        const stored = localStorage.getItem("wishlist");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) setWishlist(parsed);
            } catch (e) {
                console.error("Failed to parse wishlist context", e);
            }
        }
    }, []);

    // Toggle logic: Handles both adding and removing smoothly
    const handleWishlistClick = (e: React.MouseEvent, slug: string) => {
        e.preventDefault(); // Stop Next.js Link redirection
        e.stopPropagation(); // Stop parent bubble triggers

        let updatedWishlist: string[];
        
        if (wishlist.includes(slug)) {
            // Remove if already liked
            updatedWishlist = wishlist.filter((item) => item !== slug);
        } else {
            // Add if new
            updatedWishlist = [...wishlist, slug];
        }

        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        
        // Broadcast updates to external components (like navbar badge listeners)
        window.dispatchEvent(new Event("wishlist-updated"));
    };

    return (
        <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-3 2xl:grid-cols-4">
            {products.map((product:any) => {
                const primaryImage = product.images.find((img:any) => img.isPrimary) || product.images[0];
                const isLiked = wishlist.includes(product.slug);

                return (
                    <Link 
                        key={product._id} 
                        href={`/collections/${product.slug}`} 
                        className="group overflow-hidden rounded-3xl bg-surface-container-lowest border border-neutral-100/50 block shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                        {/* IMAGE CONTAINER */}
                        <div className="relative overflow-hidden">
                            <img 
                                src={primaryImage?.url} 
                                alt={primaryImage?.altText || product.name} 
                                className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            />

                            {/* Wishlist Button */}
                            <button 
                                type="button"
                                aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
                                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-sm transition-transform active:scale-90 z-10" 
                                onClick={(e) => handleWishlistClick(e, product.slug)}
                            >
                                <Heart 
                                    size={18} 
                                    className={`transition-all duration-300 ${
                                        isLiked 
                                            ? "text-red-500 fill-red-500 scale-110 drop-shadow-[0_0_6px_rgba(239,68,68,0.65)]" 
                                            : "text-neutral-600 hover:text-red-500"
                                    }`} 
                                />
                            </button>
                        </div>

                        {/* CONTENT CONTAINER */}
                        <div className="p-4 md:p-5">
                            {/* CATEGORY */}
                            <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                                {product.category}
                            </span>

                            {/* NAME */}
                            <h3 className="line-clamp-1 font-headline text-base italic md:text-xl text-neutral-900 group-hover:text-primary transition-colors">
                                {product.name}
                            </h3>

                            {/* GENDER */}
                            <p className="mt-0.5 text-xs text-muted-foreground md:text-sm">
                                {product.gender}
                            </p>

                            {/* PRICE */}
                            <div className="mt-3 flex items-center gap-2 md:gap-3">
                                <span className="text-sm font-bold md:text-lg text-neutral-900">
                                    ₹{product.discountPrice || product.price}
                                </span>
                                {product.discountPrice && (
                                    <span className="text-xs text-neutral-400 line-through md:text-sm">
                                        ₹{product.price}
                                    </span>
                                )}
                            </div>

                            {/* SIZES */}
                            <div className="mt-4 flex flex-wrap gap-1.5">
                                {product.variants.slice(0, 4).map((variant:any) => (
                                    <span 
                                        key={variant._id} 
                                        className="rounded-lg bg-neutral-50 border border-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-600"
                                    >
                                        {variant.size}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

export default Product;