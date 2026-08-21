import Link from "next/link";

type Collection = {
  id: number;
  title: string;
  styles: string;
  image: string;
  offset?: boolean;
};

// Hardcoded static collections data outside the component
const COLLECTIONS: Collection[] = [
  {
    id: 1,
    title: "TShirts",
    styles: "24 Styles",
    image: "/images/tshirt1.jpg",
  },
  {
    id: 2,
    title: "Shirts",
    styles: "18 Styles",
    image: "/images/shirt.jpg",
    offset: true,
  },
  {
    id: 3,
    title: "Jeans",
    styles: "12 Styles",
    image: "/images/jeans.jpg",
  },
  {
    id: 4,
    title: "Trousers",
    styles: "20 Styles",
    image: "/images/trouser.jpg",
  },
];

export const CollectionSection = () => {
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:px-10 md:py-24 lg:py-32">
      
      {/* Header */}
      <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          {/* Label */}
          <div className="mb-3 flex items-center gap-2">
            <span className="h-px w-5 bg-primary" />
            <span className="font-label text-[10px] uppercase tracking-[0.22em] sm:text-[11px]">
              Categories
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-headline text-3xl italic leading-tight sm:text-4xl md:text-5xl">
            Curated Collections
          </h2>

          {/* Description */}
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-on-surface-variant sm:text-base">
            Explore our artisanal range of footwear designed for every
            occasion, from the boardroom to the weekend escape.
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/collections"
          className="w-fit border-b border-primary/30 pb-1 font-label text-[10px] uppercase tracking-[0.16em] text-primary transition-all duration-300 hover:border-primary sm:text-[11px]"
        >
          View All Categories →
        </Link>
      </div>

      {/* Mobile Scroll Layout */}
      <div className="md:hidden">
        <div className="hide-scrollbar flex gap-4 overflow-x-auto pb-2">
          {COLLECTIONS.map((collection) => (
            <Link
              href={`/collections?category=${collection.title}`}
              key={collection.id}
              className="group relative min-w-[200px] overflow-hidden rounded-2xl"
            >
              {/* Image */}
              <img
                src={collection.image}
                alt={collection.title}
                className="h-[340px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Updated Overlay: Creates a smooth inner shadow from the bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-5 left-5 z-10">
                <span className="block font-headline text-2xl text-white">
                  {collection.title}
                </span>
                <span className="mt-1 block font-label text-[10px] uppercase tracking-[0.15em] text-white/70">
                  {collection.styles}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>


      {/* Desktop Grid */}
      <div className="hidden grid-cols-5 gap-4 md:grid">
        {COLLECTIONS.map((collection) => (
          <Link
          href={`/collections?category=${collection.title}`}
            key={collection.id}
            className={`group relative h-[500px] overflow-hidden rounded-2xl ${
              collection.offset ? "translate-y-8" : ""
            }`}
          >
            {/* Image */}
            <img
              src={collection.image}
              alt={collection.title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/10 via-on-surface/10 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-6 left-6">
              
              <span className="block font-headline text-2xl text-white">
                {collection.title}
              </span>
              <span className="mt-1 block font-label text-[11px] uppercase tracking-[0.15em] text-white/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {collection.styles}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};