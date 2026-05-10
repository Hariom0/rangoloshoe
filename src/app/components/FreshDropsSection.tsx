"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  image: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  href?: string;
};

export const FreshDropsSection = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Simulated API Response
  useEffect(() => {
    setTimeout(() => {
      setProducts([
        {
          id: 1,
          title: "Aria Performance Low",
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDSHasW80i5jP9wLOHxrSKRxxisefENRgd2vrH3Sbhzk7WPUisHqCzW3I6llx-vGlA3SSkFD8xucluRyhlDU5-dFSPhUSHEJYW2-Pst1b-f-7GtPnqFmAPl6YW5qh5GvkHWvznBtpZpMD1naAXuySPobiEiFH9065y808RNTq7BOLgbpxPcHfK4aB4c8H1g9hiLkVaKYPXyrdFSQixhYqu3l1I0sIjZHi4SmStZGtT4GfKw-sKtONqLdTg48bbfpwFMhD5SiHRriQ",
          price: "₹7,499",
          originalPrice: "₹8,999",
          discount: "-17%",
        },
        {
          id: 2,
          title: "Legacy Oxford Brogue",
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBrZdl35N9jxqYKuXGZQvQZ49w3XnRLAjIwlSPOw82eHs8DvN9Uv1r6Ae0IU_RMnabhNVRW78CLLHQlKso_Qhdr7Ax9aT_N3HTyBSK6AeNOLPCHb_HRoYuce7hWsvoLEU_poRu5RxRv7ywiWaU6_KF942vcy9B8-1BXTKShKkQyx_NUPIlxNDZV4UqeW64ysVwUw5aXc0htClA5G23ZBLYnI6Ao-SDe-Ehvh860e9OaxPe5KA-Mt99k-bkeEpM4iWyQX7Z9WSO6wA",
          price: "₹12,999",
        },
        {
          id: 3,
          title: "Royal Velvet Jutti",
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBF0sozi4iliaKq9UxHPGznoswq5EbIOfRB5EDmB8_fQoyBNsRXxFLVXyRvVR07JTHNRGjNohL2fAh9i54NwDKC7x587C0rRqJXVz1saY0agW0MW3XwEl_EcA5VeTfTILaQNJUuhVUvYJ6FhKfZmreL1TSND4SESjRrpeX-SF86CDXKzus0Yy3iI40K5EivdeUFvQZQV3bu1uIpWEKbbCpxsVBo3yd3k031vyPh8fXs-yeCUY40N2rJGZDQkP_d9tBckJnbRXf_JA",
          price: "₹5,499",
          originalPrice: "₹6,999",
          discount: "-21%",
        },
        {
          id: 4,
          title: "Urban Pastel Runner",
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBxjECpvfVrgHsoco8-gtCeOo9S-htKeyQVhWxDP6iJoBZWQLSmFyXUQGiEkQRBWUuPcL2u63Q_hJM2lR7De-HaN4R_YCGMA9KCrTDplsDtkhOkLgHEahntIhHo8chWmO-Zmy5GLNxWzqrf9ZnuwHGLBnfQCB98DC0iP49rS6-9NS9YrJo-B3buSJC3zxfZZ2r6167EOWcAGUL7AUtnGiVqGQ2QtaJsMY2ihu8nOnIKtIKcmXpoMTUFercGLOg4i72T4xmHHkA4jw",
          price: "₹6,999",
          href: "/shoe",
        },
      ]);
    }, 400);
  }, []);

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:px-10 md:py-24 lg:py-32">
      
      {/* Header */}
      <div className="mb-10 md:mb-14">
        
        {/* Label */}
        <div className="mb-3 flex items-center gap-2">
          <span className="h-px w-5 bg-primary" />

          <span className="font-label text-[10px] uppercase tracking-[0.22em] text-primary sm:text-[11px]">
            Fresh Drops
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-headline text-3xl italic leading-tight  sm:text-4xl md:text-5xl">
          Just Dropped
        </h2>

        {/* Description */}
        <p className="mt-3 text-sm leading-relaxed sm:text-base">
          The latest silhouettes from our design house
        </p>
      </div>

      {/* Mobile Scroll Cards */}
      <div className="md:hidden">
        <div className="hide-scrollbar flex gap-4 overflow-x-auto pb-2">
          
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[260px]"
            >
              
              {/* Product Card */}
              <div className="group">
                
                {/* Image */}
                <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl bg-surface-container-low">
                  
                  {/* Badge */}
                  <div className="absolute left-4 top-4 z-10 rounded-md bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-on-primary">
                    New
                  </div>

                  {/* Image */}
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Add To Cart */}
                  <button className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-surface-container-lowest/90 backdrop-blur-sm transition-all duration-300 hover:bg-primary hover:text-on-primary">
                    <ShoppingBag size={18} className="text-primary" />
                  </button>
                </div>

                {/* Product Info */}
                <h3 className="mb-1 font-headline text-lg ">
                  {product.title}
                </h3>

                <div className="flex flex-wrap items-center gap-2">
                  
                  <span className="font-bold text-primary">
                    {product.price}
                  </span>

                  {product.originalPrice && (
                    <span className="text-sm text-on-surface-variant/60 line-through">
                      {product.originalPrice}
                    </span>
                  )}

                  {product.discount && (
                    <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                      {product.discount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden grid-cols-2 gap-6 md:grid lg:grid-cols-4 lg:gap-8">
        
        {products.map((product) => {
          const CardWrapper = product.href ? Link : "div";

          return (
            <CardWrapper
              key={product.id}
              href={product.href || ""}
              className="group"
            >
              
              {/* Product Image */}
              <div className="relative mb-5 aspect-square overflow-hidden rounded-2xl bg-surface-container-low">
                
                {/* Badge */}
                <div className="absolute left-4 top-4 z-10 rounded-md bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-on-primary">
                  New
                </div>

                {/* Image */}
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Cart Button */}
                <button className="absolute bottom-4 right-4 translate-y-4 rounded-full bg-surface-container-lowest/90 p-3 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-primary hover:text-on-primary">
                  
                  <ShoppingBag
                    size={20}
                    className="text-primary"
                  />
                </button>
              </div>

              {/* Product Info */}
              <h3 className="mb-1 font-headline text-lg text-on-surface">
                {product.title}
              </h3>

              <div className="flex flex-wrap items-center gap-3">
                
                <span className="font-bold text-primary">
                  {product.price}
                </span>

                {product.originalPrice && (
                  <span className="text-sm text-on-surface-variant/60 line-through">
                    {product.originalPrice}
                  </span>
                )}

                {product.discount && (
                  <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                    {product.discount}
                  </span>
                )}
              </div>
            </CardWrapper>
          );
        })}
      </div>
    </section>
  );
};