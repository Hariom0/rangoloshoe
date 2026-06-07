"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Funnel, SearchX } from "lucide-react";
import { useState, useTransition } from "react";

import SideBar from "./SideBar";
import Product from "./Product";
import Pagination from "./Pagination";
import MobileBackButton from "../shared/MoibileBackButton";

/* =========================
   TYPES
========================= */

type ProductType = {
	_id: string;
	name: string;
	price: number;
	discountPrice?: number;
	slug: string;
	images: {
		url: string;
		altText: string;
	}[];
};

type Props = {
	initialProduct: ProductType[];
	initialCategory: string[];
	genders: string[];
	category: string;
	gender: string;
	page: string;
	total: number;
};

/* =========================
   COMPONENT
========================= */

export default function CollectionGrid({ initialProduct, initialCategory, genders, category, gender, page, total }: Props) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [filtersOpen, setFiltersOpen] = useState(false);

	const [isPending, startTransition] = useTransition();

	/* =========================
       QUERY PARAMS
    ========================= */

	function updateQueryParams(key: string, value: string) {
		const params = new URLSearchParams(searchParams);

		if (value) {
			params.set(key, value);
		} else {
			params.delete(key);
		}

		if (key === "category" || key === "gender") {
			params.set("page", "1");
		}

		startTransition(() => {
			router.push(`/collections?${params.toString()}`, { scroll: false });
		});
	}

	function handlePageChange(newPage: number) {
		updateQueryParams("page", String(newPage));
	}

	function clearFilters() {
		startTransition(() => {
			router.push(`/collections`, { scroll: false });
		});
	}

	/* =========================
       UI
    ========================= */

	return (
		<div className="min-h-screen bg-background">
			{/* Added a dynamic title to give the user context */}
			<MobileBackButton title={"All Collections"} href="/" />

			<main className="mx-auto max-w-[1440px] px-4 pb-32 pt-6 md:px-10 md:pb-20">
				<div className="flex gap-12">
					{/* SIDEBAR */}
					<SideBar
						categories={initialCategory}
						genders={genders}
						onCategoryChange={(categoryLabel: string) => updateQueryParams("category", categoryLabel)}
						onGenderChange={(genderLabel: string) => updateQueryParams("gender", genderLabel)}
						filtersOpen={filtersOpen}
						setFiltersOpen={setFiltersOpen}
					/>

					{/* MOBILE FILTER BUTTON */}
					<button
						type="button"
						onClick={() => setFiltersOpen(true)}
						className="fixed bottom-6 right-5 z-50 flex items-center rounded-full bg-primary px-5 py-3.5 text-sm font-bold tracking-wide text-white shadow-xl lg:hidden active:scale-95 transition-transform"
					>
						<Funnel className="inline-block mr-2" size={18} />
						<span>Filter</span>
					</button>

					{/* PRODUCTS AREA */}
					<div className={`flex-1 transition-opacity duration-300 ${isPending ? "opacity-50 pointer-events-none" : "opacity-100"}`}>
						{initialProduct.length > 0 ? (
							<>
								<Product products={initialProduct} />
								<Pagination page={page} total={total} handlePageChange={handlePageChange} />
							</>
						) : (
							/* EMPTY STATE */
							<div className="flex flex-col items-center justify-center py-24 text-center">
								<div className="bg-surface/20 rounded-full p-6 mb-6">
									<SearchX className="h-12 w-12 text-primary" />
								</div>
								<h3 className="font-headline text-2xl md:text-3xl text-foreground mb-3">No products found</h3>
								<p className="text-on-surface-variant max-w-md mb-8">
									We couldn't find any products matching your current filters. Try adjusting your selections or clearing all filters to start over.
								</p>
								<button
									onClick={clearFilters}
									className="rounded-full bg-primary px-8 py-3.5 text-sm font-bold tracking-wide text-white transition-all hover:bg-primary/90 active:scale-[0.98] shadow-md"
								>
									Clear all filters
								</button>
							</div>
						)}
					</div>
				</div>
			</main>
		</div>
	);
}
