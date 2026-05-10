"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";



type NavItem = {
  id: number;
  label: string;
  href: string;
  active?: boolean;
};

export const Navbar = () => {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Simulated API Response
  useEffect(() => {
    const fetchNavbarData = async () => {
      setTimeout(() => {
        setNavItems([
          {
            id: 1,
            label: "Shop",
            href: "#",
            active: true,
          },
          {
            id: 2,
            label: "Collections",
            href: "#",
          },
          {
            id: 3,
            label: "About",
            href: "#",
          },
          {
            id: 4,
            label: "Contact",
            href: "#",
          },
        ]);

        setCartCount(2);
      }, 500);
    };

    fetchNavbarData();
  }, []);

  return (
    <header className="bg-white ">
      <nav className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">
        {/* Left Section */}
        <div className="flex items-center gap-8">
          {/* Mobile Menu Button */}
          <button
            className="flex items-center justify-center rounded-full p-2 transition hover:bg-surface md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={22} />
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="text-xl italic tracking-tight text-foreground sm:text-2xl"
          >
            Rangoli Shoes
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`border-b-2 pb-0.5 text-sm transition-all duration-300 ${
                  item.active
                    ? "border-primary text-primary font-semibold"
                    : "border-transparent text-foreground/70 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button className="rounded-full p-2 transition hover:bg-surface active:scale-95">
            <Search size={21} />
          </button>

          <button className="rounded-full p-2 transition hover:bg-surface active:scale-95">
            <Heart size={21} />
          </button>

          <button className="relative rounded-full p-2 transition hover:bg-surface active:scale-95">
            <ShoppingBag size={21} />

            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-primary text-[9px] font-bold text-on-primary">
                {cartCount}
              </span>
            )}
          </button>

          <button className="rounded-full p-2 transition hover:bg-surface active:scale-95">
            <User size={21} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-300 md:hidden ${
          mobileMenuOpen
            ? "pointer-events-auto bg-black/40 opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className={`absolute left-0 top-0 h-full w-[280px] bg-background p-6 shadow-2xl transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Menu</h2>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-full p-2 hover:bg-surface"
            >
              <X size={22} />
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm transition ${
                  item.active
                    ? "font-semibold text-primary"
                    : "text-foreground/70 hover:text-foreground"
                }`}
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
