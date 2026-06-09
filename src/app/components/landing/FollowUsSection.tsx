
import { Heart } from "lucide-react";
import Link from "next/link";

type InstagramPost = {
  id: number;
  image: string;
  alt: string;
};

export const InstagramSection = () => {

  return (
    <section className=" py-16 md:py-24 lg:py-32">
      
      {/* Header */}
      <div className="mx-auto mb-10 max-w-[1440px] px-4 text-center sm:px-6 md:mb-14 md:px-10">
        
        {/* Label */}
        <div className="mb-3 flex items-center justify-center gap-2">
          <span className="h-px w-5 bg-primary" />

          <span className="font-label text-[10px] uppercase tracking-[0.22em] text-primary sm:text-[11px]">
            Follow Us
          </span>

          <span className="h-px w-5 bg-primary" />
        </div>

        {/* Heading */}
        <h2 className="font-headline text-3xl italic leading-tight  sm:text-4xl md:text-5xl">
          #RangoliShoes
        </h2>

        {/* Description */}
        <p className="mt-4 font-label text-sm -variant">
          Follow our journey{" "}
          
          <span className="font-semibold text-primary">
            <Link href={"https://www.instagram.com/rangoli_shoe_sasamusa/"}>@rangoli_shoe_sasamusa</Link>
          </span>
        </p>
      </div>

    </section>
  );
};