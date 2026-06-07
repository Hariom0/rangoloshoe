// app/collections/page.tsx
export const dynamic = "force-dynamic";

import CollectionGrid from "@/app/components/collections/CollectionGrid";
import { Suspense } from "react";
import ProductSkeleton from "../components/shared/ProductSkeleton";

type Props = {
	searchParams: {
		category?: string;
		page?: string;
		gender?: string;
	};
};

async function getProducts(category: string, page: string, gender: string) {
	let base = process.env.NEXT_PUBLIC_BASE_URL;
	const res = await fetch(`${base}/api/products?page=${page}&category=${category}&gender=${gender}`, {
		cache: "no-store",
	});

	if (!res.ok) {
		throw new Error("Failed to fetch products");
	}

	return res.json();
}

export default async function CollectionPage({ searchParams }: Props) {
	const params = await searchParams;

	const category = params.category || "";
	const gender = params.gender || "";
	const page = params.page || "1";
	const response = await getProducts(category, page, gender);
	const otherCategory = ["Sneakers", "Formal", "Boots", "Sandal", "Sports"];
	const uniqueCategory = [...new Set([...otherCategory, ...response.categories])];

	return (
		<Suspense fallback={<ProductSkeleton />}>
			<CollectionGrid initialProduct={response.products} initialCategory={uniqueCategory} page={page} category={category} total={response.total} genders={response.genders} />;
		</Suspense>
	);
}
