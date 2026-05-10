"use client";

import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

type BestsellerProduct = {
	id: number;
	title: string;
	price: string;
	image: string;
};

export const BestSellersSection = () => {
	const [products, setProducts] = useState<BestsellerProduct[]>([]);

	// Simulated API Response
	useEffect(() => {
		setTimeout(() => {
			setProducts([
				{
					id: 1,
					title: "The Chelsea Classic",
					price: "₹45,999",
					image:
						"https://lh3.googleusercontent.com/aida-public/AB6AXuCKiPPBXZWZOn74tDZ-if62LBq3_EJpUjCCah-PbWLDFxjxtpUvyud05Klc6CPZbIA8uwRfzKEi3Gz6FSIVoVKZHuDl8lxFuTKYVP64nDn7bqkBiJL54Izc3xg7JHLtfRK3oDfbpDFm5I0fLIyyVWhWWfN764z62iIqPj2YdCqEB_idD1x_jr0UYkqP3-Y1RkUfbudyhW836BYiTJKkTI2ZCpR0m-L_TnFQfdhRdyJU1xNDfJWk5oZU_eDq3MEfWQSlddwRQVNM0tun",
				},
				{
					id: 2,
					title: "Heritage Loafer",
					price: "₹34,999",
					image:
						"https://lh3.googleusercontent.com/aida-public/AB6AXuB6yixM9fEjAh7S7K4j_w_5LYFGQXqsHZ3fpU6-2ysKHY6BLDB-kntvuAiB0Fe6jNyYGV8DaOuG-sUsgoJBen2wDaphBR3WiDHD5-MNThy198bkn-1hOLDNT-FmDpwq5CsnDwq1axk73jeZbCuMJB9CabIE1HUid0PuJoCoOjPnahYeaTSB_3qLEsj9-cIgv3vWCAezeJloDX18ktWDjOWXfZge-KBTRBEY7s4aAzpKRHuGA7Ew1MBd_9l4obMWTl1c9RV_c96kDuot",
				},
				{
					id: 3,
					title: "Monarch Wingtip",
					price: "₹49,999",
					image:
						"https://lh3.googleusercontent.com/aida-public/AB6AXuA7Rqr0k6SrT1GN4bkhDqPP4E3GlSDRPeqqrS4IL3kqVHPYkje5Or52dq2zOnChBbqivcA5_xHbMs4xeHjdx_a_N4xyG1BDsj4Hq2pxDkTxGwm9PjO3LijzL-nu0UgnNUVsnvS6IePRyCy5TOZ31WtKFIwJZkrllT-PDWNQt_IQ_y9MQvi1Kj7p2eJOOWrduTzOH5AiPxQgTHLQ9V53DFWH2ThaT9G5NUv7Isd8LkFStL4me8Zhn_oDPHJYOdsOXsszzPjOwD4joa-U",
				},
				{
					id: 4,
					title: "Terra Suede Runner",
					price: "₹32,999",
					image:
						"https://lh3.googleusercontent.com/aida-public/AB6AXuBO07E5TZTSrxW927sn6vL1Wk2FsoTlUJKV1RKCKCp4i7LSXvWNIIuP-ztwigz45NesQa1yNuLMNn01l4Avz52pYIvqDx3HRHQew8hZd1MyQfA3NjXyXjuoaDy8kITBxq7xoAPlWfPKX3tQUrLtXlR5sGMw45Pfx_MGHjsjYBreBsCC1cRtP6hBKnRnJ5hvimZGxdNcNWPp5SxWitPX0K9gbJlkoY2Fuhu82H1F1qjNRkHwLkt2jSlxazGFlOAYvKrAsaHdt7kppstj",
				},
				{
					id: 5,
					title: "Nocturne Slippers",
					price: "₹39,499",
					image:
						"https://lh3.googleusercontent.com/aida-public/AB6AXuC0wt6X1svdxGgclM9JpDVuhzHyOugNvCuNuMPOnEGgUogujuAlgT91_Av6hXpodfRu_Gt1yruLg52BWUC6H2rDy5J15IfjG-6VxfSc2xbmVF2JLFZ9tnyHjItI3au6_NgSAuFkEa7VaTU5zZRokzFeLtUqLAj00OAum_BLn7f_MtW0Wcz_H7ww0aPZlwTTiDLquHyim_9KxR6e5-gk7B0geTBrokrZrFrOAtrhVexUO7Nvu0rm-TmrpdkEuLFZupSXER6SA_oWIjCn",
				},
				{
					id: 6,
					title: "Summit Explorer",
					price: "₹56,499",
					image:
						"https://lh3.googleusercontent.com/aida-public/AB6AXuCOsao-JM-Bu_zyCGbrosZE24Dqy-Iy8mWun5c-b-1KNuf-f21yzO9n8ZDI2fI4YC4bYBNYSYGzunewGAY0AuvsNyDgSgco36x6xKEE6n9YwUCq0zYaLAb4bArXzw8XgwFyQvlpPGfZHlNKM2wL0murq9zjOsnNPPcX3XQdC4rXg5ij73fdxKbQ6NBdXMo_3_IyfvfuJie9PSzAfs8wYYboKkhy8aY5txaptzCeJisULMpwSxXinjkxvRkn8zjfnZWtKSa1EUHol8qq",
				},
				{
					id: 7,
					title: "Ignite Performance",
					price: "₹28,499",
					image:
						"https://lh3.googleusercontent.com/aida-public/AB6AXuAXoNQcudGkhU5OQbss6PgoKXlWkfEIFGoGe5ose9XHFyktoZpAKZaO6WhpZVUWRPLOY1mRwtPxbni7uMYxtwGraSD3LnuRjtYQMuN6W4U_MVhqVgiUWNX4CygKrP4opLgzNHnY2c549pOTDO2KhrHyDIs1jLbHNNhNe8t1x8BKyNS-xr9bApoJX146XuppmMXbGwyGG1bf6M1Uv19zMsKtBGP83o8H2P3Fxf4kBjW2cdPgd8cVt0bdEpK47l6K8VVTcr4VCl1gN_Nk",
				},
				{
					id: 8,
					title: "Shadow Chelsea",
					price: "₹48,999",
					image:
						"https://lh3.googleusercontent.com/aida-public/AB6AXuCkxzvZxeKlRJQ-wMN4DdSQLIpEY-ZYGuE--pb5GMbBo1Wtpj1mjRTlJK2acyrQE2Yv2xuZS9jIEGlqf3W2y-g4pcEyNSyIlZm0jKsjR13nNY0q70vugTz0Vds2_F8sq3NtQ3jY9SLbEbg6RPBj29ZsC-ZSHq2bwh6YAB3hj2domVXH696wf-klc-7bbuAIVrdzrXBqo-IztTkr0Wv1Jxoj8z2pzazLzXmyX2iPeMVOafJOO9ZmNNkLtB7DxDm-8FYEWxFS1Wh950Mp",
				},
			]);
		}, 400);
	}, []);

	return (
		<section className="bg-surface-container-low py-16 md:py-24 lg:py-32">
			<div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
				{/* Header */}
				<div className="mb-12 text-center md:mb-20">
					{/* Label */}
					<div className="mb-3 flex items-center justify-center gap-2">
						<span className="h-px w-5 bg-primary" />

						<span className="font-label text-[10px] uppercase tracking-[0.22em] text-primary sm:text-[11px]">Bestsellers</span>

						<span className="h-px w-5 bg-primary" />
					</div>

					{/* Heading */}
					<h2 className="font-headline text-3xl italic leading-tight  sm:text-4xl md:text-5xl">Timeless Essentials</h2>

					{/* Description */}
					<p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed sm:text-base">The silhouettes that defined our heritage, chosen by our community across India.</p>
				</div>

				{/* Mobile First Product Grid */}
				<div className="grid md:hidden grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-4 md:grid-cols-3 md:gap-x-6 md:gap-y-10 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-14">
					{products.map((product) => (
						<div key={product.id} className="group">
							{/* Product Image */}
							<div className="relative mb-3 overflow-hidden rounded-2xl bg-surface-container-high sm:mb-4 md:mb-5">
								{/* Image */}
								<img src={product.image} alt={product.title} className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105" />

								{/* Cart Button */}
								<button className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-surface-container-lowest/90 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-primary hover:text-on-primary sm:bottom-3 sm:right-3 sm:h-10 sm:w-10 md:bottom-4 md:right-4 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
									<ShoppingBag size={16} className="text-primary md:size-5" />
								</button>
							</div>

							{/* Product Info */}
							<div className="px-0.5">
								{/* Title */}
								<h3 className="line-clamp-1 font-headline text-sm italic leading-tight sm:text-base md:text-lg">{product.title}</h3>

								{/* Price */}
								<p className="mt-1 text-xs font-semibold text-primary sm:text-sm">{product.price}</p>
							</div>
						</div>
					))}
				</div>
				{/* Desktop Grid */}
				<div className="hidden grid-cols-2 gap-x-8 gap-y-14 md:grid lg:grid-cols-4">
					{products.map((product) => (
						<div key={product.id} className="group">
							{/* Product Image */}
							<div className="relative mb-5 overflow-hidden rounded-2xl bg-surface-container-high">
								<img src={product.image} alt={product.title} className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105" />

								{/* Cart Button */}
								<button className="absolute bottom-4 right-4 translate-y-4 rounded-full bg-surface-container-lowest/90 p-3 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-primary hover:text-on-primary">
									<ShoppingBag size={20} className="text-primary" />
								</button>
							</div>

							{/* Product Info */}
							<h3 className="font-headline text-lg italic ">{product.title}</h3>

							<p className="mt-1.5 text-sm font-semibold text-primary">{product.price}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
