import { ArrowLeft, ChevronDown, Filter } from "lucide-react";


export default function CollectionHeader({setFiltersOpen}) {
	return (
		<>
			{" "}
			{/* MOBILE APP HEADER */}
			<header className="sticky top-0 z-50 border-b border-outline-variant/20 bg-background/90 backdrop-blur-xl md:hidden">
				<div className="flex items-center justify-between px-4 py-4">
					<button className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-container">
						<ArrowLeft size={20} />
					</button>

					<div className="text-center">
						<h1 className="font-headline text-lg italic ">All Footwear</h1>

						<p className="text-[11px] -variant">156 Products</p>
					</div>

					<button onClick={() => setFiltersOpen(true)} className="flex h-11 w-11 items-center justify-center rounded-full bg-primary ">
						<Filter size={18} />
					</button>
				</div>

				{/* BREADCRUMB */}
				<div className="flex items-center gap-1 px-4 pb-3 text-[11px] uppercase tracking-[0.14em] -variant">
					<span>Home</span>

					<span>/</span>

					<span className="text-primary">Shop</span>
				</div>
			</header>
			{/* DESKTOP HEADER */}
			<div className="mx-auto hidden max-w-[1440px] px-10 pt-12 md:block">
				<div className="mb-12">
					<nav className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] -variant/70">
						<a href="#">Home</a>

						<span>/</span>

						<span>Shop</span>
					</nav>

					<div className="flex items-end justify-between gap-6">
						<div>
							<h1 className="font-headline text-5xl italic ">All Footwear</h1>

							<p className="mt-2 font-medium -variant">Showing 156 results</p>
						</div>

						<div className="relative">
							<select className="appearance-none rounded-xl bg-surface-container-high px-6 py-3 pr-12 font-medium  outline-none">
								<option>Sort by: Relevance</option>

								<option>Price: Low to High</option>

								<option>Price: High to Low</option>

								<option>New Arrivals</option>
							</select>

							<ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
