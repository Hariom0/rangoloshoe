"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, Menu, ShoppingCart, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

// Hardcoded static navigation items
const NAV_ITEMS = [
	{ id: 1, label: "Collections", href: "/collections" },
	{ id: 2, label: "About", href: "/about" },
];

export const Navbar = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const pathname = usePathname();

	// Helper function to check if a route is active
	const isActive = (href: string) => pathname === href;

	return (
		<header className="bg-white border-b border-gray-100">
			<nav className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">
				{/* Left Section */}
				<div className="flex items-center gap-1.5 md:gap-8">
					{/* Mobile Menu Button */}
					<button className="flex items-center justify-center rounded-full p-2 transition hover:bg-surface md:hidden" onClick={() => setMobileMenuOpen(true)}>
						<Menu size={22} />
					</button>

					{/* Logo */}
					<Link href={"/"}>
						<Image src={"/images/logo.png"} width={150} height={150} alt="logo" />
					</Link>

					{/* Desktop Nav */}
					<div className="hidden items-center gap-7 md:flex">
						{NAV_ITEMS.map((item) => (
							<Link
								key={item.id}
								href={item.href}
								className={`border-b-2 pb-0.5 text-sm transition-all duration-300 ${
									isActive(item.href) ? "border-primary text-primary font-semibold" : "border-transparent text-foreground/70 hover:text-foreground"
								}`}
							>
								{item.label}
							</Link>
						))}
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
					<Link href="/cart" className={`relative rounded-full p-2 transition hover:bg-surface active:scale-95 ${isActive("/cart") ? "bg-surface text-background" : "text-foreground/70 hover:text-foreground"}`}>
						<ShoppingCart size={21} />
						{/* {cartCount > 0 && (
                            <span className="absolute -right-0.5 -top-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-primary text-[9px] font-bold text-on-primary">
                                {cartCount}
                            </span>
                        )} */}
					</Link>
				</div>
			</nav>

			{/* Mobile Drawer */}
			<div className={`fixed inset-0 z-[60] transition-all duration-300 md:hidden ${mobileMenuOpen ? "pointer-events-auto bg-black/40 opacity-100" : "pointer-events-none opacity-0"}`}>
				<div className={`absolute left-0 top-0 h-full w-[280px] bg-background p-6 shadow-2xl transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
					<div className="mb-10 flex items-center justify-between">
						<h2 className="text-lg font-semibold">Menu</h2>
						<button onClick={() => setMobileMenuOpen(false)} className="rounded-full p-2 hover:bg-surface">
							<X size={22} />
						</button>
					</div>

					<div className="flex flex-col gap-6">
						{NAV_ITEMS.map((item) => (
							<Link
								key={item.id}
								href={item.href}
								onClick={() => setMobileMenuOpen(false)}
								className={`text-sm transition ${isActive(item.href) ? "font-semibold text-primary" : "text-foreground/70 hover:text-foreground"}`}
							>
								{item.label}
							</Link>
						))}
					</div>
				</div>
			</div>
		</header>
	);
};
