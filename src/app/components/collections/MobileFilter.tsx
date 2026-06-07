import { X } from "lucide-react";


function MobileFilter({filtersOpen , setFiltersOpen , genders , sizes}) {
	return (
		<div className={`fixed inset-0 z-[80] bg-black/40 transition-all duration-300 lg:hidden ${filtersOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}>
			<div
				className={`absolute bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto rounded-t-[32px] bg-background p-5 transition-transform duration-300 ${
					filtersOpen ? "translate-y-0" : "translate-y-full"
				}`}
			>
				<div className="mb-8 flex items-center justify-between">
					<h2 className="font-headline text-2xl italic">Filters</h2>

					<button onClick={() => setFiltersOpen(false)} className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-container">
						<X size={20} />
					</button>
				</div>

				{/* FILTER CONTENT */}
				<div className="space-y-10">
					<section>
						<h3 className="mb-5 text-sm font-bold uppercase tracking-wider">Gender</h3>

						<div className="flex flex-wrap gap-3">
							{genders.map((gender) => (
								<button key={gender.id} className={`rounded-full px-5 py-3 text-sm font-medium ${gender.active ? "bg-primary-container " : "border border-outline-variant/30"}`}>
									{gender.label}
								</button>
							))}
						</div>
					</section>

					<section>
						<h3 className="mb-5 text-sm font-bold uppercase tracking-wider">Size</h3>

						<div className="grid grid-cols-4 gap-3">
							{sizes.map((size) => (
								<button key={size.id} className={`aspect-square rounded-2xl ${size.active ? "border border-primary bg-primary/5 font-bold" : "border border-outline-variant/30"}`}>
									{size.value}
								</button>
							))}
						</div>
					</section>
				</div>

				{/* CTA */}
				<div className="sticky bottom-0 mt-10 bg-background pt-4">
					<button className="w-full rounded-2xl bg-primary py-4 font-semibold ">Apply Filters</button>
				</div>
			</div>
		</div>
	);
}

export default MobileFilter;
