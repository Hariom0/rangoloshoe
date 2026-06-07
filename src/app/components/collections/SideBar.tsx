"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";

type Props = {
  categories: string[];
  onCategoryChange: (category: string) => void;
  genders: string[];
  onGenderChange: (gender: string) => void;
  filtersOpen: boolean;
  setFiltersOpen: (isOpen: boolean) => void;
};

export default function SideBar({
  categories,
  onCategoryChange,
  genders,
  onGenderChange,
  filtersOpen,
  setFiltersOpen,
}: Props) {
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category") || "All";
  const selectedGender = searchParams.get("gender") || "All";

  // Remove duplicates + empty values
  const allCategories = useMemo(
    () => ["All", ...new Set(categories.filter(Boolean))],
    [categories]
  );

  const allGenders = useMemo(
    () => ["All", ...new Set(genders.filter(Boolean))],
    [genders]
  );

  const handleCategoryClick = (category: string) => {
    onCategoryChange(category === "All" ? "" : category);
    setFiltersOpen(false);
  };

  const handleGenderClick = (gender: string) => {
    onGenderChange(gender === "All" ? "" : gender);
    setFiltersOpen(false);
  };

  const filterContent = (
    <div className="space-y-10">
      {/* Gender */}
      <section>
        <h3 className="mb-5 text-sm font-bold uppercase tracking-wider">
          Gender
        </h3>

        <div className="flex flex-wrap gap-3">
          {allGenders.map((gender) => {
            const isSelected =
              selectedGender.toLowerCase() === gender.toLowerCase();

            return (
              <button
                key={gender}
                type="button"
                onClick={() => handleGenderClick(gender)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                  isSelected
                    ? "bg-primary text-white"
                    : "border border-outline-variant/30 hover:bg-muted"
                }`}
              >
                {gender}
              </button>
            );
          })}
        </div>
      </section>

      {/* Categories */}
      <section>
        <h3 className="mb-5 text-sm font-bold uppercase tracking-wider">
          Category
        </h3>

        <div className="space-y-3">
          {allCategories.map((category) => {
            const isSelected =
              selectedCategory.toLowerCase() === category.toLowerCase();

            return (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryClick(category)}
                className="flex w-full items-center gap-3 text-left transition-opacity hover:opacity-80"
              >
                {/* Custom Radio */}
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
                    isSelected
                      ? "border-primary"
                      : "border-outline-variant"
                  }`}
                >
                  {isSelected && (
                    <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                  )}
                </div>

                <span
                  className={`text-sm transition-colors ${
                    isSelected
                      ? "font-semibold text-primary"
                      : "text-foreground"
                  }`}
                >
                  {category}
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="sticky top-32 hidden h-fit w-[280px] lg:block">
        {filterContent}
      </aside>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-[80] bg-black/40 transition-opacity duration-300 lg:hidden ${
          filtersOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setFiltersOpen(false)}
      >
        {/* Bottom Sheet */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto rounded-t-[32px] bg-background p-5 transition-transform duration-300 ${
            filtersOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-headline text-2xl italic">Filters</h2>

            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-container"
            >
              <X size={20} />
            </button>
          </div>

          {filterContent}

          {/* CTA */}
          <div className="sticky bottom-0 mt-10 bg-background pt-4">
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              className="w-full rounded-2xl bg-primary py-4 font-semibold text-white"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
}