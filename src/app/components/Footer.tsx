"use client";

import Link from "next/link";
import {
  Globe,
  Mail,
  MessageCircle,
  Share2,
} from "lucide-react";
import { useEffect, useState } from "react";

type FooterLinkGroup = {
  id: number;
  title: string;
  links: string[];
};

export const Footer = () => {
  const [footerLinks, setFooterLinks] = useState<FooterLinkGroup[]>([]);

  // Simulated API
  useEffect(() => {
    setTimeout(() => {
      setFooterLinks([
        {
          id: 1,
          title: "Shop",
          links: ["Men", "Women", "Kids"],
        },
        {
          id: 2,
          title: "About",
          links: ["Our Story", "Stores"],
        },
        {
          id: 3,
          title: "Help",
          links: ["FAQ", "Returns"],
        },
      ]);
    }, 300);
  }, []);

  return (
    <footer className="bg-black text-white pt-12 md:pt-20">
      
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        
        {/* Mobile Minimal Layout */}
        <div className="md:hidden">
          
          {/* Brand */}
          <div className="flex flex-col items-center text-center">
            
            {/* Logo */}
            <Link
              href="/"
              className="font-headline text-2xl italic text-on-surface"
            >
              Rangoli Shoes
            </Link>

            {/* Description */}
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-on-surface-variant">
              Indian luxury footwear crafted with heritage and modern design.
            </p>

            {/* Icons */}
            <div className="mt-5 flex items-center gap-3">
              
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container text-on-surface-variant transition-all duration-300 hover:bg-primary hover:text-on-primary">
                <Share2 size={16} />
              </button>

              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container text-on-surface-variant transition-all duration-300 hover:bg-primary hover:text-on-primary">
                <Globe size={16} />
              </button>

              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container text-on-surface-variant transition-all duration-300 hover:bg-primary hover:text-on-primary">
                <MessageCircle size={16} />
              </button>

              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container text-on-surface-variant transition-all duration-300 hover:bg-primary hover:text-on-primary">
                <Mail size={16} />
              </button>
            </div>
          </div>

          {/* Compact Links */}
          <div className="mt-8 grid grid-cols-3 gap-6 border-t border-outline-variant/20 pt-6">
            
            {footerLinks.map((group) => (
              <div key={group.id}>
                
                <h4 className="mb-3 font-label text-[10px] font-bold uppercase tracking-[0.14em] text-on-surface">
                  {group.title}
                </h4>

                <ul className="space-y-2.5">
                  
                  {group.links.map((link, index) => (
                    <li key={index}>
                      <Link
                        href="#"
                        className="text-xs text-on-surface-variant transition-colors duration-200 hover:text-primary"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="mt-8 border-t border-outline-variant/20 py-5 text-center">
            <p className="text-[11px] text-on-surface-variant">
              © 2024 Rangoli Shoes
            </p>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-5 md:gap-12">
          
          {/* Brand */}
          <div className="md:col-span-2">
            
            <Link
              href="/"
              className="mb-6 block font-headline text-3xl italic text-on-surface"
            >
              Rangoli Shoes
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-on-surface-variant">
              Crafting Indian luxury footwear since 1984. We believe in the
              power of handmade heritage and modern design thinking.
            </p>

            <div className="mt-8 flex items-center gap-3">
              
              <button className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-container text-on-surface-variant transition-all duration-300 hover:bg-primary hover:text-on-primary">
                <Share2 size={18} />
              </button>

              <button className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-container text-on-surface-variant transition-all duration-300 hover:bg-primary hover:text-on-primary">
                <Globe size={18} />
              </button>
            </div>
          </div>

          {/* Desktop Links */}
          {footerLinks.map((group) => (
            <div key={group.id}>
              
              <h4 className="mb-6 font-label text-xs font-bold uppercase tracking-[0.15em] text-on-surface">
                {group.title}
              </h4>

              <ul className="space-y-3.5">
                
                {group.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="inline-block text-sm text-on-surface-variant transition-all duration-200 hover:translate-x-1 hover:text-primary"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Desktop Bottom */}
        <div className="hidden border-t border-outline-variant/20 py-8 md:mt-16 md:flex md:items-center md:justify-between">
          
          <p className="text-xs text-on-surface-variant">
            © 2024 Rangoli Shoes. Crafted with Heritage.
          </p>

          <div className="flex items-center gap-6">
            
            <Link
              href="#"
              className="flex items-center gap-1.5 text-xs text-on-surface-variant transition-colors duration-200 hover:text-primary"
            >
              <MessageCircle size={15} />
              WhatsApp
            </Link>

            <Link
              href="#"
              className="flex items-center gap-1.5 text-xs text-on-surface-variant transition-colors duration-200 hover:text-primary"
            >
              <Mail size={15} />
              Email Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};