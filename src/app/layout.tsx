import type { Metadata } from "next";
import { Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";

const newsreader = Newsreader({
	subsets: ["latin"],
	variable: "--font-newsreader",
	// We include italics and normal styles
	style: ["normal", "italic"],
	// Optional: you can specify weight ranges if you want to limit bundle size,
	// but next/font automatically optimizes this.
});
// 3. Configure Plus Jakarta Sans (Body & Label)
const plusJakarta = Plus_Jakarta_Sans({
	subsets: ["latin"],
	variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
	// 1. Core SEO Titles & Descriptions
	title: "Rangoli Shoes | Premium Heritage Footwear",
	description: "Discover Rangoli Shoes in Sasamusa. Premium handcrafted Indian heritage footwear, traditional leather shoes, and timeless artisan designs crafted since 1984.",

	// 2. High-Value Keyword Targeting (Localized & Brand Specific)
	keywords: [
		"Rangoli Shoes",
		"Sasamusa footwear store",
		"best shoe shop in Sasamusa",
		"premium Indian heritage footwear",
		"handcrafted shoes Bihar",
		"traditional Indian shoes Gopalganj",
		"artisanal leather footwear",
		"heritage shoes since 1984",
		"buy premium mens shoes Sasamusa",
	],

	// 3. Metadata Canonical URLs (Prevents duplicate content tracking issues)
	alternates: {
		canonical: "https://www.rangolishoes.in", // Replace with your production domain
	},

	// 4. OpenGraph Configuration (Controls how links look when shared on WhatsApp/Socials)
	openGraph: {
		title: "Rangoli Shoes | Heritage in Every Step",
		description: "Premium Indian heritage footwear crafted since 1984. Experience timeless artisan luxury, rooted right here in Sasamusa.",
		url: "https://www.rangolishoes.in",
		siteName: "Rangoli Shoes",
		images: [
			{
				url: "/images/og-branding-banner.jpg", // Place a 1200x630px promo banner in your public folder
				width: 1200,
				height: 630,
				alt: "Rangoli Shoes Premium Footwear Showcase Collection",
			},
		],
		locale: "en_IN",
		type: "website",
	},

	// 5. Search Engine Robot Guidelines
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},

	// 6. Favicon & Logo Mappings
	// Drop these asset files straight into your root /app directory or public folder. Next.js maps them automatically.
	icons: {
		icon: [
			{ url: "/images/icon.png", sizes: "any" },
			{ url: "/images/short_icon.png", type: "image/png", sizes: "32x32" },
		],
		shortcut: "/images/short_icon.png",
		apple: [
			{ url: "/images/short_icon.png", sizes: "180x180", type: "image/png" }, // For iPhone home screen pins
		],
	},
};
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${newsreader.variable} ${plusJakarta.variable} h-full`}>
			<link rel="icon" type="image/x-icon" href="/images/short_icon.png"></link>
			<body className="min-h-full flex flex-col antialiased">{children}</body>
			<Analytics />
			<SpeedInsights />
		</html>
	);
}
