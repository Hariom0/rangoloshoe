
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
	return (
		<section className="overflow-hidden ">
			<div className="flex  flex-col md:flex-row">
				{/* Text Content */}
				<div className="flex w-full flex-col justify-center px-6  sm:px-10 md:w-1/2 md:px-16 lg:px-20">
					{/* Top Label */}
					<div className="mb-5 flex items-center gap-2">
						<span className="inline-block h-px w-6 bg-primary" />

						<span className="text-primary text-[11px] uppercase tracking-[0.2em]">Established 1984</span>
					</div>

					{/* Heading */}
					<h1 className=" font-headline mb-8 text-5xl leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
						Step Into <span className="italic text-primary">Style</span>
						,
						<br />
						Step Into Rangoli
					</h1>

					{/* Description */}
					<p className="mb-10 max-w-md text-base leading-relaxed text-foreground/70 sm:text-lg">
						Experience the perfect fusion of artisanal Indian heritage and contemporary silhouettes. Crafted for comfort, designed for life.
					</p>

					{/* Actions */}
					<div className="flex flex-wrap items-center gap-4">
						{/* Primary CTA */}
						<Link
							href="/collections"
							className="rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-on-primary shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-[1.02] hover:opacity-90 active:scale-95 sm:px-10 sm:text-base"
						>
							Shop The Collection
						</Link>

						{/* Secondary CTA */}
						<Link href="/about" className="group flex items-center gap-1.5 text-sm font-medium text-foreground/70 transition-colors duration-300 hover:text-primary">
							Learn More
							<ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
						</Link>
					</div>
				</div>

				{/* Image Section */}
				<div className="relative h-[420px] w-full overflow-hidden hidden md:block md:h-auto md:w-1/2">
					<img
						src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlekyOBs1wR7xPCQg-zsTnHi58CaAO9_P4-T6clSEbMnFZqB1y-ox6Om1v1SbgvbMJzGv2nz_6N8L8lxQdjJD0p5Kg3seM064-Ov9sTZlA92JIvBTHESlPRRRGUn5n8UpNUM5pojpGMN4VXnQ94fj6tvldKOrErEtxAdA5eHE6STlLG3OpIJ5qEtku-pLb1WGhQL29UEP_Jghois5NoVTq228VOwoJjJofyiEQoMuyMb9Uj0P49-JaaGajQ2nqrF-NYuho6OGfUQ"
						alt="Premium handcrafted leather footwear"
						className="h-full w-full object-cover"
					/>

					{/* Overlay */}
					<div className="pointer-events-none absolute inset-0 hidden bg-linear-to-r from-background/30 via-transparent to-transparent md:block" />
				</div>
			</div>
		</section>
	);
};
