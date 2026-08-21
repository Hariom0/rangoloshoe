import Link from "next/link";
import { Globe, Mail, MessageCircle, Share2 } from "lucide-react";

/* =========================
   TYPES
========================= */

type FooterLink = {
	label: string;
	href: string;
};

type FooterLinkGroup = {
	id: number;
	title: string;
	links: FooterLink[];
};

/* =========================
   STATIC DATA
========================= */

const FOOTER_LINKS: FooterLinkGroup[] = [
	{
		id: 1,
		title: "Shop",
		links: [
			{ label: "Men", href: "/collections?gender=Men" },
			{ label: "Women", href: "/collections?gender=Women" },
			{ label: "Kids", href: "/collections?gender=Kids" },
		],
	},
	{
		id: 2,
		title: "About",
		links: [
			{ label: "Our Story", href: "/about" },
			{ label: "Stores", href: "/about" },
		],
	},
	{
		id: 3,
		title: "Help",
		links: [
			{ label: "FAQ", href: "/" },
			{ label: "Returns", href: "/" },
		],
	},
];

/* =========================
   COMPONENT
========================= */

export const Footer = () => {
	return (
		<footer className="bg-black text-white pt-12 md:pt-20">
			<div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
				{/* =========================
            MOBILE LAYOUT
        ========================= */}
				<div className="md:hidden">
					{/* Brand Info */}
					<div className="flex flex-col items-center text-center">
						<Link href="/" className="font-headline text-2xl italic tracking-wide text-white">
							Young Fashion
						</Link>

						<p className="mt-3 max-w-xs text-xs leading-relaxed text-white/60">Indian luxury footwear crafted with heritage and modern design.</p>

						{/* Social / Action Icons */}
						<div className="mt-6 flex items-center gap-4">
							<Link
								href="https://www.whatsapp.com/channel/0029VbDJxt67T8bZW7GeCn2f"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="WhatsApp"
								className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/70 transition-all duration-300 hover:bg-primary hover:text-white active:scale-95"
							>
								<MessageCircle size={18} />
							</Link>
							<Link
								href="mailto:Personalmailxy@gmail.com?subject=Website%20Inquiry"
								aria-label="Email"
								className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/70 transition-all duration-300 hover:bg-primary hover:text-white active:scale-95"
							>
								<Mail size={18} />
							</Link>
						</div>
					</div>

					{/* Links Grid (3 columns fits perfectly for short lists) */}
					<div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
						{FOOTER_LINKS.map((group) => (
							<div key={group.id}>
								<h4 className="mb-4 font-label text-[11px] font-bold uppercase tracking-widest text-white/90">{group.title}</h4>
								<ul className="space-y-1">
									{group.links.map((link, index) => (
										<li key={index}>
											<Link
												href={link.href}
												// Added block and padding for much better mobile tap targets
												className="block py-1.5 text-[13px] text-white/60 transition-colors duration-200 hover:text-primary active:text-white"
											>
												{link.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>

					{/* Copyright */}
					<div className="mt-10 border-t border-white/10 py-6 text-center">
						<p className="text-[11px] uppercase tracking-wider text-white/40">© {new Date().getFullYear()} Young Fashion</p>
					</div>
				</div>

				{/* =========================
            DESKTOP LAYOUT
        ========================= */}
				<div className="hidden md:grid md:grid-cols-5 md:gap-12">
					{/* Brand Info */}
					<div className="md:col-span-2">
						<Link href="/" className="mb-6 block font-headline text-3xl italic tracking-wide text-white">
							Young Fashion
						</Link>

						<p className="max-w-sm text-sm leading-relaxed text-white/60">Defining modern menswear with effortless style. 
						We believe in the power of quality craftsmanship and contemporary design thinking.</p>
					</div>

					{/* Desktop Links */}
					{FOOTER_LINKS.map((group) => (
						<div key={group.id}>
							<h4 className="mb-6 font-label text-xs font-bold uppercase tracking-[0.15em] text-white/90">{group.title}</h4>
							<ul className="space-y-3.5">
								{group.links.map((link, index) => (
									<li key={index}>
										<Link href={link.href} className="inline-block text-sm text-white/60 transition-all duration-200 hover:translate-x-1 hover:text-primary">
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Desktop Bottom Bar */}
				<div className="hidden border-t border-white/10 py-8 md:mt-16 md:flex md:items-center md:justify-between">
					<p className="text-xs text-white/40">© {new Date().getFullYear()} Young Fashion. Redefining Everyday Men's Fashion</p>

					<div className="flex items-center gap-6">
						{/* WhatsApp Link */}
						<Link
							href="https://www.whatsapp.com/channel/0029VbDJxt67T8bZW7GeCn2f"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-1.5 text-xs text-white/60 transition-colors duration-200 hover:text-primary"
						>
							<MessageCircle size={15} />
							WhatsApp
						</Link>

						{/* Email Link */}
						<Link href="mailto:Personalmailxy@gmail.com?subject=Website%20Inquiry" className="flex items-center gap-1.5 text-xs text-white/60 transition-colors duration-200 hover:text-primary">
							<Mail size={15} />
							Email Us
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};
