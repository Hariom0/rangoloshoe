"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Heart, Menu, ShoppingCart, X, ChevronRight, Gem, IndianRupee, ShieldCheck, HeartHandshake, MapPin, Clock, Mail,  ChevronDown } from "lucide-react";

// Hardcoded static navigation items for Desktop
const NAV_ITEMS = [
	{ id: 1, label: "Collections", href: "/collections" },
	{ id: 2, label: "About", href: "/about" },
];

// Collections data for Dropdowns
const collections = [
	{ name: "Tshirt", path: "/collections?category=Tshirt" },
	{ name: "Shirt", path: "/collections?category=Shirt" },
	{ name: "Jeans", path: "/collections?category=Jeans" },
	{ name: "Trousers", path: "/collections?category=Trousers" },
];
export function WhatsAppIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 32 32" fill="currentColor" className={className}>
			<path d="M19.11 17.34c-.28-.14-1.65-.81-1.91-.9-.25-.09-.43-.14-.62.14-.18.28-.71.9-.87 1.08-.16.19-.31.21-.59.07-.28-.14-1.17-.43-2.23-1.38-.82-.73-1.38-1.63-1.54-1.91-.16-.28-.02-.43.12-.57.13-.13.28-.33.43-.49.14-.17.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.62-1.49-.85-2.04-.22-.52-.45-.45-.62-.46h-.53c-.19 0-.49.07-.75.35 -.25.28 -.97 .95 -.97 2.32 0 1.37 .99 2.7 1.13 2.89 .14 .19 1.95 2.98 4.73 4.１8 .66 .２９ １.１８ .４６ １.５８ .５９ .66 .２１ １.２６ .１８ １.７３ .１１ .53 -.08 １.６５ -.67 １.８８ -1.32 .２３ -.66 .２３ -1.22 .１６ -1.33 -.07 -.₁₁ -.₂₅ -.₁₈ -.53 -.₃₃z" />
			<path d="M₁₆.₀₁ ₃C₈.₈₃ ₃ ₃ ₈.₈₃ ₃ ₁₆c₀ ₂.₅₃ .₇₄ ₄.₉₉ ₂.₁₄ ₇.₁L₃.₅ ₂₉l₅.₉₉ -₁.…A₁₃ ₁₃ ₀ ₁ ₀ ₁₆.…z" />
		</svg>
	);
}
export function InstagramIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
			<rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
			<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
			<line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
		</svg>
	);
}
export const Navbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);
	const pathname = usePathname();

	// Prevent background scrolling when mobile menu is open
	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [isMobileMenuOpen]);

	// Close menu automatically on route change
	useEffect(() => {
		setIsMobileMenuOpen(false);
	}, [pathname]);

	// Helper function to check if a route is active
	const isActive = (href: string) => pathname === href;

	return (
		<header className="bg-white border-b border-gray-100">
			{/* ----------------- DESKTOP & TOP BAR ----------------- */}
			<nav className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">
				{/* Left Section */}
				<div className="flex items-center gap-1.5 md:gap-8">
					{/* Mobile Menu Button */}
					<button className="flex items-center justify-center rounded-full p-2 transition hover:bg-surface md:hidden" onClick={() => setIsMobileMenuOpen(true)} aria-label="Open Mobile Menu">
						<Menu size={22} />
					</button>

					{/* Logo */}
					<Link href={"/"}>
						<Image src={"/images/logo.png"} width={100} height={100} alt="logo" priority />
					</Link>

					{/* Desktop Nav */}
					<div className="hidden items-center gap-7 md:flex">
						{/* Collections Dropdown */}
						<div className="group relative py-6">
							<Link
								href="/collections"
								className={`flex items-center gap-1 border-b-2 pb-0.5 text-sm transition-all duration-300 ${
									pathname.includes("/collections") ? "border-primary text-primary font-semibold" : "border-transparent text-foreground/70 hover:text-foreground"
								}`}
							>
								Collections
								<ChevronDown size={14} className=" transition-transform group-hover:rotate-180" />
							</Link>

							{/* Dropdown Menu */}
							<div className="invisible absolute left-0 top-full z-50 flex w-48 flex-col gap-1 rounded-xl border border-gray-100 bg-white p-2 text-sm opacity-0 shadow-xl transition-all duration-300 group-hover:visible group-hover:opacity-100">
								{collections.map((item) => (
									<Link key={item.name} href={item.path} className="rounded-lg px-4 py-2.5 text-neutral-600 transition-colors hover:bg-surface hover:text-primary">
										{item.name}
									</Link>
								))}
							</div>
						</div>

						{/* Other Nav Items */}
						<Link
							href="/about"
							className={`border-b-2 pb-0.5 text-sm transition-all duration-300 ${
								isActive("/about") ? "border-primary text-primary font-semibold" : "border-transparent text-foreground/70 hover:text-foreground"
							}`}
						>
							About
						</Link>
					</div>
				</div>

				{/* Right Actions */}
				<div className="flex items-center gap-1 sm:gap-2">
					{/* Wishlist Link */}
					<Link
						href="/wishlist"
						className={`rounded-full p-2 transition hover:bg-surface active:scale-95 ${isActive("/wishlist") ? "bg-surface text-background" : "text-foreground/70 hover:text-foreground"}`}
					>
						<Heart size={21} />
					</Link>

					{/* Cart Link */}
					<Link
						href="/cart"
						className={`relative rounded-full p-2 transition hover:bg-surface active:scale-95 ${isActive("/cart") ? "bg-surface text-background" : "text-foreground/70 hover:text-foreground"}`}
					>
						<ShoppingCart size={21} />
					</Link>
				</div>
			</nav>

			{/* ----------------- MOBILE FULL SCREEN DRAWER (LIGHT THEME) ----------------- */}
			<div
				className={`fixed inset-0 z-50 transform bg-white text-neutral-950 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
					isMobileMenuOpen ? "translate-x-0" : "-translate-x-full" /* Changed to slide from left */
				}`}
			>
				{/* Scrollable Content Area */}
				<div className="flex h-full flex-col overflow-y-auto pb-32">
					{/* Drawer Header */}
					<div className="sticky top-0 z-10 flex items-center justify-between bg-white/90 px-6 py-5 backdrop-blur-md">
						<span className="font-label text-xs uppercase tracking-[0.2em] text-neutral-500">Menu</span>
						<button
							onClick={() => setIsMobileMenuOpen(false)}
							className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-all hover:bg-neutral-200 active:scale-95"
							aria-label="Close Menu"
						>
							<X size={20} />
						</button>
					</div>

					<div className="space-y-10 px-6 pb-10 pt-4">
						{/* 1. Main Navigation - Accordion Style */}
						<nav className="flex flex-col gap-6">
							{/* Collections Toggle */}
							<div className="flex flex-col gap-4">
								<button
									onClick={() => setMobileCollectionsOpen(!mobileCollectionsOpen)}
									className="group flex items-center justify-between text-3xl font-headline italic tracking-wide text-neutral-800 transition-colors hover:text-primary"
								>
									Collections
									<ChevronDown size={24} className={`text-neutral-400 transition-transform duration-300 ${mobileCollectionsOpen ? "rotate-180" : ""}`} />
								</button>

								{/* Expanded Collections */}
								<div className={`flex flex-col gap-4 overflow-hidden transition-all duration-300 ${mobileCollectionsOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}`}>
									<div className="ml-2 flex flex-col gap-4 border-l-2 border-neutral-100 pl-4">
										{collections.map((item) => (
											<Link key={item.name} href={item.path} className="text-xl font-headline italic tracking-wide text-neutral-500 transition-colors hover:text-primary">
												{item.name}
											</Link>
										))}
									</div>
								</div>
							</div>

							{/* Standard Nav Items */}
							<Link href="/about" className="group flex items-center justify-between text-3xl font-headline italic tracking-wide text-neutral-800 transition-colors hover:text-primary">
								About
								<ChevronRight size={24} className="text-neutral-400 transition-transform group-hover:translate-x-2 group-hover:text-primary" />
							</Link>
						</nav>

						{/* Divider */}
						<div className="h-px w-full bg-neutral-100" />

						{/* 2. Micro "Why Choose Us" */}
						<div className="space-y-4">
							<h3 className="font-label text-xs uppercase tracking-[0.15em] text-neutral-500">Our Promise</h3>
							<div className="grid grid-cols-2 gap-4">
								<div className="flex flex-col gap-1.5 rounded-xl bg-neutral-50 p-3">
									<Gem size={16} className="text-primary" />
									<span className="text-[11px] font-semibold text-neutral-800">Wide Collection</span>
								</div>
								<div className="flex flex-col gap-1.5 rounded-xl bg-neutral-50 p-3">
									<IndianRupee size={16} className="text-primary" />
									<span className="text-[11px] font-semibold text-neutral-800">Honest Pricing</span>
								</div>
								<div className="flex flex-col gap-1.5 rounded-xl bg-neutral-50 p-3">
									<ShieldCheck size={16} className="text-primary" />
									<span className="text-[11px] font-semibold text-neutral-800">Trusted Quality</span>
								</div>
								<div className="flex flex-col gap-1.5 rounded-xl bg-neutral-50 p-3">
									<HeartHandshake size={16} className="text-primary" />
									<span className="text-[11px] font-semibold text-neutral-800">Personal Service</span>
								</div>
							</div>
						</div>

						{/* 3. Visit Our Store Card */}
						<Link href={"https://maps.app.goo.gl/pXwDPsLKFAPbC6f37"} className="rounded-2xl border border-neutral-100 bg-neutral-50 p-5">
							<h3 className="mb-4 font-label text-xs uppercase tracking-[0.15em] text-neutral-500">Visit Our Store</h3>
							<div className="space-y-4">
								<div className="flex items-start gap-3">
									<MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
									<p className="text-sm leading-relaxed text-neutral-600">
										Canara bank, Gali Station Rd,
										<br />
										Sasamusa, Bihar 841505
									</p>
								</div>
								<div className="flex items-start gap-3">
									<Clock size={16} className="mt-0.5 shrink-0 text-primary" />
									<p className="text-sm leading-relaxed text-neutral-600">
										Mon - Sat: 10 AM - 9 PM
										<br />
										Sun: 11 AM - 7 PM
									</p>
								</div>
							</div>
						</Link>
					</div>
				</div>

				{/* Sticky Bottom Actions Container */}
				<div className="absolute bottom-0 left-0 w-full border-t border-neutral-100 bg-white/90 p-4 backdrop-blur-xl">
					<div className="flex items-center gap-3">
						{/* WhatsApp - Primary CTA */}
						<Link
							href="https://www.instagram.com/rangoli_shoe_sasamusa/"
							target="_blank"
							rel="noopener noreferrer"
							className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]  font-semibold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-95"
						>
							<InstagramIcon className="h-5 w-5" />
							<span className="text-sm tracking-wide">Follow for Daily Updates</span>
						</Link>

						{/* Instagram */}
						<Link
							href="https://api.whatsapp.com/send/?phone=919934745626&text=Hello+Rangoli+Shoes&type=phone_number&app_absent=0/"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Instagram"
							className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white shadow-lg transition-all hover:scale-105 active:scale-95"
						>
							<WhatsAppIcon className="h-5 w-5" />
						</Link>

						{/* Mail / Channel */}
						<Link
							href="https://Mail.com/rangolishoes"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Daily Updates"
							className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-700 shadow-sm transition-all hover:border-primary hover:text-primary active:scale-95"
						>
							<Mail size={18} />
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
};
