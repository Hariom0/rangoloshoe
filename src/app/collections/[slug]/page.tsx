export const dynamic = 'force-dynamic';
import ProductClientView from "@/app/components/collections/ProductClientView";
import { notFound } from "next/navigation";


export interface Product {
    _id: string;
    name: string;
    slug: string;
    description: string;
    gender: string;
    category: string;
    price: number;
    images: Media[]; // Can contain both images and videos
    variants: Variant[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

// --- DATA FETCHING ---
async function getProduct(slug: string): Promise<Product | null> {
    try {
        let base = process.env.NEXT_PUBLIC_BASE_URL
        const res = await fetch(`${base}/api/products/${slug}`, {
            cache: "no-store",
        });

        if (!res.ok) return null;

        const data = await res.json();
        return data.data[0]; // Extracting from the {"product": {...}} wrapper
    } catch (error) {
        console.error("Failed to fetch product:", error);
        return null;
    }
}

// --- SERVER COMPONENT ---
export default async function ProductPage({ params }: Props) {
    const { slug } = await params;
    const product = await getProduct(slug);

    if (!product || !product.isActive) {
        notFound();
    }

    return (
        <div className="min-h-screen ">
            <ProductClientView product={product} />
        </div>
    );
}