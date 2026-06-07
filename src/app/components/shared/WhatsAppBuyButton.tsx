"use client";

import React from "react";

// Hybrid type matching our combined state structure
export interface CartItemWithDetails {
    slug: string;
    size: string | number;
    quantity: number;
    name: string;
    price: number;
    discountPrice?: number;
}

// 1. Extend React.ButtonHTMLAttributes so the component accepts disabled, className, etc.
interface WhatsAppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    items: CartItemWithDetails[];
    totalPrice: number;
}

export default function WhatsAppBuyButton({ 
    items, 
    totalPrice, 
    className, // Destructure className to combine or override
    disabled,  // Destructure disabled state
    ...props   // Gather any other standard button props passed down
}: WhatsAppButtonProps) {
    const WHATSAPP_NUMBER = "7050001102";
    
    const handleWhatsAppCheckout = (e: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent click if disabled or empty
        if (disabled || items.length === 0) return;

        let message = `*NEW MULTI-ITEM ORDER REQUEST*\n\n`;
        message += `Hello! I would like to purchase the following items from my cart:\n\n`;
        message += `================================\n`;

        items.forEach((item, index) => {
            const activePrice = item.discountPrice || item.price;
            const itemSubtotal = activePrice * (item.quantity || 1);

            message +=
                `\n*Item #${index + 1}:* ${item.name}\n` +
                `Size: UK ${item.size}\n` +
                `Quantity: ${item.quantity || 1}\n` +
                `Rate: ₹${activePrice}\n` +
                `Subtotal: ₹${itemSubtotal}\n` +
                `Product ID: ${item.slug}\n` +
                `--------------------------------\n`;
        });

        message += `\n*GRAND TOTAL:* ₹${totalPrice}\n\n`;
        message += `Please confirm availability and shipping details.`;
        
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    };

    return (
        <button
            {...props} // Spreads any underlying attributes
            onClick={handleWhatsAppCheckout}
            disabled={disabled}
            type="button"
            // Combined your custom styles and added disabled-state handling beautifully here:
            className={`${className} flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none`}
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                <path d="M19.11 17.205c-.372-.186-1.1-.543-1.27-.605-.17-.062-.294-.093-.418.093-.124.186-.48.605-.588.729-.108.124-.217.14-.403.047-.186-.093-.785-.289-1.495-.923-.552-.492-.925-1.1-1.033-1.286-.108-.186-.011-.287.082-.38.084-.083.186-.217.279-.325.093-.108.124-.186.186-.31.062-.124.031-.233-.016-.326-.047-.093-.418-1.007-.573-1.38-.149-.359-.3-.31-.418-.316-.108-.005-.233-.007-.357-.007-.124 0-.326.047-.496.233-.17.186-.651.636-.651 1.55 0 .915.667 1.798.76 1.922.093.124 1.312 2.003 3.181 2.808.445.192.792.306 1.063.392.447.142.854.122 1.176.074.359-.054 1.1-.45 1.255-.884.155-.434.155-.806.108-.884-.046-.077-.17-.124-.356-.217z" />
                <path d="M16.003 3C8.832 3 3 8.832 3 16c0 2.52.737 4.96 2.132 7.061L3.2 29l6.114-1.88A12.944 12.944 0 0 0 16.003 29C23.168 29 29 23.168 29 16S23.168 3 16.003 3zm0 23.667a10.6 10.6 0 0 1-5.403-1.48l-.388-.23-3.628 1.115 1.183-3.536-.252-.403A10.6 10.6 0 0 1 5.333 16c0-5.882 4.787-10.667 10.67-10.667 2.85 0 5.53 1.11 7.547 3.12A10.6 10.6 0 0 1 26.667 16c0 5.883-4.785 10.667-10.664 10.667z" />
            </svg>
            <span>
                {/* Dynamically updates the button text inside the component based on disabled state */}
                {disabled && !items[0]?.size ? "Select a Variant to Checkout" : "Checkout via WhatsApp"}
            </span>
        </button>
    );
}