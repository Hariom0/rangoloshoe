"use client";

import { useEffect, useState } from "react";
import { Star, StarHalf, ShoppingBag, Heart, ChevronDown, PlayCircle, Flame, Tag, Loader2, Check } from "lucide-react";
import WhatsAppBuyButton from "../shared/WhatsAppBuyButton";
import { addToCart } from "@/lib/utils";

// --- TYPES ---
export interface Media {
	_id: string;
	url: string;
	altText: string;
	isPrimary?: boolean;
	type?: "image" | "video";
}

export interface Variant {
	_id: string;
	size: number | string;
	stock: number;
	sku: string;
}

export interface Product {
	_id: string;
	name: string;
	slug: string;
	description: string;
	gender: string;
	category: string;
	price: number;
	discountPrice?: number;
	images: Media[];
	variants: Variant[];
	isActive: boolean;
	is_bestseller: boolean;
	is_fresh_drop: boolean;
	createdAt: string;
	updatedAt: string;
}

export default function ProductClientView({ product }: { product: Product }) {
	const primaryMedia = product.images.find((img) => img.isPrimary) || product.images[0];
	const [activeMedia, setActiveMedia] = useState<Media>(primaryMedia);
	const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
	const [selectedSize, setSelectedSize] = useState<number | string | undefined>();

	// Animation Status Handler State
	const [cartStatus, setCartStatus] = useState<"idle" | "loading" | "success">("idle");
	const [wishlist, setWishlist] = useState<string[]>([]);

	// Client-side hydration sync for LocalStorage
	useEffect(() => {
		const stored = localStorage.getItem("wishlist");
		if (stored) {
			try {
				const parsed = JSON.parse(stored);
				if (Array.isArray(parsed)) setWishlist(parsed);
			} catch (e) {
				console.error("Failed parsing local wishlist storage:", e);
			}
		}
	}, []);

	// Intercepts the add action to display premium async states
	const handleAddToCartAction = () => {
		if (!selectedVariant) return;

		setCartStatus("loading");

		// Short timeout sequence for visual confirmation layout timing
		setTimeout(() => {
			const success = addToCart(product.slug, selectedVariant.size, 1);
			if (success) {
				setCartStatus("success");

				// Keep the success state layout visible temporarily
				setTimeout(() => {
					setCartStatus("idle");
				}, 1800);
			} else {
				setCartStatus("idle");
			}
		}, 450);
	};

	const handleWishlistClick = (e: React.MouseEvent, slug: string) => {
		e.preventDefault();
		e.stopPropagation();

		let updatedWishlist: string[];

		if (wishlist.includes(slug)) {
			updatedWishlist = wishlist.filter((item) => item !== slug);
		} else {
			updatedWishlist = [...wishlist, slug];
		}

		setWishlist(updatedWishlist);
		localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
		window.dispatchEvent(new Event("wishlist-updated"));
	};

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat("en-IN", {
			style: "currency",
			currency: "INR",
			maximumFractionDigits: 0,
		}).format(price);
	};

	const isVideo = (media: Media) => {
		return media.type === "video" || media.url.match(/\.(mp4|webm|ogg)$/i);
	};

	const hasDiscount = !!(product.discountPrice && Number(product.discountPrice) < Number(product.price));
	const discountPercentage = hasDiscount ? Math.round((1 - product.discountPrice! / product.price) * 100) : 0;
	const isLiked = wishlist.includes(product.slug);

	return (
		<main className="max-w-7xl mx-auto px-6 md:px-8 py-8">
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
				{/* --- LEFT COLUMN: GALLERY --- */}
				<div className="lg:col-span-7 space-y-6">
					<div className="aspect-square bg-gray-50 rounded-xl overflow-hidden cursor-zoom-in group relative flex items-center justify-center border border-gray-100">
						{isVideo(activeMedia) ? (
							<video src={activeMedia.url} autoPlay loop muted playsInline className="w-full h-full object-cover" />
						) : (
							<img alt={activeMedia.altText} src={activeMedia.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
						)}

						<div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold tracking-widest text-gray-800 uppercase shadow-sm">{product.category}</div>

						<div className="absolute bottom-4 left-4 flex flex-col gap-2">
							{product.is_fresh_drop && (
								<span className="flex items-center gap-1.5 bg-amber-500 text-black px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider shadow-md">
									<Flame className="w-3.5 h-3.5 fill-black" /> New Drop
								</span>
							)}
							{product.is_bestseller && (
								<span className="flex items-center gap-1.5 bg-primary/80 text-white px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider shadow-md">
									<Star className="w-3.5 h-3.5 fill-white" /> Bestseller
								</span>
							)}
						</div>
					</div>

					{/* Thumbnails */}
					{product.images.length > 1 && (
						<div className="grid grid-cols-4 md:grid-cols-6 gap-4">
							{product.images.map((media) => (
								<button
									key={media._id}
									onClick={() => setActiveMedia(media)}
									className={`relative aspect-square rounded-lg overflow-hidden transition-all ${
										activeMedia._id === media._id ? "border-2 border-primary ring-2 ring-primary ring-offset-2 opacity-100" : "border-2 border-transparent opacity-60 hover:opacity-100"
									}`}
								>
									{isVideo(media) ? (
										<>
											<video src={media.url} className="w-full h-full object-cover" />
											<div className="absolute inset-0 bg-black/20 flex items-center justify-center">
												<PlayCircle className="text-white w-6 h-6" />
											</div>
										</>
									) : (
										<img alt={`Thumbnail of ${media.altText}`} src={media.url} className="w-full h-full object-cover" />
									)}
								</button>
							))}
						</div>
					)}
				</div>

				{/* --- RIGHT COLUMN: DETAILS --- */}
				<div className="lg:col-span-5 space-y-8">
					<div>
						<div className="flex flex-wrap items-center gap-2 mb-3">
							<span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-[10px] font-bold tracking-[0.15em] text-gray-600 uppercase">
								{product.gender} • {product.category}
							</span>
							{product.is_fresh_drop && <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-amber-200">Just In</span>}
							{product.is_bestseller && <span className="bg-primary text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-primary/80">Popular</span>}
						</div>

						<h1 className="text-4xl lg:text-5xl text-gray-900 leading-tight mb-2 font-serif italic font-medium">{product.name}</h1>

						<div className="flex items-center gap-3">
							<div className="flex items-center text-yellow-500">
								<Star className="w-5 h-5 fill-current" />
								<Star className="w-5 h-5 fill-current" />
								<Star className="w-5 h-5 fill-current" />
								<Star className="w-5 h-5 fill-current" />
								<StarHalf className="w-5 h-5 fill-current" />
							</div>
							<span className="text-sm font-medium text-gray-500">4.6 (128 Reviews)</span>
						</div>
					</div>

					{/* Smart Pricing Block */}
					<div className="space-y-1">
						<div className="flex items-center gap-3 flex-wrap">
							<span className="text-3xl font-extrabold text-gray-900">{formatPrice(hasDiscount ? product.discountPrice! : product.price)}</span>
							{hasDiscount && (
								<>
									<span className="text-lg text-gray-400 line-through font-medium">{formatPrice(product.price)}</span>
									<span className="flex items-center gap-1 text-sm font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100">
										<Tag className="w-3 h-3" /> Save {discountPercentage}%
									</span>
								</>
							)}
						</div>
						<p className="text-xs text-gray-500 italic">Inclusive of all taxes</p>
					</div>

					{/* Size Selection */}
					<div className="space-y-4">
						<div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
							{product.variants.map((variant) => {
								const isOutOfStock = variant.stock === 0;
								const isSelected = selectedVariant?._id === variant._id;

								return (
									<button
										key={variant._id}
										disabled={isOutOfStock || cartStatus !== "idle"}
										onClick={() => {
											setSelectedVariant(variant);
											setSelectedSize(variant.size);
										}}
										className={`h-12 rounded-lg flex items-center justify-center font-bold transition-all border ${
											isOutOfStock
												? "opacity-30 cursor-not-allowed bg-gray-50 text-gray-400"
												: isSelected
													? "bg-primary text-white border-primary shadow-sm"
													: "border-gray-200 hover:border-primary hover:text-primary text-gray-700"
										}`}
									>
										{variant.size}
									</button>
								);
							})}
						</div>
						{selectedVariant && selectedVariant.stock < 10 && <p className="text-xs text-orange-600 font-medium">Hurry! Only {selectedVariant.stock} left in this size.</p>}
					</div>

					{/* Actions Container */}
					<div className="flex flex-col gap-3 w-full max-w-md">
						<div className="flex gap-3 items-center">
							{/* ANIMATED ADD TO BAG BUTTON */}
							<button
								disabled={!selectedVariant || cartStatus === "loading"}
								onClick={handleAddToCartAction}
								className={`flex-[3] h-14 font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all duration-300 transform active:scale-[0.98] select-none
                                    ${
																			cartStatus === "success"
																				? "bg-emerald-600 text-white scale-[1.01]"
																				: "bg-primary text-white hover:bg-primary/90 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:active:scale-100 disabled:shadow-none"
																		}`}
							>
								{cartStatus === "loading" && <Loader2 className="w-5 h-5 shrink-0 animate-spin text-white" />}
								{cartStatus === "success" && <Check className="w-5 h-5 shrink-0 text-white animate-[bounce_0.5s_ease-in-out_1]" />}
								{cartStatus === "idle" && <ShoppingBag className="w-5 h-5 shrink-0" />}

								<span className="tracking-wide transition-all duration-200">
									{(() => {
										if (!selectedVariant) return "Select a Size";
										if (cartStatus === "loading") return "Adding to Bag...";
										if (cartStatus === "success") return "Added to Bag!";
										return "Add to Bag";
									})()}
								</span>
							</button>

							{/* Wishlist Heart Action */}
							<button
								type="button"
								aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
								onClick={(e) => handleWishlistClick(e, product.slug)}
								className={`flex-1 h-14 border rounded-xl flex items-center justify-center active:scale-[0.98] transition-all duration-200 shadow-sm ${
									isLiked ? "bg-red-50 border-red-200 text-red-500" : "bg-white border-gray-200 text-gray-600 hover:bg-red-50 hover:border-red-200 hover:text-red-500"
								}`}
							>
								<Heart className={`w-5 h-5 transition-all duration-300 ${isLiked ? "fill-red-500 scale-110 drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]" : ""}`} />
							</button>
						</div>
						{/* Instant WhatsApp Checkout Button Container */}
						<div className="w-full space-y-2">
							<WhatsAppBuyButton
								disabled={!selectedVariant || cartStatus === "loading"}
								items={[{ name: product.name, slug: product.slug, size: selectedSize, price: product.discountPrice }]}
								totalPrice={product.price}
								className="h-14 w-full rounded-xl font-bold bg-[#25D366] text-white hover:bg-[#20ba5a] active:scale-[0.98] shadow-sm"
							/>

							{/* Clear validation message below the button */}
							{!selectedVariant && <p className="text-sm text-amber-600 text-center font-medium animate-pulse">⚠️ Please select a size/variant before placing your order.</p>}
						</div>
					</div>

					{/* Accordion Details */}
					<div className="divide-y divide-gray-200 pt-4">
						<details className="group py-4" open>
							<summary className="list-none flex justify-between items-center cursor-pointer font-bold uppercase tracking-widest text-sm text-gray-900">
								Product Details
								<ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
							</summary>
							<div className="mt-4 text-sm leading-relaxed text-gray-600 space-y-2">
								<p>{product.description}</p>
							</div>
						</details>
						<details className="group py-4">
							<summary className="list-none flex justify-between items-center cursor-pointer font-bold uppercase tracking-widest text-sm text-gray-900">
								Shipping & Returns
								<ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
							</summary>
							<div className="mt-4 text-sm text-gray-600">Free shipping on all orders above ₹500. 15-day hassle-free return policy.</div>
						</details>
						<details className="group py-4">
							<summary className="list-none flex justify-between items-center cursor-pointer font-bold uppercase tracking-widest text-sm text-gray-900">
								Product Care
								<ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
							</summary>
							<div className="mt-4 text-sm text-gray-600">Wipe clean with a damp cloth. Avoid direct sunlight. Use a soft brush for fabric sections.</div>
						</details>
					</div>
				</div>
			</div>
		</main>
	);
}
