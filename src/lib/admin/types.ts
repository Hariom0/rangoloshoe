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
  isActive?: boolean | string;
  images?: ProductMedia[];
  createdAt?: string;
  updatedAt?: string;
  is_fresh_drop?:boolean | string;
  is_bestseller?:boolean | string;
  list?:any
}

export const GENDERS = ["Men", "Women", "Unisex", "Kids"] as const;
export const CATEGORIES = [
  "Tshirt",
  "Shirt",
  "Jeans",
  "Trousers",
  "Jacket",
  "Ethnic",
 
] as const;
