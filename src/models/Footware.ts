import dbconnect from "@/lib/db";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, index: true }, // e.g., "Urban Stride Sneaker"
		slug: { type: String, required: true, unique: true }, // e.g., "urban-stride-sneaker" (Crucial for SEO)
		description: { type: String, required: true },

		// Categorization based on your breadcrumb pattern
		gender: { type: String, enum: ["Men", "Women", "Unisex", "Kids"], required: true },
		category: { type: String, required: true }, // e.g., "Sneakers", "Loafers"

		price: { type: Number, required: true },
		discountPrice: { type: Number }, // For sales/promotions

		// Images array mapping to your gallery section
		images: [
			{
				url: String,
				altText: String,
				isPrimary: Boolean,
			},
		],

		// CRITICAL for footwear: Stock must be tracked by size
		variants: [
			{
				size: { type: String, required: true }, // e.g., "XL", "L", "M"
				stock: { type: Number, required: true, default: 0, min: 0 },
				sku: { type: String }, // Stock Keeping Unit for inventory
			},
		],

		// Allows the admin to hide products without deleting them
		isActive: { type: Boolean, default: true },
		is_bestseller: { type: Boolean, default: false },
		is_fresh_drop : { type: Boolean, default: false },
	},
	{ timestamps: true },
);

// Text index to support your "search" icon functionality
// productSchema.index({ name: "text", description: "text", category: "text" });

export default mongoose.models.Footware || mongoose.model("Footware", productSchema);
