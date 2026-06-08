// app/products/[slug]/loading.tsx
import { ArrowLeft } from "lucide-react";

export default function ProductLoading() {
    return (
        <main className="max-w-7xl mx-auto px-5 md:px-8 py-2 animate-pulse">
            <div className="py-1">
                <div className="w-24 h-9 bg-gray-200 rounded-full" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-2">
                {/* --- LEFT COLUMN: GALLERY SKELETON --- */}
                <div className="lg:col-span-7 space-y-6">
                    {/* Main Image Skeleton */}
                    <div className="aspect-square bg-gray-200 rounded-xl w-full" />

                    {/* Thumbnails Skeleton */}
                    <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-square rounded-lg bg-gray-200" />
                        ))}
                    </div>
                </div>

                {/* --- RIGHT COLUMN: DETAILS SKELETON --- */}
                <div className="lg:col-span-5 space-y-8">
                    <div>
                        {/* Tags */}
                        <div className="w-32 h-6 bg-gray-200 rounded-full mb-3" />
                        {/* Title */}
                        <div className="w-3/4 h-12 bg-gray-200 rounded-md mb-2" />
                        {/* Reviews */}
                        <div className="w-40 h-5 bg-gray-200 rounded-md" />
                    </div>

                    {/* Pricing */}
                    <div className="space-y-2">
                        <div className="w-48 h-10 bg-gray-200 rounded-md" />
                        <div className="w-32 h-4 bg-gray-200 rounded-md" />
                    </div>

                    {/* Size Selection */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="h-12 bg-gray-200 rounded-lg" />
                            ))}
                        </div>
                    </div>

                    {/* Actions Box */}
                    <div className="flex flex-col gap-3 w-full max-w-md">
                        <div className="flex gap-3">
                            <div className="flex-[3] h-14 bg-gray-200 rounded-xl" />
                            <div className="flex-1 h-14 bg-gray-200 rounded-xl" />
                        </div>
                        <div className="h-14 w-full bg-gray-200 rounded-xl" />
                    </div>

                    {/* Accordions */}
                    <div className="divide-y divide-gray-200 pt-4 space-y-4">
                        <div className="w-full h-6 bg-gray-200 rounded-md mt-4" />
                        <div className="w-full h-6 bg-gray-200 rounded-md pt-4" />
                        <div className="w-full h-6 bg-gray-200 rounded-md pt-4" />
                    </div>
                </div>
            </div>
        </main>
    );
}