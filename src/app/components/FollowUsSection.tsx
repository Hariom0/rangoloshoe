"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

type InstagramPost = {
  id: number;
  image: string;
  alt: string;
};

export const InstagramSection = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);

  // Simulated API
  useEffect(() => {
    setTimeout(() => {
      setPosts([
        {
          id: 1,
          alt: "Luxury sneakers lifestyle",
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBmDW1qXtQeG0-OFDbWMxdAba_fo07oBvJwHhHJAQhkHiVLmbT8laQNpb-GsVevGZcCz6o0oRWZTRT--LGpIHaOYDv5oPcIBgb3jenQ2lPwMgQAgq04GnOvUcjHgeYF7STLum-3jLbB8sg9p2gxZ1bVAviqPGku5prXGy_8TfjcvLVBhWaVvMr-9D8-6PFq9JYNi32QXh6ZuxwwYmbdcgR2x-K_DF73JWDJJE9ZcYQpW8TBM36OtCIusBvEshZuVZGWlFJIBoz3z0b0",
        },
        {
          id: 2,
          alt: "Minimalist white shoes",
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBZPjbF6w9CHZH9BtIQpq-gCGp0S2OVnuNyHf0cmWXjxRqTYiulYqRM-NNS6EaEgBB85HNyi49KZNT421sKcuqBaSBvDWwewbTAUlB6dHy2jXUfJotD8P5aU-0i8QU4iUL-eh3UmmFMRRGgHlpiFCAhqSRa2yrrxiiDH8HP1YRdMilV1KuS87NJmR722NsDf_rvuSJFEL5sFsJLPEpQogf_Zw_W6fZqGtoOxnmlWvPvcEqsMOwYV1DvIws7C_SvkD3zW1VWdZ-cmJ0i",
        },
        {
          id: 3,
          alt: "Fashion editorial footwear",
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAHTTfI82JaaONk1beByn3hskLGkM4CYYyjNX-fgHplZNmbLRsnREieQXbvGteASmCekT9OMY7mCw_V-kg1NvyQP2ACG1qCxPdU1ixEkvbIX4sUtk-h73gSmxwcAHjN7Uo4CXe3biCyST6Z3wzon_FhluCPI8Eh4BGfkT3PUrwKulGl46NnyT_ksQoSbB5INzwR6vsq-OOnPPzvkdzLLO6ZgmZGOcJgsPPqDi-OhmYToDk4J7gT3zhRMhxq4YIOyIJjyNg3-Su_Wjnz",
        },
        {
          id: 4,
          alt: "Luxury boots street style",
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCdFeDZ8r6hLA9U6crFVCa5lHpi1XHPGeqGSvrfg-gdVL9keGTjo274dE1YqpqVITmPkTn0ENWlNsDPmLNgY5_2XfVJaNeFGjQupfR_-y-e-MkeGA7lEv1GuiLTYllXCurJyQXm_XmbLfHNmcUNQHoU2jz25PB6yJAu47S3r6KmUUyxA_H5XsiOz8_oiXnFHILEQpVh9M3P42sob2b-p9isbvftMPKXAiYa2naJDqAORWTt7NDPIYNWnKscvA49rcMNOleY-cMr_gk7",
        },
        {
          id: 5,
          alt: "Leather craftsmanship details",
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDfxl5pB39p4ntArr8MMYH3I45mMG8GJGiRt-7Q22zQdvGBfXZvZlG-aduCKsSm0bd65Gb07Vs8bOGuEap-cg6RSrCHznhmV1nQBKE9WGlkgqoKoDhk5xKr0l7LlJUq1ST21jyYRWZjBbeC3dxUR5njatEt8h6fhS8lzFcYk0qWfrMNwC3prPMCsfex4bYgoF-mUL3e4YEqXe-jF6UFun4GvBlPEeQigPXV7rJoZAgCFCTKG5jGPcU9tldcmBKfzH0w5_IMtR2KV_9R",
        },
        {
          id: 6,
          alt: "Footwear spa polishing",
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCtVwRgAzZpUO13_k_vL10A13Quyv0Kxcj0CGplo3FES7OTjxbxujiSFuGxonTQbcCasxCxZFYJrHS2xS1O8lxf-gpQ1zlblYX9Q9aIs8GLlWHNG4UeaHHVvUBw2U5kTLIJnwenb-IrXMEWWGAaeBlb5bVpFCzxbnQ03ZZ64hIQkkH50ZjAIVrz_kvmwiH8Hts5TuCl5YxUzN84vcV502cnK_UKHqYnzSphAbHDIFKungacdYGXArGWOOw6A_qo4X3LDw6cJcOERASz",
        },
      ]);
    }, 400);
  }, []);

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
            @rangoli_shoe_sasamusa
          </span>
        </p>
      </div>

      {/* Mobile Scroll Effect */}
      <div className="md:hidden">
        <div className="hide-scrollbar flex gap-3 overflow-x-auto px-4">
          
          {posts.map((post) => (
            <div
              key={post.id}
              className="group relative min-w-[125px] overflow-hidden rounded-2xl"
            >
              
              {/* Image */}
              <img
                src={post.image}
                alt={post.alt}
                className="aspect-square w-full object-cover grayscale transition-all duration-500 group-active:scale-95"
              />

              {/* Mobile Overlay */}
              <div className="absolute hidden  inset-0 items-center justify-center bg-primary/20 opacity-100 backdrop-blur-[1px] transition-opacity duration-300">
                
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                  <Heart
                    size={22}
                    className="fill-white text-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden grid-cols-3 gap-2 px-2 md:grid md:grid-cols-6">
        
        {posts.map((post) => (
          <div
            key={post.id}
            className="group relative cursor-pointer overflow-hidden rounded-xl"
          >
            
            {/* Image */}
            <img
              src={post.image}
              alt={post.alt}
              className="aspect-square w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-primary/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                <Heart
                  size={26}
                  className="fill-white text-white"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};