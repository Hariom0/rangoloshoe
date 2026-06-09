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
    title: "Sneakers",
    styles: "24 Styles",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbaF8-fQRmbtqA45FGKEw4_VCVoLxLpZFs9oE6pJz-Jt9I34Wp0kld7mCukswTzdJSWPeA89OJnxY90fmevMKyEHJ-1meduEPStiuSgj-8cytwZUV1A7G3PjvSEih0YYdtmoTmZ73m6noHeiu6_B6Zhq8KXqFu6cC5EEZ-HoQVZdnsvFtW-OzaFqYVd3QOONnMaegCHlOPTC0PvLI-rEtRPsNc0GRu64Rfjrbvx4p7Qugwoth5-c0C8uXgZD_iTwlO4NF4_ojpMBn1",
  },
  {
    id: 2,
    title: "Crocs",
    styles: "18 Styles",
    image: "/images/crocs.jpg",
    offset: true,
  },
  {
    id: 3,
    title: "Slides",
    styles: "12 Styles",
    image: "/images/slides.png",
  },
  {
    id: 4,
    title: "Sports",
    styles: "20 Styles",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBWiXOVR40wyqQGr1L761wkoJQaMTIbwUDwctOOn9Dj9SJtQwQHnMbGaVuIqpAUhrWpv7A3fYE7tlUCOSUm5vAoU79I7Roew6nATURh9OARAqqyQEK0lZeVR35ZHc1pSpaKe_w6H2Wwt-CcV2oMAJ_naShSX963e6H1bKFwflOFRa44An3iMCe4PL6NwBJNGwDdZMLNVpiCA1ruirw4GOW8y_dJw0dwr1K2EKzk5PGKa6n8YB1s1IM8hgm24mUFvFDLZxmPVthbcK0",
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