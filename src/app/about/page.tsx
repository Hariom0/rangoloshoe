import { BadgeCheck, Grid2X2, MapPin, Phone, Mail, Clock3, Navigation, Sparkles, Tag } from "lucide-react";
import Link from "next/link";
import MobileBackButton from "../components/shared/MoibileBackButton";
/* =========================
   STATIC DATA
========================= */

const FEATURES = [
    {
        id: 1,
        title: "Curated Collection",
        description: "From modern street style to classic formalwear, find the perfect look for every occasion.",
        icon: Grid2X2,
    },
    {
        id: 2,
        title: "Transparent Pricing",
        description: "Premium fabrics and trending styles at straightforward, honest prices.",
        icon: Tag,
    },
    {
        id: 3,
        title: "Guaranteed Quality",
        description: "Every piece is inspected for superior stitching, fit, and long-lasting fabric durability.",
        icon: BadgeCheck,
    },
    {
        id: 4,
        title: "Personalized Fitting",
        description: "Get expert style advice and tailored sizing help to ensure you look your absolute best.",
        icon: Sparkles,
    },
];

const STORE_INFO = {
	address: "Haji Market, Main Road, Sasamusa, Sirisiya, Bihar 841505",
	phone: "",
	email: "Personalmailxy@gmail.com",
	hours: "Mon - Sat: 10:00 AM - 9:00 PM | Sun: 11:00 AM - 7:00 PM",
	// Replace this with your actual Google Maps embed URL
	mapUrl:
		"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3569.8714951447696!2d84.35909697530221!3d26.524257076676587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39930f36e4c6c933%3A0x550772122a2355f6!2sTop%20In%20Town%20Young%20Fashaion!5e0!3m2!1sen!2sin!4v1787300625568!5m2!1sen!2sin"
}; 
/* =========================
   COMPONENT
========================= */

export default function AboutPage() {
	return (
		<div className="min-h-screen bg-background">
			<MobileBackButton title="About Us" href="/" />

			{/* =========================
                WHY CHOOSE US
            ========================= */}
			<section className="py-12 md:py-20">
				<div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
					{/* Header */}
					<div className="mb-10 text-center md:mb-16">
						<h2 className="font-headline text-3xl italic text-foreground sm:text-4xl md:text-5xl">Why Choose Us</h2>
						<p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-foreground/70 sm:text-base">
							What sets us apart is our unwavering dedication to comfort, craftsmanship and timeless Indian style.
						</p>
					</div>

					{/* Features Grid - No section fills, clean white cards with subtle borders */}
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
						{FEATURES.map((feature) => {
							const Icon = feature.icon;
							return (
								<div key={feature.id} className="group rounded-3xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
									<div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
										<Icon size={24} />
									</div>
									<h3 className="mb-3 font-headline text-xl italic text-foreground">{feature.title}</h3>
									<p className="text-sm leading-relaxed text-foreground/70">{feature.description}</p>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* =========================
                STORE INFO & MAP
            ========================= */}
			<section className="pb-16 md:pb-24">
				<div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
					<div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
						{/* INFO CARD - Removed heavy background, using clean border layout */}
						<div className="rounded-[32px] border border-border bg-white p-6 sm:p-8 md:p-12 shadow-sm">
							<h2 className="font-headline text-3xl italic text-foreground md:text-4xl">Visit Our Store</h2>

							<div className="mt-8 space-y-6">
								<div className="flex items-start gap-4">
									<div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
										<MapPin size={18} />
									</div>
									<div>
										<p className="font-semibold text-foreground">Address</p>
										<p className="mt-1 text-sm leading-relaxed text-foreground/70">{STORE_INFO.address}</p>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
										<Phone size={18} />
									</div>
									<div>
										<p className="font-semibold text-foreground">Phone</p>
										<p className="mt-1 text-sm text-foreground/70">{STORE_INFO.phone}</p>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
										<Mail size={18} />
									</div>
									<div>
										<p className="font-semibold text-foreground">Email</p>
										<p className="mt-1 text-sm text-foreground/70">{STORE_INFO.email}</p>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
										<Clock3 size={18} />
									</div>
									<div>
										<p className="font-semibold text-foreground">Store Hours</p>
										<p className="mt-1 text-sm leading-relaxed text-foreground/70">{STORE_INFO.hours}</p>
									</div>
								</div>
							</div>

							{/* CTA Buttons */}
							<div className="mt-10 flex flex-col gap-3 sm:flex-row">
								<Link
									href="https://maps.app.goo.gl/E2nuapapxMFvkr1V7" // Update to your real maps link
									target="_blank"
									className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-primary/20 transition-all hover:bg-primary/90 active:scale-95"
								>
									<Navigation size={18} />
									Get Directions
								</Link>

								<a
									href={`tel:${STORE_INFO.phone.replace(/\s/g, "")}`}
									className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-white px-6 py-3.5 text-sm font-bold text-foreground transition-all hover:bg-black/5 active:scale-95"
								>
									<Phone size={18} />
									Call Now
								</a>
							</div>
						</div>

						{/* MAP - Removed redundant section wrapper */}
						<div className="h-[400px] lg:h-full min-h-[400px] w-full overflow-hidden rounded-[32px] border border-border shadow-sm">
							<iframe src={STORE_INFO.mapUrl} className="h-full w-full" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Store Location" />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
