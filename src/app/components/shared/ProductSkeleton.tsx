export default function ProductSkeleton() {
    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-8">
            {/* Array.from creates 8 blank skeleton cards */}
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-3 animate-pulse">
                    {/* Image Skeleton */}
                    <div className="aspect-[4/5] w-full rounded-2xl bg-border/40"></div>
                    
                    {/* Text Skeletons */}
                    <div className="h-4 w-3/4 rounded-md bg-border/40"></div>
                    <div className="h-4 w-1/2 rounded-md bg-border/40"></div>
                </div>
            ))}
        </div>
    );
}