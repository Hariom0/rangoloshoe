export interface Variant {
  size: number | string;
  stock: number;
  sku: string;
}

export interface ProductMedia {
  url: string;
  altText?: string;
  isPrimary?: boolean;
  type?: string;
}

export interface Product {
  _id?: string;
  id?: string;
  name: string;
  slug: string;
  description?: string;
  gender?: string;
  category?: string;
  price: number;
  discountPrice?: number;
  variants?: Variant[];
  media?: ProductMedia[];
  images?: ProductMedia[];
  createdAt?: string;
  updatedAt?: string;
}

export const GENDERS = ["Men", "Women", "Unisex", "Kids"] as const;
export const CATEGORIES = [
  "Sneakers",
  "Boots",
  "Crocs",
  "FlipFlops",
  "Slides",
  "Sandals",
  "Loafers",
  "Heels",
  "Flats",
  "Sports",
  "Formal",
  
] as const;
