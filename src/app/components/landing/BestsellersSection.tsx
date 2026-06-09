import { ShoppingBag } from "lucide-react";
import Link from "next/link";

// Updated type mapping to reflect your actual database/API schema keys
type ProductImage = {
    url: string;
    isPrimary?: boolean;
};

type BestsellerProduct = {
    _id: string;
    name: string;
    slug: string;
    price: number;
    discountPrice?: number;
    images?: ProductImage[];
};

// Data fetching helper optimized for the server layer
async function getBestsellers(): Promise<BestsellerProduct[]> {
    try {
        const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        // Fetch data directly on the server with automatic revalidation intervals if desired
        const res = await fetch(`${base}/api/products?best-seller=true`, {
            cache: "no-store" , // Caches for 1 hour to boost performance, change to { cache: 'no-store' } if live accuracy is required
        });
        
        if (!res.ok) return [];
        
        const data = await res.json();
        return data.products || []; // Destructure products collection fallback
    } catch (error) {
        console.error("Failed to fetch server-side bestsellers:", error);
        return [];
    }
}

export const BestSellersSection = async () => {
    // Await database/API collection payload directly during layout compilation
    const products = await getBestsellers();
    if (!products || products.length === 0) return null;

    return (
        <section className="bg-surface-container-low py-16 md:py-24 lg:py-32">
            <div className="mx-auto max-w-360 px-4 sm:px-6 md:px-10">
                {/* Header */}
                <div className="mb-12 text-center md:mb-20">
                    {/* Label */}
                    <div className="mb-3 flex items-center justify-center gap-2">
                        <span className="h-px w-5 bg-primary" />
                        <span className="font-label text-[10px] uppercase tracking-[0.22em] text-primary sm:text-[11px]">Bestsellers</span>
                        <span className="h-px w-5 bg-primary" />
                    </div>

                    {/* Heading */}
                    <h2 className="font-headline text-3xl italic leading-tight sm:text-4xl md:text-5xl">Timeless Essentials</h2>

                    {/* Description */}
                    <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed sm:text-base">The silhouettes that defined our heritage, chosen by our community across India.</p>
                </div>

                {/* Mobile First Product Grid */}
                <div className="grid md:hidden grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-4 md:grid-cols-3 md:gap-x-6 md:gap-y-10 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-14">
                    {products.map((product: BestsellerProduct) => {
                        const primaryImage = product.images?.find((img) => img.isPrimary)?.url || product.images?.[0]?.url;
                        const hasDiscount = !!product.discountPrice && Number(product.discountPrice) < Number(product.price);
                        const currentPrice = hasDiscount ? product.discountPrice : product.price;
                        const originalPrice = hasDiscount ? product.price : null;

                        return (
                            <Link key={product._id} href={`/collections/${product.slug}`} className="group block">
                                {/* Product Image */}
                                <div className="relative mb-3 overflow-hidden rounded-2xl bg-surface-container-high sm:mb-4 md:mb-5">
                                    {primaryImage && (
                                        <img 
                                            src={primaryImage} 
                                            alt={product.name} 
                                            className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                            loading="lazy"
                                        />
                                    )}

                                    {/* Quick View Navigation Trigger */}
                                    <div className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-surface-container-lowest/90 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-primary hover:text-on-primary sm:bottom-3 sm:right-3 sm:h-10 sm:w-10">
                                        <ShoppingBag size={16} className="text-primary group-hover:text-inherit" />
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="px-0.5">
                                    <h3 className="line-clamp-1 font-headline text-sm italic leading-tight sm:text-base">{product.name}</h3>
                                    <div className="mt-1 flex flex-wrap items-center gap-1.5">
                                        <span className="text-xs font-semibold text-primary sm:text-sm">₹{currentPrice?.toLocaleString("en-IN")}</span>
                                        {hasDiscount && (
                                            <span className="text-[11px] text-neutral-500 line-through sm:text-xs">
                                                ₹{originalPrice?.toLocaleString("en-IN")}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Desktop Grid */}
                <div className="hidden grid-cols-2 gap-x-8 gap-y-14 md:grid lg:grid-cols-4">
                    {products.map((product: BestsellerProduct) => {
                        const primaryImage = product.images?.find((img) => img.isPrimary)?.url || product.images?.[0]?.url;
                        const hasDiscount = !!product.discountPrice && Number(product.discountPrice) < Number(product.price);
                        const currentPrice = hasDiscount ? product.discountPrice : product.price;
                        const originalPrice = hasDiscount ? product.price : null;

                        return (
                            <Link key={product._id} href={`/collections/${product.slug}`} className="group block">
                                {/* Product Image */}
                                <div className="relative mb-5 overflow-hidden rounded-2xl bg-surface-container-high">
                                    {primaryImage && (
                                        <img 
                                            src={primaryImage} 
                                            alt={product.name} 
                                            className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                            loading="lazy"
                                        />
                                    )}

                                    {/* Floating Overlay Layout */}
                                    <div className="absolute bottom-4 right-4 translate-y-4 rounded-full bg-surface-container-lowest/90 p-3 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-primary hover:text-on-primary">
                                        <ShoppingBag size={20} className="text-primary group-hover:text-inherit" />
                                    </div>
                                </div>

                                {/* Product Info */}
                                <h3 className="font-headline text-lg italic transition-colors group-hover:text-primary">{product.name}</h3>

                                <div className="mt-1.5 flex items-center gap-2">
                                    <span className="text-sm font-semibold text-primary">₹{currentPrice?.toLocaleString("en-IN")}</span>
                                    {hasDiscount && (
                                        <span className="text-xs text-neutral-500 line-through">
                                            ₹{originalPrice?.toLocaleString("en-IN")}
                                        </span>
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};