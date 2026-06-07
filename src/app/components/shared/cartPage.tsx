"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, Percent } from "lucide-react";

import WhatsAppBuyButton, { CartItemWithDetails } from "../shared/WhatsAppBuyButton";

// --- TYPES & INTERFACES ---
interface LocalCartItem {
	slug: string;
	size: string | number;
	quantity: number;
}

interface Product {
	_id: string;
	name: string;
	slug: string;
	category: string;
	gender: string;
	price: number;
	discountPrice?: number;
	images: { url: string; isPrimary: boolean }[];
}

// Fixed TypeScript type tracking to remove all (item as any) conversions
interface ProcessedCartItem extends CartItemWithDetails {
	image: string;
	category: string;
	gender: string;
}

// Standalone formatting helper
const formatPrice = (value: number) =>
	new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 0,
	}).format(value);

export default function CartPage() {
	const router = useRouter();
	const [cartItems, setCartItems] = useState<LocalCartItem[]>([]);
	const [productsDetails, setProductsDetails] = useState<Product[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	// Initial Core Hydration
	useEffect(() => {
		async function fetchCartData() {
			try {
				const stored = localStorage.getItem("cart");
				if (!stored) {
					setLoading(false);
					return;
				}

				const localCart: LocalCartItem[] = JSON.parse(stored);
				if (localCart.length === 0) {
					setLoading(false);
					return;
				}

				setCartItems(localCart);

				// Collect only unique slugs to avoid redundant parameter requests
				const uniqueSlugs = Array.from(new Set(localCart.map((item) => item.slug)));

				const res = await fetch(`/api/products/${uniqueSlugs.join(",")}`);
				if (!res.ok) throw new Error("Could not map cart records.");

				const payload = await res.json();
				if (payload.success && Array.isArray(payload.data)) {
					setProductsDetails(payload.data);
				}
			} catch (err) {
				console.error("Cart system initialization fault:", err);
			} finally {
				setLoading(false);
			}
		}
		fetchCartData();
	}, []);

	// Helper: Persists state changes back down to local storage
	const saveAndSetCart = (updatedCart: LocalCartItem[]) => {
		setCartItems(updatedCart);
		if (updatedCart.length === 0) {
			localStorage.removeItem("cart");
		} else {
			localStorage.setItem("cart", JSON.stringify(updatedCart));
		}
		window.dispatchEvent(new Event("cart-updated"));
	};

	// Optimization: Build O(1) lookup dictionary for products
	const productMap = useMemo(() => {
		return Object.fromEntries(productsDetails.map((product) => [product.slug, product]));
	}, [productsDetails]);

	// Optimization: Combine local storage data with remote database product specs
	const processedCartItems = useMemo((): ProcessedCartItem[] => {
		return cartItems
			.map((localItem) => {
				const match = productMap[localItem.slug];

				return {
					slug: localItem.slug,
					size: localItem.size,
					quantity: localItem.quantity,
					name: match?.name ?? "Footwear Item",
					price: match?.price ?? 0,
					discountPrice: match?.discountPrice,
					image: match?.images.find((img) => img.isPrimary)?.url ?? match?.images[0]?.url ?? "",
					category: match?.category ?? "Shoes",
					gender: match?.gender ?? "Unisex",
				};
			})
			.filter((item) => item.price > 0);
	}, [cartItems, productMap]);

	// Optimized: Clean state adjustments via Math.max
	const updateQuantity = (slug: string, size: string | number, delta: number) => {
		saveAndSetCart(
			cartItems.map((item) =>
				item.slug === slug && item.size === size
					? {
							...item,
							quantity: Math.max(1, item.quantity + delta),
						}
					: item,
			),
		);
	};

	// Action: Evict an entire item row matching both slug and size
	const removeCartItem = (slug: string, size: string | number) => {
		const filtered = cartItems.filter((item) => !(item.slug === slug && item.size === size));
		saveAndSetCart(filtered);
	};

	// Calculation engines based on current memoized weights
	const totalOriginalPrice = processedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
	const grandTotalPrice = processedCartItems.reduce((acc, item) => acc + (item.discountPrice || item.price) * item.quantity, 0);
	const platformSavings = totalOriginalPrice - grandTotalPrice;

	// Loading Shimmer Skeletons
	if (loading) {
		return (
			<div className="min-h-screen bg-neutral-50/50 max-w-5xl mx-auto p-4 md:p-8 space-y-6">
				<div className="h-8 w-48 bg-neutral-200 animate-pulse rounded-lg" />
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
					<div className="lg:col-span-7 space-y-4">
						{[1, 2].map((n) => (
							<div key={n} className="h-32 bg-white rounded-2xl  animate-pulse" />
						))}
					</div>
					<div className="lg:col-span-5 h-64 bg-white rounded-2xl  animate-pulse" />
				</div>
			</div>
		);
	}

	// Clean Next.js-friendly Empty Cart State
	if (processedCartItems.length === 0) {
		return (
			<div className="min-h-screen bg-white px-6 flex flex-col items-center justify-center text-center max-w-md mx-auto w-full">
				<div className="w-20 h-20 bg-surface border border-neutral-100 rounded-full flex items-center justify-center text-white mb-6 shadow-sm">
					<ShoppingBag className="w-8 h-8 stroke-[1.5]" />
				</div>
				<h2 className="text-xl font-bold text-neutral-900 tracking-tight">Your cart is empty</h2>
				<p className="text-sm text-neutral-500 mt-2 max-w-[280px] leading-relaxed">Looks like you haven&apos;t added anything to your cart yet.</p>
				<button onClick={() => router.push("/")} className="mt-8 w-full h-12 bg-neutral-900 text-white rounded-xl text-sm font-semibold hover:bg-neutral-800 transition-colors active:scale-[0.98]">
					Continue Shopping
				</button>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-neutral-50/40 w-full max-w-6xl mx-auto md:px-6 lg:px-8 flex flex-col">
			{/* Navigation Bar Header */}
			<header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-neutral-100 px-4 h-16 flex items-center gap-3 md:mt-4 md:rounded-2xl md:border md:shadow-sm">
				<button onClick={() => router.back()} className="p-1 -ml-1 text-neutral-700 hover:text-neutral-900 transition-colors">
					<ArrowLeft className="w-5 h-5" />
				</button>
				<h1 className="text-lg font-bold text-neutral-900">Your Cart ({processedCartItems.length})</h1>
			</header>

			{/* Core Workspace Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4 p-4 md:p-0 items-start flex-1 pb-24">
				{/* LEFT RAIL: Items Stack */}
				<main className="lg:col-span-7 space-y-3">
					{processedCartItems.map((item, idx) => {
						const hasDiscount = !!item.discountPrice;
						const activeUnitRate = hasDiscount ? item.discountPrice! : item.price;

						return (
							<div
								key={`${item.slug}-${item.size}-${idx}`}
								className="group relative flex gap-4 p-3.5 bg-white rounded-2xl border border-neutral-200/60 shadow-sm transition-all hover:border-neutral-300"
							>
								{/* Optimized Image Container with fallbacks and broken image catchers */}
								<div className="relative w-24 h-24 bg-neutral-50 rounded-xl overflow-hidden flex-shrink-0 border border-neutral-100 md:w-28 md:h-28">
									<img
										src={item.image || "/placeholder-product.jpg"}
										alt={item.name}
										className="w-full h-full object-cover"
										onError={(e) => {
											e.currentTarget.src = "/placeholder-product.jpg";
										}}
									/>
								</div>

								{/* Product Specifications Metadata without any "any" castings */}
								<div className="flex-1 flex flex-col justify-between min-w-0 pr-6">
									<div>
										<span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
											{item.gender} · {item.category}
										</span>
										<h3 className="text-sm font-bold text-neutral-800 tracking-tight truncate mt-0.5 md:text-base">{item.name}</h3>
										<span className="inline-block mt-1 text-[11px] font-semibold px-2 py-0.5 bg-neutral-50 border border-neutral-100 rounded text-neutral-600">Size: UK {item.size}</span>
									</div>

									{/* Interactive Quantity Counter Ring and Subtotals */}
									<div className="flex items-center justify-between mt-3 flex-wrap gap-2">
										<div className="flex items-center border border-neutral-200 bg-neutral-50 rounded-lg overflow-hidden h-8">
											<button
												onClick={() => updateQuantity(item.slug, item.size, -1)}
												className="w-8 h-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 active:bg-neutral-200 transition-colors"
											>
												<Minus className="w-3.5 h-3.5" />
											</button>
											<span className="w-8 text-center text-xs font-bold text-neutral-800 select-none">{item.quantity}</span>
											<button
												onClick={() => updateQuantity(item.slug, item.size, 1)}
												className="w-8 h-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 active:bg-neutral-200 transition-colors"
											>
												<Plus className="w-3.5 h-3.5" />
											</button>
										</div>

										<div className="flex flex-col items-end">
											<span className="text-base font-extrabold text-neutral-900">{formatPrice(activeUnitRate * item.quantity)}</span>
											{hasDiscount && <span className="text-xs text-neutral-400 line-through">{formatPrice(item.price * item.quantity)}</span>}
										</div>
									</div>
								</div>

								{/* Row Removal Button */}
								<button
									onClick={() => removeCartItem(item.slug, item.size)}
									aria-label="Remove item"
									className="absolute right-3 top-3 w-7 h-7 bg-neutral-50 hover:bg-red-50 hover:border-red-200 border border-neutral-200/80 rounded-full flex items-center justify-center text-neutral-400 hover:text-red-500 transition-all active:scale-90"
								>
									<Trash2 className="w-3.5 h-3.5" />
								</button>
							</div>
						);
					})}
				</main>

				{/* RIGHT RAIL: Fixed Invoice Receipt Sidebar */}
				<aside className="lg:col-span-5 bg-white border border-neutral-200/80 rounded-2xl p-5 shadow-sm space-y-5 lg:sticky lg:top-24">
					<h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">Order Receipt Details</h2>

					<div className="space-y-3 text-sm">
						<div className="flex justify-between text-neutral-500">
							<span>Bag Subtotal</span>
							<span>{formatPrice(totalOriginalPrice)}</span>
						</div>

						{platformSavings > 0 && (
							<div className="flex justify-between text-emerald-600 font-medium bg-emerald-50/60 border border-emerald-100/50 p-2.5 rounded-xl">
								<span className="flex items-center gap-1">
									<Percent className="w-3.5 h-3.5" />
									Campaign Discounts
								</span>
								<span>- {formatPrice(platformSavings)}</span>
							</div>
						)}

						<div className="flex justify-between text-neutral-500">
							<span>Estimated Shipping</span>
							<span className="text-emerald-600 font-semibold">FREE</span>
						</div>

						<hr className="border-neutral-100" />

						<div className="flex justify-between text-base font-black text-neutral-900">
							<span>Grand Total</span>
							<span>{formatPrice(grandTotalPrice)}</span>
						</div>
					</div>

					<WhatsAppBuyButton
						className="h-14 w-full rounded-xl font-bold bg-[#25D366] text-white hover:bg-[#20ba5a] active:scale-[0.98] shadow-sm"
						items={processedCartItems}
						totalPrice={grandTotalPrice}
					/>
				</aside>
			</div>
		</div>
	);
}
