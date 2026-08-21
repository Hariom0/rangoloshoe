"use client";

import React, { useState, useMemo } from "react";
import { X, Truck, CheckCircle2, CreditCard, User, MapPin, Phone, Mail, FileText, AlertCircle } from "lucide-react";

export interface CartItemWithDetails {
	slug: string;
	size: string | number;
	quantity: number;
	name: string;
	price: number;
	discountPrice?: number;
}

interface WhatsAppBuyButtonProps {
	items: CartItemWithDetails[];
	totalprice: number; // Backwards compatible fallback, but we recalculate dynamically from items subtotal
	className?: string;
	disabled?: boolean;
}

export default function WhatsAppBuyButton({ items = [], className = "", disabled = false, ...props }: any) {
	const WHATSAPP_NUMBER = "9934745626";

	// UI Drawer Toggle State
	const [isOpen, setIsOpen] = useState(false);
	const INDIAN_STATES_UTS = [
		// States (28)
		"Andhra Pradesh",
		"Arunachal Pradesh",
		"Assam",
		"Bihar",
		"Chhattisgarh",
		"Goa",
		"Gujarat",
		"Haryana",
		"Himachal Pradesh",
		"Jharkhand",
		"Karnataka",
		"Kerala",
		"Madhya Pradesh",
		"Maharashtra",
		"Manipur",
		"Meghalaya",
		"Mizoram",
		"Nagaland",
		"Odisha",
		"Punjab",
		"Rajasthan",
		"Sikkim",
		"Tamil Nadu",
		"Telangana",
		"Tripura",
		"Uttar Pradesh",
		"Uttarakhand",
		"West Bengal",

		// Union Territories (8)
		"Chandigarh",
		"Delhi (NCT)",
		"Jammu and Kashmir",
		"Ladakh",
		"Lakshadweep",
		"Puducherry",
	];
	// Checkout Form States
	const [paymentMethod, setPaymentMethod] = useState<"cod" | "prepaid">("cod");
	const [shipToDifferent, setShipToDifferent] = useState(false);

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		companyName: "",
		country: "India",
		addressLine1: "",
		addressLine2: "",
		city: "",
		state: "Gujarat",
		pinCode: "",
		phone: "",
		email: "",
		orderNotes: "",
	});

	const [errors, setErrors] = useState<Record<string, string>>({});

	/* ==========================================================================
       DYNAMIC PRICE CALCULATIONS
       ========================================================================== */
	const totals = useMemo(() => {
		const subtotal = items.reduce((acc:any, item:any) => {
			const activePrice = item.discountPrice || item.price;
			return acc + activePrice * (item.quantity || 1);
		}, 0);

		// Free shipping condition over ₹1499 total order threshold
		const isFreeShipping = subtotal >= 1499;
		const baseShippingFee = paymentMethod === "cod" ? 149 : 89;
		const shippingFee = isFreeShipping ? 0 : baseShippingFee;
		const grandTotal = subtotal + shippingFee;

		return { subtotal, shippingFee, grandTotal, isFreeShipping };
	}, [items, paymentMethod]);

	/* ==========================================================================
       FORM VALIDATION ENGINE
       ========================================================================== */
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const validateForm = () => {
		const tempErrors: Record<string, string> = {};

		if (!formData.firstName.trim()) tempErrors.firstName = "First name is required";
		if (!formData.lastName.trim()) tempErrors.lastName = "Last name is required";
		if (!formData.addressLine1.trim()) tempErrors.addressLine1 = "Street address is required";
		if (!formData.city.trim()) tempErrors.city = "Town or city is required";
		if (!formData.pinCode.trim()) {
			tempErrors.pinCode = "PIN code is required";
		} else if (!/^\d{6}$/.test(formData.pinCode.trim())) {
			tempErrors.pinCode = "Enter a valid 6-digit PIN code";
		}

		if (!formData.phone.trim()) {
			tempErrors.phone = "Phone number is required";
		} else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
			tempErrors.phone = "Enter a valid 10-digit mobile number";
		}

		if (!formData.email.trim()) {
			tempErrors.email = "Email address is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			tempErrors.email = "Enter a valid email address";
		}

		setErrors(tempErrors);
		return Object.keys(tempErrors).length === 0;
	};

	/* ==========================================================================
       WHATSAPP MESSAGE DISPATCH GENERATOR
       ========================================================================== */
	const handleFinalOrderSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateForm()) {
			// Scroll form to top view if validation checks catch an issue
			const modalContainer = document.getElementById("checkout-scroll-container");
			if (modalContainer) modalContainer.scrollTop = 0;
			return;
		}

		let message = `RANGOLI SHOES - NEW ORDER REQUEST\n`;
		message += `====================================\n\n`;

		message += `ORDER SUMMARY\n`;
		message += `------------------------------------\n`;

		items.forEach((item:any, index:any) => {
			const activePrice = item.discountPrice || item.price;
			const quantity = item.quantity || 1;

			message += `${index + 1}. ${item.name}\n`;
			message += `   Size      :  ${item.size}\n`;
			message += `   Quantity  : ${quantity}\n`;
			message += `   Unit Price: ₹${activePrice.toLocaleString("en-IN")}\n`;
			message += `   Amount    : ₹${(activePrice * quantity).toLocaleString("en-IN")}\n`;
			message += `   Product ID: ${item.slug}\n\n`;
		});

		message += `PAYMENT & BILLING\n`;
		message += `------------------------------------\n`;
		message += `Subtotal      : ₹${totals.subtotal.toLocaleString("en-IN")}\n`;
		message += `Shipping Fee  : ${totals.shippingFee === 0 ? "FREE" : `₹${totals.shippingFee.toLocaleString("en-IN")}`}\n`;
		message += `Payment Method: ${paymentMethod.toUpperCase()}\n`;
		message += `Grand Total   : ₹${totals.grandTotal.toLocaleString("en-IN")}\n\n`;

		message += `CUSTOMER DETAILS\n`;
		message += `------------------------------------\n`;
		message += `Name  : ${formData.firstName} ${formData.lastName}\n`;
		message += `Phone : ${formData.phone}\n`;
		message += `Email : ${formData.email}\n`;

		if (formData.companyName) {
			message += `Company: ${formData.companyName}\n`;
		}

		message += `\nDELIVERY ADDRESS\n`;
		message += `------------------------------------\n`;
		message += `${formData.addressLine1}\n`;

		if (formData.addressLine2) {
			message += `${formData.addressLine2}\n`;
		}

		message += `${formData.city}, ${formData.state}\n`;
		message += `${formData.pinCode}\n`;
		message += `${formData.country}\n`;

		if (shipToDifferent) {
			message += `\nSpecial Request: Deliver to alternate shipping address.\n`;
		}

		if (formData.orderNotes?.trim()) {
			message += `\nCUSTOMER NOTES\n`;
			message += `------------------------------------\n`;
			message += `${formData.orderNotes}\n`;
		}

		message += `\n====================================\n`;
		message += `Please confirm product availability, expected dispatch date, and payment instructions.`;

		const encodedMessage = encodeURIComponent(message);
		const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

		window.open(whatsappUrl, "_blank", "noopener,noreferrer");
	};

	return (
		<>
			{/* Primary Action Button Trigger */}
			<button
				{...props}
				type="button"
				onClick={() => !disabled && items.length > 0 && setIsOpen(true)}
				disabled={disabled || items.length === 0}
				className={`${className} flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed`}
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
					<path d="M19.11 17.205c-.372-.186-1.1-.543-1.27-.605-.17-.062-.294-.093-.418.093-.124.186-.48.605-.588.729-.108.124-.217.14-.403.047-.186-.093-.785-.289-1.495-.923-.552-.492-.925-1.1-1.033-1.286-.108-.186-.011-.287.082-.38.084-.083.186-.217.279-.325.093-.108.124-.186.186-.31.062-.124.031-.233-.016-.326-.047-.093-.418-1.007-.573-1.38-.149-.359-.3-.31-.418-.316-.108-.005-.233-.007-.357-.007-.124 0-.326.047-.496.233-.17.186-.651.636-.651 1.55 0 .915.667 1.798.76 1.922.093.124 1.312 2.003 3.181 2.808.445.192.792.306 1.063.392.447.142.854.122 1.176.074.359-.054 1.1-.45 1.255-.884.155-.434.155-.806.108-.884-.046-.077-.17-.124-.356-.217z" />
					<path d="M16.003 3C8.832 3 3 8.832 3 16c0 2.52.737 4.96 2.132 7.061L3.2 29l6.114-1.88A12.944 12.944 0 0 0 16.003 29C23.168 29 29 23.168 29 16S23.168 3 16.003 3zm0 23.667a10.6 10.6 0 0 1-5.403-1.48l-.388-.23-3.628 1.115 1.183-3.536-.252-.403A10.6 10.6 0 0 1 5.333 16c0-5.882 4.787-10.667 10.67-10.667 2.85 0 5.53 1.11 7.547 3.12A10.6 10.6 0 0 1 26.667 16c0 5.883-4.785 10.667-10.664 10.667z" />
				</svg>
				<span>{disabled ? "Select a Variant to Checkout" : "Checkout via WhatsApp"}</span>
			</button>

			{
				/* ==========================================================================
               DRAWER SURFACE MODAL LAYOUT
               ========================================================================== */
				isOpen && (
					<div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity duration-300">
						{/* Backdrop Click Dismiss */}
						<div className="absolute inset-0" onClick={() => setIsOpen(false)} />

						{/* Sliding Panel Window */}
						<div className="relative w-full max-w-lg h-full bg-neutral-50 shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
							{/* Header Box */}
							<div className="sticky top-0 bg-white border-b border-neutral-200 px-5 py-4 flex items-center justify-between z-20">
								<div>
									<h2 className="font-serif italic text-xl font-semibold text-neutral-900">Secure Order Verification</h2>
									<p className="text-[11px] text-neutral-500 uppercase tracking-wider font-medium">Verify Shipping & Complete to WhatsApp</p>
								</div>
								<button onClick={() => setIsOpen(false)} className="p-1 rounded-full text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors">
									<X className="w-5 h-5" />
								</button>
							</div>

							{/* Interactive Form Content Area */}
							<form onSubmit={handleFinalOrderSubmit} id="checkout-scroll-container" className="flex-1 overflow-y-auto px-5 py-6 space-y-6 text-neutral-800">
								{/* Section 1: Billing Form Profile */}
								<div className="space-y-4">
									<div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
										<User className="w-4 h-4 text-primary" />
										<h3 className="text-xs uppercase font-bold tracking-widest text-neutral-900">Billing Details</h3>
									</div>

									<div className="grid grid-cols-2 gap-3">
										<div className="space-y-1">
											<label className="text-xs font-semibold text-neutral-700">First Name *</label>
											<input
												type="text"
												name="firstName"
												value={formData.firstName}
												onChange={handleInputChange}
												className={`w-full h-11 px-3 border rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-primary ${errors.firstName ? "border-red-500" : "border-neutral-200"}`}
											/>
											{errors.firstName && (
												<span className="text-[11px] font-medium text-red-500 flex items-center gap-1">
													<AlertCircle className="w-3 h-3" /> {errors.firstName}
												</span>
											)}
										</div>
										<div className="space-y-1">
											<label className="text-xs font-semibold text-neutral-700">Last Name *</label>
											<input
												type="text"
												name="lastName"
												value={formData.lastName}
												onChange={handleInputChange}
												className={`w-full h-11 px-3 border rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-primary ${errors.lastName ? "border-red-500" : "border-neutral-200"}`}
											/>
											{errors.lastName && (
												<span className="text-[11px] font-medium text-red-500 flex items-center gap-1">
													<AlertCircle className="w-3 h-3" /> {errors.lastName}
												</span>
											)}
										</div>
									</div>

									<div className="space-y-1">
										<label className="text-xs font-semibold text-neutral-700">
											Company Name <span className="text-neutral-400 font-normal">(Optional)</span>
										</label>
										<input
											type="text"
											name="companyName"
											value={formData.companyName}
											onChange={handleInputChange}
											className="w-full h-11 px-3 border border-neutral-200 rounded-lg text-sm bg-white focus:outline-none"
										/>
									</div>

									<div className="space-y-1">
										<label className="text-xs font-semibold text-neutral-700">Country / Region *</label>
										<select
											name="country"
											value={formData.country}
											onChange={handleInputChange}
											className="w-full h-11 px-3 border border-neutral-200 rounded-lg text-sm bg-neutral-100 text-neutral-600 font-medium"
											disabled
										>
											<option value="India">India</option>
										</select>
									</div>
								</div>

								{/* Section 2: Physical Address Group */}
								<div className="space-y-4">
									<div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
										<MapPin className="w-4 h-4 text-primary" />
										<h3 className="text-xs uppercase font-bold tracking-widest text-neutral-900">Street Address</h3>
									</div>

									<div className="space-y-2">
										<label className="text-xs font-semibold text-neutral-700">Address Lines *</label>
										<input
											type="text"
											name="addressLine1"
											placeholder="House number and street name"
											value={formData.addressLine1}
											onChange={handleInputChange}
											className={`w-full h-11 px-3 border rounded-lg text-sm bg-white focus:outline-none ${errors.addressLine1 ? "border-red-500" : "border-neutral-200"}`}
										/>
										<input
											type="text"
											name="addressLine2"
											placeholder="Apartment, suite, unit, etc. (optional)"
											value={formData.addressLine2}
											onChange={handleInputChange}
											className="w-full h-11 px-3 border border-neutral-200 rounded-lg text-sm bg-white focus:outline-none"
										/>
										{errors.addressLine1 && (
											<span className="text-[11px] font-medium text-red-500 flex items-center gap-1">
												<AlertCircle className="w-3 h-3" /> {errors.addressLine1}
											</span>
										)}
									</div>

									<div className="grid grid-cols-2 gap-3">
										<div className="space-y-1">
											<label className="text-xs font-semibold text-neutral-700">Town / City *</label>
											<input
												type="text"
												name="city"
												value={formData.city}
												onChange={handleInputChange}
												className={`w-full h-11 px-3 border rounded-lg text-sm bg-white focus:outline-none ${errors.city ? "border-red-500" : "border-neutral-200"}`}
											/>
											{errors.city && (
												<span className="text-[11px] font-medium text-red-500 flex items-center gap-1">
													<AlertCircle className="w-3 h-3" /> {errors.city}
												</span>
											)}
										</div>
										<div className="space-y-1">
											<label htmlFor="state" className="text-xs sm:text-sm font-semibold text-neutral-700">
												State / Union Territory *
											</label>

											<select
												id="state"
												name="state"
												value={formData.state}
												onChange={handleInputChange}
												required
												className="
			w-full
			h-11 sm:h-12
			px-3
			border border-neutral-200
			rounded-lg
			text-sm
			bg-white
			focus:outline-none
			focus:ring-2
			focus:ring-neutral-900/10
			focus:border-neutral-400
		"
											>
												<option value="">Select State </option>

												{INDIAN_STATES_UTS.map((state) => (
													<option key={state} value={state}>
														{state}
													</option>
												))}
											</select>
										</div>
									</div>

									<div className="space-y-1">
										<label className="text-xs font-semibold text-neutral-700">PIN Code *</label>
										<input
											type="text"
											name="pinCode"
											maxLength={6}
											placeholder="6-digit postal code"
											value={formData.pinCode}
											onChange={handleInputChange}
											className={`w-full h-11 px-3 border rounded-lg text-sm bg-white focus:outline-none ${errors.pinCode ? "border-red-500" : "border-neutral-200"}`}
										/>
										{errors.pinCode && (
											<span className="text-[11px] font-medium text-red-500 flex items-center gap-1">
												<AlertCircle className="w-3 h-3" /> {errors.pinCode}
											</span>
										)}
									</div>
								</div>

								{/* Section 3: Communication Contact Fields */}
								<div className="space-y-4">
									<div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
										<Phone className="w-4 h-4 text-primary" />
										<h3 className="text-xs uppercase font-bold tracking-widest text-neutral-900">Contact Channels</h3>
									</div>

									<div className="space-y-1">
										<label className="text-xs font-semibold text-neutral-700">Phone Mobile Number *</label>
										<input
											type="tel"
											name="phone"
											maxLength={10}
											placeholder="10-digit primary number"
											value={formData.phone}
											onChange={handleInputChange}
											className={`w-full h-11 px-3 border rounded-lg text-sm bg-white focus:outline-none ${errors.phone ? "border-red-500" : "border-neutral-200"}`}
										/>
										{errors.phone && (
											<span className="text-[11px] font-medium text-red-500 flex items-center gap-1">
												<AlertCircle className="w-3 h-3" /> {errors.phone}
											</span>
										)}
									</div>

									<div className="space-y-1">
										<label className="text-xs font-semibold text-neutral-700">Email Address *</label>
										<input
											type="email"
											name="email"
											placeholder="name@domain.com"
											value={formData.email}
											onChange={handleInputChange}
											className={`w-full h-11 px-3 border rounded-lg text-sm bg-white focus:outline-none ${errors.email ? "border-red-500" : "border-neutral-200"}`}
										/>
										{errors.email && (
											<span className="text-[11px] font-medium text-red-500 flex items-center gap-1">
												<AlertCircle className="w-3 h-3" /> {errors.email}
											</span>
										)}
									</div>

									<div className="space-y-1">
										<label className="text-xs font-semibold text-neutral-700">
											Order Notes <span className="text-neutral-400 font-normal">(Optional)</span>
										</label>
										<textarea
											name="orderNotes"
											rows={3}
											placeholder="Special delivery instructions, apartment drop box directions, etc."
											value={formData.orderNotes}
											onChange={handleInputChange}
											className="w-full p-3 border border-neutral-200 rounded-lg text-sm bg-white focus:outline-none resize-none"
										/>
									</div>
								</div>

								{/* Section 4: Strategic Payment Mode Select Box */}
								<div className="space-y-3">
									<div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
										<CreditCard className="w-4 h-4 text-primary" />
										<h3 className="text-xs uppercase font-bold tracking-widest text-neutral-900">Payment Option</h3>
									</div>

									<div className="grid grid-cols-2 gap-3">
										{/* COD Selector */}
										<div
											onClick={() => setPaymentMethod("cod")}
											className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${paymentMethod === "cod" ? "border-primary bg-white shadow-sm" : "border-neutral-200 opacity-70 bg-neutral-50"}`}
										>
											<div className="flex items-center justify-between">
												<span className="text-sm font-bold text-neutral-900">Cash on Delivery</span>
												<div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === "cod" ? "border-primary bg-primary" : "border-neutral-300"}`}>
													{paymentMethod === "cod" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
												</div>
											</div>
											<p className="text-[10px] text-neutral-500 mt-2">Pay with cash upon delivery package handoff. Fee: ₹149</p>
										</div>

										{/* Prepaid Selector */}
										<div
											onClick={() => setPaymentMethod("prepaid")}
											className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${paymentMethod === "prepaid" ? "border-primary bg-white shadow-sm" : "border-neutral-200 opacity-70 bg-neutral-50"}`}
										>
											<div className="flex items-center justify-between">
												<span className="text-sm font-bold text-neutral-900">Prepaid Checkout</span>
												<div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === "prepaid" ? "border-primary bg-primary" : "border-neutral-300"}`}>
													{paymentMethod === "prepaid" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
												</div>
											</div>
											<p className="text-[10px] text-neutral-500 mt-2">Instant UPI payment validation processing. Fee: ₹89</p>
										</div>
									</div>
								</div>

								{/* Dynamic Interactive UPI QR Code Interface Block */}
								{paymentMethod === "prepaid" && (
									<div className="bg-neutral-900 text-white rounded-xl p-5 space-y-4 shadow-inner border border-neutral-800 animate-in fade-in zoom-in-95 duration-200">
										<div className="flex items-start gap-3">
											<div className="p-2 bg-neutral-800 rounded-lg text-emerald-400">
												<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"
													/>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M16.875 15.75a1.125 1.125 0 0 1-1.125-1.125v-1.5a1.125 1.125 0 0 1 1.125-1.125h1.5a1.125 1.125 0 0 1 1.125 1.125v1.5a1.125 1.125 0 0 1-1.125 1.125h-1.5ZM13.5 18.75c0-.621.504-1.125 1.125-1.125h1.5a1.125 1.125 0 0 1 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5Z"
													/>
												</svg>
											</div>
											<div className="space-y-1">
												<h4 className="text-sm font-bold tracking-wide">Scan & Pay securely via UPI</h4>
												<p className="text-xs text-neutral-400 leading-relaxed">Scan using Google Pay, PhonePe, Paytm, or any banking app to clear your transaction balance instantly.</p>
											</div>
										</div>

										<div className="flex flex-col sm:flex-row items-center gap-5 bg-neutral-800/50 p-4 rounded-xl border border-neutral-800">
											{/* Dynamic Generated QR Surface */}
											<div className="bg-white p-2.5 rounded-lg shadow-md shrink-0 border border-neutral-700">
												<img
													src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&margin=0&data=${encodeURIComponent(
														`upi://pay?pa=9934745626@pthdfc&pn=Rangoli%20Shoes&am=${totals.grandTotal}&cu=INR&tn=Rangoli%20Order`,
													)}`}
													alt="UPI Payment QR Code"
													width={140}
													height={140}
													className="block select-none pointer-events-none"
													loading="lazy"
												/>
											</div>

											{/* Instruction Callout */}
											<div className="space-y-2 text-center sm:text-left">
												<div className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
													Required Action
												</div>
												<p className="text-xs font-semibold text-neutral-200 leading-normal">
													Please make the payment and <span className="text-emerald-400 font-bold">share the screenshot on WhatsApp</span> along with your order for shipping & tracking details.
												</p>
												<p className="text-[10px] text-neutral-500 italic">Amount encrypted in QR: ₹{totals.grandTotal.toLocaleString("en-IN")}</p>
											</div>
										</div>
									</div>
								)}
								{paymentMethod === "prepaid" && <div>Qrcode with message</div>}
								{/* Section 5: Realtime Summary Invoice Display */}
								<div className="bg-white border border-neutral-200 rounded-xl p-4 space-y-3 shadow-xs">
									<div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-2">
										<FileText className="w-3.5 h-3.5 text-neutral-400" />
										<span>Live Calculation Summary</span>
									</div>
									<div className="text-sm space-y-1.5 font-medium text-neutral-600">
										<div className="flex justify-between">
											<span>Items Subtotal:</span>
											<span className="text-neutral-900">₹{totals.subtotal.toLocaleString("en-IN")}</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="flex items-center gap-1">
												Shipment ({paymentMethod.toUpperCase()}):
												{totals.isFreeShipping && <span className="text-[9px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-sm border border-emerald-200 font-bold">PROMO</span>}
											</span>
											<span className={totals.isFreeShipping ? "text-emerald-600 font-bold" : "text-neutral-900"}>{totals.isFreeShipping ? "FREE" : `+ ₹${totals.shippingFee}`}</span>
										</div>

										{!totals.isFreeShipping && (
											<div className="bg-amber-50 border border-amber-100 rounded p-2 text-[11px] text-amber-800 flex items-center gap-1.5 font-normal">
												<Truck className="w-3.5 h-3.5 shrink-0" />
												<span>
													Add <b>₹{(1499 - totals.subtotal).toLocaleString("en-IN")}</b> more to unlock <b>FREE SHIPPING!</b>
												</span>
											</div>
										)}

										<div className="border-t border-neutral-100 pt-2 flex justify-between text-base font-bold text-neutral-900">
											<span>Total Final Due:</span>
											<span className="text-primary text-lg">₹{totals.grandTotal.toLocaleString("en-IN")}</span>
										</div>
									</div>
								</div>

								{/* Privacy Policy Disclaimer Copy */}
								<p className="text-[10px] text-neutral-400 leading-normal text-center pt-2">
									Your personal transaction data will be securely processed to sync your tracking profile, support fulfillment logistics throughout your lifecycle, and verify WhatsApp checkout
									channels.
								</p>
							</form>

							{/* Sticky Action Footer Dispatch Bar */}
							<div className="sticky bottom-0 bg-white border-t border-neutral-200 px-5 py-4 z-20 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
								<button
									type="submit"
									form="checkout-scroll-container"
									className="w-full h-12 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-primary/95 transition-all active:scale-[0.99] shadow-md shadow-primary/10"
								>
									<CheckCircle2 className="w-4 h-4 text-white" />
									<span>Place Order via WhatsApp · ₹{totals.grandTotal.toLocaleString("en-IN")}</span>
								</button>
							</div>
						</div>
					</div>
				)
			}
		</>
	);
}
