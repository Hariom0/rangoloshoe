"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

export interface ProductImage {
	_id: string;
	url: string;
	altText: string;
	isPrimary: boolean;
}

export interface ProductVariant {
	_id: string;
	size: number;
	stock: number;
	sku: string;
}

export interface Product {
	_id: string;
	name: string;
	slug: string;
	description: string;
	gender: "Men" | "Women" | "Unisex" | string; // Strict or flexible depending on requirements
	category: string;
	price: number;
	discountPrice?: number | null; // Optional/nullable for items without markdown pricing
	images: ProductImage[];
	variants: ProductVariant[];
	isActive: boolean;
	is_bestseller: boolean;
	is_fresh_drop: boolean;
	createdAt: string; // ISO date strings from MongoDB
	updatedAt: string;
	__v?: number;
}

export const FreshDropsSection = () => {
	const [products, setProducts] = useState<Product[]>([]);

	// Simulated API Response
	useEffect(() => {
		async function fetchDrops() {
			let res = await fetch("/api/products?fresh-drop=true");
			let { products: data } = await res.json();
			setProducts(data);
		}
		fetchDrops();
	}, []);

	return (
		<section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:px-10 md:py-24 lg:py-32">
			{/* Header */}
			<div className="mb-10 md:mb-14">
				{/* Label */}
				<div className="mb-3 flex items-center gap-2">
					<span className="h-px w-5 bg-primary" />
					<span className="font-label text-[10px] uppercase tracking-[0.22em] text-primary sm:text-[11px]">Fresh Drops</span>
				</div>

				{/* Heading */}
				<h2 className="font-headline text-3xl italic leading-tight sm:text-4xl md:text-5xl">Just Dropped</h2>

				{/* Description */}
				<p className="mt-3 text-sm leading-relaxed sm:text-base">The latest silhouettes from our design house</p>
			</div>

			{/* Mobile Scroll Cards */}
			<div className="md:hidden">
				<div className="hide-scrollbar flex gap-4 overflow-x-auto pb-2">
					{products.map((product) => {
						// Extract primary image or fallback to first available image
						const primaryImage = product.images?.find((img) => img.isPrimary)?.url || product.images?.[0]?.url;

						// Handle pricing logic
						const hasDiscount = !!product.discountPrice;
						const currentPrice = hasDiscount ? product.discountPrice : product.price;
						const originalPrice = hasDiscount ? product.price : null;

						// Calculate discount percentage dynamically if it exists
						const discountPercentage = hasDiscount ? Math.round(((product.price - product.discountPrice) / product.price) * 100) : null;

						return (
							<div key={product._id} className="min-w-[260px]">
								<div className="group">
									{/* Image Wrapper */}
									<div className="relative mb-4 aspect-square overflow-hidden rounded-2xl bg-surface-container-low">
										{/* Badges Container */}
										<div className="absolute left-4 top-4 z-10 flex flex-col gap-1.5">
											<div className="rounded-md bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-on-primary  group-hover:visible">New</div>
										</div>

										{/* Product Image */}
										{primaryImage && <img src={primaryImage} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />}

										{/* Add To Cart */}
										<button className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-surface-container-lowest/90 backdrop-blur-sm transition-all duration-300 hover:bg-primary hover:text-on-primary">
											<ShoppingBag size={18} className="text-primary" />
										</button>
									</div>

									{/* Product Info */}
									<h3 className="mb-1 font-headline text-lg">{product.name}</h3>

									<div className="flex flex-wrap items-center gap-2">
										<span className="font-bold text-primary">₹{currentPrice}</span>
										{hasDiscount && <span className="text-sm text-neutral-500 line-through">₹{originalPrice}</span>}
										{discountPercentage && <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">{discountPercentage}% OFF</span>}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* Desktop Grid */}
			<div className="hidden grid-cols-2 gap-6 md:grid lg:grid-cols-4 lg:gap-8">
				{products.map((product) => {
					const primaryImage = product.images?.find((img) => img.isPrimary)?.url || product.images?.[0]?.url;
					const hasDiscount = !!product.discountPrice;
					const currentPrice = hasDiscount ? product.discountPrice : product.price;
					const originalPrice = hasDiscount ? product.price : null;
					const discountPercentage = hasDiscount ? Math.round(((product.price - product.discountPrice) / product.price) * 100) : null;

					return (
						<Link key={product._id} href={`/collections/${product.slug}`} className="group">
							{/* Product Image Container */}
							<div className="relative mb-5 aspect-square overflow-hidden rounded-2xl bg-surface-container-low">
								{/* Badges Container */}
								<div className="absolute left-4 top-4 z-10 flex flex-col gap-1.5">
									<div className="rounded-md bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-on-primary">New</div>
								</div>

								{/* Image */}
								{primaryImage && <img src={primaryImage} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />}

								{/* Cart Button */}
								<button className="absolute bottom-4 right-4 translate-y-4 rounded-full bg-surface-container-lowest/90 p-3 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-primary hover:text-on-primary">
									<ShoppingBag size={20} className="text-primary" />
								</button>
							</div>

							{/* Product Info */}
							<h3 className="mb-1 font-headline text-lg">{product.name}</h3>

							<div className="flex flex-wrap items-center gap-3">
								<span className="font-bold text-primary">₹{currentPrice}</span>
								{hasDiscount && <span className="text-sm text-neutral-500 line-through">₹{originalPrice}</span>}
								{discountPercentage && <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">{discountPercentage}% OFF</span>}
							</div>
						</Link>
					);
				})}
			</div>
		</section>
	);
};
